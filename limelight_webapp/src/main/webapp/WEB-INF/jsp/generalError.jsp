<%@page import="org.yeastrc.limelight.limelight_webapp.constants.WebErrorPageKeysConstants"%>
<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/pageEncodingDirective.jsp" %><%-- Put on Every Page --%><%--

		generalError.jsp
		
		Specified in web.xml
		
		Displayed when an exception is returned from a controller

--%><%@ include file="/WEB-INF/jsp/jsp_includes_head_section/top_of_every_page_doctype__jsp_cache_directives.jsp" %><%-- 



--%><%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %><%-- 

--%><%
Integer responseStatusCode = (Integer) request.getAttribute( WebErrorPageKeysConstants.RESPONSE_STATUS_CODE );
if ( responseStatusCode != null ) {
	response.setStatus( responseStatusCode );
}
%>


<html>
  <head>
  	<title><%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_title_start.jsp" 
				%> Error</title>

	 <%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_include_every_page.jsp" %>
  
  </head>
  <body class="
	<%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_inset_pages.jsp" %>
				">
	<div class="page-content-outer-container" >	
	 <div class="page-content-container" style="width: 600px;">	
	  <div class="page-content" >	
		
	
		<div class="logo-large-container" >
			<img src="static/images/login-page-logo.png" />
		</div>
		
		<div style="margin-top: 20px; margin-bottom: 10px; ">
	  	
	  	  <div style="text-align: center; ">
	  	  		<%-- text-align: left; width: 550px;  margin-left: auto; margin-right: auto; --%>
	  		<div style="font-size: 24px; font-weight: bold;  margin-top: 24px; ">
	  		  <div >
	  		  	There was a problem processing your request.
	  		  </div>
	  		  
	  		  <c:if test="${ urlFormatInvalid }">
	  		  	<div style="margin-top: 24px; margin-bottom: 24px; ">
	  		  		The URL is an invalid format.
	  		  	</div>
	  		  </c:if>
	  		  
	  		  
	  		  <c:if test="${ requestedSearchNotFound }">
	  		  	<div style="margin-top: 24px; margin-bottom: 24px; ">
	  		  		A requested search was not found.
	  		  	</div>
	  		  </c:if>
	  		  
	  		  <c:if test="${ requestedSearchesFoundMoreThanOneProject }">
	  		  	<div style="margin-top: 24px; margin-bottom: 24px; ">
	  		  		<div >
	  		  			A requested search was not found
  		  			</div>
  		  			<div>
	  		  		 	in the requested project.
  		  		 	</div>
	  		  	</div>
	  		  </c:if>
	  		  	  		  	  		  
	  		  <c:if test="${ requestedDataNotFound }">
	  		  	<div style="margin-top: 24px; margin-bottom: 24px; ">
	  		  		The requested data was not found.
	  		  	</div>
	  		  </c:if>
	  		  
	  		  <div style="margin-top: 20px;">
	  		    <c:choose>
	  		      <c:when test="${ not empty headerProjectInfo }">
	  		        <a href="d/pg/project/<c:out value="${ headerProjectInfo.projectId }" ></c:out>"  >Start Over</a>
	  		      </c:when>
	  		      <c:when test="${ not empty headerUserInfo }"> <%-- Not always reached for data pages, at least when SearchDataLookupParams code not valid/found --%>
	  		        <a href=""  >Start Over</a>
	  		      </c:when>
	  		      <c:otherwise>
	  		      
	  		      </c:otherwise>
	  		    </c:choose>  
	  		  </div>
	  		</div>
	  	  </div>
	
		</div>
	  </div>
	 </div>
	</div>
	
	<%@ include file="/WEB-INF/jsp/jsp_header_footer/footer_main.jsp" %>	
		
	<%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp" %>
		
  </body>
</html>  	
	