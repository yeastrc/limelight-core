package org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.yeastrc.limelight.limelight_shared.exceptions.LimelightShardCodeInternalErrorException;


/**
 * Entry per Search
 * 
 * 
 *   !!!!!   Warning:  Has equals(...) and hashCode() that need to be updated if properties change   !!!!!!!
 *   
 *   equals(...) and hashCode() ONLY use fields:
 *       projectSearchId
 *       psmCutoffValuesPerAnnotationId
 *       peptideCutoffValuesPerAnnotationId
 *       proteinCutoffValuesPerAnnotationId
 *       
 *       All other fields are derived values
 *
 */
public class SearcherCutoffValuesSearchLevel {

	//  !!!!!   Warning:  Has equals(...) and hashCode() that need to be updated if properties change   !!!!!!!
	
	
	private int projectSearchId;

	/**
	 * Key is annotation id
	 */
	private Map<Integer, SearcherCutoffValuesAnnotationLevel> psmCutoffValuesPerAnnotationId = new HashMap<>();
	/**
	 * Key is annotation id
	 */
	private Map<Integer, SearcherCutoffValuesAnnotationLevel> peptideCutoffValuesPerAnnotationId = new HashMap<>();
	/**
	 * Key is annotation id
	 */
	private Map<Integer, SearcherCutoffValuesAnnotationLevel> proteinCutoffValuesPerAnnotationId = new HashMap<>();
	/**
	 * Key is annotation id
	 */
	private Map<Integer, SearcherCutoffValuesAnnotationLevel> modificationPositionCutoffValuesPerAnnotationId = new HashMap<>();
	
	//  List version of data in map.  Updated when Map is updated
	private List<SearcherCutoffValuesAnnotationLevel> psmCutoffValuesPerAnnotationIdList = new ArrayList<>();
	private List<SearcherCutoffValuesAnnotationLevel> peptideCutoffValuesPerAnnotationIdList = new ArrayList<>();
	private List<SearcherCutoffValuesAnnotationLevel> proteinCutoffValuesPerAnnotationIdList = new ArrayList<>();
	private List<SearcherCutoffValuesAnnotationLevel> modificationPositionCutoffValuesPerAnnotationIdList = new ArrayList<>();
	
	/**
	 * Make compact string for comparing to another SearcherCutoffValuesSearchLevel value 
	 * when need to serialize it to a string
	 */
	private String asCompactString;
	

	byte[] compactStringByteArray;

	/**
	 * Private Constructor
	 */
	private SearcherCutoffValuesSearchLevel() {}
	
	/**
	 * @return
	 */
	public byte[] getAsCompactStringByteArray() {
		
		if ( compactStringByteArray == null ) {
			throw new LimelightShardCodeInternalErrorException("( compactStringByteArray == null ) ");
		}

		return compactStringByteArray;
	}
	
	/**
	 * @return
	 */
	public String getAsCompactString() {
		
		if ( asCompactString == null ) {
			throw new LimelightShardCodeInternalErrorException("( asCompactString == null ) ");
		}

		return asCompactString;
	}
	
	/**
	 * 
	 * @return
	 */
	public int getProjectSearchId() {
		return projectSearchId;
	}

	///////////////////////
	
	//  PSM

	/**
	 * Get SearcherCutoffValuesAnnotationLevel object for annotation id
	 * @param annotationId
	 * @return
	 */
	public SearcherCutoffValuesAnnotationLevel getPsmPerAnnotationCutoffs( Integer annotationId ) {
		return psmCutoffValuesPerAnnotationId.get( annotationId );
	}

	/**
	 * Get searches in list form
	 * @return
	 */
	public List<SearcherCutoffValuesAnnotationLevel> getPsmPerAnnotationCutoffsList() {
		
		return psmCutoffValuesPerAnnotationIdList;
	}
	
	///////////////////
	
	//  Peptide

