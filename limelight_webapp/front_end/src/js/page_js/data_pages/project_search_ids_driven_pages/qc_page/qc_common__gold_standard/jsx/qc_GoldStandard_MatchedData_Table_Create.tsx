/**
 * qc_GoldStandard_MatchedData_Table_Create.tsx
 *
 * Gold Standard
 *
 * Create Matched Data Table
 *
 */

import React from "react";

import { Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__gold_standard/js/qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch";
import { CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entry } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entries";
import { limelight__Sort_ArrayOfNumbers_SortArrayInPlace } from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";
import { QcViewPage_CommonData_To_AllComponents_From_MainComponent } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import { Qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__gold_standard/js/qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch";

/**
 *
 * @param getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_Map_Key_ProjectSearchId
 * @param getData_And_Compute_Precision_And_Recall_For_MultipleSearches_Result_Map_Key_ProjectSearchId
 * @param goldStandard_FileContents_Entry_Map_Key_ProjectSearchId
 * @param qcViewPage_CommonData_To_AllComponents_From_MainComponent
 */
export const qc_GoldStandard_MatchedData_Table_Create = function (
    {
        getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_Map_Key_ProjectSearchId,
        getData_And_Compute_Precision_And_Recall_For_MultipleSearches_Result_Map_Key_ProjectSearchId,
        goldStandard_FileContents_Entry_Map_Key_ProjectSearchId,
        qcViewPage_CommonData_To_AllComponents_From_MainComponent,
    } : {
        getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_Map_Key_ProjectSearchId: Map<number, Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result>
        getData_And_Compute_Precision_And_Recall_For_MultipleSearches_Result_Map_Key_ProjectSearchId: Map<number, Qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result>
        goldStandard_FileContents_Entry_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entry>
        qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    }
) : React.JSX.Element {

    const projectSearchIds_Filtered_To_Have_MatchesTable_Data: Array<number> = []

    let getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_ForRandom_ProjectSearchId: Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result

    {
        for ( const projectSearchId of  qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds ) {

            const getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result =
                 getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_Map_Key_ProjectSearchId.get( projectSearchId )

            if ( getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result ) {
                if ( getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result.table_DataRows_Map_Key_ScanNumber.size > 0 ) {

                    //  Have data for projectSearchId so add to projectSearchIds_Filtered_To_Have_MatchesTable_Data
                    projectSearchIds_Filtered_To_Have_MatchesTable_Data.push( projectSearchId )

                    getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_ForRandom_ProjectSearchId = getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result
                }
            }
        }
        if ( ! getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_ForRandom_ProjectSearchId ) {
            const msg = "getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_ForRandom_ProjectSearchId NOT Set "
            console.warn(msg)
            throw Error(msg)
        }
    }

    const searchNameAnd_SearchId_And_SearchShortName_Display_Map_Key_ProjectSearchId: Map<number, string> = new Map()

    const SearchIdOrSearchShortName_Map_Key_ProjectSearchId: Map<number, string> = new Map()

    {
        const searchData_SearchName_Etc_Root =  qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_searchData_SearchName_Etc_Root()

        for ( const projectSearchId of projectSearchIds_Filtered_To_Have_MatchesTable_Data ) {

            const searchData_For_ProjectSearchId = searchData_SearchName_Etc_Root.get_SearchData_For_ProjectSearchId( projectSearchId )
            if ( ! searchData_For_ProjectSearchId ) {
                const msg = "searchData_SearchName_Etc_Root.get_SearchData_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId
                console.warn(msg)
                throw Error(msg)
            }

            let searchShortName = ""
            if ( searchData_For_ProjectSearchId.searchShortName ) {
                searchShortName = " (" + searchData_For_ProjectSearchId.searchShortName + ")"
            }

            searchNameAnd_SearchId_And_SearchShortName_Display_Map_Key_ProjectSearchId.set( projectSearchId, searchData_For_ProjectSearchId.name + searchShortName + " (" + searchData_For_ProjectSearchId.searchId + ")" )

            let searchIdOrShortName = searchData_For_ProjectSearchId.searchId.toString()
            if ( searchData_For_ProjectSearchId.searchShortName ) {
                searchIdOrShortName = searchData_For_ProjectSearchId.searchShortName
            }

            SearchIdOrSearchShortName_Map_Key_ProjectSearchId.set( projectSearchId, searchIdOrShortName )
        }
    }
    const tableCell_HeaderCell_Style: React.CSSProperties = { textAlign: "left", verticalAlign: "bottom" }

    const tableCell_DataCell_Style: React.CSSProperties = { verticalAlign: "top" }


    let table_Header_Components: React.JSX.Element = undefined

    {
        const matched_And_PsmData_Driven_Per_Search_Elements: Array<React.JSX.Element> = []

        for ( const projectSearchId of projectSearchIds_Filtered_To_Have_MatchesTable_Data ) {

            const searchId = SearchIdOrSearchShortName_Map_Key_ProjectSearchId.get( projectSearchId )
            if ( searchId === undefined || searchId === null ) {
                const msg = "SearchIdOrSearchShortName_Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId
                console.warn(msg)
                throw Error(msg)
            }

            const searchNameAndId_Display = searchNameAnd_SearchId_And_SearchShortName_Display_Map_Key_ProjectSearchId.get( projectSearchId )
            if ( ! searchNameAndId_Display ) {
                const msg = "searchNameAnd_SearchId_And_SearchShortName_Display_Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId
                console.warn(msg)
                throw Error(msg)
            }

            matched_And_PsmData_Driven_Per_Search_Elements.push(
                <React.Fragment
                    key={ projectSearchId }
                >
                    <th
                        style={ tableCell_HeaderCell_Style }
                        title={ qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length > 1 ? "For Search:\n\n" + searchNameAndId_Display : null }
                    >
                        Found Peptide{ qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length > 1 ? " (" + searchId + ")" : "" }
                    </th>
                    <th style={ tableCell_HeaderCell_Style }
                        title={ qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length > 1 ? "For Search:\n\n" + searchNameAndId_Display : null }
                    >
                        Gold Standard Match{ qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length > 1 ? " (" + searchId + ")" : "" }
                    </th>
                    {/*<th*/}
                    {/*    style={ { textAlign: "left" } }*/}
                    {/*    title={ "For Search:\n\n" + searchNameAndId_Display }*/}
                    {/*>*/}
                    {/*    All PSM IDs for Scan Number ({ searchId })*/}
                    {/*</th>*/}
                    {/*<th style={ { textAlign: "left" } }*/}
                    {/*    title={ "For Search:\n\n" + searchNameAndId_Display }*/}
                    {/*>*/}
                    {/*    PSM IDs for Scan Number That Match Gold Standard ({ searchId })*/}
                    {/*</th>*/}
                </React.Fragment>
            )
        }

        table_Header_Components = (

            <thead>
            <tr>
                <th style={ tableCell_HeaderCell_Style }>Scan&nbsp;Number</th>
                <th style={ tableCell_HeaderCell_Style }
                    // title="On the Gold Standard entry"
                >
                    Peptide (Gold&nbsp;Standard)
                </th>
                <th style={ tableCell_HeaderCell_Style }
                    // title="On the Gold Standard entry"
                >
                    Modifications (Gold&nbsp;Standard)
                </th>
                { matched_And_PsmData_Driven_Per_Search_Elements }
            </tr>
            </thead>
        )
    }


    const tableRows: Array<React.JSX.Element> = []

    let  goldStandard_FileContents_Entry__From_Random_ProjectSearchId: CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entry

    {
        for ( const projectSearchId of projectSearchIds_Filtered_To_Have_MatchesTable_Data ) {

            goldStandard_FileContents_Entry__From_Random_ProjectSearchId =  goldStandard_FileContents_Entry_Map_Key_ProjectSearchId.get( projectSearchId )

            if ( goldStandard_FileContents_Entry__From_Random_ProjectSearchId ) {
                break
            }
        }
        if ( ! goldStandard_FileContents_Entry__From_Random_ProjectSearchId ) {
            const msg = " _goldStandard_FileContents_Entry_Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for all projectSearchIds_Filtered_To_Have_MatchesTable_Data: " + projectSearchIds_Filtered_To_Have_MatchesTable_Data.join(", ")
            console.warn(msg)
            throw Error(msg)
        }
    }

    for ( const goldStandard_File_Entry of goldStandard_FileContents_Entry__From_Random_ProjectSearchId.goldStandard_File_Entries ) {

        const matchesTable_Objects_For_SingleSearch_For_ScanNumber =
            getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_ForRandom_ProjectSearchId.table_DataRows_Map_Key_ScanNumber.get( goldStandard_File_Entry.scanNumber )

        if ( ! matchesTable_Objects_For_SingleSearch_For_ScanNumber ) {
            const msg = "getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_ForRandom_ProjectSearchId.table_DataRows_Map_Key_ScanNumber.get( goldStandard_File_Entry.scanNumber ) returned NOTHING for goldStandard_File_Entry.scanNumber: " + goldStandard_File_Entry.scanNumber
            console.warn(msg)
            throw Error(msg)
        }


        let column_For_Modification_On_GoldStandard_Element: React.JSX.Element = undefined

        {

            let modifications_ON_GoldStandard__String = ""

            if ( matchesTable_Objects_For_SingleSearch_For_ScanNumber.modifications_From_GoldStandard_Array && matchesTable_Objects_For_SingleSearch_For_ScanNumber.modifications_From_GoldStandard_Array.length > 0 ) {
                for ( const modEntry of matchesTable_Objects_For_SingleSearch_For_ScanNumber.modifications_From_GoldStandard_Array ) {
                    if ( modifications_ON_GoldStandard__String !== "" ) {
                        modifications_ON_GoldStandard__String += "; "
                    }

                    modifications_ON_GoldStandard__String += modEntry
                }
            }

            column_For_Modification_On_GoldStandard_Element = (
                <td
                    style={ tableCell_DataCell_Style }
                    // title="On the Gold Standard entry"
                >
                    { modifications_ON_GoldStandard__String }
                </td>
            )
        }

        const columns_For_Searches_Elements: Array<React.JSX.Element> = []

        {
            for ( const projectSearchId of projectSearchIds_Filtered_To_Have_MatchesTable_Data ) {

                const getData_And_Compute_Precision_And_Recall_For_MultipleSearches_Result__projectSearchId_First =
                     getData_And_Compute_Precision_And_Recall_For_MultipleSearches_Result_Map_Key_ProjectSearchId.get( projectSearchId )

                const scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__Map_Key_ScanNumber = getData_And_Compute_Precision_And_Recall_For_MultipleSearches_Result__projectSearchId_First.scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__Map_Key_ScanNumber
                const scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__Map_Key_ScanNumber = getData_And_Compute_Precision_And_Recall_For_MultipleSearches_Result__projectSearchId_First.scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__Map_Key_ScanNumber


                const getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result =
                     getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_Map_Key_ProjectSearchId.get( projectSearchId )

                const matchesTable_Objects_For_SingleSearch_For_ScanNumber =
                    getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result.table_DataRows_Map_Key_ScanNumber.get( goldStandard_File_Entry.scanNumber )

                if ( ! matchesTable_Objects_For_SingleSearch_For_ScanNumber ) {
                    const msg = " _getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result.table_DataRows_Map_Key_ScanNumber.get( goldStandard_File_Entry.scanNumber ) returned NOTHING for goldStandard_File_Entry.scanNumber: " + goldStandard_File_Entry.scanNumber
                    console.warn(msg)
                    throw Error(msg)
                }

                const psm_All_GeneratedPeptideStrings_ElementsArray: Array<React.JSX.Element> = []

                let psmIds_All = ""

                {
                    const scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__MapEntry = scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__Map_Key_ScanNumber.get( goldStandard_File_Entry.scanNumber )
                    if ( scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__MapEntry ) {

                        for ( const psmId of scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__MapEntry.PSMs_AllForScanNumber_Map_Key_PsmId.keys() ) {

                            if ( ! matchesTable_Objects_For_SingleSearch_For_ScanNumber.peptides_For_All_PSM_IDs_for_Scan_Number__Map_Key_PSM_Id ) {
                                const msg = " matchesTable_Objects_For_SingleSearch_For_ScanNumber.peptides_For_All_PSM_IDs_for_Scan_Number__Map_Key_PSM_Id contains NOTHING for goldStandard_File_Entry.scanNumber: " + goldStandard_File_Entry.scanNumber
                                console.warn(msg)

                                throw Error(msg)
                            }

                            const peptides_For_PSM_ID = matchesTable_Objects_For_SingleSearch_For_ScanNumber.peptides_For_All_PSM_IDs_for_Scan_Number__Map_Key_PSM_Id.get( psmId )

                            let peptideIndex = 0;
                            for ( const peptide of peptides_For_PSM_ID.peptide_Generated_Array ) {

                                if ( psm_All_GeneratedPeptideStrings_ElementsArray.length !== 0 ) {

                                    const psm_All_GeneratedPeptideStrings_Element = (
                                        <span key={ psmId + "_" + peptideIndex + "_separator" }>, </span>
                                    )
                                    psm_All_GeneratedPeptideStrings_ElementsArray.push( psm_All_GeneratedPeptideStrings_Element )
                                }

                                const psm_All_GeneratedPeptideStrings_Element = (
                                    <span key={ psmId + "_" + peptideIndex }>
                                        { peptide }
                                    </span>
                                )
                                psm_All_GeneratedPeptideStrings_ElementsArray.push( psm_All_GeneratedPeptideStrings_Element )

                                peptideIndex++
                            }
                        }

                        const psmIds_Array = Array.from( scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__MapEntry.PSMs_AllForScanNumber_Map_Key_PsmId.keys() )
                        limelight__Sort_ArrayOfNumbers_SortArrayInPlace( psmIds_Array )
                        psmIds_All = psmIds_Array.join(", ")
                    }
                }

                {
                    const scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__MapEntry = scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__Map_Key_ScanNumber.get( goldStandard_File_Entry.scanNumber )
                    if ( scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__MapEntry ) {
                        const psmIds_Array = Array.from( scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__MapEntry.PSMs_AllForScanNumber_Map_Key_PsmId.keys() )
                        limelight__Sort_ArrayOfNumbers_SortArrayInPlace( psmIds_Array )
                        psmIds_All = psmIds_Array.join(", ")
                    }
                }

                let psmIds_Matched = ""

                {
                    const scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__MapEntry = scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__Map_Key_ScanNumber.get( goldStandard_File_Entry.scanNumber )
                    if ( scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__MapEntry ) {
                        const psmIds_Array = Array.from( scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__MapEntry.PSMs_AllThatAreCorrect_Map_Key_PsmId.keys() )
                        limelight__Sort_ArrayOfNumbers_SortArrayInPlace( psmIds_Array )
                        psmIds_Matched = psmIds_Array.join(", ")
                    }
                }

                let cell_ClassNames = ""

                if ( scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__Map_Key_ScanNumber.has( goldStandard_File_Entry.scanNumber )  ) {
                    cell_ClassNames += " background-color-light-blue "
                } else {
                    cell_ClassNames += " background-color-light-red "
                }

                columns_For_Searches_Elements.push(

                    <React.Fragment
                        key={ projectSearchId }
                    >
                        <td
                            className={ cell_ClassNames }
                            style={ tableCell_DataCell_Style }
                        >
                            { psm_All_GeneratedPeptideStrings_ElementsArray.length === 0 ? "No Peptide Found" : psm_All_GeneratedPeptideStrings_ElementsArray }
                        </td>
                        <td
                            className={ cell_ClassNames }
                            style={ tableCell_DataCell_Style }
                        >
                            { scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__Map_Key_ScanNumber.has( goldStandard_File_Entry.scanNumber ) ? "true" : "false" }
                        </td>
                        {/*<td>{ psmIds_All }</td>*/}
                        {/*<td>{ psmIds_Matched }</td>*/}
                    </React.Fragment>
                )
            }
        }

        const rowElement = (
            <tr key={ goldStandard_File_Entry.scanNumber }>

                <td
                    style={ tableCell_DataCell_Style }
                >
                    { goldStandard_File_Entry.scanNumber }
                </td>
                <td
                    // title="On the Gold Standard entry"
                    style={ tableCell_DataCell_Style }
                >
                    { goldStandard_File_Entry.peptideSequence }
                </td>

                { column_For_Modification_On_GoldStandard_Element }

                { columns_For_Searches_Elements }
            </tr>
        )

        tableRows.push( rowElement )
    }

    const matchedTableContents = (

        <table>
            { table_Header_Components }
            <tbody>
            { tableRows }
            </tbody>
        </table>
    )

    return matchedTableContents

}
 