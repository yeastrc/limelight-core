package org.yeastrc.limelight.limelight_shared.gold_standard_data.db_json_fields_json;

import java.util.List;

/**
 * 
 * Use short property names to generate small JSON
 * 
 */
public class GoldStandard_Data_Root_Data_JSON_V001 {

	public static final int VERSION_NUMBER = 1;
	
	public static final String ROOT_PROPERTY__versionNumber = "versionNumber"; // Keep in sync the the property name
	public static final String ROOT_PROPERTY__singleEntry_List = "singleEntry_List"; // Keep in sync the the property name
	
	private Integer versionNumber = VERSION_NUMBER;
	private List<GoldStandard_ScanNumber_PeptideSequence_Variable_Open_Modification_Root_Data_JSON_V001> singleEntry_List;

	/**
	 * For Single Entry - Single Line in Gold Standard Import
	 *
	 */
	public static class GoldStandard_ScanNumber_PeptideSequence_Variable_Open_Modification_Root_Data_JSON_V001 {

		private int sn;      //  Scan Number
		private String ps;   //  Peptide Sequence
		
		private GoldStandard_Variable_AND_Open_Modification_Root_Data_JSON_V001 m; //  Variable and Open Mods, combined
		
		public int getSn() {
			return sn;
		}
		public void setSn(int sn) {
			this.sn = sn;
		}
		public String getPs() {
			return ps;
		}
		public void setPs(String ps) {
			this.ps = ps;
		}
		public GoldStandard_Variable_AND_Open_Modification_Root_Data_JSON_V001 getM() {
			return m;
		}
		public void setM(GoldStandard_Variable_AND_Open_Modification_Root_Data_JSON_V001 m) {
			this.m = m;
		}
		
	}


	/**
	 * For Variable AND Open Modifications, Combined
	 *
	 */
	public static class GoldStandard_Variable_AND_Open_Modification_Root_Data_JSON_V001 {

		private List<GoldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001> e; // Entries

		public List<GoldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001> getE() {
			return e;
		}

		public void setE(List<GoldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001> e) {
			this.e = e;
		}

	}

	public static class GoldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001 {

		private double m;

		private List<Integer> pln;  //  Position List of Numbers.  For positions that are a single number (No Range or 'n' or 'c' or 'u')
		private List<GoldStandard_Variable_Open_Modification_Data_JSON_PositionEntry_V001> pl; // Position List

		public List<GoldStandard_Variable_Open_Modification_Data_JSON_PositionEntry_V001> getPl() {
			return pl;
		}
		public void setPl(List<GoldStandard_Variable_Open_Modification_Data_JSON_PositionEntry_V001> pl) {
			this.pl = pl;
		}
		public List<Integer> getPln() {
			return pln;
		}
		public void setPln(List<Integer> pln) {
			this.pln = pln;
		}
		public double getM() {
			return m;
		}
		public void setM(double m) {
			this.m = m;
		}

	}


	/**
	 * Position Entry - Used when position entry is other than single number 
	 *
	 */
	public static class GoldStandard_Variable_Open_Modification_Data_JSON_PositionEntry_V001 {


		//  NOT all of the following will always be populated

		private Integer p; // position
		private Boolean pn; // position - is n term
		private Boolean pc; // position - is c term
		//  OR
		private Integer ps; // Position Range Start
		private Integer pe; // Position Range End

		public Integer getP() {
			return p;
		}
		public void setP(Integer p) {
			this.p = p;
		}
		public Boolean getPn() {
			return pn;
		}
		public void setPn(Boolean pn) {
			this.pn = pn;
		}
		public Boolean getPc() {
			return pc;
		}
		public void setPc(Boolean pc) {
			this.pc = pc;
		}
		public Integer getPs() {
			return ps;
		}
		public void setPs(Integer ps) {
			this.ps = ps;
		}
		public Integer getPe() {
			return pe;
		}
		public void setPe(Integer pe) {
			this.pe = pe;
		}
	}


	public List<GoldStandard_ScanNumber_PeptideSequence_Variable_Open_Modification_Root_Data_JSON_V001> getSingleEntry_List() {
		return singleEntry_List;
	}


	public void setSingleEntry_List(
			List<GoldStandard_ScanNumber_PeptideSequence_Variable_Open_Modification_Root_Data_JSON_V001> singleEntry_List) {
		this.singleEntry_List = singleEntry_List;
	}


	public Integer getVersionNumber() {
		return versionNumber;
	}


	public void setVersionNumber(Integer versionNumber) {
		this.versionNumber = versionNumber;
	}

}
