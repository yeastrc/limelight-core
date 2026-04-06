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
import java.sql.ResultSet;
import java.sql.SQLException;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_shared.dto.StructureFile_Like_PDB_File_Alignment_DTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table structure_file_like_pdb_alignment_tbl
 *
 */
@Component
public class StructureFile_Like_PDB_File_Alignment_DAO extends Limelight_JDBC_Base implements StructureFile_Like_PDB_File_Alignment_DAO_IF {

	private static final Logger log = LoggerFactory.getLogger( StructureFile_Like_PDB_File_Alignment_DAO.class );
	
	/**
	 * 
	 *
	 */
	public enum SkipLogInsertException { YES, NO }
	

	/**
	 * @param id
	 * @throws Exception
	 */
	
	
//	@Override
//	public StructureFile_Like_PDB_File_Alignment_DTO getForId( int id ) throws Exception {
//
//		StructureFile_Like_PDB_File_Alignment_DTO result = null;
//
//		final String sql = "SELECT * FROM structure_file_like_pdb_alignment_tbl WHERE id = ?";
//
//		try ( Connection dbConnection = super.getDBConnection();
//				PreparedStatement preparedStatement = dbConnection.prepareStatement( sql ) ) {
//
//			preparedStatement.setInt( 1, id );
//			preparedStatement.executeQuery();
//
//			try ( ResultSet rs = preparedStatement.executeQuery() ) {
//				if( rs.next() ) {
//					result = getFromResultSet(rs);
//				}
//			}
//
//		} catch ( Exception e ) {
//			log.error( "ERROR: getForId(...) id: " + id + ", sql: " + sql, e );
//			throw e;
//		}
//		return result;
//	}
//
//	/**
//	 * @param id
//	 * @throws Exception
//	 */
//	
//	
//	@Override
//	public Integer get_structure_file_like_pdb_id_fk_ForId_InDB( int id ) throws Exception {
//
//		Integer result = null;
//
//		final String sql = "SELECT structure_file_like_pdb_id_fk FROM structure_file_like_pdb_alignment_tbl WHERE id = ?";
//
//		try ( Connection dbConnection = super.getDBConnection();
//				PreparedStatement preparedStatement = dbConnection.prepareStatement( sql ) ) {
//
//			preparedStatement.setInt( 1, id );
//			preparedStatement.executeQuery();
//
//			try ( ResultSet rs = preparedStatement.executeQuery() ) {
//				if( rs.next() ) {
//					result = rs.getInt( "structure_file_like_pdb_id_fk" );
//				}
//			}
//
//		} catch ( Exception e ) {
//			log.error( "ERROR: isId_InDB(...) id: " + id + ", sql: " + sql, e );
//			throw e;
//		}
//		return result;
//	}
//
//	/**
//	 * @param protein_sequence_version_id
//	 * @param structure_file_like_pdb_id_fk
//	 * @param chain_id
//	 * @return id or null if not found
//	 * @throws Exception
//	 */
//	@Override
//	public Integer get_ID_For_UniqueKey__protein_sequence_version_id__structure_file_like_pdb_id_fk__chain_id(
//			
//			int protein_sequence_version_id,
//			int structure_file_like_pdb_id_fk,
//			String chain_id
//			
//			) throws Exception {
//
//		Integer result = null;
//
//		final String sql = "SELECT id FROM structure_file_like_pdb_alignment_tbl WHERE protein_sequence_version_id = ? AND structure_file_like_pdb_id_fk = ? AND chain_id = ?";
//		
//		try ( Connection dbConnection = super.getDBConnection();
//				PreparedStatement preparedStatement = dbConnection.prepareStatement( sql ) ) {
//
//			preparedStatement.setInt( 1, protein_sequence_version_id );
//			preparedStatement.setInt( 2, structure_file_like_pdb_id_fk );
//			preparedStatement.setString( 3, chain_id );
//			
//			preparedStatement.executeQuery();
//
//			try ( ResultSet rs = preparedStatement.executeQuery() ) {
//				if( rs.next() ) {
//					result = rs.getInt( "id" );
//				}
//			}
//
//		} catch ( Exception e ) {
//			log.error( "ERROR: get_ID_For_UniqueKey__protein_sequence_version_id__structure_file_like_pdb_id_fk__chain_id(...) protein_sequence_version_id: " + protein_sequence_version_id + ", sql: " + sql, e );
//			throw e;
//		}
//		return result;
//	}
	
	
	/**
	 * 
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	
	public static StructureFile_Like_PDB_File_Alignment_DTO getFromResultSet( ResultSet rs ) throws SQLException {
		
		StructureFile_Like_PDB_File_Alignment_DTO result = new StructureFile_Like_PDB_File_Alignment_DTO();
		result.setStructureFile_Like_PDB_File_Id( rs.getInt( "structure_file_like_pdb_id_fk" ) );
		result.setProjectId( rs.getInt( "project_id" ) );
		result.setProteinSequenceVersionId( rs.getInt( "protein_sequence_version_id" ) );
		
		result.setLimelightAssigned_ChainId( rs.getInt( "limelight_chain_id" ) );
	
		result.setAligned_StructureFile_Sequence( rs.getString( "aligned_structure_file_sequence" ) );
		result.setAligned_Limelight_Protein_Sequence( rs.getString( "aligned_limelight_protein_sequence" ) );
		
		result.setCreated_DateTime( rs.getDate( "create_date_time" ) );
		result.setUserId_Created( rs.getInt( "user_id_created" ) );
		
		result.setUpdated_DateTime( rs.getDate( "update_date_time" ) );
		result.setUserId_Updated( rs.getInt( "user_id_updated" ) );
		
		return result;
	}
	
	/////////////
	
	private final static String INSERT_OR_UPDATE_SQL = 
			
			"INSERT INTO structure_file_like_pdb_alignment_tbl "
			+ "( "
			+ " structure_file_like_pdb_id_fk, "
			+ " protein_sequence_version_id, limelight_chain_id, "
			+ " project_id, "
			+ " aligned_structure_file_sequence, aligned_limelight_protein_sequence,"
			+ " search_ids_when_alignment_created_comma_delim, "
			+ " user_id_created, user_id_updated "
			+ ") "
					
			+ " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) "
			+ ""
			+ " ON DUPLICATE KEY UPDATE "
			+ " aligned_structure_file_sequence = ?, aligned_limelight_protein_sequence = ?, user_id_updated = ?";
			
	/**
	 * @param item
	 * @throws Exception
	 */
	@Override
	public void saveOrUpdate( StructureFile_Like_PDB_File_Alignment_DTO item, SkipLogInsertException skipLogInsertException ) throws Exception {
		
		final String sql = INSERT_OR_UPDATE_SQL;

		try ( Connection dbConnection = super.getDBConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				int counter = 0;
				counter++;
				pstmt.setInt( counter, item.getStructureFile_Like_PDB_File_Id() );
				counter++;
				pstmt.setInt( counter, item.getProteinSequenceVersionId() );
				counter++;
				pstmt.setInt( counter, item.getLimelightAssigned_ChainId() );
				counter++;
				pstmt.setInt( counter, item.getProjectId() );
				counter++;
				pstmt.setString( counter, item.getAligned_StructureFile_Sequence() );
				counter++;
				pstmt.setString( counter, item.getAligned_Limelight_Protein_Sequence() );
				counter++;
				pstmt.setString( counter, item.getSearchIds_WhenAlignmentCreated_CommaDelimited() );
				counter++;
				pstmt.setInt( counter, item.getUserId_Created() );
				counter++;
				pstmt.setInt( counter, item.getUserId_Updated() );
				// On Update
				counter++;
				pstmt.setString( counter, item.getAligned_StructureFile_Sequence() );
				counter++;
				pstmt.setString( counter, item.getAligned_Limelight_Protein_Sequence() );
				counter++;
				pstmt.setInt( counter, item.getUserId_Updated() );


				pstmt.executeUpdate();
			}
		} catch ( Exception e ) {
			if ( skipLogInsertException == null || skipLogInsertException != SkipLogInsertException.YES ) {
				log.error( "ERROR: saveToDatabase(...) item: " + item + ", sql: " + sql, e );
			}
			throw e;
		}
	}

	/////////////
	
