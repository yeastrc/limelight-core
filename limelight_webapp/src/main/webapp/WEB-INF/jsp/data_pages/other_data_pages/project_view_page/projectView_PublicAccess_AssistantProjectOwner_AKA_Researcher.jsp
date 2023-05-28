<%--
	projectView_PublicAccess_AssistantProjectOwner_AKA_Researcher.jsp
	
	Share Data block - For Assistant Project Owner - AKA Researcher
	
	SHOW ONLY, NO UPDATES
	
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

<c:when test="${ webSessionAuthAccessLevel.viewerReadOnlyAllowed or webSessionAuthAccessLevel.viewerReadOnlyIfProjectNotLockedAllowed }" >

	<%--  Assistant Project Owner - AKA Researcher -- OR  --  Viewer Read Only --%>

		<%--  Exists in <head> 	 --%>
			<%--   <script id="controller_path" type="text/text">d/pg/project</script>   --%>

		<script type="text/text" id="share_data_project_label_project_short_label"><html><body><c:out value="${ projectShortName }"></c:out></body></html></script>

				<%--  value is currently '/' --%>
		<script type="text/text" id="share_data_project_label_page_controller_path_separator"><%= AA_PageControllerPaths_Constants.PATH_SEPARATOR %></script>
				<%--  value is currently 'p' --%>
		<script type="text/text" id="share_data_project_label_page_controller_path"><%= AA_PageControllerPaths_Constants.PROJECT_SHORT_NAME_REDIRECT_PAGE_CONTROLLER %></script>
		
		<c:if test="${ projectPublicAccessEnabled }" >
		
			<%--  Javascsript determines is enabled if this DOM element is present --%>
			<script type="text/text" id="share_data_public_access_enabled_if_present"></script>
		</c:if>
			
</c:when>
</c:choose>
  
