/**
 * ModPage_DataViz_Selections__Text_ClearLink__MainContent_Component.tsx
 *
 *
 * Display User selections IN the Graphic showing the Searches and the mods.
 * "Clear Selections" Link
 *
 *
 * DO NOT call jQuery.empty() on any DOM element
 *
 */

import React from "react";

import {
    ModView_VizOptionsData_SubPart_selectedStateObject
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modView_VizOptionsData";
import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    limelight__Sort_ArrayOfNumbers_SortArrayInPlace
} from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";

/**
 *
 */
export class ModPage_DataViz_Selections__Text_ClearLink__MainContent_Component_Props_Prop {

    selectedStateObject: ModView_VizOptionsData_SubPart_selectedStateObject
    modMap:Map<number,Map<number,any>> //  Map<modMass, Map<projectSearchId, ? >>
    projectSearchIds : Array<number>
    dataPageStateManager_DataFrom_Server: DataPageStateManager

    clear_Clicked_Callback: () => void
}

/**
 *
 */
export interface ModPage_DataViz_Selections__Text_ClearLink__MainContent_Component_Props {

    propsValue : ModPage_DataViz_Selections__Text_ClearLink__MainContent_Component_Props_Prop
}

/**
 *
 */
interface ModPage_DataViz_Selections__Text_ClearLink__MainContent_Component_State {

    forceReRender_Object? : object
}

/**
 *
 */
export class ModPage_DataViz_Selections__Text_ClearLink__MainContent_Component extends React.Component< ModPage_DataViz_Selections__Text_ClearLink__MainContent_Component_Props, ModPage_DataViz_Selections__Text_ClearLink__MainContent_Component_State > {

    //  bind to 'this' for passing as parameters

    private _clear_Clicked_Callback_BindThis = this._clear_Clicked_Callback.bind(this)

    /**
     *
     */
    constructor(props : ModPage_DataViz_Selections__Text_ClearLink__MainContent_Component_Props) {
        super(props);

        this.state = {
            forceReRender_Object: {}
        };
    }


    private _compute___projectSearchIds_All_Selected() : Set<number> {

        const projectSearchIds_ThatHave_ALL_ModMasses_Selected: Set<number> = new Set()

        if ( ( ! this.props.propsValue.selectedStateObject )
            || ( ! this.props.propsValue.selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId )
            || ( this.props.propsValue.selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.size === 0 ) ) {

            //  NOTHING Selected

            return projectSearchIds_ThatHave_ALL_ModMasses_Selected
        }

        const projectSearchId_Selected_Array: Array<number> = Array.from( this.props.propsValue.selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.keys() )

        for ( const projectSearchId_Selected of projectSearchId_Selected_Array ) {

            const modMasses_Selected_Array = this.props.propsValue.selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.get( projectSearchId_Selected )
            if ( ! modMasses_Selected_Array ) {
                const msg = "this.props.propsValue.selectedStateObject.data[ projectSearchId_Selected ] returned NOTHING for projectSearchId_Selected: " + projectSearchId_Selected
                console.warn(msg)
                throw Error(msg)
            }
            const modMasses_Selected_Set = new Set( modMasses_Selected_Array )

            //  modMasses_Selected_Set may contain mod masses that are NOT in the search.

            //  If all mod masses for search in 'modMap' are in modMasses_Selected_Set then search is fully selected

            let all_ModMasses_InSearch_AreSelected = true

            for ( const modMap_Entry_Key_ModMass of this.props.propsValue.modMap ) {

                const modMass_InSearch = modMap_Entry_Key_ModMass[0]

                for ( const projectSearchId__modMap_SubEntry_Key of modMap_Entry_Key_ModMass[1].keys() ) {

                    if ( projectSearchId__modMap_SubEntry_Key === projectSearchId_Selected ) {

                        if ( ! modMasses_Selected_Set.has( modMass_InSearch ) ) {

                            all_ModMasses_InSearch_AreSelected = false
                            break
                        }
                    }
                }
                if ( ! all_ModMasses_InSearch_AreSelected ) {
                    break
                }
            }

            if ( all_ModMasses_InSearch_AreSelected ) {

                projectSearchIds_ThatHave_ALL_ModMasses_Selected.add( projectSearchId_Selected )
            }
        }

        return projectSearchIds_ThatHave_ALL_ModMasses_Selected
    }

