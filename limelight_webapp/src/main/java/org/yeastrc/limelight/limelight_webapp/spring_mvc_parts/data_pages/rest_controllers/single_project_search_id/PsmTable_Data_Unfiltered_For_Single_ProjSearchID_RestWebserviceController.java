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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.single_project_search_id;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_IF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_Utils;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmTblData_ForSearchIdSearcher.PsmTblData_ForSearchIdSearcher_ResultEntry;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmTblData_ForSearchIdSearcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.Gzip_ByteArray_To_ByteArray_IF;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * 
 * !!!  WARNING:  Webservice Response is CACHED  !!!!
 * 
 * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
 * 
 * 
 * 
 * Retrieve PSM data from psm_tbl (all fields) for Project Search ID - 
 * 
 *   !!!   Excludes PSM with is_decoy = 1 UNLESS request property include_DecoyPSMs is true  !!! 
 *
 */
@RestController
public class PsmTable_Data_Unfiltered_For_Single_ProjSearchID_RestWebserviceController 

implements
InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 
{
  
	private static final Logger log = LoggerFactory.getLogger( PsmTable_Data_Unfiltered_For_Single_ProjSearchID_RestWebserviceController.class );

	/**
	 * Path for this Controller.  !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
	 */
	private static final String CONTROLLER_PATH = AA_RestWSControllerPaths_Constants.PSM_TABLE_DATA_UNFILTERED_FOR_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER_VERSION_0003;
	
	/**
	 * Path, updated for use by Cached Response Mgmt ( Cached_WebserviceResponse_Management )
	 */
	private static final String CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT = Cached_WebserviceResponse_Management_Utils.translate_ControllerPath_For_CachedResponseMgmt( CONTROLLER_PATH );
	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;

	@Autowired
	private Cached_WebserviceResponse_Management_IF cached_WebserviceResponse_Management;

	@Autowired
	private Gzip_ByteArray_To_ByteArray_IF gzip_ByteArray_To_ByteArray;
	
	@Autowired
	private RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF restControllerUtils__Request_Accept_GZip_Response_Set_GZip;
	
	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;

	@Autowired
	private PsmTblData_ForSearchIdSearcher_IF psmTblData_ForSearchIdSearcher;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public PsmTable_Data_Unfiltered_For_Single_ProjSearchID_RestWebserviceController() {
		super();
//		log.warn( "constructor no params called" );
	}

	/* 
	 * Spring LifeCycle Method
	 * 
	 * (non-Javadoc)
	 * @see org.springframework.beans.factory.InitializingBean#afterPropertiesSet()
	 */
	@Override
	public void afterPropertiesSet() throws Exception {
		try {
			cached_WebserviceResponse_Management.registerControllerPathForCachedResponse_RequiredToCallAtWebappStartup( CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, this );
			
		} catch (Exception e) {
			String msg = "In afterPropertiesSet(): Exception in processing";
			log.error(msg);
			throw e;
		}
	}
	
	//  Convert result object graph to JSON in byte[] in the controller body so can cache it

	//  These 2 annotations work the same
	
	//  Mapping the value in {} in the path to parameters in the method:
	//
	//    The value in {} has to match the value in the "value = " in the @PathVariable
	//    If they don't match, a 500 error is thrown and nothing is logged and the method is not called.
	//    If there is no "value = " in the @PathVariable, the method parameter name is used.
	
	@PostMapping( 
			path = {
					AA_RestWSControllerPaths_Constants.PATH_START_ALL
					+ CONTROLLER_PATH
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  webserviceMethod(
    		
    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	
    	try {
//    		log.warn( "peptideView(...) called" );

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs
    		
    		if ( postBody == null || postBody.length == 0 ) {
    			log.warn( "No Post Body" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );

    		WebserviceRequest webserviceRequest =
    				unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

    		Integer projectSearchId = webserviceRequest.projectSearchId;
   			
    		if ( projectSearchId == null ) {
    			log.warn( "No Project Search Ids" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		List<Integer> projectSearchIdsForValidate = new ArrayList<>( 1 );
    		projectSearchIdsForValidate.add( projectSearchId );

    		////////////////
    		
    		//  AUTH - validate access
    		
    		//  throws an exception if access is not valid that is turned into a webservice response by Spring
    		
    		//  Comment out result since not use it
//    		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
    		validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.validatePublicAccessCodeReadAllowed( projectSearchIdsForValidate, httpServletRequest );
    		
    		////////////////

    		{ // Return cached value if available

    			boolean accept_GZIP = restControllerUtils__Request_Accept_GZip_Response_Set_GZip.does_HttpServletRequest_Accept_GZip( httpServletRequest );
    			
    			byte[] cachedResponse = cached_WebserviceResponse_Management.getCachedResponse( accept_GZIP, CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, postBody, this );
    			
    			if ( cachedResponse != null ) {
    				
    				if ( accept_GZIP ) {
    					restControllerUtils__Request_Accept_GZip_Response_Set_GZip.set_GZIP_On_HttpServletResponse( httpServletResponse );
    				}
    				
    				return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( cachedResponse );
    			}
    		}
    		
    		Integer searchId = searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
			if ( searchId == null ) {
				String msg = "No searchId for projectSearchId: " + projectSearchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
    		Map<Integer,Integer> projectSearchIdMapToSearchId = new HashMap<>();
    		projectSearchIdMapToSearchId.put( projectSearchId, searchId );
    		
    		List<PsmTblData_ForSearchIdSearcher_ResultEntry> psmTblData_List = 
    				psmTblData_ForSearchIdSearcher
    				.getPsmTblData_ForSearchId( searchId, webserviceRequest.include_DecoyPSM );

    		List<WebserviceResult_PerPSM_Entry> psms = new ArrayList<>( psmTblData_List.size() );

    		for ( PsmTblData_ForSearchIdSearcher_ResultEntry dbEntry : psmTblData_List ) {
    			WebserviceResult_PerPSM_Entry resultEntry = new WebserviceResult_PerPSM_Entry();
    			resultEntry.psmId = dbEntry.getPsmId();
    			resultEntry.reportedPeptideId = dbEntry.getReportedPeptideId();
    			resultEntry.charge = dbEntry.getCharge();
    			resultEntry.scanNumber = dbEntry.getScanNumber();
    			resultEntry.searchScanFileId = dbEntry.getSearchScanFileId();
    			resultEntry.retentionTimeSeconds = dbEntry.getRetentionTimeSeconds();
    			resultEntry.precursor_M_Over_Z = dbEntry.getPrecursor_M_Over_Z();
    			resultEntry.hasModifications = dbEntry.isHasModifications();
    			resultEntry.hasOpenModifications = dbEntry.isHasOpenModifications();
    			resultEntry.hasReporterIons = dbEntry.isHasReporterIons();
    			resultEntry.independentDecoyPSM = dbEntry.isIndependentDecoyPSM();
    			resultEntry.decoyPSM = dbEntry.isDecoyPSM();

    			psms.add(resultEntry);
    		}
			    		
    		WebserviceResult result = new WebserviceResult();
    		result.psms = psms;
    		
    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( result );

    		
    		byte[] responseAsJSON_GZIPPED = gzip_ByteArray_To_ByteArray.gzip_ByteArray_To_ByteArray(responseAsJSON);
    		

			boolean accept_GZIP = restControllerUtils__Request_Accept_GZip_Response_Set_GZip.does_HttpServletRequest_Accept_GZip( httpServletRequest );
			

    		{ // Save cached value 
    			
    			cached_WebserviceResponse_Management.putCachedResponse_GZIPPED( CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, postBody, responseAsJSON_GZIPPED, this );
    		}
    		
    		byte[] responseAsJSON_FINAL = responseAsJSON;
    		

			if ( accept_GZIP ) {
				restControllerUtils__Request_Accept_GZip_Response_Set_GZip.set_GZIP_On_HttpServletResponse( httpServletResponse );
				
				responseAsJSON_FINAL = responseAsJSON_GZIPPED;
			}
			
    		
    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON_UTF8).body( responseAsJSON_FINAL );

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
     * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
     *
     */
    public static class WebserviceRequest {

    	private Integer projectSearchId;
    	private boolean include_DecoyPSM = false; //  Return PSM with 'is_decoy' true.  Default to false

		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}
		public void setInclude_DecoyPSM(boolean include_DecoyPSM) {
			this.include_DecoyPSM = include_DecoyPSM;
		}
    }
    
    /**
     * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
     *
     */
    public static class WebserviceResult {
    	
    	List<WebserviceResult_PerPSM_Entry> psms;

		public List<WebserviceResult_PerPSM_Entry> getPsms() {
			return psms;
		}
    }

    /**
     * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
     *
     */
    public static class WebserviceResult_PerPSM_Entry {
    	
    	long psmId;
    	int reportedPeptideId;
    	int charge;
    	int scanNumber;
    	Integer searchScanFileId; // Can be null
		Float retentionTimeSeconds;
    	Double precursor_M_Over_Z;
    	boolean hasModifications;
    	boolean hasOpenModifications;
    	boolean hasReporterIons;
     	boolean independentDecoyPSM;
     	boolean decoyPSM;  

		public boolean isHasModifications() {
			return hasModifications;
		}
		public boolean isHasOpenModifications() {
			return hasOpenModifications;
		}
		public boolean isHasReporterIons() {
			return hasReporterIons;
		}
		public int getCharge() {
			return charge;
		}
		public Float getRetentionTimeSeconds() {
			return retentionTimeSeconds;
		}
		public Double getPrecursor_M_Over_Z() {
			return precursor_M_Over_Z;
		}
		public long getPsmId() {
			return psmId;
		}
		public int getScanNumber() {
			return scanNumber;
		}
		public Integer getSearchScanFileId() {
			return searchScanFileId;
		}
		public int getReportedPeptideId() {
			return reportedPeptideId;
		}
		public boolean isIndependentDecoyPSM() {
			return independentDecoyPSM;
		}
		public boolean isDecoyPSM() {
			return decoyPSM;
		}
    }

}


