/**
 * currentFiltersDisplayBlock__SingleProtein__ProteinSequenceWidget.tsx
 *
 * ONLY on Single Protein
 *
 * "Current Filters:"   For "Must cover protein position(s):"
 *
 *
 */

import React from "react";
import { ProteinSequenceWidget_StateObject, ProteinSequenceWidget_StateObject__Single_Protein_StartEnd_SelectionEntry } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject";
import { limelight__Sort_ArrayOfNumbers_SortArrayInPlace } from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";
import { limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer, Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component } from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";

//  Set since what is returned is put into an Array.  Simply set to root function name.
const _ROOT_REACT_ELEMENT_RETURNED__KEY = "currentFiltersDisplayBlock__SingleProtein__ProteinSequenceWidget";

/**
 *
 * @param proteinSequenceWidget_StateObject
 */
export const currentFiltersDisplayBlock__SingleProtein__ProteinSequenceWidget = function (
    {
        proteinSequenceWidget_StateObject
    } : {
        proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject;
    }
) : JSX.Element {

    //  Must return null if nothing to display.  Parent component uses that to determine if surrounding elements are displayed

    if ( ( ! proteinSequenceWidget_StateObject ) ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    let selectedProteinSequencePositions_Element: JSX.Element = undefined

    {
        const selectedProteinSequencePositionsSet = proteinSequenceWidget_StateObject.get_selectedProteinSequencePositions()

        if ( selectedProteinSequencePositionsSet?.size > 0 ) {

            selectedProteinSequencePositions_Element = (
                <CurrentFiltersDisplayBlock__SingleProtein__ProteinSequenceWidget
                    selectedProteinSequencePositionsSet={ selectedProteinSequencePositionsSet }
                />
            )
        }
    }

    let allSelections_Protein_StartEnd_Position_Element: JSX.Element = undefined

    {
        const allSelections_Protein_StartEnd_Position_Size = proteinSequenceWidget_StateObject.get_AllSelections_Protein_StartEnd_Position_Size()

        if ( allSelections_Protein_StartEnd_Position_Size > 0 ) {

            allSelections_Protein_StartEnd_Position_Element = (
                <CurrentFiltersDisplayBlock__SingleProtein__ProteinSequenceWidget__AllSelections_Protein_StartEnd_Position
                    proteinSequenceWidget_StateObject={ proteinSequenceWidget_StateObject }
                />
            )
        }
    }

    if ( ( ! selectedProteinSequencePositions_Element ) && ( ! allSelections_Protein_StartEnd_Position_Element ) ) {

        //  Nothing to display

        return null;  // EARLY RETURN
    }

    return (
        <React.Fragment key={ _ROOT_REACT_ELEMENT_RETURNED__KEY }>
            <div>
                { selectedProteinSequencePositions_Element }
            </div>
            <div>
                { allSelections_Protein_StartEnd_Position_Element }
            </div>
        </React.Fragment>
    );
}

////////////

//  get_selectedProteinSequencePositions

/**
 *
 * @param selectedProteinSequencePositions_DisplayString
 */
const CurrentFiltersDisplayBlock__SingleProtein__ProteinSequenceWidget = function(
    {
        selectedProteinSequencePositionsSet
    } : {
        selectedProteinSequencePositionsSet: Set<number>
    }
) : JSX.Element {

    const selectedProteinSequencePositions_DisplayString = _userSelectionDisplay_CombineArrayIntoFormattedString({ selectedProteinSequencePositionsSet });

    return (
        <span >
            <span style={{whiteSpace: "nowrap"}}>Must cover protein position(s): </span> <span>{ selectedProteinSequencePositions_DisplayString }</span> {/* example: 3, 6 or 987 */}
        </span>
    );
}


/**
 * put in comma delim string with ' or ' before last entry
 */
const _userSelectionDisplay_CombineArrayIntoFormattedString = function(
    {
        selectedProteinSequencePositionsSet
    } : {
        selectedProteinSequencePositionsSet: Set<number>
    }
    ) : string {

    const selectedProteinSequencePositionsArray = Array.from( selectedProteinSequencePositionsSet );
    limelight__Sort_ArrayOfNumbers_SortArrayInPlace( selectedProteinSequencePositionsArray );

    const numEntries = selectedProteinSequencePositionsArray.length;

    if ( numEntries === 1 ) {
        //  Single Element so return
        return selectedProteinSequencePositionsArray[ 0 ].toString(); // EARLY RETURN
    }

    //  > 1 entry so format with Comma Delim except before last entry.  Put ' or ' before last entry

    const lastEntryIndex = numEntries - 1;
    const allEntriesButLast = selectedProteinSequencePositionsArray.slice( 0, lastEntryIndex );

    let allEntriesButLastCommaDelim = allEntriesButLast.join(", ");

    const result = allEntriesButLastCommaDelim + " or " + selectedProteinSequencePositionsArray[ lastEntryIndex ];
    return result;
}


////////////

//  get_selectedProteinSequencePositions

/**
 *
 * @param selectedProteinSequencePositions_DisplayString
 */
const CurrentFiltersDisplayBlock__SingleProtein__ProteinSequenceWidget__AllSelections_Protein_StartEnd_Position = function(
    {
        proteinSequenceWidget_StateObject
    } : {
        proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject;
    }
) : JSX.Element {

    const elements = _userSelectionDisplay_Combine_AllSelections_Protein_StartEnd_Position_Create_ElementArray({ proteinSequenceWidget_StateObject });

    return (
        <span >
            <span style={{whiteSpace: "nowrap"}}>Must cover protein start:end positions: </span>
            <span></span>
            { elements }
        </span>
    );
}


/**
 *
 */
const _userSelectionDisplay_Combine_AllSelections_Protein_StartEnd_Position_Create_ElementArray = function(
    {
        proteinSequenceWidget_StateObject
    } : {
        proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject;
    }
) : Array<JSX.Element> {

    const result_ElementArray: Array<JSX.Element> = []

    const protein_StartEnd_Position_Selections_Array = Array.from( proteinSequenceWidget_StateObject.get_AllSelections_Protein_StartEnd_Position() )

    //  Sort on Start then End
    protein_StartEnd_Position_Selections_Array.sort( (a,b) => {
        if ( a.protein_Start < b.protein_Start ) {
            return -1
        }
        if ( a.protein_Start > b.protein_Start ) {
            return 1
        }
        if ( a.protein_End < b.protein_End ) {
            return -1
        }
        if ( a.protein_End > b.protein_End ) {
            return 1
        }
        return 0
    })

    const protein_StartEnd_Position_Selections_Array_Length = protein_StartEnd_Position_Selections_Array.length

    let protein_StartEnd_Position_Selections_Array_Index = 0

    for ( const protein_StartEnd_Position of protein_StartEnd_Position_Selections_Array ) {

        let prefixString: string = undefined
        let postfixString: string = undefined

        if ( protein_StartEnd_Position_Selections_Array_Length !== 1 ) {

            //  Compute if first, middle or last and suffix or prefix as needed

            if ( protein_StartEnd_Position_Selections_Array_Index === ( protein_StartEnd_Position_Selections_Array_Length - 1 ) ) {

                //  Is last so prefix with "or"

                prefixString = "or "

            } else {
                if ( protein_StartEnd_Position_Selections_Array_Index !== ( protein_StartEnd_Position_Selections_Array_Length - 2 ) ) {

                    //  NOT next to last so add ',' suffix

                    postfixString = ","
                }
            }
        }

        const startEnd_PaddingRight = 6

        const element = (
            <span key={ protein_StartEnd_Position_Selections_Array_Index }>
                <span> </span>
                <span style={ { whiteSpace: "nowrap" } }>
                    { prefixString ? (
                        <span>
                            { prefixString }
                        </span>
                    ) : null }
                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                        title={
                            <div>
                                <div>
                                    Selected protein position
                                </div>
                                <div style={ { display: "grid", gridTemplateColumns: "max-content max-content", marginTop: 10 } }>
                                    <div style={ { paddingRight: startEnd_PaddingRight } }>
                                        start:
                                    </div>
                                    <div>
                                        { protein_StartEnd_Position.protein_Start }
                                    </div>
                                    <div style={ { paddingRight: startEnd_PaddingRight } }>
                                        end:
                                    </div>
                                    <div>
                                        { protein_StartEnd_Position.protein_End }
                                    </div>
                                </div>
                            </div>
                        }
                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                    >
                        <span>
                            { protein_StartEnd_Position.protein_Start }:{ protein_StartEnd_Position.protein_End }
                        </span>
                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    { postfixString ? (
                        <span>
                            { postfixString }
                        </span>
                    ) : null }
                </span>
            </span>
        )

        result_ElementArray.push( element )


        protein_StartEnd_Position_Selections_Array_Index++
    }

    return result_ElementArray
}
