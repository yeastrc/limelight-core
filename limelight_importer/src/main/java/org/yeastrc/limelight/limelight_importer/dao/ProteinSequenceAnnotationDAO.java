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
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_importer.dto.ProteinSequenceAnnotationDTO;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDatabaseException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;

/**
 * 
 * table protein_sequence_annotation_tbl
 */
public class ProteinSequenceAnnotationDAO {
	
	private static final Logger log = LoggerFactory.getLogger( ProteinSequenceAnnotationDAO.class );
	
	private ProteinSequenceAnnotationDAO() { }
	public static ProteinSequenceAnnotationDAO getInstance() { return new ProteinSequenceAnnotationDAO(); }
	
	/**
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public ProteinSequenceAnnotationDTO getAnnotationDTOFromDatabase( int id ) throws Exception {
		
		ProteinSequenceAnnotationDTO annotation = new ProteinSequenceAnnotationDTO();
		
		final String sql = "SELECT * FROM protein_sequence_annotation_tbl WHERE id = ?";

		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				pstmt.setInt( 1, id );
			
				try ( ResultSet rs = pstmt.executeQuery() ) {

					if( !rs.next() )
						throw new LimelightImporterDatabaseException( "could not find protein_sequence_annotation_tbl with id " + id );
					annotation.setId( id );
					annotation.setTaxonomy( rs.getInt( "taxonomy" ) );
					annotation.setName( rs.getString( "name" ) );
					annotation.setDescription( rs.getString( "description" ) );
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: getAnnotationDTOFromDatabase(...): id: " + id + " sql: " + sql, e );
			throw e;
		} finally {
		}
		return annotation;
	}
	
	/**
	 * Update the id in the annotation DTO object provided from
	 * existing record or inserted record
	 * 
	 * 
	 * @param sequence
	 * @return
	 * @throws Exception
	 */
	public void getAnnotationId_InsertIfNotInDB( ProteinSequenceAnnotationDTO annotation ) throws Exception {

		//  First update last_used_in_search_import so the record doesn't get deleted before the next step 
		update_last_used_in_search_import( annotation );
		
		{
			List<Integer> idList = getIdForNameTaxDesc( annotation );
			if ( idList.size() > 1 ) {
				deleteAllButRecordWithId( idList.get(0), annotation );
			}
			if ( ! idList.isEmpty() ) {
				annotation.setId( idList.get(0) );
				return;
			}
		}
		saveToDatabase( annotation );
		List<Integer> idListAfterInsert = getIdForNameTaxDesc( annotation );
		if ( idListAfterInsert.size() > 1 ) {
			deleteAllButRecordWithId( idListAfterInsert.get(0), annotation );
			annotation.setId( idListAfterInsert.get(0) );
		}
		return;
	}

