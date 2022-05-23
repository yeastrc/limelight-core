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

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_importer.dto.SearchProteinSequenceVersionAnnotationDTO;

/**
 * 
 * table search__protein_sequence_version__annotation_tbl
 */
public class SearchProteinSequenceVersionAnnotationDAO {

	private static final Logger log = LoggerFactory.getLogger( SearchProteinSequenceVersionAnnotationDAO.class );
	private SearchProteinSequenceVersionAnnotationDAO() { }
	public static SearchProteinSequenceVersionAnnotationDAO getInstance() { return new SearchProteinSequenceVersionAnnotationDAO(); }
	
	/**
	 * @param searchProteinSequenceVersionAnnotationDTO
	 * @throws Exception
	 */
	public void saveToDatabase( SearchProteinSequenceVersionAnnotationDTO searchProteinSequenceVersionAnnotationDTO ) throws Exception {
		
		final String sql = "INSERT IGNORE INTO search__protein_sequence_version__annotation_tbl ( search_id, protein_sequence_version_id, annotation_id ) VALUES (?,?,?)";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {
			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				pstmt.setInt( 1, searchProteinSequenceVersionAnnotationDTO.getSearchId());
				pstmt.setInt( 2, searchProteinSequenceVersionAnnotationDTO.getProteinSequenceVersionId() );
				pstmt.setInt( 3, searchProteinSequenceVersionAnnotationDTO.getAnnotationId() );
				pstmt.executeUpdate();
			//  Skip get generated key since not populated if record already in DB
				//  Use to get generated key: try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {
//				try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
//					if( rs.next() ) {
//						search__protein_sequence_version__annotation_tbl.setId( rs.getInt( 1 ) );
//					} else
//						throw new LimelightImporterDatabaseException( "Failed to insert search__protein_sequence_version__annotation_tbl for search_id: " 
//								+ search__protein_sequence_version__annotation_tbl.getSearchId()
//								+ ", protein_sequence_version_id: " + search__protein_sequence_version__annotation_tbl.getProteinSequenceVersionId()
//								+ ", annotation_id: " + search__protein_sequence_version__annotation_tbl.getAnnotationId() );
//				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase(...): item: " + searchProteinSequenceVersionAnnotationDTO + " sql: " + sql, e );
			throw e;
		} finally {
		}
	}
}
