<%--
	header_main_pages.jsp

	After <body> for "Main" pages
--%>

<%@page import="org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers.AA_PageControllerPaths_Constants"%>
<%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>

  <div class=" header-outer-container " id="header_outer_container_div">  <%--  Outer Container for the Header --%>
  
  		<%--  Grid:  Logo, Project Title, User Name(username), Logout or Login Icon  --%>
    <div class=" header-middle-container " 
    	style="display: grid; grid-template-columns: 120px auto <c:if test="${ not empty headerUserInfo }"> min-content </c:if> min-content;">
	<%-- Left Side contents --%>
	
	<div class="header-logo">
	 
	 <c:choose>
	  <c:when test="${ not empty headerUserInfo }">
	   <a href="" >
	  </c:when>
	  <c:when test="${ not empty headerProjectInfo }">
	   <a href="<%= AA_PageControllerPaths_Constants.PROJECT_VIEW_PAGE_CONTROLLER %>/<c:out value="${ headerProjectInfo.projectId }" ></c:out>">
	  </c:when>
	  <c:otherwise>
	  	
	  </c:otherwise>
	 </c:choose>
	
		<img src="static/images/header-footer-logo.png" >

	 <c:choose>
	  <c:when test="${ not empty headerUserInfo }">
	   </a>
	  </c:when>
	  <c:when test="${ not empty headerProjectInfo }">
	   </a>
	  </c:when>
	 </c:choose>
	 
	</div>

			<%-- Project Title:  Keep all on one line, Hide overflow, show ... when have overflow --%>
	<div class="header-left-main-container" style=" white-space: nowrap; overflow: hidden; text-overflow: ellipsis; ">
	
	 <%--  Current Project --%>

	 <c:if test="${ not empty headerProjectInfo }">  <%--  Also used in generalError.jsp --%>
	  
		<a href="d/pg/project/<c:out value="${ headerProjectInfo.projectId }" ></c:out>"  
				class="header-project-title"  id="header_project_title_link" 
				title="<c:out value="${ headerProjectInfo.projectTitle }"></c:out>"
				>
								
				<%--  Show only for locked projects and not for public access --%>
				
				<c:if test="${ not empty headerUserInfo and headerProjectInfo.projectLocked }">
					<img src="static/images/icon-locked.png" class=" icon-small "
							id="header_project_locked_icon">
				</c:if>
				
				<span class="header-project-title" id="header_project_title"
						><c:out value="${ headerProjectInfo.projectTitle }"></c:out></span>
						
		</a>
	 </c:if>
	 
	</div>   <%--  END:  Container for Left Side contents  --%>

  	 <c:choose>
  	  <c:when test="${ empty headerUserInfo }">   <%--  Also used in generalError.jsp --%>
  	  
  	   <div class="header-right-icons-container" style="position: relative;">
		
	  		<a href="user/login?useDefaultURL=yes"  id="signin_header_link" 
	  			><img src="static/images/icon-login.png" class=" icon-small "
	  		></a>
	   </div>  	  

  	  </c:when>
  	  <c:otherwise>
  	  
  	   <div  class="header-user-name-container" style="white-space: nowrap;"> 
		<a href="user/account-management" class="overide-text-color-to-base-color"
	  		><span class="header-user-name">
	  			<span id="header-user-first-name"><c:out value="${ headerUserInfo.user_displayFirstName }"></c:out></span> 
	  			<span id="header-user-last-name"><c:out value="${ headerUserInfo.user_displayLastName }"></c:out></span> 
	  			(<span id="header-user-user-name"><c:out value="${ headerUserInfo.username }"></c:out></span>) 
  			</span></a>
  	   </div>
  	   
  	 	<%--  icons will be to the right of username --%>
  	   <div class=" header-right-icons-container " style="position: relative;">

	  		<a href="user/logout" id="sign_out_header_link" 
	  			><img src="static/images/icon-logout.png" class="header-logout-image" 
	  		></a>
	  		
  	   </div>
  	     	  
  		
  	  </c:otherwise>
  	 </c:choose>

	</div>
	
  </div>

	