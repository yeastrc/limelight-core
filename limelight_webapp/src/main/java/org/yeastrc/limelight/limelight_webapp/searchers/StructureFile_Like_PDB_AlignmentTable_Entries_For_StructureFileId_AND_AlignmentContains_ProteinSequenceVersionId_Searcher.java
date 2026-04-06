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
import org.yeastrc.limelight.limelight_shared.dto.StructureFile_Like_PDB_File_Alignment_DTO;
import org.yeastrc.limelight.limelight_webapp.dao.StructureFile_Like_PDB_File_Alignment_DAO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * Table structure_file_like_pdb_alignment_tbl  Get entries for Structure File Id AND Protein Sequence Version Id
 *
 */
@Component
public class StructureFile_Like_PDB_AlignmentTable_Entries_For_StructureFileId_AND_AlignmentContains_ProteinSequenceVersionId_Searcher extends Limelight_JDBC_Base implements StructureFile_Like_PDB_AlignmentTable_Entries_For_StructureFileId_AND_AlignmentContains_ProteinSequenceVersionId_Searcher_IF   {

	private static final Logger log = LoggerFactory.getLogger( StructureFile_Like_PDB_AlignmentTable_Entries_For_StructureFileId_AND_AlignmentContains_ProteinSequenceVersionId_Searcher.class );
		
	private static final String QUERY_SQL = 
			"SELECT * "
			+ "		FROM structure_file_like_pdb_alignment_tbl"
			+ "		WHERE structure_file_like_pdb_id_fk = ? AND protein_sequence_version_id = ?";

	
	@Override
	public List<StructureFile_Like_PDB_File_Alignment_DTO>  get_StructureFile_Like_PDB_AlignmentTable_Entries_For_StructureFileId_AND_AlignmentContains_ProteinSequenceVersionId( int StructureFileLikePDBId, int proteinSequenceVersionId ) throws SQLException {

		List<StructureFile_Like_PDB_File_Alignment_DTO> resultList = new ArrayList<>();

		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, StructureFileLikePDBId );
			preparedStatement.setInt( 2, proteinSequenceVersionId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					StructureFile_Like_PDB_File_Alignment_DTO result = StructureFile_Like_PDB_File_Alignment_DAO.getFromResultSet(rs);
					resultList.add(result);
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return resultList;
	}
	
}
