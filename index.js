const dateElement = document.getElementById("date");

let currentDate = new Date();

/* dateElement.innerHTML = currentDate.getFullYear() + " - " + (currentDate.getMonth() + 1) + " - " + currentDate.getDate();
 */
let dateOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
};

dateElement.innerHTML = currentDate.toLocaleDateString("en-US", dateOptions);



const url = "https://twitter-trends5.p.rapidapi.com/twitter/request.php";
const options = {
  method: "POST",
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
	'X-RapidAPI-Key': '4f4dbc6de6msh1f54c3cc7cc0f29p19d6cfjsna3ced6e954c7',
	'X-RapidAPI-Host': 'twitter-trends5.p.rapidapi.com'
  },
  body: new URLSearchParams({ woeid: "23424934" }),
};



/* let myPost = {
  name: "Lee Sung Kyung",
  queryUrl: "search?q=%22Lee+Sung+Kyung%22",
  volume: 31799,
  followers: 3895734,
};

let graphData = [
  {
    name: "#PorDeeReunion",
    queryUrl: "search?q=%23PorDeeReunion",
    volume: 67000,
  },
  {
    name: "#BGYO3rdAnniversary",
    queryUrl: "search?q=%23BGYO3rdAnniversary",
    volume: 27400,
  },
];

graphData.push(myPost);
console.log(graphData); */

let graphData = [];

fetch(url, options)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    for (let i = 0; i < 50; i++) {
      graphData.push({
        name: data.trends[i].name,
        volume: data.trends[i].volume,
      });
    }

    let topics = graphData.map((object) => {
      console.log(object);
      console.log(object.name);
      return object.name;
    });

    console.log(topics);

    let volumes = graphData.map((object) => {
      return object.volume;
    });

    console.log(volumes);

    const myChart = document.getElementById("myChart");

    let barChart = new Chart(myChart, {
      type: "bar",
      data: {
        labels: topics,
        datasets: [
          {
            label: "# of tweets/xeets",
            data: volumes,
            borderWidth: 2,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            hoverBackgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
          },
        ],
      },
      options: {
        indexAxis: "y",
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  });
