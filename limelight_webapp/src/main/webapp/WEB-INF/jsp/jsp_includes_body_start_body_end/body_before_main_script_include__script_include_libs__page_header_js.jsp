<%--

	body_before_main_script_include__script_include_libs__page_header_js.jsp
	
	Import Common JS libs before main Javascript file for the page is imported
	
	Import JS to set up Page Header HTML on "Main" pages ( pages that include "header_main_pages.jsp" )
	
	Import Here so that most of the initial shell of a page renders 
	before waiting for any Javascript to import, parse and run
	
--%>
<%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>


	<script type="text/javascript" src="static/js/libs/jquery-3.3.1.min.js"></script>

	<script type="text/javascript" src="static/js/libs/jquery-migrate-3.1.0.min.js"></script>
	
	<script type="text/javascript" src="static/js/libs/jquery-ui.min.js"></script>

<%-- 
--%>
	<script type="text/javascript" src="static/js/libs/jquery.qtip.min.js"></script>


	 <c:if test="${ not empty headerUserInfo }">
	 
	 	<%--  Run Javascript to set up Header Section.  --%>
	 	
	 	<script type="text/javascript" src="static/js_generated_bundles/header_main_pages/limelight__header_main_pages_Setup-bundle.js?x=${ cacheBustValue }"></script>
	 
	 </c:if>
	