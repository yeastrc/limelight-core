<%--
	projectView_PublicAccess_AssistantProjectOwner_AKA_Researcher.jsp
	
	Share Data block - For Assistant Project Owner - AKA Researcher
	
	Project URL
	Public Access

--%>

 <%@page import="org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers.AA_PageControllerPaths_Constants"%>
<%@page import="org.yeastrc.limelight.limelight_webapp.constants.FieldLengthConstants"%>
<%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>

<c:choose>

<c:when test="${ webSessionAuthAccessLevel.projectOwnerAllowed or webSessionAuthAccessLevel.projectOwnerIfProjectNotLockedAllowed }">

	<%--  Project Owner covered elsewhere  --%>

</c:when>

<c:when test="${ webSessionAuthAccessLevel.assistantProjectOwnerAllowed or webSessionAuthAccessLevel.assistantProjectOwnerIfProjectNotLockedAllowed }" >

	<%--  Assistant Project Owner - AKA Researcher  --%>

  <div class="top-level-container selector_collapsable_container" >
  
    <div class="collapsable-link-container top-level-collapsable-link-container selector_collapsable_link_container" style="">
		<img src="static/images/pointer-down.png" 
			class=" icon-large fake-link-image top-level-collapsable-link selector_collapsable_collapse_link" 
			style="display: none;">
		<img src="static/images/pointer-right.png" 
			class=" icon-large fake-link-image top-level-collapsable-link selector_collapsable_expand_link" 
			style="">
	</div>

	<div class="top-level-label">
		Share Data 
		
		<c:if test="${ projectPublicAccessEnabled }" >
			<span class=" show_when_public_access_enabled_jq  standard-border-color-very-dark  standard-background-color-very-dark " 
				style=" font-size: 16px; padding: 3px; border-radius: 5px;  ${show_when_public_access_enabled_div_style_display_control} "
				 >Public</span
				>
			</c:if>
 		
 	</div>
 	
	<div class="top-level-label-bottom-border" ></div>
						
	<div  class="public-access-block   selector_collapsable_item " style="display: none;" >
	
		<%--  Label for Short URL access to Project  (<context>/p/<label>) --%>
		
		
		
		<%--  Exists in <head> 	 --%>
			<%--   <script id="controller_path" type="text/text">d/pg/project</script>   --%>

		<script type="text/text" id="share_data_project_label_project_short_label"><html><body><c:out value="${ projectShortName }"></c:out></body></html></script>

				<%--  value is currently '/' --%>
		<script type="text/text" id="share_data_project_label_page_controller_path_separator"><%= AA_PageControllerPaths_Constants.PATH_SEPARATOR %></script>
				<%--  value is currently 'p' --%>
		<script type="text/text" id="share_data_project_label_page_controller_path"><%= AA_PageControllerPaths_Constants.PROJECT_SHORT_NAME_REDIRECT_PAGE_CONTROLLER %></script>
			
		<%--  In JS, set URL into <span> and then change <div> to display --%>
		
		<div id="share_data_project_url_container_div" style="display: none;" >
		
			<div style="margin-top: 20px; margin-bottom: 10px; font-weight: bold;">
		
				Project URL: <span id="share_data_project_url_value_span"></span>
			</div>
			
		</div> 
	
		<%--  Public Access Control --%>

		<div class="second-level-label " style="margin-top: 20px;">
			
			Public access is currently
			
			<c:choose> 
				<c:when test="${ projectPublicAccessEnabled }" >
					enabled
				</c:when>
				<c:otherwise>
					disabled
				</c:otherwise>
			</c:choose>
		</div>
	</div>
</div>

</c:when>
</c:choose>
  
