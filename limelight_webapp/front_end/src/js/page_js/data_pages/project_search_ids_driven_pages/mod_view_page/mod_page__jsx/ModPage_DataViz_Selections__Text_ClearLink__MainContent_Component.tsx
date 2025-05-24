/**
 * ModPage_DataViz_Selections__Text_ClearLink__MainContent_Component.tsx
 *
 *
 * Display User selections IN the Graphic showing the Searches and the mods.
 * "Clear Selections" Link
 *
 *
 *
 */

import React from "react";

import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__ModMasses_ProjectSearchIds_Visualization_Selections_SelectedModMassRanges_ForSingleSearch
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";
import {
    ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/ModView_DataViz_Compute_ColorScale_WidthHeight_Etc";
import {
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";

/**
 *
 */
export class ModPage_DataViz_Selections__Text_ClearLink__MainContent_Component_Props_Prop {

    renderOnlyContent_WithoutBorder: boolean
    renderClearLink: boolean

    modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
    modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
    modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
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

    //////////////

    private _clear_Clicked_Callback( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        event.stopPropagation()

        this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().clear_All()

        this.props.propsValue.clear_Clicked_Callback()
    }

    ////////////////////////////////////////

    private _forRender__Create__mods_Display__From_selectionModificationsArray(
        {
            visualization_Selections_SelectedModMassRanges_ForSingleSearch
        } : {
            visualization_Selections_SelectedModMassRanges_ForSingleSearch: ModViewPage_DataVizOptions_VizSelections_PageStateManager__ModMasses_ProjectSearchIds_Visualization_Selections_SelectedModMassRanges_ForSingleSearch
        }
    ) {

        const modMassRanges: Array<INTERNAL__ModificationMass_RangeEntry> = []

        for ( const range_Input of visualization_Selections_SelectedModMassRanges_ForSingleSearch.selectionRanges ) {

            if ( range_Input.rangeStart === range_Input.rangeEnd ) {
                //  Only 1 entry in range
                modMassRanges.push({ start: range_Input.rangeStart, end: undefined })
            } else {
                //  Multiple entries in range
                modMassRanges.push({ start: range_Input.rangeStart, end: range_Input.rangeEnd })
            }
        }

        let massPlural = ""
        if ( modMassRanges.length > 1 || ( modMassRanges.length > 0 && modMassRanges[0].start !== modMassRanges[0].end ) ) {
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

        if ( ! this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().is_AnySelections() ) {

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

            for ( const projectSearchId_Selection_Number of this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().get_Selection_ProjectSearchIds() ) {
                if ( ! projectSearchIds_ThatHave_ALL_ModMasses_Selected.has( projectSearchId_Selection_Number ) ) {
                    allSearchesSelected_Have_All_ModMasses_Selected = false
                    break
                }
            }

            if ( allSearchesSelected_Have_All_ModMasses_Selected ) {

                let searchId_Display: string

                const searchId_Array: Array<number> = []

                for ( const projectSearchId of this.props.propsValue.projectSearchIds ) {

                    const selectionModificationsArray = this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().get_SelectedModMassRanges_ForSingleSearch( projectSearchId )
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
                const projectSearchIds_Selection = Array.from( this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().get_Selection_ProjectSearchIds() )

                if ( projectSearchIds_Selection.length > 1 ) {

                    let selectedModMassRanges_ForSingleSearch_First_Search: ModViewPage_DataVizOptions_VizSelections_PageStateManager__ModMasses_ProjectSearchIds_Visualization_Selections_SelectedModMassRanges_ForSingleSearch
                    {
                        const projectSearchId_First = projectSearchIds_Selection[ 0 ]

                        selectedModMassRanges_ForSingleSearch_First_Search = this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().get_SelectedModMassRanges_ForSingleSearch( projectSearchId_First )
                        if ( ! selectedModMassRanges_ForSingleSearch_First_Search ) {
                            throw Error( "this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().get_SelectedModMassRanges_ForSingleSearch( projectSearchId_First ): " + projectSearchId_First )
                        }
                    }

                    //  Process rest of selections

                    for ( let index__projectSearchIds_Selection = 1; index__projectSearchIds_Selection < projectSearchIds_Selection.length; index__projectSearchIds_Selection++ ) {

                        const projectSearchId_Selection = projectSearchIds_Selection[ index__projectSearchIds_Selection ]

                        const selectedModMassRanges_ForSingleSearch_Selection = this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().get_SelectedModMassRanges_ForSingleSearch( projectSearchId_Selection )
                        if ( ! selectedModMassRanges_ForSingleSearch_Selection ) {
                            throw Error( "this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().get_SelectedModMassRanges_ForSingleSearch( projectSearchId_Selection ): " + projectSearchId_Selection )
                        }

                        if ( selectedModMassRanges_ForSingleSearch_First_Search.selectionRanges.length !== selectedModMassRanges_ForSingleSearch_Selection.selectionRanges.length ) {

                            allSearchesSelected_Have_Same_ModMass_Selections = false
                            break

                        } else {

                            for ( let index = 0; index < selectedModMassRanges_ForSingleSearch_Selection.selectionRanges.length; index++ ) {

                                const selectionRange_First_Search = selectedModMassRanges_ForSingleSearch_First_Search.selectionRanges[ index ]
                                const selectionRange_Selection = selectedModMassRanges_ForSingleSearch_Selection.selectionRanges[ index ]

                                if ( selectionRange_First_Search.rangeStart !== selectionRange_Selection.rangeStart || selectionRange_First_Search.rangeEnd !== selectionRange_Selection.rangeEnd ) {

                                    allSearchesSelected_Have_Same_ModMass_Selections = false
                                    break
                                }
                            }
                        }
                        if ( ! allSearchesSelected_Have_Same_ModMass_Selections ) {
                            break
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

                    const  visualization_Selections_SelectedModMassRanges_ForSingleSearch = this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().get_SelectedModMassRanges_ForSingleSearch( projectSearchId )
                    if ( visualization_Selections_SelectedModMassRanges_ForSingleSearch ) {


                        const searchData = this.props.propsValue.dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )
                        if ( ! searchData ) {
                            throw Error( "this.props.propsValue.dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
                        }

                        if ( ! searches_AND_Mods_Selected_Display_RenderArray ) {
                            searches_AND_Mods_Selected_Display_RenderArray =  []
                        }

                        // const searchIds_And_Label = " in search " + searchData.searchId

                        if ( projectSearchIds_ThatHave_ALL_ModMasses_Selected.has( projectSearchId ) ) {

                            searchId_Array_With_AllModificationMassesSelected.push( searchData.searchId)

                        } else {

                            const mods_Display = this._forRender__Create__mods_Display__From_selectionModificationsArray( {  visualization_Selections_SelectedModMassRanges_ForSingleSearch } )

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

                const projectSearchIds_Selection = Array.from( this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().get_Selection_ProjectSearchIds() )
                const projectSearchId_First = projectSearchIds_Selection[ 0 ]
                const visualization_Selections_SelectedModMassRanges_ForSingleSearch = this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().get_SelectedModMassRanges_ForSingleSearch( projectSearchId_First )
                if ( ! visualization_Selections_SelectedModMassRanges_ForSingleSearch ) {
                    throw Error( "this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().get_SelectedModMassRanges_ForSingleSearch( projectSearchId_First ): " + projectSearchId_First )
                }

                const mods_Display = this._forRender__Create__mods_Display__From_selectionModificationsArray({ visualization_Selections_SelectedModMassRanges_ForSingleSearch })

                let searchId_Display: string

                if ( projectSearchIds_Selection.length === this.props.propsValue.projectSearchIds.length ) {

                    //  ALL Searches

                    searchId_Display = " in all searches"
                } else {

                    //  NOT ALl Searches

                    const searchId_Array: Array<number> = []

                    for ( const projectSearchId of this.props.propsValue.projectSearchIds ) {

                        const visualization_Selections_SelectedModMassRanges_ForSingleSearch = this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().get_SelectedModMassRanges_ForSingleSearch( projectSearchId )
                        if ( visualization_Selections_SelectedModMassRanges_ForSingleSearch ) {

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


        const coreContent = (

            <div>
                { searches_AND_Mods_Selected_Display_RenderArray ? (
                    // Searches have DIFFERENT Mod Mass Selections (From OLD Code)
                    <>
                        <div style={ { fontWeight: "bold" } }>
                            Currently filtering Modification List on:
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
                                            this._render__INTERNAL__ModificationInfo_Single( { modificationInfo_Single: searches_AND_Mods_Selected_Display_Entry.modificationInfo } )
                                        }
                                        { searches_AND_Mods_Selected_Display_Entry.searchIds_And_Label }
                                    </div>
                                )
                            } ) }
                            { searches_AND_Mods_Selected_Different__AllModsSelectedForSearches_Display }
                            { this._render_Clear_Link() }
                        </div>
                    </>
                ) : allSearchesSameModsSelected_SingleDisplayString ? (
                    //  ALL Searches have SAME Mod Mass Selections, display as single string
                    <>
                        <div>
                            {/*  Change to <div> so on separate line  */}
                            <div style={ { fontWeight: "bold" } }>Currently filtering Modification List on: </div>
                            {/*<span style={ { fontWeight: "bold" } }>Currently filtering Modification List on: </span>*/}

                            <span>{ allSearchesSameModsSelected_SingleDisplayString }</span>
                        </div>
                        { this._render_Clear_Link() }
                    </>
                ) : (
                    <>
                        <div>
                            {/*  Change to <div> so on separate line  */ }
                            <div style={ { fontWeight: "bold" } }>Currently filtering Modification List on:</div>
                            {/*<span style={ { fontWeight: "bold" } }>Currently filtering Modification List on: </span>*/ }

                            { this._render__INTERNAL__ModificationInfo_Single( { modificationInfo_Single: allSearchesSameModsSelected_RenderObject.modificationInfo } ) }
                            <span>{ allSearchesSameModsSelected_RenderObject.searchId_Display }</span>
                        </div>
                        { this._render_Clear_Link() }
                    </>
                ) }
            </div>
        )

        if ( this.props.propsValue.renderOnlyContent_WithoutBorder  ) {

            return coreContent
        }

        return (

            <div style={ {
                borderStyle: "solid",
                borderWidth: 4,
                borderColor: "green",
                display: "inline-block",
                padding: 10,
                marginTop: 10
            } }>
                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                    title={
                        <div>
                            <div style={ { marginBottom: 4 } }>
                                This URL contains old style filtering that is no longer supported in general.
                            </div>
                            <div style={ { marginBottom: 4 } }>
                                ONLY The Modification List below is filtered using the following filters. NO other
                                display of data is filtered. No changes to the filters are supported.
                            </div>
                        </div>
                    }
                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                >
                    {/*  Assumes 'coreContent' has ONLY ONE root DOM element  */}
                    { coreContent }
                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
            </div>
        )
    }

    /**
     * called from render()
     */
    private _compute___projectSearchIds_All_Selected(): Set<number> {

        const projectSearchIds_ThatHave_ALL_ModMasses_Selected: Set<number> = new Set()

        if ( ! this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().is_AnySelections() ) {

            //  NOTHING Selected

            return projectSearchIds_ThatHave_ALL_ModMasses_Selected
        }

        const projectSearchId_Selected_Array: Array<number> = Array.from( this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().get_Selection_ProjectSearchIds() )

        for ( const projectSearchId_Selected of projectSearchId_Selected_Array ) {

            const selectedModMasses_Set_For_ProjectSearchId = this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().get_SelectedModMasses_Set_For_ProjectSearchId( projectSearchId_Selected )
            if ( ! selectedModMasses_Set_For_ProjectSearchId ) {
                const msg = "this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().get_SelectedModMasses_Set_For_ProjectSearchId( projectSearchId_Selected ) returned NOTHING for projectSearchId_Selected: " + projectSearchId_Selected
                console.warn( msg )
                throw Error( msg )
            }

            const modMasses_Selected_Set = new Set( selectedModMasses_Set_For_ProjectSearchId )

            //  modMasses_Selected_Set may contain mod masses that are NOT in the search.

            //  If all mod masses for search in 'modMap' are in modMasses_Selected_Set then search is fully selected

            let all_ModMasses_InSearch_AreSelected = true

            for ( const modMap_Entry_Key_ModMass of this.props.propsValue.modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_AllValues() ) {

                const modMass_InSearch = modMap_Entry_Key_ModMass.modMass

                for ( const computeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId_Entry of modMap_Entry_Key_ModMass.get_Data_AllValues() ) {

                    const projectSearchId_Or_SubSearchId = computeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId_Entry.projectSearchId_Or_SubSearchId

                    if ( projectSearchId_Or_SubSearchId === projectSearchId_Selected ) {

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

    private _render_Clear_Link() {

        if ( ! this.props.propsValue.renderClearLink ) {
            return null
        }

        return (
            <div>
                <span
                    className=" fake-link "
                    onClick={ this._clear_Clicked_Callback_BindThis }
                >
                    Remove this filtering
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
                            <span key={ index_modMassRange }>
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