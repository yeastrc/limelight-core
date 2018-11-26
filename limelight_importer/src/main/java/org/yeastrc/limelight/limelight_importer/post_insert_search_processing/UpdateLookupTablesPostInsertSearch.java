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
package org.yeastrc.limelight.limelight_importer.post_insert_search_processing;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.yeastrc.limelight.limelight_importer.dto.SearchDTO_Importer;
import org.yeastrc.limelight.limelight_importer.objects.ReportedPeptideAndPsmFilterableAnnotationTypesOnId;
import org.yeastrc.limelight.limelight_importer.searcher_psm_peptide_cutoff_utils.CreateSearcherCutoffValuesSearchLevelFromDefaultsInTypeRecords;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;

/**
 * Update Lookup tables after search is inserted
 *
 */
public class UpdateLookupTablesPostInsertSearch {
	/**
	 * private constructor
	 */
	private UpdateLookupTablesPostInsertSearch(){}
	public static UpdateLookupTablesPostInsertSearch getInstance() {
		return new UpdateLookupTablesPostInsertSearch();
	}

	/**
	 * @param searchId
	 * @throws Exception 
	 */
	public void updateLookupTablesPostInsertSearch( 
			SearchDTO_Importer search,
			ReportedPeptideAndPsmFilterableAnnotationTypesOnId reportedPeptideAndPsmFilterableAnnotationTypesOnId ) throws Exception {

		int searchId = search.getId();
		
		SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel = 
				buildSearcherCutoffValuesSearchLevel( searchId, reportedPeptideAndPsmFilterableAnnotationTypesOnId );
		
		Update_unified_rp__search__rep_pept__lookup_tbl_table.getInstance()
		.update_unified_rp__search__rep_pept__lookup_tbl_table( search, searcherCutoffValuesSearchLevel );

	}
	

	/**
	 * Create SearcherCutoffValuesSearchLevel object with default cutoffs
	 * 
	 * Produce a list of SearcherCutoffValuesAnnotationLevel for default cutoffs in filterableAnnotationTypesOnId
	 * @param filterableAnnotationTypesOnId
	 * @return SearcherCutoffValuesSearchLevel
	 * @throws Exception 
	 */
	public SearcherCutoffValuesSearchLevel buildSearcherCutoffValuesSearchLevel( 
			int searchId,
			ReportedPeptideAndPsmFilterableAnnotationTypesOnId reportedPeptideAndPsmFilterableAnnotationTypesOnId ) throws Exception {
		
		Map<Integer, AnnotationTypeDTO> reportedPeptideFilterableAnnotationTypesOnId = 
				reportedPeptideAndPsmFilterableAnnotationTypesOnId.getFilterableReportedPeptideAnnotationTypesOnId();
		Map<Integer, AnnotationTypeDTO> psmFilterableAnnotationTypesOnId = 
				reportedPeptideAndPsmFilterableAnnotationTypesOnId.getFilterablePsmAnnotationTypesOnId();

		//  Build lists of AnnotationTypeDTO for reported peptide and psm
		List<AnnotationTypeDTO> reportedPeptideAnnotationTypeList = null;
		if ( reportedPeptideFilterableAnnotationTypesOnId != null ) {
			reportedPeptideAnnotationTypeList = new ArrayList<>( reportedPeptideFilterableAnnotationTypesOnId.size() );
			for ( Map.Entry<Integer, AnnotationTypeDTO> annotationTypeEntry : reportedPeptideFilterableAnnotationTypesOnId.entrySet() ) {
				reportedPeptideAnnotationTypeList.add( annotationTypeEntry.getValue() );
			}
		} else {
			reportedPeptideAnnotationTypeList = new ArrayList<>();
		}
		List<AnnotationTypeDTO> psmAnnotationTypeList = null;
		if ( psmFilterableAnnotationTypesOnId != null ) {
			psmAnnotationTypeList = new ArrayList<>( psmFilterableAnnotationTypesOnId.size() );
			for ( Map.Entry<Integer, AnnotationTypeDTO> annotationTypeEntry : psmFilterableAnnotationTypesOnId.entrySet() ) {
				psmAnnotationTypeList.add( annotationTypeEntry.getValue() );
			}
		} else {
			psmAnnotationTypeList = new ArrayList<>();
		}
		
		SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel =
				CreateSearcherCutoffValuesSearchLevelFromDefaultsInTypeRecords.getInstance()
				.createSearcherCutoffValuesSearchLevelFromDefaultsInTypeRecords( 
						searchId, psmAnnotationTypeList, reportedPeptideAnnotationTypeList );
		
		return searcherCutoffValuesSearchLevel;
	}
}
