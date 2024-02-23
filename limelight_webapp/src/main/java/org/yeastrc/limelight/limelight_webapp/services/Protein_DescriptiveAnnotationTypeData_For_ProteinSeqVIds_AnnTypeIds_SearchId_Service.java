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
package org.yeastrc.limelight.limelight_webapp.services;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.dto.Search_Protein_DescriptiveAnnotation_DTO;
import org.yeastrc.limelight.limelight_webapp.searchers.Protein_DescriptiveData_For_ProteinSequenceVersionIds_AnnTypeIds_ProjectSearchId_Searcher_IF;

/**
 * Retrieve Protein Descriptive Annotation data for Protein Sequence Version Ids, Annotation Type Ids, Project Search Id
 *
 */
@Component
public class Protein_DescriptiveAnnotationTypeData_For_ProteinSeqVIds_AnnTypeIds_SearchId_Service implements Protein_DescriptiveAnnotationTypeData_For_ProteinSeqVIds_AnnTypeIds_SearchId_Service_IF  {

	private static final Logger log = LoggerFactory.getLogger( Protein_DescriptiveAnnotationTypeData_For_ProteinSeqVIds_AnnTypeIds_SearchId_Service.class );
	
	@Autowired
	private Protein_DescriptiveData_For_ProteinSequenceVersionIds_AnnTypeIds_ProjectSearchId_Searcher_IF protein_DescriptiveData_For_ProteinSequenceVersionIds_AnnTypeIds_ProjectSearchId_Searcher;
	
	public static class Protein_DescriptiveAnnotationTypeData_For_ProteinSeqVIds_AnnTypeIds_SearchId_Service_Result {
		
		/**
		 * Map<Protein Sequence Version Id, Map<Ann Type Id, Search_Protein_DescriptiveAnnotation_DTO>> annData_KeyAnnTypeId_Key_ProteinSequenceVersionId;
		 */
		private Map<Integer, Map<Integer, Search_Protein_DescriptiveAnnotation_DTO>> annData_KeyAnnTypeId_Key_ProteinSequenceVersionId;

		public Map<Integer, Map<Integer, Search_Protein_DescriptiveAnnotation_DTO>> getAnnData_KeyAnnTypeId_Key_ProteinSequenceVersionId() {
			return annData_KeyAnnTypeId_Key_ProteinSequenceVersionId;
		}

	}
	
	/**
	 * @param searchId
	 * @param proteinSequenceVersionIds
	 * @param annotationTypeIds
	 * @return
	 * @throws SQLException 
	 */
	@Override
	public Protein_DescriptiveAnnotationTypeData_For_ProteinSeqVIds_AnnTypeIds_SearchId_Service_Result getProtein_DescriptiveAnnotationTypeData_For_ProteinSeqVIds_AnnTypeIds_SearchId_Service(
			int searchId,
    		List<Integer> proteinSequenceVersionIds,
    		List<Integer> annotationTypeIds
			) throws SQLException {
		
		
		Protein_DescriptiveAnnotationTypeData_For_ProteinSeqVIds_AnnTypeIds_SearchId_Service_Result result = new Protein_DescriptiveAnnotationTypeData_For_ProteinSeqVIds_AnnTypeIds_SearchId_Service_Result();
		
		List<Search_Protein_DescriptiveAnnotation_DTO> dbResultList = 
				protein_DescriptiveData_For_ProteinSequenceVersionIds_AnnTypeIds_ProjectSearchId_Searcher
				.get_Protein_DescriptiveAnnDataList( searchId, proteinSequenceVersionIds, annotationTypeIds );
		
		Map<Integer, Map<Integer, Search_Protein_DescriptiveAnnotation_DTO>> annData_KeyAnnTypeId_KeyReportedPeptideId = new HashMap<>();

		for ( Search_Protein_DescriptiveAnnotation_DTO item : dbResultList ) {
			
			Map<Integer, Search_Protein_DescriptiveAnnotation_DTO> annData_KeyAnnTypeId = annData_KeyAnnTypeId_KeyReportedPeptideId.get( item.getProteinSequenceVersionId() ); 
			if ( annData_KeyAnnTypeId == null ) {
				annData_KeyAnnTypeId = new HashMap<>();
				annData_KeyAnnTypeId_KeyReportedPeptideId.put( item.getProteinSequenceVersionId(), annData_KeyAnnTypeId );
			}
			annData_KeyAnnTypeId.put( item.getAnnotationTypeId(), item );
		}
		
		result.annData_KeyAnnTypeId_Key_ProteinSequenceVersionId = annData_KeyAnnTypeId_KeyReportedPeptideId;
		
		return result;
	}
	
}
