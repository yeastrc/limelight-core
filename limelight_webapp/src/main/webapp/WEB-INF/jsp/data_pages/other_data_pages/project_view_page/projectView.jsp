<%@page import="org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants"%>
<%@page import="org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers.AA_PageControllerPaths_Constants"%>
<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/pageEncodingDirective.jsp" %> <%-- Put on Every Page --%>
<%--
	projectView.jsp
	
	View a single project

--%>

<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/top_of_every_page_doctype__jsp_cache_directives.jsp" %>

<html>
<head>
	<title><%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_title_start.jsp" 
				%> Project</title>

		<%--  Used by Javascript code for page parts --%>
	<script id="controller_path" type="text/text"><%= AA_PageControllerPaths_Constants.PROJECT_VIEW_PAGE_CONTROLLER %></script>
	
 <%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_include_main_pages.jsp" %>
 
 <%--  Paths to 'Project Search Id' based pages.
 
 		For use in Handlebars template file single_search_template.handlebars
  --%>

  <script id="url_path__peptide" type="text/text"><%= AA_PageControllerPaths_Constants.PEPTIDE_VIEW_PAGE_CONTROLLER %></script>

  <script id="url_path__protein" type="text/text"><%= AA_PageControllerPaths_Constants.PROTEIN_VIEW_PAGE_CONTROLLER %></script>

  <script id="url_path__mod_view" type="text/text"><%= AA_PageControllerPaths_Constants.MOD_VIEW_PAGE_CONTROLLER %></script>
  
</head>
<body class=" <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_standard_header_pages.jsp" 
		  		%><%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_data_pages.jsp" 
				%> project-page ">

 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_body_tag_start_include_data_pages.jsp" %>

  <%@ include file="/WEB-INF/jsp/jsp_header_footer/header_main_pages.jsp" %>

   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_header_include_data_pages.jsp" %>

  <%--  MAIN PAGE --%>

	<%--  Project Information --%>

	<%@ include file="/WEB-INF/jsp/data_pages/other_data_pages/project_view_page/projectView_ProjectInformation.jsp" %>

	<%--  Admin of users in project --%>
	
	<%@ include file="/WEB-INF/jsp/data_pages/other_data_pages/project_view_page/projectView_UserAdminSection.jsp" %>
	
	<%--  Admin of Project is Public or Private --%>
	
	<%@ include file="/WEB-INF/jsp/data_pages/other_data_pages/project_view_page/projectView_PublicAccess.jsp" %>
	
	<%--  Project Owner Upload Data to Project --%>

	<%@ include file="/WEB-INF/jsp/data_pages/other_data_pages/project_view_page/projectView_UploadData.jsp" %>

	<%--  Saved Views --%>

	<%@ include file="/WEB-INF/jsp/data_pages/other_data_pages/project_view_page/projectView_SavedViews.jsp" %>

	<%--  Search List --%>

	<%@ include file="/WEB-INF/jsp/data_pages/other_data_pages/project_view_page/projectView_SearchList.jsp" %>
	
	
	<%--Footer and related --%>
	
   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_footer_include_data_pages.jsp" %>

  <%@ include file="/WEB-INF/jsp/jsp_header_footer/footer_main.jsp" %>

 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_closing_body_tag_include_data_pages.jsp" %>

	<%-- Choose which Javascript bundle to load, based on user type --%>
<c:choose>
  <c:when test="${ webSessionAuthAccessLevel.projectOwnerAllowed }">
  	<%--  Project Owner and Project is NOT locked --%>
	<script type="text/javascript" src="static/js_generated_bundles/data_pages/projectViewPage_ProjectOwner_W_User-bundle.js?x=${ cacheBustValue }"></script>
  </c:when>
  <c:when test="${ webSessionAuthAccessLevel.projectOwnerIfProjectNotLockedAllowed }">
  	<%--  Project Owner and Project IS locked --%>
	<script type="text/javascript" src="static/js_generated_bundles/data_pages/projectViewPage_ProjectLocked_ProjectOwner_W_User-bundle.js?x=${ cacheBustValue }"></script>
  </c:when>
  <c:when test="${ webSessionAuthAccessLevel.assistantProjectOwnerAllowed }">
  	<%--  Researcher (NOT Project Owner) and Project is NOT locked --%>
	<script type="text/javascript" src="static/js_generated_bundles/data_pages/projectViewPage_Researcher_W_User-bundle.js?x=${ cacheBustValue }"></script>
  </c:when>
  <c:when test="${ webSessionAuthAccessLevel.assistantProjectOwnerIfProjectNotLockedAllowed }">
  	<%--  Researcher (NOT Project Owner) and Project IS locked --%>
	<script type="text/javascript" src="static/js_generated_bundles/data_pages/projectViewPage_ProjectLocked_Researcher_W_User-bundle.js?x=${ cacheBustValue }"></script>
  </c:when>
  <c:otherwise>
  	<%--  Project is public and not signed in user --%>
	<script type="text/javascript" src="static/js_generated_bundles/data_pages/projectViewPage_PublicUser-bundle.js?x=${ cacheBustValue }"></script>
  </c:otherwise>

</c:choose>

<%@ include file="//WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp" %>

</body>
</html>