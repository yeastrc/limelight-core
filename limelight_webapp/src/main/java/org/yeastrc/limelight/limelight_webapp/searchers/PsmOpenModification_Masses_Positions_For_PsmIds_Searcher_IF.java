package org.yeastrc.limelight.limelight_webapp.searchers;

import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.PsmOpenModification_Masses_Positions_For_PsmIds_Searcher.PsmOpenModification_Masses_Positions_For_PsmIds_Searcher_ResultEntry;

public interface PsmOpenModification_Masses_Positions_For_PsmIds_Searcher_IF {

	List<PsmOpenModification_Masses_Positions_For_PsmIds_Searcher_ResultEntry> getPsmOpenModificationMassesFor_PsmIds(

			List<Long> psmIds)
			throws Exception;

}