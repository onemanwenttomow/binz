const csv = require("csv-parser");
const fs = require("fs");
const results = [];

// {
//   "day": "Dienstag",
//   "date": "03.01.2023",
//   "bin": "Gelbe Tonne"
// },

fs.createReadStream("./2024.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    const mappedData = results.map((row) => {
      const [day, date, bin] = Object.values(row)[0].split(";");

      return {
        day: day.replace('"', ""),
        date: date.replace('"', "").replace('"', ""),
        bin: bin.replace('"', ""),
      };
    });
    fs.writeFileSync(
      "./recycling-schedule.json",
      JSON.stringify(mappedData, null, 2)
    );
  });
