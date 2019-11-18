package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.ReporterIonMasses_PsmLevel_ForPsmIds_Searcher.ReporterIonMasses_PsmLevel_ForPsmIds_Searcher_ResultItem;

public interface ReporterIonMasses_PsmLevel_ForPsmIdSearcherIF {

	List<ReporterIonMasses_PsmLevel_ForPsmIds_Searcher_ResultItem> get_ReporterIonMasses_PsmLevel_ForPsmIds(List<Long> psmIds)
			throws SQLException;

}