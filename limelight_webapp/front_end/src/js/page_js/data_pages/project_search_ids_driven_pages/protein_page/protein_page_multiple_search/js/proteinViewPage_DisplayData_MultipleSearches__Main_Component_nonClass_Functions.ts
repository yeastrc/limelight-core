/**
 * proteinViewPage_DisplayData_MultipleSearches__Main_Component_nonClass_Functions.ts
 *
 * proteinViewPage_DisplayData_MultipleSearches__Main_Component.tsx
 *
 */



import {SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_Root";
import {SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/jsx/searchSubGroup_In_SearchDetailsOuterBlock";
import {SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_UserInputInOverlay";
import {ProteinViewPage_DisplayData_MultipleSearches__Main_Component_Props_Prop} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_multiple_search/jsx/proteinViewPage_DisplayData_MultipleSearches__Main_Component";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {get_DynamicModificationsForReportedPeptideIds} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinViewPage_DisplayData_SingleProtein_GetDynamicModificationsForReportedPeptides";
import {get_OpenModificationsForReportedPeptideIds} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinViewPage_DisplayData_SingleProtein_Get_Open_ModificationsForReportedPeptides";
import {loadPeptideIdsIfNeeded_ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadPeptideIdsIfNeeded_ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";

/**
 * Create searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
 */
const compute_searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue = function (
    {
        propsValue
    } : {
        propsValue : ProteinViewPage_DisplayData_MultipleSearches__Main_Component_Props_Prop

    }) : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
{

    let searchSubGroup_PropValue : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData = undefined;

    const filterValuesChanged_Callback = (params: SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param) : void => {

        console.warn("filterValuesChanged_Callback called: params: ", params )

        // throw Error("filterValuesChanged_Callback callback not handled")

        window.location.reload( true );  // TODO
    }

    const searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue =  {
        displayOnly : false,
        dataPages_LoggedInUser_CommonObjectsFactory : propsValue.dataPages_LoggedInUser_CommonObjectsFactory,
        dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : propsValue.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
        dataPageStateManager_DataFrom_Server : propsValue.dataPageStateManager,
        searchDetailsBlockDataMgmtProcessing : propsValue.searchDetailsBlockDataMgmtProcessing,
        filterValuesChanged_Callback,
        searchSubGroup_PropValue
    }

    return searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue;
}



/**
 *
 */
const loadDataFor_ComputedReportedPeptides_AllProteins = function(
    {
        projectSearchIds, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
    }: {

    projectSearchIds: Array<number>
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>

}): Array<Promise<any>> {

    const promises__get_Array: Array<Promise<any>> = [];

    for (const projectSearchId of projectSearchIds) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
        if (!loadedDataPerProjectSearchIdHolder) {
            const msg = "ProteinViewPage_Display_MultipleSearches: _loadDataFor_ComputedReportedPeptides_AllProteins: no value in loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        //  Process for all reportedPeptideIds for projectSearchId

        const reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();
        if (!reportedPeptideIds) {
            const msg = "ProteinViewPage_Display_MultipleSearches: _loadDataFor_ComputedReportedPeptides_AllProteins: no value in loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds() for projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        {
            const promise_get__ = get_DynamicModificationsForReportedPeptideIds({loadedDataPerProjectSearchIdHolder, projectSearchId, reportedPeptideIds});

            if (promise_get__) { //  May return null so test before add to array
                promises__get_Array.push(promise_get__);
            }
        }
        {
            const promise_get__ = get_OpenModificationsForReportedPeptideIds({loadedDataPerProjectSearchIdHolder, projectSearchId, reportedPeptideIds});

            if (promise_get__) { //  May return null so test before add to array
                promises__get_Array.push(promise_get__);
            }
        }
        {
            const promise_get__ = loadPeptideIdsIfNeeded_ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder({reportedPeptideIds, projectSearchId, loadedDataPerProjectSearchIdHolder});

            if (promise_get__) { //  May return null so test before add to array
                promises__get_Array.push(promise_get__);
            }
        }
    }

    return promises__get_Array;
}



export class ProteinViewPage_DisplayData_MultipleSearches__Main_Component_nonClass_Functions {

    static compute_searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue = compute_searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue;
    static loadDataFor_ComputedReportedPeptides_AllProteins = loadDataFor_ComputedReportedPeptides_AllProteins;
}