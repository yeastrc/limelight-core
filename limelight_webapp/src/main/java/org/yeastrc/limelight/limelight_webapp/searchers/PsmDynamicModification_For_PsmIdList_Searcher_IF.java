package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_shared.dto.PsmDynamicModificationDTO;

public interface PsmDynamicModification_For_PsmIdList_Searcher_IF {

	List<PsmDynamicModificationDTO> getPsmDynamicModification_For_PsmIdList(List<Long> psmIdList) throws SQLException;

}