/**
 * currentFiltersDisplayBlock__PSB__SearchSubGroups.tsx
 *
 * Project Search Based Pages -  NOT Experiment Pages
 *
 * "Current Filters:"   For "Filter on Sub Search:"
 *
 *
 */

import React from "react";
import {SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/jsx/searchSubGroup_In_SearchDetailsOuterBlock";

//  Set since what is returned is put into an Array.  Simply set to root function name.
const _ROOT_REACT_ELEMENT_RETURNED__KEY = "currentFiltersDisplayBlock__PSB__SearchSubGroups";

/**
 *
 * @param searchSubGroup_Are_All_SearchSubGroupIds_Selected
 * @param searchSubGroup_PropValue
 */
export const currentFiltersDisplayBlock__PSB__SearchSubGroups = function (
    {
        searchSubGroup_Are_All_SearchSubGroupIds_Selected,
        searchSubGroup_PropValue // Use to determine which Search Sub Groups Selected along with the display name
    } : {
        searchSubGroup_Are_All_SearchSubGroupIds_Selected : boolean;
        searchSubGroup_PropValue : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData;  // Use to determine which Search Sub Groups Selected along with the display name
    }
) : JSX.Element {

    if ( ( ! searchSubGroup_PropValue )  // searchSubGroup_PropValue not be populated when either No Sub Groups or > 1 search or is Experiment page
        || searchSubGroup_Are_All_SearchSubGroupIds_Selected ) {  // true if all selected.  Nothing to display if all are selected
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    return (
        <React.Fragment key={ _ROOT_REACT_ELEMENT_RETURNED__KEY }>
            <CurrentFiltersDisplayBlock__SearchSubGroups
                searchSubGroup_PropValue={ searchSubGroup_PropValue }
            />
        </React.Fragment>
    );
}

/**
 *
 * @param searchSubGroup_PropValue
 */
const CurrentFiltersDisplayBlock__SearchSubGroups = function (
    {
        searchSubGroup_PropValue
    } : {
        searchSubGroup_PropValue : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData;  // Use to determine which Search Sub Groups Selected along with the display name
    }
) : JSX.Element {

    //  CANNOT return null since wrapped in <React.Fragment>

    const selectedSearchSubGroupsList = [];

    for ( const searchSubGroupEntry of searchSubGroup_PropValue.searchSubGroupEntryArray ) {
        if ( ! searchSubGroupEntry.selectedEntry ) {
            //  Not Selected so SKIP
            continue;
        }

        const entry = (
            <span key={ searchSubGroupEntry.searchSubGroup_Id } style={ { paddingRight: 10 } } >{ searchSubGroupEntry.subgroupName_Display }</span>
        );

        selectedSearchSubGroupsList.push( entry );
    }

    if ( selectedSearchSubGroupsList.length === 0 ) {

        return (  //  EARLY RETURN
            <div>
                Not showing data from any sub search
            </div>
        );
    }

    return (
        <div>
            <span>
                <span>
                    Showing data from the following sub search
                </span>
                {  ( selectedSearchSubGroupsList.length > 1 ) ? ( // Make plural
                    <span>es</span>
                ) : null }
                <span>: </span>
            </span>
            { selectedSearchSubGroupsList }
        </div>
    );
}