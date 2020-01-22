<%--  
	head_section_include_data_pages.jsp
	
	includes 'head_section_include_main_pages.jsp' which includes 'head_section_include_every_page.jsp'
	
	Included on pages that are Project Search Id based.
		Pages in 'jsp/data_pages/project_search_ids_driven_pages'
	
--%>
<%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>

<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_include_main_pages.jsp" %>

	<%--  Only test for presence of this tag for is project owner allowed  --%>
<c:if test="${ webSessionAuthAccessLevel.projectOwnerAllowed }">
  <script type="text/text" id="page_auth_access_level_project_owner_allowed">x</script>
 </c:if>

<%--  Search Details Section Extras --%>
<%@ include file="/WEB-INF/jsp/jsp_includes/searchDetailsSection_Extras.jsp" %>


<%-- From Java class DataPage_ProjectSearchIdBased_ControllersAccessControl_SpringHandlerInterceptor and Experiment_Set_HTTPRequest_ForJSP --%>

<script type="text/text" id="search_data_lookup_parameters_at_page_load_json">${ searchDataLookupParametersJSON }</script>

<script type="text/text" id="search_data_lookup_parameters_at_page_load_code">${ searchDataLookupParametersCode }</script>

	<%-- Experiment - from Java class Experiment_Set_HTTPRequest_ForJSP --%>
	
		<%-- INFO: In <body> in <div> to get proper decoding of HTML encoded value.  --%>
	
<%-- From Java class Page_UserDefault_SetForJSP
	
	The controller for every data page must call Page_UserDefault_SetForJSP.page_UserDefault_SetForJSP(...) 
 --%>

<script type="text/text" id="page_user_default_url">${ defaultURL }</script>

<script type="text/text" id="page_navigation_links_template">

	<%--  Navigation Links --%>
	<%@ include file="/WEB-INF/jsp/jsp_includes/data_pages_navigation_links.jsp" %>
	
</script>
