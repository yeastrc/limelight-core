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
package org.yeastrc.limelight.limelight_importer.pre_validate_xml;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptides;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;

/**
 * Validate the Reported Peptide Strings are All Unique
 * 
 * Duplicate check in XSD to remove from XSD due to performance issues.
 *
 */
public class Validate_ReportedPeptideStrings_AllUnique {

	private static final Logger log = LoggerFactory.getLogger( Validate_ReportedPeptideStrings_AllUnique.class );
	
	private Validate_ReportedPeptideStrings_AllUnique() { }
	public static Validate_ReportedPeptideStrings_AllUnique getInstance() {
		return new Validate_ReportedPeptideStrings_AllUnique();
	}
	
	 Pattern regexPatter_AtoZ = Pattern.compile("[A-Z]+");
	 
	/**
	 * Validate the Reported Peptide Strings are All Unique
	 * 
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	public void validate_ReportedPeptideStrings_AllUnique( LimelightInput limelightInput ) throws LimelightImporterDataException {
		
		ReportedPeptides reportedPeptides = limelightInput.getReportedPeptides();
		if ( reportedPeptides != null ) {
			List<ReportedPeptide> reportedPeptideList =
					reportedPeptides.getReportedPeptide();
			if ( reportedPeptideList != null && ( ! reportedPeptideList.isEmpty() ) ) {
				
				Set<String> reportedPeptideStringSet = new HashSet<>();
				
				for ( ReportedPeptide reportedPeptide : reportedPeptideList ) {
					

					if ( ! reportedPeptideStringSet.add( reportedPeptide.getReportedPeptideString() ) ) {
						String msg = "The 'reported_peptide_string' attribute on <reported_peptide> element has duplicate values which are not allowed.  reported_peptide_string: "
								+  reportedPeptide.getReportedPeptideString();
						log.error( msg );
						throw new LimelightImporterDataException(msg);
						
					}
				}
			}
		}
	}

	
}
