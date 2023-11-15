/**
 * qc_SingleSearch_AA__Root_DisplayBlock.tsx
 *
 * QC Page Single Search - ROOT Display Block containing Sections
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {Qc_SingleSearch_SummaryStatistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_SummaryStatistics_Section";
import {Qc_SingleSearch_Peptide_Level_Statistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_Peptide_Level_Statistics_Section";
import {Qc_SingleSearch_PSM_Level_Statistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_PSM_Level_Statistics_Section";
import {QcPage_DataFromServer_AndDerivedData_SingleSearch} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_AndDerivedData_SingleSearch";
import {DataPage_common_Flags_SingleSearch} from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_Searches_Flags";
import {DataPage_common_Searches_Info_SingleSearch} from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_dataPage_common__Searches_Info";
import {Qc_SingleSearch_PSM_PPM_Error_Statistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_PSM_PPM_Error_Statistics_Section";
import {Qc_SingleSearch_ScanFile_Statistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_ScanFile_Statistics_Section";
import {Qc_SingleSearch_Digestion_Statistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_Digestion_Statistics_Section";
import {Qc_SingleSearch_ScanFile_Chromatography_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_ScanFile_Chromatography_Section";
import {Qc_SingleSearch_ErrorEstimation_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_ErrorEstimation_Section";
import {Qc_SingleSearch_Target_Decoy_Analysis_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_Target_Decoy_Analysis_Section";
import {Qc_SingleSearch_FeatureDetection_Statistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_FeatureDetection_Statistics_Section";
import {Qc_SingleSearch_Protein_Level_Statistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_Protein_Level_Statistics_Section";
import { Qc_SingleSearch_GoldStandard_Statistics_Section } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_GoldStandard_Statistics_Section";

/**
 *
 */
export class QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent {

    projectSearchId: number
    qcPage_DataFromServer_AndDerivedData_SingleSearch: QcPage_DataFromServer_AndDerivedData_SingleSearch

    qcPage_Flags_SingleSearch_ForProjectSearchId: DataPage_common_Flags_SingleSearch
    qcPage_Searches_Info_SingleSearch_ForProjectSearchId:  DataPage_common_Searches_Info_SingleSearch
}

/**
 *
 */
export interface Qc_SingleSearch_AA__Root_DisplayBlock_Props {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
}

/**
 *
 */
interface Qc_SingleSearch_AA__Root_DisplayBlock_State {

    _placeHolder: any
}

/**
 *
 */
export class Qc_SingleSearch_AA__Root_DisplayBlock extends React.Component< Qc_SingleSearch_AA__Root_DisplayBlock_Props, Qc_SingleSearch_AA__Root_DisplayBlock_State > {

    //  bind to 'this' for passing as parameters

    private _qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent

    /**
     *
     */
    constructor(props: Qc_SingleSearch_AA__Root_DisplayBlock_Props) {
        super(props);

        if (props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        const commonData = props.qcViewPage_CommonData_To_AllComponents_From_MainComponent;

        const projectSearchId = commonData.projectSearchIds[0];

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId );
        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            const msg = "commonData.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId ) returned nothing. projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        const qcPage_Flags_SingleSearch_ForProjectSearchId =
            props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Flags.get_DataPage_common_Flags_SingleSearch_ForProjectSearchId( projectSearchId );
        if ( ! qcPage_Flags_SingleSearch_ForProjectSearchId ) {
            const msg = "props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Flags.get_QcPage_Flags_SingleSearch_ForProjectSearchId( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }
        const qcPage_Searches_Info_SingleSearch_ForProjectSearchId =
            props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Info.get_DataPage_common_Searches_Info_SingleSearch_ForProjectSearchId( projectSearchId );
        if ( ! qcPage_Searches_Info_SingleSearch_ForProjectSearchId ) {
            const msg = "props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Info.get_QcPage_Searches_Info_SingleSearch_ForProjectSearchId( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        const qcPage_DataFromServer_AndDerivedData_SingleSearch = new QcPage_DataFromServer_AndDerivedData_SingleSearch({
            retrievalParams: {
                projectSearchId,
                searchDataLookupParamsRoot: commonData.searchDataLookupParamsRoot,
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
                dataPageStateManager: commonData.dataPageStateManager,
                qcPage_Flags_SingleSearch_ForProjectSearchId,
                qcPage_Searches_Info_SingleSearch_ForProjectSearchId
            }
        })

        this._qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent = {
            projectSearchId,
            qcPage_DataFromServer_AndDerivedData_SingleSearch,
            qcPage_Flags_SingleSearch_ForProjectSearchId,
            qcPage_Searches_Info_SingleSearch_ForProjectSearchId
        }

        // this.state =  {};
    }

    render() {
        return (

            <React.Fragment>
                <div style={ { clear: "both" } }>
                    <Qc_SingleSearch_SummaryStatistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                    />
                </div>


                {/* COMMENT OUT: GOLD STANDARD  'Qc_SingleSearch_GoldStandard_Statistics_Section'

                <div style={ { clear: "both" } }>
                    <Qc_SingleSearch_GoldStandard_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this._qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                    />
                </div>

                                        */}

                <div style={ { clear: "both" } }>
                    <Qc_SingleSearch_FeatureDetection_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this._qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                        externallySpecified_FeatureDetection_Entry={ undefined }
                    />
                </div>
                <div style={ { clear: "both" } }>
                    <Qc_SingleSearch_ErrorEstimation_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this._qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                    />
                </div>
                <div style={ { clear: "both" } }>
                    <Qc_SingleSearch_Target_Decoy_Analysis_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this._qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                    />
                </div>
                <div style={ { clear: "both" } }>
                    <Qc_SingleSearch_Digestion_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this._qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                    />
                </div>
                <div style={ { clear: "both" } }>
                    <Qc_SingleSearch_ScanFile_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this._qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                    />
                </div>
                <div style={ { clear: "both" } }>
                    <Qc_SingleSearch_ScanFile_Chromatography_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this._qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                    />
                </div>
                <div style={ { clear: "both" } }>
                    <Qc_SingleSearch_PSM_Level_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this._qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                    />
                </div>
                <div style={ { clear: "both" } }>
                    <Qc_SingleSearch_PSM_PPM_Error_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this._qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                    />
                </div>
                <div style={ { clear: "both" } }>
                    <Qc_SingleSearch_Peptide_Level_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this._qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                    />
                </div>
                <div style={ { clear: "both" } }>
                    <Qc_SingleSearch_Protein_Level_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this._qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                    />
                </div>

            </React.Fragment>
        );
    }

}

