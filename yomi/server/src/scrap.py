# Scrape lessons and store words in Supabase
from playwright.sync_api import sync_playwright
from supabase import create_client

# Supabase credentials
SUPABASE_URL = "https://czccvfxqcvogvqawvgyp.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6Y2N2ZnhxY3ZvZ3ZxYXd2Z3lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5NDUzOTEsImV4cCI6MjA1NjUyMTM5MX0.5cwyJrFdwrESexbu9RltXzjS1JVzxb-bfTJXztI4_KM"
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

BASE_URL = "https://www.csus.edu/indiv/s/sheaa/projects/genki/vocab_main.html"

def get_all_lessons_link():
    """Scrapes all lesson links from the main page."""
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(BASE_URL)

        # Extract lesson links, fixing 'javascript:newDoWindowOpen' issue
        page_links = page.evaluate('''
            () => {
                return Array.from(document.querySelectorAll("table a"))
                    .map(link => {
                        let jsCode = link.getAttribute("href"); // Get the href value
                        let match = jsCode ? jsCode.match(/'([^']+)'/) : null; // Extract URL if found
                        return match ? match[1] : null; // Return extracted URL, or null if not found
                    })
                    .filter(Boolean); // Remove any null values
            }
        ''')

        browser.close()
        return page_links  # ✅ Returns cleaned list of lesson URLs

def scrape_words_from_lesson(lesson_url):
    """Extracts words from a lesson page."""
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(lesson_url)

        # Extract word, pronunciation, and meaning from table rows
        words = page.evaluate('''
            () => {
                let rows = document.querySelectorAll("table tr");
                return Array.from(rows).map(row => {
                    let cells = row.querySelectorAll("td");
                    if (cells.length < 4) return null; // Ensure at least 4 columns

                    return {
                        kana: cells[0].innerText.trim(),
                        kanji: cells[1].innerText.trim(),
                        romaji: cells[2].innerText.trim(),
                        english: cells[3].innerText.trim()
                    };
                }).filter(Boolean); // Remove empty rows
            }
        ''')

        browser.close()
        return words  # ✅ Returns list of word objects

def insert_words_into_supabase(words):
    """Stores scraped words into Supabase."""
    for word in words:
        response = supabase.table("wordss").insert({
            "kana": word["kana"],
            "kanji": word["kanji"],
            "romaji": word["romaji"],
            "English": word["english"]
        }).execute()

        print(f"Inserted: {word['kana']} -> {response}")

# ✅ Main Execution
if __name__ == "__main__":
    lesson_links = get_all_lessons_link()  

    for lesson in lesson_links:
        words = scrape_words_from_lesson(lesson)  
        insert_words_into_supabase(words) 
