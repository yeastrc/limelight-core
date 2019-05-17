<%--  
	head_section_include_main_pages.jsp 
	
	
	Includes 'head_section_include_every_page.jsp'
	
--%>
 <%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>

 <%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_include_every_page.jsp" %>

 <script id="main_page_project_ids" type="text/text" ><c:out value="${ projectIds }"></c:out></script>
 
 <script id="main_page_project_entries" type="text/text" ><c:out value="${ projectEntries }"></c:out></script>
 
 <script id="main_page_lorikeet_page_controller_path" type="text/text"><%= AA_PageControllerPaths_Constants.LORIKEET_SPECTRUM_VIEWER_PAGE_CONTROLLER %></script>
	