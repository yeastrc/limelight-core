package org.yeastrc.limelight.limelight_shared.dto;

/**
 * table gold_standard_single_entry_unique_mod_mass_tbl
 *
 */
public class GoldStandard_SingleEntry_Unique_ModMass_DTO {

	private int goldStandard_SingleEntry_Id;
	
	private double modificationMass_Unique;

	@Override
	public String toString() {
		return "GoldStandard_SingleEntry_Unique_ModMass_DTO [goldStandard_SingleEntry_Id=" + goldStandard_SingleEntry_Id
				+ ", modificationMass_Unique=" + modificationMass_Unique + "]";
	}


	public int getGoldStandard_SingleEntry_Id() {
		return goldStandard_SingleEntry_Id;
	}
	public void setGoldStandard_SingleEntry_Id(int goldStandard_SingleEntry_Id) {
		this.goldStandard_SingleEntry_Id = goldStandard_SingleEntry_Id;
	}
	public double getModificationMass_Unique() {
		return modificationMass_Unique;
	}
	public void setModificationMass_Unique(double modificationMass_Unique) {
		this.modificationMass_Unique = modificationMass_Unique;
	}

}
