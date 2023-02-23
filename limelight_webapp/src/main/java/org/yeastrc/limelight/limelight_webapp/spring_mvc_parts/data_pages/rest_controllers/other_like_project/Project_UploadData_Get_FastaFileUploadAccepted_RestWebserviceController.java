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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_Get_FASTAFileUploadAccepted_Request_PgmXML;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_Get_FASTAFileUploadAccepted_Response_Base;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_Get_FASTAFileUploadAccepted_Response_PgmXML;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_Init_Response_PgmXML;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectIdIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId.Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId_Result;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsFileObjectStorageFileImportAllowedViaWebSubmit_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Marshal_RestRequest_Object_ToXML;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_XML_ToObject;

/**
 * For Upload Data, Get if Upload FASTA File is supported
 * 
 * Valid Currently for Submit Program
 * 
 */
@RestController
public class Project_UploadData_Get_FastaFileUploadAccepted_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( Project_UploadData_Get_FastaFileUploadAccepted_RestWebserviceController.class );

	@Autowired
	private Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectIdIF validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId;
	
	@Autowired
	private IsFileObjectStorageFileImportAllowedViaWebSubmit_IF isFileObjectStorageFileImportAllowedViaWebSubmit;
	
	@Autowired
	private Unmarshal_RestRequest_XML_ToObject unmarshal_RestRequest_XML_ToObject;
	
	@Autowired
	private Marshal_RestRequest_Object_ToXML marshal_RestRequest_Object_ToXML;



	//    Submit Program: XML
	
	//  These 2 annotations work the same
	
	//  Mapping the value in {} in the path to parameters in the method:
	//
	//    The value in {} has to match the value in the "value = " in the @PathVariable
	//    If they don't match, a 500 error is thrown and nothing is logged and the method is not called.
	//    If there is no "value = " in the @PathVariable, the method parameter name is used.
	
	@PostMapping( 
			path = { 
					AA_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_RestWSControllerPaths_Constants.PROJECT__UPLOAD_DATA_UPLOAD_GET_FASTA_FILE_UPLOAD_ACCEPTED_SUBMIT_PROGRAM_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_XML_VALUE, produces = MediaType.APPLICATION_XML_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  webserviceMethod_XML(

    		//  Remove since not in the 'path' in @PostMapping
//			@PathVariable(value = AA_RestWSControllerPaths_Constants.PATH_PARAMETER_LABEL_WEBSERVICE_SYNC_TRACKING) 
//    		String webserviceSyncTracking,
    		
    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	
//    	String postBodyString = new String( postBody );
    	
    	SubmitImport_Get_FASTAFileUploadAccepted_Request_PgmXML webserviceRequest = null;

		Object webserviceRequestAsObject = unmarshal_RestRequest_XML_ToObject.getObjectFromXMLByteArray( postBody );
		if ( webserviceRequestAsObject == null ) {
			log.warn("webserviceRequestAsObject == null");
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		try {
			webserviceRequest = (SubmitImport_Get_FASTAFileUploadAccepted_Request_PgmXML) webserviceRequestAsObject;
		} catch ( Throwable e ) {
			final String msg = "Failed to cast returned webserviceRequestAsObject from XML to SubmitImport_Get_FASTAFileUploadAccepted_Request_PgmXML."
					+ " webserviceRequestAsObject.getClass(): " + webserviceRequestAsObject.getClass();
			log.warn(msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		if ( StringUtils.isEmpty( webserviceRequest.getUserSubmitImportProgramKey() ) ) {
			final String msg = "UserSubmitImportProgramKey is empty.";
			log.warn(msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		String userSubmitImportProgramKey_First_5_characters = webserviceRequest.getUserSubmitImportProgramKey().substring(0, 5);
		
		SubmitImport_Get_FASTAFileUploadAccepted_Response_PgmXML webserviceResult = new SubmitImport_Get_FASTAFileUploadAccepted_Response_PgmXML();

		if ( webserviceRequest.getSubmitProgramVersionNumber() == null ) {
			
			log.warn( "webserviceRequest.getSubmitProgramVersionNumber() == null. webserviceRequest.getProjectIdentifier(): " + webserviceRequest.getProjectIdentifier()
					+ ", userSubmitImportProgramKey_First_5_characters: " + userSubmitImportProgramKey_First_5_characters );
			
			webserviceResult.setStatusSuccess( false );

			webserviceResult.setStatusFail_ErrorMessage( "Submit Import Program version is too old.  Get program from limelight webapp submitting to." );

			byte[] responseAsXML = marshal_RestRequest_Object_ToXML.getXMLByteArrayFromObject( webserviceResult );

			//  TODO  Return other than 200 code?
			return ResponseEntity.ok().contentType( MediaType.APPLICATION_XML ).body( responseAsXML );
		}

		int projectId = 0;
		try {
			projectId = Integer.parseInt( webserviceRequest.getProjectIdentifier() );

		} catch ( RuntimeException e ) {
			log.warn( "Project Identifier not parsable to int: " +  webserviceRequest.getProjectIdentifier() );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		{
			SubmitImport_Init_Response_PgmXML submitImport_Init_Response_PgmXML = new SubmitImport_Init_Response_PgmXML();

			Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId_Result validateResult =
					validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId
					.validateProjectOwnerAllowed( 
							webserviceRequest.getUserSubmitImportProgramKey(),
							projectId, 
							submitImport_Init_Response_PgmXML );

			if ( ! validateResult.isSuccess() ) {

				webserviceResult.setStatusSuccess( false );

				if ( log.isInfoEnabled() ) {

					if ( validateResult.getUserId() == null ) {
						log.info( "Validate Access: Result is Fail: Cannot find User for UserSubmitImportProgramKey.  Error mesage returned to Submit program: " + webserviceResult.getStatusFail_ErrorMessage() );
					} else {
						log.info( "Validate Access: Result is Fail: User does not have Project Owner access or project is locked.  UserId: " + validateResult.getUserId() 
						+ ", projectId: " + projectId
						+ ".  Error mesage returned to Submit program: " + webserviceResult.getStatusFail_ErrorMessage() );
					}
				}
				
				webserviceResult.setStatusFail_ErrorMessage( submitImport_Init_Response_PgmXML.getStatusFail_ErrorMessage() );
				
				//  Reason set in validateResult by method validateProjectOwnerAllowed(...)

				byte[] responseAsXML = marshal_RestRequest_Object_ToXML.getXMLByteArrayFromObject( webserviceResult );

				//  TODO  Return other than 200 code?
				return ResponseEntity.ok().contentType( MediaType.APPLICATION_XML ).body( responseAsXML );
			}

		}

		WebserviceMethod_Internal_Params webserviceMethod_Internal_Params = new WebserviceMethod_Internal_Params();
		webserviceMethod_Internal_Params.webserviceResult = webserviceResult;
				
    	webserviceMethod_Internal( webserviceMethod_Internal_Params);

		byte[] responseAsXML = marshal_RestRequest_Object_ToXML.getXMLByteArrayFromObject( webserviceResult );

		return ResponseEntity.ok().contentType( MediaType.APPLICATION_XML ).body( responseAsXML );
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
	private void webserviceMethod_Internal( WebserviceMethod_Internal_Params webserviceMethod_Internal_Params ) throws Exception {
		
		if ( isFileObjectStorageFileImportAllowedViaWebSubmit.isFileObjectStorageFileImportAllowedViaWebSubmit() ) {
			
			webserviceMethod_Internal_Params.webserviceResult.setFastaFileSubmit_Configured(true);
		}
		
		webserviceMethod_Internal_Params.webserviceResult.setStatusSuccess(true);
	}

	/**
	 * Params to internal method webserviceMethod_Internal
	 *
	 */
	private static class WebserviceMethod_Internal_Params {

		SubmitImport_Get_FASTAFileUploadAccepted_Response_Base webserviceResult; 
		
	}


}
