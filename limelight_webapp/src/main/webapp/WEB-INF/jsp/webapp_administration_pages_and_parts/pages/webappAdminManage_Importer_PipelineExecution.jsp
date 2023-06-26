<%--
	webappAdminManage_Importer_PipelineExeuction.jsp
	
	Webapp Administration Manage Importer / Pipeline Execution Page

 		 Manage Importer and Pipeline Execution Page - Manages the "Run Importer" process and its spawned processes
 
// String path = request.getContextPath();
// String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
--%><%@page import="org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants"%><%@page import="org.yeastrc.limelight.limelight_shared.constants.Limelight__RunImporter_TimeUntilNext_X_Constants"%><%@ 
include file="/WEB-INF/jsp/jsp_includes_head_section/pageEncodingDirective.jsp" %> <%-- Put on Every Page --%>


<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/top_of_every_page_doctype__jsp_cache_directives.jsp" %>

<html>
<head>
	<title><%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_title_start.jsp" 
				%> Administration Webapp Manage Importer and Pipeline Execution</title>
	
 <%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_include_data_pages.jsp" %> 

</head>
<body class=" <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_standard_header_pages.jsp" 
		  		%><%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_data_pages.jsp" 
				%> peptide-page ">

 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_body_tag_start_include_data_pages.jsp" %> 

  <%@ include file="/WEB-INF/jsp/jsp_header_footer/header_main_pages.jsp" %>

   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_header_include_data_pages.jsp" %>
   
	<%--  This is set in the filter so this can/should go on every page --%>
	<input type="hidden" id="logged_in_user_id" value="${ loggedInUserId }" >
	
	<script type="text/text" id="manage_importer_pipeline_execution_page__wait_time_for_check_pause_request_in_seconds"
	><%= Limelight__RunImporter_TimeUntilNext_X_Constants.WAIT_TIME_FOR_CHECK_PAUSE_REQUEST_IN_SECONDS %></script>
	
   	<h1>Manage Importer</h1>
   	
   	<div >
	   	<a href="admin">Webapp Administration Main Page</a>
   	</div>
   		
	<div class="top-level-label-bottom-border" ></div>
	
	<%--  Populated by the JS  --%>
	<div id="AdminPage_Root_Component">
	</div>

					
   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_footer_include_data_pages.jsp" %>
	
  <%@ include file="/WEB-INF/jsp/jsp_header_footer/footer_main.jsp" %>

 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_closing_body_tag_include_data_pages.jsp" %>
  
  <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp" %>
  
<%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_main_script_include__script_include_libs__page_header_js.jsp" %>
  
  
  <script type="text/javascript" src="static/js_generated_bundles/webapp_admin/manage_ImporterPipelineExecution_Page_Root-bundle.js?x=${ cacheBustValue }"></script>
  		 
</body>
</html>