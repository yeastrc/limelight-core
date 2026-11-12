package org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_search_level_annotation_min_max_tbl__fix_below_best_worst.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.db_populate_new_fields__common_code.common.database_connection.Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode;

/**
 * Table 'search_level_annotation_min_max_tbl'
 *
 * Fix best/worst values for annotation types with filter direction 'below'.
 *
 * The Populate of 'search_level_annotation_min_max_tbl' wrote best = max and worst = min for filter direction 'below'.
 * For filter direction 'below', best is the min and worst is the max.
 *
 * Only rows with best > worst are changed so rows written by the Importer (correct) are not changed.
 */
public class Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__Fix_Below_BestWorst_Update_DAO {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__Fix_Below_BestWorst_Update_DAO.class);

	private Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__Fix_Below_BestWorst_Update_DAO() { }
	private static final Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__Fix_Below_BestWorst_Update_DAO _INSTANCE = new Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__Fix_Below_BestWorst_Update_DAO();
	public static Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__Fix_Below_BestWorst_Update_DAO getInstance() { return _INSTANCE; }

	private static final String SQL =
			"UPDATE search_level_annotation_min_max_tbl "
			+ " INNER JOIN annotation_type_filterable_tbl "
			+ " ON search_level_annotation_min_max_tbl.annotation_type_id = annotation_type_filterable_tbl.annotation_type_id "
			+ " SET search_level_annotation_min_max_tbl.best_value_double = search_level_annotation_min_max_tbl.min_value_double, "
			+ " search_level_annotation_min_max_tbl.worst_value_double = search_level_annotation_min_max_tbl.max_value_double "
			+ " WHERE annotation_type_filterable_tbl.filter_direction = 'below' "
			+ " AND search_level_annotation_min_max_tbl.best_value_double > search_level_annotation_min_max_tbl.worst_value_double ";

	/**
	 * @return number of rows updated
	 * @throws Exception
	 */
	public int update_Fix_Below_BestWorst() throws Exception {

		String sql = SQL;

		try ( Connection dbConnection = Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode.getSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				int rowsUpdated = pstmt.executeUpdate();

				return rowsUpdated;
			}

		} catch ( Exception e ) {
			String msg = "update_Fix_Below_BestWorst(), sql: " + sql;
			log.error( msg, e );
			throw e;
		}

	}
}
