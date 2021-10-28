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
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * Does a Random record for Search Id have specific fields not null?
 *
 */
@Component
public class Psm_RandomRecordForSearchId_ContainsSpecificValues_Searcher extends Limelight_JDBC_Base implements Psm_RandomRecordForSearchId_ContainsSpecificValues_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( Psm_RandomRecordForSearchId_ContainsSpecificValues_Searcher.class );
	
	
	public static class Psm_RandomRecordForSearchId_ContainsSpecificValues_Searcher_Result {
		
		private long psmId;
		private boolean precursor_retention_time__NotNull;
		private boolean precursor_m_z__NotNull;
		
		public boolean isPrecursor_retention_time__NotNull() {
			return precursor_retention_time__NotNull;
		}
		public long getPsmId() {
			return psmId;
		}
		public boolean isPrecursor_m_z__NotNull() {
			return precursor_m_z__NotNull;
		}
	}

	private static final String SQL_MAIN = 
			"SELECT psm_tbl.id AS psm_id, "
			+ 		" psm_tbl.precursor_retention_time, psm_tbl.precursor_m_z "
			+ " FROM psm_tbl WHERE psm_tbl.search_id = ? LIMIT 1 ";

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.Psm_RandomRecordForSearchId_ContainsSpecificValues_Searcher_IF#get_Psm_RandomRecordForSearchId_ContainsSpecificValues(int)
	 */
	@Override
	public Psm_RandomRecordForSearchId_ContainsSpecificValues_Searcher_Result get_Psm_RandomRecordForSearchId_ContainsSpecificValues( int searchId  ) throws Exception {
		
		Psm_RandomRecordForSearchId_ContainsSpecificValues_Searcher_Result result = null;

		final String sql = SQL_MAIN;
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {
			
			int paramCounter = 0;
			paramCounter++;
			preparedStatement.setInt( paramCounter, searchId );
						
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if( rs.next() ) {
					result = new Psm_RandomRecordForSearchId_ContainsSpecificValues_Searcher_Result();

					result.psmId = rs.getLong( "psm_id" );

					{
						rs.getBigDecimal( "precursor_retention_time" );
						if ( ! rs.wasNull() ) {
							result.precursor_retention_time__NotNull = true;
						}
					}
					{
						rs.getBigDecimal( "precursor_m_z" );
						if ( ! rs.wasNull() ) {
							result.precursor_m_z__NotNull = true;
						}
					}
				}
			}
		} catch ( Exception e ) {
			String msg = "Exception: sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		
		return result;
	}
}
