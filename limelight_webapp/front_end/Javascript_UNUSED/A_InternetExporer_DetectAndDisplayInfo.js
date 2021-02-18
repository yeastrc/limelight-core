/**
 * A_InternetExporer_DetectAndDisplayInfo.js
 * 
 * Javascript for including on every page at the start of the <body> 
 * by including in body_section_start_include_every_page.jsp   
 * 
 * 
 */


//  !!!!!  Moved To JSP as INLINE Script


// //  If true, do nothing on any page since message is displayed
// var browser_InternetExplorerDetected = false;
//
// 	//  Test for IE and make div above this in body_section_start_include_every_page.jsp displayed if yes
//
// 	//Works up to IE 10
// 	var isIE = (window.navigator.userAgent.indexOf("MSIE") != -1);
//
// 	//For IE 11
// 	var isIE11 = /rv:11.0/i.test(window.navigator.userAgent);
//
// 	if ( isIE || isIE11 ) {
// 		browser_InternetExplorerDetected = true;
// 		//  Show <div> above with id 'internet_explorer_not_supported_message'
// 		var internet_explorer_not_supported_message = document.getElementById( "internet_explorer_not_supported_message" );
// 		internet_explorer_not_supported_message.style.display = "block";
// 	}
