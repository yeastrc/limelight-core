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
package org.yeastrc.limelight.limelight_importer.unified_reported_peptide;

import java.sql.Connection;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_importer.dao.UnifiedRepPepDynamicModLookupDAO_Importer;
import org.yeastrc.limelight.limelight_importer.dao.UnifiedRepPepIsotopeLabelLookupDAO_Importer;
import org.yeastrc.limelight.limelight_importer.dao.UnifiedReportedPeptideDAO_Importer;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDatabaseException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_shared.dto.UnifiedRepPepDynamicModLookupDTO;
import org.yeastrc.limelight.limelight_shared.dto.UnifiedReportedPeptideLookupDTO;

/**
 * Package Private
 * 
 * Directly manages Database Connection to support Transactions (All succeed or all fail)
 * 
 * Save to tables:
 * 
 *   
 *
 */
class UnifiedReportedPeptide_SaveRoot_Mods_IsotopeLabelsIfNeeded {

	private static final Logger log = LoggerFactory.getLogger( UnifiedReportedPeptide_SaveRoot_Mods_IsotopeLabelsIfNeeded.class );
	
	private UnifiedReportedPeptide_SaveRoot_Mods_IsotopeLabelsIfNeeded() { }
	public static UnifiedReportedPeptide_SaveRoot_Mods_IsotopeLabelsIfNeeded getInstance() { return new UnifiedReportedPeptide_SaveRoot_Mods_IsotopeLabelsIfNeeded(); }
	

	/**
	 * Get the unified reported peptide DTO corresponding to supplied sequence. 
	 * If no matching unified reported peptide is found in the database, it is inserted and a populated DTO returned.
	 * If already in the database, DTO is populated from database and returned.
	 * 
	 * @param sequence
	 * @return
	 * @throws Exception
	 */
	public UnifiedReportedPeptideLookupDTO SaveRoot_Mods_IsotopeLabelsIfNeeded( 
			UnifiedReportedPeptide_CreateDTOs_Root_IsotopeLabelsAndMods.CreateDTOs_Root_IsotopeLabelsAndMods_Result createDTOs_Root_IsotopeLabelsAndMods_Result ) throws Exception {

		//  First commit all inserts to this point
		
		ImportRunImporterDBConnectionFactory.getInstance().commitInsertControlCommitConnection();
		
		UnifiedReportedPeptideLookupDTO unifiedReportedPeptideLookupDTO_Param = createDTOs_Root_IsotopeLabelsAndMods_Result.unifiedReportedPeptideLookupDTO;
				
		Integer idFromSequence = 
				UnifiedReportedPeptideDAO_Importer.getInstance().getReportedPeptideIdForSequence( unifiedReportedPeptideLookupDTO_Param.getSequence() );
		
		if ( idFromSequence != null ) {
			unifiedReportedPeptideLookupDTO_Param.setId( idFromSequence );
			//  Throws exception if error
			validateParamObjMatchDB_WhenSequenceInDB( unifiedReportedPeptideLookupDTO_Param, idFromSequence );
		} else {
			saveAllRecordsToDatabase( createDTOs_Root_IsotopeLabelsAndMods_Result );
			fixTableIfSavedEntryNotFirstEntry( unifiedReportedPeptideLookupDTO_Param );
		}

		//  Extra call to commit all inserts to this point to be safe
		
		ImportRunImporterDBConnectionFactory.getInstance().commitInsertControlCommitConnection();
		
		return unifiedReportedPeptideLookupDTO_Param;
	}
	
