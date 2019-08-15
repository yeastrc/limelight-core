package org.yeastrc.limelight.limelight_webapp.searchers;

import java.util.Collection;
import java.util.Map;

/**
 * Get a map of the supplied reported peptide IDs and whether or not they have any dynamic mods
 */
public interface ReportedPeptideHasMods_SearcherIF {
    Map<Integer,Boolean> getReportedPeptideHasMods(Collection<Integer> reportedPeptideIds) throws Exception;
}
