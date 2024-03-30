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
import {
    proteinView__ProteinList_ColumnHeader__Tooltip_Text
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/jsx/proteinView__ProteinList_ColumnHeader__Tooltip_Text";
import {
    DataTable__HeaderTooltip__Partial_For_SubSearch_SearchSubGroup_Component
} from "page_js/data_pages/data_table_react_common__table_part_components/dataTable__HeaderTooltip__Partial_For_SubSearch_SearchSubGroup__Component";

//  Peptides Count Column

/**
 * Function to format Header Text
 */
export const get_proteinViewPage_DisplayData__SearchSubGroup_Peptide_Count_Header_Text_DataTable_Component = function ({ searchSubGroup } : {

    searchSubGroup: SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry

}  ) : string {

    return 'Distinct Peptides (' + searchSubGroup.subgroupName_Display + ")"
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
                Distinct Peptide Count: { proteinView__ProteinList_ColumnHeader__Tooltip_Text.Distinct_Peptide_Count }
            </div>
            {/*  Display Sub Group Data */}
            <DataTable__HeaderTooltip__Partial_For_SubSearch_SearchSubGroup_Component
                searchSubGroup={ searchSubGroup }
            />
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

    return 'Unique Peptides (' + searchSubGroup.subgroupName_Display + ")"
}

/**
 * React Component for Peptide Count Header Tooltip for Data Table
 */
export const get_proteinViewPage_DisplayData__SearchSubGroup_PeptideUnique_Count_Header_Tooltip_DataTable_Component = function ({ searchSubGroup } : {

    searchSubGroup: SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry

}  ) : JSX.Element {

    return (
        <div>
            <div>
                Unique Peptides Count: { proteinView__ProteinList_ColumnHeader__Tooltip_Text.Unique_Peptide_Count }
            </div>
            {/*  Display Sub Group Data */}
            <DataTable__HeaderTooltip__Partial_For_SubSearch_SearchSubGroup_Component
                searchSubGroup={ searchSubGroup }
            />
        </div>
    )
}