    //////////////

    private _clear_Clicked_Callback( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        event.stopPropagation()
        this.props.propsValue.clear_Clicked_Callback()
    }

    ////////////////////////////////////////

    private _forRender__Create__mods_Display__From_selectionModificationsArray(
        {
            selectionModificationsArray
        } : {
            selectionModificationsArray: Array<number>
        }
    ) {

        const modMassRanges: Array<INTERNAL__ModificationMass_RangeEntry> = []

        const selectionModificationsArray_Local_Sorted = Array.from( selectionModificationsArray ) as Array<number>

        limelight__Sort_ArrayOfNumbers_SortArrayInPlace( selectionModificationsArray_Local_Sorted )

        let modMass_RangeStart: number = undefined
        let modMass_Prev: number = undefined

        for ( let index = 0; index < selectionModificationsArray_Local_Sorted.length; index++ ) {
            const modMass = selectionModificationsArray_Local_Sorted[ index ]
            if ( index === 0 ) {
                modMass_RangeStart = modMass
                modMass_Prev = modMass
            } else {
                if ( ( modMass_Prev + 1 ) !== modMass ) {
                    //  Mod mass not contiguous so new range

                    if ( modMass_Prev === modMass_RangeStart ) {
                        //  Only 1 entry in range
                        modMassRanges.push({ start: modMass_RangeStart, end: undefined })
                    } else {
                        //  Multiple entries in range
                        modMassRanges.push({ start: modMass_RangeStart, end: modMass_Prev })
                    }
                    modMass_RangeStart = modMass
                    modMass_Prev = modMass
                }
                modMass_Prev = modMass
            }
        }

        //  Process LAST range
        if ( modMass_Prev === modMass_RangeStart ) {
            //  Only 1 entry in range
            modMassRanges.push({ start: modMass_RangeStart, end: undefined })
        } else {
            //  Multiple entries in range
            modMassRanges.push({ start: modMass_RangeStart, end: modMass_Prev })
        }

        let massPlural = ""
        if ( selectionModificationsArray.length > 1 ) {
            massPlural = "es"
        }

        const results = {
            modMassRanges, labelAtStart: "modification mass" + massPlural + " "
        }

        return results
    }

