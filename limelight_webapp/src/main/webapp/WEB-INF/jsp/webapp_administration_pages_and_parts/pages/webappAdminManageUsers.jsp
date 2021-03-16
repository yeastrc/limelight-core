<%--
	webappAdminManageUsers.jsp
	
	Webapp Administration Manage Users Page

// String path = request.getContextPath();
// String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
--%>

<%@page import="org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants"%>
<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/pageEncodingDirective.jsp" %> <%-- Put on Every Page --%>


<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/top_of_every_page_doctype__jsp_cache_directives.jsp" %>

<html>
<head>
	<title><%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_title_start.jsp" 
				%> Administration Webapp Manage Users</title>
	
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
	
   	<h1>Manage Users</h1>
   	
   	<div >
	   	<a href="admin">Webapp Administration Main Page</a>
   	</div>
   		

	<div class="top-level-label">Manage Users</div>
	
	<div class="top-level-label-bottom-border" ></div>

<%-- 
	<div id="invite_user_block" >

		<div  id="invite_user_collapsed" >

			<div style="float: left; padding-left: 3px; padding-right: 10px;">
			  <a href="javascript:" class="invite_user_expand_link_jq">
				<img src="static/images/icon-add-user.png" class=" icon-small ">
			  </a>
			</div>
			<div style="padding-top: 2px; ">
			  <a href="javascript:" class="invite-user-text-link invite_user_expand_link_jq">
				Invite User
			  </a>
			</div>

		</div>		
	
	
		<div  id="invite_user_expanded" style="display: none;"  > 
	
		  <div style="position: relative; width: 500px;" >
		  		
	  		<div class="error-message-container error_message_container_jq" id="error_message_field_empty">
	  			<div class="error-message-inner-container" >
		  			<span class="error-message-text" >A value is required
			  			<span class="error-message-close-x error_message_close_x_jq">X</span></span>
			  	</div>
		  	</div>
		  	
	  		<div class="error-message-container error_message_container_jq" id="error_message_email_already_exists">
	  			<div class="error-message-inner-container" >
		  			<span class="error-message-text" >A user with that email already exists.
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
	
			<div style="float: left; padding-left: 3px; padding-right: 10px;">
		  	  	<a href="javascript:"  class="invite_user_cancel_button_jq">
					<img src="static/images/icon-circle-delete.png" title="Cancel User Invite">
			  	</a>
		  	</div>

			<div style="padding-top: 0px; ">
				<input placeholder="Email Address" id="invite_user_email"  title="Email Address" >
	
				<select id="invite_person_access_level_entry_field">
							<option value="<%= AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN %>" >Administrator</option>
							<option value="<%= AuthAccessLevelConstants.ACCESS_LEVEL_CREATE_NEW_PROJECT_AKA_USER %>" >User</option>
				</select>
	
				<input type="button" value="Invite User" id="invite_user_button">
				<input type="button" value="Cancel" class="invite_user_cancel_button_jq">
			</div>
									   	
		</div>
	
		<div class="top-level-label-bottom-border" style="width: 100%" ></div>
	</div>
