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
        maxZoom: 18,
        id: 'mapbox.streets', //mapbox.satellite
        accessToken: 'pk.eyJ1IjoiMjE5NzM5N2MiLCJhIjoiY2pvc21udXhjMDYwZDNwcWYwZmluOWE5cyJ9.W4EKOi00AuU9DZXgkOHzsg'
    }).addTo(mymap);

    var marker = L.marker([55.873487, -4.292634]).addTo(mymap);
    var circle = L.circle([55.862344, -4.253426], {
        color: 'blue',
        fillColor: '#0020ff',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(mymap);
    var polygon = L.polygon([
        [55.874143, -4.281878],
        [55.871651, -4.283595],
        [55.872277, -4.281685]
    ],{color:'red'}).addTo(mymap);

    marker.bindPopup("<b>Hello world!</b><br>I am <strike>a popup</strike> the Boyd Orr.");
    circle.bindPopup("I am a circle.");
    polygon.bindPopup("I am a polygon.");

    var popup = L.popup();

    /*function onMapClick(e) {
        popup.setLatLng(e.latlng).setContent("You clicked the map at " + e.latlng.toString()).openOn(mymap);
    }

mymap.on('click', onMapClick);*/


let gpxData;

//let Datas = gpx("map/Activities/activity_2157967385.gpx");
jsonObj = x2js.xml_str2json(gpx("map/Activities/activity_2157967385.gpx"));
let points = getPTS(jsonObj);
// let new_line = L.polyline(points, {color: 'blue'}).addTo(mymap);

//Datas = gpx("map/Activities/activity_2041180865.gpx");
jsonObj = x2js.xml_str2json(gpx("map/Activities/activity_2041180865.gpx"));
points = getPTS(jsonObj);
new_line = L.polyline(points, {color: 'cyan'}).addTo(mymap);

jsonObj = x2js.xml_str2json(gpx("map/Activities/activity_1927428247.gpx"));
points = getPTS(jsonObj);
new_line = L.polyline(points, {color: 'purple'}).addTo(mymap);

jsonObj = x2js.xml_str2json(gpx("map/Activities/activity_1939704174.gpx"));
points = getPTS(jsonObj);
new_line = L.polyline(points, {color: 'gold'}).addTo(mymap);


    //Array of latitudes and longitudes for line
    var arrOfPoints = [
        [55.9415300376713275909423828125,-4.31796281598508358001708984375],
        [55.95281333662569522857666015625,-4.32647212408483028411865234375],
        [55.96147754229605197906494140625,-4.3368350900709629058837890625],
        [55.9685935266315937042236328125,-4.34819541871547698974609375],
        [55.98168999888002872467041015625, -4.3488031066954135894775390625],
        [55.9902570582926273345947265625,-4.351297058165073394775390625],
        [55.9988843835890293121337890625,-4.36088419519364833831787109375],
        [56.00869867019355297088623046875,-4.3641647882759571075439453125],
        [56.01124995388090610504150390625,-4.36722208745777606964111328125],
        [55.99978954531252384185791015625,-4.36246552504599094390869140625],
        [55.99224306643009185791015625,-4.3506625480949878692626953125],
        [55.98413868807256221771240234375,-4.3474294804036617279052734375],
        [55.96955300308763980865478515625,-4.34837110340595245361328125],
        [55.96023232676088809967041015625,-4.3342869915068149566650390625],
        [55.948512665927410125732421875,-4.321618415415287017822265625],
    ];

    var arrOfPoints2 = [
        [56.63202040828764438629150390625,-4.828295409679412841796875],
        [56.62518530152738094329833984375,-4.8039421252906322479248046875],
        [56.6058813594281673431396484375,-4.80683949775993824005126953125],
        [56.58561668358743190765380859375,-4.80151548050343990325927734375],
        [56.572859175503253936767578125,-4.7990568168461322784423828125],
        [56.55988122336566448211669921875,-4.8056392930448055267333984375],
        [56.54567909426987171173095703125,-4.8148396052420139312744140625],
        [56.54540249146521091461181640625,-4.80772647075355052947998046875],
    ];

    var polyline = L.polyline(arrOfPoints, {color: '#400080'}).addTo(mymap);

    var circle2 = L.circle([55.948512665927410125732421875, -4.321618415415287017822265625], {
        color: '#400080',
        fillColor: 'purple',
        fillOpacity: 0.4,
        radius: 800
    }).addTo(mymap);

    var polyline2 = L.polyline(arrOfPoints2, {color: 'yellow'}).addTo(mymap);

    var circle3 = L.circle([56.54540249146521091461181640625,-4.80772647075355052947998046875], {
        color: 'yellow',
        fillColor: '#aaaa00',
        fillOpacity: 0.4,
        radius: 1600
    }).addTo(mymap);

    // zoom the map on each GPX
    polyline.on('click', function() {
        mymap.fitBounds(polyline.getBounds());
    });

    circle2.on('click', function() {
        mymap.fitBounds(circle2.getBounds());
    });

    polyline2.on('click', function() {
        mymap.fitBounds(polyline2.getBounds());
    });

    circle3.on('click', function() {
        mymap.fitBounds(circle3.getBounds());
    });

    $("#bounds").click(function(){
        mymap.fitBounds(polyline.getBounds());
    });
});
