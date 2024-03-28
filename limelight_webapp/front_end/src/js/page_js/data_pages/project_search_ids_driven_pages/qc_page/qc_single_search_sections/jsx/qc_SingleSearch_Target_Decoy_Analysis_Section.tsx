/**
 * qc_SingleSearch_Target_Decoy_Analysis_Section.tsx
 *
 * QC Page Single Search - Section - Error Estimation
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {QcViewPage_SingleSearch__PSM_Target_VS_Decoy_Histogram_ByAnnScore_StatisticsPlot_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PSM_Target_VS_Decoy_Histogram_ByAnnScore_MainPageContainer";
import {QcViewPage_SingleSearch__PSM_Target_Yaxis_VS_Decoy_Xaxis_ByAnnScore_StatisticsPlot_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PSM_Target_Yaxis_VS_Decoy_Xaxis_ByAnnScore_MainPageContainer";
import {QcViewPage_SingleSearch__PSM_Target_VS_Decoy_Single_SplitViolin_ByAnnScore_StatisticsPlot_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PSM_Target_VS_Decoy_Single_SplitViolin_ByAnnScore_MainPageContainer";

/**
 *
 */
export interface Qc_SingleSearch_Target_Decoy_Analysis_Section_Props {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
}

/**
 *
 */
interface Qc_SingleSearch_Target_Decoy_Analysis_Section_State {

    sectionExpanded?: boolean

    annotationTypeId_Score_X?: number
}

/**
 *
 */
export class Qc_SingleSearch_Target_Decoy_Analysis_Section extends React.Component< Qc_SingleSearch_Target_Decoy_Analysis_Section_Props, Qc_SingleSearch_Target_Decoy_Analysis_Section_State > {

    //  bind to 'this' for passing as parameters

    private _sectionHeaderRowClicked_BindThis = this._sectionHeaderRowClicked.bind(this);

    private _sectionExpanded = false;
    private _sectionEverExpanded = false;

    private _renderComponent = false

    /**
     *
     */
    constructor(props: Qc_SingleSearch_Target_Decoy_Analysis_Section_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        let annotationTypeId_Score_X: number = null;

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_DataPage_common_Searches_Flags().is__anyPsmHas_IsDecoy_True__TrueForAnySearch() ) {

            this._renderComponent = true;

            const searchDataLookupParamsForProjectSearchId =
                props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.searchDataLookupParamsRoot.
                    paramsForProjectSearchIds.paramsForProjectSearchIdsList[0];

            const projectSearchId = searchDataLookupParamsForProjectSearchId.projectSearchId;
            const psmFilters = searchDataLookupParamsForProjectSearchId.psmFilters;
            const psmAnnTypeDisplay = searchDataLookupParamsForProjectSearchId.psmAnnTypeDisplay;

            const annotationTypeItems_ForProjectSearchId =
                props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
            if ( ! annotationTypeItems_ForProjectSearchId ) {
                const msg = "dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            const psmFilterableAnnotationType_annotationTypeIds_Set = new Set<number>()
            for (const psmFilterableAnnotationType_MapValue of annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.values()) {
                psmFilterableAnnotationType_annotationTypeIds_Set.add( psmFilterableAnnotationType_MapValue.annotationTypeId );
            }

            //  Get initial values (or only values) for annotationTypeId_Score_X, annotationTypeId_Score_Y

            let psmFilters_Index = psmFilters.length + 1;
            if (psmFilters.length > 0) {
                psmFilters_Index = 0;
            }

            let psmAnnTypeDisplay_Index = psmAnnTypeDisplay.length + 1;
            if (psmAnnTypeDisplay.length > 0) {
                psmAnnTypeDisplay_Index = 0;
            }

            //  annotationTypeId_Score

            // if ( psmFilters_Index < psmFilters.length ) {
            //     annotationTypeId_Score_X = psmFilters[psmFilters_Index].annTypeId;
            //     psmFilters_Index++;
            //     psmFilterableAnnotationType_annotationTypeIds_Set.delete(annotationTypeId_Score_X);
            // } else {
            if ( psmAnnTypeDisplay_Index < psmAnnTypeDisplay.length ) {
                annotationTypeId_Score_X = psmAnnTypeDisplay[psmAnnTypeDisplay_Index];
                psmAnnTypeDisplay_Index++;
                psmFilterableAnnotationType_annotationTypeIds_Set.delete(annotationTypeId_Score_X);
            } else {
                //  Get random entry from psmFilterableAnnotationType_annotationTypeIds_Set
                for ( const annotationTypeId of psmFilterableAnnotationType_annotationTypeIds_Set ) {
                    annotationTypeId_Score_X = annotationTypeId;
                    psmFilterableAnnotationType_annotationTypeIds_Set.delete(annotationTypeId);
                    break;
                }

            }
        }


        this.state = {
            sectionExpanded: this._sectionExpanded, annotationTypeId_Score_X
        };
    }

