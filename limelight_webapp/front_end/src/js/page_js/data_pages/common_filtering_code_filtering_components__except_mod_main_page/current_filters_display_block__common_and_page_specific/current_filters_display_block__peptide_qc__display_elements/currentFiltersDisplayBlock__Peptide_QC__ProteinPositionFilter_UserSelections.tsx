/**
 * currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections.tsx
 *
 * ONLY on Peptide page and QC page
 *
 * "Current Filters:"   For Protein Position Filter UserSelections
 *
 *
 */

import React from "react";
import {ProteinPositionFilter_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {ProteinPositionFilter_UserInput__Component__ProteinData_SingleProtein} from "page_js/data_pages/common_components__react/protein_position_filter_component__not_single_protein/protein_position_filter__user_input_component/proteinPositionFilter_UserInput__Component__ProteinData";
import {ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data";

//  Set since what is returned is put into an Array.  Simply set to root function name.
const _ROOT_REACT_ELEMENT_RETURNED__KEY = "currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections";

const _PROTEIN_NAME_TRUNCATION = 20;

/**
 *
 * @param proteinPositionFilter_UserSelections_StateObject
 * @param proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
 */
export const currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections = function (
    {
        proteinPositionFilter_UserSelections_StateObject, proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
    } : {
        proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject;
        proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
    }
) : JSX.Element {

    if ( ( ! proteinPositionFilter_UserSelections_StateObject ) ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    if ( ! proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    return (
        <React.Fragment key={ _ROOT_REACT_ELEMENT_RETURNED__KEY }>
            <CurrentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections
                proteinPositionFilter_UserSelections_StateObject={ proteinPositionFilter_UserSelections_StateObject }
                proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data={ proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data }
            />
        </React.Fragment>
    );
}

/**
 *
 */
const CurrentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections = function(
    {
        proteinPositionFilter_UserSelections_StateObject, proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
    } : {
        proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject;
        proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
    }
) : JSX.Element {

    //  CANNOT return null since wrapped in <React.Fragment>

    if ( ! proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data ) {
        const msg = "peptide_Page_FiltersDisplay_ComponentDatapeptideFiltersDisplay_ComponentData.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data not populated when peptide_Page_FiltersDisplay_ComponentDatapeptideFiltersDisplay_ComponentData.proteinPositionFilter_UserSelections_StateObject is populated";
        console.warn( msg )
        throw Error( msg );
    }

    const proteinPosition_SelectionDisplay_Entries : Array<ProteinPositionFilter_UserSelections_Component_SelectionDisplay_Entry> = [];

    const selections_Ranges = proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges();

    for ( const mapEntry of selections_Ranges.entriesMap_Key_proteinSequenceVersionId.entries() ) {
        const per_proteinSequenceVersionId_Entry  = mapEntry[ 1 ];
        const proteinSequenceVersionId = per_proteinSequenceVersionId_Entry.proteinSequenceVersionId

        let proteins_Names_LengthsData: ProteinPositionFilter_UserInput__Component__ProteinData_SingleProtein = undefined;
        for ( const protein of
            proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data.proteinPositionFilter_UserInput__Component__ProteinData_Root.proteins ) {
            if ( protein.proteinSequenceVersionId === proteinSequenceVersionId ) {
                proteins_Names_LengthsData = protein;
                break;
            }
        }

        if ( ! proteins_Names_LengthsData ) {
            const msg = " nothing in proteins_Names_LengthsData for proteinSequenceVersionId: " + proteinSequenceVersionId;
            console.warn( msg, proteinSequenceVersionId )
            throw Error( msg + proteinSequenceVersionId )
        }

        const proteinName_Truncated = proteins_Names_LengthsData.proteinName.substring( 0, _PROTEIN_NAME_TRUNCATION );


        if ( per_proteinSequenceVersionId_Entry.fullProteinSelected ){
            const resultEntry: ProteinPositionFilter_UserSelections_Component_SelectionDisplay_Entry = {
                proteinSequenceVersionId,
                proteinName: proteins_Names_LengthsData.proteinName,
                proteinName_Truncated: proteinName_Truncated,
                proteinDescription: proteins_Names_LengthsData.proteinDescription,
                proteinPosition_Start: 1,
                proteinPosition_End: proteins_Names_LengthsData.proteinLength,
                proteinFullLengthSelected : true
            }
            proteinPosition_SelectionDisplay_Entries.push(resultEntry);
        }

        if ( per_proteinSequenceVersionId_Entry.rangeEntries && per_proteinSequenceVersionId_Entry.rangeEntries.length > 0 ) {
            for (const entry_For_ProteinSequenceVersionId of per_proteinSequenceVersionId_Entry.rangeEntries) {
                let proteinFullLengthSelected = false;
                if (entry_For_ProteinSequenceVersionId.proteinPosition_Start === 1 && entry_For_ProteinSequenceVersionId.proteinPosition_End === proteins_Names_LengthsData.proteinLength) {
                    proteinFullLengthSelected = true;
                }
                const resultEntry: ProteinPositionFilter_UserSelections_Component_SelectionDisplay_Entry = {
                    proteinSequenceVersionId,
                    proteinName: proteins_Names_LengthsData.proteinName,
                    proteinName_Truncated: proteinName_Truncated,
                    proteinDescription: proteins_Names_LengthsData.proteinDescription,
                    proteinPosition_Start: entry_For_ProteinSequenceVersionId.proteinPosition_Start,
                    proteinPosition_End: entry_For_ProteinSequenceVersionId.proteinPosition_End,
                    proteinFullLengthSelected
                }
                proteinPosition_SelectionDisplay_Entries.push(resultEntry);
            }
        }
    }
    proteinPosition_SelectionDisplay_Entries.sort( (a,b) => {
        if ( a.proteinName < b.proteinName ) {
            return -1;
        }
        if ( a.proteinName > b.proteinName ) {
            return 1;
        }
        if ( a.proteinSequenceVersionId < b.proteinSequenceVersionId ) {
            return -1;
        }
        if ( a.proteinSequenceVersionId > b.proteinSequenceVersionId ) {
            return 1;
        }
        if ( a.proteinPosition_Start < b.proteinPosition_Start ) {
            return -1;
        }
        if ( a.proteinPosition_Start > b.proteinPosition_Start ) {
            return 1;
        }
        return 0;
    });

    const proteinPositionFilter_JSX_Entries : Array<JSX.Element> = [];
    {
        let index = 0;
        for (const proteinPosition_SelectionDisplay_Entry of proteinPosition_SelectionDisplay_Entries) {

            let orSeparator : JSX.Element = null;
            if ( index !== 0 ) {
                //  Add separator "OR"
                const separatorKey = "separator_" + index;
                orSeparator = (
                    <span style={ { whiteSpace: "nowrap" } }>
                                {/* <span>&nbsp;</span> remove since each entry has trailing space */}
                        <span key={ separatorKey } >
                                    OR
                                </span>
                                <span>&nbsp;</span>
                            </span>
                );
            }

            const proteinNameTitle = proteinPosition_SelectionDisplay_Entry.proteinName + "\n\n" + proteinPosition_SelectionDisplay_Entry.proteinDescription;

            if ( proteinPosition_SelectionDisplay_Entry.proteinFullLengthSelected ) {
                const rootElement_Key = proteinPosition_SelectionDisplay_Entry.proteinSequenceVersionId
                const jsx = (
                    <span key={ rootElement_Key }>
                                <span style={ { whiteSpace: "nowrap" } }>

                                    { orSeparator } {/* Populated for all entries after the first one */}

                                    <span>
                                        Any position in&nbsp;
                                    </span>
                                    <span title={ proteinNameTitle }>
                                        { proteinPosition_SelectionDisplay_Entry.proteinName_Truncated }
                                    </span>
                                </span>
                                <span> </span>  {/* Empty span to allow line breaks */}
                            </span>
                )
                proteinPositionFilter_JSX_Entries.push( jsx );
            } else {
                const rootElement_Key = proteinPosition_SelectionDisplay_Entry.proteinSequenceVersionId + "_" + proteinPosition_SelectionDisplay_Entry.proteinPosition_Start;
                const rootElement_SpanAfter_Key = proteinPosition_SelectionDisplay_Entry.proteinSequenceVersionId + "_" + proteinPosition_SelectionDisplay_Entry.proteinPosition_Start + "_SpanAfter";
                const jsx = (
                    <span key={ rootElement_Key }>
                                <span style={ { whiteSpace: "nowrap" } }>

                                    { orSeparator } {/* Populated for all entries after the first one */}

                                    <span>
                                        Any position from&nbsp;
                                        { proteinPosition_SelectionDisplay_Entry.proteinPosition_Start }
                                        &nbsp;to&nbsp;
                                        { proteinPosition_SelectionDisplay_Entry.proteinPosition_End }
                                        &nbsp;in
                                    </span>
                                    <span>
                                        &nbsp;
                                    </span>
                                    <span title={ proteinNameTitle }>
                                        { proteinPosition_SelectionDisplay_Entry.proteinName_Truncated }
                                    </span>
                                </span>
                                <span key={ rootElement_SpanAfter_Key }> </span>  {/* Empty span to allow line breaks */}
                            </span>
                )
                proteinPositionFilter_JSX_Entries.push( jsx );
            }
            index++;
        }
    }

    return (
        <div >
            All peptides must cover: { proteinPositionFilter_JSX_Entries }
        </div>
    )
}




/**
 *
 */
class ProteinPositionFilter_UserSelections_Component_SelectionDisplay_Entry {

    proteinSequenceVersionId : number
    proteinName : string
    proteinName_Truncated : string
    proteinDescription : string
    proteinPosition_Start : number
    proteinPosition_End : number
    proteinFullLengthSelected : boolean
}
