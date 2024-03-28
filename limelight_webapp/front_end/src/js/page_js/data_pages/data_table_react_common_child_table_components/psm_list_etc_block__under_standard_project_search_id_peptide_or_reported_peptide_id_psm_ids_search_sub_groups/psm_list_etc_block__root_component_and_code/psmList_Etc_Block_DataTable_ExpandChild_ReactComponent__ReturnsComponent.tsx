/**
 * psmList_Etc_Block_DataTable_ExpandChild_ReactComponent__ReturnsComponent.tsx
 *
 */


import React from 'react'

import {
    DataTable_DataRowEntry__Get_RowChildContent_CallParams,
    DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import { DataTable_TableRoot } from "page_js/data_pages/data_table_react/dataTable_TableRoot_React";
import {
    psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects,
    PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter,
    PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Result
} from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/psm_list/js/psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects";
import {
    PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component,
    PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params
} from '../psm_list_etc_block__sub_components/chromatogram/psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component';

/**
 * ASSUMPTION:  This Component is NEVER in an overlay so it is able to use Overlay that uses CSS: body.data-page div.modal-overlay-container
 *
 * Returns Child Content callback function so can have more than child data table
 *
 * @param params
 */
export const psmList_Etc_Block_DataTable_ExpandChild_ReactComponent__ReturnsComponent = function(
    {
        params_DataTableCallback, psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params, psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter
    } : {
        params_DataTableCallback: DataTable_DataRowEntry__Get_RowChildContent_CallParams
        psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params: PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params
        psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter : PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter
    }
): Promise<DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent> {

    return new Promise<DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent>((resolve, reject) => { try {

        const promise = psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects({params: psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter})

        promise.catch(reason => { reject( reason )})
        promise.then( psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results => { try {

            const get_RowChildContent_Return_ChildContent: DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent =
                ( params : DataTable_DataRowEntry__Get_RowChildContent_CallParams ) : JSX.Element => {

                    return (
                        <Internal_ReportedPeptide_SingleExpanded_ChildReactComponent
                            params={ params }
                            psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params={ psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params }
                            psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results={ psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results }
                            psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter={ psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter }
                        />
                    )
                }

            resolve( get_RowChildContent_Return_ChildContent )

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}


/**
 *
 */
interface Internal_ReportedPeptide_SingleExpanded_ChildReactComponent_Props {

    params : DataTable_DataRowEntry__Get_RowChildContent_CallParams
    psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params: PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params
    psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results: PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Result
    psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter : PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter
}

/**
 *
 */
interface Internal_ReportedPeptide_SingleExpanded_ChildReactComponent_State {

    forceRerenderObject?: object
}

/**
 *
 */
class Internal_ReportedPeptide_SingleExpanded_ChildReactComponent extends React.Component< Internal_ReportedPeptide_SingleExpanded_ChildReactComponent_Props, Internal_ReportedPeptide_SingleExpanded_ChildReactComponent_State > {


    private _DO_NOT_CALL() { //  Test Cast of method
    }

    /**
     *
     */
    constructor(props : Internal_ReportedPeptide_SingleExpanded_ChildReactComponent_Props) {
        super( props );


    }
    
    render() {

        const projectSearchId = this.props.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter.projectSearchId

        if ( ! this.props.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter.dataPageStateManager ) {
            const className = this.constructor ? this.constructor.name : "Unknown: No this.constructor"
            const msg = "( ! this.props.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter.dataPageStateManager ).  in class name: " + className
            console.warn(msg)
            throw Error(msg)
        }

        const dataPage_common_Flags_SingleSearch_ForProjectSearchId = this.props.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter.dataPageStateManager.get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId)
        if ( ! dataPage_common_Flags_SingleSearch_ForProjectSearchId ) {
            const msg = "this.props.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter.dataPageStateManager.get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId
            console.warn(msg)
            throw Error(msg)
        }

        return (
            <div>
                { dataPage_common_Flags_SingleSearch_ForProjectSearchId.hasScanData && this.props.psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params ? (
                    <>
                        <div style={ { marginBottom: 20 } }>
                            <PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component
                                projectSearchId={ this.props.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter.projectSearchId }
                                psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params={ this.props.psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params }
                                psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter={ this.props.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter }
                                psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results={ this.props.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results }
                            />
                        </div>

                        <div style={ { fontSize: 18, fontWeight: "bold" } }>
                            PSM List
                        </div>
                    </>

                ) : null }

                <div>
                    <DataTable_TableRoot
                        tableObject={ this.props.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results.dataTable_Data.dataTable_RootTableObject }
                    />
                </div>
            </div>
        )
    }
}
