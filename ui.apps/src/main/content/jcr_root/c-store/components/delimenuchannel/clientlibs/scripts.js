window.addEventListener("load", () => {
    if (window.parent && window.parent.location.href.indexOf("editor.html") != -1)
    	return;

	if (document.getElementById("promo") != null) {
        document.getElementById("promo").style.display = "none";
		var isDisplayPromo = false;
        function getData() {
            fetch("http://localhost/c-store/deli_menu.json?r=" + Math.random())
            .then(response => response.json())
            .then(data => {
                if (data.isDisplayPromo && !isDisplayPromo) {
                    document.getElementById("promo").style.display = "block";
                    isDisplayPromo = true;
                } else if (!data.isDisplayPromo && isDisplayPromo) {
                    document.getElementById("promo").style.display = "none";
                    isDisplayPromo = false;
                }
    
                setTimeout(getData, 2000);
            });
    	}


    
        getData();
    }
});