//	private final static String UPDATE_SQL = 
//			
//			"UPDATE structure_file_like_pdb_alignment_tbl "
//			+ " SET "
//			+ " aligned_structure_file_sequence = ?, aligned_limelight_protein_sequence = ?,"
//			+ " user_id_updated = ?"
//			+ " WHERE id = ?";
//			
//	
//	/**
//	 * @param item
//	 * @throws Exception
//	 */
//	
//	
//	@Override
//	public void update( StructureFile_Like_PDB_File_Alignment_DTO item ) throws Exception {
//		
//		final String sql = UPDATE_SQL;
//
//		try ( Connection dbConnection = super.getDBConnection() ) {
//
//			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
//				int counter = 0;
//				counter++;
//				pstmt.setString( counter, item.getAligned_StructureFile_Sequence() );
//				counter++;
//				pstmt.setString( counter, item.getAligned_Limelight_Protein_Sequence() );
//				counter++;
//				pstmt.setInt( counter, item.getUserId_Updated() );
//				counter++;
//				pstmt.setInt( counter, item.getId() );
//
//				pstmt.executeUpdate();
//			}
//		} catch ( Exception e ) {
//			log.error( "ERROR: update(...) item: " + item + ", sql: " + sql, e );
//			throw e;
//		}
//	}

	/**
	 * @param structureFile_Like_PDB_File_Id
	 * @param limelightAssigned_ChainId
	 * @param proteinSequenceVersionId
	 * @throws Exception
	 */
	public void delete( 	
			/**
			 * Parent id
			 */
			int structureFile_Like_PDB_File_Id,

			/**
			 * Structure File Limelight Assigned Chain Id
			 */
			int limelightAssigned_ChainId,

			int proteinSequenceVersionId
			) throws Exception {

		final String sql = "DELETE FROM structure_file_like_pdb_alignment_tbl WHERE structure_file_like_pdb_id_fk = ? AND limelight_chain_id = ? AND protein_sequence_version_id = ?";

		try ( Connection dbConnection = super.getDBConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				pstmt.setInt( 1, structureFile_Like_PDB_File_Id );
				pstmt.setInt( 2, limelightAssigned_ChainId );
				pstmt.setInt( 3, proteinSequenceVersionId );
				pstmt.executeUpdate();
			}
		} catch ( Exception e ) {
			log.error( "ERROR: delete(...) structureFile_Like_PDB_File_Id: " + structureFile_Like_PDB_File_Id + ", sql: " + sql, e );
			throw e;
		}
		
	}
	
}
