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
package org.yeastrc.limelight.limelight_shared.enum_classes;



/**
 * Enum for is this Annotation Type record for PSM or Peptide 
 * 
 * Keep these values in sync with the enum field 'psm_peptide_protein_type' 
 * in the tables annotation_type and 
 */
public enum PsmPeptideMatchedProteinAnnotationType {

    /**
     * Annotation type records for PSMs
     */
    PSM("psm"),

    /**
     * Annotation type records for peptides
     */
    PEPTIDE("peptide"),

    /**
     * Annotation type records for Matched Proteins
     */
    MATCHED_PROTEIN("matched_protein"),

    /**
     * Annotation type records for Modification Position
     */
    MODIFICATION_POSITION("modification_position");
    
    
    private final String value;

    
    
    /**
     * constructor:  Make private to hide 
     */
    private PsmPeptideMatchedProteinAnnotationType(String v) {
        value = v;
    }

    public String value() {
        return value;
    }

    /**
     * Get the enum from the String value
     * 
     * @param value_
     * @return
     */
    public static PsmPeptideMatchedProteinAnnotationType fromValue( String value_ ) {
        for (PsmPeptideMatchedProteinAnnotationType c: PsmPeptideMatchedProteinAnnotationType.values()) {
            if (c.value.equals( value_ )) {
                return c;
            }
        }
        throw new IllegalArgumentException( "PsmPeptideProteinAnnotationType not valid for value: " + value_ );
    }

}
