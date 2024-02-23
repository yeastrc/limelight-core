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
public class PsmReporterIonMassesFor_PsmIds_Searcher extends Limelight_JDBC_Base implements PsmReporterIonMassesFor_PsmIds_SearcherIF  {

	private static final Logger log = LoggerFactory.getLogger( PsmReporterIonMassesFor_PsmIds_Searcher.class );

	/**
	 * 
	 *
	 */
	public static class PsmReporterIonMassesFor_PsmIds_Searcher_ResultEntry {
		
		private long psmId;
		private BigDecimal reporterIonMass;
		
		public long getPsmId() {
			return psmId;
		}
		public BigDecimal getReporterIonMass() {
			return reporterIonMass;
		}
	}
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.PsmReporterIonMassesFor_PsmIds_SearcherIF#getPsmReporterIonMassesFor_PsmIds(java.util.List)
	 */
	@Override
	public List<PsmReporterIonMassesFor_PsmIds_Searcher_ResultEntry> getPsmReporterIonMassesFor_PsmIds( List<Long> psmIds ) throws Exception {
		
		if ( psmIds == null || psmIds.isEmpty() ) {
			return new ArrayList<>();
		}
		
		List<PsmReporterIonMassesFor_PsmIds_Searcher_ResultEntry> resultList = new ArrayList<>();
		
		StringBuilder sqlSB = new StringBuilder( 10000 );
		
		sqlSB.append( "SELECT psm_tbl.id as psm_id, psm_reporter_ion_mass_tbl.reporter_ion_mass " );
		sqlSB.append( " FROM psm_tbl " );
		sqlSB.append( " INNER JOIN psm_reporter_ion_mass_tbl ON psm_tbl.id = psm_reporter_ion_mass_tbl.psm_id " );
		sqlSB.append( " WHERE psm_tbl.id IN ( " );
		
		for ( int counter = 1; counter <= psmIds.size(); counter++ ) {
			if ( counter != 1 ) {
				sqlSB.append( "," );
			}
			sqlSB.append( "?" );
		}
		sqlSB.append( " ) " );

		String sql = sqlSB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {

			int counter = 0;

			for ( Long psmId : psmIds ) {
				counter++;
				preparedStatement.setLong( counter, psmId );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while( rs.next() ) {
					PsmReporterIonMassesFor_PsmIds_Searcher_ResultEntry result = new PsmReporterIonMassesFor_PsmIds_Searcher_ResultEntry();
					result.psmId = rs.getLong( "psm_id" );
					result.reporterIonMass = rs.getBigDecimal( "reporter_ion_mass" );
					resultList.add( result );
				}
			}
		} catch ( RuntimeException e ) {
			log.error( "ERROR :  SQL: " + sql, e );
			throw e;
		} catch ( SQLException e ) {
			log.error( "ERROR :  SQL: " + sql, e );
			throw e;
		}
		return resultList;		
	}

}
