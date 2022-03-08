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
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";

//  Set since what is returned is put into an Array.  Simply set to root function name.
const _ROOT_REACT_ELEMENT_RETURNED__KEY = "currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections";

const _PROTEIN_NAME_TRUNCATION = 20;


export class CurrentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_GetData_Callback_ReturnedValue {
    proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
    promise_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : Promise<ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data>
}

export type CurrentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_GetData_Callback =
    () => CurrentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_GetData_Callback_ReturnedValue

/**
 *
 * @param proteinPositionFilter_UserSelections_StateObject
 * @param proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
 */
export const currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections = function (
    {
        proteinPositionFilter_UserSelections_StateObject,
        proteinPositionFilter_UserSelections_StateObject_Changed_ForceRebuildRender_Object, //  Change reference when proteinPositionFilter_UserSelections_StateObject changes
        proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
        currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_GetData_Callback
    } : {
        proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject;
        proteinPositionFilter_UserSelections_StateObject_Changed_ForceRebuildRender_Object: object //  Change reference when proteinPositionFilter_UserSelections_StateObject changes
        // one of next 2 is required
        proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
        currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_GetData_Callback: CurrentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_GetData_Callback
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
                proteinPositionFilter_UserSelections_StateObject_Changed_ForceRebuildRender_Object={ proteinPositionFilter_UserSelections_StateObject_Changed_ForceRebuildRender_Object }
                proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data={ proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data }
                currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_GetData_Callback={ currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_GetData_Callback }
            />
        </React.Fragment>
    );
}

/**
 *
 */
export interface CurrentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_Props {

    proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject;
    proteinPositionFilter_UserSelections_StateObject_Changed_ForceRebuildRender_Object: object

    proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
    currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_GetData_Callback: CurrentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_GetData_Callback
}

/**
 *
 */
interface CurrentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_State {

    proteinPosition_SelectionDisplay_Entries? : Array<ProteinPositionFilter_UserSelections_Component_SelectionDisplay_Entry>
}

/**
 *
 */
export class CurrentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections extends React.Component< CurrentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_Props, CurrentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_State > {

    //  bind to 'this' for passing as parameters

    private _proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data: ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data


    /**
     *
     */
    constructor(props: CurrentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_Props) {
        super(props);

        this._proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data = props.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data;

        let proteinPosition_SelectionDisplay_Entries : Array<ProteinPositionFilter_UserSelections_Component_SelectionDisplay_Entry> = undefined;

        if ( props.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data ) {
            proteinPosition_SelectionDisplay_Entries = _create__proteinPosition_SelectionDisplay_Entries({
                proteinPositionFilter_UserSelections_StateObject: props.proteinPositionFilter_UserSelections_StateObject,
                proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data: props.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
            })
        }

        this.state = {
            proteinPosition_SelectionDisplay_Entries  // Conditionally populated at construction time
        };
    }

    /**
     *
     */
    componentDidMount() { try {

        if ( ! this.state.proteinPosition_SelectionDisplay_Entries ) {

            if ( ! this.props.currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_GetData_Callback ) {
                const msg = "componentDidMount(): ( ! this.state.proteinPosition_SelectionDisplay_Entries ) and ( ! this.props.currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_GetData_Callback )"
                console.warn(msg)
                throw Error(msg)
            }

            this._get_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data__then___create__proteinPosition_SelectionDisplay_Entries();
        }

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    shouldComponentUpdate(nextProps: Readonly<CurrentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_Props>, nextState: Readonly<CurrentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_State>, nextContext: any): boolean {

        if (
            nextProps.proteinPositionFilter_UserSelections_StateObject_Changed_ForceRebuildRender_Object !== this.props.proteinPositionFilter_UserSelections_StateObject_Changed_ForceRebuildRender_Object
            || nextState.proteinPosition_SelectionDisplay_Entries !== this.state.proteinPosition_SelectionDisplay_Entries
         ) {
            return  true;
        }

        return false;
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<CurrentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_Props>, prevState: Readonly<CurrentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_State>, snapshot?: any) {
        try {
            if ( prevProps.proteinPositionFilter_UserSelections_StateObject_Changed_ForceRebuildRender_Object !== this.props.proteinPositionFilter_UserSelections_StateObject_Changed_ForceRebuildRender_Object ) {

                this._get_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data__then___create__proteinPosition_SelectionDisplay_Entries()
            }

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _get_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data__then___create__proteinPosition_SelectionDisplay_Entries() {

        if ( this._proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data ) {

            this._create__proteinPosition_SelectionDisplay_Entries_ThenSetState()

            return;  // EARLY RETURN
        }

        const currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_GetData_Callback_Result =
            this.props.currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_GetData_Callback()

        if ( currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_GetData_Callback_Result.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data ) {


            this._proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data = currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_GetData_Callback_Result.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data;

            this._create__proteinPosition_SelectionDisplay_Entries_ThenSetState()

        } else if ( currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_GetData_Callback_Result.promise_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data ) {

            currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_GetData_Callback_Result.promise_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data.catch(reason => {

            })
            currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_GetData_Callback_Result.
            promise_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data.then(proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data => { try {

                this._proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data = proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data;

                this._create__proteinPosition_SelectionDisplay_Entries_ThenSetState()

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } else {
            throw Error("currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_GetData_Callback_Result no 'proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data' or 'promise_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data'")
        }

    }

    /**
     *
     */
    private _create__proteinPosition_SelectionDisplay_Entries_ThenSetState() {

        const proteinPosition_SelectionDisplay_Entries = _create__proteinPosition_SelectionDisplay_Entries({
            proteinPositionFilter_UserSelections_StateObject: this.props.proteinPositionFilter_UserSelections_StateObject,
            proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data: this._proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
        })

        this.setState({ proteinPosition_SelectionDisplay_Entries })
    }

    /**
     *
     */
    render() {

        let proteinPositionFilter_JSX_Entries : Array<JSX.Element> = null;
        let loadingMessage: JSX.Element = null;

        if ( this.state.proteinPosition_SelectionDisplay_Entries ) {
            proteinPositionFilter_JSX_Entries = _create_RenderElements({proteinPosition_SelectionDisplay_Entries: this.state.proteinPosition_SelectionDisplay_Entries});
        } else {
            loadingMessage = (
                <span>Loading Data...</span>
            )
        }

        return (
            <div >
                All peptides must cover: { proteinPositionFilter_JSX_Entries } { loadingMessage }
            </div>
        )
    }

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


/////  NON Class Functions


/**
 *
 */
const _create__proteinPosition_SelectionDisplay_Entries = function(
    {
        proteinPositionFilter_UserSelections_StateObject, proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
    } : {
        proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject;
        proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
    }
) : Array<ProteinPositionFilter_UserSelections_Component_SelectionDisplay_Entry> {

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

    return proteinPosition_SelectionDisplay_Entries;
}

/**
 *
 * @param proteinPosition_SelectionDisplay_Entries
 * @private
 */
const _create_RenderElements = function(
    {
        proteinPosition_SelectionDisplay_Entries
    } : {
        proteinPosition_SelectionDisplay_Entries? : Array<ProteinPositionFilter_UserSelections_Component_SelectionDisplay_Entry>
    }
) : Array<JSX.Element> {

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

    return proteinPositionFilter_JSX_Entries;
}