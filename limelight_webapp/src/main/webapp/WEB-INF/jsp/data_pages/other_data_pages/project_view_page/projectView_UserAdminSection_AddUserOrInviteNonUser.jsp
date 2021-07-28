<%--
	projectView_UserAdminSection_AddUserOrInviteNonUser.jsp
	
	Project Page
	
	Included in projectView_UserAdminSection.jsp
	
	Add User or Invite non-user
	
--%>
<%@page import="org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants"%>
 
 <%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>
 

<%--  Only allow Invite if logged in user is Project Owner --%>
<%--  Only allow Invite if project is not locked --%>

<c:if test="${ webSessionAuthAccessLevel.projectOwnerAllowed }" >

 <table border="0" width="100%">
 
  <tr>
   <td colspan="10">

	<div id="invite_user_block" >

		<div  id="invite_user_collapsed" >
		 
		 <div class="invite-user-expand-icon-container" >
		  <a href="javascript:" data-tooltip="Invite new or existing user to project" 
		  		class="selector_tool_tip_attached second-level-label overide-text-color-to-base-color invite_user_expand_link_jq">
			<img src="static/images/icon-add-user.png" class=" icon-small ">
		  </a>
		 </div>
		 <div >
		  <a href="javascript:" data-tooltip="Invite new or existing user to project" 
		  		class="selector_tool_tip_attached second-level-label overide-text-color-to-base-color invite_user_expand_link_jq">
			Invite User
		  </a>
		 </div>
		 
		</div>		
	
		<div  id="invite_user_expanded" style="display: none;"  > <%-- style="display: none;"  --%>
		
		 <table >
		  <tr>
		   <td nowrap>
		  	<div class="researchers-icon">
		  	  <a href="javascript:" title="Close Invite User" class="invite_user_cancel_button_jq">
				<img src="static/images/icon-circle-delete.png" class=" icon-small ">
			  </a>
			</div>
		   </td>
		   <td colspan="15" nowrap>
			
			<div style="padding-left: 4px;" >
			
				<div style="position: relative;">Invite user to this project:</div>
				
		 		<div style="position: relative;">
		 		
			  		<div class="error-message-container error_message_container_jq" id="error_message_invite_name_or_email_required">
			  		
			  			<div class="error-message-inner-container" style="width: 380px;">
			  				<div class="error-message-close-x error_message_close_x_jq">X</div>
				  			<div class="error-message-text" >Last Name or Email must be specified</div>
			  			</div>
				  	</div>
		 		
			  		<div class="error-message-container error_message_container_jq" id="error_message_invite_name_and_email_have_values">
			  		
			  			<div class="error-message-inner-container" style="width: 420px;">
			  				<div class="error-message-close-x error_message_close_x_jq">X</div>
				  			<div class="error-message-text" >Last Name and Email cannot both be specified</div>
			  			</div>
				  	</div>
		 		
			  		<div class="error-message-container error_message_container_jq" id="error_message_invite_name_not_found">
			  		
			  			<div class="error-message-inner-container" style="width: 380px; text-align: left;">
			  				<div class="error-message-close-x error_message_close_x_jq">X</div>
				  			<div class="error-message-text" >Last Name entered cannot be found.<br>  Please choose a user from the dropdown list.</div>
			  			</div>
				  	</div>
				  	
		 		
			  		<div class="error-message-container error_message_container_jq" id="error_message_invite_name_duplicate">
			  		
			  			<div class="error-message-inner-container" style="width: 480px; text-align: left;">
			  				<div class="error-message-close-x error_message_close_x_jq">X</div>
				  			<div class="error-message-text" >Last Name entered matches more than one user.<br>  Please choose a user from the dropdown list.</div>
			  			</div>
				  	</div>
				  	
		 		
			  		<div class="error-message-container error_message_container_jq" id="error_message_invite_already_has_access">
			  		
			  			<div class="error-message-inner-container" style="width: 380px;">
			  				<div class="error-message-close-x error_message_close_x_jq">X</div>
				  			<div class="error-message-text" >User already has access to this project</div>
			  			</div>
				  	</div>
		 		
			  		<div class="error-message-container error_message_container_jq" id="error_message_invite_email_address_invalid">
			  		
			  			<div class="error-message-inner-container" style="width: 440px;">
			  				<div class="error-message-close-x error_message_close_x_jq">X</div>
				  			<div class="error-message-text" >Unable to send email, email address is invalid</div>
			  			</div>
				  	</div>
		 		
			  		<div class="error-message-container error_message_container_jq" id="error_message_invite_email_send_sytem_error">
			  		
			  			<div class="error-message-inner-container" style="width: 400px;">
			  				<div class="error-message-close-x error_message_close_x_jq">X</div>
				  			<div class="error-message-text" >Unable to send email, system error.</div>
			  			</div>
				  	</div>
		 		
			  		<div class="error-message-container error_message_container_jq" id="error_message_invite_error_adding_user_to_project">
			  		
			  			<div class="error-message-inner-container" style="width: 380px;">
			  				<div class="error-message-close-x error_message_close_x_jq">X</div>
				  			<div class="error-message-text" >Error adding user to project</div>
			  			</div>
				  	</div>
				  	
				  	<%-- Invite email successfully sent message --%>

			  		<div class="success-message-container error_message_container_jq" id="success_message_invite_email_sent">
			  			<div class="success-message-inner-container"  style="width: 800px;">
			  				<div class="success-message-close-x error_message_close_x_jq">X</div>
				  			<div class="success-message-text" >Email sent to <span id="invite_user_email_that_was_sent"></span> inviting them to this project</div>
					  	</div>
				  	</div>	  


		 		</div>
		 	  
		 	  </div>
		 	  
		   </td>
		  </tr>
		  <tr>
		   <td nowrap></td> <!-- Empty to match X icon in first row -->
		   <td nowrap>
		    <table border="0" margin="0" padding="0" id="invite_user_input_fields">
		     <tr>
		      <td nowrap>
		      	<input placeholder="Last Name" id="invite_user_last_name"  class="autocomplete-entry-field"  
							title="Last Name. Must choose from list." >
		      </td>
