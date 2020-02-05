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
   
   <%--  Outermost div inside <div id="data_page_overall_enclosing_block_div"> from header --%>
   
   <div id="protein_page_outermost_block" style="display: none;"> <%--  Hidden until Javascript has loaded and displays it --%>
   
	<h3>
		List search proteins:
	</h3>
	
	<!--  Navigation Links -->
	<div id="data_pages_nav_links_page_container" ></div>
	
	<h4>Filters:</h4>
		
	<table class=" selector_filter_section " id="protein_main_page_filter_section" style="border-width:0px;" >
		<tbody></tbody>
	</table>
	
	<!-- Outer Container for Save View Button and other buttons  -->
	<div >
		<!--  Save View Button -->
		<div class=" selector_save_view_root_container save-view-root-container " ></div>
		<!--  Share Page Button -->
		<div class=" selector_share_page_root_container share-page-root-container " ></div>
	</div>

	<h3> Protein List:</h3>

	<div id="protein_counts_download_assoc_psms_block" style=" margin-bottom: 10px; display: none;">
	
		<span id="protein_group_list_size_section_display" style="padding-right: 10px; white-space: nowrap; display: none;">Protein Group Count: 
			<span id="protein_group_list_size"></span>
		</span>
		
		<span style=" white-space: nowrap; ">Protein Count: <span id="protein_list_size"></span></span>
		
		<span  id="reported_peptide_count_label" style="padding-left: 10px; white-space: nowrap; display: none;">Peptide Count: 
			</span><span id="reported_peptide_count_display"></span>
		<span id="psm_count_label" style="padding-left: 10px; white-space: nowrap; display: none;">PSM Count: 
			</span><span id="psm_count_display"></span>
	
		<span style="padding-left: 10px; white-space: nowrap; display: none;" id="protein_download_proteins" class=" fake-link " >Download Proteins</span>
	
		<span style="padding-left: 10px; white-space: nowrap; display: none;" id="protein_download_assoc_psms" class=" fake-link " >Download PSMs</span>
		
		<span style="padding-left: 10px; white-space: nowrap; display: none;" id="show_status_link" class=" fake-link " >Show Stats</span>
	</div>
	
	<div id="stats_data_container" style=" display: none;">

	</div>
	
	<%--  Proteins Loading Text --%>
	<div id="protein_table_loading_text_display">Loading Data</div>
	
	<%--  Proteins are displayed here --%>
	
	<div id="protein_list_outer_container" style="position: relative; display: inline-block;"> <%--  display: inline-block; so overlay doesn't extend right past the table right edge --%>
	  	
	  	<div id="protein_list_container" style="display: inline-block;">
		</div>

		<%--  Cover over protein list when updating --%>
		<div id="protein_list_updating_message"
			style="display: none; border-color: grey; border-width: 3px; border-style: solid; background-color: white; position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px">
			<div style=" margin-top: 4px; text-align: center;">
				Updating Protein List
			</div>
		</div>
		
	</div>   <%-- Close:   everything main after <h3> Protein List:</h3> --%>
     
   </div> <%--  close <div id="protein_page_outermost_block"  --%>
   
  
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