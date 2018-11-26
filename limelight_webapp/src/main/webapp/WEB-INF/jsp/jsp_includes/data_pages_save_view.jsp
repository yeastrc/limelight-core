<%--
	data_pages_save_view.jsp
	
	Included on Data Pages (Peptide, Protein, Mod) for saving the current view

--%>
<%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>

<div id="save_view_root_container"
 <c:if test="${ webSessionAuthAccessLevel.projectOwnerAllowed }">
  data-project_owner="true"
 </c:if>
></div>
