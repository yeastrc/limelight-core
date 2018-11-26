<%--
	projectView_PublicAccess.jsp
	
	Share Data block
	
	More than just Public Access

--%>

 <%@page import="org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers.AA_PageControllerPaths_Constants"%>
<%@page import="org.yeastrc.limelight.limelight_webapp.constants.FieldLengthConstants"%>
<%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>


<c:if test="${ webSessionAuthAccessLevel.assistantProjectOwnerAllowed or webSessionAuthAccessLevel.assistantProjectOwnerIfProjectNotLockedAllowed }" >

  <div class="top-level-container collapsable_container_jq" >

	<div  class="collapsable-link-container top-level-collapsable-link-container collapsable_link_container_jq" style="">
		<img  src="static/images/pointer-down.png"
			 id="project_public_access_block_hide" 
			 class=" icon-large fake-link-image top-level-collapsable-link" 
			 style="display: none; ">
		<img  src="static/images/pointer-right.png"
			 id="project_public_access_block_show" 
			 class=" icon-large fake-link-image top-level-collapsable-link collapsable_expand_link_jq">
	</div>

	<%--  Create page variables with the display control to go in the "style"
			for the spans with text "Enabled" and "Disabled".       
	--%>
	<c:choose>
		<c:when test="${ projectPublicAccessEnabled }" >
			<c:set var="show_when_public_access_code_disabled_div_style_display_control" value="display:none;"></c:set>
			<c:set var="show_when_public_access_code_enabled_div_style_display_control" value=""></c:set>
		</c:when>
		<c:otherwise>
			<c:set var="show_when_public_access_code_disabled_div_style_display_control" value=""></c:set>
			<c:set var="show_when_public_access_code_enabled_div_style_display_control" value="display:none;"></c:set>
		</c:otherwise>
	</c:choose>		
				
					
	<div class="top-level-label">
		Share Data 
			(<span class="show_when_public_access_or_public_access_code_enabled_jq" 
				style="${show_when_public_access_code_enabled_div_style_display_control}"
				 >Public Access Enabled</span
				><span class="show_when_public_access_or_public_access_code_disabled_jq" 
					style="${show_when_public_access_code_disabled_div_style_display_control}" 
				 	>Public Access Disabled</span>)</div>

	<div class="top-level-label-bottom-border" ></div>
						
	<div  id="project_public_access_block" class="public-access-block " style="display: none;" > 
	

		<%--  Label for Short URL access to Project  (<context>/p/<label>) --%>

		<script type="text/text" id="share_data_project_label_page_controller_path_separator"><%= AA_PageControllerPaths_Constants.PATH_SEPARATOR %></script>
		<script type="text/text" id="share_data_project_label_page_controller_path"><%= AA_PageControllerPaths_Constants.PROJECT_SHORT_NAME_REDIRECT_PAGE_CONTROLLER %></script>
			
		<c:choose >
		  <c:when test="${ webSessionAuthAccessLevel.projectOwnerAllowed }" >
		  
		  	<script type="text/text" id="share_data_project_label_max_length"><%= FieldLengthConstants.PROJECT_SHORT_NAME_MAX_LENGTH %></script>
		  
			<div id="share_data_label_project_owner_project_not_locked_container">
				LOADING
			</div>
				
		  </c:when>
		  <c:when test="${ webSessionAuthAccessLevel.projectOwnerIfProjectNotLockedAllowed }" >
		  
		  	<%--  User is Project Owner and Project is locked --%>
		  	
			<div id="share_data_label_project_owner_project_locked_or_researcher_container">
				LOADING
			</div>
				
		  </c:when>
		  <c:otherwise>
		  
		     <%-- User is Researcher and project is not locked or locked (Controlled by top level <c:if> in this file)  --%>
		     
			<div id="share_data_label_project_owner_project_locked_or_researcher_container">
				LOADING
			</div>
		  
		  </c:otherwise>
								  
		</c:choose>

		<%--  Public Access Control --%>

		<div class="second-level-label " style="margin-top: 20px;">Public access is currently 
			<span class=" show_when_public_access_or_public_access_code_enabled_jq " style="${show_when_public_access_code_enabled_div_style_display_control}" 
					>enabled</span
				><span class=" show_when_public_access_or_public_access_code_disabled_jq " style="${show_when_public_access_code_disabled_div_style_display_control}" 
					>disabled</span>.
		</div>

		<c:if test="${ webSessionAuthAccessLevel.projectOwnerAllowed }" >
	
		  	<%--  User is Project Owner and Project is not locked --%>
						
			<div style="margin-top: 10px; margin-bottom: 10px;">
				Enable public access to allow users who do not have limelight accounts to view project data.
			</div>
	
			<div >
				
				<input class="submit-button show_when_public_access_or_public_access_code_disabled_jq" 
					type="button" value="Enable Public Access" 
					id="enable_project_public_access_button"
					style="${show_when_public_access_code_disabled_div_style_display_control}"
					<c:if test="${not webSessionAuthAccessLevel.projectOwnerAllowed}" > disabled </c:if>
				>
				<input class="submit-button show_when_public_access_or_public_access_code_enabled_jq " 
					type="button" value="Disable Public Access" 
					id="disable_project_public_access_button"
					style="${show_when_public_access_code_enabled_div_style_display_control}"
					<c:if test="${not webSessionAuthAccessLevel.projectOwnerAllowed}" > disabled </c:if>
				>
			</div>
		</c:if>		
	</div>
  </div>
  
</c:if>  <%-- <c:if test="${ webSessionAuthAccessLevel.assistantProjectOwnerAllowed or webSessionAuthAccessLevel.assistantProjectOwnerIfProjectNotLockedAllowed }" > --%>