	/**
	 * Update the last_used_in_search_import associated with this record
	 * @param sequence
	 * @throws Exception
	 */
	public void update_last_used_in_search_import( ProteinSequenceAnnotationDTO annotation ) throws Exception {

		String sql = "UPDATE protein_sequence_annotation_tbl SET last_used_in_search_import = NOW() WHERE name = ? AND taxonomy = ? AND description = ? ";
		if ( annotation.getDescription() == null ) {
			sql = "UPDATE protein_sequence_annotation_tbl SET last_used_in_search_import = NOW() WHERE name = ? AND taxonomy = ? AND description IS NULL ";
		}
		 
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				pstmt.setString( 1, annotation.getName() );
				pstmt.setInt( 2, annotation.getTaxonomy() );
				if ( annotation.getDescription() != null ) {
					pstmt.setString( 3, annotation.getDescription() );
				}
				pstmt.executeUpdate();
			}
		} catch ( Exception e ) {
			log.error( "ERROR: updateStatus(...) sql: " + sql, e );
			throw e;
		}
	}
	
	/**
	 * Get the id for the supplied protein sequence from the database. Returns empty list if not found.
	 * @param sequence
	 * @return
	 * @throws Exception
	 */
	public List<Integer>  getIdForNameTaxDesc( ProteinSequenceAnnotationDTO annotation ) throws Exception {

		List<Integer> results = new ArrayList<>();

		String sql = "SELECT id FROM protein_sequence_annotation_tbl WHERE name = ? AND taxonomy = ? AND description = ? ";
		if ( annotation.getDescription() == null ) {
			sql = "SELECT id FROM protein_sequence_annotation_tbl WHERE name = ? AND taxonomy = ? AND description IS NULL ";
		}

		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				pstmt.setString( 1, annotation.getName() );
				pstmt.setInt( 2, annotation.getTaxonomy() );
				if ( annotation.getDescription() != null ) {
					pstmt.setString( 3, annotation.getDescription() );
				}
				try ( ResultSet rs = pstmt.executeQuery() ) {
					while ( rs.next() ) {
						results.add( rs.getInt( "id" ) );
					}
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: getIdForNameTaxDesc(...): annotationDTO: " + annotation + " sql: " + sql, e );
			throw e;
		} finally {
		}
		Collections.sort( results );
		return results;
	}
	
	/**
	 * @param annotation
	 * @throws Exception
	 */
	private void saveToDatabase( ProteinSequenceAnnotationDTO annotation ) throws Exception {

		int insertedId = 0;
		
		final String sql = "INSERT INTO protein_sequence_annotation_tbl ( name, description, taxonomy ) VALUES (?,?,?)";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {
				pstmt.setString( 1, annotation.getName() );
				pstmt.setString( 2, annotation.getDescription() );
				pstmt.setInt( 3, annotation.getTaxonomy() );
				pstmt.executeUpdate();
				
				try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
					if( rs.next() ) {
						insertedId = rs.getInt( 1 );
					} else
						throw new LimelightImporterDatabaseException( "Failed to insert protein_sequence_annotation_tbl for name: " + annotation.getName()
						+ ", description: " + annotation.getDescription() );
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase(...): annotationDTO: " + annotation + " sql: " + sql, e );
			throw e;
		} finally {
		}
		List<Integer> idList = getIdForNameTaxDesc( annotation );
		if ( idList.size() > 1 ) {
			deleteAllButRecordWithId( idList.get(0), annotation );
		}
		if ( ! idList.isEmpty() ) {
			annotation.setId( idList.get(0) );
			return;
		}
		String msg = "Unable to find protein_sequence_annotation_tbl record just inserted by name, description, taxonomy.  "
				+ "Inserted id: " + insertedId + ", annotation: " + annotation;
		log.error( msg );
		throw new LimelightImporterInternalException(msg);
	}
	
	/**
	 * Clean up database for annotation records inserted more than once
	 * @param id - id to keep
	 * @param sequence
	 * @throws Exception 
	 */
	private void deleteAllButRecordWithId( int id, ProteinSequenceAnnotationDTO annotation ) throws Exception {

		String sql = "DELETE FROM protein_sequence_annotation_tbl WHERE id <> ? AND name = ? AND taxonomy = ? AND description = ? ";
		if ( annotation.getDescription() == null ) {
			sql = "DELETE FROM protein_sequence_annotation_tbl WHERE id <> ? AND name = ? AND taxonomy = ? AND description IS NULL ";
		}
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {
			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				pstmt.setInt( 1, id );
				pstmt.setString( 2, annotation.getName() );
				pstmt.setInt( 3, annotation.getTaxonomy() );
				if ( annotation.getDescription() != null ) {
					pstmt.setString( 4, annotation.getDescription() );
				}
				pstmt.executeUpdate();
			}
		} catch ( Exception e ) {
			log.error( "ERROR: deleteAllButRecordWithId(...): id: " + id + ", annotationDTO: " + annotation + " sql: " + sql, e );
			throw e;
		} finally {
		}
	}
}
