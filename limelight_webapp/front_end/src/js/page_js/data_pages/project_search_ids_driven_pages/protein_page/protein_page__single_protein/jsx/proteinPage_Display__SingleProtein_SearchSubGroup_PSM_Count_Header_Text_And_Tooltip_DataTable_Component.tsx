/**
 * proteinPage_Display__SingleProtein_SearchSubGroup_PSM_Count_Header_Text_And_Tooltip_DataTable_Component.tsx.tsx
 *
 * Protein Page Single Protein AND Peptide Page Various Locations - Search Sub Groups -
 *
 * Function to format Header Text
 * React Component for PSM Count Header Tooltip for Data Table
 *
 */
import {SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import React from "react";
import {
    DataTable__HeaderTooltip__Partial_For_SubSearch_SearchSubGroup_Component
} from "page_js/data_pages/data_table_react_common__table_part_components/dataTable__HeaderTooltip__Partial_For_SubSearch_SearchSubGroup__Component";


/**
/**
 * Function to format Header Text
 */
export const get_proteinPage_Display__SingleProtein_SearchSubGroup_PSM_Count_Header_Text_DataTable_Component = function ({ searchSubGroup } : {

    searchSubGroup: SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry

}  ) : string {

    return 'PSMs (' + searchSubGroup.subgroupName_Display + ")"
}

/**
 * React Component for PSM Count Header Tooltip for Data Table
 */
export const get_proteinPage_Display__SingleProtein_SearchSubGroup_PSM_Count_Header_Tooltip_DataTable_Component = function ({ searchSubGroup } : {

    searchSubGroup: SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry

}  ) : JSX.Element {

    return (
        <div >
            <div >
                PSM Count
            </div>
            {/*  Display Sub Group Data */}
            <DataTable__HeaderTooltip__Partial_For_SubSearch_SearchSubGroup_Component
                searchSubGroup={ searchSubGroup }
            />
        </div>
    )
}