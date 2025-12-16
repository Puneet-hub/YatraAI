export function extractPlacesFromPlan(plan) {
  if (!plan) return [];

  const lines = plan.split("\n");

  const keywords = [
    "Temple",
    "Road",
    "Market",
    "Lake",
    "Hill",
    "Point",
    "Cafe",
    "Café",
    "Restaurant",
    "Garden",
    "Museum",
    "Valley",
    "Fort",
    "Beach",
  ];

  const places = new Set();

  lines.forEach((line) => {
    keywords.forEach((keyword) => {
      if (line.includes(keyword)) {
        const cleaned = line
          .replace(/[*\-•]/g, "")
          .replace(/\(.*?\)/g, "")
          .trim();

        if (cleaned.length < 60) {
          places.add(cleaned);
        }
      }
    });
  });

  return Array.from(places).slice(0, 6); // limit to avoid map clutter
}
