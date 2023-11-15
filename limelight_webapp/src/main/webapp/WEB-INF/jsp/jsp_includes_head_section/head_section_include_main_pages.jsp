<%--  
	head_section_include_main_pages.jsp 
	
	
	Includes 'head_section_include_every_page.jsp'
	
--%>
 <%@page import="org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers.AA_PageControllerPaths_Constants"%>
<%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>

 <%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_include_every_page.jsp" %>

		<%--  Currently only populated in DataPage_ProjectSearchIdBased_ControllersAccessControl_SpringHandlerInterceptor
				for Project Search Id Based Data Pages
		 --%>
 <script id="main_page_current_project_id" type="text/text" ><c:out value="${ currentProjectId }"></c:out></script>
 
 <script id="main_page_project_ids" type="text/text" ><c:out value="${ projectIds }"></c:out></script>
 
 <script id="main_page_project_entries" type="text/text" ><c:out value="${ projectEntries }"></c:out></script>
 
 <script id="main_page_project_search_id_based_controller_path_prefix" type="text/text"><%= AA_PageControllerPaths_Constants.PROJECT_SEARCH_ID_BASED_PAGE_CONTROLLER_START %></script>
 
 <script id="main_page_experiment_id_based_controller_path_prefix" type="text/text"><%= AA_PageControllerPaths_Constants.EXPERIMENT_ID_BASED_PAGE_CONTROLLER_START %></script>
 
 <script id="main_page_feature_detection_id_based_controller_path_prefix" type="text/text"><%= AA_PageControllerPaths_Constants.FEATURE_DETECTION_ID_BASED_PAGE_CONTROLLER_START %></script>
 
 <script id="main_page_project_scan_file_id_based_controller_path_prefix" type="text/text"><%= AA_PageControllerPaths_Constants.PROJECT_SCAN_FILE_ID_BASED_PAGE_CONTROLLER_START %></script>
 
 <script id="main_page_lorikeet_page_controller_path" type="text/text"><%= AA_PageControllerPaths_Constants.LORIKEET_SPECTRUM_VIEWER_PAGE_CONTROLLER %></script>
	
<script id="controller_path_scan_file_browser" type="text/text"><%= AA_PageControllerPaths_Constants.SCAN_FILE_BROWSER_PAGE_CONTROLLER %></script>
	