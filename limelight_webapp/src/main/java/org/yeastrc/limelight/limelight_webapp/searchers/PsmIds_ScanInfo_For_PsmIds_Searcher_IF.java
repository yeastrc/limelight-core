package org.yeastrc.limelight.limelight_webapp.searchers;

import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.PsmIds_ScanInfo_For_PsmIds_Searcher.PsmIds_ScanInfo_For_PsmIds_Searcher_ResultEntry;

public interface PsmIds_ScanInfo_For_PsmIds_Searcher_IF {

	List<PsmIds_ScanInfo_For_PsmIds_Searcher_ResultEntry> getPsmIds_ScanInfo_For_PsmIds( List<Long> psmIds ) throws Exception;

}