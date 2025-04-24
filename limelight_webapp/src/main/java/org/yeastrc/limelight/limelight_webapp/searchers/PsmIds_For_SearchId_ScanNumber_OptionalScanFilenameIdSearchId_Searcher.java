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
import org.yeastrc.limelight.limelight_webapp.services.SearchFlagsForSingleSearchId_SearchResult_Cached_IF;

/**
 * 
 *
 */
@Component
public class PsmIds_For_SearchId_ScanNumber_OptionalScanFilenameIdSearchId_Searcher extends Limelight_JDBC_Base implements PsmIds_For_SearchId_ScanNumber_OptionalScanFilenameIdSearchId_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( PsmIds_For_SearchId_ScanNumber_OptionalScanFilenameIdSearchId_Searcher.class );

	@Autowired
	private SearchFlagsForSingleSearchId_SearchResult_Cached_IF searchFlagsForSingleSearchId_SearchResult_Cached;

	private static final String SQL = 
			"SELECT id "
			
			+ " FROM psm_tbl "

			+ " WHERE search_id = ? AND scan_number = ? ";

	private static final String SQL_WHERE_search_scan_file_id = " AND search_scan_file_id = ? ";
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.PsmIds_For_SearchId_ScanNumber_OptionalScanFilenameIdSearchId_Searcher_IF#getPsmIds_For_SearchId_ScanNumber_OptionalScanFilenameIdSearchId_Searcher(int, int, java.lang.Integer)
	 */
	@Override
	public List<Long> getPsmIds_For_SearchId_ScanNumber_OptionalScanFilenameIdSearchId_Searcher( int searchId, int scanNumber, Integer searchScanFileId ) throws Exception {
		
		List<Long> resultList = new ArrayList<>();

		SearchFlagsForSearchIdSearcher_Result_Item searchFlagsForSearchIdSearcher_Result_Item = searchFlagsForSingleSearchId_SearchResult_Cached.get_SearchFlagsForSearchIdSearcher_Result_Item_For_SearchId(searchId);

		StringBuilder sqlSB = new StringBuilder( 10000 );
		
		sqlSB.append( SQL );
		
		if ( searchScanFileId != null ) {
			
			sqlSB.append( SQL_WHERE_search_scan_file_id );
		}

		if ( searchFlagsForSearchIdSearcher_Result_Item.isAnyPsmHas_IsDecoy_True() ) {
			// Exclude  records where is_decoy = 'true'
			sqlSB.append( " AND is_decoy != " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
		}
		
		final String sql = sqlSB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {
			
			int paramCounter = 0;
			
			paramCounter++;
			preparedStatement.setInt( paramCounter, searchId );

			paramCounter++;
			preparedStatement.setInt( paramCounter, scanNumber );

			if ( searchScanFileId != null ) {

				paramCounter++;
				preparedStatement.setInt( paramCounter, searchScanFileId );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while( rs.next() ) {
					
					long psmId = rs.getLong( "id" );
					
					resultList.add( psmId );
				}
			}
		} catch ( Exception e ) {
			String msg = "Exception in getPsmIds_For_SearchId_ScanNumber_OptionalScanFilenameIdSearchId_Searcher( ... ): sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		return resultList;
	}
}
