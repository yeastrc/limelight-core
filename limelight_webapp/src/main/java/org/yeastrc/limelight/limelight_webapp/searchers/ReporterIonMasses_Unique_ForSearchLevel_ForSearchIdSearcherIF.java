package org.yeastrc.limelight.limelight_webapp.searchers;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

public interface ReporterIonMasses_Unique_ForSearchLevel_ForSearchIdSearcherIF {

	/**
	 * @param searchId
	 * @return
	 * @throws SQLException
	 */
	List<BigDecimal> getListForSearchId(int searchId) throws SQLException;

}