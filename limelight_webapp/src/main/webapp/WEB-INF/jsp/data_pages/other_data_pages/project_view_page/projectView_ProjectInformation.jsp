<%--   projectView_ProjectInformation.jsp

	Page Section:   Project Information
--%>

 <%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>

  <div class="top-level-container selector_collapsable_container" >

	<div  class="collapsable-link-container top-level-collapsable-link-container selector_collapsable_link_container" >
		<img  src="static/images/pointer-down.png"  class=" icon-large fake-link-image selector_collapsable_collapse_link ">
		<img  src="static/images/pointer-right.png" class=" icon-large fake-link-image  selector_collapsable_expand_link " style="display: none; ">
	</div>

	<div class="top-level-label">
	  <div >
	  	Project Information 
	  	
	  	<c:choose>
		  	<c:when test="${ webSessionAuthAccessLevel.projectOwnerAllowed and ( not project.projectLocked ) }">
			
					<%--  Project Owner and Project NOT Locked.  Display in JS when add tooltip. --%>
					<img id="project_unlocked_icon" src="static/images/icon-unlocked.png" class="icon-large fake-link-image" style="display: none;">
		  	</c:when>
	
		  	<c:when test="${ webSessionAuthAccessLevel.projectOwnerIfProjectNotLockedAllowed and ( project.projectLocked ) }">
		  	
					<%--  Project Owner and Project Locked.  Display in JS when add tooltip. --%>
					<img  id="project_locked_icon" src="static/images/icon-locked.png" class="icon-large fake-link-image" style="display: none;">
		  	</c:when>	  	
	
		  	<c:when test="${ webSessionAuthAccessLevel.assistantProjectOwnerIfProjectNotLockedAllowed and ( project.projectLocked ) }">
		  	
					<%--  Researcher and Project Locked.  Display only of Lock symbol --%>
					<img  src="static/images/icon-locked.png" class="icon-large ">
		  	</c:when>	 
	  	</c:choose>
	  	 	  	
	  </div>
	  	<c:if test="${ webSessionAuthAccessLevel.projectOwnerAllowed or webSessionAuthAccessLevel.projectOwnerIfProjectNotLockedAllowed }">
		  <div id="project_just_locked_message" style="display: none; color: green;" >
				Project Locked.  Reloading page to reflect changes
		  </div>			
		
		  <div id="project_just_unlocked_message" style="display: none; color: green;" >
				Project Unlocked.  Reloading page to reflect changes
		  </div>	  	  
	  	</c:if>
	</div>
	
	<div class="top-level-label-bottom-border" ></div>
						
	<div class="project-info-block  selector_collapsable_item">
	
	  <%--  Project Title --%>
	  
	  <div class="project-info-single-block" >
										
		<div class="second-level-label project-info-label"
			>Title:</div>
		<div id="title_container_div"  class="second-level-text project-info-text" >

		  <c:choose>
			<c:when test="${ webSessionAuthAccessLevel.publicAccessCodeReadAccessLevel }">
			  <c:set var="title_style_addition" value="font-weight: bold;"></c:set>
			</c:when>
			<c:otherwise>
			  <c:set var="title_style_addition" value=""></c:set>
			</c:otherwise>
		  </c:choose>
		  
		  <span id="project_title_display" style="<c:out value="${title_style_addition}" ></c:out>"><c:out value="${ project.title }" ></c:out></span>
	      <c:if test="${ webSessionAuthAccessLevel.projectOwnerAllowed }">
				<input id="change_project_title_button" type="image" src="static/images/icon-edit.png"  value="Update"
					 class="tool_tip_attached_jq  icon-small " data-tooltip="Edit project title" >	    
		  </c:if>
		</div>
		  <c:if test="${ webSessionAuthAccessLevel.projectOwnerAllowed }">

			  <div id="change_project_title_container" style="display: none; margin-left: 40px; position: relative;" >

		  		<div class="error-message-container error_message_container_jq" id="error_message_project_title_required">
		  			<div class="error-message-inner-container" style="width: 300px;">
		  				<div class="error-message-close-x error_message_close_x_jq">X</div>
			  			<div class="error-message-text" >Project Title cannot be empty</div>
		  			</div>
			  	</div>

			  	<input style="width: 600px;" id="change_project_title_input" >
			  	<input type="button" value="Save" id="change_project_title_save" >
			  	<input type="button" value="Cancel" id="change_project_title_cancel" >
			  </div>
			  
		  </c:if>

	  </div> <%-- End for Project Title: <div class="project-info-single-block" >  --%>
	  
	  <%--  Project Abstract --%>
	  
	  <c:if test="${ not empty project.abstractText or webSessionAuthAccessLevel.assistantProjectOwnerAllowed }" >	
		    
		    <div class="project-info-single-block" >
			  <div class="second-level-label project-info-label">Abstract:</div>

			  <div id="abstract_display_container"  class="second-level-text project-info-text" >
				<span id="project_abstract_display" ><c:out value="${ project.abstractText }" ></c:out></span>
				
				<c:if test="${ webSessionAuthAccessLevel.projectOwnerAllowed }" >
				<%-- 
				--%>
					<input id="change_project_abstract_button" type="image" src="static/images/icon-edit.png"  value="Update"
						 class="tool_tip_attached_jq  icon-small " data-tooltip="Edit project abstract" >
				</c:if>
			  </div>
				<%--  Edit Abstract block --%>
			  <c:if test="${ webSessionAuthAccessLevel.projectOwnerAllowed }" >
				<div  id="change_project_abstract_container" class="second-level-text project-info-text" style="display: none; position: relative;">
					<%--  
			  		<div class="error-message-container error_message_container_jq" id="error_message_project_abstract_required">
			  		
			  			<div class="error-message-inner-container" style="width: 300px;">
			  				<div class="error-message-close-x error_message_close_x_jq">X</div>
				  			<div class="error-message-text" >Project Abstract cannot be empty</div>
			  			</div>
				  	</div>
				  	--%>
				
				
				  <div >
					<textarea id="change_project_abstract_input" rows="10" cols="100" maxlength="5000"></textarea>
				  </div>
				  <div >
					<input id="change_project_abstract_save" class="submit-button" type="button" value="Save">
					<input id="change_project_abstract_cancel" class="submit-button" type="button" value="Cancel">
				  </div>
				</div>
			  </c:if>
			</div>
			
	  </c:if> <%-- END: Project Abstract --%>

	  <%--  Project Notes - Root div for Javascript to place notes in --%>
	  
	  <div id="project_notes_root_block"></div>
	  
	  <div style="clear: both;"></div> <%-- Reset after float left in 'project_notes_root_block' --%>
			  
	</div>
  </div>
