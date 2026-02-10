/**
 * currentFiltersDisplayBlock__ScanFilenameId_On_PSM_Filter_UserSelection.tsx
 *
 * "Current Filters:"   For "Must :"
 *
 *
 */

import React from "react";
import {ScanFilenameId_On_PSM_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import {
    CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder,
    CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_SingleSearch_SingleScanFile_Entry,
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_multiple_searches_sub_parts__returned_objects/commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId";

//  Set since what is returned is put into an Array.  Simply set to root function name.
const _ROOT_REACT_ELEMENT_RETURNED__KEY = "currentFiltersDisplayBlock__ScanFilenameId_On_PSM_Filter_UserSelection";

/**
 *
 * @param scanFilenameId_On_PSM_Filter_UserSelection_StateObject
 * @param commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
 */
export const currentFiltersDisplayBlock__ScanFilenameId_On_PSM_Filter_UserSelection = function (
    {
        scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
        commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
    } : {
        scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
        commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder: CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder //  Use with scanFilenameId_On_PSM_Filter_UserSelection_StateObject
    }
) : React.JSX.Element {

    if ( ( ! scanFilenameId_On_PSM_Filter_UserSelection_StateObject ) ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    if ( scanFilenameId_On_PSM_Filter_UserSelection_StateObject.areAllSelected__scanFilenameIds() ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    if ( ( ! commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder ) ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    const scanFilenameIds_Selected = scanFilenameId_On_PSM_Filter_UserSelection_StateObject.get__scanFilenameIds_Selected();

    if ( scanFilenameIds_Selected.size === 0 ) {

        //  scanFilenameIds_Selected NOT contain entries

        return (  // EARLY RETURN
            <React.Fragment key={ _ROOT_REACT_ELEMENT_RETURNED__KEY }>
                <CurrentFiltersDisplayBlock__ScanFilenameId_On_PSM_Filter_UserSelection_NO_Selections/>
            </React.Fragment>
        );
    }

    //  scanFilenameIds_Selected contains entries

    const searchScanFileDataEntries: Array<CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_SingleSearch_SingleScanFile_Entry> = [];

    for (const scanFilenameId of scanFilenameIds_Selected) {
        for (const data_Holder_Holder_SingleSearch_SearchScanFileData of commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_All_IterableIterator() ) {
            const searchScanFileData = data_Holder_Holder_SingleSearch_SearchScanFileData.get_SearchScanFileDataFor_SearchScanFileId(scanFilenameId);
            if (searchScanFileData) {
                searchScanFileDataEntries.push(searchScanFileData);
            }
        }
    }

    if ( searchScanFileDataEntries.length === 0 ) {
        //  NO searchScanFileDataEntries for scanFilenameIds_Selected in commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileData
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    return (
        <React.Fragment key={ _ROOT_REACT_ELEMENT_RETURNED__KEY }>
            <CurrentFiltersDisplayBlock__ScanFilenameId_On_PSM_Filter_UserSelection
                searchScanFileDataEntries={ searchScanFileDataEntries }
            />
        </React.Fragment>
    );
}

/**
 *
 */
const CurrentFiltersDisplayBlock__ScanFilenameId_On_PSM_Filter_UserSelection_NO_Selections = function() : React.JSX.Element {

    //  CANNOT return null since wrapped in <React.Fragment>

    return (
        <div >
            Not showing data from any scan filename
        </div>
    );
}

/**
 *
 * @param searchScanFileDataEntries
 */
const CurrentFiltersDisplayBlock__ScanFilenameId_On_PSM_Filter_UserSelection = function(
    {
        searchScanFileDataEntries
    } : {
        searchScanFileDataEntries: Array<CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_SingleSearch_SingleScanFile_Entry>
    }
) : React.JSX.Element {

    //  CANNOT return null since wrapped in <React.Fragment>

    searchScanFileDataEntries.sort( (a, b) => {
        return a.filename.localeCompare(b.filename)
    });

    const scan_Filename_Entries_Elements : Array<React.JSX.Element> = [];

    let firstEntry = true;
    for ( const searchScanFileDataEntry of searchScanFileDataEntries ) {

        if ( ! firstEntry ) {
            // Not first entry so add ' and ' separator
            const and_Separator = (
                <span key={ searchScanFileDataEntry.searchScanFileId + "_AND" }> and </span>
            );
            scan_Filename_Entries_Elements.push(and_Separator);
        }

        const scan_Filename_Selected = (
            <span key={ searchScanFileDataEntry.searchScanFileId }>
                                        { searchScanFileDataEntry.filename }
                                    </span>
        )
        scan_Filename_Entries_Elements.push(scan_Filename_Selected);

        firstEntry = false;  // Clear first entry flag
    }

    return (
        <div className=" word-break-break-word-backup-break-all ">
            <span>
                Only showing data from scan file
            </span>
            {( searchScanFileDataEntries.length > 1 ) ? (
                //  Make 'file' plural to 'files'
                <span>s</span>
            ) : null }
            <span> </span>
            { scan_Filename_Entries_Elements }
        </div>
    )
}