    /**
     *
     */
    shouldComponentUpdate(nextProps: Readonly<Qc_SingleSearch_Target_Decoy_Analysis_Section_Props>, nextState: Readonly<Qc_SingleSearch_Target_Decoy_Analysis_Section_State>, nextContext: any): boolean {

        if ( ! this._renderComponent ) {
            return false;
        }

        if ( nextState.sectionExpanded !== this.state.sectionExpanded ) {
            return true;
        }
        if ( ! nextState.sectionExpanded ) {
            return false;
        }

        return true;
    }

    /**
     *
     */
    private _sectionHeaderRowClicked( event: React.MouseEvent<HTMLDivElement, MouseEvent> ) {
        try {
            event.stopPropagation();

            try { // In try/catch block in case not supported in browser
                const selectionObj = window.getSelection();
                const selection = selectionObj.toString()
                if (selection) {
                    //  Found a Selection so exit with no further action
                    return; //  EARLY RETURN
                }

            } catch (e) {
                //  Eat exception
                const znothing = 0;
            }

            this._sectionExpanded_Toggle();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    private _sectionExpanded_Toggle() {

        this._sectionEverExpanded = true;

        this._sectionExpanded = ! this._sectionExpanded;

        this.setState({ sectionExpanded: this._sectionExpanded });
    }

    /**
     *
     */
    render() {

        if ( ! this._renderComponent ) {
            return null; // EARLY RETURN
        }

        return (

            <div >
                <div style={ { display: "inline-block" } }
                     onClick={ this._sectionHeaderRowClicked_BindThis }
                >
                    <div style={ { display: "grid", gridTemplateColumns: "min-content min-content" } }>
                        {/*  2 column grid  */}
                        <div>
                            { ( this.state.sectionExpanded ) ? (
                                <img src="static/images/pointer-down.png" className=" icon-large fake-link-image " />
                            ) : (
                                <img src="static/images/pointer-right.png" className=" icon-large fake-link-image " />
                            )}
                        </div>
                        <div className=" top-level-label clickable " >
                            Target Decoy Analysis
                        </div>
                    </div>  {/* END: 2 column grid  */}
                </div>

                <div className="top-level-label-bottom-border"></div>

                { ( this._sectionEverExpanded ) ? (

                    <div className=" section-content-block " style={ { display: ( ! this.state.sectionExpanded ) ? ( "none" ) : null } }>

                        <div className=" section--chart-container-block ">

                            <div className=" chart-container-multiple-on-same-row-block ">

                                <div className=" chart-container-multiple-on-same-row ">
                                    <QcViewPage_SingleSearch__PSM_Target_VS_Decoy_Histogram_ByAnnScore_StatisticsPlot_MainPageContainer
                                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                        qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                                        annotationTypeId_Score_X={ this.state.annotationTypeId_Score_X }
                                    />
                                </div>

                                <div className=" chart-container-multiple-on-same-row ">
                                    <QcViewPage_SingleSearch__PSM_Target_VS_Decoy_Single_SplitViolin_ByAnnScore_StatisticsPlot_MainPageContainer
                                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                        qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                                        annotationTypeId_Score_X={ this.state.annotationTypeId_Score_X }
                                    />
                                </div>

                                <div className=" chart-container-multiple-on-same-row ">
                                    <QcViewPage_SingleSearch__PSM_Target_Yaxis_VS_Decoy_Xaxis_ByAnnScore_StatisticsPlot_MainPageContainer
                                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                        qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                                        annotationTypeId_Score_X={ this.state.annotationTypeId_Score_X }
                                    />
                                </div>

                                <div className=" chart-container-multiple-on-same-row-stop-float "></div>   {/*  After Last Chart, to clear 'float:left'  */}

                            </div>

                        </div>

                    </div>
                ) : null }

            </div>
        );
    }

}

