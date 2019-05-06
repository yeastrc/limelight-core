<%--
	projectView_UploadData.jsp

	User Submits data to be imported
--%>

 <%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>

<c:if test="${ configSystemValues.limelightXMLFileImportFullyConfigured }" >

 <c:if test="${webSessionAuthAccessLevel.projectOwnerAllowed}" >
					
  <div id="upload_data_top_level_container" class="top-level-container" >

	<div  class="collapsable-link-container top-level-collapsable-link-container " style="">
		<img  src="static/images/pointer-down.png"
			 id="upload_data_collapse_hide_data" 
			 class=" icon-large fake-link-image top-level-collapsable-link " 
			 style="display: none;">
			 
		<img  src="static/images/pointer-right.png"
			 id="upload_data_expand_show_data" 
			 class=" icon-large fake-link-image top-level-collapsable-link ">
	</div>
					
	<div class="top-level-label">
		Upload Data
		<span id="upload_data_pending_block" style="display: none;">
		 (Pending <span id="upload_data_pending_number"></span>)</span>
	</div>

	<div class="top-level-label-bottom-border" ></div>
						
	<div  id="upload_data_block" class="upload-search-block " style=" display: none; " > <%--  --%>
			
	  <c:if test="${webSessionAuthAccessLevel.projectOwnerAllowed}" >

		<div style="margin-bottom: 10px;">
			<input type="button" value="Import Limelight XML File" 
				class=" open_limelight_file_upload_overlay_jq tool_tip_attached_jq "
				data-tooltip="Upload a Limelight XML file to this project" >
				
			<input type="button" value="Refresh" 
				id="upload_data_refresh_data"
				class="  tool_tip_attached_jq "
				data-tooltip="Refresh this list" >
				
			<span style="padding-left: 20px;">
				<input type="button" value="Command Line Import Info"
					 id="upload_data_submit_import_program_info"  >
			</span>
		</div>


		<div style="margin-top:10px;margin-bottom:15px;">
			Data must be converted to limelight XML before upload.
<%-- 
			!!!  Nothing at this URL yet
			Please <a href="https://limelight-web-app.readthedocs.io/en/latest/using/upload_data.html" target="_docs">visit our upload help page</a>
			to find a converter for your data and to learn more.
