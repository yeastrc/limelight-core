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


var googleAnalyticsTrackingCodeElement = document.getElementById( "google_analytics_tracking_code" );

if ( googleAnalyticsTrackingCodeElement ) {
	var googleAnalyticsTrackingCode = googleAnalyticsTrackingCodeElement.innerHTML;

	if ( googleAnalyticsTrackingCode ) {

//		window.alert("googleAnalyticsTrackingCode: " + googleAnalyticsTrackingCode );
		
		  window.dataLayer = window.dataLayer || [];
		  function gtag(){window.dataLayer.push(arguments);}
		  gtag('js', new Date());

		  gtag('config', googleAnalyticsTrackingCode);
	}
}