	/**
	 * Get SearcherCutoffValuesAnnotationLevel object for annotation id
	 * @param annotationId
	 * @return
	 */
	public SearcherCutoffValuesAnnotationLevel getPeptidePerAnnotationCutoffs( Integer annotationId ) {
		return peptideCutoffValuesPerAnnotationId.get( annotationId );
	}

	/**
	 * Get searches in list form
	 * @return
	 */
	public List<SearcherCutoffValuesAnnotationLevel> getPeptidePerAnnotationCutoffsList() {
		
		return peptideCutoffValuesPerAnnotationIdList;
	}

	///////////////////
	
	//  Protein

	/**
	 * Get SearcherCutoffValuesAnnotationLevel object for annotation id
	 * @param annotationId
	 * @return
	 */
	public SearcherCutoffValuesAnnotationLevel getProteinPerAnnotationCutoffs( Integer annotationId ) {
		return proteinCutoffValuesPerAnnotationId.get( annotationId );
	}

	/**
	 * Get searches in list form
	 * @return
	 */
	public List<SearcherCutoffValuesAnnotationLevel> getProteinPerAnnotationCutoffsList() {
		
		return proteinCutoffValuesPerAnnotationIdList;
	}

	///////////////////
	
	//  Modification Position

	/**
	 * Get SearcherCutoffValuesAnnotationLevel object for annotation id
	 * @param annotationId
	 * @return
	 */
	public SearcherCutoffValuesAnnotationLevel getModificationPositionPerAnnotationCutoffs( Integer annotationId ) {
		return modificationPositionCutoffValuesPerAnnotationId.get( annotationId );
	}

	/**
	 * Get searches in list form
	 * @return
	 */
	public List<SearcherCutoffValuesAnnotationLevel> getModificationPositionPerAnnotationCutoffsList() {
		
		return modificationPositionCutoffValuesPerAnnotationIdList;
	}

	
	//////////////////////////////////
	//////////////////////////////////
	
	//  hashCode and equals methods
	

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((modificationPositionCutoffValuesPerAnnotationId == null) ? 0
				: modificationPositionCutoffValuesPerAnnotationId.hashCode());
		result = prime * result
				+ ((peptideCutoffValuesPerAnnotationId == null) ? 0 : peptideCutoffValuesPerAnnotationId.hashCode());
		result = prime * result
				+ ((proteinCutoffValuesPerAnnotationId == null) ? 0 : proteinCutoffValuesPerAnnotationId.hashCode());
		result = prime * result
				+ ((psmCutoffValuesPerAnnotationId == null) ? 0 : psmCutoffValuesPerAnnotationId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		SearcherCutoffValuesSearchLevel other = (SearcherCutoffValuesSearchLevel) obj;
		if (modificationPositionCutoffValuesPerAnnotationId == null) {
			if (other.modificationPositionCutoffValuesPerAnnotationId != null)
				return false;
		} else if (!modificationPositionCutoffValuesPerAnnotationId
				.equals(other.modificationPositionCutoffValuesPerAnnotationId))
			return false;
		if (peptideCutoffValuesPerAnnotationId == null) {
			if (other.peptideCutoffValuesPerAnnotationId != null)
				return false;
		} else if (!peptideCutoffValuesPerAnnotationId.equals(other.peptideCutoffValuesPerAnnotationId))
			return false;
		if (proteinCutoffValuesPerAnnotationId == null) {
			if (other.proteinCutoffValuesPerAnnotationId != null)
				return false;
		} else if (!proteinCutoffValuesPerAnnotationId.equals(other.proteinCutoffValuesPerAnnotationId))
			return false;
		if (psmCutoffValuesPerAnnotationId == null) {
			if (other.psmCutoffValuesPerAnnotationId != null)
				return false;
		} else if (!psmCutoffValuesPerAnnotationId.equals(other.psmCutoffValuesPerAnnotationId))
			return false;
		return true;
	}

	
	/////////////////////////
	
	//  Builder

	/**
	 * Get Builder
	 * @return
	 */
	public static SearcherCutoffValuesSearchLevel_Builder builder() {
		return new SearcherCutoffValuesSearchLevel_Builder();
	}
	
