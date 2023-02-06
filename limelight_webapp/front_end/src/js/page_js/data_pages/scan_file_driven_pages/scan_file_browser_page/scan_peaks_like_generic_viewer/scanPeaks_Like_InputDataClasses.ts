/**
 * scanPeaks_Like_InputDataClasses.ts
 *
 * Scan Peaks Like Data - Generic Viewer
 *
 * Input Data Classes
 *
 */


export class ScanPeaks_Like_GenericViewer_Root_Component_MainDataProp {

    readonly x_axisLabel: string
    readonly singleEntryForPlot_Array: ReadonlyArray<ScanPeaks_Like_GenericViewer_SingleEntry_ForPlot>
    readonly selected_Index: number
}

/**
 * Single Entry for the plot.  May (likely) be combined with other entries to create a single line
 */
export class ScanPeaks_Like_GenericViewer_SingleEntry_ForPlot {

    readonly x_value: number
    readonly y_value: number //  May/will be combined when x_value values overlap and need to be binned

    readonly index: number  // Required that all be unique.  Used to pass in which entry is "Selected".  Used in callbacks

    readonly label: string // label to attach to line in the plot.  Assumed to be rarely used to not clutter the plot.
}