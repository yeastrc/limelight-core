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
		
		private boolean hasScanFilenames;
		private boolean hasScanData;
		private boolean hasIsotopeLabel;
		private boolean anyPsmHas_DynamicModifications;
		private boolean anyPsmHas_OpenModifications;
		private boolean anyPsmHas_ReporterIons;
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
		
	}
		
	private static final String QUERY_SQL = 
			"SELECT "
			+ " has_scan_filenames, has_scan_data,"
			+ " has_isotope_label,"
			+ " any_psm_has_dynamic_modifications, "
			+ " any_psm_has_open_modificaton_masses, "
			+ " any_psm_has_reporter_ions,"
			+ " reported_peptide_matched_protein_mapping_provided "
			+ " FROM "
			+ " search_tbl  "
			+ " WHERE id = ?";

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcherIF#getSearchHasScanDataForSearchId(int)
	 */
	@Override
	public SearchFlagsForSearchIdSearcher_Result  getSearchHasScanDataForSearchId( int searchId ) throws SQLException {

		SearchFlagsForSearchIdSearcher_Result result = null;

		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, searchId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = new SearchFlagsForSearchIdSearcher_Result();

					int hasScanFilenames = rs.getInt( "has_scan_filenames" );
					if ( hasScanFilenames == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
						result.hasScanFilenames = true;
					}
					int hasScanData = rs.getInt( "has_scan_data" );
					if ( hasScanData == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
						result.hasScanData = true;
					}
					int hasIsotopeLabel = rs.getInt( "has_isotope_label" );
					if ( hasIsotopeLabel == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
						result.hasIsotopeLabel = true;
					}
					int anyPsmHas_DynamicModifications = rs.getInt( "any_psm_has_dynamic_modifications" );
					if ( anyPsmHas_DynamicModifications == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
						result.anyPsmHas_DynamicModifications = true;
					}
					int any_psm_has_open_modificaton_masses = rs.getInt( "any_psm_has_open_modificaton_masses" );
					if ( any_psm_has_open_modificaton_masses == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
						result.anyPsmHas_OpenModifications = true;
					}
					int anyPsmHas_ReporterIons = rs.getInt( "any_psm_has_reporter_ions" );
					if ( anyPsmHas_ReporterIons == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
						result.anyPsmHas_ReporterIons = true;
					}
					int reportedPeptideMatchedProteinMappingProvided = rs.getInt( "reported_peptide_matched_protein_mapping_provided" );
					if ( reportedPeptideMatchedProteinMappingProvided == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
						result.reportedPeptideMatchedProteinMappingProvided = true;
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
