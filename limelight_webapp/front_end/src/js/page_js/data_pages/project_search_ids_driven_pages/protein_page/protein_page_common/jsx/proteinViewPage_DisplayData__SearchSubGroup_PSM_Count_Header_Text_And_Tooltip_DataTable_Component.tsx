/**
 * proteinViewPage_DisplayData__SearchSubGroup_PSM_Count_Header_Text_And_Tooltip_DataTable_Component.tsx
 *
 * Protein Page Various Locations - Search Sub Groups -
 *
 * Function to format Header Text
 * React Component for PSM Count Header Tooltip for Data Table
 *
 */
import {SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import React from "react";

/**
 * Function to format Header Text
 */
export const get_proteinViewPage_DisplayData__SearchSubGroup_PSM_Count_Header_Text_DataTable_Component = function ({ searchSubGroup } : {

    searchSubGroup: SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry

}  ) : string {

    return 'PSMs (' + searchSubGroup.subgroupName_Display + ")"
}

/**
 * React Component for PSM Count Header Tooltip for Data Table
 */
export const get_proteinViewPage_DisplayData__SearchSubGroup_PSM_Count_Header_Tooltip_DataTable_Component = function ({ searchSubGroup } : {

    searchSubGroup: SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry

}  ) : JSX.Element {

    return (
        <div >
            <div >
                PSM Count:
            </div>
            <div >
                { searchSubGroup.subgroupName_Display }
            </div>
            <div >
                { searchSubGroup.searchSubgroupName_fromImportFile }
            </div>
        </div>
    )
}