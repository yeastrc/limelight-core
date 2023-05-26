/**
 * scanFileBrowserViewPage__MainPage_Component.tsx
 *
 * MainPage of Scan File Browser -
 *
 */


import React from 'react'
import {
    ScanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_ForSingleScanNumber,
    scanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_LoadData,
    ScanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_Root
} from "page_js/data_pages/scan_file_driven_pages/scan_file_browser_page/scan_file_browser__get_data/scanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_LoadData";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {
    ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber,
    scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber_LoadData,
    ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_Root
} from "page_js/data_pages/scan_file_driven_pages/scan_file_browser_page/scan_file_browser__get_data/scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_LoadData";
import {ScanFileBrowser_SingleScan_Plot_Component} from "page_js/data_pages/scan_file_driven_pages/scan_file_browser_page/scan_file_browser__single_scan_plot/scanFileBrowser_SingleScan_Plot_Component";
import {
    ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component,
    ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_ScanNumber_Clicked_Callback,
    ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_ScanNumber_Clicked_Callback_Params
} from "page_js/data_pages/scan_file_driven_pages/scan_file_browser_page/scan_file_browser__total_ion_current_of_scans_plot/scanFileBrowser_TotalIonCurrent_OfScans_Plot_Component";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";

/////////////////////////

/**
 *
 */
export interface ScanFileBrowserViewPage__MainPage_Component_Props_Prop {

    projectScanFileId: number
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

    scanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_Root?: ScanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_Root

    showScanNumber_ErrorMessage?: string

    singleScanData?: ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber

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

    private _cached_SingleScanData_For_ScanFileId_Map_Key_ScanNumber = new Map<number, ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber>()

    private _promise_SingleScanData_Loading__For_ScanFileId_Map_Key_ScanNumber  = new Map<number, Promise<ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_Root>>()

    private _scanLevels_ToShow: Set<number> = new Set()

    private _scanNumber_CurrentlyShown: number

