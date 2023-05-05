<%--  

	footer_main.jsp    /WEB-INF/jsp/jsp_header_footer/footer_main.jsp

	This is included in every page 
--%>

<%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>

	<div class="footer-outer-container" id="footer_outer_container_div">
	
		<div class="footer-left-container">
			<span><img id="footer-logo-img" src="static/images/header-footer-logo.png"></span>
		</div>
		<div class="footer-right-container">
			&copy; 2023 University of Washington
			<%--
				When Add Terms of Service, update link to page
			
			 --%>
			<%--
			<c:if test="${ configSystemValues.termsOfServiceEnabled }">
				(<a href="XXXXXX" target="terms_of_service" >Terms of Service</a>)
			</c:if>			
			 --%>
		</div>
		
		
		<div class="footer-center-outer-container">
		  <div class="footer-center-container" >
			<%--  'id' used by manage configuration to update this div with admin entered data --%>
			<div id="footer_center_container" >
				<c:out value="${ configSystemValues.footerCenterOfPageHTML }" escapeXml="false"></c:out>
			</div>
		  </div>
		</div>
	
	</div>
	
	