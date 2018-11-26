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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils;

import java.io.ByteArrayOutputStream;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.run_importer_to_web_app_objects.RunImporterToWebAppOnComplete_Response;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_FinalSubmit_Response_PgmXML;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_Init_Response_PgmXML;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_UploadFile_Response_PgmXML;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;

/**
 * Marshal Object to Rest Response XML
 * 
 * Only for specific Rest services
 *
 */
@Component
public class Marshal_RestRequest_Object_ToXML implements InitializingBean {

	private static final Logger log = LoggerFactory.getLogger( Marshal_RestRequest_Object_ToXML.class );
	
	private JAXBContext jaxbContext;

	/* 
	 * Called as part of Spring lifecycle while initializing
	 * (non-Javadoc)
	 * @see org.springframework.beans.factory.InitializingBean#afterPropertiesSet()
	 */
	@Override
	public void afterPropertiesSet() throws Exception {

		//  
		
		jaxbContext = 
				JAXBContext.newInstance( 
						SubmitImport_Init_Response_PgmXML.class,
						SubmitImport_UploadFile_Response_PgmXML.class,
						SubmitImport_FinalSubmit_Response_PgmXML.class,
						
						RunImporterToWebAppOnComplete_Response.class
						);
	}
	
	/**
	 * @param bytesXML
	 * @return
	 * @throws Limelight_WS_BadRequest_InvalidParameter_Exception - when unmarshal fails
	 */
	public byte[] getXMLByteArrayFromObject( Object responseObject ) throws Limelight_WS_BadRequest_InvalidParameter_Exception {
		
		ByteArrayOutputStream baos_TobytesXML = new ByteArrayOutputStream();
		try {
			Marshaller marshaller = jaxbContext.createMarshaller();
			marshaller.marshal( responseObject, baos_TobytesXML );
		} catch ( JAXBException e ) {
			final String msg = "Failed to marshal to XML: " + responseObject.toString();
			log.error( msg, e );
			throw new LimelightInternalErrorException( msg );
		}

		byte[] bytesXML = baos_TobytesXML.toByteArray();
		
		return bytesXML;
	}
}
