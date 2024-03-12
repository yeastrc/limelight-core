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

		<div style=" display: grid; grid-template-columns: min-content min-content; ">
		
			<%--  2 column grid --%>

		  <div style=" white-space: nowrap ">  <%--  column 1 --%>
		  
		  	Project Information 
		  	
		  	<c:choose>
			  	<c:when test="${ webSessionAuthAccessLevel.projectOwnerAllowed and ( not project.projectLocked ) }">
				
						<%--  Project Owner and Project NOT Locked.  Display in JS when add tooltip. --%>
						<img id="project_unlocked_icon" src="static/images/icon-unlocked.png" 
							class=" icon-large fake-link-image selector_tool_tip_attached " style="display: none;"
							data-tooltip="Project is unlocked, click to lock. <br>While locked, no data may be changed, added to, or deleted from the project.">
			  	</c:when>
		
			  	<c:when test="${ webSessionAuthAccessLevel.projectOwnerIfProjectNotLockedAllowed and ( project.projectLocked ) }">
			  	
						<%--  Project Owner and Project Locked.  Display in JS when add tooltip. --%>
						<img  id="project_locked_icon" src="static/images/icon-locked.png" 
							class=" icon-large fake-link-image selector_tool_tip_attached " style="display: none;"
							data-tooltip="Project is locked, click to unlock. <br>While locked, no data may be changed, added to, or deleted from the project." >
			  	</c:when>	  	
		
			  	<c:when test="${ webSessionAuthAccessLevel.assistantProjectOwnerIfProjectNotLockedAllowed and ( project.projectLocked ) }">
			  	
						<%--  Researcher and Project Locked.  Display only of Lock symbol --%>
						<img  src="static/images/icon-locked.png" class="icon-large ">
			  	</c:when>	 
		  	</c:choose>
		  </div>
		  
  		  <div class="project-page--top-level-label-help-tip-symbol">  <%--  column 2  --%>
		  		
		  		<p class="top-level-label-help-tip-actual "> <%--  Displayed on hover of ? --%>
		  			General information about this project.
		  		</p>
		  </div>
		  
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

		     <%--  Change to Title text always bolded --%>
		  <c:set var="title_style_addition" value="font-weight: bold;"></c:set>
		  
		  
		  <span id="project_title_display" style="<c:out value="${title_style_addition}" ></c:out>"><c:out value="${ project.title }" ></c:out></span>
	      <c:if test="${ webSessionAuthAccessLevel.projectOwnerAllowed }">
				<input id="change_project_title_button" type="image" src="static/images/icon-edit.png"  value="Update"
					 class=" icon-small " title="Edit project title" >	    
		  </c:if>
		</div>
		
	  </div> <%-- End for Project Title: <div class="project-info-single-block" >  --%>


	  
	  <%--  Project Abstract --%>

		
	  <c:if test="${ not empty project.abstractText }" >	
		      
		      <%--  Abstract contents from server to display and not make webservice call --%>
		      
		<script type="text/text" id="project_abstract_contents_from_server"
		><html><body><c:out value="${ project.abstractText }"/></body><html></script>
			  
	  </c:if>


			<%--  Put in DOM to indicate that user can edit abstract --%>
		<c:if test="${ webSessionAuthAccessLevel.projectOwnerAllowed }" >
			<script type="text/text" id="project_abstract_user_can_edit"></script>
		</c:if>

	  <%--  Project Root div For React Implementation of Notes --%>
	  
	  <div id="project_information_root_block_react_implementation"></div>
	  
	  
	  
	  <div style="clear: both;"></div> <%-- Reset after float left in 'project_notes_root_block' --%>
			  
	</div>
  </div>
