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
package org.yeastrc.limelight.limelight_feature_detection_run_import.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetectionSingularFeatureEntryDTO;

/**
 * table feature_detection_singular_feature_entry_tbl - Insert
 * 
 * !!!  WARNING:  the 'id' property is NOT updated 
 *
 */
public class FeatureDetectionSingularFeatureEntry_DAO {
	
	private static final Logger log = LoggerFactory.getLogger( FeatureDetectionSingularFeatureEntry_DAO.class );

	public static final int DEFAULT_INSERT_ENTRIES_ARRAY_SIZE = 4000;

	
	private FeatureDetectionSingularFeatureEntry_DAO() { }
	public static FeatureDetectionSingularFeatureEntry_DAO getInstance() { return new FeatureDetectionSingularFeatureEntry_DAO(); }



	////////////////////////

	private static final String SELECT_SQL_ALL_FOR__Ids__START = 
			"SELECT * FROM feature_detection_singular_feature_entry_tbl "
			+ " WHERE id IN ( ";
	
	/**
	 * @param featureDetectionRootId
	 * @return
	 * @throws SQLException 
	 */
	public List<FeatureDetectionSingularFeatureEntryDTO> getAll_For_FeatureDetectionRootId( int[] ids ) throws SQLException {
		
		List<FeatureDetectionSingularFeatureEntryDTO> resultList = new ArrayList<>();
		
		StringBuilder sqlSB = new StringBuilder( 100000 );
		
		sqlSB.append( SELECT_SQL_ALL_FOR__Ids__START );
		
		for ( int count = 1; count <= ids.length; count++ ) {
			if ( count > 1 ) {
				sqlSB.append( "," );
			}
			sqlSB.append( "?" );
		}
		sqlSB.append( ")" );
		
		final String querySQL = sqlSB.toString();
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			int paramCounter = 0;
			
			for ( int id : ids ) {
				paramCounter++;
				preparedStatement.setInt( paramCounter, id );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					FeatureDetectionSingularFeatureEntryDTO result = getResultObject(rs);
					resultList.add(result);
				}
			}
		} catch ( RuntimeException e ) {
			String msg = "SQL: " + querySQL;
			log.error( msg, e );
			throw e;
		} catch ( SQLException e ) {
			String msg = "SQL: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		
		return resultList;
	}
	
	/**
	 * @param rs
	 * @return
	 * @throws SQLException 
	 */
	private FeatureDetectionSingularFeatureEntryDTO getResultObject( ResultSet rs ) throws SQLException {
		
		FeatureDetectionSingularFeatureEntryDTO result = new FeatureDetectionSingularFeatureEntryDTO();
		result.setId( rs.getInt( "id" ) ); 
		result.setFeatureDetectionRootId( rs.getInt( "feature_detection_root_id" ) ); 
		result.setFeatureDetectionSingularFeatureUploadedFileStatsId( rs.getInt( "feature_detection_singular_feature_uploaded_file_stats_id" ) );
		result.setMs_1_scanNumber( rs.getInt( "ms_1_scan_number" ) ); 

		{
			int fieldValue = rs.getInt( "charge" );
			if ( ! rs.wasNull() ) {
				result.setCharge( fieldValue ); 
			}
		}

		{
			double fieldValue = rs.getDouble( "monoisotopic_mass" );
			if ( ! rs.wasNull() ) {
				result.setMonoisotopicMass( fieldValue ); 
			}
		}
		{
			double fieldValue = rs.getDouble( "intensity" );
			if ( ! rs.wasNull() ) {
				result.setIntensity( fieldValue ); 
			}
		}
		{
			double fieldValue = rs.getDouble( "base_isotope_peak" );
			if ( ! rs.wasNull() ) {
				result.setBase_isotope_peak( fieldValue ); 
			}
		}
		{
			double fieldValue = rs.getDouble( "analysis_window_start_m_z" );
			if ( ! rs.wasNull() ) {
				result.setAnalysis_window_start_m_z( fieldValue ); 
			}
		}
		{
			double fieldValue = rs.getDouble( "analysis_window_end_m_z" );
			if ( ! rs.wasNull() ) {
				result.setAnalysis_window_end_m_z( fieldValue ); 
			}
		}
		{
			double fieldValue = rs.getDouble( "correlation_score" );
			if ( ! rs.wasNull() ) {
				result.setCorrelation_score( fieldValue ); 
			}
		}
		
		return result;
	}
	
	////////////////////////

	private static final String INSERT_SQL = 
			"INSERT INTO feature_detection_singular_feature_entry_tbl "
			+ " ( "
			+ " id, feature_detection_root_id, feature_detection_singular_feature_uploaded_file_stats_id, "
			+ " ms_1_scan_number, "
			+ " monoisotopic_mass, charge, intensity, "
			+ " base_isotope_peak, analysis_window_start_m_z, analysis_window_end_m_z, "
			+ " correlation_score "
			+ " ) "
			+ "VALUES ";

	private static final String INSERT_VALUES_SINGLE_ENTRY_SQL = "( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )";

	private volatile String insert_SQL__For_DefaultInsertEntriesSize;

	/**
	 * @param entryCount
	 * @return
	 */
	private String create_insert_SQL( int entryCount ) {
		
		StringBuilder sqlSB = new StringBuilder( INSERT_SQL.length() + ( ( INSERT_VALUES_SINGLE_ENTRY_SQL.length() + 5 ) * DEFAULT_INSERT_ENTRIES_ARRAY_SIZE ) );

		sqlSB.append( INSERT_SQL );
		
		for ( int counter = 1; counter <= entryCount; counter++ ) {
			if ( counter != 1 ) {
				sqlSB.append( "," );
			}
			sqlSB.append( INSERT_VALUES_SINGLE_ENTRY_SQL );
		}
		
		return sqlSB.toString();
	}
	
	/**
	 * @param itemList
	 * @throws Exception
	 */
	public void insert_NOT_Update_ID_Property_InDTOParams( List<FeatureDetectionSingularFeatureEntryDTO> itemList ) throws Exception {
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			//  Insert 
			insert_NOT_Update_ID_Property_InDTOParams( itemList, dbConnection );
		}
	}

	/**
	 * @param itemList
	 * @param dbConnection
	 * @throws Exception
	 */
	public void insert_NOT_Update_ID_Property_InDTOParams( List<FeatureDetectionSingularFeatureEntryDTO> itemList, Connection dbConnection ) throws Exception {

		if ( itemList.isEmpty() ) {
			throw new IllegalArgumentException( "( itemList.isEmpty() )" );
		}

		String insertSQL_Local = null;
		
		if ( itemList.size() == DEFAULT_INSERT_ENTRIES_ARRAY_SIZE ) {
			
			if ( this.insert_SQL__For_DefaultInsertEntriesSize == null ) {

				this.insert_SQL__For_DefaultInsertEntriesSize = this.create_insert_SQL(DEFAULT_INSERT_ENTRIES_ARRAY_SIZE);
			}
			
			insertSQL_Local = this.insert_SQL__For_DefaultInsertEntriesSize;
		} else {
			
			insertSQL_Local = this.create_insert_SQL( itemList.size() );
		}
		
		final String insertSQL = insertSQL_Local;

		try ( PreparedStatement pstmt = dbConnection.prepareStatement( insertSQL ) ) {

			int counter = 0;

			for ( FeatureDetectionSingularFeatureEntryDTO item: itemList ) {
				counter++;
				pstmt.setInt( counter, item.getId() );
				counter++;
				pstmt.setInt( counter, item.getFeatureDetectionRootId() );
				counter++;
				pstmt.setInt( counter, item.getFeatureDetectionSingularFeatureUploadedFileStatsId() );
				counter++;
				pstmt.setInt( counter, item.getMs_1_scanNumber() );
				counter++;
				if ( item.getMonoisotopicMass() != null ) {
					pstmt.setDouble( counter, item.getMonoisotopicMass() );
				} else {
					pstmt.setNull( counter, java.sql.Types.DOUBLE );
				}
				counter++;
				if ( item.getCharge() != null ) {
					pstmt.setInt( counter, item.getCharge() );
				} else {
					pstmt.setNull( counter, java.sql.Types.INTEGER );
				}
				counter++;
				if ( item.getIntensity() != null ) {
					pstmt.setDouble( counter, item.getIntensity() );
				} else {
					pstmt.setNull( counter, java.sql.Types.DOUBLE );
				}
				counter++;
				if ( item.getBase_isotope_peak() != null ) {
					pstmt.setDouble( counter, item.getBase_isotope_peak() );
				} else {
					pstmt.setNull( counter, java.sql.Types.DOUBLE );
				}
				counter++;
				if ( item.getAnalysis_window_start_m_z() != null ) {
					pstmt.setDouble( counter, item.getAnalysis_window_start_m_z() );
				} else {
					pstmt.setNull( counter, java.sql.Types.DOUBLE );
				}
				counter++;
				if ( item.getAnalysis_window_end_m_z() != null ) {
					pstmt.setDouble( counter, item.getAnalysis_window_end_m_z() );
				} else {
					pstmt.setNull( counter, java.sql.Types.DOUBLE );
				}
				counter++;
				if ( item.getCorrelation_score() != null ) {
					pstmt.setDouble( counter, item.getCorrelation_score() );
				} else {
					pstmt.setNull( counter, java.sql.Types.DOUBLE );
				}
			}

			pstmt.executeUpdate();
			
		} catch ( Exception e ) {
			log.error( "ERROR: insert_NOT_Update_ID_Property_InDTOParams(...) sql: " + insertSQL + "\nfirst item to save: " + itemList.get(0), e );
			throw e;
		}
	}
	
	///////////////////////////
	

	/**
	 * @throws Exception 
	 * 
	 */
	public FeatureDetectionSingularFeatureEntry_DAO__BatchIds_Start_End getNextBatch_IDs() throws Exception {
		
		final int try_Count_Max = 10;
		
		int try_Counter = 0;
				
		while ( true ) {
			
			try_Counter++;
			
			if ( try_Counter > try_Count_Max ) {
				String msg = "getNextBatch_IDs(): try_Counter > try_Count_Max. try_Count_Max: " + try_Count_Max;
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}


			// get feature_detection_singular_feature_entry__insert_id_tbl and then 'advance' feature_detection_singular_feature_entry__insert_id_tbl by adding DEFAULT_INSERT_ENTRIES_ARRAY_SIZE to it.

			Integer id_LastInserted = get_LastId_InsertId_Table();

			if ( id_LastInserted == null ) {
				//  No entries in DB

				//  Insert zero into db

				try {
					insertId_Value_InsertId_Table( 0 );
				} catch (Exception e) {
					//  Swallow Exception since may be duplicate
				}

				id_LastInserted = get_LastId_InsertId_Table();  // Run query again.  Another Importer may have inserted a different value

				if ( id_LastInserted == null ) {
					String msg = "No psmId_LastInserted after insert value zero.  Investigate error message for insertId_Value(...)";
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}

				if ( id_LastInserted.intValue() != 0 ) {
					// There is now a value in the table that is not the zero entry just inserted so delete the zero entry

					deleteId_InsertId_Table(0);
				}
			}

			//  Now have a value for id_LastInserted.  This may be updated by another
			
			int id_New = id_LastInserted + DEFAULT_INSERT_ENTRIES_ARRAY_SIZE; // New "Last Inserted PSM Id"
			
			int id_Existing = id_LastInserted;

			if ( updateId_InsertId_Table( id_New, id_Existing ) ) {
				
				FeatureDetectionSingularFeatureEntry_DAO__BatchIds_Start_End result = new FeatureDetectionSingularFeatureEntry_DAO__BatchIds_Start_End();
				
				result.id_Start = id_LastInserted + 1;
				result.id_End = id_LastInserted + DEFAULT_INSERT_ENTRIES_ARRAY_SIZE; // New "Last Inserted PSM Id"
				
				return result;
			}
			
			
			Thread.sleep(1005);  // wait before retry
			
		}
		
		
	}
	

	/**
	 * @return null when no record found
	 * @throws Exception
	 */
	private Integer get_LastId_InsertId_Table() throws Exception {
		
		final String sql = "SELECT id FROM feature_detection_singular_feature_entry__insert_id_tbl ORDER BY id DESC LIMIT 1";
		
		Integer id_LastInserted = null;
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				
				try ( ResultSet rs = pstmt.executeQuery() ) {
					if( rs.next() ) {
						id_LastInserted = rs.getInt( "id" );
					}
				}
			}
			
		} catch ( Exception e ) {
			log.error( "ERROR: get_Id_InsertId_Table(...) sql: " + sql, e );
			throw e;
		}
		
		return id_LastInserted;
	}

	/**
	 * 
	 * 
	 * @param id
	 * @throws Exception 
	 */
	private boolean updateId_InsertId_Table( int id_New, int id_Existing ) throws Exception {
		
		boolean any_RecordsUpdated = false;
		
		final String sql = "UPDATE feature_detection_singular_feature_entry__insert_id_tbl SET id = ? WHERE id = ?";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				pstmt.setInt( 1, id_New );
				pstmt.setInt( 2, id_Existing );

				int updateCount = pstmt.executeUpdate();
				
				if ( updateCount > 0 ) {
					
					any_RecordsUpdated = true;
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: updateId_InsertId_Table(id). id_New: " + id_New + ", id_Existing: " + id_Existing + ", sql: " + sql, e );
			throw e;
		}
		
		return any_RecordsUpdated;
	}
	
	/**
	 * Insert into 'side' table to insert zero when table is empty
	 * @throws Exception 
	 */
	private void insertId_Value_InsertId_Table(int id) throws Exception {
		
		final String INSERT_GET_ID_SQL = "INSERT INTO feature_detection_singular_feature_entry__insert_id_tbl ( id ) VALUES ( ? )";
		final String sql = INSERT_GET_ID_SQL;
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				pstmt.setInt( 1, id );
				
				int updateCount = pstmt.executeUpdate();
			}
		} catch ( Exception e ) {
			log.error( "Exception Ignored since May be duplicate.  Logged in case there is a different error to research: insertId_Value(...): id: " + id + ", sql: " + sql, e );
			throw e;
		}

	}

	/**
	 * 
	 * 
	 * @param id
	 * @throws Exception 
	 */
	private void deleteId_InsertId_Table( int id ) throws Exception {
		
		final String DELETE_SQL = "DELETE FROM feature_detection_singular_feature_entry__insert_id_tbl WHERE id = ?";
		final String sql = DELETE_SQL;
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				pstmt.setLong( 1, id );

				int updateCount = pstmt.executeUpdate();
			}
		} catch ( Exception e ) {
			log.error( "ERROR: deleteId(id). id: " + id + ", sql: " + sql, e );
			throw e;
		}
	}
	
	

	/**
	 * 
	 *
	 */
	public static class FeatureDetectionSingularFeatureEntry_DAO__BatchIds_Start_End {
		
		int id_Start;
		int id_End;
		
		public int getId_Start() {
			return id_Start;
		}
		public int getId_End() {
			return id_End;
		}
	}
}
