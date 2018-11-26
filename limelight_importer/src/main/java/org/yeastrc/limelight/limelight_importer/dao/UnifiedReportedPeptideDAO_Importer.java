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
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDatabaseException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.dto.UnifiedReportedPeptideLookupDTO;

/**
 * table unified_reported_peptide_lookup_tbl
 *
 */
public class UnifiedReportedPeptideDAO_Importer {

	private static final Logger log = LoggerFactory.getLogger( UnifiedReportedPeptideDAO_Importer.class );
	
	private UnifiedReportedPeptideDAO_Importer() { }
	public static UnifiedReportedPeptideDAO_Importer getInstance() { return new UnifiedReportedPeptideDAO_Importer(); }
	
	/**
	 * Get the id for the supplied reported peptide sequence (as it appears in analysis program output) from the database. 
	 * @param sequence
	 * @return null if not found
	 * @throws Exception
	 */
	public Integer getReportedPeptideIdForSequence( String sequence ) throws Exception {
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {

			return getReportedPeptideIdForSequence( sequence, dbConnection );
		}
	}

	/**
	 * Get the id for the supplied reported peptide sequence (as it appears in analysis program output) from the database. 
	 * @param sequence
	 * @return null if not found
	 * @throws Exception
	 */
	public Integer getReportedPeptideIdForSequence( String sequence, Connection dbConnection ) throws Exception {
		
		Integer id = null;
		
		final String sql = "SELECT id FROM unified_reported_peptide_lookup_tbl WHERE unified_sequence = ? ORDER BY id LIMIT 1";
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
			pstmt.setString( 1, sequence );

			try ( ResultSet rs = pstmt.executeQuery() ) {
				if( rs.next() ) {
					id = rs.getInt( 1 );
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: getReportedPeptideIdForSequence(...) sql: " + sql, e );
			throw e;
		}
		
		return id;
	}


	/**
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( UnifiedReportedPeptideLookupDTO item ) throws Exception {

		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {
			saveToDatabase( item, dbConnection );
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase( item ) item: " + item, e );
			throw e;
		}
	}

	private final static String INSERT_SQL = 
			
			"INSERT INTO unified_reported_peptide_lookup_tbl "
			+ "( peptide_id, has_dynamic_modifictions, has_isotope_labels, unified_sequence ) "
					
			+ "VALUES (?, ?, ?, ?)";
	
	/**
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( UnifiedReportedPeptideLookupDTO item, Connection dbConnection ) throws Exception {
		
		final String sql = INSERT_SQL;
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {
			int counter = 0;
			counter++;
			pstmt.setInt( counter, item.getPeptideId() );
			counter++;
			if ( item.isHasDynamicModifications() ) {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
			} else {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
			}
			counter++;
			if ( item.isHasIsotopeLabels() ) {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
			} else {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
			}
			counter++;
			pstmt.setString( counter, item.getSequence() );
			pstmt.executeUpdate();

			try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
				if( rs.next() ) {
					long idOfSaved = rs.getLong( 1 );
					if ( idOfSaved > Integer.MAX_VALUE ) {
						String msg = "'id' of record saved to unified_reported_peptide_lookup_tbl exceeds Integer.MAX_VALUE. Java code change required. 'id': " + idOfSaved;
						log.error( msg );
						throw new LimelightImporterInternalException(msg);
					}
					item.setId( (int) idOfSaved );
				} else
					throw new LimelightImporterDatabaseException( "Failed to get 'id' for insert of unified_reported_peptide_lookup_tbl for " + item.getSequence() );
			}
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase(...) item: " + item + ", sql: " + sql, e );
			throw e;
		}
	}
	
	/**
	 * @param id
	 * @throws Exception
	 */
	public void delete( int id ) throws Exception {

		final String sql = "DELETE FROM unified_reported_peptide_lookup_tbl WHERE id = ?";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				pstmt.setInt( 1, id );
				pstmt.executeUpdate();
			}
		} catch ( Exception e ) {
			log.error( "ERROR: delete(...) id: " + id + ", sql: " + sql, e );
			throw e;
		}
	}
	

	/**
	 * @param id
	 * @throws Exception
	 */
	public UnifiedReportedPeptideLookupDTO getForId( int id ) throws Exception {

		UnifiedReportedPeptideLookupDTO result = null;
		
		final String sql = "SELECT * FROM unified_reported_peptide_lookup_tbl WHERE id = ?";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				pstmt.setInt( 1, id );
				pstmt.executeQuery();

				try ( ResultSet rs = pstmt.executeQuery() ) {
					if( rs.next() ) {
						result = new UnifiedReportedPeptideLookupDTO();
						result.setId( rs.getInt( "id" ) );
						int has_dynamic_modifictionsInt = rs.getInt( "has_dynamic_modifictions" );
						if ( has_dynamic_modifictionsInt == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							result.setHasDynamicModifications( true );
						}
						int has_isotope_labelsInt = rs.getInt( "has_isotope_labels" );
						if ( has_isotope_labelsInt == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							result.setHasIsotopeLabels( true );
						}
						result.setPeptideId( rs.getInt( "peptide_id" ) );
						result.setSequence( rs.getString( "unified_sequence" ) );
					}
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: getForId(...) id: " + id + ", sql: " + sql, e );
			throw e;
		}
		return result;
	}
	
}
