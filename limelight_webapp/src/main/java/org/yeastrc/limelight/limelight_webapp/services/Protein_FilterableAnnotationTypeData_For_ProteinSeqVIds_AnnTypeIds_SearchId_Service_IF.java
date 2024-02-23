package org.yeastrc.limelight.limelight_webapp.services;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.services.Protein_FilterableAnnotationTypeData_For_ProteinSeqVIds_AnnTypeIds_SearchId_Service.Protein_FilterableAnnotationTypeData_For_ProteinSeqVIds_AnnTypeIds_SearchId_Service_Result;

public interface Protein_FilterableAnnotationTypeData_For_ProteinSeqVIds_AnnTypeIds_SearchId_Service_IF {

	/**
	 * @param searchId
	 * @param proteinSequenceVersionIds
	 * @param annotationTypeIds
	 * @return
	 * @throws SQLException 
	 */
	Protein_FilterableAnnotationTypeData_For_ProteinSeqVIds_AnnTypeIds_SearchId_Service_Result getProtein_FilterableAnnotationTypeData_For_ProteinSeqVIds_AnnTypeIds_SearchId_Service(
			int searchId, List<Integer> proteinSequenceVersionIds, List<Integer> annotationTypeIds) throws SQLException;

}