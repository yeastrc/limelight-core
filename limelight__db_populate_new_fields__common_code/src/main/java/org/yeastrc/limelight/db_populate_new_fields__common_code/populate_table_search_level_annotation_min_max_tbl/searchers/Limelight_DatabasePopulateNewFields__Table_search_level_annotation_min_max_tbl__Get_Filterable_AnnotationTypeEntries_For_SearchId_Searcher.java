package org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_search_level_annotation_min_max_tbl.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.db_populate_new_fields__common_code.common.database_connection.Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterDirectionTypeJavaCodeEnum;
import org.yeastrc.limelight.limelight_shared.enum_classes.PsmPeptideMatchedProteinAnnotationType;


/**
 * 
 * 
 *
 */
public class Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__Get_Filterable_AnnotationTypeEntries_For_SearchId_Searcher {

	private static final Logger log = LoggerFactory.getLogger( Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__Get_Filterable_AnnotationTypeEntries_For_SearchId_Searcher.class );
	

	private Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__Get_Filterable_AnnotationTypeEntries_For_SearchId_Searcher() { }
	private static final Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__Get_Filterable_AnnotationTypeEntries_For_SearchId_Searcher _INSTANCE = new Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__Get_Filterable_AnnotationTypeEntries_For_SearchId_Searcher();
	public static Limelight_DatabasePopulateNewFields__Table_search_level_annotation_min_max_tbl__Get_Filterable_AnnotationTypeEntries_For_SearchId_Searcher getInstance() { return _INSTANCE; }
	
	public static class Filterable_AnnotationTypeEntries_For_SearchId_Searcher_Result {
		
		private int annotationTypeId;
		private PsmPeptideMatchedProteinAnnotationType psmPeptideMatchedProteinAnnotationType;
		private FilterDirectionTypeJavaCodeEnum filterDirectionType;
		
		public int getAnnotationTypeId() {
			return annotationTypeId;
		}
		public FilterDirectionTypeJavaCodeEnum getFilterDirectionType() {
			return filterDirectionType;
		}
		public PsmPeptideMatchedProteinAnnotationType getPsmPeptideMatchedProteinAnnotationType() {
			return psmPeptideMatchedProteinAnnotationType;
		}
	}

	private static final String QUERY_SQL = 
			"SELECT annotation_type_tbl.id, annotation_type_tbl.psm_peptide_protein_type, annotation_type_filterable_tbl.filter_direction "
			+ " FROM "
			+ " annotation_type_tbl"
			+ " INNER JOIN annotation_type_filterable_tbl ON annotation_type_tbl.id = annotation_type_filterable_tbl.annotation_type_id "
			+ " WHERE search_id = ?";
	

	final String querySQL = "SELECT * FROM annotation_type_filterable_tbl WHERE annotation_type_id = ?";
	

	public List<Filterable_AnnotationTypeEntries_For_SearchId_Searcher_Result>  getAnnotationTypeListForSearchId( int searchId ) throws SQLException {

		List<Filterable_AnnotationTypeEntries_For_SearchId_Searcher_Result> resultList = new ArrayList<>();

		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode.getSingletonInstance().getConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, searchId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					
					Filterable_AnnotationTypeEntries_For_SearchId_Searcher_Result item = new Filterable_AnnotationTypeEntries_For_SearchId_Searcher_Result();

					item.annotationTypeId = rs.getInt( "id" );
					
					{
					String psmPeptideMatchedProteinAnnotationTypeString = rs.getString( "psm_peptide_protein_type" );
					PsmPeptideMatchedProteinAnnotationType psmPeptideAnnotationType = PsmPeptideMatchedProteinAnnotationType.fromValue( psmPeptideMatchedProteinAnnotationTypeString );
					item.psmPeptideMatchedProteinAnnotationType = psmPeptideAnnotationType;
					}
					{
					String filterDirectionString = rs.getString( "filter_direction" );
					FilterDirectionTypeJavaCodeEnum filterDirectionType = FilterDirectionTypeJavaCodeEnum.fromValue( filterDirectionString );
					item.filterDirectionType = filterDirectionType;
					}
					
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
