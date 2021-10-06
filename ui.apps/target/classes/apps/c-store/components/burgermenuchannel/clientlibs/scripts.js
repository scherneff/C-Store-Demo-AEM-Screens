window.addEventListener("load", () => {
   	var menu = "";
    function getData() {
        fetch("http://localhost/c-store/burger_menu.json?r=" + Math.random())
        .then(response => response.json())
        .then(data => {
            if (menu == "") { // First time menu loads
            	var html = "";

            	var soldOutItems = {};
            	var prominentItems = {};
                data.forEach(function(element, index) {
                    var id = "burger-item-" + index;
                    var className = element.isSoldOut ? " sold-out" : "";
                    className += element.isProminent ? " prominent" : "";

                    html += "<div class='burger-item-row' id='" + id + "'>";
                    html += 	`<div class="burger-item-label ${className}">${element.label}</div>`;
                    html += 	`<div class="burger-item-price ${className}">${element.price}</div>`;
                    html +=		`<div class="burger-item-linethrough ${className}"></div>`;
                    html += "</div>";
                });

            	document.getElementById("burgers").innerHTML = html;

            	menu = JSON.stringify(data);
        	} else if (JSON.stringify(data) != menu) { // Subsequent loads when there is a change
                data.forEach(function(element, index) {
                    var row = document.getElementById("burger-item-" + index);

                    row.getElementsByClassName("burger-item-label")[0].innerHTML = element.label;
                    row.getElementsByClassName("burger-item-price")[0].innerHTML = element.price;


                    if (element.isSoldOut) {
                        row.getElementsByClassName("burger-item-label")[0].classList.add("sold-out");
                        row.getElementsByClassName("burger-item-price")[0].classList.add("sold-out");
                        row.getElementsByClassName("burger-item-linethrough")[0].classList.add("sold-out");
                    } else {
                        row.getElementsByClassName("burger-item-label")[0].classList.remove("sold-out");
                        row.getElementsByClassName("burger-item-price")[0].classList.remove("sold-out");
                        row.getElementsByClassName("burger-item-linethrough")[0].classList.remove("sold-out");
                    }

                    if (element.isProminent) {
						row.getElementsByClassName("burger-item-label")[0].classList.add("prominent");
                        row.getElementsByClassName("burger-item-price")[0].classList.add("prominent");
                        row.getElementsByClassName("burger-item-linethrough")[0].classList.add("prominent");
                    } else {
                        row.getElementsByClassName("burger-item-label")[0].classList.remove("prominent");
                        row.getElementsByClassName("burger-item-price")[0].classList.remove("prominent");
                        row.getElementsByClassName("burger-item-linethrough")[0].classList.remove("prominent");
                    }

                });

            	menu = JSON.stringify(data);
        	}
    	});
    }

    getData();
    setInterval(getData, 2000);
});