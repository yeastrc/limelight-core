
/**
 * modPage_ProteinList_SubTableGenerator_ProteinName_Cell_Component.tsx
 *
 * Create JSX Elements for modPage_get_ProteinList_SubTable.ts
 *
 *
 */

import React from 'react'
import {
    tooltip_Limelight_Create_Tooltip,
    Tooltip_Limelight_Created_Tooltip
} from "page_js/common_all_pages/tooltip_LimelightLocal_ReactBased";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    modPage_Get_Protein_NamesAndDescriptions_UTIL, ModPage_Get_Protein_NamesAndDescriptions_UTIL_Result
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_Get_Protein_NamesAndDescriptions_UTIL";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";



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
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

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
    private _onMouseEnter_BindThis = this._onMouseEnter.bind(this);
    private _onMouseLeave_BindThis = this._onMouseLeave.bind(this);

    private _proteinNameSpan_Ref : React.RefObject<HTMLSpanElement>; //  React.createRef()

    private _tooltip_Limelight_Created_Tooltip : Tooltip_Limelight_Created_Tooltip;

    private _mouse_IsCurrently_Entered_And_NotLeft = false;

    private _unmounted = false;

    /**
     *
     *
     */
    constructor(props: Cell_Protein_Name_Contents_Component_Props) { try {

        super(props);

        this._proteinNameSpan_Ref = React.createRef<HTMLSpanElement>();

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    componentWillUnmount() { try {

        this._unmounted = true;

        if ( this._tooltip_Limelight_Created_Tooltip ) {
            this._tooltip_Limelight_Created_Tooltip.removeTooltip();
        }
        this._tooltip_Limelight_Created_Tooltip = null;

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
    private _onMouseEnter( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) { try {

        // event.stopPropagation();

        if ( ! this._proteinNameSpan_Ref.current ) {
            return;
        }

        this._mouse_IsCurrently_Entered_And_NotLeft = true;

        const tooltipContents = _getTooltipText( null );
        this._tooltip_Limelight_Created_Tooltip = tooltip_Limelight_Create_Tooltip({ tooltip_target_DOM_Element: this._proteinNameSpan_Ref.current, tooltipContents });

        const modPage_Get_Protein_NamesAndDescriptions_UTIL_Result =
            modPage_Get_Protein_NamesAndDescriptions_UTIL({
                proteinSequenceVersionId: this.props.proteinId,
                projectSearchIds: this.props.projectSearchIds,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
            })

        if ( modPage_Get_Protein_NamesAndDescriptions_UTIL_Result.data ) {
            this. _onMouseEnter_AfterGetData( modPage_Get_Protein_NamesAndDescriptions_UTIL_Result.data )

        } else if ( modPage_Get_Protein_NamesAndDescriptions_UTIL_Result.promise ) {
            modPage_Get_Protein_NamesAndDescriptions_UTIL_Result.promise.catch(reason => {})
            modPage_Get_Protein_NamesAndDescriptions_UTIL_Result.promise.then( result => { try {

                this. _onMouseEnter_AfterGetData( result )
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } else {
            throw Error("modPage_Get_Protein_NamesAndDescriptions_UTIL_Result no 'data' or 'promise'")
        }

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    private _onMouseEnter_AfterGetData(
        data: ModPage_Get_Protein_NamesAndDescriptions_UTIL_Result
    ) {

        if ( this._tooltip_Limelight_Created_Tooltip ) {
            this._tooltip_Limelight_Created_Tooltip.removeTooltip();
        }

        if ( ! this._mouse_IsCurrently_Entered_And_NotLeft ) {
            //  Already mouse leave so not display main tooltip
            return;
        }

        if ( this._unmounted ) {
            return;
        }

        if ( ! this._proteinNameSpan_Ref.current ) {
            return;
        }

        const tooltipContents = _getTooltipText( data );
        this._tooltip_Limelight_Created_Tooltip = tooltip_Limelight_Create_Tooltip({ tooltip_target_DOM_Element: this._proteinNameSpan_Ref.current, tooltipContents });

    }

    /**
     *
     */
    private _onMouseLeave( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) { try {

        // event.stopPropagation();

        this._mouse_IsCurrently_Entered_And_NotLeft = false;

        if ( this._tooltip_Limelight_Created_Tooltip ) {
            this._tooltip_Limelight_Created_Tooltip.removeTooltip();
        }
        this._tooltip_Limelight_Created_Tooltip = null;

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}


    /**
     *
     */
    render() { try {

        return (
            <span
                ref={ this._proteinNameSpan_Ref }
                className=" fake-link "
                onClick={this._onClick_BindThis}
                onMouseEnter={ this._onMouseEnter_BindThis }
                onMouseLeave={ this._onMouseLeave_BindThis }
            >
                {this.props.proteinName}
            </span>
        );
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
}


const _getTooltipText = function( data: ModPage_Get_Protein_NamesAndDescriptions_UTIL_Result ) : JSX.Element { try {

    return (
        <div style={ { marginBottom: 10 } } className="isTooltip">

            <div style={ { marginBottom: 10 } } className="isTooltip">
                <span className='is-tooltip-label'>Name(s) and description(s) uploaded to Limelight:</span>
            </div>

            { ( ! data ) ? (

                <div
                    style={ { marginBottom : 15 ,marginLeft : 10 } } className="isTooltip"
                >
                    LOADING DATA
                </div>

            ) : (

                data.proteinNames_AndDescriptions_Array_Entry_ProteinName_ProteinDescription_Pair.map( (value, index) => {

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
            )
            }

        </div>

    );
} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}