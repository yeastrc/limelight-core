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

import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamReader;
import javax.xml.transform.stream.StreamSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.XMLInputFactory_XXE_Safe_Creator.XMLInputFactory_XXE_Safe_Creator;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.run_importer_to_web_app_objects.RunImporterToWebAppOnComplete_Request;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_FinalSubmit_Request_PgmXML;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_Init_Request_PgmXML;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_UploadFile_Request_Common;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;

/**
 * Unmarshal Rest Request XML ToObject
 * 
 * Only for specific Rest services
 *
 */
@Component
public class Unmarshal_RestRequest_XML_ToObject implements InitializingBean {

	private static final Logger log = LoggerFactory.getLogger( Unmarshal_RestRequest_XML_ToObject.class );
	
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
						SubmitImport_Init_Request_PgmXML.class,
						SubmitImport_UploadFile_Request_Common.class,
						SubmitImport_FinalSubmit_Request_PgmXML.class,
						
						RunImporterToWebAppOnComplete_Request.class
						);
	}
	
	/**
	 * @param bytesXML
	 * @return
	 * @throws Limelight_WS_BadRequest_InvalidParameter_Exception - when unmarshal fails
	 */
	public Object getObjectFromXMLByteArray( byte[] bytesXML ) throws Limelight_WS_BadRequest_InvalidParameter_Exception {

		Object webserviceRequestAsObject = null;
		
		ByteArrayInputStream bais_bytesXML = new ByteArrayInputStream( bytesXML );
		try {
			Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
			XMLInputFactory xmlInputFactory = XMLInputFactory_XXE_Safe_Creator.xmlInputFactory_XXE_Safe_Creator();
			XMLStreamReader xmlStreamReader = xmlInputFactory.createXMLStreamReader(new StreamSource( bais_bytesXML ) );
			webserviceRequestAsObject = unmarshaller.unmarshal( xmlStreamReader );
		} catch ( Exception e ) {
			String xmlAsString = "Unable to convert XML to String";
			try {
				xmlAsString = new String(bytesXML, StandardCharsets.UTF_8 );
			} catch ( Throwable t ) {
				
			}
			log.warn( "Failed to unmarshal XML: " + xmlAsString, e );
			
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		return webserviceRequestAsObject;
	}

	/**
	 * @param XML_String
	 * @return
	 * @throws Limelight_WS_BadRequest_InvalidParameter_Exception - when unmarshal fails
	 */
	public Object getObjectFromXMLString( String XML_String ) throws Limelight_WS_BadRequest_InvalidParameter_Exception {

		if ( ! XML_String.contains( StandardCharsets.UTF_8.name() ) ) {
			final String msg = 
					"Invalid XML:  Incoming XML String does not contain '"
					+ StandardCharsets.UTF_8.name() 
					+ "'. Incoming XML: "
					+ XML_String;
			log.warn( msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		Object webserviceRequestAsObject = null;
		
		ByteArrayInputStream bais_bytesXML = new ByteArrayInputStream( XML_String.getBytes( StandardCharsets.UTF_8 ) );
		try {
			Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
			XMLInputFactory xmlInputFactory = XMLInputFactory_XXE_Safe_Creator.xmlInputFactory_XXE_Safe_Creator();
			XMLStreamReader xmlStreamReader = xmlInputFactory.createXMLStreamReader(new StreamSource( bais_bytesXML ) );
			webserviceRequestAsObject = unmarshaller.unmarshal( xmlStreamReader );
		} catch ( Exception e ) {
			log.warn( "Failed to unmarshal XML: " + XML_String, e );
			
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		return webserviceRequestAsObject;
	}
}
