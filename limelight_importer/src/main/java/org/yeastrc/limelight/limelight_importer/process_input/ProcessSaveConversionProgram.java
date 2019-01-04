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
package org.yeastrc.limelight.limelight_importer.process_input;

import java.util.Date;
import java.util.GregorianCalendar;

import javax.xml.datatype.XMLGregorianCalendar;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ConversionProgram;
import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_importer.dao.ConversionProgramDAO;
import org.yeastrc.limelight.limelight_importer.dto.SearchDTO_Importer;
import org.yeastrc.limelight.limelight_shared.dto.ConversionProgramDTO;

/**
 * Save the comments in the Importer Input, if there are any
 *
 */
public class ProcessSaveConversionProgram {

	private static final Logger log = LoggerFactory.getLogger( ProcessSaveConversionProgram.class );
	

	/**
	 * private constructor
	 */
	private ProcessSaveConversionProgram(){}
	public static ProcessSaveConversionProgram getInstance() {
		return new ProcessSaveConversionProgram();
	}
	
	/**
	 * @param limelightInput
	 * @param search
	 * @param userIdInsertingSearch
	 * @throws Exception
	 */
	public void processComments( 
			LimelightInput limelightInput, 
			SearchDTO_Importer searchDTO,
			Integer userIdInsertingSearch ) throws Exception {
		
		try {

			ConversionProgram conversionProgram = limelightInput.getConversionProgram();
			
			if ( conversionProgram == null ) {
				// No Data
				return;  // EARLY RETURN
			}
			
			Date conversionDate_Date = null;

			XMLGregorianCalendar conversionDate_XMLGregorianCalendar = conversionProgram.getConversionDate();
			
			if ( conversionDate_XMLGregorianCalendar != null ) {

				GregorianCalendar conversionDate_gregorianCalendar = conversionDate_XMLGregorianCalendar.toGregorianCalendar();
				conversionDate_Date = conversionDate_gregorianCalendar.getTime();
			}
			
			ConversionProgramDTO conversionProgramDTO = new ConversionProgramDTO();
			
			conversionProgramDTO.setSearchId( searchDTO.getId() );
			conversionProgramDTO.setName( conversionProgram.getName() );
			conversionProgramDTO.setVersion( conversionProgram.getVersion() );
			conversionProgramDTO.setConversionDate( conversionDate_Date );
			conversionProgramDTO.setPgmArguments( conversionProgram.getArguments() );
			conversionProgramDTO.setPgmURI( conversionProgram.getURI() );
			
			ConversionProgramDAO.getInstance().save( conversionProgramDTO );
			
		} catch ( Exception e ) {
			
			log.error("Failed to save ConversionProgram to DB", e);
			throw e;
		}
			
	}

}
