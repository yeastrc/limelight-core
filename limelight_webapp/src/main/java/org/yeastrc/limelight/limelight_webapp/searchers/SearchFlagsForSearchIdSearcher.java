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
package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * 
 *
 */
@Component
public class SearchFlagsForSearchIdSearcher extends Limelight_JDBC_Base implements SearchFlagsForSearchIdSearcherIF {

	private static final Logger log = LoggerFactory.getLogger( SearchFlagsForSearchIdSearcher.class );
	

	/**
	 * 
	 *
	 */
	public static class SearchFlagsForSearchIdSearcher_Result {
		
		List<SearchFlagsForSearchIdSearcher_Result_Item> resultItems;

		public List<SearchFlagsForSearchIdSearcher_Result_Item> getResultItems() {
			return resultItems;
		}
	}
	
	/**
	 * 
	 *
	 */
	public static class SearchFlagsForSearchIdSearcher_Result_Item {
		
		private int searchId;
		private boolean hasScanFilenames;
		private boolean hasScanData;
		private boolean hasIsotopeLabel;
		private boolean anyPsmHas_DynamicModifications;
		private boolean anyPsmHas_OpenModifications;
		private boolean anyPsmHas_ReporterIons;

		private boolean anyPsmHas_IsDecoy_True;
		private boolean anyPsmHas_IsIndependentDecoy_True;

		private Boolean allPsmHave_Precursor_RetentionTime;		//  null if not populated	//  NOT Populated Yet for Existing Searches
		private Boolean allPsmHave_Precursor_M_Over_Z;			//  null if not populated	//  NOT Populated Yet for Existing Searches
		
		private Boolean psmIds_AreSequential; //  null if not populated  // All PSM Ids for the search are sequential - can use PSM Id ranges  	//  NOT Populated Yet for Existing Searches
		
		private boolean reportedPeptideMatchedProteinMappingProvided;
		
		
		public boolean isHasScanFilenames() {
			return hasScanFilenames;
		}
		public boolean isHasScanData() {
			return hasScanData;
		}
		public boolean isHasIsotopeLabel() {
			return hasIsotopeLabel;
		}
		public boolean isAnyPsmHas_DynamicModifications() {
			return anyPsmHas_DynamicModifications;
		}
		public boolean isAnyPsmHas_ReporterIons() {
			return anyPsmHas_ReporterIons;
		}
		public boolean isReportedPeptideMatchedProteinMappingProvided() {
			return reportedPeptideMatchedProteinMappingProvided;
		}
		public boolean isAnyPsmHas_OpenModifications() {
			return anyPsmHas_OpenModifications;
		}
		public int getSearchId() {
			return searchId;
		}
		public boolean isAnyPsmHas_IsDecoy_True() {
			return anyPsmHas_IsDecoy_True;
		}
		public boolean isAnyPsmHas_IsIndependentDecoy_True() {
			return anyPsmHas_IsIndependentDecoy_True;
		}
		/**
		 * @return - null if not populated
		 */
		public Boolean getAllPsmHave_Precursor_RetentionTime() {
			return allPsmHave_Precursor_RetentionTime;
		}
		public Boolean getAllPsmHave_Precursor_M_Over_Z() {
			return allPsmHave_Precursor_M_Over_Z;
		}
		/**
		 * @return - null if not populated
		 */
		public Boolean getPsmIds_AreSequential() {
			return psmIds_AreSequential;
		}
		
	}
		
