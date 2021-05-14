
/**
 * modProteinList_SubTableGenerator_Cell_Components.tsx
 *
 * Create JSX Elements for modProteinList_SubTableGenerator.ts
 *
 *
 */

import React from 'react'
import {ModViewDataManager} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataManager";
import {
    tooltip_Limelight_Create_Tooltip,
    Tooltip_Limelight_Created_Tooltip
} from "page_js/common_all_pages/tooltip_LimelightLocal_ReactBased";

export class modProteinList_SubTableGenerator_Subcomponents__Cell_Protein_Name_Contents_Click_Callback_Params {

    proteinId: number
    proteinName: string
    modMass: number
    ctrlKey_From_ClickEvent: boolean
    metaKey_From_ClickEvent: boolean
}

export type modProteinList_SubTableGenerator_Subcomponents__Cell_Protein_Name_Contents_Click_Callback =
    ( params: modProteinList_SubTableGenerator_Subcomponents__Cell_Protein_Name_Contents_Click_Callback_Params) => void;

/**
 * Contents for cell Protein Name
 */
export const modProteinList_SubTableGenerator_Subcomponents__Cell_Protein_Name_Contents = function (
    {
        proteinId,
        proteinName,
        modMass,
        projectSearchIds,
        modViewDataManager,
        clickCallback
    } : {
        proteinId: number
        proteinName: string
        modMass: number
        projectSearchIds: Array<number>
        modViewDataManager:ModViewDataManager
        clickCallback:modProteinList_SubTableGenerator_Subcomponents__Cell_Protein_Name_Contents_Click_Callback

    }) : JSX.Element {

    return (
        <Cell_Protein_Name_Contents_Component
            proteinId={proteinId}
            proteinName={ proteinName }
            modMass={modMass}
            projectSearchIds={ projectSearchIds }
            modViewDataManager={ modViewDataManager }
            clickCallback={clickCallback}
        />
    )
}


interface Cell_Protein_Name_Contents_Component_Props {

    proteinId: number
    proteinName: string
    modMass: number
    projectSearchIds: Array<number>
    modViewDataManager:ModViewDataManager
    clickCallback:modProteinList_SubTableGenerator_Subcomponents__Cell_Protein_Name_Contents_Click_Callback
}

interface Cell_Protein_Name_Contents_Component_State {
    _placeholder
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

    private _unmounted = false;

    /**
     *
     *
     */
    constructor(props: Cell_Protein_Name_Contents_Component_Props) {
        super(props);

        this._proteinNameSpan_Ref = React.createRef<HTMLSpanElement>();
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
    private _onClick(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {

        event.stopPropagation();

        this.props.clickCallback({
            proteinId: this.props.proteinId,
            proteinName: this.props.proteinName,
            modMass: this.props.modMass,
            ctrlKey_From_ClickEvent: event.ctrlKey,
            metaKey_From_ClickEvent: event.metaKey
        });
    }

    /**
     *
     */
    private _onMouseEnter( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {

        // event.stopPropagation();

        if ( ! this._proteinNameSpan_Ref.current ) {
            return;
        }

        const tooltipContents = _getTooltipText( null );
        const loadingMessage_Tooltip_Limelight_Created_Tooltip = tooltip_Limelight_Create_Tooltip({ tooltip_target_DOM_Element: this._proteinNameSpan_Ref.current, tooltipContents });

        const promise = this.props.modViewDataManager.getProteinNamesAndDescriptions({ proteinId: this.props.proteinId, projectSearchIds: this.props.projectSearchIds });

        promise.then( result => {

            loadingMessage_Tooltip_Limelight_Created_Tooltip.removeTooltip();

            if ( this._unmounted ) {
                return;
            }

            if ( ! this._proteinNameSpan_Ref.current ) {
                return;
            }

            const tooltipContents = _getTooltipText( result );
            this._tooltip_Limelight_Created_Tooltip = tooltip_Limelight_Create_Tooltip({ tooltip_target_DOM_Element: this._proteinNameSpan_Ref.current, tooltipContents });
        })

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


    /**
     *
     */
    render() {

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
    }
}


const _getTooltipText = function( data: Array<{ name: string, description: string }> ) : JSX.Element {

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

                data.map( (value, index) => {

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
            )
            }

        </div>

    );
}