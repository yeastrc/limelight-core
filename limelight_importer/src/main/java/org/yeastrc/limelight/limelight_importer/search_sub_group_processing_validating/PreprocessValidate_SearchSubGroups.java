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
package org.yeastrc.limelight.limelight_importer.search_sub_group_processing_validating;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psm;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psms;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptides;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;

/**
 * Process attribute 'subgroup_name' on psm
 *
 */
public class PreprocessValidate_SearchSubGroups {

	private static final Logger log = LoggerFactory.getLogger( PreprocessValidate_SearchSubGroups.class );
	/**
	 * private constructor
	 */
	private PreprocessValidate_SearchSubGroups(){}
	public static PreprocessValidate_SearchSubGroups getInstance() {
		return new PreprocessValidate_SearchSubGroups();
	}

	private static final String errorMsgMain = 
			"'subgroup_name' on one PSM is not populated when another PSM has 'subgroup_name' populated. All 'subgroup_name' must be populated or not populated. An empty string ('') or the attribute does not exist is considered not populated";


	/**
	 * @param limelightInput
	 * @return List of Search Sub Group names from PSM elements
	 * @throws LimelightImporterDataException 
	 */
	public Set<String> preprocessValidate_SearchSubGroups( 
			LimelightInput limelightInput ) throws LimelightImporterDataException {

		//  Result from this method:
		Set<String> searchSubGroupnamesLimelightXMLInputSet = new HashSet<>();
		
		boolean foundEmpty_searchSubGroupName = false;
				
		//  Process PSMs
				
		ReportedPeptides reportedPeptides = limelightInput.getReportedPeptides();
		if ( reportedPeptides != null ) {
			List<ReportedPeptide> reportedPeptideList =
					reportedPeptides.getReportedPeptide();
			if ( reportedPeptideList != null && ( ! reportedPeptideList.isEmpty() ) ) {
				for ( ReportedPeptide reportedPeptide : reportedPeptideList ) {
					Psms psms =	reportedPeptide.getPsms();
					if ( psms != null ) {
						List<Psm> psmList = psms.getPsm();
						if ( psmList != null ) {
							for ( Psm psm : psmList ) {
								String searchSubGroupNameLimelightXMLInput = psm.getSubgroupName();
								if ( StringUtils.isEmpty( searchSubGroupNameLimelightXMLInput ) ) {
									if ( ! searchSubGroupnamesLimelightXMLInputSet.isEmpty() ) {
										log.error(errorMsgMain);
										throw new LimelightImporterDataException(errorMsgMain);
									}
									foundEmpty_searchSubGroupName = true;
								} else {
									if ( foundEmpty_searchSubGroupName ) {
										log.error(errorMsgMain);
										throw new LimelightImporterDataException(errorMsgMain);
									}
									searchSubGroupnamesLimelightXMLInputSet.add( searchSubGroupNameLimelightXMLInput );
								}
							}
						}
					}
				}
			}
		}
		
		return searchSubGroupnamesLimelightXMLInputSet;
		
	}
}
