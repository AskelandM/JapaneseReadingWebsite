import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import React, { useState, useEffect } from "react"; 
import axios from "axios"; 

function Sentences () {

    const [loading, setLoading] = useState(false); 
    const [posts, setPosts] = useState([]); // returned sentences
    const [txt, setTxt] = useState(""); // text in textbox
    const [query, setQuery] = useState(""); // final submitted text
    const [fromEn, setFromEn] = useState(false); // query in english?
  
    useEffect(() => { 
        const loadPost = async () => { 
            // Till the data is fetch using API 
            // the Loading page will show. 
            setLoading(true); 
  
            // Await make wait until that 
            // promise settles and return its result 
            const response = await axios.get( 
                "https://tatoeba.org/eng/api_v0/search?from=" + (fromEn ? "eng" : "jpn") + "&has_audio=&list=&native=&original=&orphans=no&query=" + query + "&sort=relevance&sort_reverse=&tags=&to=" + (fromEn ? "jpn" : "eng") + "&trans_filter=limit&trans_has_audio=&trans_link=&trans_orphan=&trans_to=" + (fromEn ? "jpn" : "eng") + "&trans_unapproved=&trans_user=&unapproved=no&user=&word_count_max=&word_count_min=1"
            ); 
            console.log("https://tatoeba.org/eng/api_v0/search?from=" + (fromEn ? "eng" : "jpn") + "&has_audio=&list=&native=&original=&orphans=no&query=" + query + "&sort=relevance&sort_reverse=&tags=&to=" + (fromEn ? "jpn" : "eng") + "&trans_filter=limit&trans_has_audio=&trans_link=&trans_orphan=&trans_to=" + (fromEn ? "jpn" : "eng") + "&trans_unapproved=&trans_user=&unapproved=no&user=&word_count_max=&word_count_min=1");
  
            // After fetching data stored it in posts state. 
            setPosts(response.data); 
  
            // Closed the loading page 
            setLoading(false); 
        }; 
  
        // Call the function 
        if (query != "") {
            loadPost(); 
        }
    }, [query]); 

    useEffect(() => {
        console.log(posts)
    }, [posts]);

    function handleSubmit(e) {
        e.preventDefault();
        setQuery(txt);
    }

    function handleChange(e) {
        setTxt(e.target.value);
        setQuery("");
    }

    function handleSwitch(event) {
        setFromEn(event.target.checked);
        setTxt("");
        setQuery("");
    }

    // contents of search bar go into API req
    // contents of API req (JSON) get displayed on page
    return (
        <div>
            <h2>Example Sentence Search</h2>
            <form onSubmit={handleSubmit}>
                <label>Add terms here: </label>
                <input
                    value={txt}
                    onInput={handleChange}
                    required
                />
                &nbsp;
                <button type="submit">Submit</button>
            </form>
            <FormControlLabel control={<Switch checked={fromEn} onChange={handleSwitch} />} label="Japanese/English" />
            <hr/>
            {loading || posts.length === 0 ? ( 
                loading ? (<h4>Loading...</h4> ) : ""
            ) : ( 
                posts.results.map((item) => ( 
                    // fetch the text and translation
                    <div>
                    {item.translations[0].length > 0 ?
                        <h4>{item.text}
                        <br/>
                        {item.translations[0][0].text}
                        </h4> 
                    : " "}
                    </div>
                )) 
            )}
            <hr/>
            <p>all sentences are acquired through the <a href="https://tatoeba.org/ja/">Tatoeba project</a>.</p>
        </div>
    );
};


export default Sentences;