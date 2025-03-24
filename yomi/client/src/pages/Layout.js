import { Outlet, Link } from "react-router-dom";
import { useEffect } from "react";
import supabase from "./supabaseclient";
import Lessons from "./Lessons";
import Profile from "./Profile";
const Layout = () => {
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

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
        console.log("found user!");
      }
    };

    checkUser(); // ✅ runs once when Layout loads
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem" }}>
      <div style={{ flex: "1" }}>
        <Profile />
      </div>
      <div style={{ flex: "2" }}>
        <Lessons />
      </div>
    </div>
  );
  
};

export default Layout;
