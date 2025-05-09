import DisplayTable from "../components/DisplayTable";
import supabase from "../supabaseclient";
import { useState, useEffect } from "react";
import { authTeacher } from "./util";
import "../styling/editlessons.css"

const EditLessons = (currUser) => {
  const [customLessons, setCustomLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState("");
  const [lessonWords, setLessonWords] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAddingWord, setIsAddingWord] = useState(false);
  const [newWordData, setNewWordData] = useState({
    kanji: "",
    kana: "",
    romaji: "",
    English: "",
  });
  const [isTeacher, setIsTeacher] = useState(false);

  const handleInputChange = (field, value) => {
    let newData = { ...newWordData };
    newData[field] = value;
    setNewWordData(newData);
  };

  async function handleSaveWord() {
    const { error } = await supabase.from("Words").insert({
      ...newWordData,
      lesson: selectedLesson,
    });

    if (error) {
      alert("Error saving word:", error);
    } else {
      alert("Added word!");
      setNewWordData({
        kanji: "",
        kana: "",
        romaji: "",
        English: "",
      });
      fetchLessonWords(selectedLesson);
      setIsAddingWord(false);
    }
  }

  const handleDeleteLesson = async () => {
    const { wordError } = await supabase
      .from("Words")
      .delete()
      .eq("lesson", selectedLesson);
    if (wordError) {
      alert("Error deleting words:", wordError);
      return;
    }
    setLessonWords([]);

    const { error } = await supabase
      .from("lessons")
      .delete()
      .eq("id", selectedLesson);
    if (error) {
      alert("Error deleting lesson:", error);
      return;
    } else {
      alert("Removed lesson!");
      setSelectedLesson("");
    }
    setIsDeleting(false);
  };

  async function removeWord(wordKanji) {
    const { error } = await supabase
      .from("Words")
      .delete()
      .eq("lesson", selectedLesson)
      .eq("kanji", wordKanji);

    if (error) {
      alert("Error deleting word:", error);
    } else {
      alert("Removed word!");
      fetchLessonWords(selectedLesson);
    }
  }

  async function fetchLessonWords(lessonID) {
    const { data, error } = await supabase
      .from("Words")
      .select("*")
      .eq("lesson", lessonID);

    if (error) {
      console.error("Error fetching lesson words:", error);
      return [];
    }

    const lessonArr = data.map((word) => [
      word.kanji,
      word.kana,
      word.romaji,
      word.English,
    ]);

    setLessonWords(lessonArr);
    return data;
  }

  useEffect(() => {
    async function fetchCustomLessons() {
      const { data, error } = await supabase
        .from("lessons")
        .select("id,title")
        .eq("creator", currUser.currUser.email);
      if (error) {
        console.error("Error fetching custom lessons:", error);
      }

      return data;
    }

    authTeacher(currUser.currUser.email).then((res) => {
      setIsTeacher(res);
    });
    if (isTeacher === true) {
      fetchCustomLessons().then((data) => {
        setCustomLessons(data);
      });
      fetchLessonWords(selectedLesson);
    }
  }, [currUser, selectedLesson, isTeacher]);

  if (!isTeacher) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="editlessons-page">
        <div className="editlessons-container">
          <select
            onChange={(e) => setSelectedLesson(e.target.value)}
            value={selectedLesson.title}
          >
            <option value="">Select a lesson</option>
            {customLessons.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>
                {lesson.title}
              </option>
            ))}
          </select>

          {selectedLesson && (
            <div>
              <h2>Lesson Words</h2>
              <DisplayTable
                rows={lessonWords}
                columns={["Kanji", "Kana", "Romaji", "English"]}
                removeCallback={removeWord}
              ></DisplayTable>
              {isAddingWord ? (
                <div className="new-word-inputs">
                  <input
                    placeholder="Enter kanji"
                    value={newWordData.kanji}
                    onChange={(e) => handleInputChange("kanji", e.target.value)}
                  ></input>
                  <input
                    placeholder="Enter kana"
                    value={newWordData.kana}
                    onChange={(e) => handleInputChange("kana", e.target.value)}
                  ></input>
                  <input
                    placeholder="Enter romaji"
                    value={newWordData.romaji}
                    onChange={(e) => handleInputChange("romaji", e.target.value)}
                  ></input>
                  <input
                    placeholder="Enter english"
                    value={newWordData.English}
                    onChange={(e) => handleInputChange("English", e.target.value)}
                  ></input>
                </div>
              ) : null}
              {!isAddingWord ? (
                <button onClick={() => setIsAddingWord(true)}>Add Word</button>
              ) : (
                <>
                  <button onClick={handleSaveWord}>Save word</button>
                  <button onClick={() => setIsAddingWord(false)}>Back</button>
                </>
              )}

              {isDeleting ? (
                <>
                  <text>Are you sure?</text>
                  <button onClick={handleDeleteLesson}>Yes</button>
                  <button onClick={() => setIsDeleting(false)}>No</button>
                </>
              ) : (
                <button onClick={() => setIsDeleting(true)}>Delete Lesson</button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default EditLessons;
