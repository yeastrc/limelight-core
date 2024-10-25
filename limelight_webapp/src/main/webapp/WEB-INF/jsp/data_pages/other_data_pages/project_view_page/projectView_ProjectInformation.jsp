<%--   projectView_ProjectInformation.jsp

	Page Section:   Project Information
--%>

 <%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>

  <div class="top-level-container " >

	<div  class="collapsable-link-container top-level-collapsable-link-container " >
		<img id="project_page_project_info_block_hide_link"  src="static/images/pointer-down.png"  class=" icon-large fake-link-image ">
		<img id="project_page_project_info_block_show_link"  src="static/images/pointer-right.png" class=" icon-large fake-link-image " style="display: none; ">
	</div>

	<div class="top-level-label">


		  <div style=" white-space: nowrap ">
		  
		  	<span id="project_page_project_info_block_label_link" class=" clickable " >Project Information</span
		  	
		  	><c:choose
		  		><c:when test="${ webSessionAuthAccessLevel.projectOwnerAllowed and ( not project.projectLocked ) }"
		  		
		  		><%--  Project Owner and Project NOT Locked.  Display in JS when add tooltip. 
		  		
		  		--%> <img id="project_unlocked_icon" src="static/images/icon-unlocked.png" 
							class=" icon-large fake-link-image selector_tool_tip_attached " style="display: none;"
							title="Project is unlocked, click to lock. 

While locked, no data may be changed, added to, or deleted from the project."
							data-tooltip="Project is unlocked, click to lock. <br>While locked, no data may be changed, added to, or deleted from the project."
				></c:when
				
				><c:when test="${ webSessionAuthAccessLevel.projectOwnerIfProjectNotLockedAllowed and ( project.projectLocked ) }"
				
				><%--  Project Owner and Project Locked.  Display in JS when add tooltip. 
				
				--%> <img  id="project_locked_icon" src="static/images/icon-locked.png" 
							class=" icon-large fake-link-image selector_tool_tip_attached " style="display: none;"
							title="Project is locked, click to unlock. 

While locked, no data may be changed, added to, or deleted from the project." 
							data-tooltip="Project is locked, click to unlock. <br>While locked, no data may be changed, added to, or deleted from the project." 
				></c:when
				
				><c:when test="${ webSessionAuthAccessLevel.assistantProjectOwnerIfProjectNotLockedAllowed and ( project.projectLocked ) }"
				
				><%--  Researcher and Project Locked.  Display only of Lock symbol 
				
				--%> <img  src="static/images/icon-locked.png" class="icon-large "
							title="Project is locked"
				></c:when
				
			></c:choose
		  	
		  	><%--  Container for React Root for '?' with circle for help on hover 
		  	
		  	--%><span id="project_page_project_information_block___question_mark_with_circle__react_root_container"></span>
		  	
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
						
	<div id="project_page_project_info_block_element_to_show_hide" class="project-info-block ">
	
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
