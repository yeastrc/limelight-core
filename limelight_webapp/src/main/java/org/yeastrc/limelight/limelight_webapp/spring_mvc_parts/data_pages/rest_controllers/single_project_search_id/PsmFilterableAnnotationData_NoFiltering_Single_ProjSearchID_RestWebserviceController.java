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
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
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
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.searchers.Psm_FilterableAnnotationData_AllFor_SearchId_Searcher.Psm_FilterableAnnotationData_AllFor_SearchId_Searcher_ResultItem;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.searchers.Psm_FilterableAnnotationData_AllFor_SearchId_Searcher_IF;
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
 * Retrieve PSM Filterable Annotation data for Project Search ID, NO Filtering (For All PSMs for Search)
 *
 */
@RestController
public class PsmFilterableAnnotationData_NoFiltering_Single_ProjSearchID_RestWebserviceController 

implements
InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 
{
  
	private static final Logger log = LoggerFactory.getLogger( PsmFilterableAnnotationData_NoFiltering_Single_ProjSearchID_RestWebserviceController.class );

	/**
	 * Path for this Controller.  !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
	 */
	private static final String CONTROLLER_PATH = AA_RestWSControllerPaths_Constants.PSM_FILTERABLE_ANNOTATION_DATA_NO_FILTERING_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER_VERSION_0004;
	
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
	private Psm_FilterableAnnotationData_AllFor_SearchId_Searcher_IF psm_FilterableAnnotationData_AllFor_SearchId_Searcher;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public PsmFilterableAnnotationData_NoFiltering_Single_ProjSearchID_RestWebserviceController() {
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
    		List<Integer> psmFilterableAnnotationTypeIds = webserviceRequest.psmFilterableAnnotationTypeIds;
   			

    		if ( projectSearchId == null ) {
    			log.warn( "No Project Search Ids" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( psmFilterableAnnotationTypeIds == null || psmFilterableAnnotationTypeIds.isEmpty() ) {
    			log.warn( "No psmFilterableAnnotationTypeIds" );
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
			
			
			WebserviceResult webserviceResult = new WebserviceResult();
			
			
			//  Sort so match the order of the output
			Collections.sort( psmFilterableAnnotationTypeIds );
    			
			List<Psm_FilterableAnnotationData_AllFor_SearchId_Searcher_ResultItem> dbResultItemList =
					psm_FilterableAnnotationData_AllFor_SearchId_Searcher.getPsmFilterableAnnotationDataList( searchId, psmFilterableAnnotationTypeIds, webserviceRequest.include_DecoyPSM );
			
			if ( dbResultItemList.isEmpty() ) {
				
				
				
			} else {

				Collections.sort( dbResultItemList, new Comparator<Psm_FilterableAnnotationData_AllFor_SearchId_Searcher_ResultItem>() {
					@Override
					public int compare(Psm_FilterableAnnotationData_AllFor_SearchId_Searcher_ResultItem a,
							Psm_FilterableAnnotationData_AllFor_SearchId_Searcher_ResultItem b) {
						
						//  Order on Psm Id, Ann Type Id
						
						if ( a.getPsmId() < b.getPsmId() ) {
							return -1;
						}
						if ( a.getPsmId() > b.getPsmId() ) {
							return 1;
						}
						if ( a.getAnnotationTypeId() < b.getAnnotationTypeId() ) {
							return -1;
						}
						if ( a.getAnnotationTypeId() > b.getAnnotationTypeId() ) {
							return 1;
						}
						throw new LimelightInternalErrorException( "Not Valid for 2 recorsd with same Psm Id and Annotation Type Id" );
					}
				} );
				
				
				long starting_PsmId = dbResultItemList.get(0).getPsmId();
				

				boolean anyResults_Decoy = false;
				boolean anyResults_IndependentDecoy = false;
				
				boolean psmIds_AreSequential = true;
				int psmCount = 0;
				
				{
					final long prev_PsmId_INITIAL_VALUE = -1;
					final int annotationTypeIdIndex_INITIAL_VALUE = -1;
					
					long prev_PsmId = prev_PsmId_INITIAL_VALUE;
					int annotationTypeIdIndex = annotationTypeIdIndex_INITIAL_VALUE;
					
	
					for ( Psm_FilterableAnnotationData_AllFor_SearchId_Searcher_ResultItem dbResultItem : dbResultItemList ) {
	
						annotationTypeIdIndex++;
						
						if ( prev_PsmId != dbResultItem.getPsmId() ) {
							annotationTypeIdIndex = 0;  // Reset to index zero
							
							psmCount++; // increment PsmId counter
							
							if ( prev_PsmId != prev_PsmId_INITIAL_VALUE && prev_PsmId != dbResultItem.getPsmId()  ) {
								
								if ( ( prev_PsmId + 1 ) != dbResultItem.getPsmId() ) {
									psmIds_AreSequential = false;
								}
							}
							
							prev_PsmId = dbResultItem.getPsmId();
						}
						
						if ( annotationTypeIdIndex >= psmFilterableAnnotationTypeIds.size() ) {
							String msg = "Unexpected result from DB. In Preprocess Step ( annotationTypeIdIndex >= psmFilterableAnnotationTypeIds.size() ) ";
							log.error(msg);
							throw new LimelightInternalErrorException(msg);
						}
						
						// Validate Expected Annotation Type Id
						
						if ( dbResultItem.getAnnotationTypeId() != psmFilterableAnnotationTypeIds.get(annotationTypeIdIndex) ) {
							String msg = "Unexpected result from DB. In Preprocess Step ( resultItem.getAnnotationTypeId() != psmFilterableAnnotationTypeIds.get(annotationTypeIdIndex) ). "
									+ "resultItem.getAnnotationTypeId(): " + dbResultItem.getAnnotationTypeId() + ", psmFilterableAnnotationTypeIds.get(annotationTypeIdIndex): " + psmFilterableAnnotationTypeIds.get(annotationTypeIdIndex);
							log.error(msg);
							throw new LimelightInternalErrorException(msg);
						}
						
						if ( dbResultItem.isDecoyPSM() ) {
							anyResults_Decoy = true;
						}
						if ( dbResultItem.isIndependentDecoyPSM() ) {
							anyResults_IndependentDecoy = true;
						}
					}
				}
				
				///////////
				
				//   TODO  ZZZ  FAKE FORCE  For Testing Only
//				psmIds_AreSequential = false;
//
//				anyResults_Decoy = true;
//				anyResults_IndependentDecoy = true;
				
				///////////
				
		    	long[] psmIds_OffsetFromPrevious_WhenNotSequential = null;
		    	
		    	 // Outer Array in order of psmFilterableAnnotationTypeIds
		    	double[][] annotationValuesList_PerAnnotationTypeList = new double[ psmFilterableAnnotationTypeIds.size() ][];
		    	
		    	boolean[] psm_Is_Decoy = null;
		    	boolean[] psm_Is_IndependentDecoy = null;
		    	
		    	{
		    		//  Initialize arrays
		    		
		    		if ( ! psmIds_AreSequential ) {
		    			psmIds_OffsetFromPrevious_WhenNotSequential = new long[ psmCount ];
		    		}
		    		
		    		if ( anyResults_Decoy ) {
		    			psm_Is_Decoy = new boolean[ psmCount ];
		    		}
		    		if ( anyResults_IndependentDecoy ) {
		    			psm_Is_IndependentDecoy = new boolean[ psmCount ];
		    		}
		    		
		    		for ( int index = 0; index < psmFilterableAnnotationTypeIds.size(); index++ ) {
		    			annotationValuesList_PerAnnotationTypeList[ index ] = new double[ psmCount ];
		    		}
		    	}
	
		    	{
		    		//  Populate the Arrays
		    		

					
					long prev_PsmId = -1;  // Value Ignored and then replaced for first record
					
					int annotationTypeIdIndex = -1;  // Set to zero for first record
					int psm_Index = -1;  // Set to zero for first record

					
					boolean firstRecord = true;

	
					for ( Psm_FilterableAnnotationData_AllFor_SearchId_Searcher_ResultItem dbResultItem : dbResultItemList ) {
	
						if ( firstRecord ) {
							annotationTypeIdIndex = 0;
						} else {
							annotationTypeIdIndex++;
						}
						
						if ( firstRecord || prev_PsmId != dbResultItem.getPsmId() ) {
							
							//  first record or PSM Id change
							
							annotationTypeIdIndex = 0;  // Reset to index zero 

							if ( firstRecord ) {
								psm_Index = 0;  // first record so set to zero
							} else {
								psm_Index++; // increment PsmId index
							}
							
							
							if ( psmIds_OffsetFromPrevious_WhenNotSequential != null ) {
								if ( firstRecord ) {
									psmIds_OffsetFromPrevious_WhenNotSequential[ psm_Index ] = dbResultItem.getPsmId();
								} else {
									psmIds_OffsetFromPrevious_WhenNotSequential[ psm_Index ] = dbResultItem.getPsmId() - prev_PsmId;
								}
							}

							
							if ( psm_Is_Decoy != null ) {
								psm_Is_Decoy[ psm_Index ] = dbResultItem.isDecoyPSM();
							}
							if ( psm_Is_IndependentDecoy != null ) {
								psm_Is_IndependentDecoy[ psm_Index ] = dbResultItem.isIndependentDecoyPSM();
							}
							
							prev_PsmId = dbResultItem.getPsmId();
						}
						
						//  Annotation Value
						
						try {
							int rootLength = annotationValuesList_PerAnnotationTypeList.length;
							
							double[] arrayForAnnTypeIdIndex = annotationValuesList_PerAnnotationTypeList[ annotationTypeIdIndex ];
							
							int length = arrayForAnnTypeIdIndex.length;
							
							try {
								arrayForAnnTypeIdIndex[ psm_Index ] = dbResultItem.getAnnotationValueDouble();
							
							} catch (Exception e) {
								throw e;
							}	
						} catch (Exception e) {
							throw e;
						}

						//
						
						firstRecord = false;
					}
		    	}
		    	
		    	webserviceResult.include_DecoyPSM_Requested = webserviceRequest.include_DecoyPSM;
		    	webserviceResult.psmFilterableAnnotationTypeIds_InReturnedOrder = psmFilterableAnnotationTypeIds;
		    	
		    	webserviceResult.psmCount = psmCount;
		    	
		    	webserviceResult.starting_PsmId = starting_PsmId;
		    	webserviceResult.psmIds_OffsetFromPrevious_WhenNotSequential = psmIds_OffsetFromPrevious_WhenNotSequential;
		    	webserviceResult.annotationValuesList_PerAnnotationTypeList = annotationValuesList_PerAnnotationTypeList;
		    	webserviceResult.psm_Is_Decoy = psm_Is_Decoy;
		    	webserviceResult.psm_Is_IndependentDecoy = psm_Is_IndependentDecoy;
			}
			
			dbResultItemList = null;  // free memory before create JSON
    		
    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );

    		
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
    	private List<Integer> psmFilterableAnnotationTypeIds;
    	private boolean include_DecoyPSM = false; //  Return PSM with 'is_decoy' true.  Default to false
    	
		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}
		public void setPsmFilterableAnnotationTypeIds(List<Integer> psmFilterableAnnotationTypeIds) {
			this.psmFilterableAnnotationTypeIds = psmFilterableAnnotationTypeIds;
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
    	
    	private boolean include_DecoyPSM_Requested;   //  include_DecoyPSM from request
    	private List<Integer> psmFilterableAnnotationTypeIds_InReturnedOrder;  
    	
    	private int psmCount;
    	
    	private long starting_PsmId;
    	
    	private long[] psmIds_OffsetFromPrevious_WhenNotSequential;
    	
    	private double[][] annotationValuesList_PerAnnotationTypeList; // Outer List in order of psmFilterableAnnotationTypeIds_Requested
    	
    	private boolean[] psm_Is_IndependentDecoy;
    	private boolean[] psm_Is_Decoy;
    	
    	
		public boolean isInclude_DecoyPSM_Requested() {
			return include_DecoyPSM_Requested;
		}
		public List<Integer> getPsmFilterableAnnotationTypeIds_InReturnedOrder() {
			return psmFilterableAnnotationTypeIds_InReturnedOrder;
		}
		public long getStarting_PsmId() {
			return starting_PsmId;
		}
		public double[][] getAnnotationValuesList_PerAnnotationTypeList() {
			return annotationValuesList_PerAnnotationTypeList;
		}
		public boolean[] getPsm_Is_IndependentDecoy() {
			return psm_Is_IndependentDecoy;
		}
		public boolean[] getPsm_Is_Decoy() {
			return psm_Is_Decoy;
		}
		public int getPsmCount() {
			return psmCount;
		}
		public long[] getPsmIds_OffsetFromPrevious_WhenNotSequential() {
			return psmIds_OffsetFromPrevious_WhenNotSequential;
		}
    }

}


