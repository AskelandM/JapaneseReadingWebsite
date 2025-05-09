import React, { useEffect, useState } from "react";
import DisplayTable from "../components/DisplayTable";
import supabase from "../supabaseclient";
import { authAdmin } from "./util";
import "../styling/admin.css"; // ✅ Import the CSS

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [teachersData, setTeachersData] = useState([]);
  const [addingTeacher, setAddingTeacher] = useState(false);
  const [newEmail, setNewEmail] = useState("");

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
        const isValidAdmin = await authAdmin(user.email);
        setIsAdmin(isValidAdmin);
      }
    };

    checkUser();
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    const { data, error } = await supabase
      .from("teachers")
      .select("email")
      .neq("role", "admin");

    if (error) {
      console.error("Error fetching teachers:", error);
      return;
    }

    const formatted = data.map((row) => [row.email]);
    setTeachersData(formatted);
  };

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
      fetchTeachers();
      alert("Teacher removed successfully.");
    } catch (error) {
      alert("Error removing teacher:", error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      await supabase
        .from("teachers")
        .insert({ email: newEmail, role: "teacher" });
      fetchTeachers();
      setAddingTeacher(false);
      alert("New teacher added!");
    } catch (error) {
      alert("Error adding teacher:", error.message);
    }
  };

  if (!isAdmin) return <div className="admin-wrapper">Authorizing...</div>;

  return (
    <div className="admin-wrapper">
      <div className="admin-box">
        <h1 className="admin-title">Teacher Management</h1>

        <DisplayTable
          rows={teachersData}
          columns={["Email"]}
          removeCallback={removeTeacher}
        />

        {!addingTeacher ? (
          <div className="admin-actions">
            <button onClick={toggleAddTeacher}>Add Teacher</button>
          </div>
        ) : (
          <div className="admin-form">
            <input
              type="email"
              placeholder="Enter teacher email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <div className="admin-buttons">
              <button onClick={toggleAddTeacher}>Cancel</button>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
