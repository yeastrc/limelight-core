package org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.searchers;

import java.util.Collection;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.searchers.Psm_FilterableAnnotationData_AllFor_SearchId_Searcher.Psm_FilterableAnnotationData_AllFor_SearchId_Searcher_ResultItem;

public interface Psm_FilterableAnnotationData_AllFor_SearchId_Searcher_IF {

	/**
	 * @param psmIds
	 * @param srchPgmFilterableReportedPeptideAnnotationTypeDTOList
	 * @return
	 * @throws Exception
	 */

	List<Psm_FilterableAnnotationData_AllFor_SearchId_Searcher_ResultItem> getPsmFilterableAnnotationDataList(
			int searchId, Collection<Integer> annotationTypeIds) throws Exception;

}