(function(window, document) {
	"use strict";


	var bodyStyle = document.body.style;


	// set body to size of viewport
	function scaleBodyToFitWindow() {
		bodyStyle.height = window.innerHeight + "px";
	}


	// onresize
	window.addEventListener("resize", scaleBodyToFitWindow);

	// immediately
	scaleBodyToFitWindow();


}(window, document));
