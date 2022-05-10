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
import java.util.ArrayList;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.searchers_results.PsmsForScanNumberScanFilenameIdSearchId_Result;
import org.yeastrc.limelight.limelight_webapp.services.SearchFlagsForSingleSearchId_SearchResult_Cached_IF;

/**
 * Get all PSMs for PSM id where all PSMs have same search id and same scan number and same scan file id
 *
 */
@Component
public class PsmsWithSameScanNumberScanFilenameIdSearchIdSearcher extends Limelight_JDBC_Base implements PsmsWithSameScanNumberScanFilenameIdSearchIdSearcherIF {

	private static final Logger log = LoggerFactory.getLogger( PsmsWithSameScanNumberScanFilenameIdSearchIdSearcher.class );

	@Autowired
	private SearchFlagsForSingleSearchId_SearchResult_Cached_IF searchFlagsForSingleSearchId_SearchResult_Cached;

	private static final String SQL = 
			"SELECT psm_primary_tbl.id AS psm_id, psm_primary_tbl.reported_peptide_id AS reported_peptide_id, "
			+ " psm_primary_tbl.charge, psm_primary_tbl.precursor_retention_time, psm_primary_tbl.precursor_m_z, "
			+ " psm_primary_tbl.is_independent_decoy, "  	//  NOT return 'is_decoy' since Excluded in SQL
			+ " psm_primary_tbl.scan_number AS scan_number "
			
			+ " FROM psm_tbl AS psm_psm_lookup_tbl  "

			+ " INNER JOIN psm_tbl AS psm_primary_tbl  "
								
			// Join PSM table to self
			+ 		" ON  psm_psm_lookup_tbl.search_id = psm_primary_tbl.search_id "  //  Same Search Id
			+ 			" AND psm_psm_lookup_tbl.scan_number = psm_primary_tbl.scan_number " // Same Scan Number
			+ 			" AND psm_psm_lookup_tbl.search_scan_file_id = psm_primary_tbl.search_scan_file_id " // Same Scan File
	
			+ " WHERE psm_psm_lookup_tbl.id = ?  ";

	/**
	 * @param psmId
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<PsmsForScanNumberScanFilenameIdSearchId_Result> getPsmsWithSameScanNumberScanFilenameIdSearchId( long psmId, int searchId ) throws Exception {
		
		List<PsmsForScanNumberScanFilenameIdSearchId_Result> resultList = new ArrayList<>();

		SearchFlagsForSearchIdSearcher_Result_Item searchFlagsForSearchIdSearcher_Result_Item = searchFlagsForSingleSearchId_SearchResult_Cached.get_SearchFlagsForSearchIdSearcher_Result_Item_For_SearchId(searchId);

		StringBuilder sqlSB = new StringBuilder( 10000 );
		
		sqlSB.append( SQL );

		if ( searchFlagsForSearchIdSearcher_Result_Item.isAnyPsmHas_IsDecoy_True() ) {
			// Exclude  records where is_decoy = 'true'
			sqlSB.append( " AND psm_psm_lookup_tbl.is_decoy != " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
			sqlSB.append( " AND psm_primary_tbl.is_decoy != " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
		}
		
		final String sql = sqlSB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {
			
			int paramCounter = 0;
			paramCounter++;
			preparedStatement.setLong( paramCounter, psmId );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while( rs.next() ) {
					PsmsForScanNumberScanFilenameIdSearchId_Result resultItem = new PsmsForScanNumberScanFilenameIdSearchId_Result();
					
					resultItem.setPsmId( rs.getLong( "psm_id" ) );
					resultItem.setReportedPeptideId( rs.getInt( "reported_peptide_id" ) );
					resultItem.setCharge( rs.getInt( "charge" ) );
					resultItem.setPrecursor_RetentionTime( rs.getBigDecimal( "precursor_retention_time" ) );
					resultItem.setPrecursor_MZ( rs.getBigDecimal( "precursor_m_z" ) );

					//  NOT return 'is_decoy' since Excluded in SQL

					{
						int intValue = rs.getInt("is_independent_decoy" );
						if ( intValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							resultItem.setPsmIs_IndependentDecoy( true );
						}
					}

					resultItem.setScanNumber( rs.getInt( "scan_number" ) );

					resultList.add( resultItem );
				}
			}
		} catch ( Exception e ) {
			String msg = "Exception in getPsmsWithSameScanNumberScanFilenameIdSearchId( ... ): sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		return resultList;
	}
}
