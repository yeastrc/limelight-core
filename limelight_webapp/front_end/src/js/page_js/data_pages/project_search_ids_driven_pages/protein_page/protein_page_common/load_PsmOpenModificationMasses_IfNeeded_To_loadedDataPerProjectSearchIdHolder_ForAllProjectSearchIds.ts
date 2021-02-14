/**
 * load_PsmOpenModificationMasses_IfNeeded_To_loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.ts
 *
 *
 *
 */



// //////////////////////////////////
//
// ///   Get Open Modification Mass Info
//
//
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {loadData_If_ReporterIonMasses_OpenModMasses_Selected__For_PSM_Data_Per_ReportedPeptideId_For_ProteinSequenceVersionId_ProteinPage_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadData_If_ReporterIonMasses_OpenModMasses_Selected__For_PSM_Data_Per_ReportedPeptideId_For_ProteinSequenceVersionId_ProteinPage_LoadTo_loadedDataPerProjectSearchIdHolder";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";

/**
 *
 * @returns null if no data to load, otherwise returns Promise<any>
 */
export const load_PsmOpenModificationMasses_IfNeeded = function({

     getSearchSubGroupIds,
     proteinSequenceVersionId,
     projectSearchIds,
     loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
     searchDataLookupParamsRoot
 } : {
    getSearchSubGroupIds : boolean
    proteinSequenceVersionId : number,
    projectSearchIds : Array<number>,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
    searchDataLookupParamsRoot: SearchDataLookupParameters_Root

}) : Promise<any> {

    const promises_LoadData_Array = [];

    for ( const projectSearchId of projectSearchIds ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );

        if ( proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null ) {

            const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();
            if ( reportedPeptideIdsKeyProteinSequenceVersionId ) {

                //  reportedPeptideIds for this proteinSequenceVersionId
                let reportedPeptideIds_For_proteinSequenceVersionId = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
                if ( reportedPeptideIds_For_proteinSequenceVersionId ) {

                    const promise = _process_SingleProjectSearchId({
                        getSearchSubGroupIds,
                        proteinSequenceVersionId,
                        projectSearchId,
                        loadedDataPerProjectSearchIdHolder,
                        searchDataLookupParamsRoot
                    });
                    if (promise) {
                        promises_LoadData_Array.push(promise);
                    }
                }
            }
        } else {

            // Not for specific proteinSequenceVersionId so always execute

            const promise = _process_SingleProjectSearchId({
                getSearchSubGroupIds,
                proteinSequenceVersionId,
                projectSearchId,
                loadedDataPerProjectSearchIdHolder,
                searchDataLookupParamsRoot
            });
            if (promise) {
                promises_LoadData_Array.push(promise);
            }
        }
    }

    if ( promises_LoadData_Array.length === 0 ) {

        return null;  // EARLY RETURN
    }

    const promiseAll = Promise.all( promises_LoadData_Array );

    return promiseAll;
}

/**
 * process Single ProjectSearchId
 *
 * @returns null if no data to load, otherwise returns Promise<any>
 */
const _process_SingleProjectSearchId = function (
    {
        getSearchSubGroupIds,
        proteinSequenceVersionId,
        projectSearchId,
        loadedDataPerProjectSearchIdHolder,
        searchDataLookupParamsRoot
    } : {
        getSearchSubGroupIds : boolean
        proteinSequenceVersionId : number,
        projectSearchId : number,
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        searchDataLookupParamsRoot: SearchDataLookupParameters_Root

    }) : Promise<any>{

    const searchDataLookupParamsRoot__paramsForProjectSearchIds = searchDataLookupParamsRoot.paramsForProjectSearchIds;
    const searchDataLookupParamsRoot__paramsForProjectSearchIdsList = searchDataLookupParamsRoot__paramsForProjectSearchIds.paramsForProjectSearchIdsList;

    let searchDataLookupParams_For_projectSearchId = undefined;
    for ( const searchDataLookupParamsRoot__paramsForProjectSearchIdsList_Entry of searchDataLookupParamsRoot__paramsForProjectSearchIdsList ) {

        if ( projectSearchId === searchDataLookupParamsRoot__paramsForProjectSearchIdsList_Entry.projectSearchId ) {
            searchDataLookupParams_For_projectSearchId = searchDataLookupParamsRoot__paramsForProjectSearchIdsList_Entry;
            break;
        }
    }
    if ( ! searchDataLookupParams_For_projectSearchId ) {
        const msg = "_loadDataForInitialOverlayShow_GetPer_projectSearchId: No value in searchDataLookupParamsRoot for projectSearchId: " + projectSearchId;
        console.warn( msg );
        throw Error( msg );
    }

    const promise = (
        loadData_If_ReporterIonMasses_OpenModMasses_Selected__For_PSM_Data_Per_ReportedPeptideId_For_ProteinSequenceVersionId_ProteinPage_LoadTo_loadedDataPerProjectSearchIdHolder({
            getSearchSubGroupIds,
            anyReporterIonMassesSelected : false,
            anyOpenModificationMassesSelected : true,
            proteinSequenceVersionId : proteinSequenceVersionId,
            projectSearchId,
            searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_projectSearchId,
            loadedDataPerProjectSearchIdHolder
        })
    );

    return promise;
}
