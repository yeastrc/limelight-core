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
package org.yeastrc.limelight.limelight_submit_import_client_connector.enum_classes;

/**
 * Internal Enum for Limelight 
 *
 * Enum for this Limelight XML File Import Single File record for the file type 
 * 
 * Keep these values in sync with the values in the table 
 * 'file_import_tracking_single_file_type_lookup'
 * 
 * And in sync with same enum class in 'limelight web app'
 */
public enum LimelightSubmit_FileImportFileType {

    LIMELIGHT_XML_FILE( 1 ),
    SCAN_FILE( 2 ),
    FASTA_FILE( 3 ),
    GENERIC_OTHER_FILE(4)
    ;

    
    private final int value;

    
    
    /**
     * constructor:  Make private to hide 
     */
    private LimelightSubmit_FileImportFileType( int v) {
        value = v;
    }

    public int value() {
        return value;
    }

    /**
     * Get the enum from the String value
     * 
     * @param value_
     * @return
     */
    public static LimelightSubmit_FileImportFileType fromValue( int value_ ) {
        for (LimelightSubmit_FileImportFileType c: LimelightSubmit_FileImportFileType.values()) {
            if (c.value == value_ ) {
                return c;
            }
        }
        throw new IllegalArgumentException( "LimelightSubmit_FileImportFileType not valid for value: " + value_ );
    }

}
