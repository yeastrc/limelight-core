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
	
</head>
<body class="
<%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_inset_pages.jsp" %>
<%@ include file="/WEB-INF/jsp/user_account_pages_and_parts/jsp_includes/body_tag_class_start_include_user_pages.jsp" %>
				">

<%--  	JSTL not currently included
		<input type="hidden" id="requestedURL" value="<c:out value="${ param.requestedURL }" />"/>
		<input type="hidden" id="useDefaultURL"  value="<c:out value="${ param.useDefaultURL }" />"/>
	    <input type="hidden" id="defaultURL" value="XXXXX"/>
--%>

<div class=" inset-body-class-main-outermost-div ">

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