/**
 * qc_SingleSearch__SubSearches_ErrorEstimation_Section.tsx
 *
 * QC Page Single Search - Section - Error Estimation
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_AA__Root_DisplayBlock";
import {QcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_VS_AnnotationScore_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_VS_AnnotationScore_MainPageContainer";
import {QcViewPage_SingleSearch__SubSearches__PSM_EstimatedError__AnnotationScore_VS_AnnotationScore_StatisticsPlot_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__PSM_EstimatedError__AnnotationScore_VS_AnnotationScore_MainPageContainer";
import {QcViewPage_SingleSearch__SubSearches__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_MainPageContainer";
import {QcViewPage_SingleSearch__SubSearches__DistinctPeptide_EstimatedError_VS_AnnotationScore_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__DistinctPeptide_EstimatedError_VS_AnnotationScore_MainPageContainer";
import {QcViewPage_SingleSearch__SubSearches__DistinctPeptide_EstimatedError__AnnotationScore_VS_AnnotationScore_StatisticsPlot_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__DistinctPeptide_EstimatedError__AnnotationScore_VS_AnnotationScore_MainPageContainer";
import {QcViewPage_SingleSearch__SubSearches__DistinctPeptide_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__DistinctPeptide_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_MainPageContainer";
import {QcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_StatisticsPlot_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_MainPageContainer";
import {QcViewPage_SingleSearch__SubSearches__Peptide_EstimatedError_StatisticsPlot_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__Peptide_EstimatedError_MainPageContainer";

/**
 *
 */
export interface Qc_SingleSearch__SubSearches_ErrorEstimation_Section_Props {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent: QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent
}

/**
 *
 */
interface Qc_SingleSearch__SubSearches_ErrorEstimation_Section_State {

    sectionExpanded?: boolean

    annotationTypeId_Score_X?: number
    annotationTypeId_Score_Y?: number
}

/**
 *
 */
export class Qc_SingleSearch__SubSearches_ErrorEstimation_Section extends React.Component< Qc_SingleSearch__SubSearches_ErrorEstimation_Section_Props, Qc_SingleSearch__SubSearches_ErrorEstimation_Section_State > {

    //  bind to 'this' for passing as parameters

    private _sectionHeaderRowClicked_BindThis = this._sectionHeaderRowClicked.bind(this);

    private _sectionExpanded = false;
    private _sectionEverExpanded = false;

    private _renderComponent = false

    /**
     *
     */
    constructor(props: Qc_SingleSearch__SubSearches_ErrorEstimation_Section_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        let annotationTypeId_Score_X: number = null;
        let annotationTypeId_Score_Y: number = null;

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_DataPage_common_Searches_Flags().is__anyPsmHas_IsIndependentDecoy_True__TrueForAnySearch() ) {
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

            //  annotationTypeId_Score_X

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
            // }

            //  annotationTypeId_Score_Y

            // if ( psmFilters_Index < psmFilters.length ) {
            //     annotationTypeId_Score_Y = psmFilters[psmFilters_Index].annTypeId;
            //     psmAnnTypeDisplay_Index++;
            //     psmFilterableAnnotationType_annotationTypeIds_Set.delete(annotationTypeId_Score_Y);
            // } else {
            if ( psmAnnTypeDisplay_Index < psmAnnTypeDisplay.length ) {
                annotationTypeId_Score_Y = psmAnnTypeDisplay[psmAnnTypeDisplay_Index];
                psmAnnTypeDisplay_Index++;
                psmFilterableAnnotationType_annotationTypeIds_Set.delete(annotationTypeId_Score_Y);
            } else {
                //  Get random entry from psmFilterableAnnotationType_annotationTypeIds_Set
                for ( const annotationTypeId of psmFilterableAnnotationType_annotationTypeIds_Set ) {
                    annotationTypeId_Score_Y = annotationTypeId;
                    psmFilterableAnnotationType_annotationTypeIds_Set.delete(annotationTypeId);
                    break;
                }
            }
            // }
        }


