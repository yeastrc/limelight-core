/**
 * proteinViewPage_DisplayData_SingleSearch_ProteinName_ProteinDescription_DataTable_Component.tsx
 *
 * Protein Page Single Search - Protein List -
 *
 *    React Component for Protein Name  for Data Table
 *    React Component for Protein Description  for Data Table
 *
 * * Implemented to support tooltip on Protein Name and Protein Description
 */

import React from 'react'
import {
    tooltip_Limelight_Create_Tooltip,
    Tooltip_Limelight_Created_Tooltip
} from "page_js/common_all_pages/tooltip_LimelightLocal_ReactBased";
import {ProteinNameDescriptionCacheEntry_SingleSearch_SearchSubGroup} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/protein_page_single_search__search_sub_group/js/proteinViewPage_DisplayData_SingleSearch_SearchSubGroup_CreateProteinDisplayData";

/**
 *
 * @param proteinName
 * @param proteinSequenceVersionId
 */
export const get_SingleSearch__SearchSubGroup_ProteinList_ProteinName_ExternalReactComponent = function (
    {
        proteinName,
        proteinSequenceVersionId,
        proteinNameDescriptionForToolip
    } : {
        proteinName : string
        proteinSequenceVersionId : number
        proteinNameDescriptionForToolip : Array<ProteinNameDescriptionCacheEntry_SingleSearch_SearchSubGroup>

    }) : JSX.Element {

    return (
        <SingleSearch__SearchSubGroup_ProteinName_ExternalReactComponent
            proteinName={ proteinName }
            proteinSequenceVersionId={ proteinSequenceVersionId }
            proteinNameDescriptionForToolip={ proteinNameDescriptionForToolip }
        />
    )
}


export const get_SingleSearch__SearchSubGroup_ProteinList_ProteinDescription_ExternalReactComponent = function (
    {
        proteinDescription,
        proteinSequenceVersionId,
        proteinNameDescriptionForToolip
    } : {
        proteinDescription : string
        proteinSequenceVersionId : number
        proteinNameDescriptionForToolip : Array<ProteinNameDescriptionCacheEntry_SingleSearch_SearchSubGroup>

    }) : JSX.Element {

    return (
        <SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent
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
interface SingleSearch__SearchSubGroup_ProteinName_ExternalReactComponent_Props {

    proteinName : string
    proteinSequenceVersionId : number
    proteinNameDescriptionForToolip : Array<ProteinNameDescriptionCacheEntry_SingleSearch_SearchSubGroup>
}

interface SingleSearch__SearchSubGroup_ProteinName_ExternalReactComponent_State {

    _placeholder: any
}



/**
 *
 */
class SingleSearch__SearchSubGroup_ProteinName_ExternalReactComponent extends React.Component< SingleSearch__SearchSubGroup_ProteinName_ExternalReactComponent_Props, SingleSearch__SearchSubGroup_ProteinName_ExternalReactComponent_State > {

    private _onMouseEnter_BindThis = this._onMouseEnter.bind(this);
    private _onMouseLeave_BindThis = this._onMouseLeave.bind(this);

    private _containingDOMElement_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()

    private _tooltip_Limelight_Created_Tooltip : Tooltip_Limelight_Created_Tooltip;

    private _unmounted = false;

    /**
     *
     */
    constructor(props : SingleSearch__SearchSubGroup_ProteinName_ExternalReactComponent_Props) {
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
interface SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent_Props {

    proteinDescription : string
    proteinSequenceVersionId : number
    proteinNameDescriptionForToolip : Array<ProteinNameDescriptionCacheEntry_SingleSearch_SearchSubGroup>
}

interface SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent_State {

    _placeholder: any
}



/**
 *
 */
class SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent extends React.Component< SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent_Props, SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent_State > {

    private _onMouseEnter_BindThis = this._onMouseEnter.bind(this);
    private _onMouseLeave_BindThis = this._onMouseLeave.bind(this);

    private _containingDOMElement_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()

    private _tooltip_Limelight_Created_Tooltip : Tooltip_Limelight_Created_Tooltip;

    private _unmounted = false;

    /**
     *
     */
    constructor(props : SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent_Props) {
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
const _getTooltipText = function( proteinNameDescriptionForToolip : Array<ProteinNameDescriptionCacheEntry_SingleSearch_SearchSubGroup> ) : JSX.Element {

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