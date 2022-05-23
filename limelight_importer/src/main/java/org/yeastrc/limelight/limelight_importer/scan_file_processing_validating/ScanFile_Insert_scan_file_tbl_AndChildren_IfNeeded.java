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
package org.yeastrc.limelight.limelight_importer.scan_file_processing_validating;

import java.sql.Connection;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_importer.dao.ScanFileDAO_Importer;
import org.yeastrc.limelight.limelight_importer.dao.ScanFileSourceFirstImportDAO_Importer;
import org.yeastrc.limelight.limelight_importer.dao.ScanFileDAO_Importer.SkipLogInsertException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDatabaseException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_shared.dto.ScanFileDTO;
import org.yeastrc.limelight.limelight_shared.dto.ScanFileSourceFirstImportDTO;

/**
 * 
 * Directly manages Database Connection to support Transactions (All succeed or all fail)
 * 
 */
public class ScanFile_Insert_scan_file_tbl_AndChildren_IfNeeded {

	private static final Logger log = LoggerFactory.getLogger( ScanFile_Insert_scan_file_tbl_AndChildren_IfNeeded.class );
	
	private ScanFile_Insert_scan_file_tbl_AndChildren_IfNeeded() { }
	public static ScanFile_Insert_scan_file_tbl_AndChildren_IfNeeded getInstance() { return new ScanFile_Insert_scan_file_tbl_AndChildren_IfNeeded(); }
	

	/**
	 * Get the unified reported peptide DTO corresponding to supplied sequence. 
	 * If no matching unified reported peptide is found in the database, it is inserted and a populated DTO returned.
	 * If already in the database, DTO is populated from database and returned.
	 * 
	 * @param sequence
	 * @return
	 * @throws Exception
	 */
	public ScanFileDTO scanFile_Insert_scan_file_tbl_AndChildren_IfNeeded( 
			ScanFileDTO scanFileDTO,
			ScanFileSourceFirstImportDTO scanFileSourceFirstImportDTO
			 ) throws Exception {

		//  First commit all inserts to this point
		
		ImportRunImporterDBConnectionFactory.getMainSingletonInstance().commitInsertControlCommitConnection();
		
		//  Next:
		//		Insert these records, if needed.
		//		If insert, handle fail on duplicate SpectralStorageAPIKey
		//        If insert fail, validate that SpectralStorageAPIKey in DB
		
		{
			Integer idFromSpectralStorageAPIKey = 
					ScanFileDAO_Importer.getInstance().getScanFileIdForSpectralStorageAPIKey( scanFileDTO.getSpectralStorageAPIKey() );

			if ( idFromSpectralStorageAPIKey != null ) {
				
				scanFileDTO.setId( idFromSpectralStorageAPIKey ); // update scanFileDTO with id from DB
				
				//  Throws exception if error
				validateParamObjMatchDB_WhenSequenceInDB( scanFileDTO, idFromSpectralStorageAPIKey );

				//  SpectralStorageAPIKey is in DB and valid so return updated scanFileDTO
				
				return scanFileDTO;  // EARLY RETURN
			} 
		}
		
		Exception exceptionFromSave = null;
		
		try {
			saveAllRecordsToDatabase( scanFileDTO, scanFileSourceFirstImportDTO );
		} catch ( Exception e ) {
			//  saveAllRecordsToDatabase(...) throws an exception if SpectralStorageAPIKey already in DB, amongst other reasons
			exceptionFromSave = e;
		}
		
		if ( exceptionFromSave != null ) {
			
			// Save failed so validate that SpectralStorageAPIKey is now in DB

			Integer idFromSpectralStorageAPIKey = 
					ScanFileDAO_Importer.getInstance().getScanFileIdForSpectralStorageAPIKey( scanFileDTO.getSpectralStorageAPIKey() );
			
			if ( idFromSpectralStorageAPIKey != null ) {
				
				scanFileDTO.setId( idFromSpectralStorageAPIKey ); // update scanFileDTO with id from DB
				
				//  Throws exception if error
				validateParamObjMatchDB_WhenSequenceInDB( scanFileDTO, idFromSpectralStorageAPIKey );
				
				//  SpectralStorageAPIKey is now in DB and valid so return updated scanFileDTO
				
				return scanFileDTO;  // EARLY RETURN
			} 
			
			// SpectralStorageAPIKey is not in DB so throw exception
			
			String msg = "Insert to DB failed for scanFileDTO and scanFileSourceFirstImportDTO and SpectralStorageAPIKey is not in DB.  SpectralStorageAPIKey: " 
					+ scanFileDTO.getSpectralStorageAPIKey();
			log.error( msg, exceptionFromSave );
			
			throw exceptionFromSave;
		}
		
		//  No exception from save so return updated scanFileDTO

		return scanFileDTO;
	}
	
