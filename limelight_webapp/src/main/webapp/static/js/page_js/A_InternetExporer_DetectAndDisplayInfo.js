/**
 * A_InternetExporer_DetectAndDisplayInfo.js
 * 
 * !!!!  Moved to inline script
 * 
 * 
 */

	//  Test for IE and make div above this in body_section_start_include_main_pages.jsp displayed if yes
	
	//Works up to IE 10
	var isIE = (window.navigator.userAgent.indexOf("MSIE") != -1);
	
	//For IE 11
	var isIE11 = /rv:11.0/i.test(window.navigator.userAgent);
	
	var internet_explorer_not_supported_page_url_element = document.getElementById( "internet_explorer_not_supported_page_url" );
	var internet_explorer_not_supported_page_url = internet_explorer_not_supported_page_url_element.innerHTML;
	
	if ( isIE || isIE11 ) {
		
		window.location.href = internet_explorer_not_supported_page_url;
	}
