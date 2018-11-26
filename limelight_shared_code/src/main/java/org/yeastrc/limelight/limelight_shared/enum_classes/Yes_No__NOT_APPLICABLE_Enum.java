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
 * Enum for values of yes, no, and not applicable 
 * 
 * Keep these values in sync with the enum field 'peptide_meets_default_cutoffs' 
 * in the tables unified_rp__rep_pept__search__generic_lookup and other places where it is used
 */
public enum Yes_No__NOT_APPLICABLE_Enum {

    /**
     * 
     */
    YES("yes"),
    
    /**
     * 
     */
    NO("no"),

    /**
     * not_applicable
     */
    NOT_APPLICABLE("not_applicable");

    
    private final String value;

    
    
    /**
     * constructor:  Make private to hide 
     */
    private Yes_No__NOT_APPLICABLE_Enum(String v) {
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
    public static Yes_No__NOT_APPLICABLE_Enum fromValue( String value_ ) {
        for (Yes_No__NOT_APPLICABLE_Enum c: Yes_No__NOT_APPLICABLE_Enum.values()) {
            if (c.value.equals( value_ )) {
                return c;
            }
        }
        throw new IllegalArgumentException( "Yes_No__NOT_APPLICABLE_Enum not valid for value: " + value_ );
    }

}
