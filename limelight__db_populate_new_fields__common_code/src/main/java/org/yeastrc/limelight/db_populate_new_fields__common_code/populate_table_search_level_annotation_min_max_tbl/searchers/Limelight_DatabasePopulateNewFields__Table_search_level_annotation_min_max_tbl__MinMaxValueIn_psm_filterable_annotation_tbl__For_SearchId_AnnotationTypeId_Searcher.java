package org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_search_level_annotation_min_max_tbl.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.db_populate_new_fields__common_code.common.database_connection.Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode;


/**
 * 
 * 
 *
 */
public class Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__MinMaxValueIn_psm_filterable_annotation_tbl__For_SearchId_AnnotationTypeId_Searcher {

	private static final Logger log = LoggerFactory.getLogger( Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__MinMaxValueIn_psm_filterable_annotation_tbl__For_SearchId_AnnotationTypeId_Searcher.class );
	

	private Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__MinMaxValueIn_psm_filterable_annotation_tbl__For_SearchId_AnnotationTypeId_Searcher() { }
	private static final Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__MinMaxValueIn_psm_filterable_annotation_tbl__For_SearchId_AnnotationTypeId_Searcher _INSTANCE = new Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__MinMaxValueIn_psm_filterable_annotation_tbl__For_SearchId_AnnotationTypeId_Searcher();
	public static Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__MinMaxValueIn_psm_filterable_annotation_tbl__For_SearchId_AnnotationTypeId_Searcher getInstance() { return _INSTANCE; }
	
	public static class Searcher_Result {
		
		private double max_Value;
		private double min_Value;
		
		public double getMax_Value() {
			return max_Value;
		}
		public double getMin_Value() {
			return min_Value;
		}
	}
	
	private static final String QUERY_SQL = 
			"SELECT MAX(value_double) AS max, MIN(value_double) AS min "
			+ " FROM "
			+ " psm_filterable_annotation_tbl "
			+ " INNER JOIN psm_tbl ON psm_filterable_annotation_tbl.psm_id = psm_tbl.id "
			+ " WHERE psm_tbl.search_id = ? AND psm_filterable_annotation_tbl.annotation_type_id = ?";

	public Searcher_Result
	
	get_MaxMin_For_SearchId_AnnotationTypeId( int searchId, int annotationTypeId ) throws SQLException {

		Searcher_Result result = new Searcher_Result();

		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode.getSingletonInstance().getConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, searchId );
			preparedStatement.setInt( 2, annotationTypeId );
			
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result.max_Value = rs.getDouble( "max" );
					result.min_Value = rs.getDouble( "min" );
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return result;
	}

}
