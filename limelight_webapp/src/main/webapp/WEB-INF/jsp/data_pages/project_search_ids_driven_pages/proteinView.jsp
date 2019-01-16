<%--
	proteinView.jsp
	
	View proteins for a project search or multiple

// String path = request.getContextPath();
// String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
--%>

<%@page import="org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers.AA_PageControllerPaths_Constants"%>
<%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>

<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/pageEncodingDirective.jsp" %> <%-- Put on Every Page --%>


<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/top_of_every_page_doctype__jsp_cache_directives.jsp" %>

<html>
<head>
	<title><%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_title_start.jsp" 
				%> Protein</title>
	
	<script id="controller_path" type="text/text"><%= AA_PageControllerPaths_Constants.PROTEIN_VIEW_PAGE_CONTROLLER %></script>
	
 <%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_include_data_pages.jsp" %> 

</head>
<body class=" <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_standard_header_pages.jsp" 
		  		%><%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_data_pages.jsp" 
				%> protein-page ">

 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_body_tag_start_include_data_pages.jsp" %> 

  <%@ include file="/WEB-INF/jsp/jsp_header_footer/header_main_pages.jsp" %>

   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_header_include_data_pages.jsp" %>
   
	<h3>
		List search proteins:
	</h3>
	
	<!--  Navigation Links -->
	<div id="data_pages_nav_links_page_container" ></div>
	
	<h4>Filters:</h4>
		
	<table class=" selector_filter_section " style="border-width:0px;" >
	</table>
	
	<!--  Save View Button -->
	<div class=" selector_save_view_root_container" ></div>

	<h3>
		Protein List:
	</h3>
		
	<div id="protein_counts_download_assoc_psms_block" style=" margin-bottom: 10px; display: none;">
		Protein Count: <span id="protein_list_size"></span>
		<span  id="reported_peptide_count_label" style="padding-left: 10px; display: none;">Peptide Count: 
			</span><span id="reported_peptide_count_display"></span>
		<span id="psm_count_label" style="padding-left: 10px; display: none;">PSM Count: 
			</span><span id="psm_count_display"></span>
	
		<span style="padding-left: 10px; display: none;" id="protein_download_proteins" class=" fake-link " >Download Proteins</span>
	
		<span style="padding-left: 10px; display: none;" id="protein_download_assoc_psms" class=" fake-link " >Download PSMs</span>
	</div>
	
	<%--  Proteins are displayed here --%>
	
  <div id="protein_list_container">
  
  	
  </div>
  
  	<script id="protein_table_loading_text"  type="text/text">Loading Data</script>

   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_footer_include_data_pages.jsp" %>
	
  <%@ include file="/WEB-INF/jsp/jsp_header_footer/footer_main.jsp" %>

 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_closing_body_tag_include_data_pages.jsp" %>

 	<%--  Determine which Javascript bundle to load based on user type --%>
  <c:choose>
    <c:when test="${ webSessionAuthAccessLevel.assistantProjectOwnerAllowed }">
	  	<%--  Project Owner or Researcher and Project is NOT locked --%>
	  <script type="text/javascript" src="static/js_generated_bundles/data_pages/proteinViewPage_RootLaunch_LoggedInUsers-bundle.js?x=${ cacheBustValue }"></script>
  	</c:when>
  	<c:otherwise>
	  	<%--  Public User or Project is Locked --%>
	  <script type="text/javascript" src="static/js_generated_bundles/data_pages/proteinViewPage_RootLaunch_PublicUser-bundle.js?x=${ cacheBustValue }"></script>
  	</c:otherwise>
  </c:choose>
	
  <%@ include file="//WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp" %>	
</body>
</html>