/**
 * getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_For_SingleProtein_ProteinPositions_ProteinPosition_StartEnd_Selections.ts
 *
 * Filtering for specific Single Protein only
 */

import { CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import { getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId__Merge_ANY_OR__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId__Merge_ANY_OR__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array";
import {
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import { Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_DataClasses";
import { ProteinSequenceWidget_StateObject } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject";
import { Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON";
import { ProteinPositionFilter_UserSelections_StateObject } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {
    CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";

/**
 *
 */
export class GetReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_For_SingleProtein_ProteinPositions_ProteinPosition_StartEnd_Selections {

    private _projectSearchId: number;
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    /**
     *
     */
    private constructor(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number;
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        this._projectSearchId = projectSearchId;
        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    }

    /**
     *
     * @param projectSearchId
     * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
     */
    static getNewInstance(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number;
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ): GetReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_For_SingleProtein_ProteinPositions_ProteinPosition_StartEnd_Selections {

        return new GetReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_For_SingleProtein_ProteinPositions_ProteinPosition_StartEnd_Selections( {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        } )
    }

    /**
     *
     *
     *
     * @param singleProtein_Filter_SelectionType_Requested
     * @param reportedPeptideIds_ProteinId_Params_PassedIn
     * @param modificationMass_UserSelections_StateObject
     * @param modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
     */
    getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_For_SingleProtein_ProteinPositions_ProteinPosition_StartEnd_Selections(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            proteinSequenceWidget_StateObject
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            proteinSequenceWidget_StateObject: ProteinSequenceWidget_StateObject

        } ): Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS> {

        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS> = [];

        {  //  Protein Sequence Positions

            const result = this._getFor__selectedProteinSequencePositions( {
                reportedPeptideIds_ProteinId_Params_PassedIn: reportedPeptideIds_ProteinId_Params_PassedIn,
                proteinSequenceWidget_StateObject,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            } );

            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }
        {  //  Protein Sequence Start/End Positions

            const result = this._getFor__Selected_Protein_StartEnd_Positions( {
                reportedPeptideIds_ProteinId_Params_PassedIn: reportedPeptideIds_ProteinId_Params_PassedIn,
                proteinSequenceWidget_StateObject
            } );

            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }

        return reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array;
    }

    /**
     * User has selected Protein Positions to filter on (Single Protein view) (Requires Single proteinSequenceVersionId)
     *
     */
    private _getFor__selectedProteinSequencePositions(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            proteinSequenceWidget_StateObject,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            proteinSequenceWidget_StateObject: ProteinSequenceWidget_StateObject
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! proteinSequenceWidget_StateObject )
            || ( ! proteinSequenceWidget_StateObject.is_Any_selectedProteinSequencePosition() ) ) {

            //  NO Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
                promise: undefined
            };

            return result; // EARLY RETURN
        }

        const proteinSequenceVersionId: number = reportedPeptideIds_ProteinId_Params_PassedIn.get_proteinSequenceVersionId()

        const selectedProteinSequencePositions = proteinSequenceWidget_StateObject.get_selectedProteinSequencePositions();

        const dataForPositions_ForEnteredSequence: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS =
            Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON.getReportedPeptideIdsForDisplay_ProteinPositionsSelected({
                selectedProteinSequencePositions,
                proteinSequenceVersionId,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            });

        if ( ! dataForPositions_ForEnteredSequence ) {
            const msg = "( ! dataForPositions_ForEnteredSequence )";
            console.warn(msg)
            throw Error(msg)
        }

        return dataForPositions_ForEnteredSequence;
    }


    /**
     * User has selected Protein Start/End Positions to filter on (Single Protein view) (Requires Single proteinSequenceVersionId)
     *
     */
    private _getFor__Selected_Protein_StartEnd_Positions(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            proteinSequenceWidget_StateObject
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            proteinSequenceWidget_StateObject: ProteinSequenceWidget_StateObject

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! proteinSequenceWidget_StateObject )
            || ( ! proteinSequenceWidget_StateObject.is_Any_selected_Protein_StartEnd_Position() ) ) {

            //  NO Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
                promise: undefined
            };

            return result; // EARLY RETURN
        }

        //  Get Data and then call ..._AfterGetData function

        let proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder

        const promises: Array<Promise<void>> = []

        {  //  proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
            const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().
                get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch()

            if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data ) {
                proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder;
            } else if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.then(value => { try {
                        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = value.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result  no 'data' or 'promise'")
            }
        }

        if ( promises.length === 0 ) {
            const result = this._getFor__Selected_Protein_StartEnd_Positions_AfterGetData({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                proteinSequenceWidget_StateObject,
                proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
            });

            return { result, promise: undefined }  // EARLY RETURN
        }

        const promises_All = Promise.all(promises);

        const promise = new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => { try {
            promises_All.catch(reason => {reject(reason)})
            promises_All.then(noValue => { try {
                const result = this._getFor__Selected_Protein_StartEnd_Positions_AfterGetData({
                    reportedPeptideIds_ProteinId_Params_PassedIn,
                    proteinSequenceWidget_StateObject,
                    proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
                });
                resolve(result);
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return { promise, result: undefined }
    }


    /**
     * User has selected Protein Positions to filter on (Peptide Page) Valid for all proteins for selected reported peptide ids  -  After Get Data
     *
     */
    private _getFor__Selected_Protein_StartEnd_Positions_AfterGetData(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            proteinSequenceWidget_StateObject,
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            proteinSequenceWidget_StateObject: ProteinSequenceWidget_StateObject

            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS( {
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        } );

        const proteinSequenceVersionId: number = reportedPeptideIds_ProteinId_Params_PassedIn.get_proteinSequenceVersionId()

        const proteinCoverage_Entries_For_ProteinSequenceVersionId = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinCoverage_Entries_For_ProteinSequenceVersionId( proteinSequenceVersionId )
        if ( ! proteinCoverage_Entries_For_ProteinSequenceVersionId ) {
            throw Error( "_getFor__Selected_Protein_StartEnd_Positions_AfterGetData(...): proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinCoverage_Entries_For_ProteinSequenceVersionId( proteinSequenceVersionId ); returned nothing.  proteinSequenceVersionId: " + proteinSequenceVersionId )
        }

        for ( const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering ) {

            const proteinCoverage_Entries_For_ReportedPeptideId = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinCoverage_For_ReportedPeptideId( reportedPeptideId );
            if ( ! proteinCoverage_Entries_For_ReportedPeptideId ) {
                throw Error( "_getFor__Selected_Protein_StartEnd_Positions_AfterGetData(...): proteinCoverage_KeyReportedPeptideId.get( reportedPeptideId ); returned nothing" )
            }

            let found_proteinCoverage_Entry_For_Filter = false;

            for ( const proteinCoverage_Entry of proteinCoverage_Entries_For_ReportedPeptideId ) {

                if ( proteinCoverage_Entry.proteinSequenceVersionId != proteinSequenceVersionId ) {
                    //  proteinCoverage_Entry NOT for this proteinSequenceVersionId so skip
                    continue; // EARLY CONTINUE
                }

                let foundInSelections = false

                for ( const selection of proteinSequenceWidget_StateObject.get_AllSelections_Protein_StartEnd_Position() ) {

                    if ( selection.protein_Start === proteinCoverage_Entry.proteinStartPosition
                        && selection.protein_End === proteinCoverage_Entry.proteinEndPosition ) {

                        foundInSelections = true
                        // break  // BREAK LOOP
                    }
                }

                if ( foundInSelections ) {
                    // Found in selections
                    found_proteinCoverage_Entry_For_Filter = true;
                    // break  // BREAK LOOP
                }
            }

            if ( found_proteinCoverage_Entry_For_Filter ) {

                const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS( { reportedPeptideId, psmEntries_Include_Map_Key_PsmId: undefined } );
                resultData.set_Entry_Using_entry_reportedPeptideId_AsKey( entry );
            }
        }

        return resultData;
    }

}

