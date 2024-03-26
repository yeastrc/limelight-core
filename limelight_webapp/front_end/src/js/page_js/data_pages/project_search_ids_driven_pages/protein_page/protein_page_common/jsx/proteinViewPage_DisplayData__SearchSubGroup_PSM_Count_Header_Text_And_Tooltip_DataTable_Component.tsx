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

}  ) : JSX.Element {

    return (
        <div >
            <div >
                Sequence Coverage:
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

}  ) : JSX.Element {

    return (
        <div >
            <div >
                NSAF:
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

}  ) : JSX.Element {

    return (
        <div >
            <div >
                Adjusted_Spectral_Count_ABACUS:
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

}  ) : JSX.Element {

    return (
        <div >
            <div >
                NSAF: Adjusted_Spectral_Count_ABACUS:
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