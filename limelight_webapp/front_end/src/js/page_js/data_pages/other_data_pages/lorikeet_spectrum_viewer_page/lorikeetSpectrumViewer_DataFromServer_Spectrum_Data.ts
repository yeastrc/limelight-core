/**
 * lorikeetSpectrumViewer_DataFromServer_Spectrum_Data.ts
 *
 * Classes for the objects returned from the server for Spectrum
 *
 */


export class LorikeetSpectrumViewer_DataFromServer_Spectrum_ServiceResult { //  Server class: public class LorikeetGetSpectrumServiceResult {

    data: LorikeetSpectrumViewer_DataFromServer_Spectrum_Data_Root
    lorikeet_ScanData_RetentionTime_PrecursorMZ: LorikeetSpectrumViewer_DataFromServer_ScanData_RetentionTime_PrecursorMZ
}


/**
 * Always from the scan
 *
 */

export class LorikeetSpectrumViewer_DataFromServer_ScanData_RetentionTime_PrecursorMZ { //  Server class: public class Lorikeet_ScanData_RetentionTime_PrecursorMZ {

    scan_precursorMZ: number; // double
    scan_retentionTimeSeconds: number; // Float // For data displayed with Lorikeet
}


export class LorikeetSpectrumViewer_DataFromServer_Spectrum_Data_Root { //  Server class: public class LorikeetRootData {

    /**
     * Filename for display
     */
    fileName: string;

    /**
     * Scan Number
     */
    scanNum: number; // int

    /**
     * Each sublist is one peak with [<mz>,intensity]
     */
    peaks: any;

    /**
     * Each sublist is one peak with [<mz>,intensity]
     */
    ms1peaks: any;

    /**
     * Static Mods
     */
    staticMods: Array<LorikeetSpectrumViewer_DataFromServer_StaticModificationDataItem_Data>;
}

/**
 * Static Modification for Lorikeet
 */
export class LorikeetSpectrumViewer_DataFromServer_StaticModificationDataItem_Data {  //  Server class: public class LorikeetStaticMod {

    /**
     * Amino Acid
     */
    aminoAcid: string;

    /**
     * mass of the Static Modification
     */
    modMass: number; // double
}
