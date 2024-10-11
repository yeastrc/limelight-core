<%--  
	head_section_include_data_pages.jsp
	
	includes 'head_section_include_main_pages.jsp' which includes 'head_section_include_every_page.jsp'
	
	Included on pages that are Project Search Id based.
		Pages in 'jsp/data_pages/project_search_ids_driven_pages'
	
--%>
<%@page import="org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers.AA_PageControllerPaths_Constants"%>

<%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>

<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_include_main_pages.jsp" %>

	<%--  Only test for presence of this tag for is project owner allowed  --%>
<c:if test="${ webSessionAuthAccessLevel.projectOwnerAllowed }">
  <script type="text/text" id="page_auth_access_level_project_owner_allowed">x</script>
 </c:if>

<%-- From Java class DataPage_ProjectSearchIdBased_ControllersAccessControl_SpringHandlerInterceptor and Experiment_Set_HTTPRequest_ForJSP --%>

<script type="text/text" id="search_data_lookup_parameters_at_page_load_json"><html><body><c:out value="${ searchDataLookupParametersJSON }"/></body><html></script>

<script type="text/text" id="search_data_lookup_parameters_at_page_load_code"><html><body><c:out value="${ searchDataLookupParametersCode }"/></body><html></script>

	<%-- Searches - From Java class DataPage_ProjectSearchIdBased_ControllersAccessControl_SpringHandlerInterceptor --%>
	
<c:if test="${ singleSearchHasSubGroups }">
  <script type="text/text" id="single_search_has_sub_groups">x</script>
</c:if>

<c:if test="${ Blib_Spectral_Library_Webservice_IS_Fully_Configured }">
  <script type="text/text" id="blib_spectral_library_webservice_is_fully_configured">x</script>
</c:if>


	

	<%-- Experiment - from Java class Experiment_Set_HTTPRequest_ForJSP --%>
	
<script type="text/text" id="experiment_name_from_server"><html><body><c:out value="${ experimentName }"></c:out></body><html></script>

<script type="text/text" id="experiment_id_string"><html><body><c:out value="${ experimentIdString }"></c:out></body><html></script>

<script type="text/text" id="experiment_main_data_at_page_load_json"><html><body><c:out value="${ experimentJSONMainDataJSON }"></c:out></body><html></script>
<script type="text/text" id="experiment_project_search_ids_at_page_load_json"><html><body><c:out value="${ experimentProjectSearchIdsJSON }"></c:out></body><html></script>
	
<%-- From Java class Page_UserDefault_SetForJSP
	
	The controller for every data page must call Page_UserDefault_SetForJSP.page_UserDefault_SetForJSP(...) 
 --%>

<script type="text/text" id="page_user_default_url"><html><body><c:out value="${ defaultURL }"/></body><html></script>

<%--   created/computed when URL has Project Search Id Code values from Project Page JS code --%>
<script type="text/text" id="search_data_lookup_parameters_lookup_code__computed"><html><body><c:out value="${ searchDataLookupParametersLookupCode_Computed }"/></body><html></script>


<%--    --%>
<script type="text/text" id="project_scan_file_id_from_url"><html><body><c:out value="${ projectScanFileId }"/></body><html></script>


<script type="text/text" id="page_navigation_links_data_json"
>
{
  "single_search" : <%-- Also used for multiple search  --%>
	{
	"nav_entries" : [
		{
		"label" : "Scans View",
		"nav_link_base_url" : "<%= AA_PageControllerPaths_Constants.SCAN_FILE_TO_SEARCHES_VIEW_PAGE_CONTROLLER %>"
		},
		{
		"label" : "Stats/QC",
		"nav_link_base_url" : "<%= AA_PageControllerPaths_Constants.QC_VIEW_PAGE_CONTROLLER %>"
		},
		{
		"label" : "Peptides View",
		"nav_link_base_url" : "<%= AA_PageControllerPaths_Constants.PEPTIDE_VIEW_PAGE_CONTROLLER %>"
		},
		{
		"label" : "Proteins View",
		"nav_link_base_url" : "<%= AA_PageControllerPaths_Constants.PROTEIN_VIEW_PAGE_CONTROLLER %>"
		},
		{
		"label" : "Modifications View",
		"nav_link_base_url" : "<%= AA_PageControllerPaths_Constants.MOD_VIEW_PAGE_CONTROLLER %>"
		}
	]
	},
  "experiment":
	{
	"nav_entries" : [
		{
		"label" : "Peptides View",
		"nav_link_base_url" : "<%= AA_PageControllerPaths_Constants.EXPERIMENT___PEPTIDE_VIEW_PAGE_CONTROLLER %>"
		},
		{
		"label" : "Proteins View",
		"nav_link_base_url" : "<%= AA_PageControllerPaths_Constants.EXPERIMENT___PROTEIN_VIEW_PAGE_CONTROLLER %>"
		}
	]
	}
}
</script>


<script id="controller_path_qc" type="text/text"><%= AA_PageControllerPaths_Constants.QC_VIEW_PAGE_CONTROLLER %></script>
<script id="controller_path_peptide" type="text/text"><%= AA_PageControllerPaths_Constants.PEPTIDE_VIEW_PAGE_CONTROLLER %></script>
<script id="controller_path_protein" type="text/text"><%= AA_PageControllerPaths_Constants.PROTEIN_VIEW_PAGE_CONTROLLER %></script>
<script id="controller_path_mod" type="text/text"><%= AA_PageControllerPaths_Constants.MOD_VIEW_PAGE_CONTROLLER %></script>


	
