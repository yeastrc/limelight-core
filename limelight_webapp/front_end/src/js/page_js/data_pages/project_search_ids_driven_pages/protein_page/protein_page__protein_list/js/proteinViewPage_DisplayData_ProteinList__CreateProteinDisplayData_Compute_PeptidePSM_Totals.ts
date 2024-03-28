/**
 * proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compute_PeptidePSM_Totals.ts
 *
 * Create Display Data for Protein List - Compute Peptide and PSM totals for the final displayed Protein List
 */

import {
    ProteinDataDisplay__Summary_PerSearch,
    ProteinDataDisplay_ProteinList_Item,
    ProteinDisplayData_From_createProteinDisplayData_ProteinList,
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_FunctionResult,
    CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters";

/**
 *
 */
export const proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compute_PeptidePSM_Totals = function (
    {
        compute_PerProjectSearchId_Data,
        searchSubGroup_Ids_Selected, // Set<number>  undefined/null if not set
        projectSearchIds,
        proteinDisplayData,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        compute_PerProjectSearchId_Data: boolean
        searchSubGroup_Ids_Selected: Set<number>
        projectSearchIds : Array<number>
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }) : Promise<void> {

    return new Promise<void>( (resolve_TopLevel, reject_TopLevel,) => {
        try {
            if ( compute_PerProjectSearchId_Data ) {
                _initialize__proteinDisplayData__summaryMap_Key_ProjectSearchId({ projectSearchIds, proteinDisplayData });
            }

            if (proteinDisplayData.proteinList.length === 0) {
                //  No data so set counts to zero and exit

                proteinDisplayData.distinctPeptide_TotalCount = 0;
                proteinDisplayData.psm_TotalCount = 0;

                resolve_TopLevel(); // EARLY RETURN
            }

            _process_Data_Compute_DistinctPeptide_Count({ compute_PerProjectSearchId_Data, proteinDisplayData });

            //  Get Data needed in child functions

            const promises: Array<Promise<void>> = [];

            const numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType> = new Map();
            const numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder: Map<number, CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder> = new Map();

            for ( const projectSearchId of projectSearchIds ) {

                const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)
                if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                    throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId) returned nothing for projectSearchId: "+ projectSearchId)
                }

                {
                    const get_numPsmsForReportedPeptideIdMap_Result =
                        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                        get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_numPsmsForReportedPeptideIdMap();
                    if (get_numPsmsForReportedPeptideIdMap_Result.data) {
                        numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId.set(projectSearchId, get_numPsmsForReportedPeptideIdMap_Result.data.numPsmsForReportedPeptideIdMap);
                    } else if (get_numPsmsForReportedPeptideIdMap_Result.promise) {
                        const promise = new Promise<void>((resolve, reject) => { try {
                            get_numPsmsForReportedPeptideIdMap_Result.promise.catch(reason => {
                                reject(reason)
                            })
                            get_numPsmsForReportedPeptideIdMap_Result.promise.then(value => { try {
                                numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId.set(projectSearchId, value.numPsmsForReportedPeptideIdMap);
                                resolve();
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        promises.push(promise);
                    } else {
                        throw Error("get_numPsmsForReportedPeptideIdMap_Result.data and get_numPsmsForReportedPeptideIdMap_Result.promise are both NOT SET");
                    }
                }
                {
                    if ( searchSubGroup_Ids_Selected ) {  // Also load num PSMs per sub group
                        const get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result =
                            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                            get_commonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters().get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch();
                        if (get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result.data) {
                            numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder.set(projectSearchId, get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result.data.numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder);
                        } else if (get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result.promise) {
                            const promise = new Promise<void>((resolve, reject) => { try {
                                get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => {
                                    reject(reason)
                                })
                                get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => { try {
                                    numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder.set(projectSearchId, value.numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder);
                                    resolve();

                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                            promises.push(promise);


                        } else {
                            throw Error("get_Result.data and get_Result.promise are both NOT SET");
                        }
                    }
                }
            }

            if ( promises.length === 0 ) {

                _computePsmCountTotal({
                    searchSubGroup_Ids_Selected, proteinDisplayData, numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId, numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder
                });
                resolve_TopLevel();

            } else {
                const promisesAll = Promise.all(promises);
                promisesAll.catch(reason => {
                    reject_TopLevel(reason);
                })
                promisesAll.then(value => {
                    try {
                        _computePsmCountTotal({
                            searchSubGroup_Ids_Selected, proteinDisplayData, numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId, numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder
                        });
                        resolve_TopLevel();

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                })
            }

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    })
}

/**
 *
 */
const _initialize__proteinDisplayData__summaryMap_Key_ProjectSearchId = function (
    {
        projectSearchIds,
        proteinDisplayData
    } : {
        projectSearchIds : Array<number>
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
    }) : void {

    proteinDisplayData.summaryMap_Key_ProjectSearchId = new Map();

    for ( const projectSearchId of projectSearchIds ) {
        const summary = new ProteinDataDisplay__Summary_PerSearch();
        proteinDisplayData.summaryMap_Key_ProjectSearchId.set( projectSearchId, summary );

        summary.projectSearchId = projectSearchId;
    }
}

/**
 *
 */
const _process_Data_Compute_DistinctPeptide_Count = function(
    {
        compute_PerProjectSearchId_Data,
        proteinDisplayData
    } : {
        compute_PerProjectSearchId_Data: boolean
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
    }) : void {

    const reportedPeptide_CommonValue_EncodedString_Set = new Set<string>();

    let reportedPeptide_CommonValue_EncodedStringSet_Map_Key_ProjectSearchId: Map<number,Set<string>> = undefined;

    if ( compute_PerProjectSearchId_Data ) {
        reportedPeptide_CommonValue_EncodedStringSet_Map_Key_ProjectSearchId = new Map();
    }

    let proteinList_Local: Array<ProteinDataDisplay_ProteinList_Item> = proteinDisplayData.proteinList;

    if ( proteinDisplayData.proteinGroupsList ) {

        //  Have Protein Groups so get the Protein Items from the Groups instead to make sure to process what is displayed on the page.

        proteinList_Local = [];
        for ( const proteinGroup of proteinDisplayData.proteinGroupsList ) {
            for ( const proteinItem of proteinGroup.proteinList_Grouped ) {
                proteinList_Local.push( proteinItem );
            }
        }

    }


    for (const proteinItem of proteinList_Local) {

        for (const reportedPeptide_CommonValue_EncodedString of proteinItem.generatedPeptides_Overall_Set) {

            reportedPeptide_CommonValue_EncodedString_Set.add(reportedPeptide_CommonValue_EncodedString);

            if ( reportedPeptide_CommonValue_EncodedStringSet_Map_Key_ProjectSearchId ) {

                for ( const protein_SubItem_Records_MapEntry of proteinItem.protein_SubItem_Records_Map_Key_projectSearchId.entries() ) {

                    const projectSearchId = protein_SubItem_Records_MapEntry[0];
                    const protein_SubItem_Record = protein_SubItem_Records_MapEntry[1];

                    let reportedPeptide_CommonValue_EncodedStringSet = reportedPeptide_CommonValue_EncodedStringSet_Map_Key_ProjectSearchId.get( projectSearchId );
                    if ( ! reportedPeptide_CommonValue_EncodedStringSet ) {
                        reportedPeptide_CommonValue_EncodedStringSet = new Set();
                        reportedPeptide_CommonValue_EncodedStringSet_Map_Key_ProjectSearchId.set( projectSearchId, reportedPeptide_CommonValue_EncodedStringSet );
                    }

                    for ( const reportedPeptide_CommonValue_EncodedString of protein_SubItem_Record.reportedPeptide_CommonValue_EncodedString_ForProtein_Set ) {

                        reportedPeptide_CommonValue_EncodedStringSet.add( reportedPeptide_CommonValue_EncodedString );
                    }
                }
            }
        }

        {
            const summaryMap_Key_ProjectSearchId : Map<number, ProteinDataDisplay__Summary_PerSearch> = proteinDisplayData.summaryMap_Key_ProjectSearchId;

            if ( summaryMap_Key_ProjectSearchId ) {

                for ( const protein_SubItem_Records_MapEntry of proteinItem.protein_SubItem_Records_Map_Key_projectSearchId.entries() ) {

                    const projectSearchId = protein_SubItem_Records_MapEntry[0];

                    const summaryEntry = summaryMap_Key_ProjectSearchId.get( projectSearchId );
                    if ( ! summaryEntry ) {
                        const msg = "( ! summaryEntry ) . projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    summaryEntry.proteinCount_TotalForSearch++;
                }
            }
        }
    }

    proteinDisplayData.distinctPeptide_TotalCount = reportedPeptide_CommonValue_EncodedString_Set.size;

    if ( reportedPeptide_CommonValue_EncodedStringSet_Map_Key_ProjectSearchId ) {

        const summaryMap_Key_ProjectSearchId : Map<number, ProteinDataDisplay__Summary_PerSearch> = proteinDisplayData.summaryMap_Key_ProjectSearchId;

        for ( const reportedPeptide_CommonValue_EncodedStringSet_MapEntry of reportedPeptide_CommonValue_EncodedStringSet_Map_Key_ProjectSearchId.entries() ) {

            const projectSearchId = reportedPeptide_CommonValue_EncodedStringSet_MapEntry[0];
            const reportedPeptide_CommonValue_EncodedStringSet = reportedPeptide_CommonValue_EncodedStringSet_MapEntry[1];

            const summaryEntry = summaryMap_Key_ProjectSearchId.get( projectSearchId );
            if ( ! summaryEntry ) {
                const msg = "( ! summaryEntry ) . projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }
            summaryEntry.distinctPeptideCount_TotalForSearch = reportedPeptide_CommonValue_EncodedStringSet.size;
        }
    }

}

/**
 *
 */
const _computePsmCountTotal = function(
    {
        searchSubGroup_Ids_Selected, // Set<number>  undefined/null if not set
        proteinDisplayData,
        numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId,
        numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder
    } : {
        searchSubGroup_Ids_Selected: Set<number>
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
        numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType>
        numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder: Map<number, CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder>
    }) : void {

    //   proteinDisplayData.reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container  is populated after ALL Filtering

    let psmCountTotal = 0;

    //  Populated processing the distinct peptides
    const summaryMap_Key_ProjectSearchId = proteinDisplayData.summaryMap_Key_ProjectSearchId;

    for ( const data_Per_ProjectSearchId_MapEntry of proteinDisplayData.reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container__After_All_Filtering.data_Per_ProjectSearchId_Map_Key_ProjectSearchId.entries() ) {

        const data_Per_ProjectSearchId = data_Per_ProjectSearchId_MapEntry[1];

        const projectSearchId = data_Per_ProjectSearchId.projectSearchId;
        const data_Per_ReportedPeptideId_Map_Key_ReportedPeptideId = data_Per_ProjectSearchId.data_Per_ReportedPeptideId_Map_Key_ReportedPeptideId;

        let summaryEntry: ProteinDataDisplay__Summary_PerSearch = undefined;
        if ( summaryMap_Key_ProjectSearchId ) {
            summaryEntry = summaryMap_Key_ProjectSearchId.get( projectSearchId );
            if ( ! summaryEntry ) {
                const msg = "( ! summaryEntry ) . projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }
        }

        for ( const data_Per_ReportedPeptideId_MapEntry of data_Per_ReportedPeptideId_Map_Key_ReportedPeptideId.entries() ) {

            const data_Per_ReportedPeptideId = data_Per_ReportedPeptideId_MapEntry[1];

            if ( ! data_Per_ReportedPeptideId.all_PsmIds_BasedOnFilterCutoffs ) {

                //  Have PSM Ids so use count of PSM Ids

                if ( ! data_Per_ReportedPeptideId.psmIds ) {
                    const msg = "( ! data_Per_ReportedPeptideId.all_PsmIds_BasedOnFilterCutoffs ) and ( ! data_Per_ReportedPeptideId.psmIds ). projectSearchId: " + projectSearchId +
                        ", reportedPeptideId: " + data_Per_ReportedPeptideId.reportedPeptideId;
                    console.warn(msg);
                    throw Error(msg);
                }

                const numPsms = data_Per_ReportedPeptideId.psmIds.size;

                psmCountTotal += numPsms;

                if ( summaryEntry ) {
                    summaryEntry.psmCount_TotalForSearch += numPsms;
                }

            } else {
                //  PSM Ids not specified so get PSM count for reportedPeptideId
                const reportedPeptideId = data_Per_ReportedPeptideId.reportedPeptideId;

                if ( searchSubGroup_Ids_Selected ) {

                    //  Have searchSubGroup_Ids_Selected

                    //  Get PSM counts for only the searchSubGroup_Ids selected

                    if ( ! numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder ) {
                        const msg = "( searchSubGroup_Ids_Selected ) true: ( ! numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder ): projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    const numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map = numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder.get(projectSearchId);
                    if ( ! numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder ) {
                        const msg = "numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder.get(projectSearchId); returned nothing for projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }
                    const numPsmsFor_SearchSubGroupId = numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map.get_numPsmsFor_SearchSubGroupId__For_ReportedPeptideId( reportedPeptideId );
                    if ( numPsmsFor_SearchSubGroupId ) {
                        for ( const searchSubGroup_Id of searchSubGroup_Ids_Selected ) {

                            const numPsms = numPsmsFor_SearchSubGroupId.get( searchSubGroup_Id );
                            if ( numPsms ) {

                                psmCountTotal += numPsms;

                                if ( summaryEntry ) {
                                    summaryEntry.psmCount_TotalForSearch += numPsms;
                                }
                            }
                        }
                    }

                } else {

                    //  NO searchSubGroup_Ids_Selected.  Use PSM count for reportedPeptideId

                    const numPsmsForReportedPeptideIdMap = numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId.get(projectSearchId);
                    if ( ! numPsmsForReportedPeptideIdMap ) {
                        throw Error("numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId.get(projectSearchId); returned nothing for projectSearchId: " + projectSearchId )
                    }

                    const numPsms = numPsmsForReportedPeptideIdMap.get( reportedPeptideId );
                    if ( numPsms ) {

                        psmCountTotal += numPsms;

                        if ( summaryEntry ) {
                            summaryEntry.psmCount_TotalForSearch += numPsms;
                        }
                    }
                }
            }
        }

        proteinDisplayData.psm_TotalCount = psmCountTotal;
    }
}