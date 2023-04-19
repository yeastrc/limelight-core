<%--
	projectView_UploadData.jsp

	User Submits data to be imported
--%>

 <%@page import="org.yeastrc.limelight.limelight_submit_import_client_connector.enum_classes.LimelightSubmit_FileImportFileType"%>
<%@page import="org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.config_with_constants_default.FileUploadMaxFileSize_Config_WithConstantsDefaults"%>
<%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>

<c:if test="${ configSystemValues.limelightXMLFileImportFullyConfigured }" >

 <c:if test="${webSessionAuthAccessLevel.projectOwnerAllowed}" >
 
		<%--  Container for React Component --%>
	<div id="upload_data_section_outer_block_react_root_container" 
	></div>
	
	
	<c:if test="${ configSystemValues.scanFileImportAllowedViaWebSubmit }" >
	
		<%-- Only populated when true so the string in the "value" doesn't matter, just cannot be empty string --%>
		<input type="hidden" id="limelight_xml_file_upload_overlay_upload_scan_files" value="true">
	
	</c:if>
	
	<input type="hidden" id="limelight_xml_file_max_file_upload_size" value="<%=FileUploadMaxFileSize_Config_WithConstantsDefaults.get_MAX_LIMELIGHT_XML_FILE_UPLOAD_SIZE_AS_STRING()%>">
	<input type="hidden" id="limelight_xml_file_max_file_upload_size_formatted" value="<%=FileUploadMaxFileSize_Config_WithConstantsDefaults.get_MAX_LIMELIGHT_XML_FILE_UPLOAD_SIZE_FORMATTED()%>">
	
    <input type="hidden" id="limelight_import_file_type_limelight_xml_file" value="<%=LimelightSubmit_FileImportFileType.LIMELIGHT_XML_FILE.value()%>">
    
    
	<c:if test="${ configSystemValues.fileObjectStorageFileImportAllowedViaWebSubmit }" >
	
	  <input type="hidden" id="limelight_import_file_object_storage_files" value="true" />
	  
	  <input type="hidden" id="limelight_import_fasta_file_max_file_upload_size" value="<%=FileUploadMaxFileSize_Config_WithConstantsDefaults.get_MAX_FASTA_FILE_UPLOAD_SIZE_AS_STRING()%>">
	  <input type="hidden" id="limelight_import_fasta_file_max_file_upload_size_formatted" value="<%=FileUploadMaxFileSize_Config_WithConstantsDefaults.get_MAX_FASTA_FILE_UPLOAD_SIZE_FORMATTED()%>">
	
	  <input type="hidden" id="limelight_import_file_type_fasta_file" value="<%=LimelightSubmit_FileImportFileType.FASTA_FILE.value()%>">
	</c:if>
	
	<c:if test="${ configSystemValues.scanFileImportAllowedViaWebSubmit }" >
	  <input type="hidden" id="limelight_import_scan_file_max_file_upload_size" value="<%=FileUploadMaxFileSize_Config_WithConstantsDefaults.get_MAX_SCAN_FILE_UPLOAD_SIZE_AS_STRING()%>">
	  <input type="hidden" id="limelight_import_scan_file_max_file_upload_size_formatted" value="<%=FileUploadMaxFileSize_Config_WithConstantsDefaults.get_MAX_SCAN_FILE_UPLOAD_SIZE_FORMATTED()%>">
	  
	  <input type="hidden" id="limelight_import_file_type_scan_file" value="<%=LimelightSubmit_FileImportFileType.SCAN_FILE.value()%>">
	</c:if>
	
 </c:if> <%-- <c:if test="${webSessionAuthAccessLevel.projectOwnerAllowed}" > --%>
 
</c:if> <%-- <c:if test="${ configSystemValues.limelightXMLFileImportFullyConfigured }" > --%>

