/**
 * scanFileBrowserViewPage__MainPage_Component.tsx
 *
 * MainPage of Scan File Browser -
 *
 */


import React from 'react'
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {
    ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component,
    ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_ScanNumber_Clicked_Callback,
    ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_ScanNumber_Clicked_Callback_Params
} from "page_js/data_pages/scan_file_driven_pages/scan_file_browser_page/scan_file_browser__total_ion_current_of_scans_plot/scanFileBrowser_TotalIonCurrent_OfScans_Plot_Component";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import { ScanFileBrowserPage_SingleScan_UserSelections_StateObject } from "page_js/data_pages/scan_file_driven_pages/scan_file_browser_page/scan_file_browser_page_root/scanFileBrowserPage_SingleScan_UserSelections_StateObject";
import { C13_MASS_DELTA } from "page_js/data_pages/peptide_mass_utils/PeptideMassCalculator";
import {
    ScanFileBrowser_SingleScan_Plot__AutoZoom_Y_Axis_ValueChanged_CallbackFunction_Params,
    ScanFileBrowser_SingleScan_Plot_Main_Container_Component
} from "page_js/data_pages/scan_file_driven_pages/scan_file_browser_page/scan_file_browser__single_scan_plot/scanFileBrowser_SingleScan_Plot_Component";
import { CommonData_LoadedFromServer_From_ProjectScanFileId___ROOT } from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId___ROOT";
import { limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam } from "page_js/common_all_pages/limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam";
import { CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder } from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data";
import {
    CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data__get_ScanData_YES_Peaks_DataHolder__FunctionResult,
    CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber
} from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";

/////////////////////////

const _autoZoom_Y_Axis_Value__DEFAULT = true



/**
 *
 */
export interface ScanFileBrowserViewPage__MainPage_Component_Props_Prop {

    projectScanFileId: number
    pageIsLoaded_From_OtherPage_Using_URL_WithReferrerFlag: boolean
    scanFileBrowserPage_SingleScan_UserSelections_StateObject: ScanFileBrowserPage_SingleScan_UserSelections_StateObject
}

/**
 *
 */
export interface ScanFileBrowserViewPage__MainPage_Component_Props {

    propsValue : ScanFileBrowserViewPage__MainPage_Component_Props_Prop
}

/**
 *
 */
interface ScanFileBrowserViewPage__MainPage_Component_State {

    showLoadingMessage_ForWholeScanFile?: boolean

    scan_DoesNotHave_totalIonCurrent_ForScan?: boolean

    scanData_NO_Peaks_Data_Holder?: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder

    showScanNumber_ErrorMessage?: string

    singleScanData?: CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber

    force_ReRender?: object
}

/**
 *
 */
export class ScanFileBrowserViewPage__MainPage_Component extends React.Component< ScanFileBrowserViewPage__MainPage_Component_Props, ScanFileBrowserViewPage__MainPage_Component_State > {

    //  bind to 'this' for passing as parameters
    private _scanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_ScanNumber_Clicked_Callback_BindThis = this._scanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_ScanNumber_Clicked_Callback.bind(this)

    private _DONOTCALL() {
        const _scanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_ScanNumber_Clicked_Callback: ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_ScanNumber_Clicked_Callback =
            this._scanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_ScanNumber_Clicked_Callback
    }

    private readonly _scanNumber_Input_Ref :  React.RefObject<HTMLInputElement>

    private _commonData_LoadedFromServer_From_ProjectScanFileId___ROOT: CommonData_LoadedFromServer_From_ProjectScanFileId___ROOT

    private _scanFilenames: Array<string>

    private _cached_SingleScanData_For_ScanFileId_Map_Key_ScanNumber = new Map<number,  CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber>()

    private _promise_SingleScanData_Loading__For_ScanFileId_Map_Key_ScanNumber  = new Map<number, Promise<CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data__get_ScanData_YES_Peaks_DataHolder__FunctionResult>>()

    private _scanLevels_ToShow: Set<number> = new Set()

