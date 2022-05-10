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
package org.yeastrc.limelight.limelight_importer.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer.dto.Importer_Stats_GeneralData_DTO;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDatabaseException;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;

/**
 * importer_stats_general_data_tbl table
 * 
 * General Data
 */
public class Importer_Stats_GeneralData_DAO {
	
	private static final Logger log = LoggerFactory.getLogger( Importer_Stats_GeneralData_DAO.class );

	/**
	 *  !!!  Current Max Length of field 'label'
	 */
	public static final int LABEL_FIELD_MAX_LENGTH__Importer_Stats_GeneralData_DAO = 255;
	
	private Importer_Stats_GeneralData_DAO() { }
	public static Importer_Stats_GeneralData_DAO getInstance() { return new Importer_Stats_GeneralData_DAO(); }
	
	

	/**
	 * @param item
	 * @throws Exception
	 */
	public void save( Importer_Stats_GeneralData_DTO item ) throws Exception {
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {
			
			//  Insert into main table
			save( item, dbConnection );
		}
	}

	
	private final String INSERT_SQL = 
			"INSERT INTO importer_stats_general_data_tbl ( search_id, label, total_elapsed_time__milliseconds ) "
			+ "VALUES ( ?, ?, ? )";
	/**
	 * @param item
	 * @param conn
	 * @throws Exception
	 */
	public void save( Importer_Stats_GeneralData_DTO item, Connection dbConnection ) throws Exception {
		
		if ( item.getLabel() == null ) {
			throw new IllegalArgumentException( "item.getLabel() cannot return null" );
		}
		
		final String sql = INSERT_SQL;
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {

			int counter = 0;

			counter++;
			pstmt.setInt( counter, item.getSearchId() );

			counter++;
			pstmt.setString( counter, item.getLabel().value() );
			counter++;
			pstmt.setLong( counter, item.getTotal_elapsedTime_Milliseconds() );

			pstmt.executeUpdate();
			
			try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
				if( rs.next() ) {
					int id =  rs.getInt( 1 );

					item.setId(id);;
				} else
					throw new LimelightImporterDatabaseException( "Failed to insert annotation_type__insert_id_tbl " );
			}

		} catch ( Exception e ) {
			String msg = "ERROR save(...) item: " + item;
			log.error( msg, e );
			throw e;
		}
		
	}
	
	

	
}

