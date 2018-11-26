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
 * Enum for is this Search Data Lookup Parameters Lookup record for Created By User Type 
 * 
 * Keep these values in sync with the enum field 'created_by_user_type' 
 * in the tables search_data_lookup_parameters  
 */
public enum SearchDataLookupParametersLookup_CreatedByUserType {

    /**
     * records for created by web user (user signed on)
     */
    WEB_USER("web-user"),

    /**
     * records for created by web user (NOT user signed on) - Public access project
     */
    WEB_NON_USER("web-non-user"),

    /**
     * records for created by importer user.  Have user associated with import run
     */
    IMPORTER_USER("importer-user"),
    

    /**
     * records for created by importer NO user.  Do NOT have user associated with import run
     */
    IMPORTER_NON_USER("importer-no-user");
    
    private final String value;

    
    
    /**
     * constructor:  Make private to hide 
     */
    private SearchDataLookupParametersLookup_CreatedByUserType(String v) {
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
    public static SearchDataLookupParametersLookup_CreatedByUserType fromValue( String value_ ) {
        for (SearchDataLookupParametersLookup_CreatedByUserType c: SearchDataLookupParametersLookup_CreatedByUserType.values()) {
            if (c.value.equals( value_ )) {
                return c;
            }
        }
        throw new IllegalArgumentException( "PsmPeptideProteinAnnotationType not valid for value: " + value_ );
    }

}