--%>
		</div>					
		

		  <%-- Pending and History --%>
		  
		  <div   id="upload_data_pending_and_history_items_block"> <%-- Keep div with this id, used in JS --%>
		  
		   <div   id="upload_data_pending_items_block"> <%-- Keep div with this id, used in JS --%>

			<div >
			  <span  style="font-size: 18px;">
				<img src="static/images/pointer-right.png"
						id="upload_data_pending_items_show_link"
						class=" fake-link-image icon-small tool_tip_attached_jq " 
						data-tooltip="Show pending" 
						style="display: none;" 
					>

				<img src="static/images/pointer-down.png"
						id="upload_data_pending_items_hide_link"
						class=" fake-link-image icon-small tool_tip_attached_jq " 
						data-tooltip="Hide pending" 
						style="" 
					>
												
					Pending
			  </span>

					
			</div>
			
			<div class="top-level-label-bottom-border"></div>
			
			<div  id="upload_data_pending_items_container" style="padding-bottom: 10px; padding-left: 17px;">
			
			  <div id="upload_data_pending_items_no_pending_text" >
			  	No uploads pending
			  </div>
			  
			  
			  <div  id="upload_data_pending_items_outer_container">
			   
			   <div style="margin-bottom: 5px;"  >
			  	 <span id="upload_data_pending_items_show_all_details_link" class=" fake-link tool_tip_attached_jq "  
			  		data-tooltip="Show details for all items" 
			  		data-container_id="upload_data_pending_items_container" 
			  		>[Expand All]</span>
			   </div>
			   
			   <table id="upload_data_pending_items_table" style="width: 100%;">
			   
			   	<tr><td>LOADING</td></tr>
			   	
			   </table>
			 </div>
			</div>

		   </div>  <%-- END <div   id="upload_data_pending_items_block">  --%>

		   <div   id="upload_data_history_items_block"> <%-- Keep div with this id, used in JS --%>

			<div >
			  <span  style="font-size: 18px;">
				<a  id="upload_data_history_items_show_link"
					class="tool_tip_attached_jq " 
					data-tooltip="Show history" 
					><img src="static/images/pointer-right.png"
						style="cursor: pointer;" class=" icon-small "
					></a>

				<a id="upload_data_history_items_hide_link"
					class="tool_tip_attached_jq " 
					data-tooltip="Hide history" 
					style="display: none;" 
					><img src="static/images/pointer-down.png"
						style="cursor: pointer;" class=" icon-small "
					></a>
						
						History						
			  </span>
					
			</div>				
			
			<div class="top-level-label-bottom-border"></div>	  
			   
			<div  id="upload_data_history_items_container" >

				<%--  Spacer for icon --%>
			  <div  id="upload_data_history_items_table_outer_container" style="padding-left: 17px;">
			   
			   <div style="margin-bottom: 5px;" id="upload_data_history_items_show_all_details_container" >
			  	 <span id="upload_data_history_items_show_all_details_link" class=" fake-link tool_tip_attached_jq "  
			  		data-tooltip="Show details for all items" 
			  		data-container_id="upload_data_history_items_container" 
			  		>[Expand All]</span>
			   </div>

			   <table id="upload_data_history_items_table" style="width: 100%;" >
			   
			   	<tr><td>LOADING</td></tr>
			   	
			   </table>

			   </div>					   
			</div>					  
			  			
		   </div>  <%-- END <div   id="upload_data_history_items_block">  --%>

		  </div>  <%-- END Pending and History --%>
	
	  </c:if>
	  

	</div>
	
	<%--  Import the Overlay for Submitting an Upload --%>
	
    <%@ include file="/WEB-INF/jsp/data_pages/other_data_pages/project_view_page/projectView_limelight_XML_Upload_Overlay.jsp" %>
	

	 
	 	<%--  OVERLAY for Confirm Remove Upload Item --%>
	
	  <%--  Only project owner allowed to cancel queued or remove failed --%>
	  <c:if test="${webSessionAuthAccessLevel.projectOwnerAllowed}" >			
		
		<!-- Modal dialog Confirm remove upload item overlay -->
		
		<!--  Div behind modal dialog div -->
		
		<div class="modal-dialog-overlay-background   import_file_confirm_remove_upload_overlay_show_hide_parts_jq import_file_confirm_remove_upload_overlay_cancel_parts_jq  overlay_show_hide_parts_jq" 
			id="import_file_confirm_remove_upload_overlay_background" ></div>
		
				<!--  Inline div for positioning modal dialog on page -->
		<div class="import-limelight-xml-file-confirm-remove-upload-overlay-containing-outermost-div " id="import_file_confirm_remove_upload_overlay_containing_outermost_div_inline_div"  >
		
		  <div class="import-limelight-xml-file-confirm-remove-upload-overlay-containing-outer-div " >
		
		
				<!--  Div overlay for confirming canceling file import -->
			<div class="modal-dialog-overlay-container import-limelight-xml-file-confirm-remove-upload-overlay-container   import_file_confirm_remove_upload_overlay_show_hide_parts_jq  overlay_show_hide_parts_jq" 
				 id="import_file_confirm_remove_upload_overlay_container" >
		
				<div class="top-level-label" style="margin-left: 0px;">
					<span  class=" cancel_queued_item_jq cancel_re_queued_item_jq  any_item_jq ">
						Cancel Upload Request?
					</span>
					<span  class=" remove_failed_item_jq remove_completed_item_jq  any_item_jq ">
						Remove From History?
					</span>
				</div>
		
				<div class="top-level-label-bottom-border" ></div>
				
				<div >
				
					<div>
						<span  class=" cancel_queued_item_jq cancel_re_queued_item_jq any_item_jq ">
							Remove <span class=" filename_jq " ></span> 
							from upload queue?
						</span>
						<span  class=" remove_failed_item_jq remove_completed_item_jq any_item_jq ">
							Remove <span class=" filename_jq " ></span> 
							from upload history?
						</span>  
					</div>
					
					<div style="margin-top: 10px">
						<input type="button" value="Yes"  class=" cancel_queued_item_yes_button_jq any_item_jq " >
						<input type="button" value="Yes"  class=" cancel_re_queued_item_yes_button_jq any_item_jq " >
						<input type="button" value="Yes"  class=" remove_failed_item_yes_button_jq any_item_jq " >
						<input type="button" value="Yes"  class=" remove_completed_item_yes_button_jq any_item_jq " >
						<input type="button" value="Cancel" 
							class="import_file_confirm_remove_upload_overlay_cancel_parts_jq" >
					</div>
						
				</div>
				
			</div>
		
		  </div>
		</div>
		
		<!-- END:  Modal dialog Confirm remove upload item overlay -->
	  
	    <%-- END: Only project owner allowed to cancel queued or remove failed --%>
	  </c:if>  <%--  <c:if test="${webSessionAuthAccessLevel.projectOwnerAllowed}" >			 --%>
	 
	 	
  </div>
  
 </c:if> <%-- <c:if test="${webSessionAuthAccessLevel.projectOwnerAllowed}" > --%>
 
</c:if> <%-- <c:if test="${ configSystemValues.limelightXMLFileImportFullyConfigured }" > --%>

