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
package org.yeastrc.limelight.limelight_importer.dao_db_insert;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.dto.PsmReporterIonMassDTO;

/**
 * table psm_reporter_ion_mass_tbl
 *
 */
public class DB_Insert_PsmReporterIonMassDAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_PsmReporterIonMassDAO.class );

	private DB_Insert_PsmReporterIonMassDAO() { }
	public static DB_Insert_PsmReporterIonMassDAO getInstance() { return new DB_Insert_PsmReporterIonMassDAO(); }


	/**
	 * @param itemList
	 * @return
	 * @throws Throwable
	 */
	public void insert_NOT_Update_ID_Property_InDTOParams( List<PsmReporterIonMassDTO> itemList ) throws Exception {

		try {

			//  DO NOT Close connection from getInsertControlCommitConnection()
			Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getInsertControlCommitConnection();
			
			insert_NOT_Update_ID_Property_InDTOParams( itemList, dbConnection );
			
		} finally {
		}
	}
	
	private static final String INSERT_SQL =
			
			"INSERT INTO psm_reporter_ion_mass_tbl "
			+ " ( psm_id, reporter_ion_mass )"
			+ " VALUES ";
	
	private static final String INSERT_VALUES_SINGLE_ENTRY_SQL = " ( ?, ? )";

	private ConcurrentMap<Integer, String> insertSQL_Map_Key_StringLength = new ConcurrentHashMap<>();

	/**
	 * @param entryCount
	 * @return
	 */
	private String create_insert_SQL( int entryCount ) {
		
		String sql = insertSQL_Map_Key_StringLength.get( entryCount );
		
		if ( sql != null ) {
			return sql;
		}
		
		StringBuilder sqlSB = new StringBuilder( INSERT_SQL.length() + ( ( INSERT_VALUES_SINGLE_ENTRY_SQL.length() + 5 ) * entryCount ) );

		sqlSB.append( INSERT_SQL );
		
		for ( int counter = 1; counter <= entryCount; counter++ ) {
			if ( counter != 1 ) {
				sqlSB.append( "," );
			}
			sqlSB.append( INSERT_VALUES_SINGLE_ENTRY_SQL );
		}
		
		sql = sqlSB.toString();
		
		insertSQL_Map_Key_StringLength.put( entryCount, sql );
		
		return sql;
	}
	
	/**
	 * @param itemList
	 * @param conn
	 * @throws Exception
	 */
	public void insert_NOT_Update_ID_Property_InDTOParams( List<PsmReporterIonMassDTO> itemList, Connection dbConnection ) throws Exception {

		if ( itemList.isEmpty() ) {
			throw new IllegalArgumentException( "( itemList.isEmpty() )" );
		}
		
		final String insertSQL = this.create_insert_SQL( itemList.size() );

		try ( PreparedStatement pstmt = dbConnection.prepareStatement( insertSQL ) ) {
			
			int counter = 0;

			for ( PsmReporterIonMassDTO item : itemList ) {
			
				counter++;
				pstmt.setLong( counter,  item.getPsmId() );

				counter++;
				pstmt.setBigDecimal( counter,  item.getReporterIonMass() );
			}

			pstmt.executeUpdate();
			
			
		} catch ( Exception e ) {
			log.error( "ERROR: insert_NOT_Update_ID_Property_InDTOParams(...) insertSQL: " + insertSQL + "\n First Data to save: " + itemList.get(0), e );
			throw e;
		}
	}
}
