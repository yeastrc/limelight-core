<%-- 
	body_after_body_tag_start_include_data_pages.jsp
	
	Included on every data page immediately after the <body> tag
	
--%>

<%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>

	<%-- Experiment - from Java class Experiment_Set_HTTPRequest_ForJSP --%>
	
		<%-- In <body> in <div> to get proper decoding of HTML encoded value.  --%>
<div style="display: none; " id="experiment_name_from_server"><c:out value="${ experimentName }"></c:out></div>

<div style="display: none; " id="experiment_id_string"><c:out value="${ experimentIdString }"></c:out></div>

		<%-- INFO: In <body> in <div> to get proper decoding of HTML encoded value.  --%>
		<%-- 
		<div style="display: none; " id="experiment_name"><c:out value="${ experimentName }"></c:out></div>
		--%>

<div style="display: none; " id="experiment_main_data_at_page_load_json"><c:out value="${ experimentJSONMainDataJSON }"></c:out></div>
<div style="display: none; " id="experiment_project_search_ids_at_page_load_json"><c:out value="${ experimentProjectSearchIdsJSON }"></c:out></div>
	

<div class=" outermost-div " id="data_page_outermost_div" > <%--  Closed in body_before_closing_body_tag_include_data_pages.jsp --%>
