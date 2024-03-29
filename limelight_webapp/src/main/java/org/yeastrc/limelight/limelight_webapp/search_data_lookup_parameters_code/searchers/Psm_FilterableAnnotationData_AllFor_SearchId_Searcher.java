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
package org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.services.SearchFlagsForSingleSearchId_SearchResult_Cached_IF;

/**
 * Get Psm Filterable Annotation Data for PSM Id, and ann type ids
 * 
 * !!!  Excludes psm_tbl with is_decoy = 1
 *
 */
@Component
public class Psm_FilterableAnnotationData_AllFor_SearchId_Searcher extends Limelight_JDBC_Base implements Psm_FilterableAnnotationData_AllFor_SearchId_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( Psm_FilterableAnnotationData_AllFor_SearchId_Searcher.class );

	@Autowired
	private SearchFlagsForSingleSearchId_SearchResult_Cached_IF searchFlagsForSingleSearchId_SearchResult_Cached;

	/**
	 * 
	 *
	 */
	public static class Psm_FilterableAnnotationData_AllFor_SearchId_Searcher_ResultItem {
		private long psmId;
    	private int annotationTypeId;
    	private double annotationValueDouble;
    	boolean independentDecoyPSM;
    	boolean decoyPSM;
    	
		public long getPsmId() {
			return psmId;
		}
		public int getAnnotationTypeId() {
			return annotationTypeId;
		}
		public double getAnnotationValueDouble() {
			return annotationValueDouble;
		}
		public boolean isIndependentDecoyPSM() {
			return independentDecoyPSM;
		}
		public boolean isDecoyPSM() {
			return decoyPSM;
		}
	}

	private static final String SQL_MAIN_PART_1 = 
			"SELECT"
			+ " psm_tbl.id as psm_id, psm_tbl.is_independent_decoy, psm_tbl.is_decoy, "
			+ " psm_filterable_annotation_tbl.annotation_type_id, psm_filterable_annotation_tbl.value_double "
			+ " FROM "
			+ " psm_tbl "
			+ " INNER JOIN psm_filterable_annotation_tbl ON psm_tbl.id = psm_filterable_annotation_tbl.psm_id "
			+ " WHERE psm_tbl.search_id = ? ";
	
	private static final String SQL_MAIN_PART_2 = 
			" AND annotation_type_id IN  ";
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.searchers.Psm_FilterableAnnotationData_AllFor_SearchId_Searcher_IF#getPsmFilterableAnnotationDataList(int, java.util.Collection)
	 */
	
	@Override
	public List<Psm_FilterableAnnotationData_AllFor_SearchId_Searcher_ResultItem> getPsmFilterableAnnotationDataList( int searchId, Collection<Integer> annotationTypeIds, boolean include_DecoyPSMs  ) throws Exception {
		
		if ( annotationTypeIds == null || annotationTypeIds.isEmpty() ) {
			throw new IllegalArgumentException( "( annotationTypeIds == null || annotationTypeIds.isEmpty() )" );
		}
		
		List<Psm_FilterableAnnotationData_AllFor_SearchId_Searcher_ResultItem> results = new ArrayList<>();

		SearchFlagsForSearchIdSearcher_Result_Item searchFlagsForSearchIdSearcher_Result_Item = searchFlagsForSingleSearchId_SearchResult_Cached.get_SearchFlagsForSearchIdSearcher_Result_Item_For_SearchId(searchId);
		
		StringBuilder sqlSB = new StringBuilder( 1000 );
		
		//////////////////////
		/////   Start building the SQL
		
		sqlSB.append( SQL_MAIN_PART_1 );
		
		if ( ( ! include_DecoyPSMs ) && searchFlagsForSearchIdSearcher_Result_Item.isAnyPsmHas_IsDecoy_True() ) {
			// Exclude  records where is_decoy = 'true'
			sqlSB.append( " AND is_decoy != " ); 
			sqlSB.append( Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
		}
		
		sqlSB.append( SQL_MAIN_PART_2 );

		//////////
		// Add ann type ids placeholder to  WHERE
		{
			sqlSB.append( " ( " );
			int size = annotationTypeIds.size();
			for ( int counter = 0; counter < size; counter++ ) {
				if ( counter != 0 ) {
					sqlSB.append( ", " );
				}
				sqlSB.append( " ? " );
			}
			sqlSB.append( " ) " );
		}
		
		
		String querySQL = sqlSB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int paramCounter = 0;

			{
				paramCounter++;
				preparedStatement.setInt( paramCounter, searchId );
				
			}
			{
				for ( Integer annotationTypeId : annotationTypeIds ) {
					paramCounter++;
					preparedStatement.setInt( paramCounter, annotationTypeId );
				}
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while( rs.next() ) {
					Psm_FilterableAnnotationData_AllFor_SearchId_Searcher_ResultItem item = new Psm_FilterableAnnotationData_AllFor_SearchId_Searcher_ResultItem();
					item.psmId = rs.getLong( "psm_id");
					item.annotationTypeId = rs.getInt( "annotation_type_id" );
					item.annotationValueDouble = rs.getDouble( "value_double" );

					{
						int value = rs.getInt( "is_decoy" );
						if ( value == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							item.decoyPSM = true;
						}
					}
					{
						int value = rs.getInt( "is_independent_decoy" );
						if ( value == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							item.independentDecoyPSM = true;
						}
					}
					
					results.add( item );
				}
			}
		} catch ( Exception e ) {
			String msg = "Exception in getPsmFilterableAnnotationDataList( ... ): sql: " + querySQL;
			log.error( msg );
			throw e;
		}
		return results;
	}
}
