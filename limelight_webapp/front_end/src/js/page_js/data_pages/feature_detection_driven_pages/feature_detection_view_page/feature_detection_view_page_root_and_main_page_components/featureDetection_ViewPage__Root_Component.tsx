/**
 * featureDetection_ViewPage__Root_Component.tsx
 *
 * Root of Feature Detection View - inserted into <div> with id 'main_view_loading_data_root_container' in
 *
 */


import React from 'react'
import {
    FeatureDetection_ViewPage__MainPage_Component,
    FeatureDetection_ViewPage__MainPage_Component_Props_Prop
} from "page_js/data_pages/feature_detection_driven_pages/feature_detection_view_page/feature_detection_view_page_root_and_main_page_components/featureDetection_ViewPage__MainPage_Component";
import { CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries";
import { CommonData_LoadedFromServer_FeatureDetection__MappingOf_PersistentToSingularFeature_Entries } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer_FeatureDetection_MappingOf_PersistentToSingularFeature_Entries";
import { CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries";
import { CommonData_LoadedFromServer_FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer_FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id";

/////////////////////////

/**
 *
 */
export interface FeatureDetection_ViewPage__Root_Component_Props {

    propsValue : FeatureDetection_ViewPage__MainPage_Component_Props_Prop
}

/**
 *
 */
interface FeatureDetection_ViewPage__Root_Component_State {

    component_SubTree_Has_Error? : boolean
}

/**
 *
 */
export class FeatureDetection_ViewPage__Root_Component extends React.Component< FeatureDetection_ViewPage__Root_Component_Props, FeatureDetection_ViewPage__Root_Component_State > {

    //  bind to 'this' for passing as parameters

    private _commonData_LoadedFromServer_FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id: CommonData_LoadedFromServer_FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id

    /**
     *
     */
    constructor(props : FeatureDetection_ViewPage__Root_Component_Props) {
        super(props);

        this._commonData_LoadedFromServer_FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id = CommonData_LoadedFromServer_FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id.getNewInstance()

        this.state = {
        };
    }

    /**
     *
     */
    static getDerivedStateFromError( error : any ) : FeatureDetection_ViewPage__Root_Component_State {
        // Update state so the next render will show the fallback UI.
        return { component_SubTree_Has_Error: true };
    }

    /**
     *
     */
    componentDidCatch( error : any, errorInfo : any ) {
        // You can also log the error to an error reporting service

        console.warn("react Component 'FeatureDetection_ViewPage_DisplayData_ScanFileBrowserList_Root_Component'. componentDidCatch: ", error, errorInfo );
        // logErrorToMyService(error, errorInfo);
    }

    /**
     *
     */
    // componentDidMount() {
    //
    // }

    /**
     *
     */
    // componentWillUnmount() {
    //
    // }

    ////////////////////////////////////////

    /**
     *
     */
    render() {

        let component_SubTree_ErrorMessage : React.JSX.Element = undefined;

        let mainContent : React.JSX.Element = undefined;


        if ( this.state.component_SubTree_Has_Error ) {

            component_SubTree_ErrorMessage = (

                <div >An Error has Occurred.  Please reload the page and try again.</div>
            );

        } else {

            mainContent = (
                <FeatureDetection_ViewPage__MainPage_Component
                    propsValue={ this.props.propsValue }
                />
            );
        }

        return (
            <div >
                { component_SubTree_ErrorMessage }
                { mainContent }
            </div>
        );
    }

}