    /**
     *
     */
    render() {

        if ( ( ! this.props.propsValue.selectedStateObject )
            || ( ! this.props.propsValue.selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId )
            || ( this.props.propsValue.selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.size === 0 ) ) {

            //  NOTHING to Render

            return null  // EARLY RETURN
        }

        const projectSearchIds_ThatHave_ALL_ModMasses_Selected = this._compute___projectSearchIds_All_Selected()


        let allSearchesSameModsSelected_SingleDisplayString: string

        let allSearchesSameModsSelected_RenderObject: {
            modificationInfo: INTERNAL__ModificationInfo_Single
            searchId_Display: string
        }

        //  When Selected Mods Different on Searches

        let searches_AND_Mods_Selected_Display_RenderArray: Array<{
            projectSearchId_ForKey: number
            searchIds_And_Label: string
            modificationInfo: INTERNAL__ModificationInfo_Single
        }> = undefined

        let searches_AND_Mods_Selected_Different__AllModsSelectedForSearches_Display: string


        {  // Check if All Searches Fully Selected

            let allSearchesHave_ALL_ModMasses_Selected = true

            for ( const projectSearchId of this.props.propsValue.projectSearchIds ) {
                if ( ! projectSearchIds_ThatHave_ALL_ModMasses_Selected.has( projectSearchId ) ) {
                    allSearchesHave_ALL_ModMasses_Selected = false
                    break
                }
            }

            if ( allSearchesHave_ALL_ModMasses_Selected ) {

                //  All Searches have All Mod Masses selected so really NOTHING is selected so render nothing

                allSearchesSameModsSelected_SingleDisplayString = "all modification masses in all searches"
            }
        }


        if ( ! allSearchesSameModsSelected_SingleDisplayString ) {

            let allSearchesSelected_Have_All_ModMasses_Selected = true

            for ( const projectSearchId_Selection_Number of this.props.propsValue.selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.keys() ) {
                if ( ! projectSearchIds_ThatHave_ALL_ModMasses_Selected.has( projectSearchId_Selection_Number ) ) {
                    allSearchesSelected_Have_All_ModMasses_Selected = false
                    break
                }
            }

            if ( allSearchesSelected_Have_All_ModMasses_Selected ) {

                let searchId_Display: string

                const searchId_Array: Array<number> = []

                for ( const projectSearchId of this.props.propsValue.projectSearchIds ) {

                    const selectionModificationsArray = this.props.propsValue.selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.get( projectSearchId )
                    if ( selectionModificationsArray ) {

                        const searchData = this.props.propsValue.dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )
                        if ( ! searchData ) {
                            throw Error( "this.props.propsValue.dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
                        }

                        searchId_Array.push( searchData.searchId )
                    }
                }

                if ( searchId_Array.length === 1 ) {
                    searchId_Display = " in search " + searchId_Array[ 0 ].toString()

                } else {
                    const searchId_AllButLast = searchId_Array.slice( 0, searchId_Array.length - 1 )
                    searchId_Display =  " in searches " + searchId_AllButLast.join(", ") + " and " + searchId_Array[ searchId_Array.length - 1 ]
                }

                allSearchesSameModsSelected_SingleDisplayString = "all modification masses" + searchId_Display
            }

        }

        if ( ! allSearchesSameModsSelected_SingleDisplayString ) {

            let allSearchesSelected_Have_Same_ModMass_Selections = true

            {

                if ( this.props.propsValue.selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.size > 1 ) {

                    const projectSearchIds_Selection = Array.from( this.props.propsValue.selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.keys() )

                    let modMassSelections_First_Search: Set<number>
                    {
                        const projectSearchId_First = projectSearchIds_Selection[ 0 ]

                        const selectionModificationsArray = this.props.propsValue.selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.get( projectSearchId_First )
                        if ( ! selectionModificationsArray ) {
                            throw Error( "this.props.propsValue.selectedStateObject.data__New__ModMass_Array_Map_Key_ProjectSearchId.get( projectSearchId_First ) returned NOTHING for projectSearchId_First ( from projectSearchIds_Selection ): " + projectSearchId_First )
                        }
                        modMassSelections_First_Search = new Set( selectionModificationsArray )
                    }

                    //  Process rest of selections

                    for ( let index__projectSearchIds_Selection = 1; index__projectSearchIds_Selection < projectSearchIds_Selection.length; index__projectSearchIds_Selection++ ) {
                        const projectSearchId_Selection = projectSearchIds_Selection[ index__projectSearchIds_Selection ]

                        const selectionModificationsArray = this.props.propsValue.selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.get( projectSearchId_Selection )
                        if ( ! selectionModificationsArray ) {
                            throw Error( "this.props.propsValue.selectedStateObject.data__New__ModMass_Array_Map_Key_ProjectSearchId.get( projectSearchId_First ) returned NOTHING for projectSearchId ( from projectSearchIds_Selection ): " + projectSearchId_Selection )
                        }
                        const selectionModifications_Set = new Set( selectionModificationsArray )
                        if ( selectionModifications_Set.size !== modMassSelections_First_Search.size ) {

                            allSearchesSelected_Have_Same_ModMass_Selections = false
                            break
                        }
                        for ( const selectionModification of selectionModifications_Set ) {
                            if ( ! modMassSelections_First_Search.has( selectionModification ) ) {

                                allSearchesSelected_Have_Same_ModMass_Selections = false
                                break
                            }
                        }
                    }
                }
            }

            if ( ! allSearchesSelected_Have_Same_ModMass_Selections ) {

                //  DIFFERENT Mod mass selections for each search

                const searchId_Array_With_AllModificationMassesSelected: Array<number> = []

                const searches_AND_Mods_Local: Array<{
                    projectSearchId_ForKey: number
                    searchId: number
                    modificationInfo: INTERNAL__ModificationInfo_Single
                }> = []

                for ( const projectSearchId of this.props.propsValue.projectSearchIds ) {

                    const selectionModificationsArray = this.props.propsValue.selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.get( projectSearchId )
                    if ( selectionModificationsArray ) {


                        const searchData = this.props.propsValue.dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )
                        if ( ! searchData ) {
                            throw Error( "this.props.propsValue.dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
                        }

                        if ( ! searches_AND_Mods_Selected_Display_RenderArray ) {
                            searches_AND_Mods_Selected_Display_RenderArray =  []
                        }

                        const searchIds_And_Label = " in search " + searchData.searchId

                        if ( projectSearchIds_ThatHave_ALL_ModMasses_Selected.has( projectSearchId ) ) {

                            searchId_Array_With_AllModificationMassesSelected.push( searchData.searchId)

                        } else {

                            const mods_Display = this._forRender__Create__mods_Display__From_selectionModificationsArray( { selectionModificationsArray } )

                            searches_AND_Mods_Local.push({
                                projectSearchId_ForKey: projectSearchId,
                                searchId: searchData.searchId,
                                modificationInfo: {
                                    labelAtStart: mods_Display.labelAtStart,
                                    modMassRanges: mods_Display.modMassRanges
                                }
                            })
                        }
                    }
                }


                if ( searches_AND_Mods_Local.length === 1 ) {

                    searches_AND_Mods_Selected_Display_RenderArray.push( {
                        projectSearchId_ForKey: searches_AND_Mods_Local[ 0 ].projectSearchId_ForKey,
                        searchIds_And_Label: " in search " + searches_AND_Mods_Local[ 0 ].searchId,
                        modificationInfo: searches_AND_Mods_Local[ 0 ].modificationInfo
                    } )

                } else if ( searches_AND_Mods_Local.length > 1 ) {

                    //  Test if mods selected same across all searches

                    let all_ModsSelections_Same = true

                    {
                        const searches_AND_Mods_Local__FIRST_Entry = searches_AND_Mods_Local[ 0 ]

                        const modificationInfo__FIRST_Entry = searches_AND_Mods_Local__FIRST_Entry.modificationInfo

                        //  Start at SECOND entry
                        for ( let index_searches_AND_Mods_Local = 1; index_searches_AND_Mods_Local < searches_AND_Mods_Local.length; index_searches_AND_Mods_Local++ ) {

                            const searches_AND_Mods_Local_Entry = searches_AND_Mods_Local[ index_searches_AND_Mods_Local ]
                            if ( ! searches_AND_Mods_Local_Entry ) {
                                throw Error("searches_AND_Mods_Local[ index_searches_AND_Mods_Local ] returned NOTHING. index_searches_AND_Mods_Local: " + index_searches_AND_Mods_Local )
                            }
                            if ( searches_AND_Mods_Local_Entry.modificationInfo.modMassRanges.length !== modificationInfo__FIRST_Entry.modMassRanges.length ) {
                                all_ModsSelections_Same = false
                                break
                            }
                            for ( let index_modMassRanges = 0; index_modMassRanges < modificationInfo__FIRST_Entry.modMassRanges.length; index_modMassRanges++ ) {
                                const modMassRange_modificationInfo__FIRST_Entry = modificationInfo__FIRST_Entry.modMassRanges[ index_modMassRanges ]
                                const modMassRange_modificationInfo_ThisEntry = searches_AND_Mods_Local_Entry.modificationInfo.modMassRanges[ index_modMassRanges ]
                                if ( ( ! modMassRange_modificationInfo__FIRST_Entry ) || ( ! modMassRange_modificationInfo_ThisEntry ) ) {
                                    throw Error("( ( ! modMassRange_modificationInfo__FIRST_Entry ) || ( ! modMassRange_modificationInfo_ThisEntry ) ) index_modMassRanges: " + index_modMassRanges )
                                }
                                if ( modMassRange_modificationInfo__FIRST_Entry.start !== modMassRange_modificationInfo_ThisEntry.start || modMassRange_modificationInfo__FIRST_Entry.end !== modMassRange_modificationInfo_ThisEntry.end ) {
                                    all_ModsSelections_Same = false
                                    break
                                }
                            }
                            if ( ! all_ModsSelections_Same ) {
                                break
                            }
                        }
                    }

                    if ( all_ModsSelections_Same ) {

                        //  SAME: All Searches that have Mod Mass Selections have the SAME Mod Mass Selections

                        //  Create one entry for result Array using ALL the Search Ids

                        const all_SearchIds: Array<number> = []
                        for ( const searches_AND_Mods_Local_Entry of searches_AND_Mods_Local ) {
                            all_SearchIds.push( searches_AND_Mods_Local_Entry.searchId )
                        }
                        let searchId_Display: string
                        if ( all_SearchIds.length === 1 ) {
                            searchId_Display = " in search " + all_SearchIds[ 0 ].toString()
                        } else {
                            const searchId_AllButLast = all_SearchIds.slice( 0, all_SearchIds.length - 1 )
                            searchId_Display = " in searches " + searchId_AllButLast.join( ", " ) + " and " + all_SearchIds[ all_SearchIds.length - 1 ]
                        }

                        searches_AND_Mods_Selected_Display_RenderArray.push( {
                            projectSearchId_ForKey: searches_AND_Mods_Local[ 0 ].projectSearchId_ForKey,
                            searchIds_And_Label: searchId_Display,
                            modificationInfo: searches_AND_Mods_Local[ 0 ].modificationInfo //  Arbitrary use first one
                        } )

                    } else {

                        //  DIFFERENT: All Searches that have Mod Mass Selections have DIFFERENT Mod Mass Selections

                        for ( const searches_AND_Mods_Local_Entry of searches_AND_Mods_Local ) {

                            searches_AND_Mods_Selected_Display_RenderArray.push( {
                                projectSearchId_ForKey: searches_AND_Mods_Local_Entry.projectSearchId_ForKey,
                                searchIds_And_Label: " in search " + searches_AND_Mods_Local_Entry.searchId,
                                modificationInfo: searches_AND_Mods_Local_Entry.modificationInfo //  Arbitrary use first one
                            } )

                        }
                    }
                }

                if ( searchId_Array_With_AllModificationMassesSelected.length > 0 ) {
                    let searchId_Display: string
                    if ( searchId_Array_With_AllModificationMassesSelected.length === 1 ) {
                        searchId_Display = " in search " + searchId_Array_With_AllModificationMassesSelected[ 0 ].toString()
                    } else {
                        const searchId_AllButLast = searchId_Array_With_AllModificationMassesSelected.slice( 0, searchId_Array_With_AllModificationMassesSelected.length - 1 )
                        searchId_Display = " in searches " + searchId_AllButLast.join( ", " ) + " and " + searchId_Array_With_AllModificationMassesSelected[ searchId_Array_With_AllModificationMassesSelected.length - 1 ]
                    }
                    searches_AND_Mods_Selected_Different__AllModsSelectedForSearches_Display = "all modification masses" + searchId_Display
                }

            } else {

                //  SAME Mod mass selections for ALL Searches

                const projectSearchIds_Selection = Array.from( this.props.propsValue.selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.keys() )
                const projectSearchId_First = projectSearchIds_Selection[ 0 ]
                const selectionModificationsArray = this.props.propsValue.selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.get( projectSearchId_First )
                if ( ! selectionModificationsArray ) {
                    throw Error( "this.props.propsValue.selectedStateObject.data[ projectSearchId ] returned NOTHING for projectSearchId_First ( from projectSearchIds_Selection ): " + projectSearchId_First )
                }

                const mods_Display = this._forRender__Create__mods_Display__From_selectionModificationsArray({ selectionModificationsArray })

                let searchId_Display: string

                if ( projectSearchIds_Selection.length === this.props.propsValue.projectSearchIds.length ) {

                    //  ALL Searches

                    searchId_Display = " in all searches"
                } else {

                    //  NOT ALl Searches

                    const searchId_Array: Array<number> = []

                    for ( const projectSearchId of this.props.propsValue.projectSearchIds ) {

                        const selectionModificationsArray = this.props.propsValue.selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.get( projectSearchId )
                        if ( selectionModificationsArray ) {

                            const searchData = this.props.propsValue.dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )
                            if ( ! searchData ) {
                                throw Error( "this.props.propsValue.dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
                            }

                            searchId_Array.push( searchData.searchId )
                        }
                    }

                    if ( searchId_Array.length === 1 ) {
                        searchId_Display = " in search " + searchId_Array[ 0 ].toString()

                    } else {
                        const searchId_AllButLast = searchId_Array.slice( 0, searchId_Array.length - 1 )
                        searchId_Display =  " in searches " + searchId_AllButLast.join(", ") + " and " + searchId_Array[ searchId_Array.length - 1 ]
                    }


                }

                allSearchesSameModsSelected_RenderObject = { modificationInfo: mods_Display, searchId_Display }
            }
        }

        // Currently filtering on modification masses 23-456 in search 235.
        // Clear filters (show all searches and mod masses). (link)in the case of one mod mass it would be "mass" instead of "masses".
        //        in the case of more than one search, it would be searches 235 and 236. or searches 235, 236, and 323.
        //
        // and we disable the "control" key to allow crazy selections
        //
        // should probably detect if all searches are selected and just show "all searches" instead of listing them all


        // WARNING WARNING WARNING
        //
        // DO NOT call jQuery.empty() on any DOM element

        return (
            <div>
                <div>
                    { searches_AND_Mods_Selected_Display_RenderArray ? (
                        // Searches have DIFFERENT Mod Mass Selections (From OLD Code)
                        <>
                            <div style={ { fontWeight: "bold" } }>
                                Currently filtering on:
                            </div>
                            <div
                                // style={ { marginLeft: 15 } }  //  Align with above but also maybe then need to indent the fake-link below
                            >
                                { searches_AND_Mods_Selected_Display_RenderArray.map( searches_AND_Mods_Selected_Display_Entry => {
                                    return (
                                        <div
                                            key={ searches_AND_Mods_Selected_Display_Entry.projectSearchId_ForKey }
                                        >
                                            {
                                                this._render__INTERNAL__ModificationInfo_Single({ modificationInfo_Single: searches_AND_Mods_Selected_Display_Entry.modificationInfo })
                                            }
                                            { searches_AND_Mods_Selected_Display_Entry.searchIds_And_Label }
                                        </div>
                                    )
                                })}
                                { searches_AND_Mods_Selected_Different__AllModsSelectedForSearches_Display }
                                { this._render_Clear_Link() }
                            </div>
                        </>
                    ) : allSearchesSameModsSelected_SingleDisplayString ? (
                        //  ALL Searches have SAME Mod Mass Selections, display as single string
                        <>
                            <div>
                                <span style={ { fontWeight: "bold" } }>Currently filtering on: </span>
                                <span>{ allSearchesSameModsSelected_SingleDisplayString }</span>
                            </div>
                            { this._render_Clear_Link() }
                        </>
                    ) : (
                        <>
                            <div>
                                <span style={ { fontWeight: "bold" } }>Currently filtering on: </span>
                                { this._render__INTERNAL__ModificationInfo_Single({ modificationInfo_Single: allSearchesSameModsSelected_RenderObject.modificationInfo }) }
                                <span>{ allSearchesSameModsSelected_RenderObject.searchId_Display }</span>
                            </div>
                            { this._render_Clear_Link() }
                        </>
                    ) }
                </div>



            </div>

        )
    }