--%>   

	<div id="create_user_block" >

		<div  id="create_user_collapsed" >

			<div style="float: left; padding-left: 3px; padding-right: 10px;">
			  <a href="javascript:" class="create_user_expand_link_jq">
				<img src="static/images/icon-add-user.png" class=" icon-small ">
			  </a>
			</div>
			<div style="padding-top: 2px; ">
			  <a href="javascript:" class="create-user-text-link create_user_expand_link_jq">
				Create User
			  </a>
			</div>

		</div>		
	
	
		<div  id="create_user_expanded" style="display: none;"  > <%-- style="display: none;"  --%>
	
		  <div style="position: relative; width: 500px;" >
		  		
	  		<div class="error-message-container error_message_container_jq" id="error_message_field_empty">
	  			<div class="error-message-inner-container" >
		  			<span class="error-message-text" >A value is required
			  			<span class="error-message-close-x error_message_close_x_jq">X</span></span>
			  	</div>
		  	</div>
		  	
	  		<div class="error-message-container error_message_container_jq" id="error_message_email_already_exists">
	  			<div class="error-message-inner-container" >
		  			<span class="error-message-text" >A user with that email already exists.
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
		
	  	<div  style="position: relative;" class="page-label">
	  		<div class="error-message-container error_message_container_jq" id="error_message_recaptcha_required">
	  			<div class="error-message-inner-container" >
		  			<span class="error-message-text" >Recaptcha must be completed
			  			<span class="error-message-close-x error_message_close_x_jq">X</span></span>
			  	</div>
		  	</div>
	  		<div class="error-message-container error_message_container_jq" id="error_message_all_fields_required">
	  			<div class="error-message-inner-container" >
		  			<span class="error-message-text" >All fields are required
			  			<span class="error-message-close-x error_message_close_x_jq">X</span></span>
			  	</div>
		  	</div>
	  		<div class="error-message-container error_message_container_jq" id="error_message_password_confirm_password_not_match">
	  			<div class="error-message-inner-container" >
		  			<span class="error-message-text" >Password and Confirm Password must match
			  			<span class="error-message-close-x error_message_close_x_jq">X</span></span>
			  	</div>
		  	</div>
	
	  		<div class="error-message-container error_message_container_jq" id="error_message_username_taken">
	  			<div class="error-message-inner-container" >
		  			<span class="error-message-text" >Username already taken
			  			<span class="error-message-close-x error_message_close_x_jq">X</span></span>
		  		</div>
		  	</div>
	  		<div class="error-message-container error_message_container_jq" id="error_message_email_taken">
	  			<div class="error-message-inner-container" >
		  			<span class="error-message-text" >Email address already taken
			  			<span class="error-message-close-x error_message_close_x_jq">X</span></span>
		  		</div>
		  	</div>
	  		<div class="error-message-container error_message_container_jq" id="error_message_username_email_taken">
	  			<div class="error-message-inner-container" >
		  			<span class="error-message-text" >Username already taken.  Email address already taken.
			  			<span class="error-message-close-x error_message_close_x_jq">X</span></span>
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
		  			<span class="error-message-text" >System Error
			  			<span class="error-message-close-x error_message_close_x_jq">X</span></span>
			  	</div>
		  	</div>
		  	
	<%-- 	  	
		  	UNUSED  
	--%>	  		  	
		  	
	  		<div class="success-message-container error_message_container_jq" id="success_message_system_success">
	  			<div class="success-message-inner-container" >
	  				<div class="success-message-close-x error_message_close_x_jq">X</div>
		  			<div class="success-message-text" >Account Created</div>
			  	</div>
		  	</div>
		  		  
	  	</div>
	  	
	  	<div class="page-text">
			Fill out the form below to create an account.
		</div>
	  	
	  	
		<form id="create_account_form" action="" >
	
			<select id="create_person_access_level_entry_field">
						<option value="<%= AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN %>" >Administrator</option>
						<option value="<%= AuthAccessLevelConstants.ACCESS_LEVEL_CREATE_NEW_PROJECT_AKA_USER %>" >User</option>
			</select><br>
				
			<input type="text" id="firstName" placeholder="First name" title="First name" class="input-field input_field_jq" maxlength="40"/><br>
			<input type="text" id="lastName" placeholder="Last name" title="Last name" class="input-field input_field_jq" maxlength="60" /><br>
			<input type="text" id="organization" placeholder="Organization" title="Organization" class="input-field input_field_jq" maxlength="2000" /><br>
			
			<input type="text" id="email" placeholder="Email address" title="Email address" class="input-field input_field_jq" maxlength="255" /><br>
	
			<input type="text" id="username" placeholder="Username" title="Username" class="input-field input_field_jq" maxlength="40" /><br>
	
			<input type="password" id="password" placeholder="Password" title="Password" class="input-field input_field_jq" maxlength="40" /><br>
			<input type="password" id="passwordConfirm" placeholder="Confirm Password" title="Confirm Password" class="input-field input_field_jq" maxlength="40" /><br>
			
<%-- 			
			<c:if test="${ configSystemValues.googleRecaptchaConfigured }">
	
			  <div style="text-align: center;" id="proxl_google_recaptcha_container_div"> < % --  div "id" is used in JS code -- % >
			   <div class="page-text">
				 <div class="g-recaptcha"  
				 	data-sitekey="<c:out value="${ configSystemValues.googleRecaptchaSiteCode }"></c:out>"></div>
			   </div>
			  </div>
	
			</c:if>
