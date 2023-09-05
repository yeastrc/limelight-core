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
package org.yeastrc.limelight.limelight_webapp.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_shared.dto.GoldStandard_SingleEntry_DTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * table gold_standard_single_entry_tbl
 *
 */
@Component
public class GoldStandard_SingleEntry_DAO extends Limelight_JDBC_Base implements GoldStandard_SingleEntry_DAO_IF  {

	private static final Logger log = LoggerFactory.getLogger( GoldStandard_SingleEntry_DAO.class );

	private static final String INSERT_SQL = 
			"INSERT INTO gold_standard_single_entry_tbl "
			+ " ( gold_standard_for_scan_file_root_id, "
			+ " scan_number, "
			+ " peptide_sequence, "
			+ " scan_number_peptide_sequence_mods_json, "
			+ " scan_number_peptide_sequence_mods_json_version_number ) "
			+ " VALUES ( ?, ?, ?, ?, ? )";

	/**
	 * @param item
	 */
	
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( GoldStandard_SingleEntry_DTO item ) {
		
		final String insertSQL = INSERT_SQL;

		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			KeyHolder keyHolder = new GeneratedKeyHolder();
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt = connection.prepareStatement( insertSQL, Statement.RETURN_GENERATED_KEYS );

							int counter = 0;

							counter++;
							pstmt.setInt( counter, item.getGoldStandard_ForScanFile_Root_Id() );
							counter++;
							pstmt.setInt( counter, item.getScanNumber() );
						
							counter++;
							pstmt.setString( counter, item.getPeptideSequence() );
							
							counter++;
							pstmt.setString( counter, item.getScanNumber_PeptideSequence_Mods_JSON() );
							counter++;
							pstmt.setInt( counter, item.getScanNumber_PeptideSequence_Mods_JSON_VersionNumber() );
							
							return pstmt;
						}
					},
					keyHolder);

			Number insertedKey = keyHolder.getKey();
			
			long insertedKeyLong = insertedKey.longValue();
			
			if ( insertedKeyLong > Integer.MAX_VALUE ) {
				String msg = "Inserted key is too large, is > Integer.MAX_VALUE. insertedKey: " + insertedKey;
				log.error( msg );
				throw new LimelightInternalErrorException( msg );
			}
			
			item.setId( (int) insertedKeyLong ); // Inserted auto-increment primary key for the inserted record
			
		} catch ( RuntimeException e ) {
			String msg = "GoldStandard_SingleEntry_DTO: " + item + ", SQL: " + insertSQL;
			log.error( msg, e );
			throw e;
		}
	}


}
