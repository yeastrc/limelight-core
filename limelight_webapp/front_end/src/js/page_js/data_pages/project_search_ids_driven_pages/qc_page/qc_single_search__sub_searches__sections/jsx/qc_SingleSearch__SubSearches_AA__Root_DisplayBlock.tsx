/**
 * qc_SingleSearch__SubSearches_AA__Root_DisplayBlock.tsx
 *
 * QC Page SingleSearch__SubSearches - ROOT Display Block containing Sections
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {DataPage_common_Flags_SingleSearch} from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_Searches_Flags";
import {DataPage_common_Searches_Info_SingleSearch,} from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_dataPage_common__Searches_Info";
import {Qc_SingleSearch__SubSearches_SummaryStatistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_SummaryStatistics_Section";
import {Qc_SingleSearch__SubSearches_Digestion_Statistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_Digestion_Statistics_Section";
import {Qc_SingleSearch__SubSearches_ScanFile_Statistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_ScanFile_Statistics_Section";
import {Qc_SingleSearch__SubSearches_PSM_Level_Statistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_PSM_Level_Statistics_Section";
import {Qc_SingleSearch__SubSearches_Peptide_Level_Statistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_Peptide_Level_Statistics_Section";
import {Qc_SingleSearch__SubSearches_PSM_PPM_Error_Statistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_PSM_PPM_Error_Statistics_Section";
import {Qc_SingleSearch__SubSearches_ErrorEstimation_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_ErrorEstimation_Section";
import {QcPage_DataFromServer_AndDerivedData_SingleSearch} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_AndDerivedData_SingleSearch";
import {Qc_SingleSearch__SubSearches_Target_Decoy_Analysis_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_Target_Decoy_Analysis_Section";
import {Qc_SingleSearch__SubSearches_Protein_Level_Statistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_Protein_Level_Statistics_Section";
import {Qc_SingleSearch__SubSearches_FeatureDetection_Statistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_FeatureDetection_Statistics_Section";

/**
 *  Passed to Child Components
 */
export class QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent {

    projectSearchId: number

    qcPage_DataFromServer_AndDerivedData_SingleSearch: QcPage_DataFromServer_AndDerivedData_SingleSearch

    qcPage_Flags_SingleSearch_ForProjectSearchId: DataPage_common_Flags_SingleSearch
    qcPage_Searches_Info_SingleSearch_ForProjectSearchId:  DataPage_common_Searches_Info_SingleSearch
}

/**
 *
 */
export interface Qc_SingleSearch__SubSearches_AA__Root_DisplayBlock_Props {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
}

/**
 *
 */
interface Qc_SingleSearch__SubSearches_AA__Root_DisplayBlock_State {

    _placeHolder?: any
}

/**
 *
 */
export class Qc_SingleSearch__SubSearches_AA__Root_DisplayBlock extends React.Component< Qc_SingleSearch__SubSearches_AA__Root_DisplayBlock_Props, Qc_SingleSearch__SubSearches_AA__Root_DisplayBlock_State > {

    //  bind to 'this' for passing as parameters

    private _qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent: QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent

    /**
     *
     */
    constructor(props: Qc_SingleSearch__SubSearches_AA__Root_DisplayBlock_Props) {
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

        this._qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent = {
            projectSearchId,
            qcPage_DataFromServer_AndDerivedData_SingleSearch,
            qcPage_Flags_SingleSearch_ForProjectSearchId,
            qcPage_Searches_Info_SingleSearch_ForProjectSearchId
        }

        this.state =  {};
    }

    render() {
        return (

            <React.Fragment>
                <div style={ { clear: "both" } }>
                    <Qc_SingleSearch__SubSearches_SummaryStatistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent={ this._qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent }
                    />
                </div>
                <div style={ { clear: "both" } }>
                    <Qc_SingleSearch__SubSearches_FeatureDetection_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent={ this._qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent }
                    />
                </div>
                <div style={ { clear: "both" } }>
                    <Qc_SingleSearch__SubSearches_ErrorEstimation_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent={ this._qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent }
                    />
                </div>
                <div style={ { clear: "both" } }>
                    <Qc_SingleSearch__SubSearches_Target_Decoy_Analysis_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent={ this._qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent }
                    />
                </div>
                <div style={ { clear: "both" } }>
                    <Qc_SingleSearch__SubSearches_Digestion_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent={ this._qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent }
                    />
                </div>
                <div style={ { clear: "both" } }>
                    <Qc_SingleSearch__SubSearches_ScanFile_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent={ this._qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent }
                    />
                </div>
                <div style={ { clear: "both" } }>
                    <Qc_SingleSearch__SubSearches_PSM_Level_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent={ this._qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent }
                    />
                </div>
                <div style={ { clear: "both" } }>
                    <Qc_SingleSearch__SubSearches_PSM_PPM_Error_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent={ this._qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent }
                    />
                </div>
                <div style={ { clear: "both" } }>
                    <Qc_SingleSearch__SubSearches_Peptide_Level_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent={ this._qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent }
                    />
                </div>
                <div style={ { clear: "both" } }>
                    <Qc_SingleSearch__SubSearches_Protein_Level_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent={ this._qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent }
                    />
                </div>

            </React.Fragment>
        );
    }

}

