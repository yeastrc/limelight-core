<%--
	projectView_UserAdminSection.jsp

--%>

 <%@page import="org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants"%>
<%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>

<c:if test="${ webSessionAuthAccessLevel.projectOwnerAllowed }" >


	<script id="access_level_id_project_researcher" type="text/text"><%= AuthAccessLevelConstants.ACCESS_LEVEL_ASSISTANT_PROJECT_OWNER_AKA_RESEARCHER %></script>
	<script id="access_level_id_project_viewer" type="text/text"><%= AuthAccessLevelConstants.ACCESS_LEVEL_LOGGED_IN_USER_READ_ONLY %></script>
						
	<c:if  test="${ webSessionAuthAccessLevel.projectOwnerAllowed }">									
		<script id="access_level_id_project_owner" type="text/text"><%= AuthAccessLevelConstants.ACCESS_LEVEL_PROJECT_OWNER %></script>
	</c:if>
</c:if>
