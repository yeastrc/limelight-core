package org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;


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
	
	//  List version of data in map.  Updated when Map is updated
	private List<SearcherCutoffValuesAnnotationLevel> psmCutoffValuesPerAnnotationIdList = new ArrayList<>();
	private List<SearcherCutoffValuesAnnotationLevel> peptideCutoffValuesPerAnnotationIdList = new ArrayList<>();
	
	/**
	 * Make compact string for comparing to another SearcherCutoffValuesSearchLevel value 
	 * when need to serialize it to a string
	 */
	private String asCompactString;
	

	byte[] compactStringByteArray;

	
	/**
	 * @return
	 */
	public byte[] getAsCompactStringByteArray() {
		if ( compactStringByteArray != null ) {
			return compactStringByteArray;
		}
		compactStringByteArray = getAsCompactString().getBytes( StandardCharsets.UTF_8 );
		return compactStringByteArray;
	}
	
	/**
	 * @return
	 */
	public String getAsCompactString() {
		if ( asCompactString != null ) {
			return asCompactString;
		}
		
		StringBuilder asStringSB = new StringBuilder( 100000 );
		asStringSB.append( String.valueOf( projectSearchId ) );
		asStringSB.append( "pep" );
		addCutoffsPerAnnotationDataAsCompactString(peptideCutoffValuesPerAnnotationId, asStringSB);
		asStringSB.append( "psm" );
		addCutoffsPerAnnotationDataAsCompactString(psmCutoffValuesPerAnnotationId, asStringSB);
		
		asCompactString = asStringSB.toString();
		return asCompactString;
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
	
	/**
	 * 
	 * @return
	 */
	public int getProjectSearchId() {
		return projectSearchId;
	}
	/**
	 * 
	 * @param projectSearchId
	 */
	public void setProjectSearchId(int projectSearchId) {
		this.projectSearchId = projectSearchId;
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
	 * @param perAnnotationCutoffs
	 */
	public void addPsmPerAnnotationCutoffs( SearcherCutoffValuesAnnotationLevel perAnnotationCutoffs ) {
		
		this.psmCutoffValuesPerAnnotationId.put( perAnnotationCutoffs.getAnnotationTypeId(), perAnnotationCutoffs);

		psmCutoffValuesPerAnnotationIdList = new ArrayList<>( psmCutoffValuesPerAnnotationId.size() );
		
		for ( Map.Entry<Integer,SearcherCutoffValuesAnnotationLevel> entry : psmCutoffValuesPerAnnotationId.entrySet() ) {
			
			psmCutoffValuesPerAnnotationIdList.add( entry.getValue() );
		}
		
		// sort by name alphabetical
		
		Collections.sort( psmCutoffValuesPerAnnotationIdList, new Comparator<SearcherCutoffValuesAnnotationLevel>() {

			@Override
			public int compare(SearcherCutoffValuesAnnotationLevel o1,
					SearcherCutoffValuesAnnotationLevel o2) {

				return o1.getAnnotationTypeDTO().getName().compareTo( o1.getAnnotationTypeDTO().getName() );
			}
		});
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
	 * @param perAnnotationCutoffs
	 */
	public void addPeptidePerAnnotationCutoffs( SearcherCutoffValuesAnnotationLevel perAnnotationCutoffs ) {
		
		this.peptideCutoffValuesPerAnnotationId.put( perAnnotationCutoffs.getAnnotationTypeId(), perAnnotationCutoffs);
		
		
		peptideCutoffValuesPerAnnotationIdList = new ArrayList<>( peptideCutoffValuesPerAnnotationId.size() );
		
		for ( Map.Entry<Integer,SearcherCutoffValuesAnnotationLevel> entry : peptideCutoffValuesPerAnnotationId.entrySet() ) {
			
			peptideCutoffValuesPerAnnotationIdList.add( entry.getValue() );
		}

		// sort by name alphabetical
		
		Collections.sort( peptideCutoffValuesPerAnnotationIdList, new Comparator<SearcherCutoffValuesAnnotationLevel>() {

			@Override
			public int compare(SearcherCutoffValuesAnnotationLevel o1,
					SearcherCutoffValuesAnnotationLevel o2) {

				return o1.getAnnotationTypeDTO().getName().compareTo( o1.getAnnotationTypeDTO().getName() );
			}
		});
	}

	/**
	 * Get searches in list form
	 * @return
	 */
	public List<SearcherCutoffValuesAnnotationLevel> getPeptidePerAnnotationCutoffsList() {
		
		return peptideCutoffValuesPerAnnotationIdList;
	}
	
	


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((peptideCutoffValuesPerAnnotationId == null) ? 0 : peptideCutoffValuesPerAnnotationId.hashCode());
		result = prime * result
				+ ((psmCutoffValuesPerAnnotationId == null) ? 0 : psmCutoffValuesPerAnnotationId.hashCode());
		result = prime * result + projectSearchId;
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
		if (peptideCutoffValuesPerAnnotationId == null) {
			if (other.peptideCutoffValuesPerAnnotationId != null)
				return false;
		} else if (!peptideCutoffValuesPerAnnotationId.equals(other.peptideCutoffValuesPerAnnotationId))
			return false;
		if (psmCutoffValuesPerAnnotationId == null) {
			if (other.psmCutoffValuesPerAnnotationId != null)
				return false;
		} else if (!psmCutoffValuesPerAnnotationId.equals(other.psmCutoffValuesPerAnnotationId))
			return false;
		if (projectSearchId != other.projectSearchId)
			return false;
		return true;
	}
	
	@Override
	public String toString() {
		return "SearcherCutoffValuesSearchLevel [getProjectSearchId()=" + getProjectSearchId() + ", getPsmPerAnnotationCutoffsList()="
				+ getPsmPerAnnotationCutoffsList() + ", getPeptidePerAnnotationCutoffsList()="
				+ getPeptidePerAnnotationCutoffsList() + "]";
	}
}
