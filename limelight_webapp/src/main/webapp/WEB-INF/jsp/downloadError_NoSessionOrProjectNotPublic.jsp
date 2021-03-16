<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/pageEncodingDirective.jsp" %> <%-- Put on Every Page --%>
<%--
		downloadError_NoSessionOrProjectNotPublic.jsp
				
		Displayed when a download gets a access validation exception of Limelight_WS_AuthError_Unauthorized_Exception
		  which occurs if no user session and project not public.
		

--%>

<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/top_of_every_page_doctype__jsp_cache_directives.jsp" %>

<%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>

<html>
  <head>
  	<title><%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_title_start.jsp" 
				%> User Session Error</title>

	 <%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_include_every_page.jsp" %>
  
  </head>
  <body class="
	<%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_inset_pages.jsp" %>
				">
	<div class="page-content-outer-container" >	
	 <div class="page-content-container" >	
	  <div class="page-content" >	
		
	
		<div class="logo-large-container" >
			<img src="static/images/login-page-logo.png" />
		</div>
		
		<div style="margin-top: 20px; margin-bottom: 10px; ">
	  	
	  	  <div style="text-align: center; ">
	  		<div style="font-size: 14px; font-weight: bold; text-align: left; margin-top: 24px; width: 300px; margin-left: auto; margin-right: auto;">
	  		  <div >
	  		  	An error has occurred processing the download request.
	  		  </div>
	  		  <div style="margin-top: 10px;">
	  		  	Your session has expired or there are other access errors.
	  		  </div>
	  		  <div style="margin-top: 10px;">
	  			 Please close this window and reload the page where you initiated this request on.
	  		  </div>
	  		  <div style="margin-top: 10px;">
	  			 Please contact the administrator if you continue to get this error after reloading that page.
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
	