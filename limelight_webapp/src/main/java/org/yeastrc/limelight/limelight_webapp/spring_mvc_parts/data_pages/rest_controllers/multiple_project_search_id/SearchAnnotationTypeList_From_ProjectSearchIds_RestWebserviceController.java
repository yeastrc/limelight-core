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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.multiple_project_search_id;


import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeFilterableDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterDirectionTypeJavaCodeEnum;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterableDescriptiveAnnotationType;
import org.yeastrc.limelight.limelight_shared.enum_classes.PsmPeptideMatchedProteinAnnotationType;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.AnnotationTypeListForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * Get Search Annotation Type Data from Project Search Ids 
 * 
 * Returns List<WebserviceResultAnnotationTypeItem>
 */
@RestController
public class SearchAnnotationTypeList_From_ProjectSearchIds_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( SearchAnnotationTypeList_From_ProjectSearchIds_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
	
	@Autowired
	private AnnotationTypeListForSearchIdSearcherIF annotationTypeListForSearchIdSearcher;
	
	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;
	
    /**
	 * 
	 */
	public SearchAnnotationTypeList_From_ProjectSearchIds_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.SEARCH_ANNOTATION_TYPE_LIST_FROM_PROJECT_SEARCH_IDS_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  controllerEntry(
    		
    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	
    	try {
//    		log.warn( "controllerEntry(...) called" );

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs

    		if ( postBody == null ) {
    			log.warn( "No Post Body" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

    		//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );

    		List<Integer> projectSearchIdList = webserviceRequest.getProjectSearchIds();

    		if ( projectSearchIdList == null || projectSearchIdList.isEmpty() ) {
    			log.warn( "No Project Search Ids" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		////////////////
    		
    		//  AUTH - validate access
    		
    		//  throws an exception if access is not valid that is turned into a webservice response by Spring
    		
    		//  Comment out result since not use it
//    		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
    		validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.validatePublicAccessCodeReadAllowed( projectSearchIdList, httpServletRequest );
    		
    		////////////////
   		
    		
    		List<WebserviceResultPerSearch> perSearchList = new ArrayList<>( projectSearchIdList.size() );
    		
    		for ( Integer projectSearchId : projectSearchIdList ) {
    			
    			Integer searchId =	searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
    			if ( searchId == null ) {
        			log.warn( "projectSearchId not in DB: " + projectSearchId );
        			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    			}
    			
    			List<AnnotationTypeDTO> annotationTypeDTOList =
    					annotationTypeListForSearchIdSearcher.getAnnotationTypeListForSearchId( searchId );

    			if ( annotationTypeDTOList.isEmpty() ) {
    				// No annotation types found for project search id
    				continue; // EARLY CONTINUE
    			}
    			
    			WebserviceResultPerSearch webserviceResultPerSearch = populateWebserviceResultPerSearch( annotationTypeDTOList );

    			webserviceResultPerSearch.projectSearchId = projectSearchId;

    			webserviceResultPerSearch.searchId = searchId;
    			
    			perSearchList.add( webserviceResultPerSearch );
    		}
    		
    		WebserviceResult webserviceResult = new WebserviceResult();
    		webserviceResult.perSearchList = perSearchList;

    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );
    		
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
     * @param annotationTypeDTOList
     * @return
     */
    private WebserviceResultPerSearch populateWebserviceResultPerSearch( List<AnnotationTypeDTO> annotationTypeDTOList ) {
    	
    	WebserviceResultPerSearch webserviceResultPerSearch = new WebserviceResultPerSearch();

    	List<WebserviceResultAnnotationTypeItem> psmFilterableAnnotationTypes = new ArrayList<>();
    	List<WebserviceResultAnnotationTypeItem> reportedPeptideFilterableAnnotationTypes = new ArrayList<>();
    	List<WebserviceResultAnnotationTypeItem> matchedProteinFilterableAnnotationTypes = new ArrayList<>();
    	List<WebserviceResultAnnotationTypeItem> modificationPositionFilterableAnnotationTypes = new ArrayList<>();

    	List<WebserviceResultAnnotationTypeItem> psmDescriptiveAnnotationTypes = new ArrayList<>();
    	List<WebserviceResultAnnotationTypeItem> reportedPeptideDescriptiveAnnotationTypes = new ArrayList<>();
    	List<WebserviceResultAnnotationTypeItem> matchedProteinDescriptiveAnnotationTypes = new ArrayList<>();
    	List<WebserviceResultAnnotationTypeItem> modificationPositionDescriptiveAnnotationTypes = new ArrayList<>();
    	
    	// Process Annotation Types from DB
		for ( AnnotationTypeDTO annotationTypeDTO : annotationTypeDTOList ) {
			
			WebserviceResultAnnotationTypeItem webserviceResultAnnotationTypeItem = populateWebserviceResultAnnotationTypeItem( annotationTypeDTO );
			
			if ( annotationTypeDTO.getFilterableDescriptiveAnnotationType() == FilterableDescriptiveAnnotationType.FILTERABLE ) {
				
				if ( annotationTypeDTO.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.PSM ) {
					psmFilterableAnnotationTypes.add( webserviceResultAnnotationTypeItem );
				} else if ( annotationTypeDTO.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.PEPTIDE ) {
					reportedPeptideFilterableAnnotationTypes.add( webserviceResultAnnotationTypeItem );
				} else if ( annotationTypeDTO.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.MATCHED_PROTEIN ) {
					matchedProteinFilterableAnnotationTypes.add( webserviceResultAnnotationTypeItem );
				} else if ( annotationTypeDTO.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.MODIFICATION_POSITION ) {
					modificationPositionFilterableAnnotationTypes.add( webserviceResultAnnotationTypeItem );
				} else {
					String msg = "Unknow value for 'PsmPeptideMatchedProteinAnnotationType'.  Annotation type id: " 
	    					+ annotationTypeDTO.getId()
	    					+ ", 'PsmPeptideMatchedProteinAnnotationType' value: " + annotationTypeDTO.getPsmPeptideMatchedProteinAnnotationType();
	    			log.error( msg );
	    			throw new LimelightInternalErrorException(msg);
				}
			} else if ( annotationTypeDTO.getFilterableDescriptiveAnnotationType() == FilterableDescriptiveAnnotationType.DESCRIPTIVE ) {
				
				if ( annotationTypeDTO.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.PSM ) {
					psmDescriptiveAnnotationTypes.add( webserviceResultAnnotationTypeItem );
				} else if ( annotationTypeDTO.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.PEPTIDE ) {
					reportedPeptideDescriptiveAnnotationTypes.add( webserviceResultAnnotationTypeItem );
				} else if ( annotationTypeDTO.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.MATCHED_PROTEIN ) {
					matchedProteinDescriptiveAnnotationTypes.add( webserviceResultAnnotationTypeItem );
				} else if ( annotationTypeDTO.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.MODIFICATION_POSITION ) {
					modificationPositionDescriptiveAnnotationTypes.add( webserviceResultAnnotationTypeItem );
				} else {
					String msg = "Unknow value for 'PsmPeptideMatchedProteinAnnotationType'.  Annotation type id: " 
	    					+ annotationTypeDTO.getId()
	    					+ ", 'PsmPeptideMatchedProteinAnnotationType' value: " + annotationTypeDTO.getPsmPeptideMatchedProteinAnnotationType();
	    			log.error( msg );
	    			throw new LimelightInternalErrorException(msg);
				}
			} else {
				String msg = "Unknow value for 'FilterableDescriptiveAnnotationType'.  Annotation type id: " 
    					+ annotationTypeDTO.getId()
    					+ ", 'FilterableDescriptiveAnnotationType' value: " + annotationTypeDTO.getFilterableDescriptiveAnnotationType();
    			log.error( msg );
    			throw new LimelightInternalErrorException(msg);
			}
		}
		    	
    	webserviceResultPerSearch.psmFilterableAnnotationTypes = psmFilterableAnnotationTypes;
    	webserviceResultPerSearch.reportedPeptideFilterableAnnotationTypes = reportedPeptideFilterableAnnotationTypes;
    	webserviceResultPerSearch.matchedProteinFilterableAnnotationTypes = matchedProteinFilterableAnnotationTypes;
    	webserviceResultPerSearch.modificationPositionFilterableAnnotationTypes = modificationPositionFilterableAnnotationTypes;

    	webserviceResultPerSearch.psmDescriptiveAnnotationTypes = psmDescriptiveAnnotationTypes;
    	webserviceResultPerSearch.reportedPeptideDescriptiveAnnotationTypes = reportedPeptideDescriptiveAnnotationTypes;
    	webserviceResultPerSearch.matchedProteinDescriptiveAnnotationTypes = matchedProteinDescriptiveAnnotationTypes;
    	webserviceResultPerSearch.modificationPositionDescriptiveAnnotationTypes = modificationPositionDescriptiveAnnotationTypes;
    	
    	return webserviceResultPerSearch;
    }
    
    /**
     * @param annotationTypeDTO
     * @return
     */
    private WebserviceResultAnnotationTypeItem populateWebserviceResultAnnotationTypeItem( AnnotationTypeDTO annotationTypeDTO ) {
    	
    	WebserviceResultAnnotationTypeItem webserviceResultAnnotationTypeItem = new WebserviceResultAnnotationTypeItem();
    	
    	webserviceResultAnnotationTypeItem.annotationTypeId = annotationTypeDTO.getId();
    	
    	webserviceResultAnnotationTypeItem.searchProgramsPerSearchId = annotationTypeDTO.getSearchProgramsPerSearchId();
    	
    	webserviceResultAnnotationTypeItem.name = annotationTypeDTO.getName();
    	webserviceResultAnnotationTypeItem.defaultVisible = annotationTypeDTO.isDefaultVisible();
    	webserviceResultAnnotationTypeItem.displayOrder = annotationTypeDTO.getDisplayOrder();
    	webserviceResultAnnotationTypeItem.description = annotationTypeDTO.getDescription();

//    	///  Filterable Only
    	
    	AnnotationTypeFilterableDTO annotationTypeFilterableDTO = annotationTypeDTO.getAnnotationTypeFilterableDTO();
    	
    	if ( annotationTypeFilterableDTO != null ) {
    		if ( annotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.ABOVE ) {
    			webserviceResultAnnotationTypeItem.filterDirectionAbove = true;
    		} else if ( annotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.BELOW ) {
    			webserviceResultAnnotationTypeItem.filterDirectionBelow = true;
    		} else {
    			String msg = "Unknow value for 'FilterDirectionTypeJavaCodeEnum'.  Annotation type id: " 
    					+ annotationTypeDTO.getId()
    					+ ", 'FilterDirectionTypeJavaCodeEnum' value: " + annotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum();
    			log.error( msg );
    			throw new LimelightInternalErrorException(msg);
    		}
    		webserviceResultAnnotationTypeItem.defaultFilter = annotationTypeFilterableDTO.isDefaultFilter();
    		webserviceResultAnnotationTypeItem.defaultFilterValue = annotationTypeFilterableDTO.getDefaultFilterValue();
    		webserviceResultAnnotationTypeItem.defaultFilterValueString = annotationTypeFilterableDTO.getDefaultFilterValueString();
    		webserviceResultAnnotationTypeItem.sortOrder = annotationTypeFilterableDTO.getSortOrder();
    	}
    	
    	return webserviceResultAnnotationTypeItem;
    }
    
    
    
    
    
    //////////////////////////////////////////
    
    //   Webservice Request and Result
    
    /**
     * 
     *
     */
    public static class WebserviceRequest {

    	private List<Integer> projectSearchIds;

		public List<Integer> getProjectSearchIds() {
			return projectSearchIds;
		}
		public void setProjectSearchIds(List<Integer> projectSearchIds) {
			this.projectSearchIds = projectSearchIds;
		}
    }
    
    /**
     * 
     *
     */
    public static class WebserviceResult {
    
    	private List<WebserviceResultPerSearch> perSearchList;

		public List<WebserviceResultPerSearch> getPerSearchList() {
			return perSearchList;
		}

		public void setPerSearchList(List<WebserviceResultPerSearch> perSearchList) {
			this.perSearchList = perSearchList;
		}
    }
    
    public static class WebserviceResultPerSearch {
        
    	private int projectSearchId;
    	private int searchId;
    	
    	private List<WebserviceResultAnnotationTypeItem> psmFilterableAnnotationTypes;
    	private List<WebserviceResultAnnotationTypeItem> reportedPeptideFilterableAnnotationTypes;
    	private List<WebserviceResultAnnotationTypeItem> matchedProteinFilterableAnnotationTypes;
    	private List<WebserviceResultAnnotationTypeItem> modificationPositionFilterableAnnotationTypes;

    	private List<WebserviceResultAnnotationTypeItem> psmDescriptiveAnnotationTypes;
    	private List<WebserviceResultAnnotationTypeItem> reportedPeptideDescriptiveAnnotationTypes;
    	private List<WebserviceResultAnnotationTypeItem> matchedProteinDescriptiveAnnotationTypes;
    	private List<WebserviceResultAnnotationTypeItem> modificationPositionDescriptiveAnnotationTypes;
    	
		public int getProjectSearchId() {
			return projectSearchId;
		}
		public void setProjectSearchId(int projectSearchId) {
			this.projectSearchId = projectSearchId;
		}
		public int getSearchId() {
			return searchId;
		}
		public void setSearchId(int searchId) {
			this.searchId = searchId;
		}
		public List<WebserviceResultAnnotationTypeItem> getPsmFilterableAnnotationTypes() {
			return psmFilterableAnnotationTypes;
		}
		public void setPsmFilterableAnnotationTypes(List<WebserviceResultAnnotationTypeItem> psmFilterableAnnotationTypes) {
			this.psmFilterableAnnotationTypes = psmFilterableAnnotationTypes;
		}
		public List<WebserviceResultAnnotationTypeItem> getReportedPeptideFilterableAnnotationTypes() {
			return reportedPeptideFilterableAnnotationTypes;
		}
		public void setReportedPeptideFilterableAnnotationTypes(
				List<WebserviceResultAnnotationTypeItem> reportedPeptideFilterableAnnotationTypes) {
			this.reportedPeptideFilterableAnnotationTypes = reportedPeptideFilterableAnnotationTypes;
		}
		public List<WebserviceResultAnnotationTypeItem> getMatchedProteinFilterableAnnotationTypes() {
			return matchedProteinFilterableAnnotationTypes;
		}
		public void setMatchedProteinFilterableAnnotationTypes(
				List<WebserviceResultAnnotationTypeItem> matchedProteinFilterableAnnotationTypes) {
			this.matchedProteinFilterableAnnotationTypes = matchedProteinFilterableAnnotationTypes;
		}
		public List<WebserviceResultAnnotationTypeItem> getPsmDescriptiveAnnotationTypes() {
			return psmDescriptiveAnnotationTypes;
		}
		public void setPsmDescriptiveAnnotationTypes(List<WebserviceResultAnnotationTypeItem> psmDescriptiveAnnotationTypes) {
			this.psmDescriptiveAnnotationTypes = psmDescriptiveAnnotationTypes;
		}
		public List<WebserviceResultAnnotationTypeItem> getReportedPeptideDescriptiveAnnotationTypes() {
			return reportedPeptideDescriptiveAnnotationTypes;
		}
		public void setReportedPeptideDescriptiveAnnotationTypes(
				List<WebserviceResultAnnotationTypeItem> reportedPeptideDescriptiveAnnotationTypes) {
			this.reportedPeptideDescriptiveAnnotationTypes = reportedPeptideDescriptiveAnnotationTypes;
		}
		public List<WebserviceResultAnnotationTypeItem> getMatchedProteinDescriptiveAnnotationTypes() {
			return matchedProteinDescriptiveAnnotationTypes;
		}
		public void setMatchedProteinDescriptiveAnnotationTypes(
				List<WebserviceResultAnnotationTypeItem> matchedProteinDescriptiveAnnotationTypes) {
			this.matchedProteinDescriptiveAnnotationTypes = matchedProteinDescriptiveAnnotationTypes;
		}
		public List<WebserviceResultAnnotationTypeItem> getModificationPositionDescriptiveAnnotationTypes() {
			return modificationPositionDescriptiveAnnotationTypes;
		}
		public List<WebserviceResultAnnotationTypeItem> getModificationPositionFilterableAnnotationTypes() {
			return modificationPositionFilterableAnnotationTypes;
		}
    	
    }

    public static class WebserviceResultAnnotationTypeItem {
    	
    	private int annotationTypeId;
    	
    	private int searchProgramsPerSearchId;
    	
    	private String name;

    	private boolean defaultVisible;
    	private Integer displayOrder;

    	private String description;
    	
    	///  Filterable Only

    	private boolean filterDirectionAbove;
    	private boolean filterDirectionBelow;

    	private boolean defaultFilter;
    	private Double defaultFilterValue;
    	private String defaultFilterValueString;

    	private Integer sortOrder;

		public int getAnnotationTypeId() {
			return annotationTypeId;
		}

		public void setAnnotationTypeId(int annotationTypeId) {
			this.annotationTypeId = annotationTypeId;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public boolean isDefaultVisible() {
			return defaultVisible;
		}

		public void setDefaultVisible(boolean defaultVisible) {
			this.defaultVisible = defaultVisible;
		}

		public Integer getDisplayOrder() {
			return displayOrder;
		}

		public void setDisplayOrder(Integer displayOrder) {
			this.displayOrder = displayOrder;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public boolean isFilterDirectionAbove() {
			return filterDirectionAbove;
		}

		public void setFilterDirectionAbove(boolean filterDirectionAbove) {
			this.filterDirectionAbove = filterDirectionAbove;
		}

		public boolean isFilterDirectionBelow() {
			return filterDirectionBelow;
		}

		public void setFilterDirectionBelow(boolean filterDirectionBelow) {
			this.filterDirectionBelow = filterDirectionBelow;
		}

		public boolean isDefaultFilter() {
			return defaultFilter;
		}

		public void setDefaultFilter(boolean defaultFilter) {
			this.defaultFilter = defaultFilter;
		}

		public Double getDefaultFilterValue() {
			return defaultFilterValue;
		}

		public void setDefaultFilterValue(Double defaultFilterValue) {
			this.defaultFilterValue = defaultFilterValue;
		}

		public String getDefaultFilterValueString() {
			return defaultFilterValueString;
		}

		public void setDefaultFilterValueString(String defaultFilterValueString) {
			this.defaultFilterValueString = defaultFilterValueString;
		}

		public Integer getSortOrder() {
			return sortOrder;
		}

		public void setSortOrder(Integer sortOrder) {
			this.sortOrder = sortOrder;
		}

		public int getSearchProgramsPerSearchId() {
			return searchProgramsPerSearchId;
		}

		public void setSearchProgramsPerSearchId(int searchProgramsPerSearchId) {
			this.searchProgramsPerSearchId = searchProgramsPerSearchId;
		}
    }
    
}


