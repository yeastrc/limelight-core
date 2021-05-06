/**
 * modViewDataTableRenderer_MultiSearch_Subcomponents.tsx
 *
 * Create JSX Elements for modViewDataTableRenderer.tsx
 *
 *
 */

import React from 'react'

/**
 * Contents for cell ??
 */
export const modViewDataTableRenderer_MultiSearch_Subcomponents__Cell_ExternalModLinks_Contents = function (
    {
        modMass
    } : {
        modMass: number
    }) : JSX.Element {

    const roundedModMass = Math.round(modMass);
    const lowerEnd = roundedModMass - 0.5;
    const upperEnd = roundedModMass + 0.5;

    const pirLink = "https://proteininformationresource.org/cgi-bin/resid.pl?tx2=" + roundedModMass + "&tx3=0.5&wtby=5"
    const unimodLink = "https://www.unimod.org/modifications_list.php?a=advsearch&type=and&asearchfield%5B%5D=record_id&asearchopt_record_id=Contains&value_record_id=&value1_record_id=&asearchfield%5B%5D=ex_code_name&asearchopt_ex_code_name=Contains&value_ex_code_name=&value1_ex_code_name=&asearchfield%5B%5D=code_name&asearchopt_code_name=Contains&value_code_name=&value1_code_name=&asearchfield%5B%5D=approved&asearchopt_approved=Equals&type_approved=checkbox&value_approved=none&type1_approved=checkbox&value1_approved=none&asearchfield%5B%5D=full_name&asearchopt_full_name=Contains&value_full_name=&value1_full_name=&asearchfield%5B%5D=mono_mass&asearchopt_mono_mass=Between&value_mono_mass=" + lowerEnd + "&value1_mono_mass=" + upperEnd + "&asearchfield%5B%5D=avge_mass&asearchopt_avge_mass=Contains&value_avge_mass=&value1_avge_mass=&asearchfield%5B%5D=composition&asearchopt_composition=Contains&value_composition=&value1_composition=&asearchfield%5B%5D=misc_notes&asearchopt_misc_notes=Contains&value_misc_notes=&value1_misc_notes=&asearchfield%5B%5D=username_of_poster&asearchopt_username_of_poster=Contains&value_username_of_poster=&value1_username_of_poster=&asearchfield%5B%5D=date_time_modified&asearchopt_date_time_modified=Contains&value_date_time_modified=&type_date_time_modified=date0&value1_date_time_modified=&type1_date_time_modified=date0";

    return (
        <div >
            [<a onClick={ (event) => { event.stopPropagation() } } href={unimodLink} target="_blank" rel="noopener noreferrer" title="View in UniMod">UniMod</a>]
            [<a onClick={ (event) => { event.stopPropagation() } } href={pirLink} target="_blank" rel="noopener noreferrer" title="View in Protein Information Resource (PIR)">PIR</a>]
        </div>
    );
}
