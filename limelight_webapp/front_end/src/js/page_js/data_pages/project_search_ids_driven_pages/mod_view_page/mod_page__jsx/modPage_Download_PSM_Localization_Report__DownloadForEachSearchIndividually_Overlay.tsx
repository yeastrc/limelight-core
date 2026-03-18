/**
 * modPage_Download_PSM_Localization_Report__DownloadForEachSearchIndividually_Overlay.tsx
 *
 * '[Download PSM Localization Report]'  Download link for each search individually since downloading all together is causing error on Max Javascript String.
 *
 *
 */

import React from 'react'

import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    modPage_GetSearchNameForProjectSearchId
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_GetSearchNameForProjectSearchId";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";
import {
    ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering";
import {
    ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_of_modification_filter_component/js/proteinPosition_Of_Modification_Filter_UserSelections_StateObject";
import {
    ProteinPositionFilter_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {
    ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {
    ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    modPage_Download_PSM_Localization_Report
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__clickable_links_for_downloads_and_view_js/modPage_Download_PSM_Localization_Report";
import {
    SearchSubGroup_CentralStateManagerObjectClass
} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_CentralStateManagerObjectClass";
import {
    ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root";

/////

const _Overlay_Title = "Download PSM Localization Report"


const _Overlay_Width_Min = 600;
const _Overlay_Width_Max = 1200;
const _Overlay_Height_Min = 400;
const _Overlay_Height_Max_AbsoluteMax = 1000;

//////

/**
 *
 */
export class ModPage_Download_PSM_Localization_Report__DownloadForEachSearchIndividually_Overlay_Params {
    projectSearchIds : Array<number>
    modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
    all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
}

/**
 *
 * @param tableRows
 */
export const open_ModPage_Download_PSM_Localization_Report__DownloadForEachSearchIndividually_Overlay = function( params: ModPage_Download_PSM_Localization_Report__DownloadForEachSearchIndividually_Overlay_Params ) : void {

    let limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder: Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF

    const callbackOn_Cancel_Close_Clicked = () => {

        limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    }

    const overlayComponent = (
        <ModPage_Download_PSM_Localization_Report__DownloadForEachSearchIndividually_Overlay_OuterContainer_Component
            props_value={ params }
            callbackOn_Cancel_Close_Clicked={ callbackOn_Cancel_Close_Clicked }
        />
    )

    limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder =
        limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })
}

////  React Components



/**
 *
 */
interface ModPage_Download_PSM_Localization_Report__DownloadForEachSearchIndividually_Overlay_OuterContainer_Component_Props {
    props_value: ModPage_Download_PSM_Localization_Report__DownloadForEachSearchIndividually_Overlay_Params
    callbackOn_Cancel_Close_Clicked : () => void;
}

/**
 *
 */
interface ModPage_Download_PSM_Localization_Report__DownloadForEachSearchIndividually_Overlay_OuterContainer_Component_State {

    force_Rerender?: object
}

/**
 *
 */
class ModPage_Download_PSM_Localization_Report__DownloadForEachSearchIndividually_Overlay_OuterContainer_Component extends React.Component< ModPage_Download_PSM_Localization_Report__DownloadForEachSearchIndividually_Overlay_OuterContainer_Component_Props, ModPage_Download_PSM_Localization_Report__DownloadForEachSearchIndividually_Overlay_OuterContainer_Component_State > {

    private _unmountCalled = false;

    private readonly _searches_Div_Ref :  React.RefObject<HTMLDivElement>

    private _overlay_Height_Max = _Overlay_Height_Max_AbsoluteMax

    /**
     *
     */
    constructor(props: ModPage_Download_PSM_Localization_Report__DownloadForEachSearchIndividually_Overlay_OuterContainer_Component_Props) {
        super(props);

        this._searches_Div_Ref = React.createRef();

        this.state = {
            force_Rerender: {}
        };
    }

    /**
     *
     */
    componentWillUnmount() {

        this._unmountCalled = true;
    }

    componentDidMount() {

        const searches_Div_BoundingClientRect  = this._searches_Div_Ref.current.getBoundingClientRect()

        this._overlay_Height_Max = searches_Div_BoundingClientRect.height + 300

        if ( this._overlay_Height_Max < _Overlay_Height_Min ) {
            this._overlay_Height_Max = _Overlay_Height_Min
        }

        this.setState({ force_Rerender: {} })
    }

    /**
     *
     * @param projectSearchId__ForClickedSearch
     */
    private _downloadForSearch( projectSearchId__ForClickedSearch: number ) { try {

        const projectSearchIds__OnlyForClickedSearch: Array<number> = []

        projectSearchIds__OnlyForClickedSearch.push( projectSearchId__ForClickedSearch )

        modPage_Download_PSM_Localization_Report({
            projectSearchIds: projectSearchIds__OnlyForClickedSearch,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root: this.props.props_value.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: this.props.props_value.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: this.props.props_value.modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.props.props_value.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        })

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    render(): React.ReactNode { try {

        const searchNames_Elements: Array<React.JSX.Element> = []

        for ( const projectSearchId of this.props.props_value.projectSearchIds ) {

            const searchNameForProjectSearchId = modPage_GetSearchNameForProjectSearchId( {
                projectSearchId, dataPageStateManager_DataFrom_Server: this.props.props_value.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server
            } )

            const element = (
                <React.Fragment key={ projectSearchId }>
                    {/*<div>*/}

                    {/*</div>*/}
                    <div
                        style={ { marginBottom: 20 } }
                    >
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <span>
                                    Click to download data for search
                                </span>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <span
                                className=" fake-link "
                                onClick={ event => {

                                    this._downloadForSearch( projectSearchId )
                                }}
                            >
                                { searchNameForProjectSearchId }
                            </span>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    </div>
                </React.Fragment>
            )

            searchNames_Elements.push( element )
        }

        return (
            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ this._overlay_Height_Max }
                title={ _Overlay_Title }
                callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
                close_OnBackgroundClick={ false }>


                <div
                    className=" change-searches-overlay-outer-block top-level single-entry-variable-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                    style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                    // style={ { padding : 6 } }
                >
                    <div ref={ this._searches_Div_Ref }>
                        <div style={ { marginBottom: 20, fontWeight: "bold", fontSize: 18 } }>
                            Click on each search name to download the PSM Localization Report for that search
                        </div>
                        <div
                            // style={ { display: "grid", gridTemplateColumns: "30px auto" } }
                        >
                            { searchNames_Elements }
                        </div>
                    </div>
                </div>
                <div
                    className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                    // style={ { padding : 6 } }
                >
                    <div style={ { marginTop: 15 } }>
                        <input type="button" value="Close" onClick={ this.props.callbackOn_Cancel_Close_Clicked } />
                    </div>
                </div>
            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
}
