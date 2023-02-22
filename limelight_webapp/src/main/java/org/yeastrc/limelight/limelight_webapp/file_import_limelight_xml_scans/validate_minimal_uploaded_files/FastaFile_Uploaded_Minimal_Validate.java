/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2019 University of Washington - Seattle, WA
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.validate_minimal_uploaded_files;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import javax.xml.stream.XMLStreamException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.LimelightWebappDataException;

/**
 * 
 *
 */
@Component
public class FastaFile_Uploaded_Minimal_Validate implements FastaFile_Uploaded_Minimal_Validate_IF {

	private static final Logger log = LoggerFactory.getLogger( FastaFile_Uploaded_Minimal_Validate.class );
	
	/**
	 * This does minimal validation of FASTA file uploaded
	 * 
	 * @param fastaFile
	 * @throws IOException
	 * @throws LimelightWebappDataException
	 */
	@Override
	public void fastaFile_Uploaded_Minimal_Validate( File fastaFile )
			
			throws LimelightWebappDataException, XMLStreamException, IOException {
		
		if ( fastaFile.length() == 0 ) {
			throw new LimelightWebappDataException( "FASTA file cannot be empty.");
		}
		
		
		byte[] bytesRead_Array = new byte[1];
		
		try ( InputStream fastaFileInputStream = new FileInputStream(fastaFile) ) {
			try {
				int bytesRead = 0;
				int readCallCount = 0;
				final int readCallCount_Max = 4;
				
				while ( bytesRead == 0 && readCallCount < readCallCount_Max ) {
				
					bytesRead = fastaFileInputStream.read( bytesRead_Array );
				}
				if ( bytesRead == 0 ) {
					String msg = "Failed to read first character of FASTA file after " + readCallCount + " times.  FASTA file: " + fastaFile.getAbsolutePath();
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}
				
				try {
				
					String firstCharacter = new String(bytesRead_Array, StandardCharsets.US_ASCII );
					
					if ( ! ">".equals( firstCharacter ) ) {

						throw new LimelightWebappDataException( "FASTA file first character is not '>'.");
					}
				
				} catch ( Exception e ) {
					
					log.warn( "Failed to create String object from first character in FASTA file.  FASTA file: " + fastaFile.getAbsolutePath() );
					
					throw new LimelightWebappDataException( "FASTA file first character is not '>'.  Unable to read file as ASCII Character Set.");
				}
				
			} finally {
			}
		}
		
		return;
	}
}
