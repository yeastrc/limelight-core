<%--

head_section_include_every_page.jsp

--%>

<%@page import="org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.error_pages_controllers.AA_ErrorPageControllerPaths_Constants"%>
<%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>

 	<%--  Make all relative URLs start after the context path request.getContextPath() --%>
	<base href="<%= request.getContextPath() %>/">  <%-- The trailing '/' in the href is required --%>
	
	<script id="internet_explorer_not_supported_page_url" 
		type="text/text" ><%= request.getContextPath() %>/<%= AA_ErrorPageControllerPaths_Constants.INTERNET_EXPLORER_NOT_SUPPORTED_ERROR_PAGE_CONTROLLER %></script>
	
    <link rel="icon" href="static/images/favicon.ico" />
    
    <%--  Disable all inline Javascript.  Can put remote URLs like: https://code.jquery.com  
    
    		See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src
    --%>
    <%--
    	First hash 'sha256-LtIWLBFFzfYXdIGWJ2t/yMJVIYyKlWYs6JwRq0ESN9U='  
    	is for inline script in this file for IE testing.
    	
    	https://www.gstatic.com/charts/loader.js is for Google Charts
    	
    	Chrome will display a console log for any inline scripts along with the hash code that can be added here.
    --%>
<%--    
 --%>
    <meta http-equiv="Content-Security-Policy" 
    	content="script-src
    		'self' 
    		'sha256-LtIWLBFFzfYXdIGWJ2t/yMJVIYyKlWYs6JwRq0ESN9U=' <%-- inline script in this file for IE testing. --%>
    		'sha256-zFC+///Xk4FAbxdUL7/FfF4qw3h5uHyU1+/S3dKmzLg=' <%-- inline script in this file for Page Error reporting. --%>
    		https://www.gstatic.com/  <%-- Google Charts Loader and Google Recaptcha data loaded from here --%>
    		'unsafe-eval'             <%-- Required for Plotly WebGL detection and Google Charts (Google Charts currently NOT used) --%> 
    		https://www.googletagmanager.com/gtag/js  <%-- Google Analytics --%>
    		https://www.google-analytics.com/analytics.js   <%-- Google Analytics --%>
    		https://www.recaptcha.net/recaptcha/api.js  <%-- Google Recaptcha --%>
    		https://www.google.com/recaptcha/api.js  <%-- Google Recaptcha Original path --%>
    		;
    		">
 
<%-- Included script tests for Internet Explorer. --%>
<%--  Moved to inline script next
<script type="text/javascript" src="static/js/page_js/A_InternetExporer_DetectAndDisplayInfo.js?x=${ cacheBustValue }"></script>
 --%>


 
 <%--  !!!!!  WARNING  !!!!!!:   Any changes to this script requires changing the hash code in "Content-Security-Policy"
 
 					Otherwise, this script will not be processed.  See Chrome console for new hash.
  --%>
   <%-- 
   --%>
 
 <%-- request variable 'InternetExplorer_NotSupported_Error' is set to true in InternetExplorerNotSupportedPage_Controller  
 		so that this Javascript will be skipped.
 		If this Javascript is executed on that page, it will result in an infinite redirect.
 --%>  
<c:if test="${ not InternetExplorer_NotSupported_Error }">
	
<%--  WARNING:  Do not change the contents of this script, even white space like indention.
		If must change this script, need to generate a new hash for
		'meta http-equiv="Content-Security-Policy" ' above in this file
 --%>
<script type="text/javascript" >
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
</script>
	
</c:if>


 <%--  !!!!!  WARNING  !!!!!!:   Any changes to this script requires changing the hash code in "Content-Security-Policy"
 
 					Otherwise, this script will not be processed.  See Chrome console for new hash.
 					
		Do not change the contents of this script, even white space like indention.
		If must change this script, need to generate a new hash for
		'meta http-equiv="Content-Security-Policy" ' above in this file
		
		'inline script in this file for Page Error reporting'
 --%>
     <script type="text/javascript" >

         window.onerror = function(message, source, lineno, colno, error) {

             console.warn("In window.onerror function:")
             console.warn("window.onerror message:", message)
             console.warn("window.onerror source:", source)
             console.warn("window.onerror lineno:", lineno)
             console.warn("window.onerror colno:", colno)
             console.warn("window.onerror error:", error)

             window.setTimeout( function () {

                 var html = (
               		 '<div style="position: absolute; background-color: white; z-index: 10000; top:40px; left:40px; width:500px; padding: 10px; border-width: 5px; border-color: red; border-style: solid;" >' +

                     '<h1 style="color: red;">Error in Page Code</h1>' +

                     '<h3>Please reload the page and try again.</h3>' +
                     '<h3>If this error continues to occur, please contact the person at the bottom of the page, if someone is listed there.' +
                     '  Please include the browser and operating system used</h3>' +

                     '<br><br>' +

                     '</div>'
                 );


                 var addedDivElementDOM = document.createElement("div");

                 var documentBody = document.querySelector('body');

                 documentBody.appendChild( addedDivElementDOM );

                 addedDivElementDOM.innerHTML = html

                window.scroll(0, 0);  // scroll to top left, assuming message is in that corner

             }, 2000 )
         }

     </script>



<script id="webservice_sync_tracking_code" type="text/text" >${ webserviceSyncTracking }</script>

<%-- 
--%>
   <link rel="stylesheet" href="static/css/jquery.qtip.min.css?x=${ cacheBustValue }" type="text/css" media="print, projection, screen" />


   <link rel="stylesheet" href="static/css_generated/global.css?x=${ cacheBustValue }" type="text/css" media="print, projection, screen" />
   