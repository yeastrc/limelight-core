/**
 * filter_selection_item__any__all__selection_item.tsx
 *
 * In Filter Section of Single Protein
 *
 * A Single Selection Item which is in Variable/Open Mod, Static Mod, and Reporter Ion selections
 *
 *
 */

import React from 'react'
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {tooltip_Limelight_Create_Tooltip, Tooltip_Limelight_Created_Tooltip} from "page_js/common_all_pages/tooltip_LimelightLocal_ReactBased";
import {filter_selection_item__any__all__selection_item_Selection_Overlay_LocalConstants} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/filter_selectionItem_Any_All_SelectionItem/jsx/filter_selection_item__any__all__selection_item_Selection_Overlay_LocalConstants";


/**
 *
 */
export interface Filter_selectionItem_Any_All_SelectionItem_Props {

    textLabel : string
    current_selection_SelectionType : SingleProtein_Filter_SelectionType
}

interface Filter_selectionItem_Any_All_SelectionItem_State { //  Keep shouldComponentUpdate up to date
    placeHolder?: any
}

/**
 *
 */
export class Filter_selectionItem_Any_All_SelectionItem extends React.Component< Filter_selectionItem_Any_All_SelectionItem_Props, Filter_selectionItem_Any_All_SelectionItem_State > {

    //  bind to 'this' for passing as parameters

    private readonly _entry_Ref :  React.RefObject<HTMLDivElement>
    private _entry_OnMouseEnter_BindThis = this._entry_OnMouseEnter.bind(this);
    private _entry_OnMouseLeave_BindThis = this._entry_OnMouseLeave.bind(this);
    private _tooltip_Limelight_Created_Tooltip : Tooltip_Limelight_Created_Tooltip

    /**
     *
     */
    constructor(props: Filter_selectionItem_Any_All_SelectionItem_Props) {
        super(props);

        this._entry_Ref = React.createRef();
    }


    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate(nextProps: Filter_selectionItem_Any_All_SelectionItem_Props, nextState : Filter_selectionItem_Any_All_SelectionItem_State ) {

        //  Only update if changed: props:

        if (this.props.textLabel !== nextProps.textLabel
            || this.props.current_selection_SelectionType !== nextProps.current_selection_SelectionType
        ) {
            return true;
        }
        return false;

        //  If Comment out prev code, comment out this method
    }

    componentDidUpdate(prevProps: Readonly<Filter_selectionItem_Any_All_SelectionItem_Props>, prevState: Readonly<Filter_selectionItem_Any_All_SelectionItem_State>, snapshot?: any) {

        this._removeTooltip()
    }


    /**
     *
     */
    private _entry_OnMouseEnter() {

        let tooltipMainText : string = undefined

        if ( this.props.current_selection_SelectionType === SingleProtein_Filter_SelectionType.ANY ) {
            tooltipMainText = filter_selection_item__any__all__selection_item_Selection_Overlay_LocalConstants._OR__TOOLTIP_MAIN_TEXT_STRING
        } else if ( this.props.current_selection_SelectionType === SingleProtein_Filter_SelectionType.ALL ) {
            tooltipMainText = filter_selection_item__any__all__selection_item_Selection_Overlay_LocalConstants._AND__TOOLTIP_MAIN_TEXT_STRING
        } else if ( this.props.current_selection_SelectionType === SingleProtein_Filter_SelectionType.NOT ) {
            tooltipMainText = filter_selection_item__any__all__selection_item_Selection_Overlay_LocalConstants._NOT__TOOLTIP_MAIN_TEXT_STRING
        } else {

            return // EARLY RETURN
        }

        let tooltipContents : JSX.Element = (
            <div >
                <div>
                    { tooltipMainText }
                </div>
            </div>
        )

        this._tooltip_Limelight_Created_Tooltip = tooltip_Limelight_Create_Tooltip({ tooltipContents, tooltip_target_DOM_Element : this._entry_Ref.current })
    }

    /**
     *
     */
    private _entry_OnMouseLeave() {

        this._removeTooltip()
    }

    /**
     *
     */
    private _removeTooltip() {

        if ( this._tooltip_Limelight_Created_Tooltip ) {
            this._tooltip_Limelight_Created_Tooltip.removeTooltip()
        }
        this._tooltip_Limelight_Created_Tooltip = undefined
    }

    /**
     *
     */
    render() {

        const cssClassNames_total = " clickable"

        const iconStyle : React.CSSProperties = { marginTop: 2, marginLeft: 2, marginRight: 2 }

        return (
            <div className=" " style={ { position : "relative" } }>

                <div className={ cssClassNames_total }
                     ref={ this._entry_Ref }
                     onMouseEnter={ this._entry_OnMouseEnter_BindThis } onMouseLeave={ this._entry_OnMouseLeave_BindThis }
                >

                    <div style={ { display: "inline-block" } }>

                        {(this.props.current_selection_SelectionType) ?
                            //  Selected: Edit Icon: Pencil
                            <img src="static/images/icon-edit.png" className="fake-link-image icon-small" style={ iconStyle } />
                            :
                            //  Not Selected: Add Icon: Plus
                            <img src="static/images/icon-expand.png" className="fake-link-image icon-small" style={ iconStyle } />
                        }
                    </div>
                    <div style={ { display: "inline-block", whiteSpace : "nowrap" } }>
                        { this.props.textLabel }
                    </div>
                </div>
            </div>
        )
    }
}
