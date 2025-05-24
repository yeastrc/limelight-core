/**
 * modPage_ZScoreTab_Chosen_ClearOld_VisualizationSelection_Overlay.tsx
 *
 * Change Searches Selections Overlay - For selecting which searches to display
 *
 *
 */

import React from 'react'

import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";
import {
    ModPage_DataViz_Selections__Text_ClearLink__MainContent_Component
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/ModPage_DataViz_Selections__Text_ClearLink__MainContent_Component";
import {
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";
import {
    ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/ModView_DataViz_Compute_ColorScale_WidthHeight_Etc";

/////

const _Overlay_Title = "View ZScore Tab Clear Old Selections"


const _Overlay_Width_Min = 600;
const _Overlay_Width_Max = 1200;
const _Overlay_Height_Min = 400;
const _Overlay_Height_Max = 1000;

//////

/**
 *
 */
export class ModPage_ZScoreTab_Chosen_ClearOld_VisualizationSelection_Overlay_Params {
    modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
    modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
    modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
    projectSearchIds : Array<number>

    dataPageStateManager_DataFrom_Server: DataPageStateManager
    yesClicked_Callback : () => void
}

/**
 *
 * @param tableRows
 */
export const open_ModPage_ZScoreTab_Chosen_ClearOld_VisualizationSelection_Overlay = function( params: ModPage_ZScoreTab_Chosen_ClearOld_VisualizationSelection_Overlay_Params ) : void {

    let limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder: Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF

    const callbackOn_Cancel_Close_Clicked = () => {

        limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    }

    const overlayComponent = (
        <ModPage_ZScoreTab_Chosen_ClearOld_VisualizationSelection_Overlay_OuterContainer_Component
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
interface ModPage_ZScoreTab_Chosen_ClearOld_VisualizationSelection_Overlay_OuterContainer_Component_Props {
    props_value: ModPage_ZScoreTab_Chosen_ClearOld_VisualizationSelection_Overlay_Params
    callbackOn_Cancel_Close_Clicked : () => void;
}

/**
 *
 */
interface ModPage_ZScoreTab_Chosen_ClearOld_VisualizationSelection_Overlay_OuterContainer_Component_State {

    force_Rerender?: object
}

/**
 *
 */
class ModPage_ZScoreTab_Chosen_ClearOld_VisualizationSelection_Overlay_OuterContainer_Component extends React.Component< ModPage_ZScoreTab_Chosen_ClearOld_VisualizationSelection_Overlay_OuterContainer_Component_Props, ModPage_ZScoreTab_Chosen_ClearOld_VisualizationSelection_Overlay_OuterContainer_Component_State > {

    private _yesButtonClicked_BindThis = this._yesButtonClicked.bind(this);

    private _unmountCalled = false;

    /**
     *
     */
    constructor(props: ModPage_ZScoreTab_Chosen_ClearOld_VisualizationSelection_Overlay_OuterContainer_Component_Props) {
        super(props);

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

    /**
     *
     */
    private _yesButtonClicked(  ) { try {

        this.props.props_value.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().clear_All()

        this.props.props_value.yesClicked_Callback()

        this.props.callbackOn_Cancel_Close_Clicked()

    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

    /**
     *
     */
    render(): React.ReactNode {

        return (
            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ _Overlay_Height_Max }
                title={ _Overlay_Title }
                callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
                close_OnBackgroundClick={ false }>


                <div
                    className=" change-searches-overlay-outer-block top-level single-entry-variable-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                    style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                    // style={ { padding : 6 } }
                >
                    <div style={ { marginBottom: 20 } }>
                        The following filters are deprecated and must be removed before the ZScore data can be shown:
                    </div>

                    <ModPage_DataViz_Selections__Text_ClearLink__MainContent_Component
                        propsValue={ {
                            renderOnlyContent_WithoutBorder: true,
                            renderClearLink: false,

                            projectSearchIds: this.props.props_value.projectSearchIds,
                            modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: this.props.props_value.modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
                            modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: this.props.props_value.modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result,
                            dataPageStateManager_DataFrom_Server: this.props.props_value.dataPageStateManager_DataFrom_Server,
                            modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.props_value.modViewPage_DataVizOptions_VizSelections_PageStateManager,
                            clear_Clicked_Callback: undefined
                        } }
                    />

                </div>
                <div
                    className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                    // style={ { padding : 6 } }
                >
                    <div style={ { marginTop: 15 } }>

                        <div style={ { position: "relative", display: "inline-block" } }>
                            <input
                                type="button" value="Clear Filters" style={ { marginRight: 5 } }
                                onClick={ this._yesButtonClicked_BindThis }
                            />
                        </div>
                        <span> </span>

                        <input type="button" value="Cancel" onClick={ this.props.callbackOn_Cancel_Close_Clicked } />
                    </div>
                </div>
            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    }
}
