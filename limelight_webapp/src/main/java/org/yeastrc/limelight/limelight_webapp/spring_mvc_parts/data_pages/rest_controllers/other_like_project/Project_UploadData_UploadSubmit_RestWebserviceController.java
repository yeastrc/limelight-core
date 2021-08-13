/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2018 University of Washington - Seattle, WA
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.other_like_project;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamReader;
import javax.xml.transform.stream.StreamSource;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.XMLInputFactory_XXE_Safe_Creator.XMLInputFactory_XXE_Safe_Creator;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.constants.FileUploadCommonConstants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingSingleFileDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportFileType;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.ImportSingleFileUploadStatus;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.utils.Limelight_XML_ImporterWrkDirAndSbDrsCmmn;
import org.yeastrc.limelight.limelight_submit_import_client_connector.constants.Limelight_SubmitImport_Version_Constants;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_FinalSubmit_Request_Base;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_FinalSubmit_Request_PgmXML;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_FinalSubmit_Request_WebJSON;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_FinalSubmit_Response_Base;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_FinalSubmit_Response_PgmXML;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_FinalSubmit_Response_WebJSON;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_FinalSubmit_SingleFileItem;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectIdIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId.Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId_Result;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightWebappFileUploadFileSystemException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.constants.FileUploadSubmitterPgmSameMachineConstants;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.constants.LimelightXMLFileUploadWebConstants;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao.FileImportTrackingFileIdCreatorDAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.database_insert_with_transaction_services.ImportTrackingAndChildren_Save_SingleDBTransactionIF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.objects.LimelightUploadTempDataFileContents;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.DeleteDirectoryAndContentsUtilIF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsLimelightXMLFileImportFullyConfiguredIF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsScanFileImportAllowedViaWebSubmitIF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.Limelight_XML_Importer_Work_Directory_And_SubDirs_WebIF;
import org.yeastrc.limelight.limelight_webapp.services.SendEmailForSubmitImportServiceIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Marshal_RestRequest_Object_ToXML;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_XML_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * For Upload Data, Submit a Upload ('finalize' a Upload and set it for importing)
 *
 * WARNING:  The Submit Import Program will show the value of BaseSubmitImportWebserviceResponse.statusFail_ErrorMessage when set
 * 			 and will NO LONGER check the boolean flags (other than statusSuccess).
 * 			 So the property BaseSubmitImportWebserviceResponse.statusFail_ErrorMessage will be REQUIRED to be set for all errors. 
 *
 */
