<%--
	header_main_pages.jsp

	After <body> for "Main" pages
--%>

<%@page import="org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers.AA_PageControllerPaths_Constants"%>
<%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>

  <div class="header-outer-container" id="header_outer_container_div">  <%--  Outer Container for the Header --%>
  
    <%--  The Right side contents for the header are first  --%>
  
  	<div class="header-right-edge-container">  <%--  Container for Right Side contents --%>
  	
  	 <c:choose>
  	  <c:when test="${ empty headerUserInfo }">   <%--  Also used in generalError.jsp --%>
  	  
  	   <div class="header-right-icons" style="position: relative;">
<%-- 	  	    
			TODO  Need Link address before uncomment
	  		<a href="http://limelight-web-app.readthedocs.io/${ helpURLExtensionForSpecificPage }"  target="_help_window" id="help_header_link" 
	  			><img src="static/images/icon-help.png" 
	  		></a>
--%>	  		
	  		<a href="user/login?useDefaultURL=yes"  id="signin_header_link" 
	  			><img src="static/images/icon-login.png" class=" icon-small "
	  		></a>
	   </div>  	  
	  	<%--  Simulated tool tips, absolutely positioned divs --%>
	  	<%-- 
  		<div class="header-icon-tool-tips" id="help_header_tooltip" >
  			View Documentation
  		</div>
  		<div class="header-icon-tool-tips" id="signin_header_tooltip" >
  			Signin
  		</div>
  		--%>
  		
	   
	   <%--  images/icon-login.png and images/icon-login-small.png --%>
	   
  	  </c:when>
  	  <c:otherwise>
  	  
  	 	<%--  icons will be to the right of username --%>
  	   <div class="header-right-icons" style="position: relative;">
<%-- 
	  		<a href="http://limelight-web-app.readthedocs.io/${ helpURLExtensionForSpecificPage }"  target="_help_window" id="help_header_link" 
	  			><img src="static/images/icon-help.png" 
	  		></a>
	  	    
	  		<a href="accountPage.do"  id="account_settings_header_link" 
	  			><img src="static/images/icon-user-settings.png" 
	  		></a>
	  		
		  <c:if test="${headerUserIsAdmin}" >
	  		<a href="manageUsersPage.do" id="manage_users_header_link" 
		  		><img src="static/images/icon-users.png" 
	  		></a>
	  		<a href="${ contextPath }/manageConfiguration.do"  id="manage_limelight_settings_header_link" 
	  			><img src="static/images/icon-limelight-config.png" 
	  		></a>
	  	  </c:if>
	  		
--%>
	  		<a href="user/logout" id="sign_out_header_link" 
	  			><img src="static/images/icon-logout.png" class="header-logout-image" 
	  		></a>
	  		
		  	<%--  Simulated tool tips, absolutely positioned divs --%>
<%--		  	
	  		<div class="header-icon-tool-tips" id="account_settings_header_tooltip" >
	  			Account Settings
	  		</div>
		  <c:if test="${headerUserIsAdmin}" >
	  		<div class="header-icon-tool-tips" id="manage_users_tooltip_header" >
	  			Manage Users
	  		</div>
	  		<div class="header-icon-tool-tips" id="manage_config_tooltip_header" >
	  			Manage Limelight Configuration
	  		</div>
	  	  </c:if>
	  		<div class="header-icon-tool-tips" id="sign_out_header_tooltip" >
	  			Sign Out
	  		</div>
	  		<div class="header-icon-tool-tips" id="help_header_tooltip" >
	  			View Limelight Documentation
	  		</div>
--%>	  		
  	   </div>
  	     	  
  	   <div  class="header-user-name-container"> 
		<a href="user/account-management" class="overide-text-color-to-base-color"
	  		><span class="header-user-name">
	  			<span id="header-user-first-name"><c:out value="${ headerUserInfo.user_displayFirstName }"></c:out></span> 
	  			<span id="header-user-last-name"><c:out value="${ headerUserInfo.user_displayLastName }"></c:out></span> 
	  			(<span id="header-user-user-name"><c:out value="${ headerUserInfo.username }"></c:out></span>) 
  			</span></a>
  	   </div>
  		
  	  </c:otherwise>
  	 </c:choose>

  	
  	</div>  <%--  END:  Container for Right Side contents  --%>
	
	
	<%-- Left Side contents --%>
	
	<div class="header-logo">
<%-- 
--%>	 
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
<%-- 		
--%>	 
	 <c:choose>
	  <c:when test="${ not empty headerUser }">
	   </a>
	  </c:when>
	  <c:when test="${ not empty headerProject }">
	   </a>
	  </c:when>
	 </c:choose>
	</div>

	<div class="header-left-main-container">
	
 	 <c:if test="${ not empty headerUser }">
<%--  	
	  <div class="header-pointer-right">
		<span style="padding-left: 5px; padding-right: 5px;"> 
			<img src="static/images/pointer-right.png">
		</span>
	  </div>
--%>
<%-- 
	  <div class="header-projects-label-div" style="position: relative;">
--%>	  
	  	<%--  Projects List for User --%>
<%-- 
	  </div>
--%>
		
	 </c:if>
	 
	 <%--  Current Project --%>

	 <c:if test="${ not empty headerProjectInfo }">  <%--  Also used in generalError.jsp --%>
<%-- 
	  <div class="header-projects-pointer-right--right-of-projects">
		<img src="static/images/pointer-right.png" >
	  </div>

	  <div class="header-current-project-label-div">
	  
--%>	  
	<%--  TEMP before <a> --%>

	&nbsp;&nbsp;&nbsp;&nbsp;
	
	
		<a href="d/pg/project/<c:out value="${ headerProjectInfo.projectId }" ></c:out>"  
				class="header-project-title"  id="header_project_title_link" 
				<c:if test="${ headerProjectInfo.titleFull ne  headerProjectInfo.titleHeaderDisplay }">
				
					title="<c:out value="${ headerProjectInfo.titleFull }"></c:out>"
				</c:if>
				
				>
				
				<c:set var="header_project_locked_display_none">display:none;</c:set> <%-- initialize to hide the lock symbol for non-locked projects --%>
				<c:if test="${ not headerProjectInfo.projectLocked }">
					<c:set var="header_project_locked_display_none"></c:set> <%-- for locked projects, clear the "display:none;" so the lock is shown --%>
				</c:if>
				
				<%--  Show only for locked projects and not for public access --%>
				
				<c:if test="${ not empty headerUserInfo and headerProjectInfo.projectLocked }">
					<img src="static/images/icon-locked.png" class=" icon-small "
							style="" <%--  <c:if test="${ not headerProjectInfo.projectLocked }">display:none;</c:if> --%>
							id="header_project_locked_icon">
				</c:if>
				
				
				<c:choose>
				  <c:when test="${ not empty headerUserInfo }">
					<span class="header-project-title" id="header_project_title"
						><c:out value="${ headerProjectInfo.titleHeaderDisplay }"></c:out></span>
				  </c:when>
				  <c:otherwise>
					<span class="header-project-title" id="header_project_title"
						><c:out value="${ headerProjectInfo.titleHeaderDisplayNonUser }"></c:out></span>
				  </c:otherwise>
				</c:choose>

		</a>
<%-- 		
	  </div>
--%>
	 </c:if>
	 
	</div>

  </div>

	