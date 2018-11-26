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
 * Enum for is this Search Data Lookup Parameters Lookup Types record 
 * DB field search_data_lookup_parameters.root_id_type_id
 * 
 * Keep these values in sync with the values in the table 
 * 'search_data_lookup_parameters_type_id'
 * 
 */
public enum SearchDataLookupParametersLookupRootIdTypes {

	PROJECT_SEARCH_IDS( 1 );
	
    private final int value;

    
    
    /**
     * constructor:  Make private to hide 
     */
    private SearchDataLookupParametersLookupRootIdTypes( int v) {
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
    public static SearchDataLookupParametersLookupRootIdTypes fromValue( int value_ ) {
        for (SearchDataLookupParametersLookupRootIdTypes c: SearchDataLookupParametersLookupRootIdTypes.values()) {
            if (c.value == value_ ) {
                return c;
            }
        }
        throw new IllegalArgumentException( "SearchRecordStatus not valid for value: " + value_ );
    }

}