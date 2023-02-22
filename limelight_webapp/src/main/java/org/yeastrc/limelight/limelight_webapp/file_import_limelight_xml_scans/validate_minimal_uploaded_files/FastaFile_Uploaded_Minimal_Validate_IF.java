package org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.validate_minimal_uploaded_files;

import java.io.File;
import java.io.IOException;

import javax.xml.stream.XMLStreamException;

import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.LimelightWebappDataException;

public interface FastaFile_Uploaded_Minimal_Validate_IF {

	/**
	 * This does minimal validation of FASTA file uploaded
	 * 
	 * @param fastaFile
	 * @throws IOException
	 * @throws LimelightWebappDataException
	 */
	void fastaFile_Uploaded_Minimal_Validate(File fastaFile)

			throws LimelightWebappDataException, XMLStreamException, IOException;

}