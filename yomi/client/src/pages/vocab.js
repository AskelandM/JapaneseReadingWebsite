import { useState, useEffect } from "react";
import supabase from './supabaseclient.js';
import { useLocation } from 'react-router';

const Vocab = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(
        location.search
    );
    const lesson = searchParams.get("lesson");
//deciding on which lesson which be showning to the user
   const [words, setWords]= useState([]);
   //loading the current lesson from table
   const [choice, setChoice] = useState();

    const dictionaryMode = ()=>{
      


    }
useEffect(() => {       
    async function getWords() {         
        const { data, error } = await supabase        
        .from('Words')        
        .select(`id, kana, kanji, English`)        
        .eq('lesson', lesson)               
        if (error) {          
            console.warn(error)        
        } else if (data) {  
            setWords(data);
        } 
    }

    getWords();
}, [lesson])


    return (

<div>
<button onClick = {dictionaryMode}> dictionary mode </button>
{/* needed to change here, prob not gonna use on click, and is quiz mode needed?*/}
<button> quiz mode </button>

</div>

    );

}

export default Vocab;