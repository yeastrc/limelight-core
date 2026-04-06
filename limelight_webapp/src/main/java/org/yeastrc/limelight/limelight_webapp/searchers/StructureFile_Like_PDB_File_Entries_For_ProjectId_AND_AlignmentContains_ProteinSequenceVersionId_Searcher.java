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
import org.yeastrc.limelight.limelight_shared.enum_classes.StructureFile_Like_PDB_File_FileType_Enum;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * Table structure_file_like_pdb_tbl  Get entries for Project Id AND Alignment Protein Sequence Version Id
 *
 */
@Component
public class StructureFile_Like_PDB_File_Entries_For_ProjectId_AND_AlignmentContains_ProteinSequenceVersionId_Searcher extends Limelight_JDBC_Base implements StructureFile_Like_PDB_File_Entries_For_ProjectId_AND_AlignmentContains_ProteinSequenceVersionId_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( StructureFile_Like_PDB_File_Entries_For_ProjectId_AND_AlignmentContains_ProteinSequenceVersionId_Searcher.class );
		
	private static final String QUERY_SQL = 
			"SELECT * "
			+ " FROM "
			+ " structure_file_like_pdb_tbl "
			+ " INNER JOIN ("
			+ "   SELECT DISTINCT structure_file_like_pdb_id_fk "
			+ "		FROM structure_file_like_pdb_alignment_tbl"
			+ "		WHERE project_id = ? AND protein_sequence_version_id = ?"
			+ " ) AS found_structure_file_like_pdb_id_fk ON structure_file_like_pdb_tbl.id = found_structure_file_like_pdb_id_fk.structure_file_like_pdb_id_fk";

	/**
	 * 
	 *
	 */
	public static class StructureFile_Like_PDB_File_Entries_For_ProjectId_AND_AlignmentContains_ProteinSequenceVersionId_Searcher_ResultItem {
		
		private int id;
		
		private StructureFile_Like_PDB_File_FileType_Enum fileType_Enum;
		
		private String name;
		private String description;
		public int getId() {
			return id;
		}
		public StructureFile_Like_PDB_File_FileType_Enum getFileType_Enum() {
			return fileType_Enum;
		}
		public String getName() {
			return name;
		}
		public String getDescription() {
			return description;
		}
	}
	
	
	@Override
	public List<StructureFile_Like_PDB_File_Entries_For_ProjectId_AND_AlignmentContains_ProteinSequenceVersionId_Searcher_ResultItem>  get_StructureFile_Like_PDB_File_Entries_For_ProjectId_AND_AlignmentContains_ProteinSequenceVersionId( int projectId, int proteinSequenceVersionId ) throws SQLException {

		List<StructureFile_Like_PDB_File_Entries_For_ProjectId_AND_AlignmentContains_ProteinSequenceVersionId_Searcher_ResultItem> resultList = new ArrayList<>();

		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, projectId );
			preparedStatement.setInt( 2, proteinSequenceVersionId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {

					StructureFile_Like_PDB_File_Entries_For_ProjectId_AND_AlignmentContains_ProteinSequenceVersionId_Searcher_ResultItem result = new StructureFile_Like_PDB_File_Entries_For_ProjectId_AND_AlignmentContains_ProteinSequenceVersionId_Searcher_ResultItem();
					
					result.id = rs.getInt( "id" );
					
					result.name = rs.getString( "name" );
					{
						int value = rs.getInt( "file_type_id" );
						result.fileType_Enum = StructureFile_Like_PDB_File_FileType_Enum.fromValue( value );
					}
					result.description = rs.getString( "description" );
					
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
