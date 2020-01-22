/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2019 University of Washington - Seattle, WA
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
package org.yeastrc.limelight.limelight_webapp.experiment.main;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.enum_classes.SearchDataLookupParametersLookupRootIdTypes;
import org.yeastrc.limelight.limelight_shared.enum_classes.SearchDataLookupParametersLookup_CreatedByUserType;
import org.yeastrc.limelight.limelight_webapp.dao.ExperimentDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ExperimentDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.SearchDataLookupParametersLookupDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.LimelightWebappDataException;
import org.yeastrc.limelight.limelight_webapp.experiment.main_objects.Experiment_A_Root;
import org.yeastrc.limelight.limelight_webapp.experiment.main_objects.Experiment_ConditionDataInnerData;
import org.yeastrc.limelight.limelight_webapp.experiment.main_objects.Experiment_ConditionDataNode;
import org.yeastrc.limelight.limelight_webapp.experiment.main_objects.Experiment_ConditionDataOuterData;
import org.yeastrc.limelight.limelight_webapp.experiment.main_objects.Experiment_OverallConditionDataRoot;
import org.yeastrc.limelight.limelight_webapp.experiment.params.ExperimentParams_CreatedByInfo;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParamsRoot;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main.SearchDataLookupParams_MainProcessingIF;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.params.SearchDataLookupParams_CreatedByInfo;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectIdsForProjectSearchIdsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;

/**
 * Experiment Add/Save Main Processing
 * 
 *  Save the Filters (PSM/Reported Peptide Level) for the Project Search Id
 *  Save the Experiment Data 
 *
 */
@Component
public class Experiment_AddSave_MainProcessing implements Experiment_AddSave_MainProcessingIF {

	private static final Logger log = LoggerFactory.getLogger( Experiment_AddSave_MainProcessing.class );

	@Autowired
	private ExperimentDAO_IF experimentDAO;
	
	@Autowired
	private ProjectIdsForProjectSearchIdsSearcherIF projectIdsForProjectSearchIdsSearcher;

	@Autowired
	private SearchDataLookupParams_MainProcessingIF searchDataLookupParams_MainProcessing;
	
