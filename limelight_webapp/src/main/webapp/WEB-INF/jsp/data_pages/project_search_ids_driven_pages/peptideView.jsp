<%--
	peptideView.jsp
	
	View peptides for a project search or multiple

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
				%> Peptide</title>
	
	<script id="controller_path" type="text/text"><%= AA_PageControllerPaths_Constants.PEPTIDE_VIEW_PAGE_CONTROLLER %></script>
	
 <%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_include_data_pages.jsp" %> 

</head>
<body class=" <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_standard_header_pages.jsp" 
		  		%><%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_data_pages.jsp" 
				%> peptide-page ">

 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_body_tag_start_include_data_pages.jsp" %> 

  <%@ include file="/WEB-INF/jsp/jsp_header_footer/header_main_pages.jsp" %>

   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_header_include_data_pages.jsp" %>
   
	<h3>
		Peptides View
	</h3>
	
	<!--  Navigation Links -->
	<div id="data_pages_nav_links_page_container" ></div>
	
	<!--  Search Details and Filters (PSM, Peptide, and Protein) -->
	<div id="search_details_and_other_filters_outer_block_react_root_container"></div>


	<!-- Outer Container for Save View Button and other buttons  -->
	<div >
		<!--  Save As Default Button -->
		<div class=" selector_set_default_view_root_container set-default-view-container " style="dislay: none;" ></div>
		<!--  Save View Button -->
		<div class=" selector_save_view_root_container save-view-root-container " ></div>
		<!--  Share Page Button -->
		<div class=" selector_share_page_root_container share-page-root-container " ></div>
	</div>

	<h3>
		Peptide List:
	</h3>
	<div style="margin-bottom: 10px;">
		Peptide Count: <span id="peptide_list_size"></span>
	</div>
	
		<%--  Peptides Loading Text --%>
	<div id="peptide_table_loading_text_display">Loading Data</div>
			
			<%--  No Peptides Text --%>
	<div id="peptide_table_empty_text_display" style="display: none;">No peptides meet the current filtering criteria.</div>
	
	<%--  Peptides are displayed here --%>
	
  <div id="peptide_list_container">
  
  	
  </div>
  
   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_footer_include_data_pages.jsp" %>
	
  <%@ include file="/WEB-INF/jsp/jsp_header_footer/footer_main.jsp" %>

 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_closing_body_tag_include_data_pages.jsp" %>
  
 	<%--  Determine which Javascript bundle to load based on user type --%>
  <c:choose>
    <c:when test="${ webSessionAuthAccessLevel.assistantProjectOwnerAllowed }">
	  	<%--  Project Owner or Researcher and Project is NOT locked --%>
	  <script type="text/javascript" src="static/js_generated_bundles/data_pages/peptideViewPage_RootLaunch_LoggedInUsers-bundle.js?x=${ cacheBustValue }"></script>
  	</c:when>
  	<c:otherwise>
	  	<%--  Public User or Project is Locked --%>
	  <script type="text/javascript" src="static/js_generated_bundles/data_pages/peptideViewPage_RootLaunch_PublicUser-bundle.js?x=${ cacheBustValue }"></script>
  	</c:otherwise>
  </c:choose>
  
  <%@ include file="//WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp" %>	
</body>
</html>