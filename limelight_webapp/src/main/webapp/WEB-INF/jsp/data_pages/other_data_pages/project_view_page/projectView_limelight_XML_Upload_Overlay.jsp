<%--   
		projectView_limelight_XML_Upload_Overlay.jsp 

		Overlay for Uploading a Limelight XML file and assoc Scan Files
--%>

<%@page import="org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.constants.FileUploadMaxFileSizeConstants"%>
<%@page import="org.yeastrc.limelight.limelight_submit_import_client_connector.enum_classes.LimelightSubmit_FileImportFileType"%>
<%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>


<c:if test="${ configSystemValues.scanFileImportAllowedViaWebSubmit }" >

	<%-- Only populated when true so the string in the "value" doesn't matter, just cannot be empty string --%>
	<input type="hidden" id="limelight_xml_file_upload_overlay_upload_scan_files" value="true">

</c:if>
  
<input type="hidden" id="limelight_max_file_upload_chunk_size" value="<%=FileUploadMaxFileSizeConstants.MAX_FILE_UPLOAD_CHUNK_SIZE %>">

<input type="hidden" id="limelight_xml_file_max_file_upload_size" value="<%=FileUploadMaxFileSizeConstants.get_MAX_LIMELIGHT_XML_FILE_UPLOAD_SIZE_AS_STRING()%>">
<input type="hidden" id="limelight_xml_file_max_file_upload_size_formatted" value="<%=FileUploadMaxFileSizeConstants.get_MAX_LIMELIGHT_XML_FILE_UPLOAD_SIZE_FORMATTED()%>">

<c:if test="${ configSystemValues.scanFileImportAllowedViaWebSubmit }" >
  <input type="hidden" id="limelight_import_scan_file_max_file_upload_size" value="<%=FileUploadMaxFileSizeConstants.get_MAX_SCAN_FILE_UPLOAD_SIZE_AS_STRING()%>">
  <input type="hidden" id="limelight_import_scan_file_max_file_upload_size_formatted" value="<%=FileUploadMaxFileSizeConstants.get_MAX_SCAN_FILE_UPLOAD_SIZE_FORMATTED()%>">
</c:if>


<!--  Modal dialog for uploading a Limelight XML file  -->

<div id="limelight_xml_file_upload_modal_dialog_overlay_background" 
	class="limelight-xml-file-upload-modal-dialog-overlay-background  limelight_xml_file_upload_overlay_show_hide_parts_jq   " style="display: none;"  >

</div>

<%--  The div showing all the Limelight XML file upload dialog --%>

