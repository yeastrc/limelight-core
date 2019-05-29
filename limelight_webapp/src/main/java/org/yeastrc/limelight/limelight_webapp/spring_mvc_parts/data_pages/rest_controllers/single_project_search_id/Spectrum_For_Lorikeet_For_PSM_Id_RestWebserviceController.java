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
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.dto.PsmDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmDynamicModificationDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchScanFileDTO;
import org.yeastrc.limelight.limelight_shared.dto.SrchRepPeptDynamicModDTO;
import org.yeastrc.limelight.limelight_shared.dto.StaticModDTO;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.dao.PsmDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ScanFileDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.SearchScanFileDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dto_lorikeet.LorikeetGetSpectrumServiceResult;
import org.yeastrc.limelight.limelight_webapp.dto_lorikeet.LorikeetRootData;
import org.yeastrc.limelight.limelight_webapp.dto_lorikeet.LorikeetStaticMod;
import org.yeastrc.limelight.limelight_webapp.dto_lorikeet.LorikeetVariableMod;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.PeptideStringForSearchIdReportedPeptideIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmDynamicModification_For_PsmId_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchHasScanDataForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SrchRepPept_DynamicMod_For_SearchIdReportedPeptideId_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.StaticModDTOForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.Call_Get_ScanDataFromScanNumbers_SpectralStorageWebserviceIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanDataFromScanNumbers_IncludeParentScans;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanData_ExcludeReturnScanPeakData;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.sub_parts.SingleScanPeak_SubResponse;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.sub_parts.SingleScan_SubResponse;


/**
 * Data for Lorikeet display
 * 
 *             Need to validate Project Search ID values in URL with values in POST JSON
 *               Already done for Ann Type Cutoffs in called code that translates cutoffs to objects sent to searcher
 *
 *
 * !!!!!!!!!!!   WARNING:  Many changes to this would also require changes to 
 * 								PSM_Peptide_List_Display_With_SpectrumViewer_RestWebserviceController
 * 								since that data is used as the user changes which PSM to display.
 */
