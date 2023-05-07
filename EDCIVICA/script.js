const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: 2 },
  { minDegree: 31, maxDegree: 90, value: 1 },
  { minDegree: 91, maxDegree: 150, value: 6 },
  { minDegree: 151, maxDegree: 210, value: 5 },
  { minDegree: 211, maxDegree: 270, value: 4 },
  { minDegree: 271, maxDegree: 330, value: 3 },
  { minDegree: 331, maxDegree: 360, value: 2 },
];

//Size of each piece
const data = [16, 16, 16, 16, 16, 16];

//background color for each piece
var pieColors = [
  "#8bffff",
  "#82acff",
  "#8bffff",
  "#82acff",
  "#8bffff",
  "#82acff",
];

//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: [1, 2, 3, 4, 5, 6],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});

//display value based on the randomAngle
var totalpoints = 0;
document.getElementById("segnapunti").innerHTML = totalpoints;
var points = 0;
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      if (i.value == 1) {
        totalpoints = totalpoints + 1;
        finalValue.innerHTML = `<p>Raccogli spazzatura per strada +1 per ogni spazzatura.</p>`;
      }
      if (i.value == 2) {
        totalpoints = totalpoints + 1;
        finalValue.innerHTML = `<p>Consegna spesa ai bisognosi +1 per ogni busta.</p>`;
      }
      if (i.value == 3) {
        totalpoints = totalpoints + 1;
        finalValue.innerHTML = `<p>Pianta alberi +1 per ogni albero.</p>`;
      }
      if (i.value == 4) {
        totalpoints = totalpoints + 3;
        finalValue.innerHTML = `<p>Usa un mezzo ecologico +3 per ogni Km</p>`;
      }
      if (i.value == 5) {
        totalpoints = totalpoints + 2;
        finalValue.innerHTML = `<p>Raccogli bottglie di plastica o lattine +2 punti per ogni bottiglia.</p>`;
      }
      if (i.value == 6) {
        totalpoints = totalpoints + 5;
        finalValue.innerHTML = `<p>Fare la raccolta differenziata +5 punti.</p>`;
      }

      spinBtn.disabled = false;
      break;
    }
  }
  document.getElementById("segnapunti").innerHTML = totalpoints;
};

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  //Empty final value

  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);

  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