	/**
	 * @param createDTOs_Root_IsotopeLabelsAndMods_Result
	 * @throws Exception
	 */
	private void saveAllRecordsToDatabase( ScanFileDTO scanFileDTO_Param, ScanFileSourceFirstImportDTO scanFileSourceFirstImportDTO ) throws Exception {

		Connection dbConnection = null;
		
		try {
			dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection();
			
			dbConnection.setAutoCommit( false );  // Start a DB transaction
			
			ScanFileDAO_Importer.getInstance().saveToDatabase( scanFileDTO_Param, SkipLogInsertException.YES, dbConnection );
			
			scanFileSourceFirstImportDTO.setScanFileId( scanFileDTO_Param.getId() );
			
			ScanFileSourceFirstImportDAO_Importer.getInstance().saveToDatabase( scanFileSourceFirstImportDTO, dbConnection );
			
			dbConnection.commit();  // Commit/Finish a DB transaction
			
		} catch ( Exception e ) {
			
			// Log in calling method
			
//			String msg = "Failed ScanFile_Insert_scan_file_tbl_AndChildren_IfNeeded(...)";
//			System.out.println( msg );
//			System.err.println( msg );
//			log.error( msg , e);
			
			if ( dbConnection != null ) {
				try {
					dbConnection.rollback();
				} catch (Exception ex) {
					String msgRollback = "Rollback Exception:  ScanFile_Insert_scan_file_tbl_AndChildren_IfNeeded(...) Exception:  See Syserr or Sysout for original exception: Rollback Exception, tables are in an inconsistent state. '" + ex.toString();
					System.out.println( msgRollback );
					System.err.println( msgRollback );
					log.error( msgRollback, ex );
					throw new LimelightImporterDatabaseException( msgRollback, ex );
				}
			}
			throw e;
		} finally {
			if( dbConnection != null ) {
				try {
					dbConnection.setAutoCommit(true);  /// reset for next user of dbConnectionection
				} catch (Exception ex) {
					String msg = "Failed dbConnection.setAutoCommit(true) in ScanFile_Insert_scan_file_tbl_AndChildren_IfNeeded(...)";
					System.out.println( msg );
					System.err.println( msg );
					throw new LimelightImporterDatabaseException(msg);
				} finally {
					try { dbConnection.close(); } 
					catch(Throwable t ) { ; }
					dbConnection = null;
				}
			}
		}
	}
	
	/**
	 * @param scanFileDTO_Param
	 * @throws LimelightImporterInternalException - when not match
	 * @throws Exception 
	 */
	private void validateParamObjMatchDB_WhenSequenceInDB( 
			ScanFileDTO scanFileDTO_Param,
			int idFromSpectralStorageAPIKey ) throws Exception {
		
		ScanFileDTO scanFileDTO_FromDB = 
				ScanFileDAO_Importer.getInstance().getForId( idFromSpectralStorageAPIKey );
		
		if ( scanFileDTO_FromDB == null ) {
			String msg = "Failed to get record for idFromSpectralStorageAPIKey: " + idFromSpectralStorageAPIKey
					+ ", Spectral Storage API Key: " + scanFileDTO_Param.getSpectralStorageAPIKey();
			log.error( msg );
			throw new LimelightImporterInternalException( msg );
		}
		if ( ! scanFileDTO_FromDB.equals( scanFileDTO_Param ) ) {
			String msg = "For record from SpectralStorageAPIKey, whole record not match record to save: " + idFromSpectralStorageAPIKey
					+ ", Spectral Storage API Key: " + scanFileDTO_Param.getSpectralStorageAPIKey();
			log.error( msg );
			throw new LimelightImporterInternalException( msg );
		}
		
	}
	

}
