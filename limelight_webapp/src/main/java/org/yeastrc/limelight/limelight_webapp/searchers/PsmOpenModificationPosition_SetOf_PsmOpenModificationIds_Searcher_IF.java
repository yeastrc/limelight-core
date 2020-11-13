package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;
import java.util.Set;

import org.yeastrc.limelight.limelight_shared.dto.PsmOpenModificationPositionDTO;

public interface PsmOpenModificationPosition_SetOf_PsmOpenModificationIds_Searcher_IF {

	List<PsmOpenModificationPositionDTO> getPsmOpenModificationPosition(Set<Long> psmOpenModificationIds)
			throws SQLException;

}