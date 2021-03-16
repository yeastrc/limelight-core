<%--

	projectsListForMainPageHeaderDropdown_PageFragment.jsp
	
	response to webservice call to get HTML to put in Main Pages Header for Project List 
	
--%>
<%@page import="org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers.AA_PageControllerPaths_Constants"%>
<%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>

<div>

	<c:forEach var="projectItem" items="${ projectListFromDB }" varStatus="headerProjectListVarStatus" >
	
		<c:if test="${ headerProjectListVarStatus.count > 1 }"> <%-- All but first item, "count" starts at 1 --%>
			<div class="project-text-label-bottom-border" ></div>
		</c:if>
		
		<div  class="project-text-div" >
			<a href="<%= AA_PageControllerPaths_Constants.PROJECT_VIEW_PAGE_CONTROLLER %>/<c:out value="${ projectItem.id }" ></c:out>"
				class="project-text-link" 
				><span title="<c:out value="${ projectItem.title }" ></c:out
				>" ><c:out value="${ projectItem.title }" ></c:out
				></span>
			</a>
		</div>
	</c:forEach>

</div>