@RestController
public class Spectrum_For_Lorikeet_For_PSM_Id_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( Spectrum_For_Lorikeet_For_PSM_Id_RestWebserviceController.class );
	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
	
	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;
	
	@Autowired
	private PsmDAO_IF psmDAO;
	
	@Autowired
	private PeptideStringForSearchIdReportedPeptideIdSearcherIF peptideStringForSearchIdReportedPeptideIdSearcher;
	
	@Autowired
	private SearchHasScanDataForSearchIdSearcherIF searchHasScanDataForSearchIdSearcher;

	@Autowired
	private SearchScanFileDAO_IF searchScanFileDAO;

	@Autowired
	private ScanFileDAO_IF scanFileDAO;
	
	@Autowired
	private Call_Get_ScanDataFromScanNumbers_SpectralStorageWebserviceIF call_Get_ScanDataFromScanNumbers_SpectralStorageWebservice;

	@Autowired
	private PsmDynamicModification_For_PsmId_SearcherIF psmDynamicModification_For_PsmId_Searcher;
	
	@Autowired
	private SrchRepPept_DynamicMod_For_SearchIdReportedPeptideId_SearcherIF srchRepPept_DynamicMod_For_SearchIdReportedPeptideId_Searcher;
	
	@Autowired
	private StaticModDTOForSearchIdSearcherIF staticModDTOForSearchIdSearcher;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public Spectrum_For_Lorikeet_For_PSM_Id_RestWebserviceController() {
		super();
//		log.warn( "constructor no params called" );
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
					+ AA_RestWSControllerPaths_Constants.SPECTRUM_FOR_PSM_ID_REST_WEBSERVICE_CONTROLLER
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

    		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

    		Long psmId = webserviceRequest.psmId;
    				
    		if ( psmId == null ) {
    			String msg = "psmId is empty.";
    			log.warn(msg);
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		Integer projectSearchId = webserviceRequest.getProjectSearchId();

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
   		
    		Integer searchId = searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
			if ( searchId == null ) {
				String msg = "No searchId for projectSearchId: " + projectSearchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			PsmDTO psmDTO = psmDAO.getById( psmId );
			if ( psmDTO == null ) {
				String msg = "No psmDTO for psmId: " + psmId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			//  Validate that searchId is on psm_tbl record for psmId
			if ( psmDTO.getSearchId() != searchId ) {
				String msg = "psmDTO.getSearchId() != searchId. psmId: " + psmId + ", searchId: " + searchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			if ( psmDTO.getSearchScanFileId() == null ) {
				String msg = "psmDTO.getSearchScanFileId() == null (no value). psmId: " + psmId + ", searchId: " + searchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			Boolean searchHasScanData = searchHasScanDataForSearchIdSearcher.getSearchHasScanDataForSearchId( searchId );
			if ( searchHasScanData == null ) {
				String msg = "No searchHasScanData for searchId: " + searchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

    		if ( ! searchHasScanData ) {
				String msg = "searchHasScanData is false for searchId: " + searchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		SearchScanFileDTO searchScanFileDTO = searchScanFileDAO.getById( psmDTO.getSearchScanFileId() );
			if ( searchScanFileDTO == null ) {
				String msg = "No searchScanFileDTO for Id: " + psmDTO.getSearchScanFileId();
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			Integer scanFileId = searchScanFileDTO.getScanFileId();
			
			if ( scanFileId == null ) {
				String msg = "searchScanFileDTO.getScanFileId() == null (no value) for Id: " + scanFileId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			String scanFileAPIKey = scanFileDAO.getSpectralStorageAPIKeyById( scanFileId );
			if ( StringUtils.isEmpty( scanFileAPIKey ) ) {
				String msg = "No value for scanFileAPIKey for scan file id: " + scanFileId;
				log.error( msg );
				throw new LimelightInternalErrorException( msg );
			}
			
			int ms2ScanNumber = psmDTO.getScanNumber();
			
			ScanDataFromSpectralStorageService_MS_2_1 scanDataFromSpectralStorageService_MS_2_1 = null;
			try {
				scanDataFromSpectralStorageService_MS_2_1 = getScanDataFromSpectralStorageService( ms2ScanNumber, scanFileAPIKey, scanFileId );
			} catch ( Exception e ) {
				String msg = "Failed to get scan data from Spectral Storage Service. ms2ScanNumber: " + ms2ScanNumber
						+ ", scanFileId: " + scanFileId;
				log.error( msg, e );
				throw e;
			}

			Double ms_2_precursor_M_Over_Z =
					scanDataFromSpectralStorageService_MS_2_1.ms_2_scanDataFromSpectralStorageService.getPrecursor_M_Over_Z();
			
			if ( ms_2_precursor_M_Over_Z == null ) {
				String msg = "ms_2_precursor_M_Over_Z == null: psm id: " + psmId;
				log.error( msg );
				throw new LimelightInternalErrorException(msg);
			}
			
			Float ms_2_retentionTime = scanDataFromSpectralStorageService_MS_2_1.ms_2_scanDataFromSpectralStorageService.getRetentionTime();

			if ( ms_2_retentionTime == null ) {
				String msg = "ms_2_retentionTime == null: psm id: " + psmId;
				log.error( msg );
				throw new LimelightInternalErrorException(msg);
			}
			
        	///////////////////////
        	String scanFilename = searchScanFileDTO.getFilename();
        	
        	
        	/////////////////////////////

    		LorikeetGetSpectrumServiceResult lorikeetGetSpectrumServiceResult = new LorikeetGetSpectrumServiceResult();

    		LorikeetRootData lorikeetRootData = new LorikeetRootData();
    		lorikeetGetSpectrumServiceResult.setData( lorikeetRootData );

	        lorikeetRootData.setCharge( psmDTO.getCharge() );
	        lorikeetRootData.setScanNum( psmDTO.getScanNumber() );
	        
	        
	        int reportedPeptideId = psmDTO.getReportedPeptideId();
	        
	        
			String peptideSequence = peptideStringForSearchIdReportedPeptideIdSearcher.getPeptideSequenceStringForSearchIdReportedPeptideId( searchId, reportedPeptideId );
			if ( peptideSequence == null ) {
				String msg = "Unable to find peptide string for searchId: " + searchId
						+ ", reportedPeptideId = " + reportedPeptideId;
				log.error( msg );
			    throw new LimelightInternalErrorException( msg );
			}
			lorikeetRootData.setSequence( peptideSequence );
			
	        // Variable Mods, N and C terminus Mods
			
			List<LorikeetVariableMod> variableMods = null;

			double ntermMod = 0; // additional mass to be added to the n-term
			double ctermMod = 0; // additional mass to be added to the c-term
			

			if ( psmDTO.isHasModifications() ) {
				
				//  Use Dynamic Mod records at PSM level

				List<PsmDynamicModificationDTO> srchRepPeptDynamicModDTOList = 
						psmDynamicModification_For_PsmId_Searcher
						.getPsmDynamicModification_For_PsmId( psmId );

				variableMods = new ArrayList<>( srchRepPeptDynamicModDTOList.size() );
				
				for ( PsmDynamicModificationDTO psmDynamicModificationDTO : srchRepPeptDynamicModDTOList ) {
					
					if ( psmDynamicModificationDTO.isIs_N_Terminal() && psmDynamicModificationDTO.isIs_C_Terminal() ) {
						String msg = "PSM Dynamic Mod has both Is_N_Terminal and Is_C_Terminal true.  id: " + psmDynamicModificationDTO.getId();
						log.error( msg );
						throw new LimelightInternalErrorException(msg);
					}
					if ( psmDynamicModificationDTO.isIs_N_Terminal() ) {
						ntermMod += psmDynamicModificationDTO.getMass();
					} else if ( psmDynamicModificationDTO.isIs_N_Terminal() ) {
						ctermMod += psmDynamicModificationDTO.getMass();
					} else {
						int dynamicModPosition = psmDynamicModificationDTO.getPosition();
						String aminoAcid = peptideSequence.substring( dynamicModPosition - 1 /* chg to zero based */, dynamicModPosition );
						LorikeetVariableMod lorikeetVariableMod = new LorikeetVariableMod();
						lorikeetVariableMod.setIndex( psmDynamicModificationDTO.getPosition() );
						lorikeetVariableMod.setModMass( psmDynamicModificationDTO.getMass() );
						lorikeetVariableMod.setAminoAcid( aminoAcid );
						variableMods.add( lorikeetVariableMod );
					}
				}
				
			} else {

				//  Use Dynamic Mod records at Reported Peptide level

				List<SrchRepPeptDynamicModDTO> srchRepPeptDynamicModDTOList = 
						srchRepPept_DynamicMod_For_SearchIdReportedPeptideId_Searcher
						.getSrchRepPept_DynamicMod_For_SearchIdReportedPeptideId( searchId, reportedPeptideId );

				variableMods = new ArrayList<>( srchRepPeptDynamicModDTOList.size() );
				
				for ( SrchRepPeptDynamicModDTO srchRepPeptDynamicModDTO : srchRepPeptDynamicModDTOList ) {

					if ( srchRepPeptDynamicModDTO.isIs_N_Terminal() && srchRepPeptDynamicModDTO.isIs_C_Terminal() ) {
						String msg = "SrchRepPeptDynamicModDTO has both Is_N_Terminal and Is_C_Terminal true. id: " + srchRepPeptDynamicModDTO.getId();
						log.error( msg );
						throw new LimelightInternalErrorException(msg);
					}
					if ( srchRepPeptDynamicModDTO.isIs_N_Terminal() ) {
						ntermMod += srchRepPeptDynamicModDTO.getMass();
					} else if ( srchRepPeptDynamicModDTO.isIs_C_Terminal() ) {
						ctermMod += srchRepPeptDynamicModDTO.getMass();
					} else {
						int dynamicModPosition = srchRepPeptDynamicModDTO.getPosition();
						String aminoAcid = peptideSequence.substring( dynamicModPosition - 1 /* chg to zero based */, dynamicModPosition );
						LorikeetVariableMod lorikeetVariableMod = new LorikeetVariableMod();
						lorikeetVariableMod.setIndex( srchRepPeptDynamicModDTO.getPosition() );
						lorikeetVariableMod.setModMass( srchRepPeptDynamicModDTO.getMass() );
						lorikeetVariableMod.setAminoAcid( aminoAcid );
						variableMods.add( lorikeetVariableMod );
					}
				}
			}
	        
	        lorikeetRootData.setVariableMods( variableMods );
	        
	        lorikeetRootData.setNtermMod( ntermMod );
	        lorikeetRootData.setCtermMod( ctermMod );
	        

        	lorikeetRootData.setFileName( scanFilename );
			lorikeetRootData.setPrecursorMz( ms_2_precursor_M_Over_Z );
			lorikeetRootData.setRetentionTimeSeconds( ms_2_retentionTime ); // For data displayed with Lorikeet
			
			{
				// Add MS 2 peaks to output 
				SingleScan_SubResponse ms_2_scanDataFromSpectralStorageService = scanDataFromSpectralStorageService_MS_2_1.ms_2_scanDataFromSpectralStorageService;
				for ( SingleScanPeak_SubResponse scanPeak : ms_2_scanDataFromSpectralStorageService.getPeaks() ) {
					lorikeetRootData.addPeak( scanPeak.getMz(), scanPeak.getIntensity() );
				}
			}
			{
				//  Add MS 1 peaks if exists
				SingleScan_SubResponse ms_1_scanDataFromSpectralStorageService = scanDataFromSpectralStorageService_MS_2_1.ms_1_scanDataFromSpectralStorageService;
				if ( ms_1_scanDataFromSpectralStorageService != null )  {
					for ( SingleScanPeak_SubResponse scanPeak : ms_1_scanDataFromSpectralStorageService.getPeaks() ) {
						lorikeetRootData.addMs1Peak( scanPeak.getMz(), scanPeak.getIntensity() );
					}
				}     
			}
			
	        // Static Mods
	        List<StaticModDTO> staticModsForSearch = staticModDTOForSearchIdSearcher.getListForSearchId( searchId );
	        List<LorikeetStaticMod> staticModsLorikeet = new ArrayList<>( staticModsForSearch.size() );
	        for ( StaticModDTO staticModDTO : staticModsForSearch ) {
	        	LorikeetStaticMod  staticModLorikeet = new LorikeetStaticMod();
	        	staticModLorikeet.setAminoAcid( staticModDTO.getResidue() );
	        	staticModLorikeet.setModMass( staticModDTO.getMass().doubleValue() );
	        	staticModsLorikeet.add( staticModLorikeet );
	        }
	        lorikeetRootData.setStaticMods( staticModsLorikeet );			
    		
    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( lorikeetGetSpectrumServiceResult );
    		
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
    

	/**
	 * Get Scan Data from Spectral Storage Service
	 * 
	 * @param scanDTO_ms_2
	 * @param scanDTO_ms_1
	 * @throws Exception 
	 */
	private ScanDataFromSpectralStorageService_MS_2_1 getScanDataFromSpectralStorageService( 
			int ms2ScanNumber, String scanFileAPIKey, Integer scanFileId ) throws Exception {
		
		//  Get scans from Spectral Storage Service.
		//  Send ms2 scan number and request parent scan as well
		
		List<Integer> scanNumbersList = new ArrayList<>( 3 );
		scanNumbersList.add(  ms2ScanNumber  );

		List<SingleScan_SubResponse> scans = 
				call_Get_ScanDataFromScanNumbers_SpectralStorageWebservice
				.getScanDataFromSpectralStorageService(
						scanNumbersList, 
						Get_ScanDataFromScanNumbers_IncludeParentScans.IMMEDIATE_PARENT,
						Get_ScanData_ExcludeReturnScanPeakData.NO,
						scanFileAPIKey );

		ScanDataFromSpectralStorageService_MS_2_1 scanDataFromSpectralStorageService_MS_2_1 = new ScanDataFromSpectralStorageService_MS_2_1();
		
		//  Get ms2 scan from returned list
		for ( SingleScan_SubResponse scan : scans ) {
			if ( scan.getScanNumber() == ms2ScanNumber ) {
				scanDataFromSpectralStorageService_MS_2_1.ms_2_scanDataFromSpectralStorageService = scan;
				break;
			}
		}

		if ( scanDataFromSpectralStorageService_MS_2_1.ms_2_scanDataFromSpectralStorageService == null ) {
			//  ms2 scan number not found in returned list
			String msg = "No ms2 scan found in spectral storage service for scan number: " 
					+ ms2ScanNumber
					+ ", API Key: " + scanFileAPIKey
					+ ", scan file id: " + scanFileId;
			log.error( msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		//  Get ms1 scan from returned list

		if ( scanDataFromSpectralStorageService_MS_2_1.ms_2_scanDataFromSpectralStorageService.getParentScanNumber() == null ) {
			//  ms2 scan parent scan number not populated
			String msg = "The ms2 scan retrieved from spectral storage service"
					+ " did not have a parent scan number"
					+ " for ms2 scan number: " + scanDataFromSpectralStorageService_MS_2_1.ms_2_scanDataFromSpectralStorageService.getScanNumber()
					+ ", API Key: " + scanFileAPIKey
					+ ", scan file id: " + scanFileId;
			log.error( msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		int ms1_ScanNumber = scanDataFromSpectralStorageService_MS_2_1.ms_2_scanDataFromSpectralStorageService.getParentScanNumber();
		
		for ( SingleScan_SubResponse scan : scans ) {
			if ( scan.getScanNumber() == ms1_ScanNumber ) {
				scanDataFromSpectralStorageService_MS_2_1.ms_1_scanDataFromSpectralStorageService = scan;
				break;
			}
		}

		if ( scanDataFromSpectralStorageService_MS_2_1.ms_1_scanDataFromSpectralStorageService == null ) {
			//  ms1 scan number not found in returned list
			String msg = "No ms1 scan found in spectral storage service for scan number: " 
					+ ms1_ScanNumber
					+ ", ms2ScanNumber: "
					+ ms2ScanNumber
					+ ", API Key: " + scanFileAPIKey
					+ ", scan file id: " + scanFileId;
			log.error( msg );
//			throw new LimelightWebappDataException(msg);
		}
		
		return scanDataFromSpectralStorageService_MS_2_1;
	}

	/**
	 * 
	 *
	 */
	private static class ScanDataFromSpectralStorageService_MS_2_1 {
		private SingleScan_SubResponse ms_1_scanDataFromSpectralStorageService;
		private SingleScan_SubResponse ms_2_scanDataFromSpectralStorageService;
	}
    
    /**
     * 
     *
     */
    public static class WebserviceRequest {
    	Long psmId;
    	Integer projectSearchId;

		public Long getPsmId() {
			return psmId;
		}
		public void setPsmId(Long psmId) {
			this.psmId = psmId;
		}
		public Integer getProjectSearchId() {
			return projectSearchId;
		}
		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}
    }
    
}


