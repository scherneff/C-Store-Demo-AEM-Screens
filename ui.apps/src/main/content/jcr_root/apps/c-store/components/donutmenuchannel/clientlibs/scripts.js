window.addEventListener("load", () => {
	var menu = "";
    var isDisplayHot = isDisplayCold = false;
    function getData() {
    	fetch("http://localhost/c-store/weather.json?r=" + Math.random())
        .then(response => response.json())
        .then(data => {
              var temperature = data.temperature;
              if (temperature >= 90 && !isDisplayHot) {
                document.getElementById("hot").style.display = "block";
                document.getElementById("cold").style.display = "none";
                isDisplayHot = true;
            	isDisplayCold = false;
            } else if (temperature <= 40 && !isDisplayCold) {
                document.getElementById("hot").style.display = "none";
                document.getElementById("cold").style.display = "block";
                isDisplayHot = false;
            	isDisplayCold = true;
            } else if (temperature > 40 && temperature < 90) {
                document.getElementById("hot").style.display = "none";
                document.getElementById("cold").style.display = "none";
                isDisplayHot = isDisplayCold = false;
            }
		});

        fetch("http://localhost/c-store/donut_menu.json?r=" + Math.random())
        .then(response => response.json())
        .then(data => {
        	if (JSON.stringify(data) != menu) {
            	html = "";
                data.forEach(function(element) {
                    html += "<div class='donut-item-row'>";
                    html += 	`<div class="donut-item-label">${element.label}</div>`;
                    html += 	`<div class="donut-item-price">${element.price}</div>`;
                    html += "</div>";
                });

            	document.getElementById("donuts").innerHTML = html;

            	menu = JSON.stringify(data);
        	}
        
        	setTimeout(getData, 2000);
    	});
    }

    getData();
});