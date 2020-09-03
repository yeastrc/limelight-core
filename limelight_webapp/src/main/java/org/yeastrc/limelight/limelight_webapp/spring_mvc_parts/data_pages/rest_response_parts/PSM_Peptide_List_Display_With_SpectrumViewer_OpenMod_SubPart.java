package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_response_parts;

import java.util.List;

public class PSM_Peptide_List_Display_With_SpectrumViewer_OpenMod_SubPart {

	private double openModMass;
	private List<PSM_Peptide_List_Display_With_SpectrumViewer_OpenModPosition_SubPart> positionEntries_Optional;
	
	public double getOpenModMass() {
		return openModMass;
	}
	public void setOpenModMass(double openModMass) {
		this.openModMass = openModMass;
	}
	public List<PSM_Peptide_List_Display_With_SpectrumViewer_OpenModPosition_SubPart> getPositionEntries_Optional() {
		return positionEntries_Optional;
	}
	public void setPositionEntries_Optional(
			List<PSM_Peptide_List_Display_With_SpectrumViewer_OpenModPosition_SubPart> positionEntries_Optional) {
		this.positionEntries_Optional = positionEntries_Optional;
	}
	
}