    private _scanNumber_CurrentlyShown: number

    private _autoZoom_Y_Axis_Value = _autoZoom_Y_Axis_Value__DEFAULT

    private _loadingMessage_SingleScanData: boolean = false

    private _pageIsLoaded_From_OtherPage_Using_URL_WithReferrerFlag__InEffect: boolean // Set to false after all tasks complete

    /**
     *
     */
    constructor(props : ScanFileBrowserViewPage__MainPage_Component_Props) {
        super(props);
        try {
            this._scanNumber_Input_Ref = React.createRef();

            this._commonData_LoadedFromServer_From_ProjectScanFileId___ROOT = CommonData_LoadedFromServer_From_ProjectScanFileId___ROOT.getNewInstance()

            if ( props.propsValue.pageIsLoaded_From_OtherPage_Using_URL_WithReferrerFlag ) {
                this._pageIsLoaded_From_OtherPage_Using_URL_WithReferrerFlag__InEffect = true
            }

            this.state = {
                showLoadingMessage_ForWholeScanFile: true,
                force_ReRender: {}
            };

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    componentDidMount() {
        try {
            //  Update Zoom based on incoming page state.  Update the mz range here so at least if page reloaded before single scan loaded at least the mz range is set
            this._update_ZoomRange_Selected_MZ_Min_Max_For_FeatureDetection_IndividualFeature_OR_PSM_Root_InState()

            const get_ProjectScanFilenames_DataHolder_For_ProjectScanFileId_ReturnedPromise =
                this._commonData_LoadedFromServer_From_ProjectScanFileId___ROOT.
                get_commonData_LoadedFromServer__ProjectScanFilenames_Data_For_Single_ProjectScanFileId_MainClass().
                get_ProjectScanFilenames_DataHolder_For_ProjectScanFileId_ReturnPromise( this.props.propsValue.projectScanFileId )

            get_ProjectScanFilenames_DataHolder_For_ProjectScanFileId_ReturnedPromise.catch(reason => { })
            get_ProjectScanFilenames_DataHolder_For_ProjectScanFileId_ReturnedPromise.then(value_get_ProjectScanFilenames_DataHolder_For_ProjectScanFileId_Returned => { try {

                const projectScanFilenames_Data_For_ProjectScanFileId =
                    value_get_ProjectScanFilenames_DataHolder_For_ProjectScanFileId_Returned.commonData_LoadedFromServer__ProjectScanFilenames_Data_Holder.
                    get_ProjectScanFilenames_Data_For_ProjectScanFileId( this.props.propsValue.projectScanFileId )

                if ( ! projectScanFilenames_Data_For_ProjectScanFileId ) {
                    const msg = "value_get_ProjectScanFilenames_DataHolder_For_ProjectScanFileId_Returned.commonData_LoadedFromServer__ProjectScanFilenames_Data_Holder.get_ProjectScanFilenames_Data_For_ProjectScanFileId( this.props.propsValue.projectScanFileId ) returned nothing for this.props.propsValue.projectScanFileId: " + this.props.propsValue.projectScanFileId
                    console.warn(msg)
                    throw Error(msg)
                }

                const projectScanFilenames: Array<string>  = Array.from( projectScanFilenames_Data_For_ProjectScanFileId.projectScanFilenames_ForScanFile_List )

                projectScanFilenames.sort( (a,b) => {
                    return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam(a,b)
                })

                this._scanFilenames = projectScanFilenames

                this._loadData_Populate_State__scanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_Root()

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     * Update MZ Zoom ONLY based on incoming page state
     * @private
     */
    private _update_ZoomRange_Selected_MZ_Min_Max_For_FeatureDetection_IndividualFeature_OR_PSM_Root_InState() {

        if ( this._pageIsLoaded_From_OtherPage_Using_URL_WithReferrerFlag__InEffect ) {

            const featureDetection_IndividualFeature_Root = this.props.propsValue.scanFileBrowserPage_SingleScan_UserSelections_StateObject.get_featureDetection_IndividualFeature_OR_PSM_Root()

            if ( featureDetection_IndividualFeature_Root ) {

                const mz_Min_ZoomRange = featureDetection_IndividualFeature_Root.baseIsotopePeak__Containing_M_Over_Z - ( 1.5 * ( C13_MASS_DELTA / featureDetection_IndividualFeature_Root.charge ) )
                const mz_Max_ZoomRange = featureDetection_IndividualFeature_Root.baseIsotopePeak__Containing_M_Over_Z + ( 4.5 * ( C13_MASS_DELTA / featureDetection_IndividualFeature_Root.charge ) )

                this.props.propsValue.scanFileBrowserPage_SingleScan_UserSelections_StateObject.setZoomRange_Selected( {
                    mz_Min_ZoomRange, mz_Max_ZoomRange, tic_Max_ZoomRange: undefined
                } )
            }
        }
    }

    /**
     *
     */
    private _loadData_Populate_State__scanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_Root() {

        const promise =
            this._commonData_LoadedFromServer_From_ProjectScanFileId___ROOT.
                get_commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data().get_ScanData_NO_Peaks_DataHolder_ReturnPromise({
                projectScanFileId: this.props.propsValue.projectScanFileId, retrieved_ALL_Scans_ForFile: true, get_ParentScanData: undefined, scanNumbers_RetrievedDataFor: undefined
            })

        promise.catch(reason => {  })
        promise.then( getResult => { try {

            const scanData_NO_Peaks_Data_Holder = getResult.scanData_NO_Peaks_Data_Holder;

            let scan_DoesNotHave_totalIonCurrent_ForScan = false

            for ( const scan of scanData_NO_Peaks_Data_Holder.scanData.scansArray ) {

                if ( scan.totalIonCurrent_ForScan === undefined || scan.totalIonCurrent_ForScan === null ) {
                    //  Scan does NOT have totalIonCurrent_ForScan.  CANNOT show this chart

                    scan_DoesNotHave_totalIonCurrent_ForScan = true
                    break
                }
            }

            this._scanLevels_ToShow = new Set()
            this._scanLevels_ToShow.add( 1 ); // Default to 1

            this.setState({
                scanData_NO_Peaks_Data_Holder,
                scan_DoesNotHave_totalIonCurrent_ForScan,
                showLoadingMessage_ForWholeScanFile: false
            })
            // console.warn( "returned from scanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_LoadData: ", value )


            const scanNumber_AtPageLoad = this.props.propsValue.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getScanNumber_Selected()

            if ( scanNumber_AtPageLoad !== undefined && scanNumber_AtPageLoad !== null ) {

                for ( const scan of scanData_NO_Peaks_Data_Holder.scanData.scansArray ) {
                    if ( scan.scanNumber === scanNumber_AtPageLoad ) {

                        // Ensure display scan level for this scan
                        this._scanLevels_ToShow.add(scan.level)

                        this._display_SingleScan_For_ScanNumber({ scanNumber: scanNumber_AtPageLoad })

                        break
                    }
                }

            }

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})


        // const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        // const ctx = canvas.getContext('2d');
        //
        // ctx.fillStyle = 'green';
        //
        // for ( let left = 10; left < 1500; left += 10 ) {
        //     ctx.fillRect(left, 10, 5, 100);
        // }

    }


    ////////////////////////////////////////

    /**
     *
     */
    private _prevScan_Clicked () {
        try {
            let scanNumber_Prev: number = undefined

            for ( let scanNumber_New = ( this._scanNumber_CurrentlyShown - 1 ); scanNumber_New > 0; scanNumber_New-- ) {

                const scanEntry = this.state.scanData_NO_Peaks_Data_Holder.scanData.get_ScanData_NO_Peaks_For_ScanNumber(scanNumber_New)
                if ( ! scanEntry ) {
                    // no entry so skip
                    continue; // EARLY CONTINUE
                }

                //  Remove checking that scan is selected scan number

                // if ( ! this._scanLevels_ToShow.has( scanEntry.level ) ) {
                //     //  Not for selected scan level so skip
                //     continue; // EARLY CONTINUE
                // }

                scanNumber_Prev = scanNumber_New

                //  Exit loop since have new scan number
                break;
            }

            if ( scanNumber_Prev === undefined ) {
                // No new scan number so exit
                return; // EARLY RETURN
            }

            this._display_SingleScan_For_ScanNumber({ scanNumber: scanNumber_Prev })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _nextScan_Clicked () {
        try {
            let scanNumber_Next: number = undefined

            const scanNumber_Max = this.state.scanData_NO_Peaks_Data_Holder.scanData.get_scanNumber_Max()

            for ( let scanNumber_New = ( this._scanNumber_CurrentlyShown + 1 ); scanNumber_New <= scanNumber_Max; scanNumber_New++ ) {

                const scanEntry = this.state.scanData_NO_Peaks_Data_Holder.scanData.get_ScanData_NO_Peaks_For_ScanNumber(scanNumber_New)
                if ( ! scanEntry ) {
                    // no entry so skip
                    continue; // EARLY CONTINUE
                }

                //  Remove checking that scan is selected scan number

                // if ( ! this._scanLevels_ToShow.has( scanEntry.level ) ) {
                //     //  Not for selected scan level so skip
                //     continue; // EARLY CONTINUE
                // }

                scanNumber_Next = scanNumber_New

                //  Exit loop since have new scan number
                break;
            }

            if ( scanNumber_Next === undefined ) {
                // No new scan number so exit
                return; // EARLY RETURN
            }

            this._display_SingleScan_For_ScanNumber({ scanNumber: scanNumber_Next })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     * @param event
     */
    private _show_EnteredScanNumber_FormSubmit( event: React.FormEvent<HTMLFormElement> ) {

        if ( ! this._scanNumber_Input_Ref.current ) {
            return; // EARLY RETURN
        }
        const valueString = this._scanNumber_Input_Ref.current.value;
        if ( valueString === "" ) {
            return; // EARLY RETURN
        }
        const scanNumber = Number.parseInt(valueString);
        if ( Number.isNaN( scanNumber ) ) {

            this.setState({ showScanNumber_ErrorMessage: "Value entered is not a number" })

            return; // EARLY RETURN
        }

        {
            const scanData_For_ScanNumber = this.state.scanData_NO_Peaks_Data_Holder.scanData.get_ScanData_NO_Peaks_For_ScanNumber( scanNumber );

            if ( ! scanData_For_ScanNumber  ) {

                this.setState({ showScanNumber_ErrorMessage: "Scan number not in scan file: " + scanNumber })

                return; // EARLY RETURN
            }
        }

        this.setState( (prevState, props) => {
            if ( prevState.showScanNumber_ErrorMessage === undefined || prevState.showScanNumber_ErrorMessage === null ) {
                return null;
            }
            return { showScanNumber_ErrorMessage: null} // clear error message
        })

        if ( this._scanNumber_CurrentlyShown === scanNumber ) {
            //  Currently showing or loading this scan number so skip

            return; // EARLY RETURN
        }

        this._display_SingleScan_For_ScanNumber({ scanNumber: scanNumber })
    }

    /**
     *
     */
    private _scanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_ScanNumber_Clicked_Callback(params: ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_ScanNumber_Clicked_Callback_Params) : void {

        // console.warn("_scanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_ScanNumber_Clicked_Callback called. params.scanNumber: " + params.scanNumber )

        if ( params.scanNumber === undefined || params.scanNumber === null ) {
            //  No Scan at Clicked Line
            return; // EARLY RETURN
        }

        if ( this._scanNumber_CurrentlyShown === params.scanNumber ) {
            //  Currently showing or loading this scan number so skip
            return; // EARLY RETURN
        }

        this._display_SingleScan_For_ScanNumber({ scanNumber: params.scanNumber })
    }

    /**
     *
     * @param scanNumber
     */
    private _display_SingleScan_For_ScanNumber(
        {
            scanNumber
        } : {
            scanNumber: number
        }
    ) {
        if ( this.props.propsValue.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getScanNumber_Selected() !== scanNumber ) {

            // Scan Number Changed SO Update State Object and URl with currently selected scan number

            this.props.propsValue.scanFileBrowserPage_SingleScan_UserSelections_StateObject.setScanNumber_Selected( scanNumber )
        }

        this._scanNumber_CurrentlyShown = scanNumber

        const singleScanData = this._cached_SingleScanData_For_ScanFileId_Map_Key_ScanNumber.get(scanNumber);

        if ( singleScanData ) {
            //  Already have data to display
            this._show_SingleScanData({ singleScanData });

            return; // EARLY RETURN
        }

        this._loadingMessage_SingleScanData = true;

        this.setState({ force_ReRender: {} })

        {
            const promise = this._promise_SingleScanData_Loading__For_ScanFileId_Map_Key_ScanNumber.get(scanNumber)
            if ( promise ) {
                // Already loading for scan number

                promise.then(value => { try {

                    if ( ! value.scanData_YES_Peaks_Data_Holder ) {
                        throw Error( "( ! value.scanData_YES_Peaks_Data_Holder ) " );
                    }

                    const scanData_YES_Peaks_For_ScanNumber = value.scanData_YES_Peaks_Data_Holder.scanData.get_ScanData_YES_Peaks_For_ScanNumber( scanNumber )

                    if ( ! scanData_YES_Peaks_For_ScanNumber ) {
                        throw Error("value.scanData_YES_Peaks_Data_Holder.scanData.get_ScanData_YES_Peaks_For_ScanNumber( scanNumber ) returned NOTHING.  NO Scan data for scan number: " + scanNumber );
                    }

                    const singleScanData = scanData_YES_Peaks_For_ScanNumber

                    this._cached_SingleScanData_For_ScanFileId_Map_Key_ScanNumber.set(scanNumber, singleScanData);

                    if ( this._scanNumber_CurrentlyShown !== singleScanData.scanNumber ) {
                        //  NO longer currently showing this scan number so return
                        return; // EARLY RETURN
                    }

                    //  Display now that data is loaded
                    this._show_SingleScanData({ singleScanData });

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                return;  // EARLY RETURN
            }
        }

        const promise =
            //  Called Code NOT Currently caching result !!!!
            this._commonData_LoadedFromServer_From_ProjectScanFileId___ROOT.
            get_commonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data().get_ScanData_YES_Peaks_DataHolder_ReturnPromise({
                projectScanFileId: this.props.propsValue.projectScanFileId, scanNumberList: [ scanNumber ], m_over_Z_Ranges: undefined, yes_CacheResults_InJS: true
            })

        this._promise_SingleScanData_Loading__For_ScanFileId_Map_Key_ScanNumber.set(scanNumber, promise)

        promise.catch(reason => {
            this._promise_SingleScanData_Loading__For_ScanFileId_Map_Key_ScanNumber.delete(scanNumber)
        })
        promise.then(value => { try {

            this._promise_SingleScanData_Loading__For_ScanFileId_Map_Key_ScanNumber.delete(scanNumber)

            if ( ! value.scanData_YES_Peaks_Data_Holder ) {
                throw Error( "( ! value.scanData_YES_Peaks_Data_Holder ) " );
            }

            const scanData_YES_Peaks_For_ScanNumber = value.scanData_YES_Peaks_Data_Holder.scanData.get_ScanData_YES_Peaks_For_ScanNumber( scanNumber )

            if ( ! scanData_YES_Peaks_For_ScanNumber ) {
                throw Error("value.scanData_YES_Peaks_Data_Holder.scanData.get_ScanData_YES_Peaks_For_ScanNumber( scanNumber ) returned NOTHING.  NO Scan data for scan number: " + scanNumber );
            }

            const singleScanData = scanData_YES_Peaks_For_ScanNumber

            this._cached_SingleScanData_For_ScanFileId_Map_Key_ScanNumber.set(scanNumber, singleScanData);

            if ( this._scanNumber_CurrentlyShown !== singleScanData.scanNumber ) {
                //  NO longer currently showing this scan number so return
                return; // EARLY RETURN
            }

            this._show_SingleScanData({ singleScanData });

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    /**
     *
     */
    private _show_SingleScanData(
        {
            singleScanData
        } : {
            singleScanData: CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber
        }
    ) : void {

        this._loadingMessage_SingleScanData = false;

        if ( this._pageIsLoaded_From_OtherPage_Using_URL_WithReferrerFlag__InEffect ) {

            {
                //  Update Zoom based on incoming page state

                const featureDetection_IndividualFeature_Root = this.props.propsValue.scanFileBrowserPage_SingleScan_UserSelections_StateObject.get_featureDetection_IndividualFeature_OR_PSM_Root()

                if ( featureDetection_IndividualFeature_Root ) {

                    //   Zoom MZ range updated in this._update_ZoomRange_Selected_MZ_Min_Max_For_FeatureDetection_IndividualFeature_OR_PSM_Root_InState(), called from componentDidMount()

                    const zoomRange_Selected_Existing = this.props.propsValue.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected()

                    if ( ! zoomRange_Selected_Existing ) {
                        const msg = " ( this._pageIsLoaded_From_OtherPage_Using_URL_WithReferrerFlag__InEffect ) AND this.props.propsValue.scanFileBrowserPage_SingleScan_UserSelections_StateObject.get_featureDetection_IndividualFeature_OR_PSM_Root() AND ( ! this.props.propsValue.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected() )"
                        console.warn(msg)
                        throw Error(msg)
                    }
                    if ( ( ! zoomRange_Selected_Existing.mz_Min_ZoomRange ) || ( ! zoomRange_Selected_Existing.mz_Max_ZoomRange ) ) {
                        const msg = " ( this._pageIsLoaded_From_OtherPage_Using_URL_WithReferrerFlag__InEffect ) AND this.props.propsValue.scanFileBrowserPage_SingleScan_UserSelections_StateObject.get_featureDetection_IndividualFeature_OR_PSM_Root() AND ( ( ! zoomRange_Selected_Existing.mz_Min_ZoomRange ) || ( ! zoomRange_Selected_Existing.mz_Max_ZoomRange ) )"
                        console.warn(msg)
                        throw Error(msg)
                    }

                    const mz_Min_ZoomRange = zoomRange_Selected_Existing.mz_Min_ZoomRange
                    const mz_Max_ZoomRange = zoomRange_Selected_Existing.mz_Max_ZoomRange

                    let scanPeak_LargestIntensity_In_MZ_Range = 0

                    for ( const scanPeak of singleScanData.peaks ) {

                        if ( scanPeak.mz >= mz_Min_ZoomRange && scanPeak.mz <= mz_Max_ZoomRange ) {

                            if ( scanPeak_LargestIntensity_In_MZ_Range < scanPeak.intensity ) {
                                scanPeak_LargestIntensity_In_MZ_Range = scanPeak.intensity
                            }
                        }
                    }

                    const tic_Max_ZoomRange = Math.ceil( scanPeak_LargestIntensity_In_MZ_Range * 1.1 )  // 110% of max peak

                    this.props.propsValue.scanFileBrowserPage_SingleScan_UserSelections_StateObject.setZoomRange_Selected( {
                        mz_Min_ZoomRange, mz_Max_ZoomRange, tic_Max_ZoomRange
                    } )
                }
            }
        }

        this._pageIsLoaded_From_OtherPage_Using_URL_WithReferrerFlag__InEffect = false

        this.setState({ singleScanData });
    }

    ////////////////////////////////////////

    /**
     *
     */
    render() {
        try {
            if ( this.state.showLoadingMessage_ForWholeScanFile ) {

                return (  //  EARLY RETURN

                    <div>
                        <div style={ { fontSize: 18, fontWeight: "bold" } }>
                            Loading Data...
                        </div>
                        <div style={ { marginTop: 80, marginBottom: 80 } }>
                            <Spinner_Limelight_Component/>
                        </div>
                    </div>
                )
            }

            const _OVERALL_CONTAINER_WITH_BORDER_PADDING = 10

            return (
                <div style={ { marginBottom: 20 } }>

                    { this._scanFilenames ? (
                        <div
                            style={ { fontSize: 18, fontWeight: "bold", marginBottom: 10 } }
                            title={ this._scanFilenames.length === 1 ? "Scan Filename" : "Scan Filenames" }
                        >
                            { this._scanFilenames.join( ", " ) }
                        </div>
                    ) : null }

                    { ( this.state.scanData_NO_Peaks_Data_Holder || this.state.scan_DoesNotHave_totalIonCurrent_ForScan ) ? (

                        <React.Fragment>

                            <div
                                className=" standard-background-color "
                                style={ { marginBottom: 10, borderStyle: "solid", borderWidth: 1, padding: _OVERALL_CONTAINER_WITH_BORDER_PADDING } }
                            >
                                <div style={ { fontSize: 18, fontWeight: "bold" } }>
                                    File TIC Chromatogram
                                </div>

                                { this.state.scan_DoesNotHave_totalIonCurrent_ForScan ? (

                                    //  Really old Spectr data does NOT have Total Ion Current per Scan

                                    <div style={ { marginTop: 10 } }>
                                        Scan data does NOT have Total Ion Current.  Cannot show Data.
                                    </div>

                                ) : this.state.scanData_NO_Peaks_Data_Holder ? (

                                    <>
                                        <div style={ { marginTop: 5, marginBottom: 10 } }>
                                            <span>
                                                Show data for scan level:
                                            </span>
                                            { this.state.scanData_NO_Peaks_Data_Holder.scanData.get_scanLevels_ArraySorted().map(( scanLevel, index, array) => {
                                                return (
                                                    <React.Fragment key={ scanLevel }>
                                                        <span> </span>
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                defaultChecked={ this._scanLevels_ToShow.has( scanLevel ) }
                                                                // checked={ this._scanLevels_ToShow.has( scanLevel ) }
                                                                onChange={ event => {
                                                                    if ( event.target.checked ) {
                                                                        this._scanLevels_ToShow.add(scanLevel)
                                                                    } else {
                                                                        this._scanLevels_ToShow.delete(scanLevel)
                                                                    }

                                                                    this.setState({ force_ReRender: {} })
                                                                }}
                                                            />
                                                            <span>{ scanLevel }</span>
                                                        </label>
                                                    </React.Fragment>
                                                )
                                            })}
                                        </div>

                                        { ( this._scanLevels_ToShow.size === 0 ) ? (

                                            <div>
                                                No scan levels selected.
                                            </div>

                                        ) : (
                                            <>
                                                <div style={ { marginBottom: 5 } }>
                                                    Click in plot to select a scan or enter scan number below.
                                                </div>

                                                <ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component
                                                    projectScanFileId={ this.props.propsValue.projectScanFileId }
                                                    scanLevels_ToDisplay={ this._scanLevels_ToShow }
                                                    scanNumber_Selected={ this._scanNumber_CurrentlyShown }
                                                    scanData_NO_Peaks_Data_Holder={ this.state.scanData_NO_Peaks_Data_Holder }
                                                    scanNumber_Clicked_Callback={ this._scanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_ScanNumber_Clicked_Callback_BindThis }
                                                />
                                            </>
                                        )}

                                    </>
                                ) : null }

                            </div>

                        </React.Fragment>

                    ) : null }

                    <div
                        className=" standard-background-color "
                        style={ { borderStyle: "solid", borderWidth: 1, padding: _OVERALL_CONTAINER_WITH_BORDER_PADDING } }
                    >

                        <div style={ { fontSize: 18, fontWeight: "bold" } }>

                        { this._scanNumber_CurrentlyShown === undefined || this._scanNumber_CurrentlyShown === null ? (

                            <span>Enter scan number to show or click in File TIC Chromatogram above to select a scan to show</span>
                        ) : (
                            <span>Selected Scan</span>
                        ) }

                        </div>

                        <div style={ { marginTop: 10, marginBottom: 10 } }>

                            { this.state.singleScanData ? (

                                <React.Fragment>
                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={
                                            <span>
                                                Within selected scan levels
                                            </span>
                                        }
                                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                    >
                                        <button
                                            style={ { marginRight: 10 } }
                                            onClick={ event => { this._prevScan_Clicked() } }
                                        >
                                            Previous Scan
                                        </button>
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                    <span > </span>
                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={
                                            <span>
                                                Within selected scan levels
                                            </span>
                                        }
                                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                    >
                                        <button
                                            style={ { marginRight: 10 } }
                                            onClick={ event => { this._nextScan_Clicked() } }
                                        >
                                            Next Scan
                                        </button>
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                    <span> </span>
                                </React.Fragment>
                            ) : null }


                            <div style={ { display: "inline-block" } }>
                                <span style={ { whiteSpace: "nowrap" } }>
                                    <form onSubmit={ event => {
                                        event.preventDefault()
                                        event.stopPropagation()
                                        this._show_EnteredScanNumber_FormSubmit(event)
                                    }}>
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                <span>
                                                    Enter scan number to show and click button
                                                </span>
                                            }
                                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                        >
                                            <input
                                                ref={ this._scanNumber_Input_Ref }
                                                style={ { width: 60 } }
                                                placeholder="scan #"
                                            />
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                        <span> </span>
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                <span>
                                                    Close
                                                </span>
                                            }
                                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                        >
                                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                title={
                                                    <span>
                                                        Show entered scan number
                                                    </span>
                                                }
                                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                            >
                                                <button>
                                                    Show Scan
                                                </button>
                                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                        { this.state.showScanNumber_ErrorMessage ? (
                                            <>
                                                <span> </span>
                                                <span style={ { color: "red" } }>{ this.state.showScanNumber_ErrorMessage }</span>
                                            </>
                                        ) : null }
                                    </form>
                                </span>
                            </div>
                        </div>

                        { this.state.singleScanData ? (

                            <React.Fragment>

                                <div style={ { position: "relative" } }>
                                    { this.state.singleScanData ? (
                                    <ScanFileBrowser_SingleScan_Plot_Main_Container_Component
                                        key={ this.state.singleScanData.scanNumber } //  'key=' added so React creates a NEW component when the scan number changes.
                                        scanData_YES_Peaks_DataForSingleScanNumber={ this.state.singleScanData }
                                        scanFileBrowserPage_SingleScan_UserSelections_StateObject={ this.props.propsValue.scanFileBrowserPage_SingleScan_UserSelections_StateObject }
                                        autoZoom_Y_Axis_Value={ this._autoZoom_Y_Axis_Value }
                                        autoZoom_Y_Axis_ValueChanged_Callback={ ( params : ScanFileBrowser_SingleScan_Plot__AutoZoom_Y_Axis_ValueChanged_CallbackFunction_Params ) => {

                                            this._autoZoom_Y_Axis_Value = params.autoZoom_Y_Axis_Value
                                        }}
                                    />
                                    ) : null }

                                    { this._loadingMessage_SingleScanData ? (

                                        <div
                                            className=" standard-background-color "
                                            style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
                                        >
                                            <div style={ { marginTop: 60, textAlign: "center" }}>
                                                LOADING DATA
                                            </div>
                                            <div style={ { marginTop: 80, marginBottom: 80, textAlign: "center" }}>
                                                <Spinner_Limelight_Component/>
                                            </div>
                                        </div>
                                    ) : null }
                                </div>

                            </React.Fragment>
                        ): null}
                    </div>
                </div>
            );

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

}

