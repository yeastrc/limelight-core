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
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * 
 *
 */
@Component
public class PsmOpenModificationMassesFor_PsmIds_Searcher extends Limelight_JDBC_Base implements PsmOpenModificationMassesFor_PsmIds_Searcher_IF  {

	private static final Logger log = LoggerFactory.getLogger( PsmOpenModificationMassesFor_PsmIds_Searcher.class );

	/**
	 * 
	 *
	 */
	public static class PsmOpenModificationMassesFor_PsmIds_Searcher_ResultEntry {
		
		private long psmId;
		private long psmOpenModificationId;
		private double openModificationMass;
		
		public long getPsmId() {
			return psmId;
		}
		public double getOpenModificationMass() {
			return openModificationMass;
		}
		public long getPsmOpenModificationId() {
			return psmOpenModificationId;
		}
	}
	
	@Override
	public List<PsmOpenModificationMassesFor_PsmIds_Searcher_ResultEntry> getPsmOpenModificationMassesFor_PsmIds(
			
			List<Long> psmIds ) throws Exception {
		
		if ( psmIds == null || psmIds.isEmpty() ) {
			return new ArrayList<>();
		}
		
		List<PsmOpenModificationMassesFor_PsmIds_Searcher_ResultEntry> resultList = new ArrayList<>();
		
		StringBuilder sqlSB = new StringBuilder( 10000 );
		
		sqlSB.append( "SELECT psm_open_modification_tbl.psm_id AS psm_id, psm_open_modification_tbl.mass, " );
		sqlSB.append( " psm_open_modification_tbl.id AS psm_open_modification_id " );
		sqlSB.append( " FROM psm_open_modification_tbl  " );
		sqlSB.append( " WHERE psm_open_modification_tbl.psm_id IN ( " );

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
					PsmOpenModificationMassesFor_PsmIds_Searcher_ResultEntry result = new PsmOpenModificationMassesFor_PsmIds_Searcher_ResultEntry();
					result.psmId = rs.getLong( "psm_id" );
					result.psmOpenModificationId = rs.getLong( "psm_open_modification_id" );
					result.openModificationMass = rs.getDouble( "mass" );
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
