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
import org.yeastrc.limelight.limelight_shared.dto.PsmDynamicModificationDTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * 
 *
 */
@Component
public class PsmDynamicModification_For_PsmIdList_Searcher extends Limelight_JDBC_Base implements PsmDynamicModification_For_PsmIdList_Searcher_IF  {

	private static final Logger log = LoggerFactory.getLogger( PsmDynamicModification_For_PsmIdList_Searcher.class );
	
	private static final String QUERY_SQL_START = 
			"SELECT * "
			+ " FROM "
			+ " psm_dynamic_modification_tbl "
			+ " WHERE psm_id IN ( ";
	
	private static final String QUERY_SQL_END = " )";

	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.PsmDynamicModification_For_PsmIdList_Searcher_IF#getPsmDynamicModification_For_PsmIdList(java.util.List)
	 */
	@Override
	public List<PsmDynamicModificationDTO>  getPsmDynamicModification_For_PsmIdList( List<Long> psmIdList ) throws SQLException {

		List<PsmDynamicModificationDTO> resultList = new ArrayList<>();
		
		if ( psmIdList == null || psmIdList.isEmpty() ) {
			return resultList;
		}
		
		StringBuilder querySB = new StringBuilder( 10000 );
		
		querySB.append( QUERY_SQL_START );
		
		{
			int length = psmIdList.size();
			for ( int counter = 0; counter < length; counter++ ) {
				if ( counter != 0 ) {
					querySB.append( "," );
				}
				querySB.append( "?" );
			}
		}
		querySB.append( QUERY_SQL_END );

		final String querySQL = querySB.toString();
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			for ( Long psmId : psmIdList ) {
				counter++;
				preparedStatement.setLong( counter, psmId );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					PsmDynamicModificationDTO item = new PsmDynamicModificationDTO();
					item.setId( rs.getLong( "id" ) );
					item.setPsmId( rs.getLong( "psm_id" ) );
					item.setPosition( rs.getInt( "position" ) );
					item.setMass( rs.getDouble( "mass" ) );
					
					resultList.add( item );
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return resultList;
	}

}