--%>			
			
		 	<INPUT TYPE="submit" class="submit-button" VALUE="Create Account" id="create_account_button">
		 	<input type="button" value="Cancel" class="create_user_cancel_button_jq">
		 	
		</form>

					   	
		</div>
	
		<div class="top-level-label-bottom-border" style="width: 100%" ></div>
	</div>
      
   
	<div id="no_users" style="display: none;" >
	
		<%--  Duplicate from above and add "visibility: hidden" to shift the text right to match the text for invite user --%>
		
			<div style="visibility: hidden;  float: left; padding-left: 3px; padding-right: 10px;">
			  <a href="javascript:" class="invite_user_expand_link_jq">
				<img src="static/images/icon-add-user.png" class=" icon-small ">
			  </a>
			</div>

	
		No Users other than current user
	</div>
	
					
					<!--  Modal dialog for confirming revoking an invite to the project -->
			
						<!--  Div behind modal dialog div -->
			
					<div class="modal-dialog-overlay-background   revoke_invite_to_project_overlay_show_hide_parts_jq revoke_invite_to_project_overlay_cancel_parts_jq  overlay_show_hide_parts_jq" 
						id="revoke_invite_to_project_overlay_background" ></div>
					
							<!--  Inline div for positioning modal dialog on page -->
					<div class="revoke-invite-to-project-overlay-containing-outermost-div " >

					  <div class="revoke-invite-to-project-overlay-containing-outer-div " >
					
			
							<!--  Div overlay for confirming removing a user from the project -->
						<div class="modal-dialog-overlay-container revoke-invite-to-project-overlay-container   revoke_invite_to_project_overlay_show_hide_parts_jq  overlay_show_hide_parts_jq" 
							 id="revoke_invite_to_project_overlay_container" >

							<div class="top-level-label" style="margin-left: 0px;">Revoke invite to project</div>
			
							<div class="top-level-label-bottom-border" ></div>
							
							<div >
							
								<div >Are you sure you want to revoke invite to <span style="font-weight: bold;" id="revoke_invite_to_project_overlay_email"></span>?</div>
								
								<div style="margin-top: 10px">
									<input type="button" value="Yes" id="revoke_invite_to_project_confirm_button" >
									<input type="button" value="Cancel" class="revoke_invite_to_project_overlay_cancel_parts_jq" >
								</div>
									
							</div>
							
						</div>
					
					  </div>
					</div>
					
						
	<%--  The table the invited and current users will be put in by the Javascript --%>
	
	 <table border="0" padding="0" margin="0" id="invited_people_current_users" width="100%">
		
	 
	 </table>

					
	<%-- For the javascript to read --%>
	<input type="hidden" id="access_level_id_administrator" value="<%= AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN %>">
	
	<%--  For 'project level' access, specify the empty string and null will be passed to the server and NULL will be put in the database --%>
	<input type="hidden" id="access_level_id_user" value="<%=AuthAccessLevelConstants.ACCESS_LEVEL_CREATE_NEW_PROJECT_AKA_USER%>">

	<input type="hidden" id="access-level-id-project-owner" value="<%= AuthAccessLevelConstants.ACCESS_LEVEL_PROJECT_OWNER %>">
	<input type="hidden" id="access-level-id-project-researcher" value="<%= AuthAccessLevelConstants.ACCESS_LEVEL_ASSISTANT_PROJECT_OWNER_AKA_RESEARCHER %>">
					

   
   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_footer_include_data_pages.jsp" %>
	
  <%@ include file="/WEB-INF/jsp/jsp_header_footer/footer_main.jsp" %>

 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_closing_body_tag_include_data_pages.jsp" %>
  
  <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp" %>
  
<%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_main_script_include__script_include_libs__page_header_js.jsp" %>
  
  <script type="text/javascript" src="static/js_generated_bundles/webapp_admin/manageUsersPage_Root-bundle.js?x=${ cacheBustValue }"></script>
  	
</body>
</html>