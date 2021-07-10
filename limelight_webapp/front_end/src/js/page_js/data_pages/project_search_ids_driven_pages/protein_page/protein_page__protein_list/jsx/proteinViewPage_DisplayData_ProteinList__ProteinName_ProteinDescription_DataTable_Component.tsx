/**
 * proteinViewPage_DisplayData_ProteinList_Integrated_SingleMultipleSearchSubGroups_ProteinName_DataTable_Component.tsx
 * 
 * Protein Page Multiple Searches - Protein List - React Component for Protein Name for Data Table
 * 
 * Implemented to support tooltip on Protein Name
 */

/**
 * proteinViewPage_DisplayData_ProteinList_Integrated_SingleMultipleSearchSubGroups_ProteinName_ProteinDescription_DataTable_Component.tsx
 *
 * Protein Page Single Search - Protein List -
 *
 *    React Component for Protein Name  for Data Table
 *    React Component for Protein Description  for Data Table
 *
 * Implemented to support tooltip on Protein Name and Protein Description
 */

import React from 'react'
import {
    tooltip_Limelight_Create_Tooltip,
    Tooltip_Limelight_Created_Tooltip
} from "page_js/common_all_pages/tooltip_LimelightLocal_ReactBased";
import {ProteinNameDescriptionCacheEntry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/protein_view_page__display_data__protein_list__create_protein_display_data__before__not_grouped__grouped";

/**
 *
 * @param proteinName
 * @param proteinSequenceVersionId
 */
export const get_ProteinList_ProteinName_ExternalReactComponent = function (
    {
        proteinName,
        proteinSequenceVersionId,
        proteinNameDescriptionForToolip
    } : {
        proteinName : string
        proteinSequenceVersionId : number
        proteinNameDescriptionForToolip : Array<ProteinNameDescriptionCacheEntry>

    }) : JSX.Element {

    return (
        <Integrated_SingleMultipleSearchSubGroups_ProteinList_ProteinName_ExternalReactComponent
            proteinName={ proteinName }
            proteinSequenceVersionId={ proteinSequenceVersionId }
            proteinNameDescriptionForToolip={ proteinNameDescriptionForToolip }
        />
    )
}


export const get_ProteinList_ProteinDescription_ExternalReactComponent = function (
    {
        proteinDescription,
        proteinSequenceVersionId,
        proteinNameDescriptionForToolip
    } : {
        proteinDescription : string
        proteinSequenceVersionId : number
        proteinNameDescriptionForToolip : Array<ProteinNameDescriptionCacheEntry>

    }) : JSX.Element {

    return (
        <Integrated_SingleMultipleSearchSubGroups_ProteinList_ProteinDescription_ExternalReactComponent
            proteinDescription={ proteinDescription }
            proteinSequenceVersionId={ proteinSequenceVersionId }
            proteinNameDescriptionForToolip={ proteinNameDescriptionForToolip }
        />
    )
}

///////

/**
 *
 */
interface Integrated_SingleMultipleSearchSubGroups_ProteinList_ProteinName_ExternalReactComponent_Props {

    proteinName : string
    proteinSequenceVersionId : number
    proteinNameDescriptionForToolip : Array<ProteinNameDescriptionCacheEntry>
}

interface Integrated_SingleMultipleSearchSubGroups_ProteinList_ProteinName_ExternalReactComponent_State {

    _placeholder: any
}



/**
 *
 */
class Integrated_SingleMultipleSearchSubGroups_ProteinList_ProteinName_ExternalReactComponent extends React.Component< Integrated_SingleMultipleSearchSubGroups_ProteinList_ProteinName_ExternalReactComponent_Props, Integrated_SingleMultipleSearchSubGroups_ProteinList_ProteinName_ExternalReactComponent_State > {

    private _onMouseEnter_BindThis = this._onMouseEnter.bind(this);
    private _onMouseLeave_BindThis = this._onMouseLeave.bind(this);

    private _containingDOMElement_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()

    private _tooltip_Limelight_Created_Tooltip : Tooltip_Limelight_Created_Tooltip;

    private _unmounted = false;

    /**
     *
     */
    constructor(props : Integrated_SingleMultipleSearchSubGroups_ProteinList_ProteinName_ExternalReactComponent_Props) {
        super(props);

        this._containingDOMElement_Ref = React.createRef<HTMLDivElement>();
    }

    componentWillUnmount() {

        this._unmounted = true;

        if ( this._tooltip_Limelight_Created_Tooltip ) {
            this._tooltip_Limelight_Created_Tooltip.removeTooltip();
        }
        this._tooltip_Limelight_Created_Tooltip = null;
    }

    /**
     *
     */
    private _onMouseEnter( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {

        // event.stopPropagation();

        if ( ! this._containingDOMElement_Ref.current ) {
            return;
        }

        const tooltipContents = _getTooltipText( this.props.proteinNameDescriptionForToolip );
        this._tooltip_Limelight_Created_Tooltip = tooltip_Limelight_Create_Tooltip({ tooltip_target_DOM_Element: this._containingDOMElement_Ref.current, tooltipContents });

    }

    /**
     *
     */
    private _onMouseLeave( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {

        // event.stopPropagation();

        if ( this._tooltip_Limelight_Created_Tooltip ) {
            this._tooltip_Limelight_Created_Tooltip.removeTooltip();
        }
        this._tooltip_Limelight_Created_Tooltip = null;
    }

    render() {

        return (
            <div
                ref={ this._containingDOMElement_Ref }
                onMouseEnter={ this._onMouseEnter_BindThis }
                onMouseLeave={ this._onMouseLeave_BindThis }
            >
                { this.props.proteinName }
            </div>
        );
    }
}


///////

//  Description


/**
 *
 */
interface Integrated_SingleMultipleSearchSubGroups_ProteinList_ProteinDescription_ExternalReactComponent_Props {

    proteinDescription : string
    proteinSequenceVersionId : number
    proteinNameDescriptionForToolip : Array<ProteinNameDescriptionCacheEntry>
}

interface Integrated_SingleMultipleSearchSubGroups_ProteinList_ProteinDescription_ExternalReactComponent_State {

    _placeholder: any
}



/**
 *
 */
class Integrated_SingleMultipleSearchSubGroups_ProteinList_ProteinDescription_ExternalReactComponent extends React.Component< Integrated_SingleMultipleSearchSubGroups_ProteinList_ProteinDescription_ExternalReactComponent_Props, Integrated_SingleMultipleSearchSubGroups_ProteinList_ProteinDescription_ExternalReactComponent_State > {

    private _onMouseEnter_BindThis = this._onMouseEnter.bind(this);
    private _onMouseLeave_BindThis = this._onMouseLeave.bind(this);

    private _containingDOMElement_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()

    private _tooltip_Limelight_Created_Tooltip : Tooltip_Limelight_Created_Tooltip;

    private _unmounted = false;

    /**
     *
     */
    constructor(props : Integrated_SingleMultipleSearchSubGroups_ProteinList_ProteinDescription_ExternalReactComponent_Props) {
        super(props);

        this._containingDOMElement_Ref = React.createRef<HTMLDivElement>();
    }

    componentWillUnmount() {

        this._unmounted = true;

        if ( this._tooltip_Limelight_Created_Tooltip ) {
            this._tooltip_Limelight_Created_Tooltip.removeTooltip();
        }
        this._tooltip_Limelight_Created_Tooltip = null;
    }

    /**
     *
     */
    private _onMouseEnter( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {

        // event.stopPropagation();

        if ( ! this._containingDOMElement_Ref.current ) {
            return;
        }

        const tooltipContents = _getTooltipText( this.props.proteinNameDescriptionForToolip );
        this._tooltip_Limelight_Created_Tooltip = tooltip_Limelight_Create_Tooltip({ tooltip_target_DOM_Element: this._containingDOMElement_Ref.current, tooltipContents });

    }

    /**
     *
     */
    private _onMouseLeave( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {

        // event.stopPropagation();

        if ( this._tooltip_Limelight_Created_Tooltip ) {
            this._tooltip_Limelight_Created_Tooltip.removeTooltip();
        }
        this._tooltip_Limelight_Created_Tooltip = null;
    }

    render() {

        return (
            <div
                ref={ this._containingDOMElement_Ref }
                onMouseEnter={ this._onMouseEnter_BindThis }
                onMouseLeave={ this._onMouseLeave_BindThis }
            >
                { this.props.proteinDescription }
            </div>
        );
    }
}


//////////


/**
 *
 */
const _getTooltipText = function( proteinNameDescriptionForToolip : Array<ProteinNameDescriptionCacheEntry> ) : JSX.Element {

    return (
        <div style={ { marginBottom: 10 } } className="isTooltip">

            <div style={ { marginBottom: 10 } } className="isTooltip">
                <span className='is-tooltip-label'>Name(s) and description(s) uploaded to Limelight:</span>
            </div>

            { proteinNameDescriptionForToolip.map( (value, index) => {

                    return (
                        <div key={ index }
                             style={ { marginBottom : 15 ,marginLeft : 10 } } className="isTooltip"
                        >
                            <span>{ value.name }</span>
                            <span> </span>
                            <span>{ value.description }</span>
                        </div>
                    )
                }
            )
            }

        </div>

    );
}