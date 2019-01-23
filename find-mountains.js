// List of the best mountains in the northeast
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
	hours: 4,
	zipCode: "05155",
},
{ 
	PowderScore: 3,
	areaName: "Okemo",
	hours: 4.25,
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
	areaName: "Sugarbush",
	hours: 5.5,
	zipCode: "05674",
},

{ 
	PowderScore: 6,
	areaName: "Sugarloaf",
	hours: 7.33,
	zipCode: "04947",
},

{ 
	PowderScore: 6,
	areaName: "Mad River Glen",
	hours: 5.33,
	zipCode: "05673",
},
{ 
	PowderScore: 6,
	areaName: "Attitash",
	hours: 6,
	zipCode: "03812",
},
{ 
	PowderScore: 6,
	areaName: "Smuggler's Notch",
	hours: 6,
	zipCode: "05464",
},

{ 
	PowderScore: 6,
	areaName: "Wildcat",
	hours: 6.25,
	zipCode: "03581",
},
{ 
	PowderScore: 6,
	areaName: "Cannon",
	hours: 5.5,
	zipCode: "03580",
},
{ 
	PowderScore: 6,
	areaName: "Whiteface",
	hours: 4.66,
	zipCode: "12997",
},
{ 
	PowderScore: 6,
	areaName: "Sunday River",
	hours: 4.5,
	zipCode: "04261",
},
{ 
	PowderScore: 6,
	areaName: "Bretton Woods",
	hours: 5.75,
	zipCode: "03575",
},
{ 
	PowderScore: 6,
	areaName: "Loon",
	hours: 5.33,
	zipCode: "03251",
},

{ 
	PowderScore: 6,
	areaName: "Mount Snow",
	hours: 3.85,
	zipCode: "05356",
},
{ 
	PowderScore: 6,
	areaName: "Gore",
	hours: 4,
	zipCode: "12853",
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

//Data request

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

//Progress bar loading 

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

//Rendering the data into the chart

function renderData(PowderScore, areaName, snowfall, hours) {
	$("#resultsChart").append('<tr> <td>' + PowderScore + '</td> <td>' + areaName + '</td> <td>' + snowfall  + ' "</td> <td>' + hours + '</td> </tr>')
}

//Showing the results

function showresults() {
	mountains.forEach(function(element, index) {
		if (index <= 4) {
			renderData(mountains[index].PowderScore, mountains[index].areaName, mountains[index].snowfall, mountains[index].hours)
		} else {
			return;
		}

	})
	$("#searching-box").addClass("hide")
	$("#results-box").removeClass("hide")
}


//Collapsible Javascript section

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
