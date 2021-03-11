/**
 * proteinPage_Display_MultipleSearches__SingleProtein_GeneratedReportedPeptideListSection_Components_Other.tsx
 *
 *  "Other" React Components for use when creating GeneratedReportedPeptideListSection
 *
 * Protein Page - Multiple Searches - Single Protein - Reported Peptide List section -
 *
 */

import React from "react";

export class ProteinPage_Display_MultipleSearches__SingleProtein_GeneratedReportedPeptideListSection_Components_proteinName_Clicked_Callback_Function_Params {
    proteinSequenceVersionId: number
    ctrlKey_From_ClickEvent: boolean
    metaKey_From_ClickEvent: boolean
}

export type ProteinPage_Display_MultipleSearches__SingleProtein_GeneratedReportedPeptideListSection_Components_proteinName_Clicked_Callback_Function =
    ( params: ProteinPage_Display_MultipleSearches__SingleProtein_GeneratedReportedPeptideListSection_Components_proteinName_Clicked_Callback_Function_Params ) => void;

/**
 *
 */
const uniqueColumnHeader_Tooltip_Create = function () : JSX.Element {

    return (

        <div >
            Indicates if peptide is only found in this protein
        </div>
    );
}

/**
 *
 */
const proteinNames_Column_Content = function (
    {
        proteinNames_Array,
        proteinName_Clicked_Callback
    } : {
        proteinNames_Array : Array<{ proteinName: string,proteinSequenceVersionIds : Array<number> }>
        proteinName_Clicked_Callback: ProteinPage_Display_MultipleSearches__SingleProtein_GeneratedReportedPeptideListSection_Components_proteinName_Clicked_Callback_Function

    }) : JSX.Element {

    if ( ! proteinName_Clicked_Callback ) {
        throw Error("( ! proteinName_Clicked_Callback )")
    }

    const elements : Array<JSX.Element> = [];

    let entryCounter = 1;

    for ( const proteinName_Entry of proteinNames_Array ) {

        for ( const proteinSequenceVersionId of proteinName_Entry.proteinSequenceVersionIds ) {

            if ( entryCounter > 1 ) {
                const elementSeparator = (
                    <span key={ "separator-" + entryCounter }>, </span>
                );
                elements.push( elementSeparator );
            }
            const element = (
                <span
                    key={ "entry-" + entryCounter } className={" fake-link "}
                    onClick={
                        ( event ) => {
                            event.stopPropagation();
                            proteinName_Clicked_Callback(
                                {
                                    proteinSequenceVersionId,
                                    ctrlKey_From_ClickEvent: event.ctrlKey,
                                    metaKey_From_ClickEvent: event.metaKey
                                });
                        }
                    }
                      title={ "Click to view Protein Details"}
                >{ proteinName_Entry.proteinName }</span>
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

/**
 *
 */
export class ProteinPage_Display_MultipleSearches__SingleProtein_GeneratedReportedPeptideListSection_Components_Other {

    static uniqueColumnHeader_Tooltip_Create = uniqueColumnHeader_Tooltip_Create;
    static proteinNames_Column_Content = proteinNames_Column_Content;
}


