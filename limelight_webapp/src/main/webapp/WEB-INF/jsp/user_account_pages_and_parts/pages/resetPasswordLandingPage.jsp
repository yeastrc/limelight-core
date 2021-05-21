<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/pageEncodingDirective.jsp" %> <%-- Put on Every Page --%>
<%--
	resetPasswordLandingPage.jsp
	
	Rest Password Landing Page

// String path = request.getContextPath();
// String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
--%>

<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/top_of_every_page_doctype__jsp_cache_directives.jsp" %>

 <%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>

<html>
<head>
	<title>Limelight - Reset Password</title>
 <%@ include file="/WEB-INF/jsp/user_account_pages_and_parts/jsp_includes/head_section_include_user_pages.jsp" %>
	
</head>
<body class="
<%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_inset_pages.jsp" %>
<%@ include file="/WEB-INF/jsp/user_account_pages_and_parts/jsp_includes/body_tag_class_start_include_user_pages.jsp" %>
				">

<input type="hidden" id="resetPasswordTrackingCode" value="<c:out value="${ resetPasswordTrackingCode }"></c:out>"> 

<div class="page-content-outer-container" >	
 <div class="page-content-container" >	
  <div class="page-content" >	
	
	<div class="logo-large-container" >
		<img src="static/images/login-page-logo.png" />
	</div>


  	<div  style="position: relative;" class="page-label">
  	
  		<div class="error-message-container error_message_container_jq" id="error_message_all_fields_required">
  			<div class="error-message-inner-container" >
  				<div class="error-message-close-x error_message_close_x_jq">X</div>
	  			<div class="error-message-text" >All fields are required</div>
	  		</div>
	  	</div>
  		<div class="error-message-container error_message_container_jq" id="error_message_password_confirm_password_not_match">
  			<div class="error-message-inner-container" >
  				<div class="error-message-close-x error_message_close_x_jq">X</div>
	  			<div class="error-message-text" >Password and Confirm Password must match</div>
	  		</div>
	  	</div>

  		<div class="error-message-container error_message_container_jq" id="error_message_from_server">
  			<div class="error-message-inner-container" >
  				<div class="error-message-close-x error_message_close_x_jq">X</div>
	  			<div class="error-message-text" id="error_message_from_server_text"></div>
	  		</div>
	  	</div>
	  	
  		<div class="error-message-container error_message_container_jq" id="error_message_system_error">
  			<div class="error-message-inner-container" >
  				<div class="error-message-close-x error_message_close_x_jq">X</div>
	  			<div class="error-message-text" >System Error</div>
		  	</div>
	  	</div>
	  	
	  	
  		<div class="success-message-container error_message_container_jq" id="success_message_system_success">
  			<div class="success-message-inner-container" >
  				<div class="success-message-close-x error_message_close_x_jq">X</div>
	  			<div class="success-message-text" >Password updated</div>
		  	</div>
	  	</div>	  
	  		  	
  		Enter new password
  	</div>

 	<form id="reset_password_form" action="" >
 				<input type="password" value="" placeholder="New Pasword" class="input-field input_field_jq"  id="password_change_field"  maxlength="40"><br>
				<input type="password" value="" placeholder="Confirm New Pasword" class="input-field input_field_jq"  id="password_confirm_field"  maxlength="40"><br>
		
	 	<INPUT TYPE="submit" class="submit-button" VALUE="Change Password">
	</form>

  </div>

	 <div id="get_help_tab" class="bottom-tab"  > <%-- Add if put box to right for Help: style="border-right-width: 0px;" --%>
		 <a href="https://limelight-ms.readthedocs.io/en/latest/" target="_blank">Get Help</a>
	 </div>

  <div id="signin_tab" class="bottom-tab" style="border-right-width: 0px;" > <%-- Add if put box to right for Help: style="border-right-width: 0px;" --%>
		<a href="user/login?useDefaultURL=yes" >Sign In</a>		
  </div>
      
 </div>
</div>

<%@ include file="/WEB-INF/jsp/jsp_header_footer/footer_main.jsp" %>	
	
<%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp" %>	
		
<%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_main_script_include__script_include_libs__page_header_js.jsp" %>
  	
<script type="text/javascript" src="static/js_generated_bundles/user_pages/userResetPasswordPage_Root-bundle.js?x=${ cacheBustValue }"></script>
	
</body>
</html>