/**
 * scanPeaks_Like_Callback_Definitions.ts
 *
 * Scan Peaks Like Data - Generic Viewer
 *
 * Input Data Classes
 *
 */

import {ScanPeaks_Like_GenericViewer_SingleEntry_ForPlot} from "page_js/data_pages/scan_file_driven_pages/scan_file_browser_page/scan_peaks_like_generic_viewer/scanPeaks_Like_InputDataClasses";


//   The Callback for combining/binning SingleEntry_ForPlot entries to show a single vertical line in the plot

export class ScanPeaks_Like__Combine_SingleEntry_ForPlot_Entries_Callback_Params {
    readonly singleEntryForPlot_ToCombine_Array: ReadonlyArray<ScanPeaks_Like_GenericViewer_SingleEntry_ForPlot>  //  Entries to Combine
}

export class ScanPeaks_Like__Combine_SingleEntry_ForPlot_Entries_Callback_ReturnValue {
    readonly singleEntryForPlot_EntryToUse: ScanPeaks_Like_GenericViewer_SingleEntry_ForPlot // Use y_value.  Return this when this line is clicked
    readonly y_value_Override: number  // use this as y value
}

export type ScanPeaks_Like__Combine_SingleEntry_ForPlot_Entries_Callback =
    (params: ScanPeaks_Like__Combine_SingleEntry_ForPlot_Entries_Callback_Params) => ScanPeaks_Like__Combine_SingleEntry_ForPlot_Entries_Callback_ReturnValue

/////////////

//  The Callback when a line in the plot is clicked

export class ScanPeaks_Like__LineInPlot_Clicked_Callback_Params {
    readonly singleEntryForPlot_EntryToUse: ScanPeaks_Like_GenericViewer_SingleEntry_ForPlot  //  Entry for line clicked that was returned as "...EntryToUse" from Combine entries call.
}

export type ScanPeaks_Like__LineInPlot_Clicked_Callback =
    (params: ScanPeaks_Like__LineInPlot_Clicked_Callback_Params) => void
