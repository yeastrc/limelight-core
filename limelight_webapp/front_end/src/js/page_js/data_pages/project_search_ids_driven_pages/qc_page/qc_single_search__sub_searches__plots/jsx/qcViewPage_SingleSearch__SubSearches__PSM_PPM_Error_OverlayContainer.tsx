/**
 * qcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_OverlayContainer.tsx
 *
 * QC Page SingleSearch__SubSearches : PSM Count vs Peptide Length Statistics - Overlay Container
 *
 */

import React from "react";

import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {qcPage_ChartOverlayDimensions} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import { Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result__Single_PSM } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__psm__ppm_error/qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch";
import {QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_AA__Root_DisplayBlock";
import {QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_StatisticsPlot} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_StatisticsPlot";

const _Overlay_Title = "QC Plot: PPM Error"


const qcPage_ChartOverlayDimensions_Value = qcPage_ChartOverlayDimensions();

const _Overlay_Width_Min = qcPage_ChartOverlayDimensions_Value.min_Width;
const _Overlay_Width_Max = qcPage_ChartOverlayDimensions_Value.max_Width;

const _Overlay_Height_Min = qcPage_ChartOverlayDimensions_Value.min_Height;
const _Overlay_Height_Max = qcPage_ChartOverlayDimensions_Value.max_Height;

/**
 *
 */
export const qc_SingleSearch__SubSearches__Open_PSM_PPM_Error_OverlayContainer = function (
    {
        params
    } : {
        params: QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_OverlayContainer__Component_Params

    }) : void {

    let limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder :  Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

    const callbackOn_Cancel_Close_Clicked = () : void => {
        limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    };

    const overlayComponent = (
        <QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_OverlayContainer
            params={ params }
            callbackOn_Cancel_Close_Clicked={ callbackOn_Cancel_Close_Clicked }
        />
    )

    limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder =
        limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent });
}

/**
 *
 */
export interface QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_OverlayContainer__Component_Params {

    psm_PPM_Error_List_Filtered_Map_Key_ProjectSearchId: Map<number, Array<Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result__Single_PSM>>
    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent: QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent
}

/**
 *
 */
interface QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_OverlayContainer_Props {

    params: QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_OverlayContainer__Component_Params
    callbackOn_Cancel_Close_Clicked: () => void
}

/**
 *
 */
interface QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_OverlayContainer_State {

    forceRerender?: object
}

/**
 *
 */
class QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_OverlayContainer extends React.Component< QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_OverlayContainer_Props, QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_OverlayContainer_State > {

    //  bind to 'this' for passing as parameters

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_OverlayContainer_Props) {
        super(props);

        if (props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        this.state = {

        };
    }

    // componentDidMount() {
    //     try {
    //
    //     } catch( e ) {
    //         reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
    //         throw e;
    //     }
    // }

    /**
     *
     */
    render() {

        return (

            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ _Overlay_Height_Max }
                title={ _Overlay_Title }
                set_CSS_Position_Fixed={ false }
                callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
                close_OnBackgroundClick={ false } >

                <React.Fragment>

                    <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                         style={ { height: "100%" } }
                    >

                        <div style={ { height: "100%", display: "grid", gridTemplateRows: "min-content auto" } } >

                            {/*  For any content above the chart  */}
                            <div ></div>

                            <div style={ { height: "100%" } }>
                                <QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_StatisticsPlot
                                    psm_PPM_Error_List_Filtered_Map_Key_SearchSubGroupId={ this.props.params.psm_PPM_Error_List_Filtered_Map_Key_ProjectSearchId }
                                    qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                    qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent={ this.props.params.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent }
                                    isInSingleChartOverlay={ true }
                                />
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    }
}
