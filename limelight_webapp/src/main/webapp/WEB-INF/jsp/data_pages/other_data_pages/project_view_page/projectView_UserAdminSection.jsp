<%--
	projectView_UserAdminSection.jsp

--%>

 <%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>


<c:if test="${ webSessionAuthAccessLevel.assistantProjectOwnerAllowed or webSessionAuthAccessLevel.assistantProjectOwnerIfProjectNotLockedAllowed }" >

									
  <div >

  <div class="top-level-container collapsable_container_jq" >

	<div  class="collapsable-link-container top-level-collapsable-link-container collapsable_link_container_jq" style="">
		<img  src="static/images/pointer-down.png"
			 id="researchers_in_project_block_hide" 
			 class=" icon-large fake-link-image top-level-collapsable-link" 
			 style="display: none;">
		<img  src="static/images/pointer-right.png"
			 id="researchers_in_project_block_show" 
			 class=" icon-large fake-link-image top-level-collapsable-link collapsable_expand_link_jq" >
	</div>

	<div class="top-level-label">
	
	
		<div style=" display: grid; grid-template-columns: min-content min-content; ">
		
			<%--  2 column grid --%>

		  <div style=" white-space: nowrap ">  <%--  column 1 --%>
		  
			Researchers
		  </div>
		  
  		  <div class="project-page--top-level-label-help-tip-symbol">  <%--  column 2  --%>
		  		
		  		<p class="top-level-label-help-tip-actual"> <%--  Displayed on hover of ? --%>
		  			Invite, remove, and view users that have access to this project and its data.
		  		</p>
		  </div>
		</div>
			
	</div>

	<div class="top-level-label-bottom-border" ></div>
						
	<div  id="researchers_in_project_block" class="researchers-block " style="display: none;" > 

		<%--  Add User or Invite Non-user --%>
		<%@ include file="/WEB-INF/jsp/data_pages/other_data_pages/project_view_page/projectView_UserAdminSection_AddUserOrInviteNonUser.jsp" %>
		
		<div style="position: relative;">
			<%-- Re-Invite email successfully sent message --%>
	  		<div class="success-message-container error_message_container_jq" id="success_message_invite_email_re_sent">
	  			<div class="success-message-inner-container"  style="width: 800px;">
	  				<div class="success-message-close-x error_message_close_x_jq">X</div>
		  			<div class="success-message-text" >Email re-sent inviting them to this project</div>
			  	</div>
		  	</div>	  

			<%-- Re-Invite email NOT successfully sent message --%>
	  		<div class="error-message-container error_message_container_jq" id="error_message_invite_email_re_send_sytem_error">
	  		
	  			<div class="error-message-inner-container" style="width: 400px;">
	  				<div class="error-message-close-x error_message_close_x_jq">X</div>
		  			<div class="error-message-text" >Unable to send email, system error.</div>
	  			</div>
		  	</div>
								
		</div>			


		<table  id="project_users">
		
			<%-- Invited people and Current Users In Project added to this table --%>
		
		</table>
	</div> 
   </div>
  </div>
  
</c:if>  <%-- <c:if test="${ webSessionAuthAccessLevel.assistantProjectOwnerAllowed or webSessionAuthAccessLevel.assistantProjectOwnerIfProjectNotLockedAllowed }" > --%>


