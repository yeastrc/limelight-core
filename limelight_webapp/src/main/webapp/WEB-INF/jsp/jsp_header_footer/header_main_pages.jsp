<%--
	header_main_pages.jsp

	After <body> for "Main" pages
--%>

<%@page import="org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers.AA_PageControllerPaths_Constants"%>
<%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>

	
	<%--  Project List Drop Down Menu
	
			Here to be oustide the CSS Grid
	
	 --%>
	 <%-- --%>
	<div style="position: relative; height: 0px">
		<div id="header_projects_list_dropdown_outer_container" 
			class=" header-projects-list-container " 
			style=" width: MIN( 800px, 60vw ); max-height: MIN( 800px, CALC( 80vh - 40px ) ); "
		>
			
			Loading Projects...
			
	    </div>
	</div>
	
  <div class=" header-outer-container " id="header_outer_container_div">  <%--  Outer Container for the Header --%>
	
	<%--  Grid:  Logo, Project Title, User Name(username), Logout or Login Icon  --%>
    <div class=" header-middle-container " 
    	style="display: grid; grid-template-columns: 120px auto <c:if test="${ not empty headerUserInfo }"> min-content </c:if>  <c:if test="${ headerUserIsAdmin }"> min-content </c:if> min-content;">
	<%-- Left Side contents --%>
	
	<div class="header-logo">
	
	<c:set var="logoImageHTML"> <img src="static/images/header-footer-logo.png" > </c:set>
	 
	 <c:choose>
	  <c:when test="${ not empty headerUserInfo }">
	  	<%--  Have User: so clicking this Limelight icon will show project list page --%>
	   <a href="" 
	   		class=" selector_tool_tip_attached "
 			title='View Project List'
			data-tooltip='<div style="white-space: nowrap;">View Project List</div>'
	   >
	   <%--  HTML to show logo, set in <c:set immediately above --%>
	   ${ logoImageHTML }
	   </a>
	  </c:when>
	  <c:when test="${ not empty headerProjectInfo }">
	  	<%--  NO User, Have Project:  so clicking this Limelight icon will show current project page --%>
	   <a href="<%= AA_PageControllerPaths_Constants.PROJECT_VIEW_PAGE_CONTROLLER %>/<c:out value="${ headerProjectInfo.projectId }" ></c:out>"
	   		class=" selector_tool_tip_attached "
 			title='View Project'
			data-tooltip='<div style="white-space: nowrap;">View Project</div>'
	   	>
	    <%--  HTML to show logo, set in <c:set immediately above --%>
	   	${ logoImageHTML }
	   	</a>
	  </c:when>
	  <c:otherwise>
	  	<%--  No User, No Project:  So no Link on Image --%>

	    <%--  HTML to show logo, set in <c:set immediately above --%>
	  	${ logoImageHTML }
	  </c:otherwise>
	 </c:choose>
	
		
	</div>

 	 <c:if test="${ not empty headerUserInfo }">
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
	 
			<%-- Project Title:  Keep all on one line, Hide overflow, show ... when have overflow --%>
	<div class="header-left-main-container" style=" white-space: nowrap; overflow: hidden; text-overflow: ellipsis; ">
	
	 <c:if test="${ not empty headerUserInfo }">
	 
	 
	  <div class="header-pointer-right">
		<span > <%-- style="padding-left: 5px; padding-right: 5px;" --%>
		 
			<img src="static/images/pointer-right.png" class=" icon-small ">
		</span>
	  </div>

	  <div
	    id="header_projects_outer_container" 
	  	class="header-projects-label-div" style="position: relative;"
  	  >
	  	<div id="header_projects_inner_container" >
			<a href="" class="header-projects-label" id="header_projects_link">
	
				<span class="header-projects-label">
					Projects  <%--  PROJECTS Label on Page in HEader --%>
				</span>
	
				<img src="static/images/pointer-down.png" class=" icon-small ">
			</a>
		</div>
		<div id="header_projects_list_position_reference_div"
			style="position: relative"	
		>
			<div style="position: absolute; left: 0; top: 0; right: 0; height: 100px;">
			</div>
		</div> 
	   
	   </div>
	   
	 </c:if>
	 
	 <%--  Current Project --%>

	 <c:if test="${ not empty headerProjectInfo }">  <%--  Also used in generalError.jsp --%>
	  
		<div class="header-projects-pointer-right--right-of-projects">
			<img src="static/images/pointer-right.png" class=" icon-small ">
		</div>
		  
		<a href="d/pg/project/<c:out value="${ headerProjectInfo.projectId }" ></c:out>"  
				class=" no-underline header-project-title  selector_tool_tip_attached "  id="header_project_title_link"
				data-tooltip="<c:out value="${ headerProjectInfo.projectTitle }"></c:out>"
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
		
	  		<img src="static/images/icon-login.png" class=" icon-small fake-link-image selector_tool_tip_attached"
		  			id="signin_header_link" 
		  			title="Signin"
	  		>
	   </div>  	  

  	  </c:when>
  	  <c:otherwise>
  	  
  	   <div  class="header-user-name-container" style="white-space: nowrap;"> 
		<a href="user/account-management" class=" overide-text-color-to-base-color selector_tool_tip_attached "
			id="user_mgmt_header_link"
			title='Click to manage user account'
			data-tooltip='<div style="white-space: nowrap;">Click to manage user account</div>'
	  		><span class="header-user-name">
	  			<span id="header-user-first-name"><c:out value="${ headerUserInfo.user_displayFirstName }"></c:out></span> 
	  			<span id="header-user-last-name"><c:out value="${ headerUserInfo.user_displayLastName }"></c:out></span> 
	  			(<span id="header-user-user-name"><c:out value="${ headerUserInfo.username }"></c:out></span>) 
  			</span></a>
  	   </div>
  	   
  	   <c:if test="${ headerUserIsAdmin }"> 
  	   
  	   	<div  class="header-admin-container" style="white-space: nowrap;"
  	   	><a href="admin"
  	   		 class=" overide-text-color-to-base-color selector_tool_tip_attached "
  	   		 title="Click to administer Limelight Instance"
  	   		 data-tooltip='<div style="white-space: nowrap;">Click to administer Limelight Instance</div>'
  	   		>ADMIN</a
 			></div>
  	   
  	   </c:if>
  	   
  	 	<%--  icons will be to the right of username --%>
  	   <div class=" header-right-icons-container " style="position: relative;">
		   <a href="https://limelight-ms.readthedocs.io/en/latest/" id="documentation_header_link" target="_blank"
			  class=" selector_tool_tip_attached "
			  title="Read Documentation"
		   ><img src="static/images/icon-help.png" class="header-documentation-image"
		   ></a>

	  		<a href="user/logout" id="sign_out_header_link" 
	  			class=" selector_tool_tip_attached "
	  			title="Sign Out"
	  			><img src="static/images/icon-logout.png" class="header-logout-image"
	  		></a>
  	   </div>
  	     	  
  		
  	  </c:otherwise>
  	 </c:choose>

	</div>
	
  </div>

	