        this.state = {
            sectionExpanded: this._sectionExpanded, annotationTypeId_Score_X, annotationTypeId_Score_Y
        };
    }

    /**
     *
     */
    shouldComponentUpdate(nextProps: Readonly<Qc_SingleSearch__SubSearches_ErrorEstimation_Section_Props>, nextState: Readonly<Qc_SingleSearch__SubSearches_ErrorEstimation_Section_State>, nextContext: any): boolean {

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
                <div style={ { display: "grid", gridTemplateColumns: "min-content auto" } }
                    onClick={ this._sectionHeaderRowClicked_BindThis }
                >
                    {/*  2 column grid  */}
                    <div>
                        { ( this.state.sectionExpanded ) ? (
                            <img src="static/images/pointer-down.png" className=" icon-large fake-link-image " />
                        ) : (
                            <img src="static/images/pointer-right.png" className=" icon-large fake-link-image " />
                        )}
                    </div>
                    <div className=" top-level-label clickable " >
                        Error Estimation
                    </div>
                </div>  {/* END: 2 column grid  */}

                <div className="top-level-label-bottom-border"></div>

                { ( this._sectionEverExpanded ) ? (

                    <div className=" section-content-block " style={ { display: ( ! this.state.sectionExpanded ) ? ( "none" ) : null } }>

                        <div className=" section--chart-container-block ">

                            <h2>
                                PSM Level
                            </h2>

                            <div className=" chart-container-multiple-on-same-row-block ">

                                <div className=" chart-container-multiple-on-same-row ">
                                    <QcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_StatisticsPlot_MainPageContainer
                                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                        qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent }
                                    />
                                </div>

                                <div className=" chart-container-multiple-on-same-row ">
                                    <QcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_VS_AnnotationScore_MainPageContainer
                                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                        qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent }
                                        annotationTypeId_Score_X={ this.state.annotationTypeId_Score_X }
                                    />
                                </div>

                                <div className=" chart-container-multiple-on-same-row ">
                                    <QcViewPage_SingleSearch__SubSearches__PSM_EstimatedError__AnnotationScore_VS_AnnotationScore_StatisticsPlot_MainPageContainer
                                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                        qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent }
                                        annotationTypeId_Score_X={ this.state.annotationTypeId_Score_X }
                                        annotationTypeId_Score_Y={ this.state.annotationTypeId_Score_Y }
                                    />
                                </div>

                                <div className=" chart-container-multiple-on-same-row ">
                                    <QcViewPage_SingleSearch__SubSearches__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_MainPageContainer
                                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                        qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent }
                                        annotationTypeId_Score_1={ this.state.annotationTypeId_Score_X }
                                        annotationTypeId_Score_2={ this.state.annotationTypeId_Score_Y }
                                    />
                                </div>

                                <div className=" chart-container-multiple-on-same-row-stop-float "></div>   {/*  After Last Chart, to clear 'float:left'  */}

                            </div>

                            <h2>
                                Peptide Level
                            </h2>

                            <div className=" chart-container-multiple-on-same-row-block ">

                                <div className=" chart-container-multiple-on-same-row ">
                                    <QcViewPage_SingleSearch__SubSearches__Peptide_EstimatedError_StatisticsPlot_MainPageContainer
                                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                        qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent }
                                    />
                                </div>

                                <div className=" chart-container-multiple-on-same-row ">
                                    <QcViewPage_SingleSearch__SubSearches__DistinctPeptide_EstimatedError_VS_AnnotationScore_MainPageContainer
                                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                        qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent }
                                        annotationTypeId_Score_X={ this.state.annotationTypeId_Score_X }
                                    />
                                </div>

                                <div className=" chart-container-multiple-on-same-row ">
                                    <QcViewPage_SingleSearch__SubSearches__DistinctPeptide_EstimatedError__AnnotationScore_VS_AnnotationScore_StatisticsPlot_MainPageContainer
                                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                        qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent }
                                        annotationTypeId_Score_X={ this.state.annotationTypeId_Score_X }
                                        annotationTypeId_Score_Y={ this.state.annotationTypeId_Score_Y }
                                    />
                                </div>

                                <div className=" chart-container-multiple-on-same-row ">
                                    <QcViewPage_SingleSearch__SubSearches__DistinctPeptide_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_MainPageContainer
                                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                        qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent }
                                        annotationTypeId_Score_1={ this.state.annotationTypeId_Score_X }
                                        annotationTypeId_Score_2={ this.state.annotationTypeId_Score_Y }
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

