<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/pageEncodingDirective.jsp" %> <%-- Put on Every Page --%>
<%--
	projectSearchList.jsp
	
	List the projects.  For each project list the searches and users

// String path = request.getContextPath();
// String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
--%>

<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/top_of_every_page_doctype__jsp_cache_directives.jsp" %>

<html>
<head>
	<title><%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_title_start.jsp" 
				%> Projects Search List</title>

 <%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_include_main_pages.jsp" %>

</head>
<body class=" <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_standard_header_pages.jsp" 
		  		%><%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_data_pages.jsp" 
				%> project-search-list-page
				
				">

 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_body_tag_start_include_data_pages.jsp" %>

  <%@ include file="/WEB-INF/jsp/jsp_header_footer/header_main_pages.jsp" %>

   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_header_include_data_pages.jsp" %>

	<div class="top-level-label your-projects-title" >Your Projects</div>	
	
	

		<%--  The list of projects will be put in this div by the Javascript --%>
	<table border="0" width="100%"  style="margin-left: 20px;">

    <c:forEach var="project" items="${ projectList }">
    
    <%
    	// System.out.println("Project: " + pageContext.getAttribute("project") );
    
    %>
    
	 <tr class="project_root_container_jq">	
		<td colspan="3" >			
			<a style="font-weight: bold; font-size: 18px;"
				class="project-text-link  project_title_jq selector_tool_tip_attached" title="View project" 
				href="<%= AA_PageControllerPaths_Constants.PROJECT_VIEW_PAGE_CONTROLLER %>/${ project.projectMain.id }" 
				><c:out value="${ project.projectMain.title }"></c:out></a>
		</td>
	 </tr>
	 <tr>
	 	<td></td>
	 	<td colspan="2">
	 		<span style="font-weight: bold">Researchers:</span> <c:out value="${ project.users }"></c:out>
	 	</td>
	 <tr>
	 	<td style="width: 20px;"></td>
	 	<td colspan="2" style="font-weight: bold">
	 		<div style="margin-top: 10px">
	 			Searches for Project:
	 		</div>
	 	</td>
	 </tr>
	  <tr>
	 	<td></td>
	 	<td style="width: 20px;"></td>
	 	<td>
	 		<ul>
	 		
	  			<c:forEach var="search" items="${ project.searches }">
		 			<li>
		 				<c:choose>
			 				<c:when test="${ empty search.name }">
			 					Search: <c:out value="${ search.searchId }"></c:out>
			 				
			 				</c:when>
			 				<c:otherwise>
			 				
			 					<c:out value="${ search.name }"></c:out>
			 				</c:otherwise>
		 				</c:choose>
		 				
		 				 (<c:out value="${ search.searchId }"></c:out>)
	 				</li>
				 </c:forEach>
	 				
	 		</ul>
	 	</td>
	 </tr>
	 <tr  class="project_separator_row_jq">
	   <td colspan="3">	
		<div class="project-container-bottom-border" ></div>
	  </td>
	 </tr>
    </c:forEach>	
	  
	</table>
	
   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_footer_include_data_pages.jsp" %>

  <%@ include file="/WEB-INF/jsp/jsp_header_footer/footer_main.jsp" %>
  
 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_closing_body_tag_include_data_pages.jsp" %>

  <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp" %>
  
  <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_main_script_include__script_include_libs__page_header_js.jsp" %>
  	
</body>
</html>