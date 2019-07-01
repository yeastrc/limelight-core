<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/pageEncodingDirective.jsp" %> <%-- Put on Every Page --%>
<%--
	projectsList.jsp
	
	List the projects

// String path = request.getContextPath();
// String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
--%>

<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/top_of_every_page_doctype__jsp_cache_directives.jsp" %>

<html>
<head>
	<title><%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_title_start.jsp" 
				%> List Projects</title>

 <%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_include_main_pages.jsp" %>

</head>
<body class=" <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_standard_header_pages.jsp" 
		  		%><%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_data_pages.jsp" 
				%> projects-list-page
				
				">

 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_body_tag_start_include_data_pages.jsp" %>

  <%@ include file="/WEB-INF/jsp/jsp_header_footer/header_main_pages.jsp" %>

   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_header_include_data_pages.jsp" %>

	<div class="top-level-label your-projects-title" >Your Projects</div>	
	
	
		<%--  The list of projects will be put in this div by the Javascript --%>
	<table border="0" width="100%"  id="project_list">
		 <tr>
		  <td valign="top" style=" padding-right: 10px; width: 1px; "> <%-- Width will expand to fully display the icon --%>
		  		<%-- Same padding-right as <td> in single_project_template.handlebars  --%>
		  
			<img class="new_project_expand_jq selector_tool_tip_attached fake-link-image icon-large " id="new_project_expand_link"
				title="New Project" data-tooltip="Add new project" src="static/images/icon-circle-plus.png">
			<img class="new_project_cancel_jq selector_tool_tip_attached fake-link-image icon-large "  id="new_project_cancel_link"
				title="Close New Project" style="display: none;" data-tooltip="Cancel adding new project" src="static/images/icon-circle-delete.png" >
		  </td>
		  <td>
	
			<div  id="new_project_collapsed" >
			
				<div class="new-project-text" >
					<span class="fake-link new_project_expand_jq selector_tool_tip_attached" 
						style="font-size: 20px;"
						data-tooltip="Add new project"
						>New Project</span>
				</div>
			</div>
			
			<div  id="new_project_expanded" style="display: none; position: relative;">
						
		  		<div id="error_message_project_title_required" class="error-message-container error_message_container_jq"
		  			style="width: 400px;">
		  		
		  			<div class="error-message-inner-container" style="width: 300px;">
		  				<div class="error-message-close-x error_message_close_x_jq">X</div>
			  			<div class="error-message-text" >Project Title cannot be empty</div>
		  			</div>
			  	</div>
<%-- 						
		  		<div class="error-message-container error_message_container_jq" id="error_message_project_abstract_required">
		  		
		  			<div class="error-message-inner-container" style="width: 300px;">
		  				<div class="error-message-close-x error_message_close_x_jq">X</div>
			  			<div class="error-message-text" >Project Abstract cannot be empty</div>
		  			</div>
			  	</div>
--%> 						
				<div class="new-project-text" >
					<div style="margin-bottom: 5px;"><input id="new_project_title" type="text" placeholder="Title" title="Title"></div>
					<div style="margin-bottom: 5px;"><textarea id="new_project_abstract" rows="10" cols="100" placeholder="Abstract" title="Abstract" ></textarea></div>
				</div>
				<input type="button" value="Add Project" id="add_project_button">
				<input type="button" value="Cancel" id="add_project_cancel_button" class="new_project_cancel_jq" >						   	

			
			</div> <%-- End of new project expanded --%>
	
		  </td>
		 </tr>
		 <tr>
		  <td colspan="2">
			<div class="new-project-container-bottom-border" ></div>
		  </td>
		 </tr>
		
		<%--  Project rows get appended to the end --%>
	
	</table>
	
   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_footer_include_data_pages.jsp" %>

  <%@ include file="/WEB-INF/jsp/jsp_header_footer/footer_main.jsp" %>
  
 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_closing_body_tag_include_data_pages.jsp" %>

 <script type="text/javascript" src="static/js_generated_bundles/data_pages/projectsListPage-bundle.js?x=${ cacheBustValue }"></script>
	

  <%@ include file="//WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp" %>	
</body>
</html>