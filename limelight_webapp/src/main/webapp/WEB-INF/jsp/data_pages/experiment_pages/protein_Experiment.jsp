<%--
	protein_Experiment.jsp
	
	View proteins for a Experiment

// String path = request.getContextPath();
// String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
--%>

<%@page import="org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers.AA_PageControllerPaths_Constants"%>
<%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>

<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/pageEncodingDirective.jsp" %> <%-- Put on Every Page --%>


<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/top_of_every_page_doctype__jsp_cache_directives.jsp" %>

<html>
<head>
	<title><%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_title_start.jsp" 
				%> Experiment - Protein</title>
	
	<script id="controller_path" type="text/text"><%= AA_PageControllerPaths_Constants.EXPERIMENT___PROTEIN_VIEW_PAGE_CONTROLLER %></script>
	
 <%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_include_data_pages.jsp" %> 

</head>
<body class=" <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_standard_header_pages.jsp" 
		  		%><%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_data_pages.jsp" 
				%> protein-page ">

 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_body_tag_start_include_data_pages.jsp" %> 

  <%@ include file="/WEB-INF/jsp/jsp_header_footer/header_main_pages.jsp" %>

   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_header_include_data_pages.jsp" %>
   
   	<%--  <div> to contain main display --%>
   	
   	<div >
         <h3>List Proteins</h3>
   
		<!--  Navigation Links --> <%--  Contents inserted by Javascript --%>
		<div id="data_pages_nav_links_page_container" ></div>
		
	   	<div id="protein_experiment_data_page_overall_enclosing_block_div">
	   	</div>
	</div>
   	   	
   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_footer_include_data_pages.jsp" %>
	
  <%@ include file="/WEB-INF/jsp/jsp_header_footer/footer_main.jsp" %>

 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_closing_body_tag_include_data_pages.jsp" %>
	
  <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp" %>
    
  <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_main_script_include__script_include_libs__page_header_js.jsp" %>
  
 	<%--  Determine which Javascript bundle to load based on user type --%>
  <c:choose>
    <c:when test="${ webSessionAuthAccessLevel.assistantProjectOwnerAllowed }">
	  	<%--  Project Owner or Researcher and Project is NOT locked --%>
	  <script type="text/javascript" src="static/js_generated_bundles/data_pages/proteinExperimentPage_RootLaunch_LoggedInUsers-bundle.js?x=${ cacheBustValue }"></script>
  	</c:when>
  	<c:otherwise>
	  	<%--  Public User or Project is Locked --%>
	  <script type="text/javascript" src="static/js_generated_bundles/data_pages/proteinExperimentPage_RootLaunch_PublicUser-bundle.js?x=${ cacheBustValue }"></script>
  	</c:otherwise>
  </c:choose>
		
</body>
</html>