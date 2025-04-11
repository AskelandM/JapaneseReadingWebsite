import supabase from "../supabaseclient.js";

const lessons = [
  { id: 1, title: "Lesson 1: New Friends" },
  { id: 2, title: "Lesson 2: Shopping" },
  {
    id: 3,
    title: "Lesson 3: Making a Date",
  },
  {
    id: 4,
    title: "Lesson 4: The First Date",
  },
  {
    id: 5,
    title: "Lesson 5: A Trip to Okinawa",
  },
  {
    id: 6,
    title: "Lesson 6: A Day in Robert's Life",
  },
  {
    id: 7,
    title: "Lesson 7: Family Picture",
  },
  {
    id: 8,
    title: "Lesson 8: Barbecue",
  },
  {
    id: 9,
    title: "Lesson 9: Kabuki",
  },
  {
    id: 10,
    title: "Lesson 10: Winter Vacation Plans",
  },
  {
    id: 11,
    title: "Lesson 11: After the Vacation",
  },
  {
    id: 12,
    title: "Lesson 12: Feeling Ill",
  },
];
await supabase.from("lessons").insert(lessons);
export default lessons;
