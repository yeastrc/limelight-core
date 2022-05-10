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
package org.yeastrc.limelight.limelight_importer.process_input;

import java.math.BigDecimal;
import java.util.List;

import org.yeastrc.limelight.limelight_import.api.xml_dto.StaticModification;
import org.yeastrc.limelight.limelight_import.api.xml_dto.StaticModifications;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_StaticModDAO;
import org.yeastrc.limelight.limelight_importer.input_xml_file_internal_holder_objects.Input_LimelightXMLFile_InternalHolder_Root_Object;
import org.yeastrc.limelight.limelight_importer.utils.RoundDecimalFieldsIfNecessary;
import org.yeastrc.limelight.limelight_shared.dto.StaticModDTO;

/**
 * 
 *
 */
public class ProcessStaticModifications {

	/**
	 * private constructor
	 */
	private ProcessStaticModifications(){}
	public static ProcessStaticModifications getInstance() {
		return new ProcessStaticModifications();
	}
	
	/**
	 * @param limelightInput
	 * @param searchId
	 * @throws Exception 
	 */
	public void processStaticModifications( 
			
			Input_LimelightXMLFile_InternalHolder_Root_Object input_LimelightXMLFile_InternalHolder_Root_Object, 
			int searchId ) throws Exception {
		
		StaticModifications staticModifications =
				input_LimelightXMLFile_InternalHolder_Root_Object.getLimelightInput().getStaticModifications();
		
		if ( staticModifications != null ) {

			List<StaticModification> staticModificationList =
				staticModifications.getStaticModification();

			if ( staticModificationList != null && ( ! staticModificationList.isEmpty() ) ) {

				for ( StaticModification staticModification : staticModificationList ) {

					BigDecimal mass = RoundDecimalFieldsIfNecessary.roundDecimalFieldsIfNecessary( staticModification.getMassChange() );
					
					
					StaticModDTO staticModDTO = new StaticModDTO();

					staticModDTO.setSearchId( searchId );

					staticModDTO.setResidue( staticModification.getAminoAcid() );
					staticModDTO.setMass( mass );
					staticModDTO.setMassString( staticModification.getMassChange().toString() );

					DB_Insert_StaticModDAO.getInstance().saveToDatabase( staticModDTO );
				}
			}
		}
	}

}
