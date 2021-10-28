/**
 * qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_MS1_PeakIntensityBinnedOn_RT_MZ_Data.ts
 *
 * QC Page - Data Loaded - From Server - Single Search - Scan File MS1 Peak Intensity Binned On RT and MZ Data
 *
 */


/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_MS1_PeakIntensityBinnedOn_RT_MZ_Data_Root {

    private _data_Map_Key_SearchScanFileId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_MS1_PeakIntensityBinnedOn_RT_MZ_Data_ForSingle_SearchScanFileId> = new Map();

    constructor() {
    }

    /**
     *
     */
    get_Data_For_SearchScanFileId(searchScanFileId: number) {
        return this._data_Map_Key_SearchScanFileId.get(searchScanFileId);
    }

    ///  Add/Set

    add_ScanFileDataFor_SingleSearchScanFileId(
        {
            searchScanFileId,
            item
        } : {
            searchScanFileId: number
            item: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_MS1_PeakIntensityBinnedOn_RT_MZ_Data_ForSingle_SearchScanFileId
        } ) {

        this._data_Map_Key_SearchScanFileId.set(searchScanFileId, item);
    }
}

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_MS1_PeakIntensityBinnedOn_RT_MZ_Data_ForSingle_SearchScanFileId {

    readonly ms1_IntensitiesBinnedSummedMap: any; //  Object used as a Map

    readonly jsonContents: string;  // Holds String describing contents of ms1_IntensitiesBinnedSummedMap
    // property 'jsonContents' contents:
    // ms1_IntensitiesBinnedSummedMap outer key is RT, inner Key is m/z. Both have been binned using 'floor' to next smaller int. Have 'MaxPossibleValue' props since MaxPossibleValue is BinMax + 1

    readonly summaryData: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_MS1_PeakIntensityBinnedOn_RT_MZ_Data_ForSingle_SearchScanFileId_SummaryData

}

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_MS1_PeakIntensityBinnedOn_RT_MZ_Data_ForSingle_SearchScanFileId_SummaryData {

    readonly jsonContents: string
    /// property 'jsonContents' contents:
    //    'BinMax' props are max bin values.  bin values are 'floor' of actual values.  Have 'MaxPossibleValue' props since MaxPossibleValue is BinMax + 1

    readonly binnedSummedIntensityCount: number
    readonly rtBinSizeInSeconds: number
    readonly rtBinMinInSeconds: number
    readonly rtBinMaxInSeconds: number
    readonly rtMaxPossibleValueInSeconds: number
    readonly mzBinSizeInMZ: number
    readonly mzBinMinInMZ: number
    readonly mzBinMaxInMZ: number
    readonly mzMaxPossibleValueInMZ: number
    readonly intensityBinnedMin: number
    readonly intensityBinnedMax: number
}
