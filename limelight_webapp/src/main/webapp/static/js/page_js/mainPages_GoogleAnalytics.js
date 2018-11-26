/**
 * mainPages_GoogleAnalytics.js
 * 
 * Javascript for Google Analytics 
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

// window.alert("mainPages_GoogleAnalytics.js: " )

// window.alert("googleAnalyticsTrackingCode: " + googleAnalyticsTrackingCode );

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');


var googleAnalyticsTrackingCodeElement = document.getElementById( "google_analytics_tracking_code" );

if ( googleAnalyticsTrackingCodeElement ) {
	var googleAnalyticsTrackingCode = googleAnalyticsTrackingCodeElement.innerHTML;

	if ( googleAnalyticsTrackingCode ) {

//		window.alert("googleAnalyticsTrackingCode: " + googleAnalyticsTrackingCode );
		ga('create', googleAnalyticsTrackingCode, 'auto');
		ga('send', 'pageview');
	}
}
