package org.yeastrc.limelight.limelight_shared.dto;

import java.math.BigDecimal;

/**
 * Table srch_rep_pept__reporter_ion_mass_lookup_tbl
 *
 */
public class Search_ReportedPeptide_ReporterIon_Mass_Lookup_DTO {

	private int searchId;
	private int reportedPeptideId;
	private BigDecimal reporterIonMass;
	
	public int getSearchId() {
		return searchId;
	}
	public void setSearchId(int searchId) {
		this.searchId = searchId;
	}
	public int getReportedPeptideId() {
		return reportedPeptideId;
	}
	public void setReportedPeptideId(int reportedPeptideId) {
		this.reportedPeptideId = reportedPeptideId;
	}
	public BigDecimal getReporterIonMass() {
		return reporterIonMass;
	}
	public void setReporterIonMass(BigDecimal reporterIonMass) {
		this.reporterIonMass = reporterIonMass;
	}
}
