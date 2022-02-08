/**
 * currentFiltersDisplayBlock__SingleProtein__ProteinSequenceWidget.tsx
 *
 * ONLY on Single Protein
 *
 * "Current Filters:"   For "Must cover protein position(s):"
 *
 *
 */

import React from "react";
import {ProteinSequenceWidget_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject";

//  Set since what is returned is put into an Array.  Simply set to root function name.
const _ROOT_REACT_ELEMENT_RETURNED__KEY = "currentFiltersDisplayBlock__SingleProtein__ProteinSequenceWidget";

/**
 *
 * @param proteinSequenceWidget_StateObject
 */
export const currentFiltersDisplayBlock__SingleProtein__ProteinSequenceWidget = function (
    {
        proteinSequenceWidget_StateObject
    } : {
        proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject;
    }
) : JSX.Element {

    if ( ( ! proteinSequenceWidget_StateObject ) ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    const selectedProteinSequencePositionsSet = proteinSequenceWidget_StateObject.get_selectedProteinSequencePositions();

    if ( ( ! selectedProteinSequencePositionsSet ) || ( selectedProteinSequencePositionsSet.size === 0 ) ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    const selectedProteinSequencePositionsArray = Array.from( selectedProteinSequencePositionsSet );
    selectedProteinSequencePositionsArray.sort();

    const selectedProteinSequencePositions_DisplayString = _userSelectionDisplay_CombineArrayIntoFormattedString({ array : selectedProteinSequencePositionsArray });

    return (
        <React.Fragment key={ _ROOT_REACT_ELEMENT_RETURNED__KEY }>
            <CurrentFiltersDisplayBlock__SingleProtein__ProteinSequenceWidget
                selectedProteinSequencePositions_DisplayString={ selectedProteinSequencePositions_DisplayString }
            />
        </React.Fragment>
    );
}

/**
 *
 * @param selectedProteinSequencePositions_DisplayString
 */
const CurrentFiltersDisplayBlock__SingleProtein__ProteinSequenceWidget = function(
    {
        selectedProteinSequencePositions_DisplayString
    } : {
        selectedProteinSequencePositions_DisplayString: string
    }
) : JSX.Element {

    //  CANNOT return null since wrapped in <React.Fragment>

    return (
        <div >
            <span style={{whiteSpace: "nowrap"}}>Must cover protein position(s): </span> <span>{ selectedProteinSequencePositions_DisplayString }</span> {/* example: 3, 6 or 987 */}
        </div>
    );
}


/**
 * put in comma delim string with ' or ' before last entry
 */
const _userSelectionDisplay_CombineArrayIntoFormattedString = function({ array } : { array : Array<number> }) : string {

    const numEntries = array.length;

    if ( numEntries === 1 ) {
        //  Single Element so return
        return array[ 0 ].toString(); // EARLY RETURN
    }

    //  > 1 entry so format with Comma Delim except before last entry.  Put ' or ' before last entry

    const lastEntryIndex = numEntries - 1;
    const allEntriesButLast = array.slice( 0, lastEntryIndex );

    let allEntriesButLastCommaDelim = allEntriesButLast.join(", ");

    const result = allEntriesButLastCommaDelim + " or " + array[ lastEntryIndex ];
    return result;
}
