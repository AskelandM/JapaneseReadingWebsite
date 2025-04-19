import supabase from "../supabaseclient";

async function authTeacher(email) {
  const { data, error } = await supabase
    .from("teachers")
    .select("*")
    .eq("email", email);

  if (error) {
    console.error("Error fetching teacher data:", error);
    return false;
  }

  return data.length > 0;
}

export default authTeacher;
