
/**
 * modPage_ProteinList_SubTableGenerator_ProteinName_Cell_Component.tsx
 *
 * Create JSX Elements for modPage_get_ProteinList_SubTable.tsx
 *
 *
 */

import React from 'react'
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    modPage_Get_Protein_NamesAndDescriptions_UTIL, ModPage_Get_Protein_NamesAndDescriptions_UTIL_Result
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_Get_Protein_NamesAndDescriptions_UTIL";
import {
    CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";



export class ModPage_ProteinList_SubTableGenerator_Subcomponents__Cell_Protein_Name_Contents_Click_Callback_Params {

    proteinId: number
    proteinName: string
    modMass: number
    ctrlKey_From_ClickEvent: boolean
    metaKey_From_ClickEvent: boolean
}

export type modProteinList_SubTableGenerator_Subcomponents__Cell_Protein_Name_Contents_Click_Callback =
    ( params: ModPage_ProteinList_SubTableGenerator_Subcomponents__Cell_Protein_Name_Contents_Click_Callback_Params) => void;

/**
 * Contents for cell Protein Name
 */
export const modPage_ProteinList_SubTableGenerator_Subcomponents__Cell_Protein_Name_Contents = function (
    props : Cell_Protein_Name_Contents_Component_Props) : JSX.Element { try {

    return (
        <Cell_Protein_Name_Contents_Component
            { ...props }
        />
    )
} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}


interface Cell_Protein_Name_Contents_Component_Props {

    proteinId: number
    proteinName: string
    modMass: number
    projectSearchIds: Array<number>
    proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder>

    clickCallback: modProteinList_SubTableGenerator_Subcomponents__Cell_Protein_Name_Contents_Click_Callback
}

interface Cell_Protein_Name_Contents_Component_State {
    _placeholder: unknown
}

/**
 *
 *
 */
class Cell_Protein_Name_Contents_Component extends React.Component< Cell_Protein_Name_Contents_Component_Props, Cell_Protein_Name_Contents_Component_State > {

    private _onClick_BindThis = this._onClick.bind(this);

    private _unmounted = false;

    /**
     *
     *
     */
    constructor(props: Cell_Protein_Name_Contents_Component_Props) { try {

        super(props);

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    componentWillUnmount() { try {

        this._unmounted = true;

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    private _onClick(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) { try {

        event.stopPropagation();

        this.props.clickCallback({
            proteinId: this.props.proteinId,
            proteinName: this.props.proteinName,
            modMass: this.props.modMass,
            ctrlKey_From_ClickEvent: event.ctrlKey,
            metaKey_From_ClickEvent: event.metaKey
        });
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    render() { try {

        return (
            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                title={
                    <INTERNAL__Cell_Protein_Name_Contents_Component_GetTooltipContents_Component
                        proteinId={ this.props.proteinId }
                        projectSearchIds={ this.props.projectSearchIds }
                        proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId={ this.props.proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId }
                    />
                }
                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
            >
            <span
                className=" fake-link "
                onClick={this._onClick_BindThis}
            >
                {this.props.proteinName}
            </span>
            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
        )
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
}



const INTERNAL__Cell_Protein_Name_Contents_Component_GetTooltipContents_Component = function (
    props: {
        proteinId: number
        projectSearchIds: Array<number>

        proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder>
    }
) { try {
    const modPage_Get_Protein_NamesAndDescriptions_UTIL_Result =
        modPage_Get_Protein_NamesAndDescriptions_UTIL({
            proteinSequenceVersionId: props.proteinId,
            projectSearchIds: props.projectSearchIds,
            proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId: props.proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId
        })

    return  _getTooltipText( modPage_Get_Protein_NamesAndDescriptions_UTIL_Result );

} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}



const _getTooltipText = function( data: ModPage_Get_Protein_NamesAndDescriptions_UTIL_Result ) : JSX.Element { try {

    return (
        <div style={ { marginBottom: 10 } } className="isTooltip">

            <div style={ { marginBottom: 10 } } className="isTooltip">
                <span className='is-tooltip-label'>Name(s) and description(s) uploaded to Limelight:</span>
            </div>

            {  data.proteinNames_AndDescriptions_Array_Entry_ProteinName_ProteinDescription_Pair.map( (value, index) => {

                        return (
                            <div key={ index }
                                 style={ { marginBottom : 15 ,marginLeft : 10 } } className="isTooltip"
                            >
                                <span>{ value.proteinName }</span>
                                <span> </span>
                                <span>{ value.proteinDescription }</span>
                            </div>
                        )
                    }
                )
            }

        </div>

    );
} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}