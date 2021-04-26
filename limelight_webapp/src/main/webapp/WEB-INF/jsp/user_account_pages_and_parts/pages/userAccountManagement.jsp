<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/pageEncodingDirective.jsp" %> <%-- Put on Every Page --%>
<%--
	userAccountManagement.jsp
	
	User: Account Management

// String path = request.getContextPath();
// String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
--%>

<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/top_of_every_page_doctype__jsp_cache_directives.jsp" %>

<html>
<head>
	<title><%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_title_start.jsp" 
				%> User - Account Management</title>

 <%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_include_main_pages.jsp" %>

</head>
<body class=" <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_standard_header_pages.jsp" 
		  		%><%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_user_account_pages.jsp" 
				%> user-account-management-page
				
				">

 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_body_tag_start_include_data_pages.jsp" %>

  <%@ include file="/WEB-INF/jsp/jsp_header_footer/header_main_pages.jsp" %>

   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_header_include_data_pages.jsp" %>

		<div id="manage_account_loading_block">LOADING</div>

		<div id="manage_account_main_block"></div>
		
		
  <c:if test="${ displaySendImportCompleteEmailMgmtBlock }">
  
  	<script type="text/text" id="display_send_import_complete_email_mgmt_block">Y</script>
  	
  	<c:if test="${ loggedInUser.sendEmailOnImportFinish }">
  	
  		<script type="text/text" id="send_import_complete_true">Y</script>
  	</c:if>
  
  </c:if>
  
  
  <c:if test="${ displaySubmitImportKeyMgmtBlock }">
  
  	<script type="text/text" id="display_submit_import_key_mgmt_block">Y</script>
  </c:if>
  
   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_footer_include_data_pages.jsp" %>

  <%@ include file="/WEB-INF/jsp/jsp_header_footer/footer_main.jsp" %>
  
 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_closing_body_tag_include_data_pages.jsp" %>

  <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp" %>
  	
<%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_main_script_include__script_include_libs__page_header_js.jsp" %>
  		
 <script type="text/javascript" src="static/js_generated_bundles/user_pages/userAccountManagementPage_Root-bundle.js?x=${ cacheBustValue }"></script>
	
  		
</body>
</html>