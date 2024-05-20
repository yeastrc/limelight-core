<%--
	webappAdminConfiguration.jsp
	
	Webapp Administration Configuration Page

// String path = request.getContextPath();
// String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
--%>

<%@page import="org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.config_with_constants_default.FileUploadMaxFileSize_Config_WithConstantsDefaults"%>
<%@page import="org.yeastrc.limelight.limelight_shared.constants.EnvironmentVariable_Keys_Constants"%>
<%@page import="org.yeastrc.limelight.limelight_webapp.constants.UserSignupConstants"%>
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

		<%--  Include 'data-page' class since using overlay --%>
<body class=" <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_standard_header_pages.jsp" 
		  		%> <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_data_pages.jsp" 
				%>  admin-page admin-configuration-page ">

 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_body_tag_start_include_data_pages.jsp" %> 

  <%@ include file="/WEB-INF/jsp/jsp_header_footer/header_main_pages.jsp" %>

   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_header_include_data_pages.jsp" %>
   
   	<div style="margin-top: 20px; margin-bottom: 10px;">
	   	<a href="admin">Webapp Administration Main Page</a>
   	</div>
   	
   	<h1>Manage Configuration</h1>
   	
   		
	<div style="margin-bottom: 10px;">
	  <div style="margin-bottom: 3px;">
		Allow Account Registration WITHOUT Invite: 
		<input type="checkbox" class=" config_checkbox_inputs_jq " id="input_user_signup_allow_without_invite" 
			data-config-key="<%= ConfigSystemsKeysConstants.USER_SIGNUP_ALLOW_WITHOUT_INVITE_KEY %>"
			data-value-checked="<%= UserSignupConstants.USER_SIGNUP_ALLOW_WITHOUT_INVITE_KEY__TRUE %>" 
			data-value-not-checked="<%= UserSignupConstants.USER_SIGNUP_ALLOW_WITHOUT_INVITE_KEY__FALSE %>" > 
	  </div> 
	</div>
	
	
	<div style="margin-bottom: 10px;">
	  <div style="margin-bottom: 3px;">
	  	<div>
			Google Recaptcha (Not used if either not configured):
		</div>
		<div style="margin-left: 20px;">
		
			<div style="margin-bottom: 3px;">
				Site key: 
				<input type="text" class=" config_text_inputs_jq " style="width: 450px;"
					data-config-key="<%= ConfigSystemsKeysConstants.GOOGLE_RECAPTCHA_SITE_KEY_KEY %>"
					data-FOOTER_CENTER_OF_PAGE_HTML="true">
			</div>
			<div>
				Secret key: 
				<input type="text" class=" config_text_inputs_jq " style="width: 450px;"
					data-config-key="<%= ConfigSystemsKeysConstants.GOOGLE_RECAPTCHA_SECRET_KEY_KEY %>"
					data-FOOTER_CENTER_OF_PAGE_HTML="true">
			</div>
		</div>
	  </div> 
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
		<input type="text" class=" config_text_inputs_jq " id="admin_email_address" style="width: 450px;"
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
					
	<div style="margin-bottom: 10px;">
		<div style="margin-bottom: 3px;">
			<div style="margin-bottom: 3px;">
				SMTP Server Configuration for emails sent:
			</div>
			<div style="margin-left: 20px;">
				<div style="margin-bottom: 3px;">
					Host: <input type="text"
						class=" config_text_inputs_jq " id="input_email_smtp_server_url"
						style="width: 450px;"
						data-config-key="<%=ConfigSystemsKeysConstants.EMAIL_SMTP_SERVER_HOST_KEY%>">
				</div>
				<div style="margin-bottom: 3px;">
					Port (uses default if not set): <input type="text"
						class=" config_text_inputs_jq " id="input_email_smtp_server_url"
						style="width: 450px;"
						data-config-key="<%=ConfigSystemsKeysConstants.EMAIL_SMTP_SERVER_PORT_KEY%>">
				</div>
				<div style="margin-bottom: 3px; margin-top: 5px;">
					SMTP Server Authentication (not always required). (Not used if either not configured):
				</div>
				<div style="margin-left: 20px;">
					<div style="margin-bottom: 3px;">
						Authentication Username: <input
							type="text" class=" config_text_inputs_jq "
							id="input_email_smtp_server_url" style="width: 450px;"
							data-config-key="<%=ConfigSystemsKeysConstants.EMAIL_SMTP_SERVER_AUTH_USERNAME_KEY%>">
					</div>
					<div style="margin-bottom: 3px;">
						Authentication Password: <input
							type="text" class=" config_text_inputs_jq "
							id="input_email_smtp_server_url" style="width: 450px;"
							data-config-key="<%= ConfigSystemsKeysConstants.EMAIL_SMTP_SERVER_AUTH_PASSWORD_KEY %>">
					</div>
				</div>
			</div>
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
				Store uploaded files on AWS S3 instead of in the local file system (Region from AWS Account configuration on system if not set here)
			</div>

			<c:if test="${ not empty aws_s3_bucket__from_environment_variable_or_java_dash_d }">
				<div style="font-weight: bold; margin-left: 20px; margin-top: 4px; margin-bottom: 3px;">
					<div style="display: grid; grid-template-columns: min-content 1fr">
						
						<div style="color: red; margin-right: 3px;" >*</div>
						<div>
							AWS S3 Bucket Value set here is ignored since it is configured via Environment Variable or java -D parameter
							'<%= EnvironmentVariable_Keys_Constants.LIMELIGHT_FILE_UPLOADS_AWS_S3_BUCKET %>'
							with value 
							'<c:out value="${ aws_s3_bucket__from_environment_variable_or_java_dash_d }"></c:out>'
						</div>
					</div>
				</div>
			</c:if>

			<div style="margin-bottom: 3px;">
				<div>
					AWS S3 Bucket: 
					<input type="text" class=" config_text_inputs_jq " style="width: 650px;"
					data-config-key="<%= ConfigSystemsKeysSharedConstants.file_import_limelight_xml_scans_AWS_S3_BUCKET_KEY %>"
					>
				</div>
				<div style="font-size: 10px; margin-left: 20px; margin-top: 2px;">
					(Or use Environment Variable or java -D parameter
					'<%=EnvironmentVariable_Keys_Constants.LIMELIGHT_FILE_UPLOADS_AWS_S3_BUCKET %>')
				</div>
			</div>
			
			<c:if test="${ not empty aws_s3_region__from_environment_variable_or_java_dash_d }">
				<div style="font-weight: bold; margin-left: 20px; margin-top: 4px; margin-bottom: 3px;">
					<div style="display: grid; grid-template-columns: min-content 1fr">
						
						<div style="color: red; margin-right: 3px;" >*</div>
						<div>
							AWS S3 Region Value set here is ignored since it is configured via Environment Variable or java -D parameter
							'<%= EnvironmentVariable_Keys_Constants.LIMELIGHT_FILE_UPLOADS_AWS_S3_REGION %>'
							with value 
							'<c:out value="${ aws_s3_region__from_environment_variable_or_java_dash_d }"></c:out>'
						</div>
					</div>
				</div>
			</c:if>
			
			<div style="margin-bottom: 3px;">
				<div>
					AWS S3 Region: 
					<input type="text" class=" config_text_inputs_jq " style="width: 650px;"
						data-config-key="<%= ConfigSystemsKeysSharedConstants.file_import_limelight_xml_scans_AWS_S3_REGION_KEY %>"
					>
				</div>
				<div style="font-size: 10px; margin-left: 20px; margin-top: 2px;">
					(Or use Environment Variable or java -D parameter
					'<%=EnvironmentVariable_Keys_Constants.LIMELIGHT_FILE_UPLOADS_AWS_S3_REGION %>')
				</div>
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
		   
   		
			<div >
			  <div >
			  
			  	<span title="(ONLY allowed if 'File Object Storage Service' is configured below)">
					Save Scan File for download from Limelight: 
					
					<input type="checkbox" class=" config_checkbox_inputs_jq " id="save_scan_file_upload_to_file_object_storage_service_checkbox" 
						data-config-key="<%= ConfigSystemsKeysSharedConstants.SCAN_FILE_SAVED_TO_FILE_OBJECT_STORAGE_KEY %>"
						data-value-checked="<%= ConfigSystemsValuesSharedConstants.TRUE %>" 
						data-value-not-checked="<%= ConfigSystemsValuesSharedConstants.FALSE %>" > 
			    </span> 
			  </div>
			</div>
			
			<%--  Error Message for 'Save Scan File for download ...' checked 
			      but 'File Object Storage Service Base URL' not populated,
			 --%>
			<div style="position: relative;"> <%--  container div for error-message-container which is position absolute --%>
			  <div style="position: absolute; top: -60px;">
		  		<div class="error-message-container error_message_container_jq" 
		  				id="error_message_save_scan_file_upload_to_file_object_storage_service_selected_file_object_storage_service_empty"
		  				style="text-align: left; margin-left: 50px;width: 400px;" >
		  			<div class="error-message-inner-container" >
		  				<div class="error-message-close-x error_message_close_x_jq">X</div>
			  			<div class="error-message-text" 
			  			  >'Save Scan File for download from Limelight' is selected so 'File Object Storage Service' must have a value.</div>
		  			</div>
			  	</div>
			  </div>
		    </div>
			
			<div style="margin-bottom: 10px;">
			  <div style="margin-bottom: 3px;" >
			  
			  	<span title="The download links for scan files will not be displayed and the download of scan file will not be allowed.
