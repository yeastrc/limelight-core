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
package org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes;


/**
 * Enum for this Limelight XML File Import Single File record for the file type 
 * 
 * Keep these values in sync with the values in the table 
 * 'file_import_tracking_single_file_type_lookup'
 * 
 * And in sync with same enum class in 'limelight_submit_import_client_connector'
 */
public enum FileImportFileType {

    LIMELIGHT_XML_FILE( 1 ),
    SCAN_FILE( 2 ),
    FASTA_FILE( 3 )
    ;

    
    private final int value;

    
    
    /**
     * constructor:  Make private to hide 
     */
    private FileImportFileType( int v) {
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
    public static FileImportFileType fromValue( int value_ ) {
        for (FileImportFileType c: FileImportFileType.values()) {
            if (c.value == value_ ) {
                return c;
            }
        }
        throw new IllegalArgumentException( "LimelightXMLFileImportFileType not valid for value: " + value_ );
    }
}
