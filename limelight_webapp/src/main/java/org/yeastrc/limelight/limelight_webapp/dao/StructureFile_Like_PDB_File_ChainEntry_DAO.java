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
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table structure_file_like_pdb_chain_entry_tbl
 *
 */
@Service
public class StructureFile_Like_PDB_File_ChainEntry_DAO extends Limelight_JDBC_Base implements StructureFile_Like_PDB_File_ChainEntry_DAO_IF {

	private static final Logger log = LoggerFactory.getLogger( StructureFile_Like_PDB_File_ChainEntry_DAO.class );

	/////////////
	
	private final static String INSERT_SQL = 
			
			"INSERT INTO structure_file_like_pdb_chain_entry_tbl "
			+ "( "
			+ " structure_file_like_pdb_id_fk, limelight_chain_id "
			+ ") "
					
			+ "VALUES (?, ?)";
	
	/**
	 * @param structure_file_like_pdb_id_fk
	 * @param limelight_chain_id
	 * @throws Exception
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.MANDATORY)  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring DB Transactions

	public void saveToDatabase( int structure_file_like_pdb_id_fk, int limelight_chain_id ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record

		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( INSERT_SQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, structure_file_like_pdb_id_fk );
							counter++;
							pstmt.setInt( counter, limelight_chain_id );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			log.error( "ERROR: saveToDatabase(...) structure_file_like_pdb_id_fk: " + structure_file_like_pdb_id_fk 
					+ ", limelight_chain_id: " + limelight_chain_id
					+ ", sql: " + INSERT_SQL, e );
			throw e;
		}
	}

}
