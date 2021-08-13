<%--
	webappAdminManageTermsOfService.jsp
	
	Webapp Administration Manage Terms of Service Page

// String path = request.getContextPath();
// String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
--%>

<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/pageEncodingDirective.jsp" %> <%-- Put on Every Page --%>


<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/top_of_every_page_doctype__jsp_cache_directives.jsp" %>

<html>
<head>
	<title><%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_title_start.jsp" 
				%> Administration Webapp Manage Terms of Service</title>
	
 <%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_include_data_pages.jsp" %> 

</head>
<body class=" <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_standard_header_pages.jsp" 
		  		%><%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_data_pages.jsp" 
				%>  ">

 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_body_tag_start_include_data_pages.jsp" %> 

  <%@ include file="/WEB-INF/jsp/jsp_header_footer/header_main_pages.jsp" %>

   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_header_include_data_pages.jsp" %>
   
	<%--  This is set in the filter so this can/should go on every page --%>
	<input type="hidden" id="logged_in_user_id" value="${ loggedInUserId }" >
	
   	<div style="margin-top: 20px; margin-bottom: 10px;">
	   	<a href="admin">Webapp Administration Main Page</a>
   	</div>
   	
   		
   	<h1>Manage Terms of Service</h1>
   	
	<%--  Manage Terms of Service (TOS) --%>
	
	<div style="margin-top: 20px;">
	
		<div id="tos_loading_message">
			LOADING DATA: Terms of Service Management 
		</div>
	
		<div id="tos_main_block" style="display: none;">

			<div id="tos_not_exist" style="display: none;">
				<div style="margin-bottom: 10px; ">
					Terms of service are not enabled. Users will not have to accept terms of service before using the site.
				</div>
				<div >
					<input type="button" id="tos_add_button" value="Add Terms of Service">
				</div>
			</div>

			<div id="tos_enabled" style="display: none;">
				<div style="margin-bottom: 10px; ">
					Terms of service are enabled. Users must accept terms of service before using the site.
				</div>
				<div style="margin-bottom: 10px;">
					<input type="button" id="tos_change_button" value="Change Terms of Service">
					<input type="button" id="tos_disable_button" value="Disable Terms of Service">
				</div>
				<div style="margin-bottom: 10px; font-weight: bold;">
					Current Terms of Service:
				</div>
				
				<div id="tos_current_terms_of_service">
				</div>
			</div>

			<div id="tos_not_enabled" style="display: none;">
				<div style="margin-bottom: 10px; ">
					Terms of service are not enabled. Users will not have to accept terms of service before using the site.
				</div>
				<div>
					<input type="button" id="tos_enable_button" value="Enable Terms of Service">
				</div>
			</div>
		</div>
	</div>
	
					
   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_footer_include_data_pages.jsp" %>
	
  <%@ include file="/WEB-INF/jsp/jsp_header_footer/footer_main.jsp" %>

 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_closing_body_tag_include_data_pages.jsp" %>
  
  <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp" %>
  
<%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_main_script_include__script_include_libs__page_header_js.jsp" %>
  
  <script type="text/javascript" src="static/js_generated_bundles/webapp_admin/manageTermsOfServicePage_Root-bundle.js?x=${ cacheBustValue }"></script>
  				
</body>
</html>