package org.yeastrc.limelight.limelight_webapp.searchers;

import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.PsmDynamicModificationMassesFor_PsmIds_Searcher.PsmDynamicModificationMassesFor_PsmIds_Searcher_ResultEntry;

public interface PsmDynamicModificationMassesFor_PsmIds_Searcher_IF {

	List<PsmDynamicModificationMassesFor_PsmIds_Searcher_ResultEntry> getPsmDynamicModificationMassesFor_PsmIds(

			List<Long> psmIds)
			throws Exception;

}