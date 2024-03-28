/**
 * psm_Charge_Filter_UserSelection_Container_Component.tsx
 *
 * Filter on Charge on PSM - Container Component  -- for all except Mod Main Page
 *
 * Handles getting the Charge Values
 *
 *
 //  Use these 2 lines to "Clear" the State object and update the Component Display
 // psm_Charge_Filter_UserSelection_Container_Component.clearAll();
 // Set Prop param 'psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject' to new empty object  {}
 *
 */

import React from 'react'
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {Psm_Charge_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/psm_Charge_Filter_UserSelection_StateObject";
import {
    Psm_Charge_Filter_UserSelection_Component,
    Psm_Charge_Filter_UserSelection_Component__Get_ChargeValues_ForSearches_Callback,
    Psm_Charge_Filter_UserSelection_Component__Get_ChargeValues_ForSearches_Callback_Return_DataValue,
    Psm_Charge_Filter_UserSelection_Component__Get_ChargeValues_ForSearches_Callback_ReturnValue
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/psm_Charge_Filter_UserSelection_Component";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters__get_PSM_TblData_For_ReportedPeptideIdHolder__FunctionResult,
    CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";

/**
 *
 */
export interface Psm_Charge_Filter_UserSelection_Container_Component_Props {

    projectSearchIds : Array<number>

    psm_Charge_Filter_UserSelection_StateObject : Psm_Charge_Filter_UserSelection_StateObject;
    psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject : object

    updateMadeTo_psm_Charge_Filter_UserSelection_StateObject_Callback : () => void

    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
}

interface Psm_Charge_Filter_UserSelection_Container_Component_State {

    chargeValues?: Set<number>
}

/**
 *
 */
export class Psm_Charge_Filter_UserSelection_Container_Component extends React.Component< Psm_Charge_Filter_UserSelection_Container_Component_Props, Psm_Charge_Filter_UserSelection_Container_Component_State > {

    private _psm_Charge_Filter_UserSelection_Component__Get_ChargeValues_ForSearches_Callback_BindThis = this._psm_Charge_Filter_UserSelection_Component__Get_ChargeValues_ForSearches_Callback.bind(this);

    private _DONOTCALL() {  //  ONLY  Check that cast is valid

        const psm_Charge_Filter_UserSelection_Component__Get_ChargeValues_ForSearches_Callback : Psm_Charge_Filter_UserSelection_Component__Get_ChargeValues_ForSearches_Callback =
            this._psm_Charge_Filter_UserSelection_Component__Get_ChargeValues_ForSearches_Callback
    }

    /**
     *
     */
    constructor(props : Psm_Charge_Filter_UserSelection_Container_Component_Props) {
        super(props);

        this.state = {
        }
    }


    /**
     *
     * @private
     */
    private _psm_Charge_Filter_UserSelection_Component__Get_ChargeValues_ForSearches_Callback() : Psm_Charge_Filter_UserSelection_Component__Get_ChargeValues_ForSearches_Callback_ReturnValue {

        const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_ForAllSearches: Array<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder> = []
        const promises_get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result: Array< Promise<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters__get_PSM_TblData_For_ReportedPeptideIdHolder__FunctionResult>> = []

        for ( const projectSearchId of this.props.projectSearchIds ) {
            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                const msg = "this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId) returned Nothing: projectSearchId: " + projectSearchId
                console.warn(msg)
                throw Error(msg)
            }

            const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters()
                    .get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch();

            if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_ForAllSearches.push( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder );
            } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                promises_get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.push(get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise)
            } else {
                throw Error("get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result no promise or data")
            }
        }

        if ( promises_get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.length === 0 ) {

            return { promise: undefined, result: this._get_ChargeValues_ForSearch({ psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_ForAllSearches }) }; // EARLY RETURN
        }

        const promises_All = Promise.all(promises_get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result);

        return { result: undefined, promise: new Promise<Psm_Charge_Filter_UserSelection_Component__Get_ChargeValues_ForSearches_Callback_Return_DataValue>((resolve, reject) => { try {
                promises_All.catch(reason => {
                    reject(reason)
                })
                promises_All.then(resultValueArray => { try {
                    for ( const resultValue of resultValueArray ) {
                        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_ForAllSearches.push( resultValue.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder );
                    }
                    const result = this._get_ChargeValues_ForSearch({ psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_ForAllSearches });
                    resolve( result );  // resolve

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        }
    }

    /**
     *
     * @param psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_ForAllSearches
     */
    private _get_ChargeValues_ForSearch(
        {
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_ForAllSearches
        } : {
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_ForAllSearches: Array<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder>
        }
    ) : Psm_Charge_Filter_UserSelection_Component__Get_ChargeValues_ForSearches_Callback_Return_DataValue {

        const charge_AllUniqueValues = new Set<number>();

        for ( const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder of psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_ForAllSearches ) {
            for ( const psmTblData_For_PSM of psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_Entries_IterableIterator() ) {
                charge_AllUniqueValues.add( psmTblData_For_PSM.charge );
            }
        }

        return { charge_Values: charge_AllUniqueValues };
    }

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate(nextProps : Psm_Charge_Filter_UserSelection_Container_Component_Props, nextState : Psm_Charge_Filter_UserSelection_Container_Component_State ) : boolean {

        // console.log(" shouldComponentUpdate")

        //  Only update if changed: props or state:

        if (
            this.props.psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject !== nextProps.psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject
        ) {
            return true;
        }

        return false;

        //  If Comment out prev code, comment out this method
    }

    /**
     *
     */
    render() {
        try {

            return (
                <Psm_Charge_Filter_UserSelection_Component
                    psm_Charge_Filter_UserSelection_StateObject={ this.props.psm_Charge_Filter_UserSelection_StateObject }
                    psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject={ this.props.psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject }

                    psm_Charge_Filter_UserSelection_Component__Get_ChargeValues_ForSearches_Callback={ this._psm_Charge_Filter_UserSelection_Component__Get_ChargeValues_ForSearches_Callback_BindThis }

                    updateMadeTo_psm_Charge_Filter_UserSelection_StateObject_Callback={ this.props.updateMadeTo_psm_Charge_Filter_UserSelection_StateObject_Callback }
                />
            );

        } catch( e ) {
            console.warn("Exception caught in render", e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }
}



