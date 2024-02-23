package org.yeastrc.limelight.limelight_webapp.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.yeastrc.limelight.limelight_shared.dto.Search_Protein_FilterableAnnotation_DTO;

public interface Search_Protein_FilterableAnnotationDAO_IF {

	/**
	 * @param id
	 * @return
	 * @throws SQLException
	 */
	Search_Protein_FilterableAnnotation_DTO getForId(int id) throws SQLException;

	/**
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	Search_Protein_FilterableAnnotation_DTO populateFromResultSet(ResultSet rs) throws SQLException;

}