package org.yeastrc.limelight.limelight_webapp.dao;

import java.sql.SQLException;

public interface Search_Protein_DescriptiveAnnotationLargeValueDAO_IF {

	/**
	 * @param srchProteinDescAnnId
	 * @return
	 * @throws SQLException
	 */

	String getForSrchProteinDescAnnId(long srchProteinDescAnnId) throws SQLException;

}