Uncheck to stop users from downloading scan files.
			  	
(ONLY allowed if 'File Object Storage Service' is configured below)">
					Scan File download from Limelight allowed (Not allowed if not checked): 
					
					<input type="checkbox" class=" config_checkbox_inputs_jq " id="save_scan_file_download_from_file_object_storage_service_allowed_checkbox" 
						data-config-key="<%= ConfigSystemsKeysSharedConstants.SCAN_FILE_DOWNLOAD_FROM_FILE_OBJECT_STORAGE_ALLOWED_KEY %>"
						data-value-checked="<%= ConfigSystemsValuesSharedConstants.TRUE %>" 
						data-value-not-checked="<%= ConfigSystemsValuesSharedConstants.FALSE %>" > 
			    </span> 
			  </div>
			</div>
			
			<%--  Error Message for 'Save Scan File for download ...' checked 
			      but 'File Object Storage Service Base URL' not populated,
			 --%>
			<div style="position: relative;"> <%--  container div for error-message-container which is position absolute --%>
			  <div style="position: absolute; top: -60px;">
		  		<div class="error-message-container error_message_container_jq" 
		  				id="error_message_save_scan_file_upload_to_file_object_storage_service_selected_file_object_storage_service_empty"
		  				style="text-align: left; margin-left: 50px;width: 400px;" >
		  			<div class="error-message-inner-container" >
		  				<div class="error-message-close-x error_message_close_x_jq">X</div>
			  			<div class="error-message-text" 
			  			  >'Save Scan File for download from Limelight' is selected so 'File Object Storage Service' must have a value.</div>
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
			<div style="margin-left: 10px; font-size: 12px;">
				(Failed imports will also be deleted, after 3 days)
			</div>
			
			<div style="margin-top: 10px">
				** Next is not needed and ignored if '<i>Delete uploaded files after Successful Import</i>' is selected
			</div>
			<div>
				Delete uploaded files after Import processed, Success or Fail, after 3 days : 
				<input type="checkbox" class=" config_checkbox_inputs_jq "  
					data-config-key="<%= ConfigSystemsKeysSharedConstants.IMPORT_DELETE_UPLOADED_FILES__ALL_AFTER_3_DAYS %>"
					data-value-checked="<%= ConfigSystemsValuesSharedConstants.TRUE %>" 
					data-value-not-checked="<%= ConfigSystemsValuesSharedConstants.FALSE %>" > 
			
			</div>
			
			<div style=" margin-top: 4px; margin-bottom: 3px;">
				Max File Upload Sizes:
			</div>
			
			<div style="margin-left: 20px">
			
				<%--  Limelight XML File - Max Upload File Size --%>
				
				<c:if test="${ not empty LimelightXML_FileSize_From_Environment_Or_JVM_dashD_Property }">
					<div style="font-weight: bold; margin-left: 20px; margin-top: 4px; margin-bottom: 3px;">
						<div style="display: grid; grid-template-columns: min-content 1fr">
							
							<div style="color: red; margin-right: 3px;" >*</div>
							<div>
								Limelight XML File Max Size  Value set here is ignored since it is configured via Environment Variable or java -D parameter
								'<%=FileUploadMaxFileSize_Config_WithConstantsDefaults.MAX_LIMELIGHT_XML_FILE_UPLOAD_SIZE_IN_GB__ENV_LABEL%>'
								with value 
								'<c:out value="${ LimelightXML_FileSize_From_Environment_Or_JVM_dashD_Property }"></c:out>'
							</div>
						</div>
					</div>
				</c:if>
	
				<div style="margin-bottom: 3px;" >
					<div class="config_single_input_root_jq">
						Limelight XML File Max Size in GB: 
						<input type="text" class=" config_text_inputs_jq   config_integer_input_validate_jq " style="width: 20px;"
							data-config-key="<%= ConfigSystemsKeysSharedConstants.LIMELIGHT_XML_FILE_MAX_FILE_SIZE_IN_GB_KEY %>"
						>
						
						<span class="config_integer_input_error_jq" style="color: red; margin-left: 6px; margin-right: 6px; display: none ">
							An
							 <span title="A whole number with no decimal point or fraction">integer</span>
							  is required, or make it an empty field
						</span>
						<span
							style="margin-left: 6px"
						>
							Default: <%= FileUploadMaxFileSize_Config_WithConstantsDefaults.get_LIMELIGHT_XML_MAX_FILE_UPLOAD_SIZE__DEFAULT_IN_GB() %>
						</span>
					</div>
					<div style="font-size: 10px; margin-left: 20px; margin-top: 2px;">
						(Or use Environment Variable or java -D parameter
						'<%=FileUploadMaxFileSize_Config_WithConstantsDefaults.MAX_LIMELIGHT_XML_FILE_UPLOAD_SIZE_IN_GB__ENV_LABEL%>')
					</div>
				</div>
				
				<%--  FASTA File - Max Upload File Size --%>
				
				<c:if test="${ not empty Max_FASTA_FileSize_From_Environment_Or_JVM_dashD_Property }">
					<div style="font-weight: bold; margin-left: 20px; margin-top: 4px; margin-bottom: 3px;">
						<div style="display: grid; grid-template-columns: min-content 1fr">
							
							<div style="color: red; margin-right: 3px;" >*</div>
							<div>
								FASTA File Max Size  Value set here is ignored since it is configured via Environment Variable or java -D parameter
								'<%=FileUploadMaxFileSize_Config_WithConstantsDefaults.MAX_FASTA_FILE_UPLOAD_SIZE_IN_GB__ENV_LABEL%>'
								with value 
								'<c:out value="${ Max_FASTA_FileSize_From_Environment_Or_JVM_dashD_Property }"></c:out>'
							</div>
						</div>
					</div>
				</c:if>
	
				<div style="margin-bottom: 3px;" >
					<div class="config_single_input_root_jq">
						FASTA File Max Size in GB: 
						<input type="text" class=" config_text_inputs_jq   config_integer_input_validate_jq " style="width: 20px;"
							data-config-key="<%= ConfigSystemsKeysSharedConstants.FASTA_FILE_MAX_FILE_SIZE_IN_GB_KEY %>"
						>
						
						<span class="config_integer_input_error_jq" style="color: red; margin-left: 6px; margin-right: 6px; display: none ">
							An
							<span title="A whole number with no decimal point or fraction">integer</span>
							is required, or make it an empty field
						</span>
						<span
							style="margin-left: 6px"
						>
							Default: <%= FileUploadMaxFileSize_Config_WithConstantsDefaults.get_MAX_FASTA_FILE_UPLOAD_SIZE__DEFAULT_IN_GB() %>
						</span>
					</div>
					<div style="font-size: 10px; margin-left: 20px; margin-top: 2px;">
						(Or use Environment Variable or java -D parameter
						'<%=FileUploadMaxFileSize_Config_WithConstantsDefaults.MAX_FASTA_FILE_UPLOAD_SIZE_IN_GB__ENV_LABEL %>')
					</div>
				</div>
				
				<%--  Scan File - Max Upload File Size --%>
				
				<c:if test="${ not empty Max_Scan_FileSize_From_Environment_Or_JVM_dashD_Property }">
					<div style="font-weight: bold; margin-left: 20px; margin-top: 4px; margin-bottom: 3px;">
						<div style="display: grid; grid-template-columns: min-content 1fr">
							
							<div style="color: red; margin-right: 3px;" >*</div>
							<div>
								Scan File Max Size  Value set here is ignored since it is configured via Environment Variable or java -D parameter
								'<%=FileUploadMaxFileSize_Config_WithConstantsDefaults.MAX_SCAN_FILE_UPLOAD_SIZE_IN_GB__ENV_LABEL%>'
								with value 
								'<c:out value="${ Max_Scan_FileSize_From_Environment_Or_JVM_dashD_Property }"></c:out>'
							</div>
						</div>
					</div>
				</c:if>
	
				<div style="margin-bottom: 3px;" >
					<div class="config_single_input_root_jq">
						Scan File Max Size in GB: 
						<input type="text" class=" config_text_inputs_jq   config_integer_input_validate_jq " style="width: 20px;"
						data-config-key="<%= ConfigSystemsKeysSharedConstants.SCAN_FILE_MAX_FILE_SIZE_IN_GB_KEY %>"
						>
						
						<span class="config_integer_input_error_jq" style="color: red; margin-left: 6px; margin-right: 6px; display: none ">
							An
							 <span title="A whole number with no decimal point or fraction">integer</span>
							  is required, or make it an empty field
						</span>
						<span
							style="margin-left: 6px"
						>
							Default: <%= FileUploadMaxFileSize_Config_WithConstantsDefaults.get_SCAN_MAX_FILE_UPLOAD_SIZE__DEFAULT_IN_GB() %>
						</span>
					</div>
					<div style="font-size: 10px; margin-left: 20px; margin-top: 2px;">
						(Or use Environment Variable or java -D parameter
						'<%=FileUploadMaxFileSize_Config_WithConstantsDefaults.MAX_SCAN_FILE_UPLOAD_SIZE_IN_GB__ENV_LABEL%>')
					</div>
				</div>
				
				
				<%--  Generic Other File - Max Upload File Size --%>
				
				<c:if test="${ not empty Max_Generic_Other_FileSize_From_Environment_Or_JVM_dashD_Property }">
					<div style="font-weight: bold; margin-left: 20px; margin-top: 4px; margin-bottom: 3px;">
						<div style="display: grid; grid-template-columns: min-content 1fr">
							
							<div style="color: red; margin-right: 3px;" >*</div>
							<div>
								Generic Other File Max Size  Value set here is ignored since it is configured via Environment Variable or java -D parameter
								'<%=FileUploadMaxFileSize_Config_WithConstantsDefaults.MAX_GENERIC_OTHER_FILE_UPLOAD_SIZE_IN_GB__ENV_LABEL%>'
								with value 
								'<c:out value="${ Max_Generic_Other_FileSize_From_Environment_Or_JVM_dashD_Property }"></c:out>'
							</div>
						</div>
					</div>
				</c:if>
	
				<div style="margin-bottom: 3px;" >
					<div class="config_single_input_root_jq">
						Generic Other File (--add-file= in Submit Import) Max Size in GB: 
						<input type="text" class=" config_text_inputs_jq   config_integer_input_validate_jq " style="width: 20px;"
						data-config-key="<%= ConfigSystemsKeysSharedConstants.GENERIC_OTHER_FILE_MAX_FILE_SIZE_IN_GB_KEY %>"
						>
						
						<span class="config_integer_input_error_jq" style="color: red; margin-left: 6px; margin-right: 6px; display: none ">
							An
							 <span title="A whole number with no decimal point or fraction">integer</span>
							  is required, or make it an empty field
						</span>
						<span
							style="margin-left: 6px"
						>
							Default: <%= FileUploadMaxFileSize_Config_WithConstantsDefaults.get_GENERIC_OTHER_MAX_FILE_UPLOAD_SIZE__DEFAULT_IN_GB() %>
						</span>
					</div>
					<div style="font-size: 10px; margin-left: 20px; margin-top: 2px;">
						(Or use Environment Variable or java -D parameter
						'<%=FileUploadMaxFileSize_Config_WithConstantsDefaults.MAX_GENERIC_OTHER_FILE_UPLOAD_SIZE_IN_GB__ENV_LABEL%>')
					</div>
				</div>
			</div>
		</div>
	  </div> 
	</div>	
	
	<div style="margin-bottom: 10px;margin-top: 20px; ">
	  <div style="margin-bottom: 3px;">
	  	<div>
			File Object Storage Service (Not used if not configured):
		</div>
		<div style="margin-left: 20px;">
		
			<div style="margin-bottom: 3px;">
				Web Service Base URL (Including Port): 
				<input type="text" class=" config_text_inputs_jq " style="width: 650px;" id="file_object_storage_base_url_input_field"
					data-config-key="<%= ConfigSystemsKeysSharedConstants.YRC_FILE_OBJECT_STORAGE_WEB_SERVICE_BASE_URL %>"
					data-FOOTER_CENTER_OF_PAGE_HTML="true">
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
	
	
	<div style="margin-bottom: 10px;margin-top: 20px; ">
	  <div style="margin-bottom: 3px;">
	  	<div>
			Blib Sepctral Library File Creation Web Service (Not used if either not configured):
		</div>
		<div style="margin-left: 20px;">
		
			<div style="margin-bottom: 3px;">
				Web Service Base URL (Including Port): 
				<input type="text" class=" config_text_inputs_jq " style="width: 650px;"
					data-config-key="<%= ConfigSystemsKeysSharedConstants.BLIB_SPECTRAL_LIBRARY_FILE_CREATION_WEB_SERVICE_BASE_URL %>"
					data-FOOTER_CENTER_OF_PAGE_HTML="true">
			</div>
			<div>
				Result File Base Directory Path ('BLIB_DIR' variable used by Blib service): 
				<input type="text" class=" config_text_inputs_jq " style="width: 650px;"
					data-config-key="<%= ConfigSystemsKeysSharedConstants.BLIB_SPECTRAL_LIBRARY_FILE_RESULT_FILE_BASE_PATH %>"
					data-FOOTER_CENTER_OF_PAGE_HTML="true">
			</div>
		</div>
	  </div> 
	</div>
	
	<div style="margin-bottom: 10px;margin-top: 20px; ">
	  <div style="margin-bottom: 3px;">
	  	<div>
			Run Feature Detection Web Service - Run Hardklor/Bullseye (Not used if either not configured):
		</div>
		<div style="margin-left: 20px;">
		
			<div style="margin-bottom: 3px;">
				Web Service Base URL (Including Port): 
				<input type="text" class=" config_text_inputs_jq " style="width: 650px;"
					data-config-key="<%= ConfigSystemsKeysSharedConstants.RUN_FEATURE_DETECTION_SERVICE_RUN_HARDKLOR_BULLSEYE_WEB_SERVICE_BASE_URL %>"
					data-FOOTER_CENTER_OF_PAGE_HTML="true">
			</div>
			<div>
				Result File Base Directory Path ('HOST_MACHINE_FINAL_DIR' variable used by service): 
				<input type="text" class=" config_text_inputs_jq " style="width: 650px;"
					data-config-key="<%= ConfigSystemsKeysSharedConstants.RUN_FEATURE_DETECTION_SERVICE_RUN_HARDKLOR_BULLSEYE_RESULT_FILES_BASE_PATH %>"
					data-FOOTER_CENTER_OF_PAGE_HTML="true">
			</div>
		</div>
	  </div> 
	</div>
	
	<div style="margin-bottom: 20px; ">
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
   
   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_footer_include_data_pages.jsp" %>
	
  <%@ include file="/WEB-INF/jsp/jsp_header_footer/footer_main.jsp" %>

 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_closing_body_tag_include_data_pages.jsp" %>
  
  <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp" %>
  
<%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_main_script_include__script_include_libs__page_header_js.jsp" %>
  			
  <script type="text/javascript" src="static/js_generated_bundles/webapp_admin/configurePage_Root-bundle.js?x=${ cacheBustValue }"></script>
  	
</body>
</html>