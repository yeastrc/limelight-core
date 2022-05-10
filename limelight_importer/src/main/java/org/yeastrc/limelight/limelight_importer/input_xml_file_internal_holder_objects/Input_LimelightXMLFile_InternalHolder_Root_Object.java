package org.yeastrc.limelight.limelight_importer.input_xml_file_internal_holder_objects;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;

/**
 * Holds root InputLimelightXMLFile root object of class 'LimelightInput'
 * 
 * and holder objects of child objects of root object of class 'LimelightInput'
 *
 */
public class Input_LimelightXMLFile_InternalHolder_Root_Object {

	private LimelightInput limelightInput;
	
	private List<Input_LimelightXMLFile_InternalHolder_ReportedPeptide_Object> internalHolder_ReportedPeptide_Object;
	
	/**
	 * constructor
	 * 
	 * @param limelightInput
	 */
	public Input_LimelightXMLFile_InternalHolder_Root_Object( LimelightInput limelightInput ) {
		
		this.limelightInput = limelightInput;
		
		if ( limelightInput.getReportedPeptides() == null ) {
			
			internalHolder_ReportedPeptide_Object = new ArrayList<>();
			
		} else {
			
			List<ReportedPeptide> reportedPeptide_List = limelightInput.getReportedPeptides().getReportedPeptide();
			
			internalHolder_ReportedPeptide_Object = new ArrayList<>( reportedPeptide_List.size() );
			
			for ( ReportedPeptide reportedPeptide : reportedPeptide_List ) {
				
				Input_LimelightXMLFile_InternalHolder_ReportedPeptide_Object internalHolder_ReportedPeptide_Object = new Input_LimelightXMLFile_InternalHolder_ReportedPeptide_Object(reportedPeptide);
				
				this.internalHolder_ReportedPeptide_Object.add(internalHolder_ReportedPeptide_Object);
			}
		}
	}
	
	///////
	
	public boolean is_Any_InternalHolder_ReportedPeptide_Objects() {
		
		return ! this.internalHolder_ReportedPeptide_Object.isEmpty();
	}
	
	public List<Input_LimelightXMLFile_InternalHolder_ReportedPeptide_Object> get_InternalHolder_ReportedPeptide_Object_Unmodifiable() {
		
		return Collections.unmodifiableList( this.internalHolder_ReportedPeptide_Object );
	}
	
	//////


	public LimelightInput getLimelightInput() {
		return limelightInput;
	}
	public List<Input_LimelightXMLFile_InternalHolder_ReportedPeptide_Object> getInternalHolder_ReportedPeptide_Object() {
		return internalHolder_ReportedPeptide_Object;
	}
}
