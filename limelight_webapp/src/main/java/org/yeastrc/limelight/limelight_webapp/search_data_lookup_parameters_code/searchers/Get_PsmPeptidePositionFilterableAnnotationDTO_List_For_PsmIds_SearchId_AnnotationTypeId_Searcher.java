package org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;


/**
 * 
 *
 */
@Component
public class Get_PsmPeptidePositionFilterableAnnotationDTO_List_For_PsmIds_SearchId_AnnotationTypeId_Searcher extends Limelight_JDBC_Base implements Get_PsmPeptidePositionFilterableAnnotationDTO_List_For_PsmIds_SearchId_AnnotationTypeIds_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( Get_PsmPeptidePositionFilterableAnnotationDTO_List_For_PsmIds_SearchId_AnnotationTypeId_Searcher.class );
	
	public static class Get_PsmPeptidePositionFilterableAnnotationDTO_List_For_PsmIds_SearchId_AnnotationTypeIds_Searcher_Result {
		
		private long psmId;
		private int annotationTypeId;
		/**
		 * Stored in unsigned short in DB
		 */
		private int peptidePosition;

		private double valueDouble;

		public long getPsmId() {
			return psmId;
		}
		public int getPeptidePosition() {
			return peptidePosition;
		}
		public double getValueDouble() {
			return valueDouble;
		}
		public int getAnnotationTypeId() {
			return annotationTypeId;
		}
	}

	private static final String QUERY_SQL = 
			"SELECT psm_peptide_position_filterable_annotation_tbl.psm_id, psm_peptide_position_filterable_annotation_tbl.annotation_type_id, "
			+ " psm_peptide_position_filterable_annotation_tbl.peptide_position, psm_peptide_position_filterable_annotation_tbl.value_double "
			+ " FROM "
			+ " psm_peptide_position_filterable_annotation_tbl "
			+ " INNER JOIN psm_tbl ON psm_peptide_position_filterable_annotation_tbl.psm_id = psm_tbl.id "
			
			+ " WHERE psm_tbl.search_id = ? "; // Add to 'WHERE' in the code below

	@Override
	public List<Get_PsmPeptidePositionFilterableAnnotationDTO_List_For_PsmIds_SearchId_AnnotationTypeIds_Searcher_Result> get_PsmPeptidePositionFilterableAnnotationDTO_List_For_PsmIds_SearchId_AnnotationTypeIds(
			
			int searchId,
			List<Integer> annotationTypeIds,
			List<Long> psmIds
			) throws SQLException {
		
		List<Get_PsmPeptidePositionFilterableAnnotationDTO_List_For_PsmIds_SearchId_AnnotationTypeIds_Searcher_Result> resultList = new ArrayList<>();

		if ( annotationTypeIds == null || annotationTypeIds.isEmpty() ) {
			return resultList;
		}
		if ( psmIds == null || psmIds.isEmpty() ) {
			return resultList;
		}
		
		
		StringBuilder querySQLSB = new StringBuilder( 1000 );
		querySQLSB.append( QUERY_SQL );
		
		querySQLSB.append( " AND psm_peptide_position_filterable_annotation_tbl.annotation_type_id IN " );

		querySQLSB.append( "(" );
		{
			int annotationTypeIds_size = annotationTypeIds.size();
			for ( int counter = 0; counter < annotationTypeIds_size; counter++ ) {
				if ( counter != 0 ) {
					querySQLSB.append( "," );	
				}
				querySQLSB.append( "?" );
			}
		}
		querySQLSB.append( ")" );


		querySQLSB.append( " AND psm_peptide_position_filterable_annotation_tbl.psm_id IN " );

		querySQLSB.append( "(" );
		{
			int psmIds_size = psmIds.size();
			for ( int counter = 0; counter < psmIds_size; counter++ ) {
				if ( counter != 0 ) {
					querySQLSB.append( "," );	
				}
				querySQLSB.append( "?" );
			}
		}
		querySQLSB.append( ")" );

		final String querySQL = querySQLSB.toString();
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			counter++;
			preparedStatement.setInt( counter, searchId );

			for ( Integer annotationTypeId : annotationTypeIds ) {
				counter++;
				preparedStatement.setInt( counter, annotationTypeId );
			}
			
			for ( Long psmId : psmIds ) {
				counter++;
				preparedStatement.setLong( counter, psmId );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					Get_PsmPeptidePositionFilterableAnnotationDTO_List_For_PsmIds_SearchId_AnnotationTypeIds_Searcher_Result item = new Get_PsmPeptidePositionFilterableAnnotationDTO_List_For_PsmIds_SearchId_AnnotationTypeIds_Searcher_Result();

					item.psmId = rs.getLong( "psm_id" );
					item.annotationTypeId = rs.getInt( "annotation_type_id" );
					item.peptidePosition = rs.getInt( "peptide_position" );
					item.valueDouble = rs.getDouble( "value_double" );

					resultList.add( item );
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return resultList;
		
	}
	
}