	@Autowired
	private Experiment_AddSave_SaveExperimentAndChildrenRecordsIF experiment_AddSave_SaveExperimentAndChildrenRecords;
	
	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;
	
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.experiment.main.Experiment_AddSave_MainProcessingIF#experiment_AddSave_MainProcessing(java.lang.String, java.lang.Boolean, org.yeastrc.limelight.limelight_webapp.experiment.main_objects.Experiment_A_Root, java.lang.Integer, org.yeastrc.limelight.limelight_webapp.experiment.params.ExperimentParams_CreatedByInfo)
	 */
	@Override
	public ExperimentDTO experiment_AddSave_MainProcessing( 
			Integer experimentId,
			String experimentName,
			Boolean draft, 
			Experiment_A_Root experiment_A_Root,
			SearchDataLookupParamsRoot searchDataLookupParamsRoot,
			Integer projectId, 
			ExperimentParams_CreatedByInfo experimentParams_CreatedByInfo ) throws Exception {
		
		//  Get projectSearchIds From ConditionGroupData
		
		Set<Integer> projectSearchIdsSet = get_projectSearchIds_From_experiment_A_Root( experiment_A_Root );
		List<Integer> projectSearchIdsArray = new ArrayList<>( projectSearchIdsSet );
		Collections.sort( projectSearchIdsArray );
		
		if ( ( projectSearchIdsArray != null ) && ( ! projectSearchIdsArray.isEmpty() ) ) {
			
			//  Verify that all projectSearchIds are in current project
			
			// Map<ProjectSearchId, ProjectId>
			Map<Integer,Integer> projectSearchId_ProjectId_Mapping =
					projectIdsForProjectSearchIdsSearcher.getProjectIdMappingForProjectSearchIds( projectSearchIdsArray );
			
			for ( Map.Entry<Integer,Integer> entry : projectSearchId_ProjectId_Mapping.entrySet() ) {
				
				if ( entry.getValue().intValue() != projectId.intValue() ) {
					//  Project Id for ProjectSearchId is not the current project id so error.
					//     1) The ProjectSearchId was moved to a different project while the user had the ProjectSearchId selection open
					//     2) There is a bug
					//     3) Data was passed from outside the app to the webservice, possibly maliciously.
					log.warn( "projectId for projectSearchId is not equal project id passed to webservice.  project id passed to webservice: " 
							+ projectId
							+ ", projectId for projectSearchId: " 
							+ entry.getValue()
							+ ", projectSearchId: "
							+ entry.getKey() );
					
					throw new LimelightWebappDataException( "projectId for projectSearchId is not equal project id passed to webservice" );
				}
			}
		}
		
		SearchDataLookupParametersLookupDTO searchDataLookupParametersLookupDTO = null;
		
		if ( searchDataLookupParamsRoot != null ) {
			
			SearchDataLookupParams_CreatedByInfo searchDataLookupParams_CreatedByInfo = new SearchDataLookupParams_CreatedByInfo();
			searchDataLookupParams_CreatedByInfo.setCreatedByUserType( SearchDataLookupParametersLookup_CreatedByUserType.WEB_USER );
			searchDataLookupParams_CreatedByInfo.setCreatedByUserId( experimentParams_CreatedByInfo.getCreatedByUserId() );
			searchDataLookupParams_CreatedByInfo.setCreatedByRemoteIP( experimentParams_CreatedByInfo.getCreatedByRemoteIP() );

			searchDataLookupParametersLookupDTO = 
					searchDataLookupParams_MainProcessing
					.searchDataLookupParams_Save_ReturnObject( 
							searchDataLookupParamsRoot, 
							SearchDataLookupParametersLookupRootIdTypes.PROJECT_SEARCH_IDS, 
							null, // singleProjectSearchIdCreatedDefaultsFor, 
							searchDataLookupParams_CreatedByInfo );
		}
				
		String experimentJSONMainData = marshalObjectToJSON.getJSONString( experiment_A_Root );
		
		String projectSearchIdsOnlyJSON = marshalObjectToJSON.getJSONString( projectSearchIdsArray );

		ExperimentDTO experimentDTO = new ExperimentDTO();
		
		experimentDTO.setProjectId( projectId );
		experimentDTO.setDraft( draft );
		if ( searchDataLookupParametersLookupDTO != null ) {
			experimentDTO.setAssociatedSearchDataLookupParametersLookupId( searchDataLookupParametersLookupDTO.getId() );
		}
		experimentDTO.setName( experimentName );
		experimentDTO.setProjectSearchIdsOnlyJSON( projectSearchIdsOnlyJSON );
		experimentDTO.setExperimentJSONMainData( experimentJSONMainData );
		experimentDTO.setVersionNumber( experiment_A_Root.getVersion() );

		if ( experimentId != null ) {
			experimentDTO.setId( experimentId );	
		} else {
			experimentDTO.setCreatedByUserId( experimentParams_CreatedByInfo.getCreatedByUserId() );
			experimentDTO.setCreatedByUserType( experimentParams_CreatedByInfo.getCreatedByUserType() );
			experimentDTO.setCreatedByRemoteIP( experimentParams_CreatedByInfo.getCreatedByRemoteIP() );
		}
		
		experimentDTO.setExperimentLastUpdatedByUserId( experimentParams_CreatedByInfo.getCreatedByUserId() );
		experimentDTO.setExperimentLastUpdatedByUserType( experimentParams_CreatedByInfo.getCreatedByUserType() );
		
		if ( experimentId != null ) {
			experiment_AddSave_SaveExperimentAndChildrenRecords.updateExperimentAndChildrenRecords( experimentDTO, projectSearchIdsArray );
		} else {
			experiment_AddSave_SaveExperimentAndChildrenRecords.saveExperimentAndChildrenRecords( experimentDTO, projectSearchIdsArray );
		}

		if ( ( projectSearchIdsArray != null ) && ( ! projectSearchIdsArray.isEmpty() ) ) {
			
			//  Double check after inserting everything
			//  Verify that all projectSearchIds are in current project
			
			// Map<ProjectSearchId, ProjectId>
			Map<Integer,Integer> projectSearchId_ProjectId_Mapping =
					projectIdsForProjectSearchIdsSearcher.getProjectIdMappingForProjectSearchIds( projectSearchIdsArray );
			
			for ( Map.Entry<Integer,Integer> entry : projectSearchId_ProjectId_Mapping.entrySet() ) {
				
				if ( entry.getValue().intValue() != projectId.intValue() ) {
					//  Project Id for ProjectSearchId is not the current project id so error.
					//     1) The ProjectSearchId was moved to a different project while the user had the ProjectSearchId selection open
					//     2) There is a bug
					//     3) Data was passed from outside the app to the webservice, possibly maliciously.
					log.warn( "projectId for projectSearchId is not equal project id passed to webservice.  project id passed to webservice: " 
							+ projectId
							+ ", projectId for projectSearchId: " 
							+ entry.getValue()
							+ ", projectSearchId: "
							+ entry.getKey() );
					
					experimentDAO.delete( experimentDTO.getId() );
					
					throw new LimelightWebappDataException( "projectId for projectSearchId is not equal project id passed to webservice" );
				}
			}
		}
		
		
    	return experimentDTO;
	}
	
	/**
	 * @param experiment_A_Root
	 * @return
	 */
	private Set<Integer> get_projectSearchIds_From_experiment_A_Root( Experiment_A_Root experiment_A_Root ) {
		
		Set<Integer> projectSearchIdsAll_Set = new HashSet<>();
		
		Experiment_OverallConditionDataRoot experiment_OverallConditionDataRoot = experiment_A_Root.getExperimentConditionData();
		
		if ( experiment_OverallConditionDataRoot != null ) {
		
			List<Experiment_ConditionDataNode> conditions = experiment_OverallConditionDataRoot.getMainResultDataArray();
			
			process_ConditionGroups_InConditionGroupData( projectSearchIdsAll_Set, conditions );
		}
		
		return projectSearchIdsAll_Set;
	}

	/**
	 * Called Recursively
	 * 
	 * @param projectSearchIdsAll_Set
	 * @param conditions
	 */
	private void process_ConditionGroups_InConditionGroupData(
			Set<Integer> projectSearchIdsAll_Set,
			List<Experiment_ConditionDataNode> conditions) {
		
		for ( Experiment_ConditionDataNode experiment_ConditionDataNode : conditions ) {
		
			Experiment_ConditionDataOuterData outerData = experiment_ConditionDataNode.getData();
			if ( outerData != null ) {
				Experiment_ConditionDataInnerData innerData = outerData.getData();
				if ( innerData != null ) {
					List<Integer> projectSearchIds = innerData.getProjectSearchIds();
					if ( projectSearchIds != null ) {
						projectSearchIdsAll_Set.addAll(projectSearchIds);
					}
				}
			}
			
			List<Experiment_ConditionDataNode> conditions_Children = experiment_ConditionDataNode.getConditions();
			if ( conditions_Children != null && ( ! conditions_Children.isEmpty() ) ) {
				process_ConditionGroups_InConditionGroupData( projectSearchIdsAll_Set, conditions_Children ); // Recursive call
			}
			
		}
	}
	
}
