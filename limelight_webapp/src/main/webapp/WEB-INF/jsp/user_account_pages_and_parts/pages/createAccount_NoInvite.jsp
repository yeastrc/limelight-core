<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/pageEncodingDirective.jsp" %> <%-- Put on Every Page --%>
<%--
	createAccount_NoInvite.jsp
	
	Create Account with No Invite Page

// String path = request.getContextPath();
// String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
--%>

<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/top_of_every_page_doctype__jsp_cache_directives.jsp" %>

<html>
<head>
	<title>Limelight - Create Account</title>
 <%@ include file="/WEB-INF/jsp/user_account_pages_and_parts/jsp_includes/head_section_include_user_pages.jsp" %>
 
 
 <%--  google_RecaptchaSiteKey only populated when Configuration has Google RecaptchaSiteKey and RecaptchaSecretKey Populated --%>
 <c:if test="${ not empty google_RecaptchaSiteKey }">
 	<script type="text/text" id="create_account_page_google_recaptcha_site_key"><html><body><c:out value="${ google_RecaptchaSiteKey }"></body></html></c:out></script>
 </c:if>
 
 <%--  termsOfServiceKey only populated when Configuration has termsOfService Enabled Populated --%>
 <c:if test="${ not empty termsOfServiceKey }">
 	<script type="text/text" id="terms_of_service_id_string"><html><body><c:out value="${ termsOfServiceKey }"></body></html></c:out></script>
 </c:if>
 
 
</head>
<body class="
<%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_inset_pages.jsp" %>
<%@ include file="/WEB-INF/jsp/user_account_pages_and_parts/jsp_includes/body_tag_class_start_include_user_pages.jsp" %>
<%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_data_pages.jsp" %>
				">

<%--  	JSTL not currently included
		<input type="hidden" id="requestedURL" value="<c:out value="${ param.requestedURL }" />"/>
		<input type="hidden" id="useDefaultURL"  value="<c:out value="${ param.useDefaultURL }" />"/>
	    <input type="hidden" id="defaultURL" value="XXXXX"/>
--%>

<div class=" inset-body-class-main-outermost-div ">



	<%--  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! --%>
	
	<%--  !!!!!!!!!!    Overlays               !!!!!!!!!! --%>

	<%--  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! --%>
	
	
 <c:if test="${ not empty termsOfServiceTextVersion }">	
 
  <%--  Terms of Service Overlay --%>
		

	<%--  Terms of Service Overlay Background --%>
	
	
	<div id="terms_of_service_modal_dialog_overlay_background" class="modal-overlay-page-background" style="display: none;"  >
	</div>
	
	<%--  Terms of Service Overlay Div --%>
	
	<div style="text-align: center; position: relative;">
	  <div style="text-align: center; position: relative;" >
		<div id="terms_of_service_overlay_div" class=" modal-overlay-container " 
			style="display: none; width: 800px; left: max(50%, 410px); top: 30px; transform: translate(-50%); -webkit-transform: translate(-50%);"  
		>
		
			<div id="terms_of_service_overlay_header" class="modal-overlay-header" style="width:100%; " >
				<h1 id="terms_of_service_overlay_header_text" class="modal-overlay-header-text" 
					>Terms of Service</h1>
			</div>
			<div id="terms_of_service_overlay_body" class="terms-of-service-overlay-body" style=" padding: 20px; text-align: left; ">
				<div style="margin-bottom: 10px;">
					Terms of Service Acceptance required.
				</div>
				
				<div id="terms_of_service_acceptance_required_text" class=" standard-border-color-gray "
					style="margin: 5px; padding: 20px; border-width: 1px; border-style: solid; "
				>
					<c:out value="${ termsOfServiceText }" escapeXml="false"></c:out>
					<input type="hidden" value="${ termsOfServiceTextVersion.idString }" id="terms_of_service_id_string">
				</div>
				
				<div style="margin-top: 10px; margin-bottom: 10px;">
					<input id="terms_of_service_acceptance_yes_button" class="submit-button "
						type="button" value="Accept Terms of Service">
		
					<input id="terms_of_service_acceptance_no_button"  class="submit-button "
						type="button" value="Reject Terms of Service">
				</div>
				
			</div> <%--  END  <div id="terms_of_service_overlay_body"  --%>
			
		</div>  <%--  END  <div id="terms_of_service_overlay_div"  --%>
	  </div>
	</div>
	
  </c:if>
  

<div class="page-content-outer-container" >
    <div class="page-content-container" >
        <div class="page-content" >


            <div class="logo-large-container" >
                <img src="static/images/login-page-logo.png" />
            </div>

            <div id="main_container_below_logo">
            </div>

        </div>

        <div id="get_help_tab" class="bottom-tab"  > <%-- Add if put box to right for Help: style="border-right-width: 0px;" --%>
            <a href="https://limelight-ms.readthedocs.io/en/latest/" target="_blank">Get Help</a>
        </div>

        <div id="signin_tab" class="bottom-tab" style="border-right-width: 0px;" > <%-- Add if put box to right for Help: style="border-right-width: 0px;" --%>
            <span id="signin_fake_link" class=" fake-link " >Sign In</span>
        </div>
	  
    </div>
    <div></div>
    <div style="border: 2px solid #d3d3d3;background-color: #fff;display: inline-block;margin-top:20px;width: 466px;">
        <div style="padding: 10px;">Using Limelight in your work? Remember to <a target="_blank" href="https://limelight-ms.readthedocs.io/en/latest/#citing"><span style="font-weight:bold;">Cite Limelight</span></a>!</div>
    </div>
</div>
<%@ include file="/WEB-INF/jsp/jsp_header_footer/footer_main.jsp" %>

</div>
	
  <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp" %>
  
<%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_main_script_include__script_include_libs__page_header_js.jsp" %>
  			
<script type="text/javascript" src="static/js_generated_bundles/user_pages/userCreateAccount_Root-bundle.js?x=${ cacheBustValue }"></script>
	
</body>
</html>