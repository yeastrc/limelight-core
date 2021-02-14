/**
 * filter_selection_item__any__all__selection_item__container.tsx
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
import {Filter_selectionItem_Any_All_SelectionItem} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/filter_selectionItem_Any_All_SelectionItem/jsx/filter_selection_item__any__all__selection_item";
import {filter_selectionItem_Any_All_SelectionItem_Selection_Overlay_Create} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/filter_selectionItem_Any_All_SelectionItem/jsx/filter_selection_item__any__all__selection_item_Selection_Overlay";

/**
 *
 */
export interface Filter_selectionItem_Any_All_SelectionItem_Container_Props {

    textLabel : string
    current_selection_SelectionType : SingleProtein_Filter_SelectionType
    any_Selected_Callback : () => void;
    all_Selected_Callback : () => void;
    not_Selected_Callback : () => void;
    remove_Selected_Callback : () => void;
}

interface Filter_selectionItem_Any_All_SelectionItem_Container_State { //  Keep shouldComponentUpdate up to date

    _placeholder: any
}

/**
 *
 */
export class Filter_selectionItem_Any_All_SelectionItem_Container extends React.Component< Filter_selectionItem_Any_All_SelectionItem_Container_Props, Filter_selectionItem_Any_All_SelectionItem_Container_State > {

    //  bind to 'this' for passing as parameters

    private readonly _entry_Ref :  React.RefObject<HTMLDivElement>
    private _entry_Clicked_BindThis = this._entry_Clicked.bind(this);

    /**
     *
     */
    constructor(props: Filter_selectionItem_Any_All_SelectionItem_Container_Props) {
        super(props);

        this._entry_Ref = React.createRef();

        // this.state = {  };
    }

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate(nextProps: Filter_selectionItem_Any_All_SelectionItem_Container_Props, nextState : Filter_selectionItem_Any_All_SelectionItem_Container_State ) {

        //  Only update if changed: props:

        if (this.props.textLabel !== nextProps.textLabel
            || this.props.current_selection_SelectionType !== nextProps.current_selection_SelectionType
        ) {
            return true;
        }
        return false;

        //  If Comment out prev code, comment out this method
    }

    /**
     *
     */
    private _entry_Clicked( event : React.MouseEvent<HTMLElement, MouseEvent> ) {
        try {
            const targetDOMElement_domRect = this._entry_Ref.current.getBoundingClientRect();

            /// targetDOMElement_domRect properties: left, top, right, bottom, x, y, width, and height

            const targetDOMElement_domRect_Left = targetDOMElement_domRect.left;
            // const targetDOMElement_domRect_Right = targetDOMElement_domRect.right;
            // const targetDOMElement_domRect_Top = targetDOMElement_domRect.top;
            const targetDOMElement_domRect_Bottom = targetDOMElement_domRect.bottom;

            const windowScroll_X = window.scrollX;
            const windowScroll_Y = window.scrollY;

            const position_Left = targetDOMElement_domRect_Left  + windowScroll_X;
            const position_Top = targetDOMElement_domRect_Bottom + windowScroll_Y;

            //  Creates the overlay and inserts it into the DOM, positioned by position_Left, position_Top
            filter_selectionItem_Any_All_SelectionItem_Selection_Overlay_Create({  // External Function

                current_selection_SelectionType : this.props.current_selection_SelectionType,
                position_Left,
                position_Top,
                any_Selected_Callback : this.props.any_Selected_Callback,
                all_Selected_Callback : this.props.all_Selected_Callback,
                not_Selected_Callback :  this.props.not_Selected_Callback,
                remove_Selected_Callback : this.props.remove_Selected_Callback
            })
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {

        const { cssClassNames, styleObject } = _protein_SingleProtein_FilterItem_Formatting({ singleProtein_Filter_SelectionType : this.props.current_selection_SelectionType })

        const cssClassNames_total = cssClassNames + " clickable"

        return (
            <div className=" filter-common-single-entry-outer-div " style={ { position : "relative" } }>

                <div style={ styleObject } className={ cssClassNames_total }
                     ref={ this._entry_Ref }
                     onClick={ this._entry_Clicked_BindThis }
                >
                    <Filter_selectionItem_Any_All_SelectionItem
                          textLabel={ this.props.textLabel }
                          current_selection_SelectionType={ this.props.current_selection_SelectionType }
                    />
                </div>

            </div>
        )
    }
}


///////////

//   NOT In Any Class

/**
 * Provide formatting based on param
 */
const _protein_SingleProtein_FilterItem_Formatting = function({ singleProtein_Filter_SelectionType } : {

    singleProtein_Filter_SelectionType : SingleProtein_Filter_SelectionType
}) : {
    cssClassNames : string
    styleObject : React.CSSProperties
} {
    const _BORDER_WIDTH = 2;
    const _PADDING_BOTTOM_WHEN_HAVE_BORDER = 1;
    const _PADDING_RIGHT_WHEN_HAVE_BORDER = 1;

    let cssClassNames : string = ""

    let styleObject : React.CSSProperties = {
        paddingBottom : _PADDING_BOTTOM_WHEN_HAVE_BORDER + _BORDER_WIDTH,
        paddingTop : _BORDER_WIDTH,
        paddingLeft : _BORDER_WIDTH,
        paddingRight : _PADDING_RIGHT_WHEN_HAVE_BORDER + _BORDER_WIDTH
    }

    if ( singleProtein_Filter_SelectionType ) {

        styleObject = {
            paddingBottom : _PADDING_BOTTOM_WHEN_HAVE_BORDER,
            paddingRight : _PADDING_RIGHT_WHEN_HAVE_BORDER,
            borderWidth : _BORDER_WIDTH,
            borderStyle : "dashed"
        }

        cssClassNames = " standard-border-color-dark "; // Changed if 'NOT'

        if ( singleProtein_Filter_SelectionType === SingleProtein_Filter_SelectionType.ALL ) {

            styleObject.borderStyle = "solid";

        } else if ( singleProtein_Filter_SelectionType === SingleProtein_Filter_SelectionType.NOT ) {

            styleObject.borderStyle = "solid";

            cssClassNames = " peptide-filter--not-border-color ";
        }
    }

    return { cssClassNames, styleObject }
}