<div id="limelight_xml_file_upload_overlay_container_div" 
	class=" limelight-xml-file-upload-overlay-div overlay-outer-div  limelight_xml_file_upload_overlay_show_hide_parts_jq " style="display: none; "  >


	<div id="limelight_xml_file_upload_overlay_header" class="limelight-xml-file-upload-overlay-header" style="width:100%; " >
		<h1 id="limelight_xml_file_upload_overlay_X_for_exit_overlay" 
			class="limelight-xml-file-upload-overlay-X-for-exit-overlay limelight_xml_file_upload_overlay_close_parts_jq " >X</h1>
		<h1 id="limelight_xml_file_upload_overlay_header_text" class="limelight-xml-file-upload-overlay-header-text" >Import Limelight XML File</h1>
	</div>
	<div id="limelight_xml_file_upload_overlay_body" class="limelight-xml-file-upload-overlay-body" style="text-align:left; position: relative;" >

		<h3>
			Upload a Limelight XML file 
			<c:if test="${ configSystemValues.scanFileImportAllowedViaWebSubmit }" >
			 and optional associated scan files 
			</c:if> 
			for import
		</h3>
		
		
				<%--  Search Name input --%>

		<table class="limelight-xml-file-upload-overlay-main-table" style="margin-bottom: 10px;">
		 <tr>
		  <td class="column-1">
		  	<%--  Delete icon column --%>
		  </td>
		  <td class="column-2">
			  <div style="padding-top: 2px;"> <%-- padding-top to align with input text area --%>
			   <div >
				Description:
			   </div>
			   <div style="color: #A55353; font-size: 80%;">
			     Brief description of the search
			   </div> 
			  </div>
		  </td>
		  <td class="column-3">
			<textarea  id="import_limelight_xml_file_search_name" 
				rows="1"  style="width: 300px;" maxlength="2000"></textarea>
				<%--  maxlength="2000"  Keep in sync with database field size --%>
		  </td>
		 </tr>
		</table>


			<%--  Limelight XML Choose File input --%>
		<table id="import_limelight_xml_choose_limelight_xml_file_block" class="limelight-xml-file-upload-overlay-main-table"
				>
		 <tr>
		  <td class="column-1">
		  </td>
		  <td class="column-2">
		    <div >
	    	  <a href="javascript:"  id="import_limelight_xml_choose_limelight_xml_file_button"
		    		 >+Add Limelight XML File</a>
		    </div>
			<div style="font-size: 80%;">
				(Max filesize: <%=FileUploadMaxFileSizeConstants.get_MAX_LIMELIGHT_XML_FILE_UPLOAD_SIZE_FORMATTED()%>)
			</div>
		    		 <%-- Hidden input file element --%>
			<input type="file" accept=".xml"
				id="import_limelight_xml_limelight_xml_file_field" style="display: none;"
				data-file_type="<%=LimelightSubmit_FileImportFileType.LIMELIGHT_XML_FILE.value()%>"/>
		  </td>
		  <td class="column-3">
		  </td>
		 </tr>
		</table>
	  	
			<%--  Limelight XML Chosen File input --%>

				<%--  Most of this file upload block is duplicated in perUploadFileTemplate.jsp for scan files --%>
			
		<table id="import_limelight_xml_chosen_limelight_xml_file_block" 
			class=" import_limelight_xml_file_scan_file_entry_block_jq  limelight-xml-file-upload-overlay-main-table"  
				style="display: none;"
				data-file_index=""
				data-file_type="<%=LimelightSubmit_FileImportFileType.LIMELIGHT_XML_FILE.value()%>">
		 <tr>
		  <td class="column-1">
		  	<%--  Remove Icon --%>
			<input type="image" src="static/images/icon-circle-delete.png" 
				data-tooltip="Remove File" 
				id="import_limelight_xml_remove_limelight_xml_file_button"
				class="selector_tool_tip_attached "/>
		  </td>
		  <td class="column-2 column-filename">	
			  <div class="limelight-xml-file-upload-filename-containing-div">
				<span id="import_limelight_xml_chosen_limelight_xml_file_name" ></span>
			  </div>
		  </td>
		  <td class="column-3">
		 		 <%--  Progress Bar --%>
			<div class="progress_bar_container_jq" style="">
			  <div class=" import-limelight-xml-file-progress-bar-container " 
			  	style="position: relative;">        
			     <div class=" import-limelight-xml-file-progress-outer ">
			        <div class=" import-limelight-xml-file-progress progress_bar_jq "></div>
			     </div>
						<%-- overlay div to provide progress percentage text --%>
				 <div 	style="position:absolute;left:0;right:0;top:0;bottom:0; text-align: center;" 
						class=" progress_bar_text_jq selector_tool_tip_attached " 
						data-tooltip="Upload Progress"
						></div>
			     
			  </div>
			</div>	
			  	<%--  Upload Complete --%>
			<span class=" upload_complete_msg_jq  import-limelight-xml-file-upload-complete " style="display: none;">
					Complete			  
			</span>
			  
		  </td>
		 </tr>
		</table>
		
		<c:if test="${ configSystemValues.scanFileImportAllowedViaWebSubmit }" >
	
			<%--  Table uploaded scan files will be displayed in --%>
				
			<table id="import_limelight_xml_scan_files_block" style="padding-top: 10px;" 
				class="limelight-xml-file-upload-overlay-main-table"  >
				
			</table>
			  
	
				<%--  Scan File Choose File --%>
			<table id="import_limelight_xml_choose_scan_file_block" class="limelight-xml-file-upload-overlay-main-table"
				style="display: none;">
			 <tr  >
			  <td class="column-1">
			  </td>
			  <td class="column-2">
			    <div >
		    	  <a href="javascript:"  id="import_limelight_xml_choose_scan_file_button"
			    		 >+Add Scan File</a>
				</div>
				<div style="font-size: 80%;">
						(Max filesize: <%=FileUploadMaxFileSizeConstants.get_MAX_SCAN_FILE_UPLOAD_SIZE_FORMATTED()%>)
			    		 
			    		   <%-- accept=".mzML,.mzXML" is default. JS code will update with values from server from Spectral Storage Service  --%>
					<input type="file" accept=".mzML,.mzXML"
						id="import_limelight_xml_scan_file_field" style="display: none;"
						data-file_type="<%=LimelightSubmit_FileImportFileType.SCAN_FILE.value()%>"/>
				</div>
			  </td>
			  <td class="column-3">
			  </td>
			 </tr>
			</table>
			 
		</c:if>
				  

			<%--  Submit and Cancel buttons --%>
		<table id="" class="limelight-xml-file-upload-overlay-main-table"
			style="margin-top: 12px;">
		 <tr  >
		  <td class="column-1">
		  </td>
		  <td >	<%-- class="column-2" --%>  
		  
		    <%--  tooltip for overlay when submit button disabled --%>
		    
		    <c:set var="submitDisabledTooltip">Submit. Enabled when Limelight XML file is uploaded</c:set>
		    
		    <c:if test="${ configSystemValues.scanFileImportAllowedViaWebSubmit }" >
		       <c:set var="submitDisabledTooltip">Submit. Enabled when Limelight XML file is uploaded and scan files are uploaded if any are selected</c:set>
		    </c:if>
		    
			<div id="import_limelight_xml_file_submit_button_container_block"
				style="display:inline-block;position:relative;"> <%-- outer div to support overlay div when button disabled --%>
			  
					<input type="button" value="Submit Upload" disabled="disabled"  id="import_limelight_xml_file_submit_button">
					
							<%-- overlay div to provide tooltip for button --%>
					<div id="import_limelight_xml_file_submit_button_disabled_overlay"
							style="position:absolute;left:0;right:0;top:0;bottom:0;" 
							class="selector_tool_tip_attached "
							data-tooltip="<c:out value="${ submitDisabledTooltip }"></c:out>" ></div>
			</div>
				
			<input type="button" value="Cancel" id="import_limelight_xml_file_close_button">
		  </td>
		 </tr>
		</table> 

						<%-- overlay div to provide Submit in progress --%>
			<%--  grey out under spinner --%>
		<div id="limelight_xml_file_upload_submit_in_progress" 
			style="position:absolute;left:0;right:0;top:0;bottom:0;background-color:grey;opacity:0.5;" 
					class="selector_tool_tip_attached "
					data-tooltip="Submit in progress" >
					
				<%-- id of next div as used by code in spinner.js --%>
			<div style="opacity:1.0;position:absolute;left:20%;top:100px; z-index: 20001" id="main_spinner_block" style="" ></div>
		</div>
		
	</div>  <%--  END  <div id="limelight_xml_file_upload_overlay_body" --%>
