package org.yeastrc.limelight.limelight_webapp.searchers;

import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.PsmReporterIonMassesFor_PsmIds_Searcher.PsmReporterIonMassesFor_PsmIds_Searcher_ResultEntry;

public interface PsmReporterIonMassesFor_PsmIds_SearcherIF {

	List<PsmReporterIonMassesFor_PsmIds_Searcher_ResultEntry> getPsmReporterIonMassesFor_PsmIds(

			List<Long> psmIds)
			throws Exception;

}