package org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Root level of Cutoff Values
 *
 */
public class SearcherCutoffValuesRootLevel {

	/**
	 * Key is Project Search Id
	 */
	private Map<Integer,SearcherCutoffValuesSearchLevel> searchLevelCutoffsPerProjectSearchId = new HashMap<>();
	
	private List<SearcherCutoffValuesSearchLevel> searchLevelCutoffsPerProjectSearchIdList = null;
	
	/**
	 * Private Constructor
	 */
	private SearcherCutoffValuesRootLevel() {}

	
	/**
	 * Get SearcherCutoffValuesSearchLevel object for projectSearchId
	 * @param searchId
	 * @return
	 */
	public SearcherCutoffValuesSearchLevel getPerSearchCutoffs( Integer projectSearchId ) {
		return searchLevelCutoffsPerProjectSearchId.get( projectSearchId );
	}

	/**
	 * Get Per Search Cutoffs in list form
	 * @return
	 */
	public List<SearcherCutoffValuesSearchLevel> getPerSearchCutoffsList() {
		
		return searchLevelCutoffsPerProjectSearchIdList;
	}
	
	///////////////////////
	
	//   Builder
	
	/**
	 * @return builder
	 */
	public static SearcherCutoffValuesRootLevel_Builder builder() {
		return new SearcherCutoffValuesRootLevel_Builder();
	}
	
	/**
	 * Builder
	 *
	 */
	public static class SearcherCutoffValuesRootLevel_Builder {
		
		private SearcherCutoffValuesRootLevel newInstance = new SearcherCutoffValuesRootLevel();
		
		/**
		 * private constructor
		 */
		private SearcherCutoffValuesRootLevel_Builder() {}
		
		/**
		 * @return
		 */
		public SearcherCutoffValuesRootLevel build() {
			
			{  // Populate searchLevelCutoffsPerProjectSearchIdList
					
				newInstance.searchLevelCutoffsPerProjectSearchIdList = new ArrayList<>( newInstance.searchLevelCutoffsPerProjectSearchId.size() );

				for ( Map.Entry<Integer,SearcherCutoffValuesSearchLevel> entry : newInstance.searchLevelCutoffsPerProjectSearchId.entrySet() ) {

					newInstance.searchLevelCutoffsPerProjectSearchIdList.add( entry.getValue() );
				}
			}
			
			return newInstance;
		}
		

		/**
		 * @param perSearchCutoffs
		 */
		public void addPerSearchCutoffs( SearcherCutoffValuesSearchLevel perSearchCutoffs ) {
			
			newInstance.searchLevelCutoffsPerProjectSearchId.put( perSearchCutoffs.getProjectSearchId(), perSearchCutoffs);
		}

	}
}
