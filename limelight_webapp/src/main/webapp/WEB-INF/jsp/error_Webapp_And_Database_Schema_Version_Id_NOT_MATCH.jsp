<%@page import="org.yeastrc.limelight.limelight_webapp.constants.WebErrorPageKeysConstants"%>
<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/pageEncodingDirective.jsp" %><%-- Put on Every Page --%><%--

		error_Webapp_And_Database_Schema_Version_Id_NOT_MATCH.jsp
				
		Display error page when Webapp And Database Schema Version Number  NOT MATCH 

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
				
   <div class=" inset-body-class-main-outermost-div ">
   
	<div class="page-content-outer-container" >	
	 <div class="page-content-container" style="width: 600px;">	
	  <div class="page-content" >	
		
	
		<div class="logo-large-container" >
			<img src="static/images/login-page-logo.png" />
		</div>
		
		<div style="margin-top: 20px; margin-bottom: 10px; ">
	  	
	  	  <div style="text-align: left; margin: 20px; ">  <%--   --%>
	  	  		<%-- text-align: left; width: 550px;  margin-left: auto; margin-right: auto; --%>
	  		<div style="font-size: 20px; font-weight: bold;  margin-top: 24px; ">
	  		  
	  		  <div style="margin-top: 20px;">
	  		  
	  		     <c:choose>
	  		       <c:when test="${ databaseUpdateInProgress }">
	  		      	<div style="text-align: center; margin-bottom: 10px;">
		  		      	Database updates in progress.
	  		      	</div> 
	  		      </c:when>
	  		     <c:otherwise>
		  		    <c:choose>
		  		      <c:when test="${ databaseBehindWebapp }">
		  		      	<div style="margin-bottom: 10px;">
			  		      	The database version is behind this version of Limelight.
		  		      	</div> 
		  		      </c:when>
		  		      <c:otherwise>
		  		      	<div style="margin-bottom: 10px;">
		  		      		The Limelight web application version is behind the database version. 
		  		      		The Limelight web application must be updated to match the database version.
	  		      		</div>
		  		      </c:otherwise>
		  		    </c:choose>  
		  		    
		  		    <div style="margin-bottom: 2px;">
		  		      For instructions on how to update Limelight and its database see: 
	  		        </div>
	  		        <div>
		  		      <a 
		  		      	href="https://limelight-ms.readthedocs.io/en/latest/administration/update-limelight.html"
		  		      	target="_blank"
		  		      >
		  		      	the instructions for updating Limelight
		  		      </a>
		  		    </div>
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
	
   </div>	
		
	<%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp" %>
		
  </body>
</html>  	
	