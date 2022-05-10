package org.yeastrc.limelight.limelight_importer.input_xml_file_internal_holder_objects;

import org.yeastrc.limelight.limelight_import.api.xml_dto.Psm;

/**
 * Holds InputLimelightXMLFile object of class 'ReportedPeptide'
 * 
 * and holder objects of child objects of object of class 'ReportedPeptide'
 *
 */
public class Input_LimelightXMLFile_InternalHolder_Psm_Object {

	private Psm psm;
	

	/**
	 * constructor
	 * 
	 * @param reportedPeptide
	 */
	public Input_LimelightXMLFile_InternalHolder_Psm_Object( Psm psm ) {
		
		
		this.psm = psm;
	}


	public Psm getPsm() {
		return psm;
	}
	
}
