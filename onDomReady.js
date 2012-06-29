/*
* Wrapper for onDOMContentLoaded.
* This event is mapped to onDomReady for better access to it.
*/
/* 
 * Example:
 *	document.ondomready=function(evt) {
 *		alert('DOM is ready!');
 *	};
*/
var debugBuild = false; //Set to true if you want to see debug messages in the Console, or false if not.

if(document.ondomready == undefined) {
		document.ondomready = {};
		document.ondomready = null;
	} else {
		document.ondomready=document.ondomready;
	}
	
	var oldonload=document.onload;
	var isLaunched = 0;
	
	document.onload = function() {	
		if(oldonload !== null) {
			oldonload.call();
		}
	};
	document.addEventListener("DOMContentLoaded", function onDom(evt) {
		var olddomready = document.ondomready;
		if(document.ondomready !== null) {
			if(isLaunched == 0) {
				olddomready.call(evt);
				isLaunched == 1;
				if(console && debugBuild != false) {
					console.log('Event onDomReady has been called by DomContentLoaded.');
				}
			} else {
				if(console && debugBuild != false) {
					console.log('isLaunched=' + isLaunched);
					console.log('Dom ready=' + document.ondomready);
					console.log('Old dom ready=' + olddomready);
				}
			}
		}
	}, false);