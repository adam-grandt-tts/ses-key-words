const files = [
  "leading-change.json",
  "leading-people.json",
  "results-driven.json",
  "business-acumen.json",
  "building-coalitions.json",
];

const data = (async () => {
  const allData = await Promise.all(
    files.map(async (file) => {
      const response = await fetch(`data/${file}`);
      return response.json();
    })
  );

  return allData.reduce((combined, file) => ({ ...combined, ...file }), {});
})();

export default data;