	/**
	 * @param createDTOs_Root_IsotopeLabelsAndMods_Result
	 * @throws Exception
	 */
	private void saveAllRecordsToDatabase( UnifiedReportedPeptide_CreateDTOs_Root_IsotopeLabelsAndMods.CreateDTOs_Root_IsotopeLabelsAndMods_Result createDTOs_Root_IsotopeLabelsAndMods_Result ) throws Exception {

		Connection dbConnection = null;
		
		try {
			dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection();
			
			dbConnection.setAutoCommit( false );  // Start a DB transaction
			
			UnifiedReportedPeptideLookupDTO unifiedReportedPeptideLookupDTO_Param = createDTOs_Root_IsotopeLabelsAndMods_Result.unifiedReportedPeptideLookupDTO;
			UnifiedReportedPeptideDAO_Importer.getInstance().saveToDatabase( unifiedReportedPeptideLookupDTO_Param, dbConnection );
			
			if ( createDTOs_Root_IsotopeLabelsAndMods_Result.unifiedRepPepDynamicModLookupDTOList != null 
					&& ( ! createDTOs_Root_IsotopeLabelsAndMods_Result.unifiedRepPepDynamicModLookupDTOList.isEmpty() ) ) {
				
				UnifiedRepPepDynamicModLookupDAO_Importer unifiedRepPepDynamicModLookupDAO_Importer = UnifiedRepPepDynamicModLookupDAO_Importer.getInstance();
				for ( UnifiedRepPepDynamicModLookupDTO unifiedRepPepDynamicModLookupDTO : createDTOs_Root_IsotopeLabelsAndMods_Result.unifiedRepPepDynamicModLookupDTOList ) {
					unifiedRepPepDynamicModLookupDTO.setUnifiedReportedPeptideLookupId( unifiedReportedPeptideLookupDTO_Param.getId() );
					unifiedRepPepDynamicModLookupDAO_Importer.save( unifiedRepPepDynamicModLookupDTO, dbConnection );
				}
			}
			
			if ( createDTOs_Root_IsotopeLabelsAndMods_Result.unifiedRepPepIsotopeLabelLookupDTO != null ) {
				createDTOs_Root_IsotopeLabelsAndMods_Result.unifiedRepPepIsotopeLabelLookupDTO.setUnifiedReportedPeptideLookupId( unifiedReportedPeptideLookupDTO_Param.getId() );
				UnifiedRepPepIsotopeLabelLookupDAO_Importer.getInstance()
				.save( createDTOs_Root_IsotopeLabelsAndMods_Result.unifiedRepPepIsotopeLabelLookupDTO, dbConnection);
			}
			
			dbConnection.commit();  // Commit/Finish a DB transaction
			
		} catch ( Exception e ) {
			String msg = "Failed UnifiedReportedPeptide_SaveRoot_Mods_IsotopeLabelsIfNeeded(...)";
			System.out.println( msg );
			System.err.println( msg );
			log.error( msg , e);
			if ( dbConnection != null ) {
				try {
					dbConnection.rollback();
				} catch (Exception ex) {
					String msgRollback = "Rollback Exception:  UnifiedReportedPeptide_SaveRoot_Mods_IsotopeLabelsIfNeeded(...) Exception:  See Syserr or Sysout for original exception: Rollback Exception, tables are in an inconsistent state. '" + ex.toString();
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
					String msg = "Failed dbConnection.setAutoCommit(true) in UnifiedReportedPeptide_SaveRoot_Mods_IsotopeLabelsIfNeeded(...)";
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
	 * @param unifiedReportedPeptideLookupDTO
	 */
	private void fixTableIfSavedEntryNotFirstEntry( UnifiedReportedPeptideLookupDTO unifiedReportedPeptideLookupDTO_Param ) throws Exception {
		
		//  Since another process may insert a record between the SELECT and the INSERT,
		//  Retrieve on the sequence again and confirm the id is the one just inserted
		Integer idFromQueryOnSequence = UnifiedReportedPeptideDAO_Importer.getInstance().getReportedPeptideIdForSequence( unifiedReportedPeptideLookupDTO_Param.getSequence() );
		if ( idFromQueryOnSequence == null ) {
			String msg = "Unified Reported Peptide Sequence just inserted is no longer in the database.";
			log.error( msg );
			throw new LimelightImporterInternalException(msg);
		}
		if ( idFromQueryOnSequence.intValue() != unifiedReportedPeptideLookupDTO_Param.getId() ) {
			//  The record in the table with the smallest 'id' for this sequence is not the one just inserted:
			UnifiedReportedPeptideDAO_Importer.getInstance().delete( unifiedReportedPeptideLookupDTO_Param.getId() );               //    Remove the one just inserted
			unifiedReportedPeptideLookupDTO_Param.setId( idFromQueryOnSequence );  //    Update the id of unifiedReportedPeptideLookupDTO to the record with the smallest 'id'
			//  Throws exception if error
			validateParamObjMatchDB_WhenSequenceInDB( unifiedReportedPeptideLookupDTO_Param, idFromQueryOnSequence );
		}
	}

	/**
	 * @param unifiedReportedPeptideLookupDTO_Param
	 * @throws LimelightImporterInternalException - when not match
	 * @throws Exception 
	 */
	private void validateParamObjMatchDB_WhenSequenceInDB( 
			UnifiedReportedPeptideLookupDTO unifiedReportedPeptideLookupDTO_Param,
			int idFromSequence ) throws Exception {
		
		UnifiedReportedPeptideLookupDTO unifiedReportedPeptideLookupDTO_FromDB = 
				UnifiedReportedPeptideDAO_Importer.getInstance().getForId( idFromSequence );
		
		if ( unifiedReportedPeptideLookupDTO_FromDB == null ) {
			String msg = "Failed to get record for idFromSequence: " + idFromSequence
					+ ", sequence: " + unifiedReportedPeptideLookupDTO_Param.getSequence();
			log.error( msg );
			throw new LimelightImporterInternalException( msg );
		}
		if ( ! unifiedReportedPeptideLookupDTO_FromDB.equals( unifiedReportedPeptideLookupDTO_Param ) ) {
			String msg = "For record from sequence, whole record not match record to save: " + idFromSequence
					+ ", sequence: " + unifiedReportedPeptideLookupDTO_Param.getSequence();
			log.error( msg );
			throw new LimelightImporterInternalException( msg );
		}
		
	}
	
}
