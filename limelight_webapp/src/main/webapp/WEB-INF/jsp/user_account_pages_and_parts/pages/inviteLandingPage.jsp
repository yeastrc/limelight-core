<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/pageEncodingDirective.jsp" %> <%-- Put on Every Page --%>
<%--
	inviteLandingPage.jsp
	
	Invite Landing Page

// String path = request.getContextPath();
// String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
--%>

<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/top_of_every_page_doctype__jsp_cache_directives.jsp" %>

 <%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>

<html>
<head>
	<title>Limelight - Invite</title>
 <%@ include file="/WEB-INF/jsp/user_account_pages_and_parts/jsp_includes/head_section_include_user_pages.jsp" %>
	
</head>
<body class="
<%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_inset_pages.jsp" %>
<%@ include file="/WEB-INF/jsp/user_account_pages_and_parts/jsp_includes/body_tag_class_start_include_user_pages.jsp" %>
				">

<div class="page-content-outer-container" >	
 <div class="page-content-container" >	
  <div class="page-content" >	
	
	<script id="invite_landing_invite_code" type="text/text"><c:out value="${ inviteCode }"></c:out></script>

	<%-- Populated if invite for a specific project --%>
	<script id="invite_landing_invite_project_id" type="text/text"><c:out value="${ inviteProjectId }"></c:out></script>
	<%-- Populated if invite for a specific project. --%>
	<script id="invite_landing_invite_project_title" type="text/text"><c:out value="${ inviteProjectTitle }"></c:out></script>

	<div class="logo-large-container" >
		<img src="static/images/login-page-logo.png" />
	</div>

	<div id="main_container_below_logo">
	</div>

  </div>
 </div>
</div>

<%@ include file="/WEB-INF/jsp/jsp_header_footer/footer_main.jsp" %>	

<script type="text/javascript" src="static/js_generated_bundles/user_pages/userInvitePage_Root-bundle.js?x=${ cacheBustValue }"></script>
		
  <%@ include file="//WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp" %>	
</body>
</html>