	/**
	 * Builder
	 *
	 *
	 */
	public static class SearcherCutoffValuesSearchLevel_Builder {
		
		private SearcherCutoffValuesSearchLevel newInstance = new SearcherCutoffValuesSearchLevel();
		
		/**
		 * Private Constructor
		 */
		private SearcherCutoffValuesSearchLevel_Builder() {}

		/**
		 * @return
		 */
		public SearcherCutoffValuesSearchLevel build() {
			
			{  // Populate peptideCutoffValuesPerAnnotationIdList

				newInstance.peptideCutoffValuesPerAnnotationIdList = new ArrayList<>( newInstance.peptideCutoffValuesPerAnnotationId.values() );
				
				// sort by name alphabetical
				
				Collections.sort( newInstance.peptideCutoffValuesPerAnnotationIdList, new Comparator<SearcherCutoffValuesAnnotationLevel>() {

					@Override
					public int compare(SearcherCutoffValuesAnnotationLevel o1,
							SearcherCutoffValuesAnnotationLevel o2) {

						return o1.getAnnotationTypeDTO().getName().compareTo( o1.getAnnotationTypeDTO().getName() );
					}
				});
			}
			
			{  //  Populate psmCutoffValuesPerAnnotationIdList
				

				newInstance.psmCutoffValuesPerAnnotationIdList = new ArrayList<>( newInstance.psmCutoffValuesPerAnnotationId.values() );
								
				// sort by name alphabetical
				
				Collections.sort( newInstance.psmCutoffValuesPerAnnotationIdList, new Comparator<SearcherCutoffValuesAnnotationLevel>() {

					@Override
					public int compare(SearcherCutoffValuesAnnotationLevel o1,
							SearcherCutoffValuesAnnotationLevel o2) {

						return o1.getAnnotationTypeDTO().getName().compareTo( o1.getAnnotationTypeDTO().getName() );
					}
				});
			}

			{  //  Populate proteinCutoffValuesPerAnnotationIdList
				

				newInstance.proteinCutoffValuesPerAnnotationIdList = new ArrayList<>( newInstance.proteinCutoffValuesPerAnnotationId.values() );
				
				// sort by name alphabetical
				
				Collections.sort( newInstance.proteinCutoffValuesPerAnnotationIdList, new Comparator<SearcherCutoffValuesAnnotationLevel>() {

					@Override
					public int compare(SearcherCutoffValuesAnnotationLevel o1,
							SearcherCutoffValuesAnnotationLevel o2) {

						return o1.getAnnotationTypeDTO().getName().compareTo( o1.getAnnotationTypeDTO().getName() );
					}
				});
			}

			{  //  Populate modificationPositionCutoffValuesPerAnnotationIdList
				

				newInstance.modificationPositionCutoffValuesPerAnnotationIdList = new ArrayList<>( newInstance.modificationPositionCutoffValuesPerAnnotationId.values() );
				
				// sort by name alphabetical
				
				Collections.sort( newInstance.modificationPositionCutoffValuesPerAnnotationIdList, new Comparator<SearcherCutoffValuesAnnotationLevel>() {

					@Override
					public int compare(SearcherCutoffValuesAnnotationLevel o1,
							SearcherCutoffValuesAnnotationLevel o2) {

						return o1.getAnnotationTypeDTO().getName().compareTo( o1.getAnnotationTypeDTO().getName() );
					}
				});
			}
			
			{  //  Populate asCompactString
				
				StringBuilder asStringSB = new StringBuilder( 100000 );
				asStringSB.append( String.valueOf( newInstance.projectSearchId ) );
				asStringSB.append( "pep" );
				addCutoffsPerAnnotationDataAsCompactString( newInstance.peptideCutoffValuesPerAnnotationId, asStringSB);
				asStringSB.append( "psm" );
				addCutoffsPerAnnotationDataAsCompactString( newInstance.psmCutoffValuesPerAnnotationId, asStringSB);
				asStringSB.append( "prt" );
				addCutoffsPerAnnotationDataAsCompactString( newInstance.proteinCutoffValuesPerAnnotationId, asStringSB);
				asStringSB.append( "mdPs" );
				addCutoffsPerAnnotationDataAsCompactString( newInstance.modificationPositionCutoffValuesPerAnnotationId, asStringSB);
				
				newInstance.asCompactString = asStringSB.toString();
			}


			{  //  Populate compactStringByteArray
			
				newInstance.compactStringByteArray = newInstance.asCompactString.getBytes( StandardCharsets.UTF_8 );
			}
			
			
			return newInstance;
		}

