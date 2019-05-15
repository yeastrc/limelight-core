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

	<div class="top-level-label">Manage Account</div>
	
	<div class="top-level-label-bottom-border" ></div>

	<div class="account-info-block" style="position: relative;" >

	  <div style="position: relative; width: 500px;" >
	  		
  		<div class="error-message-container error_message_container_jq" id="error_message_field_empty">
  			<div class="error-message-inner-container" >
	  			<span class="error-message-text" >A value is required
		  			<span class="error-message-close-x error_message_close_x_jq">X</span></span>
		  	</div>
	  	</div>

  		<div class="error-message-container error_message_container_jq" id="error_message_system_error">
  			<div class="error-message-inner-container" >
	  			<span class="error-message-text" >System Error
		  			<span class="error-message-close-x error_message_close_x_jq">X</span></span>
		  	</div>
	  	</div>

	  </div>


		<div  class="value-container value-container-keep-with-next value_container_jq" style="position: relative;">
		
			<div class="value-label value_label_jq">First Name: </div>
			<div  class="current-value-container current_value_container_jq">
				<span class="current_value_span_jq"><c:out value="${ loggedInUser.firstName }"></c:out></span> 
				<a href="javascript:" class="edit_value_jq" 
					><img src="static/images/icon-edit.png" title="Change First Name" class=" icon-small "></a>
			</div>
			<div  class="edit-value-container edit_value_container_jq">
				<input type="text" value="" class="edit-value-input-field  edit_value_input_field_jq" id="first-name-change-field"  maxlength="40" >
				<input type="button" value="Submit" id="submit-first-name-change-button">
				<input type="button" value="Cancel" class="cancel_button_jq">
			</div>			
		</div>
		
		
		<div  class="value-container value_container_jq" >
			<div class="value-label value_label_jq">Last Name: </div>
			<div  class="current-value-container current_value_container_jq">
				<span class="current_value_span_jq"><c:out value="${ loggedInUser.lastName }"></c:out></span> 
				<a href="javascript:" class="edit_value_jq" 
					><img src="static/images/icon-edit.png" title="Change Last Name" class=" icon-small "></a>
			</div>
			<div  class="edit-value-container edit_value_container_jq">
				<input type="text" value="" class="edit-value-input-field  edit_value_input_field_jq"  id="last-name-change-field"  maxlength="60" >
				<input type="button" value="Submit" id="submit-last-name-change-button">
				<input type="button" value="Cancel" class="cancel_button_jq">
			</div>			
		</div>

		
		<div  class="value-container value_container_jq">
			<div class="value-label value_label_jq" style="position: relative;" >
		
		  		<div class="error-message-container error_message_container_jq" id="error_message_email_already_exists">
		  			<div class="error-message-inner-container" >
			  			<span class="error-message-text" >Another acccount already has that email address
				  			<span class="error-message-close-x error_message_close_x_jq">X</span></span>
				  	</div>
			  	</div>			
				Email Address: 
			</div>
			<div  class="current-value-container current_value_container_jq">
				<span class="current_value_span_jq"><c:out value="${ loggedInUser.email }"></c:out></span> 
				<a href="javascript:" class="edit_value_jq" 
					><img src="static/images/icon-edit.png" title="Change Email" class=" icon-small "></a>
			</div>
			<div  class="edit-value-container edit_value_container_jq">
				<input type="text" value="" class="edit-value-input-field  edit_value_input_field_jq" id="email-change-field" maxlength="255">
				<input type="button" value="Submit" id="submit-email-change-button">
				<input type="button" value="Cancel" class="cancel_button_jq">
			</div>			
		</div>

		
		<div  class="value-container value_container_jq">
			<div class="value-label value_label_jq">Organization: </div>
			<div  class="current-value-container current_value_container_jq">
				<span class="current_value_span_jq"><c:out value="${ loggedInUser.organization }"></c:out></span> 
				<a href="javascript:" class="edit_value_jq" 
					><img src="static/images/icon-edit.png" title="Change Organization" class=" icon-small "></a>
			</div>
			<div  class="edit-value-container edit_value_container_jq">
				<input type="text" value="" class="edit-value-input-field  edit_value_input_field_jq" id="organization-change-field"  maxlength="2000">
				<input type="button" value="Submit" id="submit-organization-change-button">
				<input type="button" value="Cancel" class="cancel_button_jq">
			</div>			
		</div>

		
		<div  class="value-container value_container_jq">
			<div class="value-label value_label_jq" style="position: relative;" >
		
		  		<div class="error-message-container error_message_container_jq" id="error_message_username_already_exists">
		  			<div class="error-message-inner-container" >
			  			<span class="error-message-text" >Another acccount already has that username
				  			<span class="error-message-close-x error_message_close_x_jq">X</span></span>
				  	</div>
			  	</div>			
			  	Username: 
			</div>
			
			<div  class="current-value-container current_value_container_jq">
				<span class="current_value_span_jq"><c:out value="${ loggedInUser.username }"></c:out></span> 
				<a href="javascript:" class="edit_value_jq" 
					><img src="static/images/icon-edit.png" title="Change Username" class=" icon-small "></a>
			</div>
			<div  class="edit-value-container edit_value_container_jq">
				<input type="text" value="" class="edit-value-input-field  edit_value_input_field_jq" id="username-change-field"  maxlength="40">
				<input type="button" value="Submit" id="submit-username-change-button">
				<input type="button" value="Cancel" class="cancel_button_jq">
			</div>			
		</div>

		
		<div  class="value-container value_container_jq">
			<div class="value-label value_label_jq" style="position: relative;" >
	  	
		  		<div class="error-message-container error_message_container_jq" id="error_message_old_password_invalid">
		  			<div class="error-message-inner-container"  style="width:500px;" >
			  			<span class="error-message-text" >Old Password is Invalid
				  			<span class="error-message-close-x error_message_close_x_jq">X</span></span>
				  	</div>
			  	</div>
		
		  		<div class="error-message-container error_message_container_jq" id="error_message_password_confirm_not_match">
		  			<div class="error-message-inner-container" style="width:500px;" >
			  			<span class="error-message-text" >The new password and confirm password do not match
				  			<span class="error-message-close-x error_message_close_x_jq">X</span></span>
				  	</div>
			  	</div>			
			  	Password: 
			</div>
			
			<div  class="current-value-container current_value_container_jq">
				<a href="javascript:" class="edit_value_jq" >Change Password</a> 
			</div>
			<div  class="edit-value-container edit_value_container_jq">
			  <div >
				<input type="password" value="" placeholder="Old Password" title="Old Password"  
						class="edit-value-input-field  " id="password-change-old-password-field"  maxlength="40">
			  </div>
			  <div style="margin-top: 5px;">
				<input type="password" value="" placeholder="New Password" title="New Password"  
						class="edit-value-input-field  " id="password-change-field"  maxlength="40">
			  </div>
			  <div style="margin-top: 5px; margin-bottom: 6px;">
				<input type="password" value="" placeholder="Confirm New Password" title="Confirm New Password"  
						class="edit-value-input-field  " id="password-confirm-field"  maxlength="40"><br>
			  </div>
			  <div >
				<input type="button" value="Submit" id="submit-password-change-button"> 
				<input type="button" value="Cancel" class="cancel_button_jq">
			  </div>
			</div>			
		</div>
		
	</div> <%--  END: <div class="account-info-block" style="position: relative;" >  --%>
  
  <c:if test="${ displaySubmitImportKeyMgmtBlock }">
  
  	<div class="submit-import-key-mgmt-block" id="submit_import_program_key_mgmt_block" style="display: none;">
  	  <div style="font-weight: bold;">
  		Submit Import Program Key
  	  </div>
  	  <div >
  	    Manage the key that is required for use with the Submit Import Program.
  	  </div>
  	  <div >
  	    (If the Submit Import Program is not used, then this key is not needed)
  	  </div>
  		
  	  <div  id="submit_import_program_key_add_key__block" style="display: none; margin-top: 10px;">
  	  	<input type="button" value="Create Key" id="submit_import_program_key_add_key__control">
  	  </div>

  	  <div id="submit_import_program_key_change_remove_key__block" style="display: none;">
  	    <div style="margin-top: 10px; margin-bottom: 10px;">
  	    	<span style="font-weight: bold;" >Current Key:</span> <span id="submit_import_program_key_current_key"></span>
  	    </div>
  	    <div >
	  	  	<input type="button" value="Change Key" id="submit_import_program_key_change_key__control">
	  	  	<input type="button" value="Remove Key" id="submit_import_program_key_remove_key__control">
  	    </div>
  	  </div>
  	
  	</div>
  	
  </c:if>
  
   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_footer_include_data_pages.jsp" %>

  <%@ include file="/WEB-INF/jsp/jsp_header_footer/footer_main.jsp" %>
  
 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_closing_body_tag_include_data_pages.jsp" %>

 <script type="text/javascript" src="static/js_generated_bundles/user_pages/userAccountManagementPage_Root-bundle.js?x=${ cacheBustValue }"></script>
	

  <%@ include file="//WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp" %>	
</body>
</html>