<%--
	webappAdminConfiguration.jsp
	
	Webapp Administration Configuration Page

// String path = request.getContextPath();
// String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
--%>

<%@page import="org.yeastrc.limelight.limelight_webapp.constants.ConfigSystemsKeysConstants"%>
<%@page import="org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsValuesSharedConstants"%>
<%@page import="org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants"%>
<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/pageEncodingDirective.jsp" %> <%-- Put on Every Page --%>


<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/top_of_every_page_doctype__jsp_cache_directives.jsp" %>

<html>
<head>
	<title><%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_title_start.jsp" 
				%> Administration Webapp Configuration</title>
	
 <%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_include_data_pages.jsp" %> 

</head>
<body class=" <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_standard_header_pages.jsp" 
		  		%><%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_data_pages.jsp" 
				%> peptide-page ">

 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_body_tag_start_include_data_pages.jsp" %> 

  <%@ include file="/WEB-INF/jsp/jsp_header_footer/header_main_pages.jsp" %>

   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_header_include_data_pages.jsp" %>
   
   	<h1>Manage Configuration</h1>
   	
   	<div >
	   	<a href="admin">Webapp Administration Main Page</a>
   	</div>
   		
	<div style="margin-bottom: 10px;">
	  <div style="margin-bottom: 3px;">
		HTML to put at center of bottom of web page: 
		<input type="text" class=" config_text_inputs_jq " id="input_footer_center_of_page_html" style="width: 650px;"
			data-config-key="<%= ConfigSystemsKeysConstants.FOOTER_CENTER_OF_PAGE_HTML_KEY %>"
			data-FOOTER_CENTER_OF_PAGE_HTML="true"> 
	  </div> 
	</div>

	<div style="margin-bottom: 10px;" >
	  <div style="margin-bottom: 3px;">
		Admin Email Address: 
		<input type="text" class=" config_text_inputs_jq " id="input_email_from_address" style="width: 450px;"
			data-config-key="<%= ConfigSystemsKeysConstants.ADMIN_EMAIL_ADDRESS_KEY %>">
	  </div>
	</div>
			
	<div style="margin-bottom: 10px;" >
	  <div style="margin-bottom: 3px;">
		From Address for emails sent: 
		<input type="text" class=" config_text_inputs_jq " id="input_email_from_address" style="width: 450px;"
			data-config-key="<%= ConfigSystemsKeysConstants.EMAIL_FROM_ADDRESS_KEY %>">
	  </div>
	</div>
					

	<div style="margin-bottom: 10px;" >
	  <div style="margin-bottom: 3px;">
		SMTP Server URL for emails sent: 
		<input type="text" class=" config_text_inputs_jq " id="input_email_smtp_server_url" style="width: 450px;"
			data-config-key="<%= ConfigSystemsKeysConstants.EMAIL_SMTP_SERVER_HOST_KEY %>"> 
	  </div> 
	</div>
	
	<div style="margin-bottom: 10px;" >
	  <div style="margin-bottom: 3px;">
		Google Analytics Tracking Code: 
		<input type="text" class=" config_text_inputs_jq " id="input_google_analytics_tracking_code" style="width: 450px;"
			data-config-key="<%= ConfigSystemsKeysConstants.GOOGLE_ANALYTICS_TRACKING_CODE_KEY %>"> 
	  </div> 
	</div>
	
	<div style="margin-bottom: 10px;">
	  <div style="margin-bottom: 3px;">
	  	<div>
			Submit Search Upload on Website (Requires running the "Run Importer" process):
		</div>
		<div style="margin-left: 20px;">
		
			<div style="margin-bottom: 3px;">
				Run Importer Workspace: 
				<input type="text" class=" config_text_inputs_jq " style="width: 650px;"
					data-config-key="<%= ConfigSystemsKeysSharedConstants.file_import_limelight_xml_scans_TEMP_DIR_KEY %>"
					>
			</div>
			<div>
				Allow Scan file Upload: 
				<input type="checkbox" class=" config_checkbox_inputs_jq "  id="allow_scan_file_upload_checkbox"
					data-config-key="<%= ConfigSystemsKeysSharedConstants.SCAN_FILE_IMPORT_ALLOWED_VIA_WEB_SUBMIT_KEY %>"
					data-value-checked="<%= ConfigSystemsValuesSharedConstants.TRUE %>" 
					data-value-not-checked="<%= ConfigSystemsValuesSharedConstants.FALSE %>" > 
			
			</div>
			
			<%--  Error Message for 'Allow Scan file Upload' checked 
			      but 'Spectral Storage Service Base URL' not populated,
				  or vice versa
			 --%>
			<div style="position: relative;"> <%--  container div for error-message-container which is position absolute --%>
			  <div style="position: absolute; top: -60px;">
		  		<div class="error-message-container error_message_container_jq" 
		  				id="error_message_spectral_storage_only_one_has_value"
		  				style="text-align: left; margin-left: 50px;width: 400px;" >
		  			<div class="error-message-inner-container" >
		  				<div class="error-message-close-x error_message_close_x_jq">X</div>
			  			<div class="error-message-text" 
			  			  >If one 'Spectral Storage Service Base URL' has a value BOTH must have a value.</div>
		  			</div>
			  	</div>
			  </div>
			  <div style="position: absolute; top: -60px;">
		  		<div class="error-message-container error_message_container_jq" 
		  				id="error_message_allow_scan_file_selected_spectral_storage_empty"
		  				style="text-align: left; margin-left: 50px;width: 400px;" >
		  			<div class="error-message-inner-container" >
		  				<div class="error-message-close-x error_message_close_x_jq">X</div>
			  			<div class="error-message-text" 
			  			  >'Allow Scan file Upload' is selected so BOTH 'Spectral Storage Service Base URL' must have a value.</div>
		  			</div>
			  	</div>
			  </div>
			  <div style="position: absolute; top: -60px;">
		  		<div class="error-message-container error_message_container_jq" 
		  				id="error_message_allow_scan_file_not_selected_spectral_storage_not_empty"
		  				style="text-align: left; margin-left: 50px;width: 400px;" >
		  			<div class="error-message-inner-container" >
		  				<div class="error-message-close-x error_message_close_x_jq">X</div>
			  			<div class="error-message-text" 
			  			  >BOTH 'Spectral Storage Service Base URL' has a value so 'Allow Scan file Upload' must be selected.</div>
		  			</div>
			  	</div>
			  </div>
		    </div>
		   
			<div>
				Delete uploaded files after Successful Import: 
				<input type="checkbox" class=" config_checkbox_inputs_jq "  
					data-config-key="<%= ConfigSystemsKeysSharedConstants.IMPORT_DELETE_UPLOADED_FILES %>"
					data-value-checked="<%= ConfigSystemsValuesSharedConstants.TRUE %>" 
					data-value-not-checked="<%= ConfigSystemsValuesSharedConstants.FALSE %>" > 
			
			</div>
		</div>
	  </div> 
	</div>	
	
	<div style="margin-bottom: 10px;" >
		<div style="margin-bottom: 3px;">
			Spectral Storage Service Accept Import Base URL (required if allow scan file uploads): 
			<input type="text" class=" config_text_inputs_jq " id="spectral_storage_service_accept_import_base_url_input_field" 
				style="width: 650px;"
				data-config-key="<%= ConfigSystemsKeysSharedConstants.SPECTRAL_STORAGE_SERVICE_ACCEPT_IMPORT_BASE_URL %>"
				>
		</div>
	</div>
	
	<div style="margin-bottom: 10px;" >
		<div style="margin-bottom: 3px;">
			Spectral Storage Service Get Data Base URL (required if allow scan file uploads): 
			<input type="text" class=" config_text_inputs_jq " id="spectral_storage_service_get_data_base_url_input_field" 
				style="width: 650px;"
				data-config-key="<%= ConfigSystemsKeysSharedConstants.SPECTRAL_STORAGE_SERVICE_GET_DATA_BASE_URL %>"
				>
		</div>
	</div>
	<div >
		<input type="button" value="Save" id="save_button">
		<input type="button" value="Reset" id="reset_button">
	</div>
	
 	<%-- Values successfully saved message --%>

	<div style="position: relative;"> <%--  container div for success-message-container which is position absolute --%>
	  <div style="position: absolute; top: 12px;">
		<div id="success_message_values_updated"
				class="success-message-container error_message_container_jq" 
				style="text-align: left; margin-left: 130px;width: 200px;">
			<div class="success-message-inner-container"  style="text-align: center;">
				<div class="success-message-close-x error_message_close_x_jq">X</div>
				<div class="success-message-text" >Values Saved</div>
			</div>
	 	</div>	  
	  </div>
	</div>
   	<div >
   	
   	
   	</div>
   
   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_footer_include_data_pages.jsp" %>
	
  <%@ include file="/WEB-INF/jsp/jsp_header_footer/footer_main.jsp" %>

 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_closing_body_tag_include_data_pages.jsp" %>
  
  <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp" %>
  
<%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_main_script_include__script_include_libs__page_header_js.jsp" %>
  			
  <script type="text/javascript" src="static/js_generated_bundles/webapp_admin/configurePage_Root-bundle.js?x=${ cacheBustValue }"></script>
  	
</body>
</html>