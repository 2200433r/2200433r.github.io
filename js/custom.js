jQuery(document).ready($=>{
    const sidebar = $('nav.sidebar');
    const form = $('#addAnimal');
    const fr = new FileReader();
    const nav = $('ul.nav.flex-column');
    let i = 0;
    let animalPicks = {};
    let file = document.getElementById('file').files[0];
    let polyline;
	let circle;
    let global_name;
    // console.log(file);
    fr.onload = e=>{
        let data = x2js.xml_str2json(e.target.result);
        //console.log(data);
        let points = getPTS(data);
		//console.log(points);
		//console.log(points[points.length - 1][0]);
		var random = Math.floor(Math.random()*16777215);
		var colour = '#'+random.toString(16);
        polyline = L.polyline(points, {color: colour}).addTo(mymap);
        let temp = {};
        temp['line'] = polyline;
        temp['data'] = data;
        temp['points'] = points;
        animalPicks[i++] = temp;
		circle = L.circle([points[points.length - 1][0], points[points.length - 1][1]], {
        color: colour,
        fillColor: '#'+(random - 1250000).toString(16),
        fillOpacity: 0.5,
        radius: 500
    }).addTo(mymap);
        let copy = polyline.getBounds();
        // console.log(copy);
        // console.log(global_name);
        $('#'+global_name).click(e=>{
            mymap.fitBounds(copy);
        });

    };
    $('#collapse').click(()=>{
        sidebar.css("width", "0%");
    });
    $('#expand').click(e=>{
        let state = $(e.target).data("state");
        if (state === "on"){
            sidebar.css("width", "0%");
            $(e.target).data("state", "off");
            $("i", e.target).toggleClass("fa-chevron-left").toggleClass("fa-chevron-right");
        } else {
            sidebar.css("width", "var(--sidebar-width)");
            $(e.target).data("state", "on");
            $("i", e.target).toggleClass("fa-chevron-left").toggleClass("fa-chevron-right");
        }
    });
    function clearForms(){
        document.getElementById('addAnimal').reset();
    }
    function closeForm(){ form.css("display", "none"); }
    $('#add').click(e=>{
        form.css("display", "flex");
    });
    $('#closeForm').click(e=>{
        closeForm();
        clearForms();
    });
    $('.cancel', form).click(e=>{
        closeForm();
        clearForms();
    });
    $('#file').change((e)=>{
        // console.log(e);
        file = e.currentTarget.files[0];
		if (!file.name.endsWith(".gpx")) {
			closeForm();
			clearForms();
      alert("Only GPX files are supported.");
		}
    });
    form.submit(e=>{
        e.preventDefault();
        let name = $('input[name=animalName]').val();
        let html = "<option data-index='"+i+"'>"+name+"</option>";
        $('.animalPick').append(html);
        global_name = name;
        fr.readAsText(file);
        closeForm();
        clearForms();
    });
    $('#findAnimal').click(e=>{
        // console.log(e);
        let i = $('.animalPick option:selected').attr("data-index");
        // console.log(animalPicks[i].getBounds());
        let theAnimal = animalPicks[i];
        let time = getTimePTS(theAnimal['data']);
        mymap.fitBounds(theAnimal['line'].getBounds());
        drawElevs(getElevPTS(theAnimal['data']), time);
        drawHeart(getHeartRate(theAnimal['data']), time);
        // console.log(val);
    });
});