<%-- 		      
--%>		      
		      <td>
		      	or
		      </td>
		      <td nowrap>
				<input placeholder="Email Address" id="invite_user_email"  class="autocomplete-entry-field" 
							title="Email Address" >
		      </td>
		     </tr>
<%--		      
--%>		    
		     <tr>
		      <td nowrap>
		      	Existing user only
		      </td>
		      <td></td>
		      <td nowrap>
		      	New or existing user
		      </td>
		    
		     </tr>
		    </table>

			<span id="invite_user_auto_complete_display" style="display: none;">
		  	  <img src="static/images/icon-circle-delete.png" class=" icon-small clickable "
		  	   		title="Clear chosen Last Name or Email Address" id="close_invite_user_auto_complete_display"
		  	  >
			  <span id="invite_user_auto_complete_value"></span>
			</span>
		    
		   </td>
		   <td nowrap valign="top" style="padding-top: 5px;">
					<select id="invite_person_to_project_access_level_entry_field">
<%-- 
										<option value="<%= AuthAccessLevelConstants.ACCESS_LEVEL__PUBLIC_ACCESS_CODE_READ_ONLY__PUBLIC_PROJECT_READ_ONLY %>" >Read</option>
										<option value="<%= AuthAccessLevelConstants.ACCESS_LEVEL_WRITE %>" >Update</option>
										<option value="<%= AuthAccessLevelConstants.ACCESS_LEVEL_SEARCH_DELETE %>" >Update and Delete Searches</option>
--%>									
						<option value="<%= AuthAccessLevelConstants.ACCESS_LEVEL_ASSISTANT_PROJECT_OWNER_AKA_RESEARCHER %>" >Researcher</option>
						<option value="<%= AuthAccessLevelConstants.ACCESS_LEVEL_LOGGED_IN_USER_READ_ONLY %>" >Viewer</option>
						
						<c:if  test="${ webSessionAuthAccessLevel.projectOwnerAllowed }">									
							<option value="<%= AuthAccessLevelConstants.ACCESS_LEVEL_PROJECT_OWNER %>" >Owner</option>
						</c:if>
						
					</select>
					
					<div style="display: inline-block; position: relative;">
						<input type="button" value="Invite User" disabled="disabled" id="invite_user_button">
						<div id="invite_user_button_disabled_cover"
							style="position: absolute; left:0px;right:0px;top:0px;bottom:0px"
							title="First enter value for email or choose from selection for last name" 
						></div>
					</div>
					<input type="button" value="Cancel" class="invite_user_cancel_button_jq">						   	
		   </td>
		  </tr>
		 
		 </table>

		</div>
	
		<div class="top-level-label-bottom-border" style="width: 100%" ></div>
	</div>
   
   </td>
  </tr>
 </table>
 
<%--  Only allow Invite if not locked --%>
</c:if>
						