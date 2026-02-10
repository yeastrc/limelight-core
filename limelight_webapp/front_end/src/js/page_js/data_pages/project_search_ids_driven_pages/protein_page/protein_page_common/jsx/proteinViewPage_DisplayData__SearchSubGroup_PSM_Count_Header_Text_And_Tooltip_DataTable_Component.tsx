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
import {
    proteinView__ProteinList_ColumnHeader__Tooltip_Text
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/jsx/proteinView__ProteinList_ColumnHeader__Tooltip_Text";
import {
    DataTable__HeaderTooltip__Partial_For_SubSearch_SearchSubGroup_Component
} from "page_js/data_pages/data_table_react_common__table_part_components/dataTable__HeaderTooltip__Partial_For_SubSearch_SearchSubGroup__Component";

/**
 * Function to format Header Text
 */
export const get_proteinViewPage_DisplayData__SearchSubGroup_SequenceCoverage_Header_Text_DataTable_Component = function ({ searchSubGroup } : {

    searchSubGroup: SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry

}  ) : string {

    return 'Sequence Coverage (' + searchSubGroup.subgroupName_Display + ")"
}

/**
 * React Component for PSM Count Header Tooltip for Data Table
 */
export const get_proteinViewPage_DisplayData__SearchSubGroup_SequenceCoverage_Header_Tooltip_DataTable_Component = function ({ searchSubGroup } : {

    searchSubGroup: SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry

}  ) : React.JSX.Element {

    return (
        <div>
            <div>
                Sequence Coverage: { proteinView__ProteinList_ColumnHeader__Tooltip_Text.Sequence_Coverage }
            </div>

            {/*  Display Sub Group Data */}
            <DataTable__HeaderTooltip__Partial_For_SubSearch_SearchSubGroup_Component
                searchSubGroup={ searchSubGroup }
            />
        </div>
    )
}

/**
 * Function to format Header Text
 */
export const get_proteinViewPage_DisplayData__SearchSubGroup_NSAF_Header_Text_DataTable_Component = function ({ searchSubGroup } : {

    searchSubGroup: SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry

}  ) : string {

    return 'NSAF (' + searchSubGroup.subgroupName_Display + ")"
}

/**
 * React Component for NSAF Header Tooltip for Data Table
 */
export const get_proteinViewPage_DisplayData__SearchSubGroup_NSAF_Header_Tooltip_DataTable_Component = function ({ searchSubGroup } : {

    searchSubGroup: SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry

}  ) : React.JSX.Element {

    return (
        <div>
            <div>
                NSAF: { proteinView__ProteinList_ColumnHeader__Tooltip_Text.NSAF }
            </div>
            {/*  Display Sub Group Data */}
            <DataTable__HeaderTooltip__Partial_For_SubSearch_SearchSubGroup_Component
                searchSubGroup={ searchSubGroup }
            />
        </div>
    )
}

/**
 * Function to format Header Text
 */
export const get_proteinViewPage_DisplayData__SearchSubGroup_Adjusted_Spectral_Count_ABACUS_Header_Text_DataTable_Component = function ({ searchSubGroup } : {

    searchSubGroup: SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry

}  ) : string {

    return 'Adjusted Spectral Count (ABACUS) (' + searchSubGroup.subgroupName_Display + ")"
}

/**
 * React Component for Adjusted_Spectral_Count_ABACUS Header Tooltip for Data Table
 */
export const get_proteinViewPage_DisplayData__SearchSubGroup_Adjusted_Spectral_Count_ABACUS_Header_Tooltip_DataTable_Component = function ({ searchSubGroup } : {

    searchSubGroup: SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry

}  ) : React.JSX.Element {

    return (
        <div>
            <div>
                Adjusted Spectral Count
                (ABACUS): { proteinView__ProteinList_ColumnHeader__Tooltip_Text.Adjusted_Spectral_Count__ABACUS__ReturnComponent() }
            </div>
            {/*  Display Sub Group Data */}
            <DataTable__HeaderTooltip__Partial_For_SubSearch_SearchSubGroup_Component
                searchSubGroup={ searchSubGroup }
            />
        </div>
    )
}


/**
 * Function to format Header Text
 */
export const get_proteinViewPage_DisplayData__SearchSubGroup_NSAF__Using_Adjusted_Spectral_Count_ABACUS_Header_Text_DataTable_Component = function ({ searchSubGroup } : {

    searchSubGroup: SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry

}  ) : string {

    return 'NSAF: Adjusted Spectral Count (ABACUS) (' + searchSubGroup.subgroupName_Display + ")"
}

/**
 * React Component for _NSAF__Using_ Adjusted_Spectral_Count_ABACUS Header Tooltip for Data Table
 */
export const get_proteinViewPage_DisplayData__SearchSubGroup_NSAF__Using__Adjusted_Spectral_Count_ABACUS_Header_Tooltip_DataTable_Component = function ({ searchSubGroup } : {

    searchSubGroup: SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry

}  ) : React.JSX.Element {

    return (
        <div >
            <div >
                NSAF: Adjusted Spectral Count (ABACUS): { proteinView__ProteinList_ColumnHeader__Tooltip_Text.NSAF_Using_Adjusted_Spectral_Count__ABACUS }
            </div>
            {/*  Display Sub Group Data */}
            <DataTable__HeaderTooltip__Partial_For_SubSearch_SearchSubGroup_Component
                searchSubGroup={ searchSubGroup }
            />
        </div>
    )
}


/**
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

}  ) : React.JSX.Element {

    return (
        <div >
            <div >
                PSM Count: { proteinView__ProteinList_ColumnHeader__Tooltip_Text.PSM_Count }
            </div>
            {/*  Display Sub Group Data */}
            <DataTable__HeaderTooltip__Partial_For_SubSearch_SearchSubGroup_Component
                searchSubGroup={ searchSubGroup }
            />
        </div>
    )
}