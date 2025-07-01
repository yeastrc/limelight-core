package org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_search_level_annotation_min_max_tbl.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.db_populate_new_fields__common_code.common.database_connection.Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode;
import org.yeastrc.limelight.limelight_shared.dto.SearchLevel_Annotation_MinMax_DTO;

/**
 * 
 * 
 *
 */
public class Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__SaveDBRecords_DAO {

	private static final Logger log = LoggerFactory.getLogger( Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__SaveDBRecords_DAO.class );
	

	private Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__SaveDBRecords_DAO() { }
	private static final Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__SaveDBRecords_DAO _INSTANCE = new Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__SaveDBRecords_DAO();
	public static Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__SaveDBRecords_DAO getInstance() { return _INSTANCE; }
	
	/**
	 * @param item
	 * @throws Exception
	 */
	public void table_search_level_annotation_min_max_tbl__SaveDBRecord( SearchLevel_Annotation_MinMax_DTO item ) throws Exception {

		try ( Connection dbConnection = Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode.getSingletonInstance().getConnection(); ) {
			saveToDatabase( item, dbConnection );
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase( item ) item: " + item, e );
			throw e;
		}
	}
	
	private final static String INSERT_SQL = 
			
			"INSERT INTO search_level_annotation_min_max_tbl "
					+ " ( search_id, annotation_type_id, "
					+ " min_value_double, max_value_double, best_value_double, worst_value_double ) "
					+ " VALUES ( ?, ?, ?, ?, ?, ? ) "
					+ "  ON DUPLICATE KEY UPDATE set_1_on_insert_duplicate = 1 ";

	/**
	 * @param item
	 * @throws Exception
	 */
	private void saveToDatabase( SearchLevel_Annotation_MinMax_DTO item, Connection dbConnection ) throws Exception {
		
		final String sql = INSERT_SQL;
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

			int counter = 0;

			//  INSERT
			counter++;
			pstmt.setInt( counter, item.getSearchId() );
			counter++;
			pstmt.setInt( counter, item.getAnnotationTypeId() );
			counter++;
			pstmt.setDouble( counter, item.getMin_ValueDouble() );
			counter++;
			pstmt.setDouble( counter, item.getMax_ValueDouble() );
			counter++;
			pstmt.setDouble( counter, item.getBest_ValueDouble() );
			counter++;
			pstmt.setDouble( counter, item.getWorst_ValueDouble() );
			
			pstmt.executeUpdate();

		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase(...) item: " + item + ", sql: " + sql, e );
			throw e;
		}
	}
}
