let x2js = new X2JS();
var mymap = L.map('map').setView([55.86, -4.25], 11);

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

function getPTS(arr){
    let temp = [];
    let n = 0;
    let data = arr['gpx']['trk']['trkseg']['trkpt'];
    data.forEach((i,v) => {
        temp[n++] = [parseFloat(i['_lat']), parseFloat(i['_lon'])];
    });
    temp.splice('length', 1);
    return temp;
}

jQuery(document).ready($=>{

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        minZoom: 3,
        maxZoom: 18,
        id: 'mapbox.streets', //mapbox.satellite
        accessToken: 'pk.eyJ1IjoiMjE5NzM5N2MiLCJhIjoiY2pvc21udXhjMDYwZDNwcWYwZmluOWE5cyJ9.W4EKOi00AuU9DZXgkOHzsg'
    }).addTo(mymap);

    var marker = L.marker([55.873487, -4.292634]).addTo(mymap);
    marker.bindPopup("<b>Hello world!</b><br>I am <strike>a popup</strike> the Boyd Orr.");
});
