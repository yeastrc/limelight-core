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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.controllers_other_than_for_pages;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dao.FileImportTrackingRun_Shared_Get_DAO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dao.FileImportTracking_Shared_Get_DAO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingRunDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.run_importer_to_web_app_objects.RunImporterToWebAppOnComplete_Request;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.run_importer_to_web_app_objects.RunImporterToWebAppOnComplete_Response;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.services.SendEmailForRunImportFinishServiceIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Marshal_RestRequest_Object_ToXML;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_XML_ToObject;

/**
 * Called by Run Importer (for submitted imports) when the Limelight XML and/or Scan Files importer finishes
 *
 */
@RestController
public class RunImporter_ImporterFinish_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( RunImporter_ImporterFinish_RestWebserviceController.class );
	
	@Autowired
	private Unmarshal_RestRequest_XML_ToObject unmarshal_RestRequest_XML_ToObject;
	
	@Autowired
	private Marshal_RestRequest_Object_ToXML marshal_RestRequest_Object_ToXML;
	
	@Autowired
	private SendEmailForRunImportFinishServiceIF sendEmailForRunImportFinishService;
	
	
	@PostMapping( 
			path = { 
					AA_OtherRestControllerPaths_Constants.PATH_START_ALL
					+ AA_OtherRestControllerPaths_Constants.RUN_IMPORTER_IMPORT_FINISH_REST_WEBSERVICE_CONTROLLER
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

    	try {

//    		log.warn( "Header Data: " );
//    		
//    		Enumeration<String> headerNames = httpServletRequest.getHeaderNames();
//    		
//    		while ( headerNames.hasMoreElements() ) {
//    			String headerName = headerNames.nextElement();
//    			log.warn( "headerName: " + headerName );
//    			String headerContent = httpServletRequest.getHeader(headerName);
//    			log.warn( "headerName: " + headerName + ", headerContent: " + headerContent );
//    		}

    		//    	String postBodyString = new String( postBody );

    		RunImporterToWebAppOnComplete_Request webserviceRequest = null;

    		Object webserviceRequestAsObject = unmarshal_RestRequest_XML_ToObject.getObjectFromXMLByteArray( postBody );
    		if ( webserviceRequestAsObject == null ) {
    			log.warn("webserviceRequestAsObject == null");
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		try {
    			webserviceRequest = (RunImporterToWebAppOnComplete_Request) webserviceRequestAsObject;
    		} catch ( Exception e ) {
    			final String msg = "Failed to cast returned webserviceRequestAsObject from XML to RunImporterToWebAppOnComplete_Request."
    					+ " webserviceRequestAsObject.getClass(): " + webserviceRequestAsObject.getClass();
    			log.warn(msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		if ( webserviceRequest.getTrackingId() == null ) {
    			final String msg = "TrackingId is empty.";
    			log.warn(msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( webserviceRequest.getRunId() == null ) {
    			final String msg = "RunId is empty.";
    			log.warn(msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( webserviceRequest.getSdFSOdsjaklOWQJLwuiroKXLNOuwoincvnio() == null 
    				|| ( ! webserviceRequest.getSdFSOdsjaklOWQJLwuiroKXLNOuwoincvnio().booleanValue() )) {
    			final String msg = "sdFSOdsjaklOWQJLwuiroKXLNOuwoincvnio is empty or not true.";
    			log.warn(msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
//    		log.info( "RunImporter_ImporterFinish_RestWebserviceController: TrackingId: " 
//    				+ webserviceRequest.getTrackingId() + ", RunId: " + webserviceRequest.getRunId() );

    		FileImportTrackingDTO fileImportTrackingDTO =
    				FileImportTracking_Shared_Get_DAO.getInstance().getItem( webserviceRequest.getTrackingId() );
    		if ( fileImportTrackingDTO == null ) {
    			String msg = "fileImportTrackingDTO == null: webserviceRequest.trackingId: " 
    					+ webserviceRequest.getTrackingId() ;
    			log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		FileImportTrackingRunDTO fileImportTrackingRunDTO =
    				FileImportTrackingRun_Shared_Get_DAO.getInstance().getItem( webserviceRequest.getRunId() );
    		if ( fileImportTrackingRunDTO == null ) {
    			String msg = "fileImportTrackingRunDTO == null: webserviceRequest.runId: "
    					+ webserviceRequest.getRunId() ;
    			log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		sendEmailForRunImportFinishService
    		.sendEmailForRunImportFinishInternalService( fileImportTrackingDTO, fileImportTrackingRunDTO );

    		RunImporterToWebAppOnComplete_Response webserviceResponse = new RunImporterToWebAppOnComplete_Response();
    		webserviceResponse.setStatusSuccess( true );

    		byte[] responseAsXML = marshal_RestRequest_Object_ToXML.getXMLByteArrayFromObject( webserviceResponse );

    		return ResponseEntity.ok().contentType( MediaType.APPLICATION_XML ).body( responseAsXML );

    	} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {
    		
    		//  only rethrow Error Response Exceptions 
    		throw e;
    		
    	} catch ( Exception e ) {
    		
    		try {
    			String msg = "Failed in controller: ";
    			log.error( msg, e );
    			//			throw new Limelight_WS_InternalServerError_Exception();

    			RunImporterToWebAppOnComplete_Response webserviceResponse = new RunImporterToWebAppOnComplete_Response();
    			webserviceResponse.setStatusSuccess( false );

    			byte[] responseAsXML = marshal_RestRequest_Object_ToXML.getXMLByteArrayFromObject( webserviceResponse );

    			return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR ).contentType( MediaType.APPLICATION_XML ).body( responseAsXML );

    		} catch ( Exception e2 ) {
    			String msg = "Failed to return status HttpStatus.INTERNAL_SERVER_ERROR in controller: ";
    			log.error( msg, e2 );

    			throw e;
    		}
    	}
    }
    
}
