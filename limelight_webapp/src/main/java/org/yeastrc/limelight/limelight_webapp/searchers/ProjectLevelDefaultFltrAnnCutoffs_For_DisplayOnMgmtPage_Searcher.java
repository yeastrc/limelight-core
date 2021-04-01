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
package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.enum_classes.PsmPeptideMatchedProteinAnnotationType;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * 
 *
 */
@Component
public class ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher extends Limelight_JDBC_Base implements ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher.class );
		
	/**
	 * 
	 *
	 */
	public static final class ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher__ResultItem {
		
		private int id;
		private PsmPeptideMatchedProteinAnnotationType psmPeptideMatchedProteinAnnotationType;
		private String searchProgramName;
		private String annotationTypeName;
		private double annotationCutoffValue;
		private String annotationCutoffValueString;
		
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public PsmPeptideMatchedProteinAnnotationType getPsmPeptideMatchedProteinAnnotationType() {
			return psmPeptideMatchedProteinAnnotationType;
		}
		public void setPsmPeptideMatchedProteinAnnotationType(
				PsmPeptideMatchedProteinAnnotationType psmPeptideMatchedProteinAnnotationType) {
			this.psmPeptideMatchedProteinAnnotationType = psmPeptideMatchedProteinAnnotationType;
		}
		public String getSearchProgramName() {
			return searchProgramName;
		}
		public void setSearchProgramName(String searchProgramName) {
			this.searchProgramName = searchProgramName;
		}
		public String getAnnotationTypeName() {
			return annotationTypeName;
		}
		public void setAnnotationTypeName(String annotationTypeName) {
			this.annotationTypeName = annotationTypeName;
		}
		public double getAnnotationCutoffValue() {
			return annotationCutoffValue;
		}
		public void setAnnotationCutoffValue(double annotationCutoffValue) {
			this.annotationCutoffValue = annotationCutoffValue;
		}
		public String getAnnotationCutoffValueString() {
			return annotationCutoffValueString;
		}
		public void setAnnotationCutoffValueString(String annotationCutoffValueString) {
			this.annotationCutoffValueString = annotationCutoffValueString;
		}
		
		
	}

	private static final String QUERY_SQL = 
			"SELECT main_tbl.id , main_tbl.search_program_name, main_tbl.psm_peptide_protein_type, main_tbl.annotation_type_name, main_tbl.annotation_cutoff_value, value_string_tbl.annotation_cutoff_value_string "
			+ " FROM project_level_default_fltr_ann_cutoffs_tbl AS main_tbl "
			+ " INNER JOIN project_level_default_fltr_ann_cutoffs_cutoff_as_string_tbl AS value_string_tbl"
			+ 	" ON main_tbl.id = value_string_tbl.project_level_default_fltr_ann_cutoffs_id "
			+ " WHERE main_tbl.project_id = ?";

	
	@Override
	public List<ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher__ResultItem>  getAllForProjectId( int projectId ) throws SQLException {

		List<ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher__ResultItem> resultList = new ArrayList<>();

		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, projectId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher__ResultItem resultItem = new ProjectLevelDefaultFltrAnnCutoffs_For_DisplayOnMgmtPage_Searcher__ResultItem();
					
					resultItem.setId( rs.getInt( "id" ) );
					{
						String psmPeptideAnnotationTypeString = rs.getString( "psm_peptide_protein_type" );
						PsmPeptideMatchedProteinAnnotationType psmPeptideMatchedProteinAnnotationType = PsmPeptideMatchedProteinAnnotationType.fromValue( psmPeptideAnnotationTypeString );
						resultItem.setPsmPeptideMatchedProteinAnnotationType( psmPeptideMatchedProteinAnnotationType );
					}
					resultItem.setSearchProgramName( rs.getString( "search_program_name" ) );
					resultItem.setAnnotationTypeName( rs.getString( "annotation_type_name" ) );
					resultItem.setAnnotationCutoffValue( rs.getDouble( "annotation_cutoff_value" ) );
					resultItem.setAnnotationCutoffValueString( rs.getString( "annotation_cutoff_value_string" ) );
					resultList.add( resultItem );
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return resultList;
	}
	
}
