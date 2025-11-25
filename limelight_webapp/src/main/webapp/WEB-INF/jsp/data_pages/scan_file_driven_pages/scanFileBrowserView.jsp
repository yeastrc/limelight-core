<%--
	scanFileBrowserView.jsp
	
	View Scan File Browser for a project and scan file id

// String path = request.getContextPath();
// String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
--%>

<%@page import="org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers.AA_PageControllerPaths_Constants"
%><%@ include file="/WEB-INF/jsp/jsp_includes_head_section/pageEncodingDirective.jsp" %> <%-- Put on Every Page --%>


<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/top_of_every_page_doctype__jsp_cache_directives.jsp" %>

<html>
<head>
	<title><%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_title_start.jsp" 
				%> Scan Browser</title>
	
	<script id="controller_path" type="text/text"><%= AA_PageControllerPaths_Constants.SCAN_FILE_BROWSER_PAGE_CONTROLLER %></script>
	
 <%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_include_data_pages.jsp" %> 

</head>
<body class=" <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_standard_header_pages.jsp" 
		  		%><%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_data_pages.jsp" 
				%> qc-page ">

 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_body_tag_start_include_data_pages.jsp" %> 

  <%@ include file="/WEB-INF/jsp/jsp_header_footer/header_main_pages.jsp" %>

   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_header_include_data_pages.jsp" %>
   
   <%--
	<!--  Navigation Links -->
	<div id="data_pages_nav_links_page_container" ></div>
	 --%>
	
	<h1>
		Scan File Browser
	</h1>
	  <%--
	<div>
		Uses 'scanFileBrowserViewPage_RootLaunch_PublicUser-bundle.js' even though logged in.  
	</div>
	<div>
		'webSessionAuthAccessLevel' Servlet Request property is NOT being set.  
	</div>
	<div>
		For Project Search Id based data pages that is probably set in the Interceptor that does access control.
	</div>
	 --%>
	 

	<%--
		  Loading message until Javascript populates the next div.
		  
		  WARNING: Put NO listeners on this div or children since will not be cleaned up.
		  			This div will be deleted with '.remove()'  
  	--%>
	<div id="main_block_loading_message_container">
		<h2>
			Loading...
		</h2>
	</div>
	
		
	<!--  Main View Container -->
	<div id="main_view_outer_block_react_root_container"></div>

  
   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_footer_include_data_pages.jsp" %>
	
  <%@ include file="/WEB-INF/jsp/jsp_header_footer/footer_main.jsp" %>

 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_closing_body_tag_include_data_pages.jsp" %>
  
  <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp" %>
  
  <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_main_script_include__script_include_libs__page_header_js.jsp" %>
  	
 	<%--  Determine which Javascript bundle to load based on user type --%>
  <c:choose>
    <c:when test="${ webSessionAuthAccessLevel.assistantProjectOwnerAllowed }">
	  	<%--  Project Owner or Researcher and Project is NOT locked --%>
	  <script type="text/javascript" src="static/js_generated_bundles/data_pages/scanFileBrowserViewPage_RootLaunch_LoggedInUsers-bundle.js?x=${ cacheBustValue }"></script>
  	</c:when>
  	<c:otherwise>
	  	<%--  Public User or Project is Locked --%>
	  <script type="text/javascript" src="static/js_generated_bundles/data_pages/scanFileBrowserViewPage_RootLaunch_PublicUser-bundle.js?x=${ cacheBustValue }"></script>
  	</c:otherwise>
  </c:choose>
  
</body>
</html>