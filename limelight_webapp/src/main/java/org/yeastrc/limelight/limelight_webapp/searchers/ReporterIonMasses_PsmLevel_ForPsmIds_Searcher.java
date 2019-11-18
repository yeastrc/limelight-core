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

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * 
 *
 */
@Component
public class ReporterIonMasses_PsmLevel_ForPsmIds_Searcher extends Limelight_JDBC_Base implements ReporterIonMasses_PsmLevel_ForPsmIdSearcherIF {

	private static final Logger log = LoggerFactory.getLogger( ReporterIonMasses_PsmLevel_ForPsmIds_Searcher.class );
	
	/**
	 * 
	 *
	 */
	public static class ReporterIonMasses_PsmLevel_ForPsmIds_Searcher_ResultItem {
		
		private long psmId;
		private BigDecimal reporterIonMass;
		
		public long getPsmId() {
			return psmId;
		}
		public BigDecimal getReporterIonMass() {
			return reporterIonMass;
		}
	}
		
	private static final String QUERY_START_SQL = 
			"SELECT "
			+ " psm_id, reporter_ion_mass "
			+ " FROM "
			+ " psm_reporter_ion_mass_tbl  "
			+ " WHERE psm_id in ( ";

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.ReporterIonMasses_PsmLevel_ForPsmIdSearcherIF#getSearchHasScanDataForSearchId(java.util.List)
	 */
	@Override
	public List<ReporterIonMasses_PsmLevel_ForPsmIds_Searcher_ResultItem> get_ReporterIonMasses_PsmLevel_ForPsmIds( List<Long> psmIds ) throws SQLException {

		int resultSize = psmIds.size() * 5;
		List<ReporterIonMasses_PsmLevel_ForPsmIds_Searcher_ResultItem> result = new ArrayList<>( resultSize );
		
		if ( psmIds.isEmpty() ) {
			//  No Request PSM IDs so return
			return result; // EARLY RETURN
		}

		int query_StringBuilderSize = 300 + ( 20 * psmIds.size() );
		StringBuilder querySQL_SB = new StringBuilder( query_StringBuilderSize );
		
		querySQL_SB.append( QUERY_START_SQL );
		
		for ( int counter = 1; counter <= psmIds.size(); counter++ ) {
			if ( counter != 1 ) {
				//  Not first so add ","
				querySQL_SB.append( "," );
			}
			querySQL_SB.append( "?" );
		}
		
		querySQL_SB.append( ")" );
		
		final String querySQL = querySQL_SB.toString();
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			for ( Long psmId : psmIds ) {
				counter++;
				preparedStatement.setLong( counter, psmId );
			}
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {

					ReporterIonMasses_PsmLevel_ForPsmIds_Searcher_ResultItem resultItem = new ReporterIonMasses_PsmLevel_ForPsmIds_Searcher_ResultItem();
					result.add( resultItem );
					
					resultItem.psmId = rs.getLong( "psm_id" );
					resultItem.reporterIonMass = rs.getBigDecimal( "reporter_ion_mass" );
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return result;
	}
	
}
