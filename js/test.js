//uncomment to gte working in single file

//let x2js = new X2JS();
/*
function gpx(file) {
    let tempData;
    $.ajax({
        url: file,
        async: false,
        // cache: false,
        dataType: 'text',
        success: e => {
            tempData = e;
        },
        error: e => console.log(e)
    });
    return tempData;
}
*/

function getElevPTS(arr){
    let temp = [];
    let n = 0;
    let data = arr['gpx']['trk']['trkseg']['trkpt'];
    //console.log(data);
    data.forEach((i,v) => {
      //console.log(i);
        temp[n++] = [parseFloat(i['ele'])];
    });
    //temp.splice('length', 1);
    return temp;
}

function getHeartRate(arr){
    let temp = [];
    let n = 0;
    let data = arr['gpx']['trk']['trkseg']['trkpt'];
    //console.log(data);
    data.forEach((i,v) => {
      //console.log(i);
        temp[n++] = [parseFloat(i['extensions']['TrackPointExtension']['hr']['__text'])];
    });
    //temp.splice('length', 1);
    return temp;
}

function getTimePTS(arr){
    let temp = [];
    let n = 0;
    let data = arr['gpx']['trk']['trkseg']['trkpt'];
    //console.log(data);
    data.forEach((i,v) => {
      //console.log(i);
        temp[n++] = [(i['time'].slice(11,19))];
    });
    //temp.splice('length', 1);
    return temp;
}

jsonObj = x2js.xml_str2json(gpx("map/Activities/activity_1939704174.gpx"));
elevs = getElevPTS(jsonObj);
times = getTimePTS(jsonObj);
heartRate = getHeartRate(jsonObj);
//console.log(points);
/*
var line = document.getElementById("elevChart");
var lineChart = new Chart(line,{
    type: "line",
    data: {
        labels: times,
        datasets:[{
            label: "Elevation",
            data: elevs,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "purple",
            borderWidth: "2px",
            pointBackgroundColor: "purple",

        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                },
            }],
        }
    }
})

var line = document.getElementById("heartChart");
var lineChart = new Chart(line,{
    type: "line",
    data: {
        labels: times,
        datasets:[{
            label: "Heart Rates",
            data: heartRate,
            backgroundColor: "rgba(255, 159, 64, 0.2)",
            borderColor: "rgba(75, 220, 192, 1)",
            pointRadius:"0",
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                },
            }],
        }
    }
})*/

function drawElevs(data, times) {
  //console.log("lnds");
  var line = document.getElementById("elevChart");
  var lineChart = new Chart(line,{
      type: "line",
      data: {
          labels: times,
          datasets:[{
              label: "Elevation",
              data: data,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "purple",
              borderWidth: "2px",
              pointBackgroundColor: "purple",
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  },
              }],
          }
      }
  })
}

function drawHeart(data, times) {
  var line = document.getElementById("heartChart");
  var lineChart = new Chart(line,{
      type: "line",
      data: {
          labels: times,
          datasets:[{
              label: "Heart Rate",
              data: data,
              backgroundColor: "rgba(255, 159, 64, 0.2)",
              borderColor: "rgba(75, 220, 192, 1)",
              pointRadius:"0",
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  },
              }],
          }
      }
  })
}
