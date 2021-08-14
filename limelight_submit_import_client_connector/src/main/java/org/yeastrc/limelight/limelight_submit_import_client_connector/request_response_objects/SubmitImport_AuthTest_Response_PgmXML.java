/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2018 University of Washington - Seattle, WA
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
package org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 'Pgm XML' Response object for POST to Webservice Project_UploadData_SubmitterProgram_AuthCheck_RestWebserviceController
 *
 * 
 */
@XmlRootElement(name="submitImport_AuthTest_Response_PgmXML")
@XmlAccessorType(XmlAccessType.FIELD)
public class SubmitImport_AuthTest_Response_PgmXML extends SubmitImport_Init_Response_PgmXML {

	// Properties as XML attributes

	// In Base
//	@XmlAttribute
//	private boolean statusSuccess;
//	@XmlAttribute
//	private boolean projectLocked; 

	//  In SubmitImport_Init_Response_PgmXML
//	@XmlAttribute
//	private boolean projectIdNotFound;
////	private boolean projectLocked;
//	@XmlAttribute
//	private boolean projectMarkedForDeletion;
//	@XmlAttribute
//	private boolean projectNotEnabled;
//
//	@XmlAttribute
//	private boolean userSubmitImportProgramKeyNotFound;
//	@XmlAttribute
//	private boolean userNotAuthorizedForProject;
//	@XmlAttribute
//	private boolean userNotAcceptLatestTermsOfService;
//	
//	//  Added for processing submit from same machine
//	@XmlAttribute
//	private String uploadTempSubdir;
	
	
}
