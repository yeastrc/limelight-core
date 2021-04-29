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
package org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.minimal_validate__get_searchname_from_uploaded_file;

import java.io.File;
import java.io.IOException;

import javax.xml.stream.XMLStreamException;

import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.LimelightWebappDataException;

/**
 * @author danj
 *
 */
public interface LimelightXMLFile_Minimal_Validate__GetSearchNameIfInFile_IF {

	/**
	 * This does minimal validation of Limelight XML file
	 * and retrieves search name if in the file
	 * 
	 * @param limelightXMLFile_FirstBytes
	 * @return - search name if in file
	 * @throws XMLStreamException
	 * @throws IOException
	 * @throws LimelightWebappDataException
	 */
	String limelightXMLFile_Minimal_Validate__GetSearchNameIfInFile(File limelightXMLFile)

			throws LimelightWebappDataException, XMLStreamException, IOException;

}