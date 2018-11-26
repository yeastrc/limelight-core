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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.objects.ProteinInfoPerProteinVersionId;
import org.yeastrc.limelight.limelight_webapp.objects.ProteinInfoProteinAnnotationEntry;
import org.yeastrc.limelight.limelight_webapp.searchers.ProteinAnnotations_For_SearchID_ProteinVersionId_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ProteinSequenceVersionAnnotationItem;

/**
 * Get ProteinVersion Info For SearchId and Search Criteria
 *
 * Protein Annotation Info
 */
@Controller
public class ProteinVersionInfoFor_SearchID_SearchCriteriaService implements ProteinVersionInfoFor_SearchID_SearchCriteriaServiceIF {

	private static final Logger log = LoggerFactory.getLogger( ProteinVersionInfoFor_SearchID_SearchCriteriaService.class );

	@Autowired
	private ProteinVersionIdsFor_SearchID_SearchCriteriaServiceIF proteinVersionIdsFor_SearchID_SearchCriteria;
	
	@Autowired
	private ProteinAnnotations_For_SearchID_ProteinVersionId_SearcherIF proteinAnnotations_For_SearchID_ProteinVersionId_Searcher;
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.services.ProteinVersionInfoFor_SearchID_SearchCriteriaIF#getProteinVersionInfoFor_ProjSearchID_SearchCriteria(int, org.yeastrc.limelight.limelight_webapp.searcher_psm_peptide_protein_cutoff_objects_utils.SearcherCutoffValuesSearchLevel)
	 */
	@Override
	public Map<Integer, ProteinInfoPerProteinVersionId> getProteinVersionInfoFor_ProjSearchID_SearchCriteria( 
			int searchId,
			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel
			) throws SQLException {

		Map<Integer, ProteinInfoPerProteinVersionId> result = new HashMap<>();

		Set<Integer> proteinVersionIds = 
				proteinVersionIdsFor_SearchID_SearchCriteria.getProteinVersionIdsFor_ProjSearchID_SearchCriteria( searchId, searcherCutoffValuesSearchLevel );
		
		for ( Integer proteinVersionId : proteinVersionIds ) {
			
			List<ProteinSequenceVersionAnnotationItem> proteinAnnotationDBList = 
					proteinAnnotations_For_SearchID_ProteinVersionId_Searcher
					.getProteinAnnotations_For_SearchID_ProteinVersionId_Searcher( searchId, proteinVersionId );
			
			List<ProteinInfoProteinAnnotationEntry> annotations = new ArrayList<>( proteinAnnotationDBList.size() );
			
			for ( ProteinSequenceVersionAnnotationItem proteinAnnotationDBEntry : proteinAnnotationDBList ) {
			
				ProteinInfoProteinAnnotationEntry annotation = new ProteinInfoProteinAnnotationEntry();
				annotation.setName( proteinAnnotationDBEntry.getName() );
				annotation.setDescription( proteinAnnotationDBEntry.getDescription() );
				annotation.setTaxonomy( proteinAnnotationDBEntry.getTaxonomy() );
				annotations.add( annotation );
			}
			
			ProteinInfoPerProteinVersionId proteinInfoPerProteinVersionId = new ProteinInfoPerProteinVersionId();
			proteinInfoPerProteinVersionId.setAnnotations( annotations );
			
			result.put( proteinVersionId, proteinInfoPerProteinVersionId );
		}
		
		return result;
	}
}
