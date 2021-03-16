<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/pageEncodingDirective.jsp" %> <%-- Put on Every Page --%>
<%--
	associatedProject_AccessNotAllowed_Page.jsp

--%>

<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/top_of_every_page_doctype__jsp_cache_directives.jsp" %>

<html>
<head>
	<title><%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_title_start.jsp" 
				%> No access to project.</title>
 
 <%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_include_every_page.jsp" %>

</head>
<body class="
<%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_inset_pages.jsp" %>
				">
<div class="page-content-outer-container" >	
 <div class="page-content-container" >	
  <div class="page-content" >	
	

	<div class="logo-large-container" >
		<img src="static/images/login-page-logo.png" />
	</div>
	
	<div style="margin-top: 20px; margin-bottom: 10px; ">
		<div style="margin-top: 1px; margin-bottom: 5px; font-size: 20px; font-weight: bold;">
			Error
		</div>
		<div style="font-size: 16px;">
			<div >
				You do not have access to this project. 
			</div>
			<div >
				Please contact the project owner to get access.
			</div>
		</div>
	</div>
  		
  </div>
 </div>
</div>

<%@ include file="/WEB-INF/jsp/jsp_header_footer/footer_main.jsp" %>	
	
  <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp" %>	
</body>
</html>

