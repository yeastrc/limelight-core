/**
 * ModPage_Download_ModPositionInProtein_Report__DownloadFor_All_Or_SingleModMassRounded_Overlay.tsx
 *
 * '[Download Modification Position in Protein Report]'  User chooses rounded mod mass to download data for
 *
 *
 */

import React from 'react'

import {
    ModalOverlay_Limelight_Component_v001_B_FlexBox
} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering";
import {
    ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root";
import {
    modPage_CreateDownload_ModPositionInProtein_Report, ModPage_CreateDownload_ModPositionInProtein_Report_Result
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__clickable_links_for_downloads_and_view_js/modPage_CreateDownload_ModPositionInProtein_Report";
import {
    limelight__Sort_ArrayOfNumbers_SortArrayInPlace
} from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";
import { StringDownloadUtils } from "page_js/data_pages/data_pages_common/downloadStringAsFile";

/////

const _Overlay_Title = "Download Modification Position in Protein Report"


const _Overlay_Width_Min = 600;
const _Overlay_Width_Max = 1200;
const _Overlay_Height_Min = 400;
const _Overlay_Height_Max_AbsoluteMax = 1000;

//////

/**
 *
 */
export class ModPage_Download_ModPositionInProtein_Report__DownloadForSingleModMassRounded_Overlay_Params {
    projectSearchIds : Array<number>
    modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
    all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
}

/**
 *
 * @param tableRows
 */
export const open_ModPage_Download_ModPositionInProtein_Report__DownloadForSingleModMassRounded_Overlay = function( params: ModPage_Download_ModPositionInProtein_Report__DownloadForSingleModMassRounded_Overlay_Params ) : void {

    let limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder: Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF

    const callbackOn_Cancel_Close_Clicked = () => {

        limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    }

    const overlayComponent = (
        <ModPage_Download_ModPositionInProtein_Report__DownloadForSingleModMassRounded_Overlay_OuterContainer_Component
            props_value={ params }
            callbackOn_Cancel_Close_Clicked={ callbackOn_Cancel_Close_Clicked }
        />
    )

    limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder =
        limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })
}

////  React Components



/**
 *
 */
interface ModPage_Download_ModPositionInProtein_Report__DownloadForSingleModMassRounded_Overlay_OuterContainer_Component_Props {
    props_value: ModPage_Download_ModPositionInProtein_Report__DownloadForSingleModMassRounded_Overlay_Params
    callbackOn_Cancel_Close_Clicked : () => void;
}

/**
 *
 */
interface ModPage_Download_ModPositionInProtein_Report__DownloadForSingleModMassRounded_Overlay_OuterContainer_Component_State {

    force_Rerender?: object
}

/**
 *
 */
class ModPage_Download_ModPositionInProtein_Report__DownloadForSingleModMassRounded_Overlay_OuterContainer_Component extends React.Component< ModPage_Download_ModPositionInProtein_Report__DownloadForSingleModMassRounded_Overlay_OuterContainer_Component_Props, ModPage_Download_ModPositionInProtein_Report__DownloadForSingleModMassRounded_Overlay_OuterContainer_Component_State > {

    private _unmountCalled = false;

    private readonly _modMasses_downloadLinks_Div_Ref :  React.RefObject<HTMLDivElement>

    private _overlay_Height_Max = _Overlay_Height_Max_AbsoluteMax

    /**
     * Filtered to ONLY include mod mass values with Modification Positions.
     *
     * (Excludes entries with ONLY Open Mods Unlocalized (with No positions) )
     *
     * @private
     */
    private _modMasses_ONLY_With_ModificationPositions: Array<number>

    private _modPage_CreateDownload_ModPositionInProtein_Report_Result: ModPage_CreateDownload_ModPositionInProtein_Report_Result


    /**
     *
     */
    constructor(props: ModPage_Download_ModPositionInProtein_Report__DownloadForSingleModMassRounded_Overlay_OuterContainer_Component_Props) {
        super(props);

        this._modMasses_downloadLinks_Div_Ref = React.createRef();

        this.state = {
            force_Rerender: {}
        };
    }