	private static final String QUERY_SQL = 
			"SELECT "
			+ " id, "
			+ " has_scan_filenames, has_scan_data,"
			+ " has_isotope_label,"
			+ " any_psm_has_dynamic_modifications, "
			+ " any_psm_has_open_modificaton_masses, "
			+ " any_psm_has_reporter_ions,"
			+ " any_psm_has__is_decoy_true,"
			+ " any_psm_has__is_independent_decoy_true,"
			+ " all_psms_have_precursor_retention_time,"	//  NOT Populated Yet for Existing Searches
			+ " all_psms_have_precursor_m_z,"				//  NOT Populated Yet for Existing Searches
			+ " psm_ids_are_sequential,"					//  NOT Populated Yet for Existing Searches
			+ " reported_peptide_matched_protein_mapping_provided "
			+ " FROM "
			+ " search_tbl  "
			+ " WHERE id IN ( ";

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcherIF#getSearchHasScanDataForSearchId(int)
	 */
	@Override
	public SearchFlagsForSearchIdSearcher_Result  getSearchFlags_ForSearchIds( List<Integer> searchIds ) throws SQLException {
		
		if ( searchIds.isEmpty() ) {
			throw new IllegalArgumentException( "searchIds cannot be empty" );
		}

		SearchFlagsForSearchIdSearcher_Result result = new SearchFlagsForSearchIdSearcher_Result();

		int searchIds_size = searchIds.size();
		
		result.resultItems = new ArrayList<>( searchIds_size );
		
		StringBuilder querySQL_SB = new StringBuilder( 1000 );
		
		querySQL_SB.append( QUERY_SQL );
		
		for ( int counter = 1; counter <= searchIds_size; counter++ ) {
			if ( counter > 1 ) {
				querySQL_SB.append(",");
			}
			querySQL_SB.append("?");
		}
		querySQL_SB.append(")"); // Close IN
			

		final String querySQL = querySQL_SB.toString();
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			for ( Integer searchId : searchIds ) {
				counter++;
				preparedStatement.setInt( counter, searchId );
			}
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					SearchFlagsForSearchIdSearcher_Result_Item resultItem = new SearchFlagsForSearchIdSearcher_Result_Item();
					result.resultItems.add(resultItem);

					resultItem.searchId = rs.getInt( "id" );
					int hasScanFilenames = rs.getInt( "has_scan_filenames" );
					if ( hasScanFilenames == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
						resultItem.hasScanFilenames = true;
					}
					int hasScanData = rs.getInt( "has_scan_data" );
					if ( hasScanData == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
						resultItem.hasScanData = true;
					}
					int hasIsotopeLabel = rs.getInt( "has_isotope_label" );
					if ( hasIsotopeLabel == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
						resultItem.hasIsotopeLabel = true;
					}
					int anyPsmHas_DynamicModifications = rs.getInt( "any_psm_has_dynamic_modifications" );
					if ( anyPsmHas_DynamicModifications == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
						resultItem.anyPsmHas_DynamicModifications = true;
					}
					int any_psm_has_open_modificaton_masses = rs.getInt( "any_psm_has_open_modificaton_masses" );
					if ( any_psm_has_open_modificaton_masses == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
						resultItem.anyPsmHas_OpenModifications = true;
					}
					int anyPsmHas_ReporterIons = rs.getInt( "any_psm_has_reporter_ions" );
					if ( anyPsmHas_ReporterIons == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
						resultItem.anyPsmHas_ReporterIons = true;
					}
					{
						int fieldIntValue = rs.getInt( "any_psm_has__is_decoy_true" );
						if ( fieldIntValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							resultItem.anyPsmHas_IsDecoy_True = true;
						}
					}
					{
						int fieldIntValue = rs.getInt( "any_psm_has__is_independent_decoy_true" );
						if ( fieldIntValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							resultItem.anyPsmHas_IsIndependentDecoy_True = true;
						}
					}
					{
						int fieldIntValue = rs.getInt( "all_psms_have_precursor_retention_time" );
						if ( ! rs.wasNull() ) {
							if ( fieldIntValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
								resultItem.allPsmHave_Precursor_RetentionTime = true;
							} else {
								resultItem.allPsmHave_Precursor_RetentionTime = false;
							}
						}
					}
					{
						int fieldIntValue = rs.getInt( "all_psms_have_precursor_m_z" );
						if ( ! rs.wasNull() ) {
							if ( fieldIntValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
								resultItem.allPsmHave_Precursor_M_Over_Z = true;
							} else {
								resultItem.allPsmHave_Precursor_M_Over_Z = false;
							}
						}
					}
					{
						int fieldIntValue = rs.getInt( "psm_ids_are_sequential" );
						if ( ! rs.wasNull() ) {
							if ( fieldIntValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
								resultItem.psmIds_AreSequential = true;
							} else {
								resultItem.psmIds_AreSequential = false;
							}
						}
					}
					

					int reportedPeptideMatchedProteinMappingProvided = rs.getInt( "reported_peptide_matched_protein_mapping_provided" );
					if ( reportedPeptideMatchedProteinMappingProvided == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
						resultItem.reportedPeptideMatchedProteinMappingProvided = true;
					}
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return result;
	}
	
}
