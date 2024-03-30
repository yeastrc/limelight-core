/**
 * dataTable__HeaderTooltip__Partial_For_SubSearch_SearchSubGroup__Component.tsx
 *
 * Insert into Header Tooltips for Sub Searches aka Search Sub Groups
 */


import {
    SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry
} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import React from "react";

/**
 * React Component for PSM Count Header Tooltip for Data Table
 */
export const DataTable__HeaderTooltip__Partial_For_SubSearch_SearchSubGroup_Component = function ({ searchSubGroup } : {

    searchSubGroup: SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry

}  ) : JSX.Element {

    return (
        <div>
            <div style={ { marginTop: 16 } }>Sub Search:</div>
            <div>
                { searchSubGroup.subgroupName_Display }
            </div>
            <div>
                { searchSubGroup.searchSubgroupName_fromImportFile }
            </div>
        </div>
    )
}
