const csv = require("csv-parser");
const fs = require("fs");
const results = [];

// {
//   "day": "Dienstag",
//   "date": "03.01.2023",
//   "bin": "Gelbe Tonne"
// },

fs.createReadStream(__dirname + "/2026.csv")
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
    console.log(mappedData);
    fs.writeFileSync(
      __dirname + "/recycling-schedule.json",
      JSON.stringify(mappedData, null, 2)
    );
  });
