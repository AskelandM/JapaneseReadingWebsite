export default async function handler(req, res) {
  const {
    query,
    fromEn
  } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Missing query parameter" });
  }

  const from = fromEn === "true" ? "eng" : "jpn";
  const to = fromEn === "true" ? "jpn" : "eng";

  const searchParams = new URLSearchParams({
    from,
    has_audio: "",
    list: "",
    native: "",
    original: "",
    orphans: "no",
    query,
    sort: "relevance",
    sort_reverse: "",
    tags: "",
    to,
    trans_filter: "limit",
    trans_has_audio: "",
    trans_link: "",
    trans_orphan: "",
    trans_to: to,
    trans_unapproved: "",
    trans_user: "",
    unapproved: "no",
    user: "",
    word_count_max: "",
    word_count_min: "1"
  });

  const url = `https://tatoeba.org/eng/api_v0/search?${searchParams.toString()}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching data from Tatoeba" });
  }
}