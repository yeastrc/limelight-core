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
import org.yeastrc.limelight.limelight_shared.dto.SearchReportedPeptideFilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_webapp.searchers.ReportedPeptideFilterableData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_SearcherIF;

/**
 * Retrieve Reported Peptide Filterable Annotation data for Reported Peptide Ids, Annotation Type Ids, Project Search Id
 *
 */
@Component
public class ReportedPeptideFilterableAnnotationTypeData_For_RepPeptIds_AnnTypeIds_SearchId_Service implements ReportedPeptideFilterableAnnotationTypeData_For_RepPeptIds_AnnTypeIds_SearchId_ServiceIF {

	private static final Logger log = LoggerFactory.getLogger( ReportedPeptideFilterableAnnotationTypeData_For_RepPeptIds_AnnTypeIds_SearchId_Service.class );
	
	@Autowired
	private ReportedPeptideFilterableData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_SearcherIF reportedPeptideFilterableData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_Searcher;
	
	public static class ReportedPeptideFilterableAnnotationTypeData_For_RepPeptIds_AnnTypeIds_SearchId_Service_Result {
		
		/**
		 * Map<Reported Peptide Id, Map<Ann Type Id, SearchReportedPeptideFilterableAnnotationDTO>> annData_KeyAnnTypeId_KeyReportedPeptideId;
		 */
		private Map<Integer, Map<Integer, SearchReportedPeptideFilterableAnnotationDTO>> annData_KeyAnnTypeId_KeyReportedPeptideId;

		public Map<Integer, Map<Integer, SearchReportedPeptideFilterableAnnotationDTO>> getAnnData_KeyAnnTypeId_KeyReportedPeptideId() {
			return annData_KeyAnnTypeId_KeyReportedPeptideId;
		}
		public void setAnnData_KeyAnnTypeId_KeyReportedPeptideId(
				Map<Integer, Map<Integer, SearchReportedPeptideFilterableAnnotationDTO>> annData_KeyAnnTypeId_KeyReportedPeptideId) {
			this.annData_KeyAnnTypeId_KeyReportedPeptideId = annData_KeyAnnTypeId_KeyReportedPeptideId;
		}
	}
	
	/**
	 * @param searchId
	 * @param reportedPeptideIds
	 * @param annotationTypeIds
	 * @return
	 * @throws SQLException 
	 */
	@Override
	public ReportedPeptideFilterableAnnotationTypeData_For_RepPeptIds_AnnTypeIds_SearchId_Service_Result getReportedPeptideFilterableAnnotationTypeData_For_RepPeptIds_AnnTypeIds_SearchId_Service(
			int searchId,
    		List<Integer> reportedPeptideIds,
    		List<Integer> annotationTypeIds
			) throws SQLException {
		
		
		ReportedPeptideFilterableAnnotationTypeData_For_RepPeptIds_AnnTypeIds_SearchId_Service_Result result = new ReportedPeptideFilterableAnnotationTypeData_For_RepPeptIds_AnnTypeIds_SearchId_Service_Result();
		
		List<SearchReportedPeptideFilterableAnnotationDTO> dbResultList = 
				reportedPeptideFilterableData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_Searcher
				.getReportedPeptideFilterableAnnDataList( searchId, reportedPeptideIds, annotationTypeIds );
		
		Map<Integer, Map<Integer, SearchReportedPeptideFilterableAnnotationDTO>> annData_KeyAnnTypeId_KeyReportedPeptideId = new HashMap<>();

		for ( SearchReportedPeptideFilterableAnnotationDTO item : dbResultList ) {
			
			Map<Integer, SearchReportedPeptideFilterableAnnotationDTO> annData_KeyAnnTypeId = annData_KeyAnnTypeId_KeyReportedPeptideId.get( item.getReportedPeptideId() ); 
			if ( annData_KeyAnnTypeId == null ) {
				annData_KeyAnnTypeId = new HashMap<>();
				annData_KeyAnnTypeId_KeyReportedPeptideId.put( item.getReportedPeptideId(), annData_KeyAnnTypeId );
			}
			annData_KeyAnnTypeId.put( item.getAnnotationTypeId(), item );
		}
		
		result.annData_KeyAnnTypeId_KeyReportedPeptideId = annData_KeyAnnTypeId_KeyReportedPeptideId;
		
		return result;
	}
	
}
