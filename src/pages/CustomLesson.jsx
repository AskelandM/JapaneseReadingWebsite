import React, { useState, useEffect } from "react";
import supabase from "../supabaseclient";
import { authTeacher } from "./util";
const CustomLesson = (currUser) => {
  const [entries, setEntries] = useState([]);
  const [lessonTitle, setLessonTitle] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);

  const handleAddEntry = () => {
    setEntries([...entries, { kanji: "", kana: "", romaji: "", English: "" }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index][field] = value;
    setEntries(updatedEntries);
  };

  const handleRemoveEntry = (index) => {
    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);
    setEntries(updatedEntries);
  };

  const generateUniqueId = () => {
    return Math.floor(Math.random() * 1000000) + 100;
  };

  const isDuplicateTitle = async (title) => {
    const { data, error } = await supabase
      .from("lessons")
      .select("title")
      .eq("title", title);

    if (error) {
      console.error("Error checking lesson title:", error);
      return;
    }
    if (data.length > 0) {
      console.log("Lesson title already exists");
      return true;
    }

    return false;
  };

  const handleSave = async () => {
    if (await isDuplicateTitle(lessonTitle)) {
      alert("Lesson title already exists, please choose another one");
    } else if (lessonTitle === "") {
      alert("Please enter a lesson title");
    } else if (entries.length === 0) {
      alert("Please add at least one word to the lesson");
    } else {
      try {
        const lessonId = generateUniqueId();
        await supabase
          .from("lessons")
          .insert({
            id: lessonId,
            title: lessonTitle,
            creator: currUser.currUser.email,
          })
          .then((response) => {
            console.log("Lesson saved with id:", lessonId);
          });

        const entriesWithLessonId = entries.map((entry) => {
          return { ...entry, lesson: lessonId.toString() };
        });

        await supabase
          .from("Words")
          .insert(entriesWithLessonId)
          .then((response) => {
            console.log("Words saved");
          });

        alert("Lesson and words saved successfully!");
        setLessonTitle("");
        setEntries([]);
      } catch (error) {
        console.error("Error saving words:", error);
      }
    }
  };

  useEffect(() => {
    authTeacher(currUser.currUser.email).then((res) => {
      setIsTeacher(res);
    });
  }, [currUser, isTeacher]);

  if (!isTeacher) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <input
          type="text"
          value={lessonTitle}
          onChange={(e) => setLessonTitle(e.target.value)}
          placeholder="Enter Lesson Title"
        />
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Kanji
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Kana
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Romaji
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                English
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  <input
                    type="text"
                    value={entry.kanji}
                    onChange={(e) =>
                      handleInputChange(index, "kanji", e.target.value)
                    }
                  />
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  <input
                    type="text"
                    value={entry.kana}
                    onChange={(e) =>
                      handleInputChange(index, "kana", e.target.value)
                    }
                  />
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  <input
                    type="text"
                    value={entry.romaji}
                    onChange={(e) =>
                      handleInputChange(index, "romaji", e.target.value)
                    }
                  />
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  <input
                    type="text"
                    value={entry.english}
                    onChange={(e) =>
                      handleInputChange(index, "English", e.target.value)
                    }
                  />
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  <button onClick={() => handleRemoveEntry(index)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={handleAddEntry}>Add Word</button>
        <div>
          <button onClick={handleSave}>Save Lesson</button>
        </div>
      </div>
    );
  }
};

export default CustomLesson;
