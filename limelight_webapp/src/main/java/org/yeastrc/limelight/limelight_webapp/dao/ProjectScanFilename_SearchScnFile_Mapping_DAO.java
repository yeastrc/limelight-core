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
import org.slf4j.Logger;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_shared.dto.ProjectScanFilename_SearchScanFile_Mapping_DTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table project_scan_filename__search_scan_file__mapping_tbl
 *
 */
@Component
public class ProjectScanFilename_SearchScnFile_Mapping_DAO extends Limelight_JDBC_Base implements ProjectScanFilename_SearchScnFile_Mapping_DAO_IF {

	private static final Logger log = LoggerFactory.getLogger( ProjectScanFilename_SearchScnFile_Mapping_DAO.class );

	///////
	
	private static final String INSERT_SQL = 
			"INSERT INTO project_scan_filename__search_scan_file__mapping_tbl "
			+ " (project_scan_filename_id, search_scan_file_id, project_search_id)"
			+ " VALUES (?, ?, ?) ";
	
	/**
	 * NOT SET 'id' property on param Project_ScanFile_DTO
	 * 
	 * @param item
	 */
	
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.MANDATORY )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( ProjectScanFilename_SearchScanFile_Mapping_DTO item ) {
		
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
							pstmt.setInt( counter, item.getProjectScanFilenameId() );
							counter++;
							pstmt.setInt( counter, item.getSearchScanFileId() );
							counter++;
							pstmt.setInt( counter, item.getProjectSearchId() );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "Project_ScanFile_DTO: " + item + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}


}