    /**
     *
     */
    constructor(props : ScanFileBrowserViewPage__MainPage_Component_Props) {
        super(props);
        try {
            this._scanNumber_Input_Ref = React.createRef();

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
            this._loadData_Populate_State__scanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_Root()

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _loadData_Populate_State__scanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_Root() {

        const promise =
            scanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_LoadData({ projectScanFileId: this.props.propsValue.projectScanFileId })

        promise.catch(reason => {  })
        promise.then(scanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_Root => { try {

            //  TODO  FAKE  'FAKE_FOR_TESTING'

            // const scanNumber_ShowOnLoad__FAKE_FOR_TESTING = 31370;
            //
            // let found__scanNumber_ShowOnLoad__FAKE_FOR_TESTING = false;

            for ( const scan of scanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_Root.get_SpectralStorage_NO_Peaks_DataForSingleScanNumberEntries_IterableIterator() ) {
                if ( scan.totalIonCurrent_ForScan === undefined || scan.totalIonCurrent_ForScan === null ) {
                    //  Scan does NOT have totalIonCurrent_ForScan.  CANNOT show this chart

                    this.setState({ scan_DoesNotHave_totalIonCurrent_ForScan: true, showLoadingMessage_ForWholeScanFile: false });

                    return; // EARLY RETURN
                }

                //  TODO  FAKE  'FAKE_FOR_TESTING'

                // if ( scan.scanNumber === scanNumber_ShowOnLoad__FAKE_FOR_TESTING ) {
                //     found__scanNumber_ShowOnLoad__FAKE_FOR_TESTING = true;
                // }
            }

            this._scanLevels_ToShow = new Set()
            this._scanLevels_ToShow.add( 1 ); // Default to 1

            this.setState({ scanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_Root, showLoadingMessage_ForWholeScanFile: false })
            // console.warn( "returned from scanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_LoadData: ", value )

            //  TODO  FAKE  'FAKE_FOR_TESTING'

            // if ( found__scanNumber_ShowOnLoad__FAKE_FOR_TESTING ) {
            //
            //     //  Load Scan Number since viewing in Lorikeet through Peptide page
            //     this._display_SingleScan_For_ScanNumber({ scanNumber: scanNumber_ShowOnLoad__FAKE_FOR_TESTING })
            // }

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

                const scanEntry = this.state.scanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_Root.get_SpectralStorage_NO_Peaks_DataFor_ScanNumber(scanNumber_New)
                if ( ! scanEntry ) {
                    // no entry so skip
                    continue; // EARLY CONTINUE
                }

                if ( ! this._scanLevels_ToShow.has( scanEntry.level ) ) {
                    //  Not for selected scan level so skip
                    continue; // EARLY CONTINUE
                }

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

            const scanNumber_Max = this.state.scanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_Root.get_scanNumber_Max()

            for ( let scanNumber_New = ( this._scanNumber_CurrentlyShown + 1 ); scanNumber_New <= scanNumber_Max; scanNumber_New++ ) {

                const scanEntry = this.state.scanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_Root.get_SpectralStorage_NO_Peaks_DataFor_ScanNumber(scanNumber_New)
                if ( ! scanEntry ) {
                    // no entry so skip
                    continue; // EARLY CONTINUE
                }

                if ( ! this._scanLevels_ToShow.has( scanEntry.level ) ) {
                    //  Not for selected scan level so skip
                    continue; // EARLY CONTINUE
                }

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
            const scanData_For_ScanNumber = this.state.scanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_Root.get_SpectralStorage_NO_Peaks_DataFor_ScanNumber( scanNumber );

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

        this._scanNumber_CurrentlyShown = scanNumber

        const singleScanData = this._cached_SingleScanData_For_ScanFileId_Map_Key_ScanNumber.get(scanNumber);

        if ( singleScanData ) {
            //  Already have data to display
            this._show_SingleScanData({ singleScanData });

            return; // EARLY RETURN
        }

        {
            const promise = this._promise_SingleScanData_Loading__For_ScanFileId_Map_Key_ScanNumber.get(scanNumber)
            if ( promise ) {
                // Already loading for scan number

                promise.then(value => { try {

                    const singleScanData = value.singleScanData

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
            scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber_LoadData({
                projectScanFileId: this.props.propsValue.projectScanFileId, scanNumber
            })

        this._promise_SingleScanData_Loading__For_ScanFileId_Map_Key_ScanNumber.set(scanNumber, promise)

        promise.catch(reason => {
            this._promise_SingleScanData_Loading__For_ScanFileId_Map_Key_ScanNumber.delete(scanNumber)
        })
        promise.then(value => { try {

            this._promise_SingleScanData_Loading__For_ScanFileId_Map_Key_ScanNumber.delete(scanNumber)

            if ( ! value.singleScanData ) {
                throw Error("NO Scan data for scan number: " + scanNumber );
            }

            const singleScanData = value.singleScanData

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
            singleScanData: ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber
        }
    ) : void {

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


            return (
                <div >
                    { this.state.scan_DoesNotHave_totalIonCurrent_ForScan ? (

                        <div>
                            Scan data does NOT have Total Ion Current.  Cannot show Data.
                        </div>

                    ) : this.state.scanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_Root ? (

                        <React.Fragment>

                            <div style={ { marginBottom: 10 } }>
                                <span>
                                    Show data for scan level:
                                </span>
                                { this.state.scanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_Root.get_scanLevels_Sorted().map(( scanLevel, index, array) => {
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

                                <ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component
                                    projectScanFileId={ this.props.propsValue.projectScanFileId }
                                    scanLevels_ToDisplay={ this._scanLevels_ToShow }
                                    scanNumber_Selected={ this._scanNumber_CurrentlyShown }
                                    scanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_Root={ this.state.scanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_Root }
                                    scanNumber_Clicked_Callback={ this._scanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_ScanNumber_Clicked_Callback_BindThis }
                                />
                            )}

                        </React.Fragment>

                    ) : null }

                    { this.state.singleScanData ? (

                        <React.Fragment>

                            <div style={ { marginTop: 10, marginBottom: 10 } }>
                                <button
                                    style={ { marginRight: 10 } }
                                    title="Within selected scan levels"
                                    onClick={ event => { this._prevScan_Clicked() } }
                                >
                                    Previous Scan
                                </button>
                                <span > </span>
                                <button
                                    style={ { marginRight: 10 } }
                                    title="Within selected scan levels"
                                    onClick={ event => { this._nextScan_Clicked() } }
                                >
                                    Next Scan
                                </button>
                                <span> </span>
                                <div style={ { display: "inline-block" } }>
                                    <span style={ { whiteSpace: "nowrap" } }>
                                        <form onSubmit={ event => {
                                            event.preventDefault()
                                            event.stopPropagation()
                                            this._show_EnteredScanNumber_FormSubmit(event)
                                        }}>
                                            <input
                                                ref={ this._scanNumber_Input_Ref }
                                                style={ { width: 60 } }
                                                placeholder="scan #"
                                                title="Enter scan number to show and click button"
                                            />
                                            <span> </span>
                                            <button
                                                title="Show entered scan number"
                                            >
                                                Show Scan
                                            </button>
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

                            <ScanFileBrowser_SingleScan_Plot_Component
                                scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber={ this.state.singleScanData }
                            />

                        </React.Fragment>
                    ): null}
                </div>
            );

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

}

