/**
 * proteinViewPage_DisplayData__SearchSubGroup_Peptide_Count_Header_Text_And_Tooltip_DataTable_Component.tsx
 *
 * Protein Page Single Search - Search Sub Groups -
 *
 * Function to format Header Text
 * React Component for Peptide Count Header Tooltip for Data Table
 *
 */
import {SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import React from "react";

//  Peptides Count Column

/**
 * Function to format Header Text
 */
export const get_proteinViewPage_DisplayData__SearchSubGroup_Peptide_Count_Header_Text_DataTable_Component = function ({ searchSubGroup } : {

    searchSubGroup: SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry

}  ) : string {

    return 'Peptides (' + searchSubGroup.subgroupName_Display + ")"
}

/**
 * React Component for Peptide Count Header Tooltip for Data Table
 */
export const get_proteinViewPage_DisplayData__SearchSubGroup_Peptide_Count_Header_Tooltip_DataTable_Component = function ({ searchSubGroup } : {

    searchSubGroup: SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry

}  ) : JSX.Element {

    return (
        <div >
            <div >
                Peptide Count:
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



//  Peptides Unique Count Column

/**
 * Function to format Header Text
 */
export const get_proteinViewPage_DisplayData__SearchSubGroup_PeptideUnique_Count_Header_Text_DataTable_Component = function ({ searchSubGroup } : {

    searchSubGroup: SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry

}  ) : string {

    return 'Peptides Unique (' + searchSubGroup.subgroupName_Display + ")"
}

/**
 * React Component for Peptide Count Header Tooltip for Data Table
 */
export const get_proteinViewPage_DisplayData__SearchSubGroup_PeptideUnique_Count_Header_Tooltip_DataTable_Component = function ({ searchSubGroup } : {

    searchSubGroup: SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry

}  ) : JSX.Element {

    return (
        <div >
            <div >
                Peptides Unique Count:
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


