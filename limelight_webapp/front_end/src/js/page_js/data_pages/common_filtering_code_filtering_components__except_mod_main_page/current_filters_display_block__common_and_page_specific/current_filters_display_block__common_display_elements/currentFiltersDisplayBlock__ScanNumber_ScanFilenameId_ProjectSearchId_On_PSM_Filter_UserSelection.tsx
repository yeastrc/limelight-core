/**
 * currentFiltersDisplayBlock__ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection.tsx
 *
 * "Current Filters:"   For "Must :"
 *
 *
 */

import React from "react";
import {
    CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder,
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_multiple_searches_sub_parts__returned_objects/commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId";
import {
    ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_number_and_file_name_or_search__on_psms_selection/js/scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject";
import {
    DataPageStateManager,
    SearchData_SearchName_Etc_SingleSearchEntry__DataPageStateManagerEntry
} from "page_js/data_pages/data_pages_common/dataPageStateManager";

//  Set since what is returned is put into an Array.  Simply set to root function name.
const _ROOT_REACT_ELEMENT_RETURNED__KEY = "currentFiltersDisplayBlock__ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection";

/**
 *
 * @param scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
 * @param commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
 */
export const currentFiltersDisplayBlock__ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection = function (
    {
        scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject,
        projectSearchIds,
        dataPageStateManager,
        commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
    } : {
        scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject : ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
        projectSearchIds : Array<number>
        dataPageStateManager : DataPageStateManager
        commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder: CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder //  Use with scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
    }
) : JSX.Element {

    if ( ( ! scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject ) ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    if ( ! scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject.is_AnySelections() ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    if ( ( ! dataPageStateManager ) ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    if ( ( ! commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder ) ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    return (
        <React.Fragment key={ _ROOT_REACT_ELEMENT_RETURNED__KEY }>
            <CurrentFiltersDisplayBlock__ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection
                scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject={ scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject }
                projectSearchIds={ projectSearchIds }
                dataPageStateManager={ dataPageStateManager }
                commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder={ commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder }
            />
        </React.Fragment>
    );
}

/**
 *
 * @param searchScanFileDataEntries
 */
const CurrentFiltersDisplayBlock__ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection = function(
    {
        scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject,
        projectSearchIds,
        dataPageStateManager,
        commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
    } : {
        scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject : ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
        projectSearchIds : Array<number>
        dataPageStateManager : DataPageStateManager
        commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder: CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder //  Use with scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
    }
) : JSX.Element {

    //  CANNOT return null since wrapped in <React.Fragment>

    const selectionsElements: Array<JSX.Element> = [];

    for ( const scanNumber_ScanFilenameIds_ProjectSearchIds_Selection_Entry of scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject.get__scanNumber_ScanFilenameIds_ProjectSearchIds_Selections() ) {

        if ( selectionsElements.length === 0 ) {
            //  First Entry Text before
            selectionsElements.push(
                <span key={ "text_before_" + selectionsElements.length }>Only showing data for PSMs with </span>
            )
        } else {
            //  NOT First Entry Text before
            selectionsElements.push(
                <span key={ "text_before_" + selectionsElements.length }> or a </span>
            )
        }

        selectionsElements.push(
            <span key={ "text_before_" + selectionsElements.length }>scan number of { scanNumber_ScanFilenameIds_ProjectSearchIds_Selection_Entry.scanNumber }</span>
        )

        const searchData_For_ProjectSearchId__HasSelection: Array<SearchData_SearchName_Etc_SingleSearchEntry__DataPageStateManagerEntry> = []

        for ( const projectSearchId of projectSearchIds ) {

            const searchData_For_ProjectSearchId = dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )
            if ( ! searchData_For_ProjectSearchId ) {
                throw Error( "dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
            }

            if ( scanNumber_ScanFilenameIds_ProjectSearchIds_Selection_Entry.wholeSearches_Selected_ProjectSearchIds
                && scanNumber_ScanFilenameIds_ProjectSearchIds_Selection_Entry.wholeSearches_Selected_ProjectSearchIds.has( projectSearchId ) ) {

                searchData_For_ProjectSearchId__HasSelection.push( searchData_For_ProjectSearchId )

            } else if (
                scanNumber_ScanFilenameIds_ProjectSearchIds_Selection_Entry.searchScanFile_Ids_Selected
                && scanNumber_ScanFilenameIds_ProjectSearchIds_Selection_Entry.searchScanFile_Ids_Selected.size > 0 ) {

                const scanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder =
                    commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_For_ProjectSearchId( projectSearchId )

                if ( scanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder ) {
                    for ( const searchScanFileData of scanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_SearchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename() ) {

                        if ( scanNumber_ScanFilenameIds_ProjectSearchIds_Selection_Entry.searchScanFile_Ids_Selected.has( searchScanFileData.searchScanFileId ) ) {

                            searchData_For_ProjectSearchId__HasSelection.push( searchData_For_ProjectSearchId )

                            break;
                        }
                    }
                }
            }
        }

        const searchData_For_ProjectSearchId__HasSelection__Length = searchData_For_ProjectSearchId__HasSelection.length


        let searchesAndTheirScanFilenamesText = undefined



        for ( let index = 0; index < searchData_For_ProjectSearchId__HasSelection__Length; index++ ) {

            if ( ! searchesAndTheirScanFilenamesText ) {

                let searchesLabel = ""
                if ( searchData_For_ProjectSearchId__HasSelection__Length > 1 ) {
                    searchesLabel = "es"
                }
                searchesAndTheirScanFilenamesText = " in search" + searchesLabel + " "

            } else {

                if ( index === ( searchData_For_ProjectSearchId__HasSelection__Length - 1 ) ) {
                    //  last entry
                    searchesAndTheirScanFilenamesText += " or "
                } else {
                    //  NOT last entry
                    searchesAndTheirScanFilenamesText += " or "
                }
            }

            const searchData_For_ProjectSearchId__HasSelection_Entry = searchData_For_ProjectSearchId__HasSelection[ index ]

            searchesAndTheirScanFilenamesText += searchData_For_ProjectSearchId__HasSelection_Entry.searchId

            if (
                scanNumber_ScanFilenameIds_ProjectSearchIds_Selection_Entry.searchScanFile_Ids_Selected
                && scanNumber_ScanFilenameIds_ProjectSearchIds_Selection_Entry.searchScanFile_Ids_Selected.size > 0 ) {

                const scanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder =
                    commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_For_ProjectSearchId( searchData_For_ProjectSearchId__HasSelection_Entry.projectSearchId )

                if ( scanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder ) {

                    const scanFilenames_INITIAL_STRING = ""

                    let scanFilenames = scanFilenames_INITIAL_STRING

                    for ( const searchScanFileData of scanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_SearchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename() ) {

                        if ( scanNumber_ScanFilenameIds_ProjectSearchIds_Selection_Entry.searchScanFile_Ids_Selected.has( searchScanFileData.searchScanFileId ) ) {

                            if ( scanFilenames !== scanFilenames_INITIAL_STRING ) {
                                scanFilenames += ", "
                            }

                            scanFilenames += searchScanFileData.filename
                        }
                    }

                    if ( scanFilenames !== scanFilenames_INITIAL_STRING ) {
                        searchesAndTheirScanFilenamesText += " (" + scanFilenames + ")"
                    }
                }
            }
        }

        selectionsElements.push(
            <span key={ "text_" + selectionsElements.length }>{ searchesAndTheirScanFilenamesText }</span>
        )
    }

    return (
        <React.Fragment>

            <div>
                { selectionsElements }
            </div>

        </React.Fragment>
    );

}

