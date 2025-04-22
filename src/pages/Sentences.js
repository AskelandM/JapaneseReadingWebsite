import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import React, { useState, useEffect } from "react"; 
import axios from "axios"; 
import "../styling/sentences.css"

function Sentences () {

    const [loading, setLoading] = useState(false); 
    const [posts, setPosts] = useState([]); // returned sentences
    const [txt, setTxt] = useState(""); // text in textbox
    const [query, setQuery] = useState(""); // final submitted text
    const [fromEn, setFromEn] = useState(false); // query in english?
    const nomargin = `
        .nomargin {
            margin-bottom: 0px;
            padding: 0px;
        }
    `
  
    useEffect(() => {
        const loadPost = async () => {
            setLoading(true);
        
            try {
                const response = await axios.get(
                `/api/tatoeba?query=${encodeURIComponent(query)}&fromEn=${fromEn}`
                );
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        
            setLoading(false);
        };
      
        if (query !== "") {
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
        <div className="sentences-page">
          <div className="sentences-card">
            <h1 className="page-title">Example Sentence Search</h1>
    
            <form onSubmit={handleSubmit} className="search-form">
              <label htmlFor="search-input">Add terms here:</label>
              <input
                id="search-input"
                value={txt}
                onInput={handleChange}
                required
                className="search-input"
              />
              <button type="submit" className="submit-btn">Submit</button>
            </form>
    
            <FormControlLabel
              control={<Switch checked={fromEn} onChange={handleSwitch} />}
              label="Japanese/English"
            />
    
            <hr />
    
            {loading ? (
            <h4>Loading...</h4>
            ) : (
                posts.map((item, i) =>
                    item.translations.length > 0 ? (
                    <div key={i} className="sentence-block">
                        <h4>{item.text}</h4>
                        {item.translations.map((trans, idx) =>
                        trans.length > 0 ? (
                            <p key={idx} className="translation">{trans[0].text}</p>
                        ) : null
                        )}
                    </div>
                    ) : null
                )
            )}
    
            <hr />
            <p className="footer-note">
              All sentences are acquired through the{" "}
              <a href="https://tatoeba.org/ja/">Tatoeba project</a>.
            </p>
          </div>
        </div>
      );
};


export default Sentences;