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
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_importer.dto.SearchDTO_Importer;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDatabaseException;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.enum_classes.SearchRecordStatus;

/**
 * table search_tbl for Importer
 *
 */
public class SearchDAO {
	
	private static final Logger log = LoggerFactory.getLogger( SearchDAO.class );
	
	private SearchDAO() { }
	public static SearchDAO getInstance() { return new SearchDAO(); }
	
	/**
	 * This will INSERT the given SearchDTO into the database... even if an id is already set.
	 * This will result in a new id being set in the object.
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( SearchDTO_Importer item ) throws Exception {
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {
			saveToDatabase( item, dbConnection );
		}
	}
	
	private static final String INSERT_SQL =
			"INSERT INTO search_tbl "
			+ " (path, directory_name, fasta_filename, "
			+   " has_scan_filenames, has_scan_data, has_isotope_label, reported_peptide_matched_protein_mapping_provided, "
			+   " status_id, created_by_user_id ) "
			+ " VALUES (?, ?, ?, ?, ?, ?, ?, " +  SearchRecordStatus.IMPORTING.value() + ", ? "
			+ " )";
	/**
	 * This will INSERT the given SearchDTO into the database... even if an id is already set.
	 * This will result in a new id being set in the object.
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( SearchDTO_Importer item, Connection dbConnection ) throws Exception {

		final String sql = INSERT_SQL;
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {
			int counter = 0;
			counter++;
			pstmt.setString( counter, item.getPath() );
			counter++;
			pstmt.setString( counter, item.getDirectoryName() );
			counter++;
			pstmt.setString( counter, item.getFastaFilename() );
			counter++;
			if ( item.isHasScanFilenames() ) {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
			} else {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
			}
			counter++;
			if ( item.isHasScanData() ) {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
			} else {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
			}
			counter++;
			if ( item.isHasIsotopeLabel() ) {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
			} else {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
			}
			counter++;
			if ( item.isReportedPeptideMatchedProteinMappingProvided() ) {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
			} else {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
			}
			counter++;
			if ( item.getCreatedByUserId() != null ) {
				pstmt.setInt( counter, item.getCreatedByUserId() );
			} else {
				pstmt.setNull(counter, java.sql.Types.INTEGER );
			}
			
			pstmt.executeUpdate();
			
			try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
				if( rs.next() ) {
					item.setId( rs.getInt( 1 ) );
				} else
					throw new LimelightImporterDatabaseException( "Failed to insert search for " + item.getPath() );
			}
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase(...) sql: " + sql, e );
			throw e;
		}
	}
	
	/**
	 * Update the status_id associated with this search
	 * @param searchId
	 * @param status
	 * @throws Exception
	 */
	public void updateStatus( int searchId, SearchRecordStatus status ) throws Exception {
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {
			updateStatus( searchId, status, dbConnection );
		}
	}
	
	/**
	 * Update the status_id associated with this search
	 * @param searchId
	 * @param status
	 * @throws Exception
	 */
	public void updateStatus( int searchId, SearchRecordStatus status, Connection dbConnection ) throws Exception {
		String sql = "UPDATE search_tbl SET status_id = ?, import_end_timestamp = NOW() WHERE id = ?";
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
			pstmt.setInt( 1, status.value() );
			pstmt.setInt( 2, searchId );
			pstmt.executeUpdate();
		} catch ( Exception e ) {
			log.error( "ERROR: updateStatus(...) sql: " + sql, e );
			throw e;
		}
	}

	/**
	 * Update the any_psm_has_dynamic_modifications associated with this search
	 * @param searchId
	 * @param status
	 * @throws Exception
	 */
	public void updateAnyPsmHasDynamicModifications( int searchId, boolean anyPsmHasDynamicModifications ) throws Exception {
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {
			updateAnyPsmHasDynamicModifications( searchId, anyPsmHasDynamicModifications, dbConnection );
		}
	}
	
	/**
	 * Update the any_psm_has_dynamic_modifications associated with this search
	 * @param searchId
	 * @param status
	 * @throws Exception
	 */
	public void updateAnyPsmHasDynamicModifications( int searchId, boolean anyPsmHasDynamicModifications, Connection dbConnection ) throws Exception {
		
		final String sql = "UPDATE search_tbl SET any_psm_has_dynamic_modifications = ?, import_end_timestamp = NOW() WHERE id = ?";
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
			if ( anyPsmHasDynamicModifications ) {
				pstmt.setInt( 1, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
			} else {
				pstmt.setInt( 1, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
			}
			pstmt.setInt( 2, searchId );
			pstmt.executeUpdate();
		} catch ( Exception e ) {
			log.error( "ERROR: updateAnyPsmHasDynamicModifications(...) sql: " + sql, e );
			throw e;
		}
	}
	

	/**
	 * Update the any_psm_has_reporter_ions associated with this search
	 * @param searchId
	 * @param status
	 * @throws Exception
	 */
	public void updateAnyPsmHasReporterIons( int searchId, boolean anyPsmHasReporterIons ) throws Exception {
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {
			updateAnyPsmHasReporterIons( searchId, anyPsmHasReporterIons, dbConnection );
		}
	}
	
	/**
	 * Update the any_psm_has_reporter_ions associated with this search
	 * @param searchId
	 * @param status
	 * @throws Exception
	 */
	public void updateAnyPsmHasReporterIons( int searchId, boolean anyPsmHasReporterIons, Connection dbConnection ) throws Exception {
		
		final String sql = "UPDATE search_tbl SET any_psm_has_reporter_ions = ?, import_end_timestamp = NOW() WHERE id = ?";
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
			if ( anyPsmHasReporterIons ) {
				pstmt.setInt( 1, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
			} else {
				pstmt.setInt( 1, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
			}
			pstmt.setInt( 2, searchId );
			pstmt.executeUpdate();
		} catch ( Exception e ) {
			log.error( "ERROR: updateAnyPsmHasReporterIons(...) sql: " + sql, e );
			throw e;
		}
	}
}
