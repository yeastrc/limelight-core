/**
 * psm_list_psmPeptidePositionAnnotation_cell_ExternalComponent.tsx
 */

import React from 'react'
import {
    Common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records_ResultEntry
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_Etc__sub_parts__returned_objects/common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import { AnnotationTypeItem } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";
import {
    limelight__AnnotationDisplay_CommonFormatting_FilterableAnnotation_NumberFormatting_ForDisplayOnPage
} from "page_js/common_all_pages/annotation_data_display_common_formatting/limelight__AnnotationDisplay_CommonFormatting_FilterableAnnotation_NumberFormatting_ForDisplayOnPage";
import {
    limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants
} from "page_js/common_all_pages/limelight__Limelight_Colors_Etc__SyncWith_global.scss__Constants";
import {
    PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item
} from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/psm_list/js/psmList_ForProjectSearchIdReportedPeptideId_GetDataFromServer";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import {
    CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters";
import {
    CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_common_across_searches_sub_parts__returned_objects/commonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters";



const borderWidth_Rect_TotalWidthHeight = 1  //  the border of the enclosing 'rect' makes the enclosing rect smaller than the width and height on it

const heightTotal = 20
const maxHeight_Bars = heightTotal - ( borderWidth_Rect_TotalWidthHeight * 2 )
const width_SinglePositionBar = 3
const width_SinglePositionBar_BetweenBars = 1

const minHeight_Bars = 1

/**
 *
 * @param inputParams
 */
export const get_Psm_list_psmPeptidePositionAnnotation_cell_ExternalComponent__ComputeWidthTotal = function (
    {
        psmPeptidePositionAnnotation_Records_Array
    } : {
        psmPeptidePositionAnnotation_Records_Array: Array<Common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records_ResultEntry>
    }
) {

    return _computeWidthTotal({ psmPeptidePositionAnnotation_Records_Array })
}

/**
 *
 * @param inputParams
 */
export const get_Psm_list_psmPeptidePositionAnnotation_cell_ExternalComponent__Compute_BestScoreWorstScore_ForPSM = function (
    {
        psmPeptidePositionAnnotation_Records_Array, psmPeptidePositionFilterableAnnotationType
    } : {
        psmPeptidePositionAnnotation_Records_Array: Array<Common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records_ResultEntry>
        psmPeptidePositionFilterableAnnotationType:  AnnotationTypeItem
    }
) {

    let bestScore_ForPSM: number = undefined
    let worstScore_ForPSM: number = undefined

    for ( const psmPeptidePositionAnnotation_Record of psmPeptidePositionAnnotation_Records_Array ) {

        if ( bestScore_ForPSM === undefined ) {
            bestScore_ForPSM = psmPeptidePositionAnnotation_Record.valueDouble
            worstScore_ForPSM = psmPeptidePositionAnnotation_Record.valueDouble
        } else {
            if ( psmPeptidePositionFilterableAnnotationType.filterDirectionAbove ) {

                if ( bestScore_ForPSM < psmPeptidePositionAnnotation_Record.valueDouble ) {
                    bestScore_ForPSM = psmPeptidePositionAnnotation_Record.valueDouble
                }
                if ( worstScore_ForPSM > psmPeptidePositionAnnotation_Record.valueDouble ) {
                    worstScore_ForPSM = psmPeptidePositionAnnotation_Record.valueDouble
                }

            } else if ( psmPeptidePositionFilterableAnnotationType.filterDirectionBelow ) {

                if ( bestScore_ForPSM > psmPeptidePositionAnnotation_Record.valueDouble ) {
                    bestScore_ForPSM = psmPeptidePositionAnnotation_Record.valueDouble
                }
                if ( worstScore_ForPSM < psmPeptidePositionAnnotation_Record.valueDouble ) {
                    worstScore_ForPSM = psmPeptidePositionAnnotation_Record.valueDouble
                }

            } else {
                throw Error("NOT psmPeptidePositionFilterableAnnotationTypes_FirstValue.filterDirectionAbove OR psmPeptidePositionFilterableAnnotationTypes_FirstValue.filterDirectionBelow" )
            }

        }
    }

    return { bestScore_ForPSM, worstScore_ForPSM }
}


const _computeWidthTotal = function (
    {
        psmPeptidePositionAnnotation_Records_Array
    } : {
        psmPeptidePositionAnnotation_Records_Array: Array<Common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records_ResultEntry>
    }
) {

    const width_Total = ( psmPeptidePositionAnnotation_Records_Array.length * ( width_SinglePositionBar + width_SinglePositionBar_BetweenBars ) ) + ( borderWidth_Rect_TotalWidthHeight * 2 )

    return width_Total
}

export const get_Psm_list_psmPeptidePositionAnnotation_cell_ExternalComponent = function (
    inputParams: Internal__Psm_list_psmPeptidePositionAnnotation_cell_ExternalComponent_InputParams
): JSX.Element {

    return (
        <Internal__Psm_list_psmPeptidePositionAnnotation_cell_ExternalComponent
            inputParams={ inputParams }
        />
    )
}

/**
 *
 */
export interface Internal__Psm_list_psmPeptidePositionAnnotation_cell_ExternalComponent_InputParams {

    psmPeptidePositionAnnotation_Records_Array: Array<Common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records_ResultEntry>
    psmPeptidePositionFilterableAnnotationType:  AnnotationTypeItem
    psmListItem: PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item
    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
}

/**
 *
 */
interface Internal__Psm_list_psmPeptidePositionAnnotation_cell_ExternalComponent_Props {

    inputParams: Internal__Psm_list_psmPeptidePositionAnnotation_cell_ExternalComponent_InputParams
}

interface Internal__Psm_list_psmPeptidePositionAnnotation_cell_ExternalComponent_State {

    _placeholder: unknown
}

/**
 *
 */
class Internal__Psm_list_psmPeptidePositionAnnotation_cell_ExternalComponent extends React.Component< Internal__Psm_list_psmPeptidePositionAnnotation_cell_ExternalComponent_Props, Internal__Psm_list_psmPeptidePositionAnnotation_cell_ExternalComponent_State > {

    /**
     *
     */
    constructor( props: Internal__Psm_list_psmPeptidePositionAnnotation_cell_ExternalComponent_Props ) {
        super( props );

        this.state = { _placeholder: null };
    }

    /**
     *
     */
    render() { try {

        const psmPeptidePositionFilterableAnnotationType = this.props.inputParams.psmPeptidePositionFilterableAnnotationType

        const psmPeptidePositionAnnotation_Records_Array = this.props.inputParams.psmPeptidePositionAnnotation_Records_Array

        psmPeptidePositionAnnotation_Records_Array.sort( (a,b) => {
            if ( a.peptidePosition < b.peptidePosition ) {
                return -1
            }
            if ( a.peptidePosition > b.peptidePosition ) {
                return 1
            }
            {
                const msg = "psmPeptidePositionAnnotation_Records_Array: 2 entries have SAME peptidePosition which is invalid"
                console.warn(msg)
                throw Error(msg)
            }
        })

        const { bestScore_ForPSM, worstScore_ForPSM } = get_Psm_list_psmPeptidePositionAnnotation_cell_ExternalComponent__Compute_BestScoreWorstScore_ForPSM( this.props.inputParams )


        let bestScore_ForScalingBar_YAxis = bestScore_ForPSM
        let worstScore_ForScalingBar_YAxis = worstScore_ForPSM

        if ( psmPeptidePositionFilterableAnnotationType.best_ValueDouble !== undefined && psmPeptidePositionFilterableAnnotationType.best_ValueDouble !== null
            && psmPeptidePositionFilterableAnnotationType.worst_ValueDouble !== undefined && psmPeptidePositionFilterableAnnotationType.worst_ValueDouble !== null ) {

            bestScore_ForScalingBar_YAxis = psmPeptidePositionFilterableAnnotationType.best_ValueDouble
            worstScore_ForScalingBar_YAxis = psmPeptidePositionFilterableAnnotationType.worst_ValueDouble
        }



        const heightScale = ( maxHeight_Bars - minHeight_Bars ) / Math.abs( bestScore_ForScalingBar_YAxis - worstScore_ForScalingBar_YAxis )

        const width_Total = _computeWidthTotal( {
            psmPeptidePositionAnnotation_Records_Array
        })


        return (
            <svg
                //  TODO  Adjust width of DataTable column for length of peptide
                width={ width_Total + 1 }
                height={ heightTotal + 1 }
            >
                <rect
                    x={ 0 }
                    y={ 0 }
                    width={ width_Total }
                    height={ heightTotal }
                    fill="white"
                    fillOpacity="0"
                    stroke="#dddddd"
                    strokeWidth={ borderWidth_Rect_TotalWidthHeight }
                />
                { psmPeptidePositionAnnotation_Records_Array.map( ( psmPeptidePositionAnnotation_Record_Entry, index, array ) => {

                    let height_Rect: number = undefined

                    if ( psmPeptidePositionFilterableAnnotationType.filterDirectionAbove ) {

                        height_Rect = Math.ceil( ( psmPeptidePositionAnnotation_Record_Entry.valueDouble - worstScore_ForScalingBar_YAxis ) * heightScale ) + minHeight_Bars

                    } else if ( psmPeptidePositionFilterableAnnotationType.filterDirectionBelow ) {

                        height_Rect = maxHeight_Bars - Math.ceil( ( psmPeptidePositionAnnotation_Record_Entry.valueDouble - bestScore_ForScalingBar_YAxis ) * heightScale ) + minHeight_Bars

                    } else {
                        throw Error( "NOT psmPeptidePositionFilterableAnnotationTypes_FirstValue.filterDirectionAbove OR psmPeptidePositionFilterableAnnotationTypes_FirstValue.filterDirectionBelow" )
                    }


                    return (
                        <React.Fragment
                            key={ psmPeptidePositionAnnotation_Record_Entry.peptidePosition }
                        >
                            {/*  Display with fill color */ }
                            <rect
                                x={ ( ( psmPeptidePositionAnnotation_Record_Entry.peptidePosition - 1 ) * ( width_SinglePositionBar + width_SinglePositionBar_BetweenBars ) ) + 1 }
                                y={ maxHeight_Bars - height_Rect + borderWidth_Rect_TotalWidthHeight }
                                width={ width_SinglePositionBar }
                                height={ height_Rect }
                                fill={ limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.site_color_very_dark }
                            />
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <Internal_SinglePeptidePosition_Tooltip_Psm_list_psmPeptidePositionAnnotation_cell_ExternalComponent
                                        psmPeptidePositionAnnotation_Record_Entry={ psmPeptidePositionAnnotation_Record_Entry }
                                        bestScore_ForPSM={ bestScore_ForPSM }
                                        worstScore_ForPSM={ worstScore_ForPSM }
                                        inputParams_TopLevelComponent={ this.props.inputParams }
                                    />
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                {/*  Cover with clear for larger hover target */ }
                                <rect
                                    x={ ( ( psmPeptidePositionAnnotation_Record_Entry.peptidePosition - 1 ) * ( width_SinglePositionBar + width_SinglePositionBar_BetweenBars ) ) + 1 }
                                    y={ borderWidth_Rect_TotalWidthHeight }
                                    width={ width_SinglePositionBar }
                                    height={ maxHeight_Bars }
                                    fill={ "white" }
                                    fillOpacity={ 0 }
                                    strokeWidth={ 0 }
                                />
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        </React.Fragment>
                    )
                } ) }

            </svg>
        );

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }

}


/**
 *
 */
interface Internal_SinglePeptidePosition_Tooltip_Psm_list_psmPeptidePositionAnnotation_cell_ExternalComponent_Props {

    psmPeptidePositionAnnotation_Record_Entry: Common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records_ResultEntry

    bestScore_ForPSM: number
    worstScore_ForPSM: number

    inputParams_TopLevelComponent: Internal__Psm_list_psmPeptidePositionAnnotation_cell_ExternalComponent_InputParams
}

interface Internal_SinglePeptidePosition_Tooltip_Psm_list_psmPeptidePositionAnnotation_cell_ExternalComponent_State {

    _placeholder: unknown
}

/**
 *
 */
class Internal_SinglePeptidePosition_Tooltip_Psm_list_psmPeptidePositionAnnotation_cell_ExternalComponent extends React.Component< Internal_SinglePeptidePosition_Tooltip_Psm_list_psmPeptidePositionAnnotation_cell_ExternalComponent_Props, Internal_SinglePeptidePosition_Tooltip_Psm_list_psmPeptidePositionAnnotation_cell_ExternalComponent_State > {

    private _aminoAcidValue: string = "Loading..."

    /**
     *
     */
    constructor( props: Internal_SinglePeptidePosition_Tooltip_Psm_list_psmPeptidePositionAnnotation_cell_ExternalComponent_Props ) {
        super( props );

        this.state = { _placeholder: null };
    }

    /**
     *
     */
    componentDidMount() {
        try {

            this._loadData_UpdateDisplay_Start()

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     */
    private _loadData_UpdateDisplay_Start() {

        let peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder = undefined
        let peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder = undefined


        const promises: Array<Promise<void>> = []

        {
            const get_PeptideIdsHolder_AllForSearch_Result =
                this.props.inputParams_TopLevelComponent.commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters().get_PeptideIdsHolder_AllForSearch()

            if ( get_PeptideIdsHolder_AllForSearch_Result.data ) {

                peptideIds_For_MainFilters_Holder = get_PeptideIdsHolder_AllForSearch_Result.data.peptideIds_For_MainFilters_Holder

            } else if ( get_PeptideIdsHolder_AllForSearch_Result.promise ) {

                const promise = new Promise<void>( ( resolve, reject ) => {
                    try {
                        get_PeptideIdsHolder_AllForSearch_Result.promise.catch( reason => reject( reason ) )
                        get_PeptideIdsHolder_AllForSearch_Result.promise.then( value => {
                            try {
                                peptideIds_For_MainFilters_Holder = value.peptideIds_For_MainFilters_Holder
                                resolve()

                            } catch ( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                throw e;
                            }
                        } )

                    } catch ( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                        throw e
                    }
                } )
                promises.push( promise )
            } else {
                throw Error( "get_PeptideIdsHolder_AllForSearch_Result no 'data' or 'promise'" )
            }
        }
        {
            const get_PeptideSequencesHolder_AllForAllSearches_Result =
                this.props.inputParams_TopLevelComponent.commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_ParentObject().get__commonData_LoadedFromServer__CommonAcrossSearches().get_commonData_LoadedFromServer_SingleSearch__PeptideSequences_For_MainFilters().get_PeptideSequencesHolder_AllForAllSearches()

            if ( get_PeptideSequencesHolder_AllForAllSearches_Result.data ) {

                peptideSequences_For_MainFilters_Holder = get_PeptideSequencesHolder_AllForAllSearches_Result.data.peptideSequences_For_MainFilters_Holder

            } else if ( get_PeptideSequencesHolder_AllForAllSearches_Result.promise ) {
                const promise = new Promise<void>( ( resolve, reject ) => {
                    try {
                        get_PeptideSequencesHolder_AllForAllSearches_Result.promise.catch( reason => reject( reason ) )
                        get_PeptideSequencesHolder_AllForAllSearches_Result.promise.then( value => {
                            try {

                                peptideSequences_For_MainFilters_Holder = value.peptideSequences_For_MainFilters_Holder
                                resolve()

                            } catch ( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                throw e;
                            }
                        } )
                    } catch ( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                        throw e
                    }
                } )
                promises.push( promise )

            } else {
                throw Error( "get_PeptideSequencesHolder_AllForAllSearches_Result no 'data' or 'promise'" )
            }
        }

        if ( promises.length === 0 ) {

            this._loadData_UpdateDisplay_SecondPart( {
                peptideIds_For_MainFilters_Holder,
                peptideSequences_For_MainFilters_Holder
            } )

            return
        }

        const promisesAll = Promise.all( promises )
        promisesAll.catch( reason => {
            this._aminoAcidValue = "Load Fail"
            this.setState( { _placeholder: {} } )
        } )
        promisesAll.then( value => {
            try {

                this._loadData_UpdateDisplay_SecondPart( {
                    peptideIds_For_MainFilters_Holder,
                    peptideSequences_For_MainFilters_Holder
                } )

            } catch ( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                throw e
            }
        } )

    }

    private _loadData_UpdateDisplay_SecondPart(
        {
            peptideIds_For_MainFilters_Holder, peptideSequences_For_MainFilters_Holder
        }: {
            peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
            peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder
        }
    ) {

        const psmListItem = this.props.inputParams_TopLevelComponent.psmListItem

        const peptideId_For_ReportedPeptideId = peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( psmListItem.reportedPeptideId )
        if ( peptideId_For_ReportedPeptideId === undefined || peptideId_For_ReportedPeptideId === null ) {
            const msg = "peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( psmListItem.reportedPeptideId ) returned undefined or null for psmListItem.reportedPeptideId: " + psmListItem.reportedPeptideId
            console.warn( msg )
            throw Error( msg )
        }

        const peptideSequence = peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId( peptideId_For_ReportedPeptideId )
        if ( peptideSequence === undefined || peptideSequence === null ) {
            const msg = "peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId( peptideId_For_ReportedPeptideId ) returned undefined or null for v: " + peptideId_For_ReportedPeptideId
            console.warn( msg )
            throw Error( msg )
        }

        const aminoAcid_Start = this.props.psmPeptidePositionAnnotation_Record_Entry.peptidePosition - 1 // since zero based

        this._aminoAcidValue = peptideSequence.substring( aminoAcid_Start, aminoAcid_Start + 1 )

        this.setState( { _placeholder: {} } )
    }

    /**
     *
     */
    render() {
        try {

            return (

                <div style={ { marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10 } }>
                    <div style={ {
                        display: "grid",
                        columnGap: 5,
                        rowGap: 2,
                        gridTemplateColumns: "max-content max-content"
                    } }>
                        <div style={ { fontWeight: "bold" } }>
                            Peptide Position:
                        </div>
                        <div>
                            { this.props.psmPeptidePositionAnnotation_Record_Entry.peptidePosition }
                        </div>
                        <div style={ { fontWeight: "bold" } }>
                            Amino Acid:
                        </div>
                        <div>
                            { this._aminoAcidValue }
                        </div>
                        <div style={ { fontWeight: "bold" } }>
                            Score:
                        </div>
                        <div>
                            { limelight__AnnotationDisplay_CommonFormatting_FilterableAnnotation_NumberFormatting_ForDisplayOnPage( this.props.psmPeptidePositionAnnotation_Record_Entry.valueDouble ) }
                        </div>
                    </div>

                    <div style={ { marginTop: 12, marginBottom: 2, fontWeight: "bold" } }>
                        Within this PSM
                    </div>

                    <div style={ {
                        display: "grid",
                        columnGap: 5,
                        rowGap: 2,
                        gridTemplateColumns: "max-content max-content"
                    } }>
                        {/*  Best and worst scores for the PSM  */ }

                        <div style={ { fontWeight: "bold" } }>
                            Best Score:
                        </div>
                        <div>
                            { limelight__AnnotationDisplay_CommonFormatting_FilterableAnnotation_NumberFormatting_ForDisplayOnPage( this.props.bestScore_ForPSM ) }
                        </div>
                        <div
                            style={
                                {
                                    fontWeight: "bold"
                                    // marginBottom: 8  Removed since commented out: Best and worst scores for the search
                                }
                            }>
                            Worst Score:
                        </div>
                        <div>
                            { limelight__AnnotationDisplay_CommonFormatting_FilterableAnnotation_NumberFormatting_ForDisplayOnPage( this.props.worstScore_ForPSM ) }
                        </div>

                        {/*  Best and worst scores for the search  */ }
                        {/*
                        { ( psmPeptidePositionFilterableAnnotationType.best_ValueDouble !== undefined && psmPeptidePositionFilterableAnnotationType.best_ValueDouble !== null
                            && psmPeptidePositionFilterableAnnotationType.worst_ValueDouble !== undefined && psmPeptidePositionFilterableAnnotationType.worst_ValueDouble !== null ) ? (
                            <>
                                <div style={ { fontWeight: "bold" } }>
                                    Best Score in Search:
                                </div>
                                <div>
                                    { limelight__AnnotationDisplay_CommonFormatting_FilterableAnnotation_NumberFormatting_ForDisplayOnPage( psmPeptidePositionFilterableAnnotationType.best_ValueDouble ) }
                                </div>
                                <div style={ { fontWeight: "bold" } }>
                                    Worst Score in Search:
                                </div>
                                <div>
                                    { limelight__AnnotationDisplay_CommonFormatting_FilterableAnnotation_NumberFormatting_ForDisplayOnPage( psmPeptidePositionFilterableAnnotationType.worst_ValueDouble ) }
                                </div>
                            </>
                        ) : null }
                        */ }
                    </div>
                </div>
            )
        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }
}
