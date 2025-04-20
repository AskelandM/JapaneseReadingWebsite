import supabase from "../supabaseclient";

export async function authTeacher(email) {
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

export async function authAdmin(email) {
  const { data, error } = await supabase
    .from("teachers")
    .select("role")
    .eq("email", email)
    .single();

  if (!data) {
    console.error("Error fetching data:", error);
    return false;
  }
  if (error) {
    return false;
  }

  return data.role === "admin";
}
