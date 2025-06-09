/**
 * proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Components_Other.tsx
 *
 *  "Other" React Components for use when creating GeneratedReportedPeptideListSection
 *
 * Protein Page - Multiple Searches - Single Protein - Reported Peptide List section -
 *
 */

import React from "react";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";


/**
 * Entry in incoming Map
 */
class ProteinNameDescriptionCacheEntry_MultipleSearches {
    name : string
    description: string
}



export class ProteinPage_Display_MultipleSearches__SingleProtein_GeneratedReportedPeptideListSection_Components___proteinName_Clicked_Callback_Function_Params {
    proteinSequenceVersionId: number
    ctrlKey_From_ClickEvent: boolean
    metaKey_From_ClickEvent: boolean
}

export type ProteinPage_Display_MultipleSearches__SingleProtein_GeneratedReportedPeptideListSection_Components___proteinName_Clicked_Callback_Function =
    ( params: ProteinPage_Display_MultipleSearches__SingleProtein_GeneratedReportedPeptideListSection_Components___proteinName_Clicked_Callback_Function_Params ) => void;

/**
 *
 */
export const proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Components___uniqueColumnHeader_Tooltip_Create = function () : JSX.Element {

    return (

        <div >
            Indicates if peptide is only found in this protein
        </div>
    );
}

/**
 *
 */
export const proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Components___proteinNames_Column_Content = function (
    {
        proteinNames_Array,
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId,
        proteinName_Clicked_Callback
    } : {
        proteinNames_Array : Array<{ proteinName: string,proteinSequenceVersionIds : Array<number> }>
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry_MultipleSearches>>
        proteinName_Clicked_Callback: ProteinPage_Display_MultipleSearches__SingleProtein_GeneratedReportedPeptideListSection_Components___proteinName_Clicked_Callback_Function

    }) : JSX.Element {

    if ( ! proteinName_Clicked_Callback ) {
        throw Error("( ! proteinName_Clicked_Callback )")
    }

    const elements : Array<JSX.Element> = [];

    let entryCounter = 1;

    for ( const proteinName_Entry of proteinNames_Array ) {

        for ( const proteinSequenceVersionId of proteinName_Entry.proteinSequenceVersionIds ) {

            const proteinNameDescriptionForToolip = proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId );
            if ( ! proteinNameDescriptionForToolip ) {
                const msg = "proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Components___proteinNames_Column_Content: ( ! proteinNameDescriptionForToolip ): proteinSequenceVersionId: " + proteinSequenceVersionId;
                console.warn( msg );
                throw Error(msg);
            }

            if ( entryCounter > 1 ) {
                const elementSeparator = (
                    <span key={ "separator-" + entryCounter }>, </span>
                );
                elements.push( elementSeparator );
            }
            const element = (
                <SingleProteinName_Entry_Component
                    key={ "entry-" + entryCounter }
                    proteinName={ proteinName_Entry.proteinName }
                    proteinSequenceVersionId={ proteinSequenceVersionId }
                    proteinNameDescriptionForToolip={ proteinNameDescriptionForToolip }
                    proteinName_Clicked_Callback={ proteinName_Clicked_Callback }
                />

                // <span
                //     key={ "entry-" + entryCounter } className={" fake-link "}
                //     onClick={
                //         ( event ) => {
                //             event.stopPropagation();
                //             proteinName_Clicked_Callback(
                //                 {
                //                     proteinSequenceVersionId,
                //                     ctrlKey_From_ClickEvent: event.ctrlKey,
                //                     metaKey_From_ClickEvent: event.metaKey
                //                 });
                //         }
                //     }
                //       title={ "Click to view Protein Details"}
                // >{ proteinName_Entry.proteinName }</span>
            )
            elements.push( element );
            entryCounter++;
        }
    }

    return (
        <React.Fragment>
            { elements }
        </React.Fragment>
    );
}

///////

//  Single Protein Name Entry


/**
 *
 */
interface SingleProteinName_Entry_Component_Props {

    proteinName : string
    proteinSequenceVersionId : number
    proteinNameDescriptionForToolip : Array<ProteinNameDescriptionCacheEntry_MultipleSearches>
    proteinName_Clicked_Callback: ProteinPage_Display_MultipleSearches__SingleProtein_GeneratedReportedPeptideListSection_Components___proteinName_Clicked_Callback_Function
}

interface SingleProteinName_Entry_Component_State {

    _placeholder: any
}



/**
 *
 */
class SingleProteinName_Entry_Component extends React.Component< SingleProteinName_Entry_Component_Props, SingleProteinName_Entry_Component_State > {

    private _onClick_Handler_BindThis = this._onClick_Handler.bind(this);
    /**
     *
     */
    constructor(props : SingleProteinName_Entry_Component_Props) {
        super(props);
    }

    /**
     *
     */
    private _onClick_Handler( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {

        event.stopPropagation();

        this.props.proteinName_Clicked_Callback({
            proteinSequenceVersionId: this.props.proteinSequenceVersionId,
            ctrlKey_From_ClickEvent: event.ctrlKey,
            metaKey_From_ClickEvent: event.metaKey
        });
    }

    render() {
        return (
            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                title={ _getTooltipText( this.props.proteinNameDescriptionForToolip ) }
                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
            >
                <span
                    // ref={ this._containingDOMElement_Ref }
                    className={" fake-link "}
                    onClick={ this._onClick_Handler_BindThis }
                >
                    { this.props.proteinName }
                </span>
            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
        );
    }
}


//////////


/**
 *
 */
const _getTooltipText = function( proteinNameDescriptionForToolip : Array<ProteinNameDescriptionCacheEntry_MultipleSearches> ) : JSX.Element {

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