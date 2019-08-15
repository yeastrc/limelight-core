package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

public interface SpectralStorageAPIKeyForSearchId_SearcherIF {
    List<String> getSpectralStorageAPIKeyForSearchId(int searchId) throws SQLException;
}