    private _render_Clear_Link() {
        return (
            <div>
                <span
                    className=" fake-link "
                    onClick={ this._clear_Clicked_Callback_BindThis }
                >
                    Clear filters (show all searches and mod masses)
                </span>
            </div>
        )
    }

    private _render__INTERNAL__ModificationInfo_Single(
        {
            modificationInfo_Single
        }: {
            modificationInfo_Single: INTERNAL__ModificationInfo_Single
        }
    ): JSX.Element {

        return (
            <span>
                <span>{ modificationInfo_Single.labelAtStart }</span>
                { modificationInfo_Single.modMassRanges ? (
                    modificationInfo_Single.modMassRanges.map( (modMassRange, index_modMassRange) => {
                        return (
                            <span>
                                { index_modMassRange !== 0 ? (
                                    <span>, </span>
                                ) : null }
                                <span>{ modMassRange.start }</span>
                                { modMassRange.end !== undefined && modMassRange.end !== null ? (
                                    <>
                                        <span>&ndash;</span>
                                        { modMassRange.end < 0 ? (
                                            <span>(</span>
                                        ) : null }
                                        { modMassRange.end }
                                        { modMassRange.end < 0 ? (
                                            <span>)</span>
                                        ) : null }
                                    </>
                                ) : null }
                            </span>
                        )
                    })
                ) : (
                    <span>NO Value in modMassRanges</span>
                )}
            </span>
        )

    }

}


class INTERNAL__ModificationInfo_Single {
    labelAtStart: string
    modMassRanges: Array<INTERNAL__ModificationMass_RangeEntry>
}

class INTERNAL__ModificationMass_RangeEntry {
    start: number
    end: number
}