<%--
	projectView_PublicAccess_ProjectOwner.jsp
	
	Share Data block - For Project Owner
	
	More than just Public Access.  Contains data passed to the Javascript.

--%>

 <%@page import="org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers.AA_PageControllerPaths_Constants"%>
<%@page import="org.yeastrc.limelight.limelight_webapp.constants.FieldLengthConstants"%>
<%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>


<c:if test="${ webSessionAuthAccessLevel.projectOwnerAllowed or webSessionAuthAccessLevel.projectOwnerIfProjectNotLockedAllowed }" >

	
	<c:if test="${ projectPublicAccessEnabled }" >
	
			<%--  ONLY Present if true so only have to check if DOM node present --%>
		<script type="text/text" id="share_data_project__public_access_enabled">true</script>
	</c:if>
	
	<c:if test="${ not empty projectPublicAccessCode }" >
	
		<script type="text/text" id="share_data_project__public_access_code"><html><body><c:out value="${ projectPublicAccessCode }"></c:out></body></html></script>
	</c:if>
	
	<c:if test="${ projectPublicAccessCodeEnabled }" >
	
			<%--  ONLY Present if true so only have to check if DOM node present --%>
		<script type="text/text" id="share_data_project__public_access_code_enabled">true</script>
	</c:if>

	<%--  Label for Short URL access to Project  (<context>/p/<label>) --%>

	<script type="text/text" id="share_data_project_label_page_controller_path_separator"><%= AA_PageControllerPaths_Constants.PATH_SEPARATOR %></script>
	<script type="text/text" id="share_data_project_label_page_controller_path"><%= AA_PageControllerPaths_Constants.PROJECT_SHORT_NAME_REDIRECT_PAGE_CONTROLLER %></script>
		
  	<script type="text/text" id="share_data_project_label_max_length"><%= FieldLengthConstants.PROJECT_SHORT_NAME_MAX_LENGTH %></script>
		
</c:if>  <%-- <c:if test="${ webSessionAuthAccessLevel.assistantProjectOwnerAllowed or webSessionAuthAccessLevel.assistantProjectOwnerIfProjectNotLockedAllowed }" > --%>


