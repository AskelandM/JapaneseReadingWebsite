import React, { useEffect, useState } from "react";
import DisplayTable from "../components/DisplayTable";
import supabase from "../supabaseclient";
import { authAdmin } from "./util";

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [teachersData, setTeachersData] = useState([]);
  const [addingTeacher, setAddingTeacher] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const toggleAddTeacher = () => {
    setNewEmail("");
    setAddingTeacher(!addingTeacher);
  };

  const removeTeacher = async (email) => {
    try {
      await supabase
        .from("teachers")
        .delete()
        .eq("email", email)
        .neq("role", "admin");
    } catch (error) {
      alert("Error deleting teacher:", error);
      return;
    }
    alert("Teacher removed successfully!");
    fetchTeachers();
  };

  const handleInputChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await supabase
        .from("teachers")
        .insert({ email: newEmail, role: "teacher" });
    } catch (error) {
      alert("Error inserting new teacher:", error);
      return;
    }
    setAddingTeacher(false);
    alert("New teacher added successfully!");
    fetchTeachers();
  };

  const fetchTeachers = async () => {
    let teachersArr = [];
    await supabase
      .from("teachers")
      .select("email")
      .neq("role", "admin")
      .then((res) => {
        res.data.forEach((row) => {
          teachersArr.push([row.email]);
        });
      });
    setTeachersData(teachersArr);
  };

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: userData } = await supabase
        .from("usersLogin")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!userData) {
        await supabase.from("usersLogin").insert([
          {
            id: user.id,
            email: user.email,
          },
        ]);
      } else {
        //Check if admin
        const adminRes = await authAdmin(user.email);
        if (adminRes === true) {
          setIsAdmin(true);
        }
      }
    };

    checkUser();
    fetchTeachers();
  }, []);

  if (!isAdmin) {
    return <div>Authorizing...</div>;
  } else {
    return (
      <div>
        <h1>Teachers</h1>
        <DisplayTable
          rows={teachersData}
          columns={["Email"]}
          removeCallback={removeTeacher}
        ></DisplayTable>
        {!addingTeacher ? (
          <button onClick={toggleAddTeacher}>Add Teacher</button>
        ) : (
          <>
            <input
              placeholder="Enter teacher email"
              value={newEmail}
              onChange={handleInputChange}
            ></input>
            <button onClick={toggleAddTeacher}>Back</button>
            <button onClick={handleSubmit}>Submit</button>
          </>
        )}
      </div>
    );
  }
};

export default Admin;
