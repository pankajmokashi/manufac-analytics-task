import "./App.css";
import ShowTable from "./components/Table";
import Data from "./components/Manufac _ India Agro Dataset.json";

function App() {
  // Function to calculate the maximum and minimum production crops for each year
  function getMaxMinCropsByYear(data) {
    const result = [];
    const years = {};

    data.forEach((entry) => {
      const year = entry.Year.split(",")[1].trim(); // Extracting the year from the full date format
      const crop = entry["Crop Name"];
      const production = entry["Crop Production (UOM:t(Tonnes))"];

      if (!years[year]) {
        years[year] = {
          maxCrop: crop,
          maxProduction: production,
          minCrop: crop,
          minProduction: production,
        };
      } else {
        if (production > years[year].maxProduction) {
          years[year].maxCrop = crop;
          years[year].maxProduction = production;
        } else if (production < years[year].minProduction) {
          years[year].minCrop = crop;
          years[year].minProduction = production;
        }
      }
    });

    // console.log("years", years);

    for (const year in years) {
      const { maxCrop, minCrop } = years[year];
      result.push({ year, max: maxCrop, min: minCrop });
    }

    return result;
  }

  // Function to calculate the average yield and cultivation area for each crop between 1950-2020
  function getAvgYieldAndArea(data) {
    const cropData = {};
    const cropCount = {};

    data.forEach((entry) => {
      const crop = entry["Crop Name"];
      const yieldValue =
        entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"];
      const areaValue = entry["Area Under Cultivation (UOM:Ha(Hectares))"];

      // if data is missing set it to 0
      if (!cropData[crop]) {
        cropData[crop] = { totalYield: 0, totalArea: 0 };
        cropCount[crop] = 0;
      }

      if (yieldValue) {
        cropData[crop].totalYield += parseInt(yieldValue, 10);
        cropCount[crop]++;
      }
      if (areaValue) {
        cropData[crop].totalArea += parseFloat(areaValue);
      }
    });

    // console.log("cropData", cropData);
    // console.log("cropCount", cropCount);

    const result = [];
    for (const crop in cropData) {
      result.push({
        Crop: crop,
        yield: (cropData[crop].totalYield / cropCount[crop]).toFixed(3),
        cultivation: (cropData[crop].totalArea / cropCount[crop]).toFixed(3),
      });
    }

    return result;
  }

  const maxMinCropsByYear = getMaxMinCropsByYear(Data);
  const avgYieldAndArea = getAvgYieldAndArea(Data);

  return (
    <div className="App">
      <ShowTable
        col1={"Year"}
        col2={"Crop with Maximum Production in that Year"}
        col3={"Crop with Minimum Production in that Year"}
        elements={maxMinCropsByYear}
        tableData={["year", "max", "min"]}
      />
      <ShowTable
        col1={"Crop"}
        col2={"Average Yield of the Crop between 1950-2020"}
        col3={"Average Cultivation Area of the Crop between 1950-2020"}
        elements={avgYieldAndArea}
        tableData={["Crop", "yield", "cultivation"]}
      />
    </div>
  );
}

export default App;
