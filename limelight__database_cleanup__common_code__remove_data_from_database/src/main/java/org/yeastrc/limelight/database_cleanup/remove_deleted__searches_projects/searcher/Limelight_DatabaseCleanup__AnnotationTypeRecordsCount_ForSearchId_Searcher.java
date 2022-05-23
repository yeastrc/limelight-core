package org.yeastrc.limelight.database_cleanup.remove_deleted__searches_projects.searcher;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.common.database_connection.Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterableDescriptiveAnnotationType;
import org.yeastrc.limelight.limelight_shared.enum_classes.PsmPeptideMatchedProteinAnnotationType;

/**
 *  annotation_type_tbl count FOR search id and psm_peptide_protein_type and filterable_descriptive_type
 */
public class Limelight_DatabaseCleanup__AnnotationTypeRecordsCount_ForSearchId_Searcher {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabaseCleanup__AnnotationTypeRecordsCount_ForSearchId_Searcher.class);

	private Limelight_DatabaseCleanup__AnnotationTypeRecordsCount_ForSearchId_Searcher() { }
	private static final Limelight_DatabaseCleanup__AnnotationTypeRecordsCount_ForSearchId_Searcher _INSTANCE = new Limelight_DatabaseCleanup__AnnotationTypeRecordsCount_ForSearchId_Searcher();
	public static Limelight_DatabaseCleanup__AnnotationTypeRecordsCount_ForSearchId_Searcher getInstance() { return _INSTANCE; }
	
	private static final String get_AnnotationTypeRecordsCountForSearchId_SQL =
			"SELECT COUNT(*) AS count "
			+ " FROM annotation_type_tbl "
			+ " WHERE search_id = ? AND psm_peptide_protein_type = ? AND filterable_descriptive_type = ?";
			
	/**
	 * @return
	 * @throws Exception
	 */
	public int get_AnnotationTypeRecordsCount_ForSearchId( 
			
			int searchId, 
			PsmPeptideMatchedProteinAnnotationType psmPeptideMatchedProteinAnnotationType,
			FilterableDescriptiveAnnotationType filterableDescriptiveAnnotationType ) throws Exception {

		int result = 0;

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		final String sql = get_AnnotationTypeRecordsCountForSearchId_SQL;
		
		try {
			conn = Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode.getSingletonInstance().getConnection();
			pstmt = conn.prepareStatement( sql );
			
			pstmt.setInt( 1, searchId );
			pstmt.setString( 2, psmPeptideMatchedProteinAnnotationType.value() );
			pstmt.setString( 3, filterableDescriptiveAnnotationType.value() );
			
			rs = pstmt.executeQuery();

			if( rs.next() ) {
				result = rs.getInt( "count" );
			}

		} catch ( Exception e ) {
			String msg = "get_AnnotationTypeRecordsCount_ForSearchId(...), searchId: " + searchId + ", sql: " + sql;
			log.error( msg, e );
			throw e;
		} finally {
			// be sure database handles are closed
			if( rs != null ) {
				try { rs.close(); } catch( Throwable t ) { ; }
				rs = null;
				if( pstmt != null ) {
					try { pstmt.close(); } catch( Throwable t ) { ; }
					pstmt = null;
				}
				if( conn != null ) {
					try { conn.close(); } catch( Throwable t ) { ; }
					conn = null;
				}
			}
		}
		return result;
	}
}
