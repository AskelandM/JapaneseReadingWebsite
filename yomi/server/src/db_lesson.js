import supabase from "../../client/src/pages/supabaseclient";

const lessons = [
  { id: 1, title: "Lesson 1: New Friends" },
  {
    id: 2,
    title: "Lesson 2: Shopping",
  },
  {
    id: 2,
    title: "Lesson 3: Making a Date",
  },
  {
    id: 2,
    title: "Lesson 4: The First Date",
  },
  {
    id: 2,
    title: "Lesson 5: A Trip to Okinawa",
  },
  {
    id: 2,
    title: "Lesson 6: A Day in Robert's Life",
  },
  {
    id: 2,
    title: "Lesson 7: Family Picture",
  },
  {
    id: 2,
    title: "Lesson 8: Barbecue",
  },
  {
    id: 2,
    title: "Lesson 9: Kabuki",
  },
  {
    id: 2,
    title: "Lesson 10: Winter Vacation Plans",
  },
  {
    id: 2,
    title: "Lesson 11: After the Vacation",
  },
  {
    id: 2,
    title: "Lesson 12: Feeling Ill",
  },
];
await supabase.from("lessons").insert(lessons);