</div>

	
	<!-- END:   Modal dialog for uploading a Limelight XML file -->
	

<!--  Modal dialog for display upload error -->

	<!--  Div behind modal dialog div -->
	
	<div class="modal-dialog-overlay-background   import_limelight_xml_file_upload_error_overlay_show_hide_parts_jq import_limelight_xml_file_upload_error_overlay_cancel_parts_jq  overlay_show_hide_parts_jq" 
		id="import_limelight_xml_file_upload_error_overlay_background" ></div>
	
			<!--  Inline div for positioning modal dialog on page -->
	<div class="import-limelight-xml-file-upload-error-overlay-containing-outermost-div " id="import_limelight_xml_file_upload_error_overlay_containing_outermost_div_inline_div"  >
	
	  <div class="import-limelight-xml-file-upload-error-overlay-containing-outer-div " >
	
	
			<!--  Div overlay for confirming canceling file import -->
		<div class="modal-dialog-overlay-container import-limelight-xml-file-upload-error-overlay-container   import_limelight_xml_file_upload_error_overlay_show_hide_parts_jq  overlay_show_hide_parts_jq" 
			 id="import_limelight_xml_file_upload_error_overlay_container" >
	
			<div class="top-level-label" style="margin-left: 0px; color: #A55353; text-align: center;">
				File Upload Error
			</div>
	
			<div class="top-level-label-bottom-border" ></div>
			
			<div >
			
				<div style="margin-bottom: 10px;">An error has occurred with the file 
					<span id="import_limelight_xml_file_error_message_filename" style="font-weight: bold;"></span> 
					while uploading it or processing it on the server.</div>
				
				<div id="import_limelight_xml_file_file_error_message"></div>
				
				<div style="margin-top: 10px">
					<input type="button" value="Close" class="import_limelight_xml_file_upload_error_overlay_cancel_parts_jq" >
				</div>
					
			</div>
			
		</div>
	
	  </div>
	</div>
	


