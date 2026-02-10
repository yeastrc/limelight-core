/**
 * featureDetection_ViewPage__PersistentFeature_DataTable_ExpandChild_ReactComponent__ReturnsComponent.tsx
 *
 * Root of Scan File Browser - inserted into <div> with id 'main_view_loading_data_root_container' in
 *
 */


import React from 'react'

import {
    DataTable_DataRowEntry__Get_RowChildContent_CallParams,
    DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent, DataTable_RootTableObject
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import { DataTable_TableRoot } from "page_js/data_pages/data_table_react/dataTable_TableRoot_React";
import {
    FeatureDetection_ViewPage__Chromatogram_Component,
    FeatureDetection_ViewPage__Chromatogram_Component_Params
} from "page_js/data_pages/feature_detection_driven_pages/feature_detection_view_page/chromatogram/featureDetection_ViewPage__Chromatogram_Component";
import {
    featureDetection_ViewPage__SingularFeature_GetData_ForDataTable,
    FeatureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter,
    FeatureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results
} from "page_js/data_pages/feature_detection_driven_pages/feature_detection_view_page/feature_detection_view_page_root_and_main_page_components/featureDetection_ViewPage__SingularFeature_GetData_ForDataTable";
import {
    featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects,
    FeatureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results
} from "page_js/data_pages/feature_detection_driven_pages/feature_detection_view_page/feature_detection_view_page_root_and_main_page_components/featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects";

/**
 * Returns Child Content callback function so can have more than child data table
 *
 * @param params
 */
export const featureDetection_ViewPage__PersistentFeature_DataTable_ExpandChild_ReactComponent__ReturnsComponent = function(
    {
        params_DataTableCallback, featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter, featureDetection_ViewPage__Chromatogram_Component_Params
    } : {
        params_DataTableCallback: DataTable_DataRowEntry__Get_RowChildContent_CallParams
        featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter: FeatureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter
        featureDetection_ViewPage__Chromatogram_Component_Params: FeatureDetection_ViewPage__Chromatogram_Component_Params
    }
): Promise<DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent> {

    return new Promise<DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent>((resolve, reject) => { try {

        const promise = featureDetection_ViewPage__SingularFeature_GetData_ForDataTable({params: featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter})

        promise.catch(reason => { reject( reason )})
        promise.then( featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results => { try {

            const featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results = featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects({
                featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results, singularFeature_Ids_Filter: undefined
            })

            const get_RowChildContent_Return_ChildContent: DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent =
                ( params : DataTable_DataRowEntry__Get_RowChildContent_CallParams ) : React.JSX.Element => {

                    return (
                        <Internal_PersistentFeature_SingularFeatures_ChildReactComponent
                            params={ params }
                            featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results={ featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results }
                            featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results={ featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results }
                            featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter={ featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter }
                            featureDetection_ViewPage__Chromatogram_Component_Params={ featureDetection_ViewPage__Chromatogram_Component_Params }
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
interface Internal_PersistentFeature_SingularFeatures_ChildReactComponent_Props {

    params : DataTable_DataRowEntry__Get_RowChildContent_CallParams
    featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results: FeatureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results
    featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results: FeatureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results
    featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter: FeatureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter
    featureDetection_ViewPage__Chromatogram_Component_Params: FeatureDetection_ViewPage__Chromatogram_Component_Params
}

/**
 *
 */
interface Internal_PersistentFeature_SingularFeatures_ChildReactComponent_State {

    forceRerenderObject?: object
}

/**
 *
 */
class Internal_PersistentFeature_SingularFeatures_ChildReactComponent extends React.Component< Internal_PersistentFeature_SingularFeatures_ChildReactComponent_Props, Internal_PersistentFeature_SingularFeatures_ChildReactComponent_State > {


    private _DO_NOT_CALL() { //  Test Cast of method
    }

    /**
     *
     */
    constructor(props : Internal_PersistentFeature_SingularFeatures_ChildReactComponent_Props) {
        super( props );


    }

    render() {

        return (
            <div>
                { this.props.featureDetection_ViewPage__Chromatogram_Component_Params ? (
                    <>
                        <div style={ { marginBottom: 20 } }>
                            <FeatureDetection_ViewPage__Chromatogram_Component
                                feature_detection_root__project_scnfl_mapping_tbl__id={ this.props.featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter.feature_detection_root__project_scnfl_mapping_tbl_Id }
                                featureDetection_ViewPage__Chromatogram_Component_Params={ this.props.featureDetection_ViewPage__Chromatogram_Component_Params }
                                featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results={ this.props.featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results }
                                featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results={ this.props.featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results }
                                featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter={ this.props.featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter }
                            />
                        </div>

                        {/*<div style={ { fontSize: 18, fontWeight: "bold" } }>*/}
                        {/*    XXXXX */}
                        {/*</div>*/}
                    </>

                ) : null }

                <div>
                    <div style={ { fontSize: 18, fontWeight: "bold", marginTop: 10, marginBottom: 10 } }>
                        Individual Feature List
                    </div>
                    <DataTable_TableRoot
                        tableObject={ this.props.featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results.dataTable_Data.dataTable_RootTableObject }
                    />
                </div>
            </div>
        )
    }
}
