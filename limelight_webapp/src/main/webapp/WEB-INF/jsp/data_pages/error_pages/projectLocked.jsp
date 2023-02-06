<%@page import="org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers.AA_PageControllerPaths_Constants"%>
<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/pageEncodingDirective.jsp" %> <%-- Put on Every Page --%>
<%--  projectLocked.jsp --%>

<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/top_of_every_page_doctype__jsp_cache_directives.jsp" %>


<html>
<head>
	<title>Limelight - Project Locked</title>

 <%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_include_every_page.jsp" %>
	
</head>

<body class="
	<%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_inset_pages.jsp" %>
"> <%-- "inset-page" is for pages with an 'inset' look --%>

<div class="page-content-outer-container" >	
 <div class="page-content-container"style="width: 699px;" >	
  <div class="page-content" >	
	

	<div class="logo-large-container" >
		<img src="static/images/login-page-logo.png" />
	</div>
	
	<div id="main_container_below_logo">
	</div>
  		
  	<div  style="position: relative; margin-left: 10px; margin-right: 10px; text-align: center;" class="page-label">
  	
	  	<div >
		  The project is locked.  Please return to the main 
		  
		  <a href="<%= AA_PageControllerPaths_Constants.PROJECT_VIEW_PAGE_CONTROLLER + AA_PageControllerPaths_Constants.PATH_SEPARATOR %><c:out value="${ projectId_FromViewProjectController }"></c:out>" 
		  >project page</a>
		  
		</div>
		<c:if test="${ not empty adminEmailAddress }">
			<div style="margin-top: 15px;">
				If you believe this is in error, please email us at
				<a href="mailto:<c:out value="${ adminEmailAddress }"></c:out>" target="_top"><c:out value="${ adminEmailAddress }"></c:out></a>.
			</div> 
		</c:if>
		<div style="margin-top: 15px; margin-bottom: 20px;"> 
			<a href="" >Go back to limelight home page</a>.
		</div> 

	</div>
  
  </div>
  </div>
  
 </div>
  
  <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp" %>	
</body>
</html>