@RestController
public class Project_UploadData_UploadSubmit_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( Project_UploadData_UploadSubmit_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;

	@Autowired
	private Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectIdIF validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId;
	
	@Autowired
	private IsLimelightXMLFileImportFullyConfiguredIF isLimelightXMLFileImportFullyConfigured;

	@Autowired
	private IsScanFileImportAllowedViaWebSubmitIF isScanFileImportAllowedViaWebSubmit;

	@Autowired
	private ProjectDAO_IF projectDAO;
	
	@Autowired
	private FileImportTrackingFileIdCreatorDAO_IF fileImportTrackingFileIdCreatorDAO;
	
	@Autowired
	private ImportTrackingAndChildren_Save_SingleDBTransactionIF importTrackingAndChildren_Save_SingleDBTransaction;
	
	@Autowired
	private Limelight_XML_Importer_Work_Directory_And_SubDirs_WebIF limelight_XML_Importer_Work_Directory_And_SubDirs_Web;
	
	@Autowired
	private DeleteDirectoryAndContentsUtilIF deleteDirectoryAndContentsUtil;
	
	@Autowired
	private SendEmailForSubmitImportServiceIF sendEmailForSubmitImportService;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

	@Autowired
	private Unmarshal_RestRequest_XML_ToObject unmarshal_RestRequest_XML_ToObject;
	
	@Autowired
	private Marshal_RestRequest_Object_ToXML marshal_RestRequest_Object_ToXML;


	/////////////////////////////////////////////////////

	//   Separate called methods for From Web App and From Submit Program since local code is managing the parsing the request and serializing the response 
	
	//  Convert result object graph to JSON or XML in byte[] in the controller body so can cache it

	//     From Web App JSON

	//  These 2 annotations work the same
	

	//  Mapping the value in {} in the path to parameters in the method:
	//
	//    The value in {} has to match the value in the "value = " in the @PathVariable
	//    If they don't match, a 500 error is thrown and nothing is logged and the method is not called.
	//    If there is no "value = " in the @PathVariable, the method parameter name is used.
	
	@PostMapping( 
			path = {
					AA_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_RestWSControllerPaths_Constants.PROJECT__UPLOAD_DATA_UPLOAD_SUBMIT_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  webserviceMethod_JSON(

    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	try {
    		//		log.warn( "changeUserAccessToProject(...) called" );

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs

    		if ( postBody == null ) {
    			log.warn( "No Post Body" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		SubmitImport_FinalSubmit_Request_WebJSON webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, SubmitImport_FinalSubmit_Request_WebJSON.class );
    		
			//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );

			String projectIdentifier = webserviceRequest.getProjectIdentifier();

			if ( StringUtils.isEmpty( projectIdentifier ) ) {
				log.warn( "projectIdentifier is empty or not assigned" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			int projectId = getProjectId( webserviceRequest );


			long uploadKey = -1;
			try {
				uploadKey = Long.parseLong( webserviceRequest.getUploadKey() );
			} catch ( Exception e ) {
				String msg = "Provided uploadKey is invalid. fails to parse: " + webserviceRequest.getUploadKey();
				log.warn( msg );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
		
			List<Integer> projectIds = new ArrayList<>( 1 );
			projectIds.add( projectId );

			//  Restrict access to Project owners or above (admin), if project was not locked
			ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result =
					validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
					.validateProjectOwnerAllowed( projectIds, httpServletRequest );

			//  If NOT Limelight XML File Import is Fully Configured, 
			if ( ! isLimelightXMLFileImportFullyConfigured.isLimelightXMLFileImportFullyConfigured() ) {
				String msg = "Limelight XML File Import is NOT Fully Configured ";
				log.error( msg );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			UserSession userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result.getUserSession();
			if ( userSession == null ) {
				throw new LimelightInternalErrorException( "userSession should not be null" );
			}
			Integer userId = userSession.getUserId();
			if ( userId == null ) {
				throw new LimelightInternalErrorException( "userId should not be null" );
			}
			
			WebserviceMethod_Internal_Params webserviceMethod_Internal_Params = new WebserviceMethod_Internal_Params();

			webserviceMethod_Internal_Params.projectId = projectId;
			webserviceMethod_Internal_Params.uploadKey = uploadKey;
			webserviceMethod_Internal_Params.webservice_Request_Base = webserviceRequest;
			webserviceMethod_Internal_Params.userId = userId;
			webserviceMethod_Internal_Params.webservice_Result_Base = new SubmitImport_FinalSubmit_Response_WebJSON();
			
//			WebserviceMethod_Internal_Results webserviceMethod_Internal_Results =
			processWebRequest( webserviceMethod_Internal_Params, httpServletRequest );

			byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceMethod_Internal_Params.webservice_Result_Base );

			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );

		} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {

			//  only rethrow Error Response Exceptions 
			throw e;

		} catch ( Exception e ) {
			String msg = "Failed in controller: ";
			log.error( msg, e );
			throw new Limelight_WS_InternalServerError_Exception();
		}
	}
    

	//     From Submit Pgm XML

	//  These 2 annotations work the same
	

	//  Mapping the value in {} in the path to parameters in the method:
	//
	//    The value in {} has to match the value in the "value = " in the @PathVariable
	//    If they don't match, a 500 error is thrown and nothing is logged and the method is not called.
	//    If there is no "value = " in the @PathVariable, the method parameter name is used.
	
	@PostMapping( 
			path = {
					AA_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_RestWSControllerPaths_Constants.PROJECT__UPLOAD_DATA_UPLOAD_SUBMIT_FROM_SUBMIT_PGM_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_XML_VALUE, produces = MediaType.APPLICATION_XML_VALUE )

    public @ResponseBody ResponseEntity<byte[]>  webserviceMethod_PgmXML(

//			@PathVariable(value = AA_RestWSControllerPaths_Constants.PATH_PARAMETER_LABEL_WEBSERVICE_SYNC_TRACKING) 
//    		String webserviceSyncTracking,
    		
    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	try {
    		//		log.warn( "changeUserAccessToProject(...) called" );

    		//  Always accept POST body as byte[] and parse to XML here so have POST body for caching or other needs

    		if ( postBody == null ) {
    			log.warn( "No Post Body" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		SubmitImport_FinalSubmit_Request_PgmXML webserviceRequest = null;

    		Object webserviceRequestAsObject = unmarshal_RestRequest_XML_ToObject.getObjectFromXMLByteArray( postBody );
    		if ( webserviceRequestAsObject == null ) {
    			log.warn("webserviceRequestAsObject == null");
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		try {
    			webserviceRequest = (SubmitImport_FinalSubmit_Request_PgmXML) webserviceRequestAsObject;
    		} catch ( Exception e ) {
    			final String msg = "Failed to cast returned webserviceRequestAsObject from XML to SubmitImport_FinalSubmit_Request_PgmXML."
    					+ " webserviceRequestAsObject.getClass(): " + webserviceRequestAsObject.getClass();
    			log.warn(msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		{
				SubmitImport_FinalSubmit_Response_PgmXML webserviceResult = new SubmitImport_FinalSubmit_Response_PgmXML();
				
    			if ( webserviceRequest.getSubmitProgramVersionNumber() == null ) {
    				
    				log.warn( "webserviceRequest.getSubmitProgramVersionNumber() == null. webserviceRequest.getProjectIdentifier(): " + webserviceRequest.getProjectIdentifier() );
    				
    				webserviceResult.setStatusSuccess( false );
    				
    				//  Reason set in validateResult by method validateProjectOwnerAllowed(...)
    				
    				byte[] responseAsXML = marshal_RestRequest_Object_ToXML.getXMLByteArrayFromObject( webserviceResult );

    				//  TODO  Return other than 200 code?
    				return ResponseEntity.ok().contentType( MediaType.APPLICATION_XML ).body( responseAsXML );
    			}

    			if ( webserviceRequest.getSubmitProgramVersionNumber().intValue() < Limelight_SubmitImport_Version_Constants.SUBMIT_PROGRAM__MINUMUM__VERSION_NUMBER ) {
    				
    				log.warn( "webserviceRequest.getSubmitProgramVersionNumber() < Limelight_SubmitImport_Version_Constants.SUBMIT_PROGRAM__MINUMUM__VERSION_NUMBER.  SubmitProgramVersionNumber: "
    						+ webserviceRequest.getSubmitProgramVersionNumber().intValue()
    						+ ", SUBMIT_PROGRAM__MINUMUM__VERSION_NUMBER: " + Limelight_SubmitImport_Version_Constants.SUBMIT_PROGRAM__MINUMUM__VERSION_NUMBER
    						+ ", webserviceRequest.getProjectIdentifier(): " + webserviceRequest.getProjectIdentifier() );
    				
    				webserviceResult.setStatusSuccess( false );
    				webserviceResult.setSubmitProgramVersionNumber_NotAccepted(true);
    				webserviceResult.setSubmitProgramVersionNumber_Current_Per_Webapp( Limelight_SubmitImport_Version_Constants.SUBMIT_PROGRAM__CURRENT__VERSION_NUMBER );
    				
    				//  Reason set in validateResult by method validateProjectOwnerAllowed(...)
    				
    				byte[] responseAsXML = marshal_RestRequest_Object_ToXML.getXMLByteArrayFromObject( webserviceResult );

    				//  TODO  Return other than 200 code?
    				return ResponseEntity.ok().contentType( MediaType.APPLICATION_XML ).body( responseAsXML );
    			}
    			
    		}

    		if ( StringUtils.isEmpty( webserviceRequest.getUserSubmitImportProgramKey() ) ) {
    			final String msg = "UserSubmitImportProgramKey is empty.";
    			log.warn(msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
			//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );

			String projectIdentifier = webserviceRequest.getProjectIdentifier();

			if ( StringUtils.isEmpty( projectIdentifier ) ) {
				log.warn( "projectIdentifier is empty or not assigned" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			int projectId = getProjectId( webserviceRequest );

			long uploadKey = -1;
			try {
				uploadKey = Long.parseLong( webserviceRequest.getUploadKey() );
			} catch ( Exception e ) {
				String msg = "Provided uploadKey is invalid";
				log.warn( msg );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			if ( webserviceRequest.isSubmitterSameMachine() 
					&& ( StringUtils.isEmpty( webserviceRequest.getSubmitterKey() ) ) ) {
				String msg = "submitterKey cannot be empty if submitterSameMachine is true";
				log.warn( msg );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId_Result validateResult =
					validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId
					.validateProjectOwnerAllowed( 
							webserviceRequest.getUserSubmitImportProgramKey(), 
							projectId,
							null /* SubmitImport_Init_Response_PgmXML webserviceResult */ );
	    	
			if ( ! validateResult.isSuccess() ) {
				
				SubmitImport_FinalSubmit_Response_PgmXML submitImport_FinalSubmit_Response_PgmXML = new SubmitImport_FinalSubmit_Response_PgmXML();
				
				submitImport_FinalSubmit_Response_PgmXML.setStatusSuccess( false );
				
				//  TODO  Set error reason
//				webserviceResult.set 
				
				byte[] responseAsXML = marshal_RestRequest_Object_ToXML.getXMLByteArrayFromObject( submitImport_FinalSubmit_Response_PgmXML );

				//  TODO  Return other than 200 code?
				return ResponseEntity.ok().contentType( MediaType.APPLICATION_XML ).body( responseAsXML );
			}
			
			if ( validateResult.getUserId() == null ) {
				final String msg = "ERROR: validateResult.getUserId() == null";
				log.error( msg );
				throw new LimelightInternalErrorException(msg);
			}
			
			SubmitImport_FinalSubmit_Response_PgmXML submitImport_FinalSubmit_Response_PgmXML = new SubmitImport_FinalSubmit_Response_PgmXML();
			
			WebserviceMethod_Internal_Params webserviceMethod_Internal_Params = new WebserviceMethod_Internal_Params();

			webserviceMethod_Internal_Params.projectId = projectId;
			webserviceMethod_Internal_Params.uploadKey = uploadKey;
			webserviceMethod_Internal_Params.webservice_Request_Base = webserviceRequest;
			webserviceMethod_Internal_Params.userId = validateResult.getUserId();
			webserviceMethod_Internal_Params.webservice_Result_Base = submitImport_FinalSubmit_Response_PgmXML;
			
			webserviceMethod_Internal_Params.submitterSameMachine = webserviceRequest.isSubmitterSameMachine();
			webserviceMethod_Internal_Params.submitterKey = webserviceRequest.getSubmitterKey();
			webserviceMethod_Internal_Params.searchPath = webserviceRequest.getSearchPath();
			
			WebserviceMethod_Internal_Results webserviceMethod_Internal_Results =
					processWebRequest( webserviceMethod_Internal_Params, httpServletRequest );

			submitImport_FinalSubmit_Response_PgmXML.setImporterSubDir( webserviceMethod_Internal_Results.importerSubDir );
	
			byte[] responseAsXML = marshal_RestRequest_Object_ToXML.getXMLByteArrayFromObject( submitImport_FinalSubmit_Response_PgmXML );

			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsXML );

		} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {

			//  only rethrow Error Response Exceptions 
			throw e;

		} catch ( Exception e ) {
			String msg = "Failed in controller: ";
			log.error( msg, e );
			throw new Limelight_WS_InternalServerError_Exception();
		}
	}


    /**
     * @param webserviceRequest
     * @return
     */
    private int getProjectId( SubmitImport_FinalSubmit_Request_Base webserviceRequest ) {

		String projectIdentifier = webserviceRequest.getProjectIdentifier();

		if ( StringUtils.isEmpty( projectIdentifier ) ) {
			log.warn( "projectIdentifier is empty or not assigned" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		int projectId = 0;
		try {
			projectId = Integer.parseInt( projectIdentifier );

		} catch ( RuntimeException e ) {
			log.warn( "Project Identifier not parsable to int: " + projectIdentifier );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		return projectId;
    }

	/**
	 *  
	 * 
	 * 
	 * @param request
	 * @param projectId
	 * @throws Exception
	 * @throws LimelightInternalErrorException
	 */
	private WebserviceMethod_Internal_Results processWebRequest( 
			WebserviceMethod_Internal_Params webserviceMethod_Internal_Params, HttpServletRequest httpServletRequest ) throws Exception {


		int projectId = webserviceMethod_Internal_Params.projectId;
		long uploadKey = webserviceMethod_Internal_Params.uploadKey;
		SubmitImport_FinalSubmit_Request_Base webservice_Request_Base = webserviceMethod_Internal_Params.webservice_Request_Base;
		int userId = webserviceMethod_Internal_Params.userId;
		SubmitImport_FinalSubmit_Response_Base webservice_Result_Base = webserviceMethod_Internal_Params.webservice_Result_Base;
		
		WebserviceMethod_Internal_Results webserviceMethod_Internal_Results = new WebserviceMethod_Internal_Results();
		
		//  Confirm projectId is in database
		ProjectDTO projectDTO =	projectDAO.getProjectLockedPublicAccessLevelPublicAccessLockedForProjectId( projectId );
		if ( projectDTO == null ) {
			// should never happen
			String msg = "Project id is not in database " + projectId;
			log.warn( msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		if ( ( ! projectDTO.isEnabled() ) || ( projectDTO.isMarkedForDeletion() ) ) {
			String msg = "Project id is disabled or marked for deletion: " + projectId;
			log.warn( msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		if ( ( projectDTO.isProjectLocked() ) ) {
			String msg = "Project id is locked: " + projectId;
			log.warn( msg );
			webservice_Result_Base.setStatusSuccess(false);
			webservice_Result_Base.setProjectLocked(true);
			
			return webserviceMethod_Internal_Results;  //  EARLY EXIT
		}
		
		String requestURL = httpServletRequest.getRequestURL().toString();
		String remoteUserIpAddress = httpServletRequest.getRemoteHost();
		File importer_Work_Directory = Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().get_Limelight_XML_Importer_Work_Directory();
		//  Get the File object for the Base Subdir used to temporarily store the files in this request 
		String uploadFileTempDirString =
				limelight_XML_Importer_Work_Directory_And_SubDirs_Web.getDirForUploadFileTempDir();
		File uploadFileTempDir = new File( importer_Work_Directory, uploadFileTempDirString );
		if ( ! uploadFileTempDir.exists() ) {
			String msg = "uploadFileTempDir does not exist.  uploadFileTempDir: " 
					+ uploadFileTempDir.getAbsolutePath();
			log.error( msg );
			throw new LimelightWebappFileUploadFileSystemException(msg);
		}
		File tempSubdir =
				limelight_XML_Importer_Work_Directory_And_SubDirs_Web
				.getSubDirForUploadFileTempDir( userId, uploadKey, uploadFileTempDir );
		if ( ! tempSubdir.exists() ) {
			if ( log.isInfoEnabled() ) {
				String infoMsg = "tempSubdir does not exist.  tempSubdir: " 
						+ uploadFileTempDir.getAbsolutePath();
				log.info( infoMsg );
			}
//			String webErrorMsg = "No Data for uploadKey: " + uploadKey;
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		boolean isScanFileImportAllowed = isScanFileImportAllowedViaWebSubmit.isScanFileImportAllowedViaWebSubmit();
		List<SubmitImport_FinalSubmit_SingleFileItem> requestFileItemList = webservice_Request_Base.getFileItems();
		if ( requestFileItemList == null || requestFileItemList.isEmpty() ) {
			String msg = "No files in request";
			log.warn( msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		//  use filenamesSet to find duplicate filenames
		Set<String> filenamesSet = new HashSet<>();
		
		//  use filenames_NoSuffixes_Set to find duplicate filenames (without their suffixes)
		Set<String> filenames_NoSuffixes_Set = new HashSet<>();
		
		boolean foundLimelightXMLFile = false;
		
		for ( SubmitImport_FinalSubmit_SingleFileItem requestFileItem : requestFileItemList ) {
			if ( requestFileItem.getFileIndex() == null ) {
				String msg = "requestFileItem.fileIndex == null";
				log.warn( msg );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			if ( requestFileItem.getFileType() == null ) {
				String msg = "requestFileItem.fileType == null";
				log.warn( msg );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			if ( requestFileItem.getFileType().intValue() == FileImportFileType.LIMELIGHT_XML_FILE.value() ) {
				if ( foundLimelightXMLFile ) {
					String msg = "More than one Limelight XML file";
					log.warn( msg );
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
				foundLimelightXMLFile = true;
			} else if ( requestFileItem.getFileType().intValue() == FileImportFileType.SCAN_FILE.value() ) {
				if ( ! isScanFileImportAllowed ) {
					webservice_Result_Base.setStatusSuccess( false );
					webservice_Result_Base.setSubmittedScanFileNotAllowed( true );
					return webserviceMethod_Internal_Results;  //  EARLY EXIT
				}
			} else {
				String msg = "File Type is unknown: " + requestFileItem.getFileType().intValue();
				log.warn( msg );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			if ( requestFileItem.getUploadedFilename() == null ) {
				String msg = "requestFileItem.uploadedFilename == null";
				log.warn( msg );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			if ( ! filenamesSet.add( requestFileItem.getUploadedFilename() ) ) {
				String msg = "Duplicate filename: " + requestFileItem.getUploadedFilename();
				log.warn( msg );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			{
				String filename_NoSuffix = FilenameUtils.removeExtension( requestFileItem.getUploadedFilename() );
				if ( ! filenames_NoSuffixes_Set.add( filename_NoSuffix ) ) {
					String msg = "Duplicate filename (checking without filename suffix): " 
							+ requestFileItem.getUploadedFilename()
							+ ", filename without suffix: "
							+ filename_NoSuffix;
					log.warn( msg );
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
			}
		}
		//  Determine search name, starting with search name in Submit request
		String searchName = webservice_Request_Base.getSearchName();
		if ( StringUtils.isEmpty( searchName ) ) {
			//  No Search name in upload request
			searchName = null; // make null if it is the empty string
		}
		//  use search path in Submit request if populated
		String searchPath = webserviceMethod_Internal_Params.searchPath;
		if ( StringUtils.isEmpty( searchPath ) ) {
			//  No Search path in upload request
			searchPath= null; // make null if it is the empty string
		}
		List<FileImportTrackingSingleFileDTO> fileImportTrackingSingleFileDTOList = new ArrayList<>( 1 );
		List<LimelightUploadTempDataFileContentsAndAssocData> limelightUploadTempDataFileContentsAndAssocDataList = null;
		
		if ( ! webserviceMethod_Internal_Params.submitterSameMachine ) {
			
			//  Not Flag set in Request for Submitter Same Machine so:
			
			//  "Normal Submit" Processing
			
			ProcessFilesInTempUploadDirResult processFilesInTempUploadDirResult =
					processFilesInTempUploadDir(
							tempSubdir, requestFileItemList);
			
			limelightUploadTempDataFileContentsAndAssocDataList =
					processFilesInTempUploadDirResult.limelightUploadTempDataFileContentsAndAssocDataList;
			
			FileImportTrackingSingleFileDTO fileImportTrackingSingleFileDTO = null;
			//  fileImportTrackingSingleFileDTO entry for Uploaded file(s)
			for (  LimelightUploadTempDataFileContentsAndAssocData limelightUploadTempDataFileContentsAndAssocData : limelightUploadTempDataFileContentsAndAssocDataList ) {
				LimelightUploadTempDataFileContents limelightUploadTempDataFileContents = limelightUploadTempDataFileContentsAndAssocData.limelightUploadTempDataFileContents;
				fileImportTrackingSingleFileDTO = new FileImportTrackingSingleFileDTO();
				fileImportTrackingSingleFileDTOList.add( fileImportTrackingSingleFileDTO );
				fileImportTrackingSingleFileDTO.setFilenameInUpload( limelightUploadTempDataFileContents.getUploadedFilename() );
				fileImportTrackingSingleFileDTO.setFilenameOnDisk( limelightUploadTempDataFileContents.getSavedToDiskFilename() );
				fileImportTrackingSingleFileDTO.setFileType( limelightUploadTempDataFileContents.getFileType() );
				fileImportTrackingSingleFileDTO.setFileSize( limelightUploadTempDataFileContentsAndAssocData.fileLength );
				fileImportTrackingSingleFileDTO.setCanonicalFilename_W_Path_OnSubmitMachine( limelightUploadTempDataFileContents.getCanonicalFilename_W_Path_OnSubmitMachine() );
				fileImportTrackingSingleFileDTO.setAbsoluteFilename_W_Path_OnSubmitMachine( limelightUploadTempDataFileContents.getAbsoluteFilename_W_Path_OnSubmitMachine() );
				fileImportTrackingSingleFileDTO.setFileUploadStatus( ImportSingleFileUploadStatus.FILE_UPLOAD_COMPLETE );
				if ( limelightUploadTempDataFileContents.getFileType() == FileImportFileType.LIMELIGHT_XML_FILE ) {
					String searchNameFromLimelightXMLFile = limelightUploadTempDataFileContents.getSearchNameInFile();
					if ( StringUtils.isEmpty( searchName )
							&& ( StringUtils.isNotEmpty( searchNameFromLimelightXMLFile ) )) {
						//  No Search name in upload request AND Search name in Limelight XML file
						searchName = searchNameFromLimelightXMLFile;
					}
				}
			}
		} else {
			
			//  validateSubmitterKeyForSubmitSameMachine.submitterSameMachine true
			// validate submitterKey

			boolean isValid = validateSubmitterKeyForSubmitSameMachine( webserviceMethod_Internal_Params.submitterKey, tempSubdir );
			if ( ! isValid ) {
				//  Submitter Key is not valid so remove the tmp upload subdir, making the upload key unusable
				//   This will remove the submitter key file, making the submitter key unusable
				deleteDirectoryAndContentsUtil.deleteDirectoryAndContents( tempSubdir );
				String msg = "Submitter Key Not Valid";
				log.warn( msg );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			//  Validate that submitted files exist and add to fileImportTrackingSingleFileDTOList
			List<SubmitImport_FinalSubmit_SingleFileItem> fileItemList = webservice_Request_Base.getFileItems();
			for ( SubmitImport_FinalSubmit_SingleFileItem fileItem : fileItemList ) {
				FileImportFileType fileImportFileType = null;
				try {
					fileImportFileType = FileImportFileType.fromValue( fileItem.getFileType() );
				} catch ( Exception e ) {
					String msg = "File Type is unknown: " + fileItem.getFileType();
					log.warn( msg );
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
				File fileItemFile = new File( fileItem.getFilenameOnDiskWithPathSubSameMachine() );
				if ( ! fileItemFile.exists() ) {
					String msg = "File not found: " + fileItemFile.getCanonicalPath();
					log.warn( msg );
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
				long fileSize = fileItemFile.length();
				
				//  TODO
//				if ( fileImportFileType == FileImportFileType.LIMELIGHT_XML_FILE ) {
//					//  Do minimal validation of Limelight XML file and get search name if in the file
//					String searchNameFromLimelightXMLFile =
//							Minimal_Validate_LimelightXMLFile_AndGetSearchNameIfInFile.getInstance()
//							.minimal_Validate_LimelightXMLFile_AndGetSearchNameIfInFile( fileItemFile );
//					if ( StringUtils.isEmpty( searchName )
//							&& ( StringUtils.isNotEmpty( searchNameFromLimelightXMLFile ) )) {
//						//  Search name in Limelight XML file
//						searchName = searchNameFromLimelightXMLFile;
//					}
//				}
				
				FileImportTrackingSingleFileDTO fileImportTrackingSingleFileDTO = new FileImportTrackingSingleFileDTO();
				fileImportTrackingSingleFileDTOList.add( fileImportTrackingSingleFileDTO );
				fileImportTrackingSingleFileDTO.setFilenameInUpload( fileItemFile.getName() );
				fileImportTrackingSingleFileDTO.setFilenameOnDisk( fileItemFile.getName() );
				fileImportTrackingSingleFileDTO.setFilenameOnDiskWithPathSubSameMachine( fileItem.getFilenameOnDiskWithPathSubSameMachine() );
				fileImportTrackingSingleFileDTO.setFileType( fileImportFileType );
				fileImportTrackingSingleFileDTO.setFileSize( fileSize );
				fileImportTrackingSingleFileDTO.setCanonicalFilename_W_Path_OnSubmitMachine( fileItemFile.getCanonicalPath() );
				fileImportTrackingSingleFileDTO.setFileUploadStatus( ImportSingleFileUploadStatus.FILE_UPLOAD_COMPLETE );
			}
		}
		
		//  Get the File object for the Base Subdir used to store the files in this request 
		File importFilesBaseDir = new File( importer_Work_Directory, FileUploadCommonConstants.IMPORT_BASE_DIR );
		if ( ! importFilesBaseDir.exists() ) {
//				boolean mkdirResult = 
			importFilesBaseDir.mkdir();
		}
		if ( ! importFilesBaseDir.exists() ) {
			String msg = "importFilesBaseDir does not exist after testing for it and attempting to create it.  importFilesBaseDir: " 
					+ importFilesBaseDir.getAbsolutePath();
			log.error( msg );
			throw new LimelightWebappFileUploadFileSystemException(msg);
		}
		
		int importTrackingId = fileImportTrackingFileIdCreatorDAO.getNextId();
		
		String dirNameForImportTrackingId =
				Limelight_XML_ImporterWrkDirAndSbDrsCmmn.getInstance().getDirForImportTrackingId( importTrackingId );
		File dirForImportTrackingId  =  new File( importFilesBaseDir , dirNameForImportTrackingId );
		if ( dirForImportTrackingId.exists() ) {
			String msg = "dirForImportTrackingId already exists: " + dirForImportTrackingId.getAbsolutePath();
			log.error( msg );
			throw new Exception(msg);
		}
		if ( ! dirForImportTrackingId.mkdir() ) {
			String msg = "Failed to make dirForImportTrackingId: " + dirForImportTrackingId.getAbsolutePath();
			log.error( msg );
			throw new Exception(msg);
		}
		if ( webserviceMethod_Internal_Params.submitterSameMachine ) {
			//  submitterSameMachine  true so create file with list of file names with paths to be imported
			File importFileListFile = 
					new File( dirForImportTrackingId, LimelightXMLFileUploadWebConstants.IMPORT_FILE_LIST_FILE );
			BufferedWriter writer = null;
			try {
				writer = new BufferedWriter( new FileWriter( importFileListFile ) );
				writer.write( "List of files to be imported" );
				writer.newLine();
				for ( FileImportTrackingSingleFileDTO item : fileImportTrackingSingleFileDTOList ) {
					writer.write( item.getFilenameOnDiskWithPathSubSameMachine() );
					writer.newLine();
				}
			} finally {
				if ( writer != null ) {
					writer.close();
				}
			}
		}
		if ( ! webserviceMethod_Internal_Params.submitterSameMachine ) {
			//  Files were uploaded so move from temp dir to import dir (import dir name based on tracking id) 
			moveUploadedFilesToWorkDirectory(
					tempSubdir,
					limelightUploadTempDataFileContentsAndAssocDataList,
					dirForImportTrackingId );
		}
		
		try {
			//  Remove the subdir the uploaded file(s) were in
			deleteDirectoryAndContentsUtil.deleteDirectoryAndContents( tempSubdir );
		} catch ( Exception e ) {
			String directoryCanonicalPath = "";
			try {
				directoryCanonicalPath = ", tempSubdir.getCanonicalPath: " + tempSubdir.getCanonicalPath();
			} catch ( Exception e2 ) {
				
				// Swallow Exception since NOT mission critical
			}
			
			String msg = "Failed to delete directory: " + tempSubdir.getAbsolutePath() + directoryCanonicalPath;
			log.error( msg );
			// Swallow Exception since NOT mission critical
		}
		
		//  Save to the DB
		FileImportTrackingDTO fileImportTrackingDTO = new FileImportTrackingDTO();
		fileImportTrackingDTO.setId( importTrackingId );
		fileImportTrackingDTO.setStatus( FileImportStatus.QUEUED );
		fileImportTrackingDTO.setPriority( FileUploadCommonConstants.PRIORITY_STANDARD );
		fileImportTrackingDTO.setProjectId( projectId );
		fileImportTrackingDTO.setUserId( userId );
		fileImportTrackingDTO.setSearchName( searchName );
		fileImportTrackingDTO.setSearchPath( searchPath );
		fileImportTrackingDTO.setInsertRequestURL( requestURL );
		fileImportTrackingDTO.setRemoteUserIpAddress( remoteUserIpAddress );
		importTrackingAndChildren_Save_SingleDBTransaction
		.saveImportTrackingAndChildrenInSingleDBTransaction( fileImportTrackingDTO, fileImportTrackingSingleFileDTOList );
		
		if ( webserviceMethod_Internal_Params.submitterSameMachine ) {
			//  submitterSameMachine true, return the subdir name for import
			webserviceMethod_Internal_Results.importerSubDir = dirNameForImportTrackingId;
		}
		
		webservice_Result_Base.setStatusSuccess( true );
		
		try {
			
			// send email to notify submit received
			sendEmailForSubmitImportService.sendEmailForSubmitImportInternalService( fileImportTrackingDTO );
			
		} catch ( Throwable t ) {
			String msg = "caught Throwable sending email that an import has been submitted.  This Throwable will be swallowed and the Webservice response will be success";
			log.error(msg);
			//  Swallow this Throwable
		}
		
		
		return webserviceMethod_Internal_Results;
	}


	/**
	 * @param tempSubdir
	 * @param requestFileItemList
	 * @return
	 * @throws JAXBException
	 * @throws LimelightWebappFileUploadFileSystemException
	 * @throws IOException
	 */
	private ProcessFilesInTempUploadDirResult processFilesInTempUploadDir(
			File tempSubdir, 
			List<SubmitImport_FinalSubmit_SingleFileItem> requestFileItemList )
			throws JAXBException, IOException, LimelightWebappFileUploadFileSystemException {
		ProcessFilesInTempUploadDirResult processFilesInTempUploadDirResult = new ProcessFilesInTempUploadDirResult();
		
		//  Process files from tempSubdir, matching to request
		List<LimelightUploadTempDataFileContentsAndAssocData> limelightUploadTempDataFileContentsAndAssocData_OnDisk_List =
				getLimelightUploadTempDataFileContentsListForTempSubdir( tempSubdir );
		
		//  Only process files sent in submit request
		List<LimelightUploadTempDataFileContentsAndAssocData> limelightUploadTempDataFileContentsAndAssocDataList = new ArrayList<>( limelightUploadTempDataFileContentsAndAssocData_OnDisk_List.size() );
		for ( SubmitImport_FinalSubmit_SingleFileItem requestFileItem : requestFileItemList ) {
			
			LimelightUploadTempDataFileContentsAndAssocData limelightUploadTempDataFileContentsAndAssocDataForRequestFileItem = null;
			
			for ( LimelightUploadTempDataFileContentsAndAssocData limelightUploadTempDataFileContentsAndAssocData  : 
				limelightUploadTempDataFileContentsAndAssocData_OnDisk_List ) {
				
				LimelightUploadTempDataFileContents limelightUploadTempDataFileContents = limelightUploadTempDataFileContentsAndAssocData.limelightUploadTempDataFileContents;
				
				if ( requestFileItem.getFileIndex().intValue() == limelightUploadTempDataFileContents.getFileIndex() 
						&& requestFileItem.getFileType().intValue() == limelightUploadTempDataFileContents.getFileType().value() 
						&& requestFileItem.getUploadedFilename().equals( limelightUploadTempDataFileContents.getUploadedFilename() ) ) { 
					
					if ( limelightUploadTempDataFileContentsAndAssocDataForRequestFileItem != null ) {
						String msg = "Found more than one file on disk match for file index: " + requestFileItem.getFileIndex().intValue() 
								+ ", file type: " + requestFileItem.getFileType().intValue()
								+ ", uploaded filename: " + requestFileItem.getUploadedFilename();
						log.error( msg );
						throw new LimelightWebappFileUploadFileSystemException( msg );
					}
					//  Save off limelightUploadTempDataFileContentsAndAssocData since it matches the file index and file type and filename
					limelightUploadTempDataFileContentsAndAssocDataForRequestFileItem = limelightUploadTempDataFileContentsAndAssocData;
				}
			}
			if ( limelightUploadTempDataFileContentsAndAssocDataForRequestFileItem == null ) {
				String msg = "No file on disk matched for file index: " + requestFileItem.getFileIndex().intValue() 
						+ ", file type: " + requestFileItem.getFileType().intValue()
						+ ", uploaded filename: " + requestFileItem.getUploadedFilename();
				log.error( msg );
				throw new LimelightWebappFileUploadFileSystemException(msg);
			}
			limelightUploadTempDataFileContentsAndAssocDataList.add( limelightUploadTempDataFileContentsAndAssocDataForRequestFileItem );
		}
		//  Ensure exactly one Limelight XML file is processed
		boolean processedLimelightXMLFile = false;
		for (  LimelightUploadTempDataFileContentsAndAssocData limelightUploadTempDataFileContentsAndAssocData : limelightUploadTempDataFileContentsAndAssocDataList ) {
			LimelightUploadTempDataFileContents limelightUploadTempDataFileContents = limelightUploadTempDataFileContentsAndAssocData.limelightUploadTempDataFileContents;
			if ( limelightUploadTempDataFileContents.getFileType() == FileImportFileType.LIMELIGHT_XML_FILE ) {
				if ( processedLimelightXMLFile ) {
					String msg = "More than one Limelight XML file";
					log.warn( msg );
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
				processedLimelightXMLFile = true;
			}
		}
		if ( ! processedLimelightXMLFile ) {
			String msg = "Missing Limelight XML file";
			log.warn( msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		processFilesInTempUploadDirResult.limelightUploadTempDataFileContentsAndAssocDataList = limelightUploadTempDataFileContentsAndAssocData_OnDisk_List;
		return processFilesInTempUploadDirResult;
	}
	
	/**
	 * @param tempSubdir
	 * @param limelightUploadTempDataFileContentsAndAssocDataList
	 * @param dirForImportTrackingId
	 * @throws LimelightWebappFileUploadFileSystemException
	 */
	private void moveUploadedFilesToWorkDirectory(
			File tempSubdir,
			List<LimelightUploadTempDataFileContentsAndAssocData> limelightUploadTempDataFileContentsAndAssocDataList,
			File dirForImportTrackingId)
			throws LimelightWebappFileUploadFileSystemException {
		///   move the uploaded file(s) into importer work dir.
		for (  LimelightUploadTempDataFileContentsAndAssocData limelightUploadTempDataFileContentsAndAssocData : limelightUploadTempDataFileContentsAndAssocDataList ) {
			LimelightUploadTempDataFileContents limelightUploadTempDataFileContents = limelightUploadTempDataFileContentsAndAssocData.limelightUploadTempDataFileContents;
			File uploadedTempFileOnDisk = new File( tempSubdir, limelightUploadTempDataFileContents.getSavedToDiskFilename() );
			File uploadedFile_In_dirForImportTrackingId = new File( dirForImportTrackingId, limelightUploadTempDataFileContents.getSavedToDiskFilename() );
			try {
				FileUtils.moveFile( uploadedTempFileOnDisk, uploadedFile_In_dirForImportTrackingId );
			} catch ( Exception e ) {
				String msg = "Failed to move uploaded file to dirForImportTrackingId.  Src file: " + uploadedTempFileOnDisk
						+ ", dest file: " + uploadedFile_In_dirForImportTrackingId;
				log.error( msg, e );
				throw new LimelightWebappFileUploadFileSystemException(msg, e);
			}
		}
	}
	

	/**
	 * @param tempSubdir
	 * @return List of LimelightUploadTempDataFileContents
	 * @throws JAXBException 
	 * @throws LimelightWebappFileUploadFileSystemException 
	 * @throws IOException 
	 */
	private List<LimelightUploadTempDataFileContentsAndAssocData> getLimelightUploadTempDataFileContentsListForTempSubdir( File tempSubdir ) throws JAXBException, LimelightWebappFileUploadFileSystemException, IOException {
		
		List<LimelightUploadTempDataFileContentsAndAssocData> limelightUploadTempDataFileContentsAndAssocDataList = new ArrayList<>();
		
		File[] tempSubdirFiles = tempSubdir.listFiles();
		if ( tempSubdirFiles.length > 0 ) {
			//  At least 1 file in subdir.  
			
			// Process files that filename start with LimelightXMLFileUploadWebConstants.UPLOAD_FILE_DATA_FILE_PREFIX
			
			JAXBContext jaxbContext = JAXBContext.newInstance( LimelightUploadTempDataFileContents.class );
			Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
			for ( File tempSubdirFile : tempSubdirFiles ) {
				String tempSubdirFilename = tempSubdirFile.getName();
				if ( tempSubdirFilename.startsWith( LimelightXMLFileUploadWebConstants.UPLOAD_FILE_DATA_FILE_PREFIX ) ) {
					//  Unmarshal (read) the object from the file
					LimelightUploadTempDataFileContents limelightUploadTempDataFileContents = null;
					Object objectFromFile = null;
					InputStream inputStream = null;
					try {
						inputStream = new FileInputStream( tempSubdirFile );
						XMLInputFactory xmlInputFactory = XMLInputFactory_XXE_Safe_Creator.xmlInputFactory_XXE_Safe_Creator();
						XMLStreamReader xmlStreamReader = xmlInputFactory.createXMLStreamReader(new StreamSource( inputStream ) );
						objectFromFile = unmarshaller.unmarshal( xmlStreamReader );
					} catch ( Exception e ) {
						String msg = "Failed to read and unmarshall data from file: " + tempSubdirFile.getCanonicalPath();
						log.error( msg );
						throw new LimelightWebappFileUploadFileSystemException(msg,e);
					} finally {
						if ( inputStream != null ) {
							inputStream.close();
						}
					}
					if ( ! ( objectFromFile instanceof LimelightUploadTempDataFileContents ) ) {
						String msg = "object unmarshalled from file is incorrect type: " + objectFromFile.getClass().getCanonicalName();
						log.error( msg );
						throw new LimelightWebappFileUploadFileSystemException(msg);
					}
					try {
						limelightUploadTempDataFileContents = 
								(LimelightUploadTempDataFileContents) objectFromFile;
					} catch ( Exception e ) {
						String msg = "object unmarshalled from file is incorrect type: " + objectFromFile.getClass().getCanonicalName();
						log.error( msg );
						throw new LimelightWebappFileUploadFileSystemException(msg, e);
					}
					LimelightUploadTempDataFileContentsAndAssocData limelightUploadTempDataFileContentsAndAssocData = new LimelightUploadTempDataFileContentsAndAssocData(); 
					limelightUploadTempDataFileContentsAndAssocData.limelightUploadTempDataFileContents = limelightUploadTempDataFileContents;
					//  Get length of uploaded file
					File uploadedFile = null;
					try {
						uploadedFile = new File( tempSubdir, limelightUploadTempDataFileContents.getSavedToDiskFilename() );
						limelightUploadTempDataFileContentsAndAssocData.fileLength = uploadedFile.length();
					} catch ( Exception e ) {
						String msg = "Error getting length of uploaded file: " + uploadedFile.getAbsolutePath();
						log.error( msg );
						throw new LimelightWebappFileUploadFileSystemException(msg, e);
					}
					limelightUploadTempDataFileContentsAndAssocDataList.add( limelightUploadTempDataFileContentsAndAssocData );
				}
			}
		}
		return limelightUploadTempDataFileContentsAndAssocDataList;
	}

	/**
	 * @param submitterKey
	 * @param tempSubdir
	 * @return - true if valid, false if invalid
	 * @throws Exception
	 */
	private boolean validateSubmitterKeyForSubmitSameMachine( String submitterKey, File tempSubdir ) throws Exception {
		File submitterKeyFile = new File( 
				tempSubdir, 
				FileUploadSubmitterPgmSameMachineConstants.SUBMITTER_KEY_FILENAME );
		if ( ! submitterKeyFile.exists() ) {
			String msg = "No Submitter key on server when submitterSameMachine is true.";
			log.warn( msg );
			return false;
		}
		String submitterKeyFileLine = null;
		BufferedReader reader = null;
		try {
			reader = new BufferedReader( new FileReader(submitterKeyFile));
			submitterKeyFileLine = reader.readLine();
		} catch ( Exception e ) {
			String msg = "Exception reading submitter key in file.";
			log.error( msg, e );
			throw e;
		} finally {
			if ( reader != null ) {
				reader.close();
			}
		}
		if ( ! submitterKey.equals( submitterKeyFileLine ) ) {
			String msg = "Submitter key on server does not match submitter key in request.";
			log.warn( msg );
			return false;
		}
		return true;
	}
	
	
	/////////////////////////////////
	/////   Classes for internal holders
	private static class LimelightUploadTempDataFileContentsAndAssocData {
		LimelightUploadTempDataFileContents limelightUploadTempDataFileContents;
		long fileLength;
	}
	private static class ProcessFilesInTempUploadDirResult {
		List<LimelightUploadTempDataFileContentsAndAssocData> limelightUploadTempDataFileContentsAndAssocDataList;
	}
	

	/**
	 * Params to internal method webserviceMethod_Internal
	 *
	 */
	private static class WebserviceMethod_Internal_Params {
		
		SubmitImport_FinalSubmit_Request_Base webservice_Request_Base;

		int projectId = -1;
		long uploadKey = -1;
		
		int userId;
		
		SubmitImport_FinalSubmit_Response_Base webservice_Result_Base; 
		
		//  Entries from Submitter Pgm
		
		/**
		 * For submitting on same machine
		 */
		boolean submitterSameMachine;
		/**
		 * For submitting on same machine
		 */
		String submitterKey;
		
		String searchPath;
	}

	/**
	 * Results from internal method webserviceMethod_Internal
	 *
	 */
	private static class WebserviceMethod_Internal_Results {

		boolean returnBadRequestStatusCode;
		
		//  for submitter program
		String importerSubDir;
	}
	
	
	/////////////////////////////////
	/////   Classes for webservice request and response
	/**
	 * 
	 *
	 */
//	public static class WebserviceRequest {
//		private String projectIdentifier;
//		private String uploadKey;
//		/**
//		 * For submitting on same machine
//		 */
//		boolean submitterSameMachine;
//		/**
//		 * For submitting on same machine
//		 */
//		String submitterKey;
//		String searchName;
//		String searchPath;
//		List<WebserviceRequest_SingleFileItem> fileItems;
//		
//		public String getProjectIdentifier() {
//			return projectIdentifier;
//		}
//		public void setProjectIdentifier(String projectIdentifier) {
//			this.projectIdentifier = projectIdentifier;
//		}
//		public String getUploadKey() {
//			return uploadKey;
//		}
//		public void setUploadKey(String uploadKey) {
//			this.uploadKey = uploadKey;
//		}
//		public boolean isSubmitterSameMachine() {
//			return submitterSameMachine;
//		}
//		public void setSubmitterSameMachine(boolean submitterSameMachine) {
//			this.submitterSameMachine = submitterSameMachine;
//		}
//		public String getSubmitterKey() {
//			return submitterKey;
//		}
//		public void setSubmitterKey(String submitterKey) {
//			this.submitterKey = submitterKey;
//		}
//		public String getSearchName() {
//			return searchName;
//		}
//		public void setSearchName(String searchName) {
//			this.searchName = searchName;
//		}
//		public String getSearchPath() {
//			return searchPath;
//		}
//		public void setSearchPath(String searchPath) {
//			this.searchPath = searchPath;
//		}
//		public List<WebserviceRequest_SingleFileItem> getFileItems() {
//			return fileItems;
//		}
//		public void setFileItems(List<WebserviceRequest_SingleFileItem> fileItems) {
//			this.fileItems = fileItems;
//		}
//	}
//	
//
//	/**
//	 * 
//	 *
//	 */
//	public static class WebserviceRequest_SingleFileItem {
//		
//		private String uploadedFilename;
//		private Integer fileType;
//		private Integer fileIndex;
//		private Boolean isLimelightXMLFile;
//		//  Following are only for submitting on same machine
//		private String filenameOnDiskWithPathSubSameMachine;
//		
//		public String getUploadedFilename() {
//			return uploadedFilename;
//		}
//		public void setUploadedFilename(String uploadedFilename) {
//			this.uploadedFilename = uploadedFilename;
//		}
//		public Integer getFileType() {
//			return fileType;
//		}
//		public void setFileType(Integer fileType) {
//			this.fileType = fileType;
//		}
//		public Integer getFileIndex() {
//			return fileIndex;
//		}
//		public void setFileIndex(Integer fileIndex) {
//			this.fileIndex = fileIndex;
//		}
//		public Boolean getIsLimelightXMLFile() {
//			return isLimelightXMLFile;
//		}
//		public void setIsLimelightXMLFile(Boolean isLimelightXMLFile) {
//			this.isLimelightXMLFile = isLimelightXMLFile;
//		}
//		public String getFilenameOnDiskWithPathSubSameMachine() {
//			return filenameOnDiskWithPathSubSameMachine;
//		}
//		public void setFilenameOnDiskWithPathSubSameMachine(String filenameOnDiskWithPathSubSameMachine) {
//			this.filenameOnDiskWithPathSubSameMachine = filenameOnDiskWithPathSubSameMachine;
//		}
//		
//	}
//	
//	/**
//	 * 
//	 *
//	 */
//	public static class WebserviceResult {
//		private boolean statusSuccess;
//		private boolean projectLocked;
//		private boolean submittedScanFileNotAllowed;
//		private String importerSubDir;
//		
//		public boolean isStatusSuccess() {
//			return statusSuccess;
//		}
//		public void setStatusSuccess(boolean statusSuccess) {
//			this.statusSuccess = statusSuccess;
//		}
//		public boolean isProjectLocked() {
//			return projectLocked;
//		}
//		public void setProjectLocked(boolean projectLocked) {
//			this.projectLocked = projectLocked;
//		}
//		public boolean isSubmittedScanFileNotAllowed() {
//			return submittedScanFileNotAllowed;
//		}
//		public void setSubmittedScanFileNotAllowed(boolean submittedScanFileNotAllowed) {
//			this.submittedScanFileNotAllowed = submittedScanFileNotAllowed;
//		}
//		public String getImporterSubDir() {
//			return importerSubDir;
//		}
//		public void setImporterSubDir(String importerSubDir) {
//			this.importerSubDir = importerSubDir;
//		}
//		
//
//	}



}
