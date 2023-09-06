/**
 * qc_MultipleSearches_AA__Root_DisplayBlock.tsx
 *
 * QC Page Multiple Searches - ROOT Display Block containing Sections
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {Qc_MultipleSearches_SummaryStatistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_sections/jsx/qc_MultipleSearches_SummaryStatistics_Section";
import {DataPage_common_Searches_Flags} from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_Searches_Flags";
import {DataPage_common_Searches_Info,} from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_dataPage_common__Searches_Info";
import {QcPage_DataFromServer_AndDerivedData_MultipleSearches} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_AndDerivedData_MultipleSearches";
import {Qc_MultipleSearches_Peptide_Level_Statistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_sections/jsx/qc_MultipleSearches_Peptide_Level_Statistics_Section";
import {Qc_MultipleSearches_Digestion_Statistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_sections/jsx/qc_MultipleSearches_Digestion_Statistics_Section";
import {Qc_MultipleSearches_ScanFile_Statistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_sections/jsx/qc_MultipleSearches_ScanFile_Statistics_Section";
import {Qc_MultipleSearches_PSM_Level_Statistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_sections/jsx/qc_MultipleSearches_PSM_Level_Statistics_Section";
import {Qc_MultipleSearches_PSM_PPM_Error_Statistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_sections/jsx/qc_MultipleSearches_PSM_PPM_Error_Statistics_Section";
import {Qc_MultipleSearches_ErrorEstimation_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_sections/jsx/qc_MultipleSearches_ErrorEstimation_Section";
import {Qc_MultipleSearches_Protein_Level_Statistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_sections/jsx/qc_MultipleSearches_Protein_Level_Statistics_Section";
import {Qc_MultipleSearches_FeatureDetection_Statistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_sections/jsx/qc_MultipleSearches_FeatureDetection_Statistics_Section";
import { Qc_MultipleSearches_GoldStandard_Statistics_Section } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_sections/jsx/qc_MultipleSearches_GoldStandard_Statistics_Section";

/**
 *
 */
export class QcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent {

    projectSearchIds: Array<number>
    qcPage_DataFromServer_AndDerivedData_MultipleSearches: QcPage_DataFromServer_AndDerivedData_MultipleSearches

    qcPage_Flags_MultipleSearches: DataPage_common_Searches_Flags
    qcPage_Searches_Info_MultipleSearches:  DataPage_common_Searches_Info
}

/**
 *
 */
export interface Qc_MultipleSearches_AA__Root_DisplayBlock_Props {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
}

/**
 *
 */
interface Qc_MultipleSearches_AA__Root_DisplayBlock_State {

    _placeHolder?: any
}

/**
 *
 */
export class Qc_MultipleSearches_AA__Root_DisplayBlock extends React.Component< Qc_MultipleSearches_AA__Root_DisplayBlock_Props, Qc_MultipleSearches_AA__Root_DisplayBlock_State > {

    //  bind to 'this' for passing as parameters

    private _qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent: QcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent

    /**
     *
     */
    constructor(props: Qc_MultipleSearches_AA__Root_DisplayBlock_Props) {
        super(props);

        if (props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length === 1) {
            const msg = "ONLY valid for more than 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        const commonData = props.qcViewPage_CommonData_To_AllComponents_From_MainComponent;

        const projectSearchIds = commonData.projectSearchIds;
        const commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root = commonData.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root;
        const qcPage_Flags_MultipleSearches = commonData.qcPage_Searches_Flags;
        const qcPage_Searches_Info_MultipleSearches = commonData.qcPage_Searches_Info;

        const qcPage_DataFromServer_AndDerivedData_MultipleSearches = new QcPage_DataFromServer_AndDerivedData_MultipleSearches({
            retrievalParams: {
                projectSearchIds,
                searchDataLookupParamsRoot: commonData.searchDataLookupParamsRoot,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                dataPageStateManager: commonData.dataPageStateManager,
                qcPage_Flags_MultipleSearches,
                qcPage_Searches_Info_MultipleSearches
            }
        })

        this._qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent = {
            projectSearchIds,
            qcPage_DataFromServer_AndDerivedData_MultipleSearches,
            qcPage_Flags_MultipleSearches,
            qcPage_Searches_Info_MultipleSearches
        }

        this.state =  {};
    }

    render() {
        return (

            <React.Fragment>
                <div style={ { clear: "both" } }>
                    <Qc_MultipleSearches_SummaryStatistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                    />
                </div>

                {/* COMMENT OUT: GOLD STANDARD  'Qc_MultipleSearches_GoldStandard_Statistics_Section'

                <div style={ { clear: "both" } }>
                    <Qc_MultipleSearches_GoldStandard_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent={ this._qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent }
                    />
                </div>

                */}

                <div style={ { clear: "both" } }>
                    <Qc_MultipleSearches_FeatureDetection_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent={ this._qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent }
                    />
                </div>
                <div style={ { clear: "both" } }>
                    <Qc_MultipleSearches_ErrorEstimation_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent={ this._qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent }
                    />
                </div>
                <div style={ { clear: "both" } }>
                    <Qc_MultipleSearches_Digestion_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent={ this._qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent }
                    />
                </div>
                <div style={ { clear: "both" } }>
                    <Qc_MultipleSearches_ScanFile_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent={ this._qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent }
                    />
                </div>
                <div style={ { clear: "both" } }>
                    <Qc_MultipleSearches_PSM_Level_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent={ this._qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent }
                    />
                </div>
                <div style={ { clear: "both" } }>
                    <Qc_MultipleSearches_PSM_PPM_Error_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent={ this._qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent }
                    />
                </div>
                <div style={ { clear: "both" } }>
                    <Qc_MultipleSearches_Peptide_Level_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent={ this._qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent }
                    />
                </div>
                <div style={ { clear: "both" } }>
                    <Qc_MultipleSearches_Protein_Level_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent={ this._qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent }
                    />
                </div>

            </React.Fragment>
        );
    }

}

