import DisplayTable from "../components/DisplayTable";
import supabase from "../supabaseclient";
import { useState, useEffect } from "react";
import { authTeacher } from "./util";

const EditLessons = (currUser) => {
  const [customLessons, setCustomLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState("");
  const [lessonWords, setLessonWords] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);

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
      <div>
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
            <button>Add Word</button>
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
    );
  }
};

export default EditLessons;
