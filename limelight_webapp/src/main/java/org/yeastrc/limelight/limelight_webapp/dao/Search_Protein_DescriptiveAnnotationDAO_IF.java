package org.yeastrc.limelight.limelight_webapp.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.yeastrc.limelight.limelight_shared.dto.Search_Protein_DescriptiveAnnotation_DTO;

public interface Search_Protein_DescriptiveAnnotationDAO_IF {

	/**
	 * @param id
	 * @return
	 * @throws SQLException
	 */
	Search_Protein_DescriptiveAnnotation_DTO getForId(int id) throws SQLException;

	/**
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	Search_Protein_DescriptiveAnnotation_DTO populateFromResultSet(ResultSet rs) throws SQLException;

}