    /**
     *
     */
    componentWillUnmount() {

        this._unmountCalled = true;
    }

    componentDidMount() { try {

        const modPage_CreateDownload_ModPositionInProtein_Report_ResultPromise =
            modPage_CreateDownload_ModPositionInProtein_Report({
                projectSearchIds: this.props.props_value.projectSearchIds,
                modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root: this.props.props_value.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
                all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: this.props.props_value.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
                modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: this.props.props_value.modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.props.props_value.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
            })

        modPage_CreateDownload_ModPositionInProtein_Report_ResultPromise.catch(reason => {})
        modPage_CreateDownload_ModPositionInProtein_Report_ResultPromise.then( modPage_CreateDownload_ModPositionInProtein_Report_Result => { try {

            this._modPage_CreateDownload_ModPositionInProtein_Report_Result = modPage_CreateDownload_ModPositionInProtein_Report_Result

            const modMasses_All = Array.from( modPage_CreateDownload_ModPositionInProtein_Report_Result.downloadDataEntry_Map_Key_modMass_Rounded.keys() )
            limelight__Sort_ArrayOfNumbers_SortArrayInPlace( modMasses_All )

            this._modMasses_ONLY_With_ModificationPositions = modMasses_All

            this.setState({ force_Rerender: {} })

            window.setTimeout( () => { try {

                //  Adjust height of overlay for length of Mod Masses

                const modMasses_downloadLinks_Div_BoundingClientRect  = this._modMasses_downloadLinks_Div_Ref.current.getBoundingClientRect()

                this._overlay_Height_Max = modMasses_downloadLinks_Div_BoundingClientRect.height + 300

                if ( this._overlay_Height_Max < _Overlay_Height_Min ) {
                    this._overlay_Height_Max = _Overlay_Height_Min  //  Reduce overlay height
                }

                this.setState({ force_Rerender: {} })

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     * @param modMass__ForClickedSearch
     */
    private _downloadFor_All_ModMasses() { try {

        const searchIds_Array = this._modPage_CreateDownload_ModPositionInProtein_Report_Result.searchIds_Array

        const downloadDataEntry_Map_Key_modMass_Rounded__Values_Array = Array.from( this._modPage_CreateDownload_ModPositionInProtein_Report_Result.downloadDataEntry_Map_Key_modMass_Rounded.values() )

        downloadDataEntry_Map_Key_modMass_Rounded__Values_Array.sort( (a,b) => {
            if ( a.modMass_Rounded < b.modMass_Rounded ) {
                return -1
            }
            if ( a.modMass_Rounded > b.modMass_Rounded ) {
                return 1
            }
            return 0
        })

        const downloadString_Array: Array<string> = [ this._modPage_CreateDownload_ModPositionInProtein_Report_Result.download_HeaderLines_String, "\n" ] // Header lines and line separator

        for ( const downloadDataEntry_Map_Key_modMass_Rounded__Value of downloadDataEntry_Map_Key_modMass_Rounded__Values_Array ) {
            downloadString_Array.push( downloadDataEntry_Map_Key_modMass_Rounded__Value.downloadData_String )
        }

        const downloadString = downloadString_Array.join("")

        // console.log( downloadString )

        let download_Filename_SearchIdsLabel = "search"

        if ( searchIds_Array.length > 1 ) {
            download_Filename_SearchIdsLabel += "es"
        }

        const download_Filename = 'protein_modification_position_report__' + download_Filename_SearchIdsLabel + "_" + searchIds_Array.join("_") + ".txt"

        StringDownloadUtils.downloadStringAsFile( { stringToDownload : downloadString, filename: download_Filename } );

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     * @param modMass__ForClickedSearch
     */
    private _downloadFor_ModMass( modMass__ForClickedSearch: number ) { try {

        const searchIds_Array = this._modPage_CreateDownload_ModPositionInProtein_Report_Result.searchIds_Array

        const downloadDataEntry_For_modMass_Rounded = this._modPage_CreateDownload_ModPositionInProtein_Report_Result.downloadDataEntry_Map_Key_modMass_Rounded.get( modMass__ForClickedSearch )
        if ( ! downloadDataEntry_For_modMass_Rounded ) {
            const msg = " this._modPage_CreateDownload_ModPositionInProtein_Report_Result.downloadDataEntry_Map_Key_modMass_Rounded.get( modMass__ForClickedSearch ) returned NOTHING for modMass__ForClickedSearch: " + modMass__ForClickedSearch
            console.warn(msg)
            throw Error(msg)
        }

        const downloadString_Array: Array<string> = [ this._modPage_CreateDownload_ModPositionInProtein_Report_Result.download_HeaderLines_String, "\n" ] // Header lines and line separator

        downloadString_Array.push( downloadDataEntry_For_modMass_Rounded.downloadData_String )

        const downloadString = downloadString_Array.join("")

        // console.log( downloadString )

        let download_Filename_SearchIdsLabel = "search"

        if ( searchIds_Array.length > 1 ) {
            download_Filename_SearchIdsLabel += "es"
        }

        const download_Filename = 'protein_modification_position_report__' + download_Filename_SearchIdsLabel + "_" + searchIds_Array.join("_") + ".txt"

        StringDownloadUtils.downloadStringAsFile( { stringToDownload : downloadString, filename: download_Filename } );

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    render(): React.ReactNode { try {

        const modMass_Rounded_Elements: Array<React.JSX.Element> = []

        if ( this._modMasses_ONLY_With_ModificationPositions ) {

            for ( const modMass of this._modMasses_ONLY_With_ModificationPositions ) {

                const element = (
                    <React.Fragment key={ modMass }>
                        {/*<div>*/ }

                        {/*</div>*/ }
                        <div
                            style={ { marginBottom: 20 } }
                        >
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <span>
                                        Click to download data for rounded modification mass
                                    </span>
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <span
                                    className=" fake-link "
                                    onClick={ event => {

                                        this._downloadFor_ModMass( modMass )
                                    } }
                                >
                                    { modMass }
                                </span>
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        </div>
                    </React.Fragment>
                )

                modMass_Rounded_Elements.push( element )
            }
        }

        return (
            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ this._overlay_Height_Max }
                title={ _Overlay_Title }
                callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
                close_OnBackgroundClick={ false }>


                <div
                    className=" change-searches-overlay-outer-block top-level single-entry-variable-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                    style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                    // style={ { padding : 6 } }
                >
                    <div ref={ this._modMasses_downloadLinks_Div_Ref }>

                        { ( ! this._modMasses_ONLY_With_ModificationPositions ) ? (

                            <div>
                                Preparing data...
                            </div>

                        ) : this._modMasses_ONLY_With_ModificationPositions.length === 0 ? (

                            <div>
                                No modifications have positions so no data to download for this report.
                            </div>
                        ) : (
                            <>
                                <div style={ { marginBottom: 20, fontWeight: "bold", fontSize: 18 } }>
                                    Click on a rounded modification mass to download the  Report for that rounded modification mass
                                </div>
                                <div
                                    style={ { marginBottom: 15 } }
                                >
                                    <span
                                        className=" fake-link "
                                        onClick={ event => { this._downloadFor_All_ModMasses() } }
                                    >
                                        Download for all rounded mod masses
                                    </span>
                                </div>
                                <div
                                    // style={ { display: "grid", gridTemplateColumns: "30px auto" } }
                                >
                                    { modMass_Rounded_Elements }
                                </div>
                            </>
                        ) }
                    </div>
                </div>
                <div
                    className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                    // style={ { padding : 6 } }
                >
                    <div style={ { marginTop: 15 } }>
                        <input type="button" value="Close" onClick={ this.props.callbackOn_Cancel_Close_Clicked } />
                    </div>
                </div>
            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
}