		/**
		 * @param cutoffsPerAnnotationData
		 * @param asStringSB
		 */
		private void addCutoffsPerAnnotationDataAsCompactString( 
				Map<Integer, SearcherCutoffValuesAnnotationLevel> cutoffsPerAnnotationData, 
				StringBuilder asStringSB ) {
			//  Put in List so can sort
			List<Map.Entry<Integer, SearcherCutoffValuesAnnotationLevel> > mapEntriesList = new ArrayList<>( cutoffsPerAnnotationData.entrySet() );
			Collections.sort( mapEntriesList, new Comparator<Map.Entry<Integer, SearcherCutoffValuesAnnotationLevel>>() {
				@Override
				public int compare(Entry<Integer, SearcherCutoffValuesAnnotationLevel> o1,
						Entry<Integer, SearcherCutoffValuesAnnotationLevel> o2) {
					if ( o1.getKey() < o2.getKey() ) {
						return -1;
					}
					if ( o1.getKey() > o2.getKey() ) {
						return 1;
					}
					return 0;
				}
			});
			for ( Map.Entry<Integer, SearcherCutoffValuesAnnotationLevel> entry : mapEntriesList ) {
				asStringSB.append( String.valueOf( entry.getValue().getAnnotationTypeId() ) );
				asStringSB.append( ":" );
				asStringSB.append( String.valueOf( entry.getValue().getAnnotationCutoffValue() ) );
				asStringSB.append( "," );
			}
			
		}
		
		/////////////////////

		/**
		 * 
		 * @param projectSearchId
		 */
		public void setProjectSearchId(int projectSearchId) {
			newInstance.projectSearchId = projectSearchId;
		}

		
		///////////////////////
		
		//  PSM

		/**
		 * @param perAnnotationCutoffs
		 */
		public void addPsmPerAnnotationCutoffs( SearcherCutoffValuesAnnotationLevel perAnnotationCutoffs ) {
			
			newInstance.psmCutoffValuesPerAnnotationId.put( perAnnotationCutoffs.getAnnotationTypeId(), perAnnotationCutoffs);
		}
		
		///////////////////
		
		//  Peptide

		/**
		 * @param perAnnotationCutoffs
		 */
		public void addPeptidePerAnnotationCutoffs( SearcherCutoffValuesAnnotationLevel perAnnotationCutoffs ) {
			
			newInstance.peptideCutoffValuesPerAnnotationId.put( perAnnotationCutoffs.getAnnotationTypeId(), perAnnotationCutoffs);
		}

		///////////////////
		
		//  Protein

		/**
		 * @param perAnnotationCutoffs
		 */
		public void addProteinPerAnnotationCutoffs( SearcherCutoffValuesAnnotationLevel perAnnotationCutoffs ) {
			
			newInstance.proteinCutoffValuesPerAnnotationId.put( perAnnotationCutoffs.getAnnotationTypeId(), perAnnotationCutoffs);
		}		

		///////////////////
		
		//  Modification Position

		/**
		 * @param perAnnotationCutoffs
		 */
		public void addModificationPositionPerAnnotationCutoffs( SearcherCutoffValuesAnnotationLevel perAnnotationCutoffs ) {
			
			newInstance.modificationPositionCutoffValuesPerAnnotationId.put( perAnnotationCutoffs.getAnnotationTypeId(), perAnnotationCutoffs);
		}		
	}

}
