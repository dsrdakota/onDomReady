/*
* Wrapper for onDOMContentLoaded.
* This event is mapped to onDomReady for better access to it.
*/
/* 
 * Example:
 *	document hook:
 *	document.ondomready=function(evt) {
 *		alert('DOM is ready!');
 *	};
 *	
 *	window hook:
 *	window.ondomready=function(evt) {
 *		alert('DOM is ready!');
 *	};
 *	
*/
	var debugBuild = false; //Set to true if you want to see debug messages in the Console, or false if not.

	if(window.ondomready == undefined) {
		window.ondomready = {};
		window.ondomready = null;
	} else {
		window.ondomready=window.ondomready;
	}
	
	if(document.ondomready == undefined) {
		document.ondomready = {};
		document.ondomready = null;
	} else {
		document.ondomready=document.ondomready;
	}
	
	var winonload=window.onload;
	var oldonload=document.onload;
	var isLaunched = 2;
	
	document.onload = function() {	
		if(oldonload !== null) {
			oldonload.call();
		}
	};
	
	window.onload=function() {
		if(winonload !== null) {
			winonload.call();
		}
	};
	
	document.addEventListener("DOMContentLoaded", function onDom(event) {
		var windomready = window.ondomready; //Save the window hook
		var olddomready = document.ondomready; //Save the document hook
		if((document.ondomready)||(window.ondomready)) { //Check for the hooks
			if(isLaunched > 0) { //Check if DomReady hasn't been launched
				
				var evt = document.createEvent('Event'); //Create document DomReady event
				evt.initEvent('onDomReady', true, false);   //Initialize document DomReady Event
				document.dispatchEvent(evt); //Dispatch the document DomReady event
				//window.dispatchEvent(evt); //Dispatch the window DomReady event
				
				//OLD FOR EMERGENCIES OR BROKEN: if(document.ondomready !== null) { //Make sure DomReady isn't 100% null
				
				if(window.ondomready) { //Make sure DomReady isn't null by browser feature detection
					if(isLaunched == 2) {
						//Always load window hook first
						windomready.call(this, evt); //Execute if not null (already checked on line: if((document.ondomready)||(window.ondomready)) {...)		
					}
				}
				isLaunched -= 1; //Lower value
				
				if(document.ondomready) { //Make sure DomReady isn't null by browser feature detection
					if(isLaunched == 1) {
						//Always load document hook next
						olddomready.call(this, evt); //Execute if not null (already checked on line: if((document.ondomready)||(window.ondomready)) {...)
					}
				}
				isLaunched -= 1; //Lower value
				
				isLaunched = 0; //Make sure it isn't launched again in case of a continuous loop that may or may not stop looping
				
				if(console && debugBuild != false) { //Debugging
					console.log('Event onDomReady has been called by DomContentLoaded.');
				}
			} else {
				if(console && debugBuild != false) { //Debugging
					console.log('isLaunched=' + isLaunched); //Has DomReady already been launched?
					console.log('Dom ready=' + document.ondomready); //Current DomReady function hook
					console.log('Old dom ready=' + olddomready); //Old DomReady function hook
				}
			}
		} else {
				if(console && debugBuild != false) { //Debugging
					console.log('No hooks for ondomready.');
				}
		}
	}, false);