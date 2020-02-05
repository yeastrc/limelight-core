<%--
	testMikeWebservices.jsp
	
	Test Mike Webservices for a project search or multiple

// String path = request.getContextPath();
// String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
--%>

<%@page import="org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers.AA_PageControllerPaths_Constants"%>
<%@page import="org.yeastrc.limelight.limelight_import.api.xml_dto.FilterDirectionType"%>

<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/pageEncodingDirective.jsp" %> <%-- Put on Every Page --%>


<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/top_of_every_page_doctype__jsp_cache_directives.jsp" %>

<html>
<head>
	<title><%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_title_start.jsp" 
				%> Test Mike Webservices</title>
	
	<script id="controller_path" type="text/text"><%= AA_PageControllerPaths_Constants.TEST_MIKE_WEBSERVICES_PAGE_CONTROLLER %></script>
	
 <%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_include_data_pages.jsp" %> 

</head>
<body class=" <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_standard_header_pages.jsp" 
		  		%><%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_data_pages.jsp" 
				%> peptide-page ">

 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_body_tag_start_include_data_pages.jsp" %>

  <%@ include file="/WEB-INF/jsp/jsp_header_footer/header_main_pages.jsp" %>

   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_header_include_data_pages.jsp" %>

	<h2>
		Project: <span id="peptide_name_display"></span>
	</h2>
	
	<h3>
		Test Mike Webservices:
	</h3>
	
	<h4>Filters:</h4>
	
	<div style="position: relative;">
		<%-- Filters Overlay --%>
		<%-- 
		<%@ include file="/WEB-INF/jsp/data_pages/project_search_ids_driven_pages/testMikeWebservice_filtersOverlay.jsp" %>
		--%>
	</div>
	
	<table class=" selector_filter_section " id="main_page_filter_section" style="border-width:0px;" >
		<tbody></tbody>
	</table>
	
	<%-- 
	<input id="filters_change" type="button" value="Change Filters" >
	--%>

	<h3>
		Protein Info Count: <span id="protein_list_size"></span> <span id="protein_list_loading_msg">Loading</span>
	</h3>
  
	<h3>
		Protein Mod Info Count: <span id="protein_mod_list_size"></span> <span id="protein_mod_list_loading_msg">Loading</span>
	</h3>
	
	<h3>
		Protein Sequence Count: <span id="protein_sequence_size"></span> <span id="protein_sequence_loading_msg">Loading</span>
	</h3>

   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_footer_include_data_pages.jsp" %>
	
  <%@ include file="/WEB-INF/jsp/jsp_header_footer/footer_main.jsp" %>

 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_closing_body_tag_include_data_pages.jsp" %>
  
 <script type="text/javascript" src="static/js_generated_bundles/data_pages/testMikeWebservicePage_Root-bundle.js?x=${ cacheBustValue }"></script>
	
</body>
</html>