<!--  Modal dialog for display choose file error -->

	<!--  Div behind modal dialog div -->
	
	<div class="modal-dialog-overlay-background   import_limelight_xml_choose_file_error_overlay_show_hide_parts_jq import_limelight_xml_choose_file_error_overlay_cancel_parts_jq  overlay_show_hide_parts_jq" 
		id="import_limelight_xml_choose_file_error_overlay_background" ></div>
	
			<!--  Inline div for positioning modal dialog on page -->
	<div class="import-limelight-xml-choose-file-error-overlay-containing-outermost-div " id="import_limelight_xml_choose_file_error_overlay_containing_outermost_div_inline_div"  >
	
	  <div class="import-limelight-xml-choose-file-error-overlay-containing-outer-div " >
	
	
			<!--  Div overlay for confirming canceling file import -->
		<div class="modal-dialog-overlay-container import-limelight-xml-choose-file-error-overlay-container   import_limelight_xml_choose_file_error_overlay_show_hide_parts_jq  overlay_show_hide_parts_jq" 
			 id="import_limelight_xml_choose_file_error_overlay_container" >
	
			<div class="top-level-label" style="margin-left: 0px; color: #A55353; text-align: center;">
				File Error
			</div>
	
			<div class="top-level-label-bottom-border" ></div>
			
			<div >
			
				<div id="import_limelight_xml_file_choose_file_error_message"></div>
				
				<div style="margin-top: 10px">
					<input type="button" value="Close" class="import_limelight_xml_choose_file_error_overlay_cancel_parts_jq" >
				</div>
					
			</div>
			
		</div>
	
	  </div>
	</div>
	
	<%--  File chosen error messages --%>
	
	<div id="import_limelight_xml_file_choose_file_error_message_filename_already_chosen" style="display: none;">
	 <div >
		The selected filename <span class=" chosen_file_jq " style="font-weight: bold"></span>
		has already been selected for this upload <span  class=" chosen_file_without_suffix_error_submessage_jq " >(when comparing filenames without the suffix)</span>.
	 </div>
	</div>

	
	<div id="import_limelight_xml_file_choose_file_error_message_file_too_large" style="display: none;">
	 <div >
		The selected filename <span class=" chosen_file_jq " style="font-weight: bold"></span>
		is too large.  It exceeeds <span class=" file_limit_jq " style="font-weight: bold"></span> bytes.
	 </div>
	</div>

	
	<!-- END:   Modal dialog for confirming cancel the upload send -->
	

<!--  Modal dialog for confirm abandon upload -->

	<!--  Div behind modal dialog div -->
	
	<div class="modal-dialog-overlay-background   import_limelight_xml_file_confirm_abandon_upload_overlay_show_hide_parts_jq import_limelight_xml_file_confirm_abandon_upload_overlay_cancel_parts_jq  overlay_show_hide_parts_jq" 
		id="import_limelight_xml_file_confirm_abandon_upload_overlay_background" ></div>
	
			<!--  Inline div for positioning modal dialog on page -->
	<div class="import-limelight-xml-file-confirm-abandon-upload-overlay-containing-outermost-div " id="import_limelight_xml_file_confirm_abandon_upload_overlay_containing_outermost_div_inline_div"  >
	
	  <div class="import-limelight-xml-file-confirm-abandon-upload-overlay-containing-outer-div " >
	
	
			<!--  Div overlay for confirming canceling file import -->
		<div class="modal-dialog-overlay-container import-limelight-xml-file-confirm-abandon-upload-overlay-container   import_limelight_xml_file_confirm_abandon_upload_overlay_show_hide_parts_jq  overlay_show_hide_parts_jq" 
			 id="import_limelight_xml_file_confirm_abandon_upload_overlay_container" >
	
			<div class="top-level-label" style="margin-left: 0px;">Abandon Upload?</div>
	
			<div class="top-level-label-bottom-border" ></div>
			
			<div >
			
				<div >Are you sure you want to abandon your upload?</div>
				
				<div style="margin-top: 10px">
					<input type="button" value="Yes" id="import_limelight_xml_file_confirm_abandon_upload_confirm_button" >
					<input type="button" value="Cancel" class="import_limelight_xml_file_confirm_abandon_upload_overlay_cancel_parts_jq" >
				</div>
					
			</div>
			
		</div>
	
	  </div>
	</div>
	
	
	<!-- END:   Modal dialog for confirming cancel the upload send -->
	
		
	
	