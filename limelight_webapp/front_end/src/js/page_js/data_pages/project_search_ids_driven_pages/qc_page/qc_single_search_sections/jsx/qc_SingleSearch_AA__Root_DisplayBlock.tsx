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
import {QcPage_Flags_SingleSearch} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/js/qcPage_Get_Searches_Flags";
import {QcPage_Searches_Info_SingleSearch} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/js/qcPage_Get_QC_Page__Searches_Info";
import {Qc_SingleSearch_PSM_PPM_Error_Statistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_PSM_PPM_Error_Statistics_Section";
import {Qc_SingleSearch_ScanFile_Statistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_ScanFile_Statistics_Section";
import {Qc_SingleSearch_Digestion_Statistics_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_Digestion_Statistics_Section";
import {Qc_SingleSearch_ScanFile_Chromatography_Section} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_ScanFile_Chromatography_Section";

/**
 *
 */
export class QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent {

    projectSearchId: number
    qcPage_DataFromServer_AndDerivedData_SingleSearch: QcPage_DataFromServer_AndDerivedData_SingleSearch

    qcPage_Flags_SingleSearch_ForProjectSearchId: QcPage_Flags_SingleSearch
    qcPage_Searches_Info_SingleSearch_ForProjectSearchId:  QcPage_Searches_Info_SingleSearch
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

        const loadedDataPerProjectSearchIdHolder = commonData.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
        if ( ! loadedDataPerProjectSearchIdHolder ) {
            const msg = "commonData.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId ) returned nothing. projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        const qcPage_Flags_SingleSearch_ForProjectSearchId =
            props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Flags.get_QcPage_Flags_SingleSearch_ForProjectSearchId( projectSearchId );
        if ( ! qcPage_Flags_SingleSearch_ForProjectSearchId ) {
            const msg = "props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Flags.get_QcPage_Flags_SingleSearch_ForProjectSearchId( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }
        const qcPage_Searches_Info_SingleSearch_ForProjectSearchId =
            props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Info.get_QcPage_Searches_Info_SingleSearch_ForProjectSearchId( projectSearchId );
        if ( ! qcPage_Searches_Info_SingleSearch_ForProjectSearchId ) {
            const msg = "props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Info.get_QcPage_Searches_Info_SingleSearch_ForProjectSearchId( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        const qcPage_DataFromServer_AndDerivedData_SingleSearch = new QcPage_DataFromServer_AndDerivedData_SingleSearch({
            retrievalParams: {
                projectSearchId,
                searchDataLookupParamsRoot: commonData.searchDataLookupParamsRoot,
                loadedDataPerProjectSearchIdHolder,
                loadedDataCommonHolder: commonData.loadedDataCommonHolder,
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
                <div >
                    <Qc_SingleSearch_SummaryStatistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                    />
                </div>
                <div>
                    <Qc_SingleSearch_Digestion_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this._qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                    />
                </div>
                <div >
                    <Qc_SingleSearch_ScanFile_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this._qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                    />
                </div>
                <div >
                    <Qc_SingleSearch_ScanFile_Chromatography_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this._qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                    />
                </div>
                <div >
                    <Qc_SingleSearch_PSM_Level_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this._qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                    />
                </div>
                <div >
                    <Qc_SingleSearch_PSM_PPM_Error_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this._qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                    />
                </div>
                <div >
                    <Qc_SingleSearch_Peptide_Level_Statistics_Section
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this._qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                    />
                </div>
            </React.Fragment>
        );
    }

}
