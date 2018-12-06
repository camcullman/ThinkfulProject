//mountains
var mountains = [
{ 
	PowderScore: 6,
	areaName: "Jay Peak",
	hours: 6.1,
	zipCode: "05859",
},
{ 
	PowderScore: 7,
	areaName: "Hunter Mountain",
	hours: 2.33,
	zipCode: "12442",
},
{ 
	PowderScore: 6,
	areaName: "Killington",
	hours: 4.66,
	zipCode: "05751",
},
{ 
	PowderScore: 5,
	areaName: "Stratton",
	hours: 4.25,
	zipCode: "05155",
},
{ 
	PowderScore: 3,
	areaName: "Okemo",
	hours: 4.33,
	zipCode: "05149",
},
{ 
	PowderScore: 3,
	areaName: "Stowe",
	hours: 5.5,
	zipCode: "05672",
},
{ 
	PowderScore: 3,
	areaName: "Sugarbushtest",
	hours: 5.5,
	zipCode: "05674",
}
]

mountains.forEach(function(element, index) {
	$("#mountainselector").append("<option value=" + mountains[index].zipCode + "> " + mountains[index].areaName + "</option>")
});	

$( "#mountainselector" ).change(function() {
  requestData($( "select option:selected") [0].value, 0);
});



//find mountains

$("#find-mountains").on("click", function() {
	$("#homepage-box-id").addClass("hide")
	$("#searching-box").removeClass("hide")
	mountains.forEach(function(element, index) {
		requestData(element.zipCode, index) 
	});	
})

//Next - repeat line 6 for 5 stations where I can ski
//Must save area name and snowfall in an array of results (can call it mountains)

//must know how to create an array in js, push array. 

//each one is an object with 2 properties, areaName and snowfall

function requestData(zipCode, index) {
	var API_URL = 'http://api.worldweatheronline.com/premium/v1/ski.ashx?key=ee3592817e3e41a3b4932308182910&q=' + zipCode + '&format=json&includeLocation=yes'


	  $.get(API_URL, function(results){
		var areaName = results.data.nearest_area[0].areaName[0].value 
		var snowfall = results.data.weather["0"].totalSnowfall_cm
		var hours = mountains[index].hours
		mountains[index].snowfall=snowfall
		mountains[index].areaName=areaName
		mountains[index].PowderScore=Math.round(snowfall/hours*100)
			incrementProgressBar()
		//instead of console.log - must put the area name in an array (the mountains array)
	  })
}

var barWidth = 0;

//Next step: Sort the mountains. Will use a counter. After hit 5 counter will be done. 
function incrementProgressBar() {
	console.log(100/mountains.length, barWidth)
	barWidth = barWidth + (100/mountains.length);
	$("#loading-bar").css("width", barWidth + "%")
	if (barWidth>100) {


		mountains=mountains.sort(function (a, b) {
  			return b.PowderScore - a.PowderScore;
		});
		showresults()
	}
}

function renderData(PowderScore, areaName, snowfall, hours) {
	$("#resultsChart").append('<tr> <td>' + PowderScore + '</td> <td>' + areaName + '</td> <td>' + snowfall  + ' "</td> <td>' + hours + '</td> </tr>')
}


function showresults() {
	mountains.forEach(function(element, index) {
		renderData(mountains[index].PowderScore, mountains[index].areaName, mountains[index].snowfall, mountains[index].hours)
	})
	$("#searching-box").addClass("hide")
	$("#results-box").removeClass("hide")
}


//next - before show results, must create the html dynamically to put that html on the screen. Then when it's there, show the results. 



