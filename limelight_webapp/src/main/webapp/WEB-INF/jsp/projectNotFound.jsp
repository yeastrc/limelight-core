<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/pageEncodingDirective.jsp" %> <%-- Put on Every Page --%>
<%--  projectNotFound.jsp --%>
<%
	response.setStatus( 404 );
%>

<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/top_of_every_page_doctype__jsp_cache_directives.jsp" %>


<html>
<head>
	<title>Limelight - Project not found</title>

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
		  There is no project with the id you are accessing: <c:out value="${ projectId_FromViewProjectController }"></c:out>
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
  
  <%@ include file="//WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp" %>	
</body>
</html>
