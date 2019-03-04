<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/pageEncodingDirective.jsp" %> <%-- Put on Every Page --%>

<%@page import="org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers.AA_PageControllerPaths_Constants"%>

<%--
	lorikeetSpectrumViewerView.jsp - Child Page for displaying Lorikeet

--%>


<head>
	<title><%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_title_start.jsp" 
				%> Spectrum Viewer</title>
	
	<script id="controller_path" type="text/text"><%= AA_PageControllerPaths_Constants.LORIKEET_SPECTRUM_VIEWER_PAGE_CONTROLLER %></script>
	
 <%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_include_data_pages.jsp" %> 

	<%--  CSS for Lorikeet --%>
   <link rel="stylesheet" href="static/css/lorikeet.css?x=${ cacheBustValue }" type="text/css" media="print, projection, screen" />

</head>
<body class=" data-page ">
<%--  WAS in class=""
 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_standard_header_pages.jsp" 
		  		%><%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_data_pages.jsp" 
				%> -page
 --%>
				
<%-- 
 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_body_tag_start_include_data_pages.jsp" %> 

  <%@ include file="/WEB-INF/jsp/jsp_header_footer/header_main_pages.jsp" %>

   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_header_include_data_pages.jsp" %>
--%>

<%-- 
	Strictly for Debugging:
   <input type="button" value="Add Last passed in" id="add_last_passed_in">
--%>

	<div id="lorikeet_holder">LOADING</div>
	
	<div id="psm_list_outer_container" style="padding-left: 20px; display: none;">
		<h3 style=" margin-top: 10px; padding-left: 2px; font-size: 16px;"> <%-- padding-left: 2px; to match "View PSM" position --%> 
			All PSMs in this Search for Scan Number <span id="scan_number"></span> and Scan Filename <span id="scan_filename"></span>:
		</h3>
	
		<div id="psms_peptides_for_scan_number" style=" padding-right: 20px; padding-bottom: 20px;"></div>
	</div>
<%-- 
 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_closing_body_tag_include_data_pages.jsp" %>
  
  <%@ include file="//WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp" %>	
--%>
  <script type="text/javascript" src="static/js_generated_bundles/data_pages/lorikeetSpectrumViewPage_Root-bundle.js?x=${ cacheBustValue }"></script>

</body>
</html>