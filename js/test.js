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

function drawElevs(data, times) {

  jQuery('#elevChart').html('');
  var line = document.getElementById("elevChart");
  var lineChart = new Chart(line,{
      type: "line",
      data: {
          labels: times,
          datasets:[{
              label: "Elevation",
              data: data,
              backgroundColor: "rgba(16, 103, 242, 0.8)",
              borderWidth: "2px",
              pointRadius:"0",
              cubicInterpolationMode: "monotone",
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
              fill: false,
              borderColor: "rgba(255, 0, 0, 1)",
              backgroundColor: "rgba(255, 0, 0, 1)",
              pointRadius:"0",
              cubicInterpolationMode: "monotone",
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
