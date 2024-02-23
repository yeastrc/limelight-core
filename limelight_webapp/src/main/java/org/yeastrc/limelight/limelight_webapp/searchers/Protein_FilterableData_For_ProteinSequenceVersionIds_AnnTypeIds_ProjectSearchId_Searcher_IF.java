package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_shared.dto.Search_Protein_FilterableAnnotation_DTO;

public interface Protein_FilterableData_For_ProteinSequenceVersionIds_AnnTypeIds_ProjectSearchId_Searcher_IF {

	/**
	 * @param searchId
	 * @param proteinSequenceVersionIds
	 * @param annotationTypeIds
	 * @return
	 * @throws SQLException
	 */
	List<Search_Protein_FilterableAnnotation_DTO> get_Protein_FilterableAnnDataList(int searchId,
			List<Integer> proteinSequenceVersionIds, List<Integer> annotationTypeIds) throws SQLException;

}