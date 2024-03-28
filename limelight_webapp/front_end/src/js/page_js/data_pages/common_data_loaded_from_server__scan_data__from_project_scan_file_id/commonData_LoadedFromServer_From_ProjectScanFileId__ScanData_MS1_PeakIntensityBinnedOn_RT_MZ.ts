/**
 * commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ.ts
 *
 * Data across Project since pass in ProjectScanFileId  -  ScanData_MS1_PeakIntensityBinnedOn_RT_MZ
 *
 * Data loaded from server and code to load data from server
 *
 */

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";
import { limelight__IsVariableAString } from "page_js/common_all_pages/limelight__IsVariableAString";

/**
 *
 */
export class CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ_ForSingle_ProjectScanFileId {

    readonly ms1_IntensitiesBinnedSummedMap: any; //  Object used as a Map

    readonly jsonContents: string;  // Holds String describing contents of ms1_IntensitiesBinnedSummedMap
    // property 'jsonContents' contents:
    // ms1_IntensitiesBinnedSummedMap outer key is RT, inner Key is m/z. Both have been binned using 'floor' to next smaller int. Have 'MaxPossibleValue' props since MaxPossibleValue is BinMax + 1

    readonly summaryData: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ_Data_ForSingle_SearchScanFileId_SummaryData
}

/**
 *
 */
export class CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ_Data_ForSingle_SearchScanFileId_SummaryData {

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


/**
 *
 */
export class CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder {

    readonly scanData_ForSingle_ProjectScanFileId: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ_ForSingle_ProjectScanFileId
}

/**
 *
 */
export class CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ__get_ScanData_MS1_PeakIntensityBinnedOn_RT_MZHolder__FunctionResult {

    scanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder
}

/**
 *  !!!!!!  MAIN CLASS  !!!!!!!!
 */
export class CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ {

    /**
     *
     */
    private constructor() {
    }

    /**
     * Create New Instance
     *
     * @param projectSearchIds
     */
    static getNewInstance() {
        return new CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ();
    }

    private _data_Holder__Map_Key_ProjectScanFileId = new Map<number, CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder>()

    private _promise_Map_Key_ProjectScanFileId = new Map<number, Promise<CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder>>()

    /**
     * !!!  Always return promise
     *
     */
    get_ScanData_MS1_PeakIntensityBinnedOn_RT_MZHolder_ReturnPromise( projectScanFileId: number ): Promise<CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ__get_ScanData_MS1_PeakIntensityBinnedOn_RT_MZHolder__FunctionResult> {
        try {
            const result = this.get_ScanData_MS1_PeakIntensityBinnedOn_RT_MZHolder( projectScanFileId );

            if (result.data) {

                return Promise.resolve(result.data);
            }

            return result.promise;

        } catch (e) {
            console.warn("Exception caught: ", e);
            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
            throw e;
        }
    }


    /**
     *
     */
    get_ScanData_MS1_PeakIntensityBinnedOn_RT_MZHolder( projectScanFileId: number):
        {
            data: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ__get_ScanData_MS1_PeakIntensityBinnedOn_RT_MZHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ__get_ScanData_MS1_PeakIntensityBinnedOn_RT_MZHolder__FunctionResult>
        } {


        { //  Find existing data loaded to return

            const data_Holder = this._data_Holder__Map_Key_ProjectScanFileId.get( projectScanFileId )

            if ( data_Holder ) {

                //  Found data is loaded so return it

                return { promise: undefined, data: { scanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder: data_Holder } } // EARLY RETURN
            }
        }

        {  //  Find existing loading Promise

            const promise_RetrieveInProgress = this._promise_Map_Key_ProjectScanFileId.get( projectScanFileId )

            if ( promise_RetrieveInProgress ) {

                if ( promise_RetrieveInProgress ) {

                    //  Found data is loading so return promise

                    return {
                        data: undefined,
                        promise: new Promise<CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ__get_ScanData_MS1_PeakIntensityBinnedOn_RT_MZHolder__FunctionResult>((resolve, reject) => { try {

                            promise_RetrieveInProgress.then( value_scanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder => { try {

                                resolve({ scanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder: value_scanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder })

                            } catch (e) {
                                console.warn("Exception caught: ", e);
                                reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                                throw e;
                            }})

                        } catch (e) {
                            console.warn("Exception caught: ", e);
                            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                            throw e;
                        }})
                    } // EARLY RETURN
                }
            }

        }

        const loadPromise = this._loadData(projectScanFileId )

        {
            this._promise_Map_Key_ProjectScanFileId.set( projectScanFileId, loadPromise )

            loadPromise.catch(reason => {
                this._promise_Map_Key_ProjectScanFileId.delete( projectScanFileId )
            })
            loadPromise.then(value => { try {

                this._promise_Map_Key_ProjectScanFileId.delete( projectScanFileId )

                this._data_Holder__Map_Key_ProjectScanFileId.set( projectScanFileId, value )

            } catch (e) {
                console.warn("Exception caught: ", e);
                reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                throw e;
            }})

        }

        return { data: undefined, promise: new Promise<CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ__get_ScanData_MS1_PeakIntensityBinnedOn_RT_MZHolder__FunctionResult>((resolve, reject) => { try {

                loadPromise.catch(reason => { reject(reason) })
                loadPromise.then( value_loadPromise => { try {

                    resolve( { scanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder: value_loadPromise })

                } catch (e) {
                    console.warn("Exception caught: ", e);
                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                    throw e;
                }})
            } catch (e) {
                console.warn("Exception caught: ", e);
                reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                throw e;
            }})
        }
    }

    /**
     *
     * @param requestParams
     */
    private _loadData( projectScanFileId: number ) : Promise<CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder> {

        const promise = new Promise<CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder>(
            (resolve, reject) => { try {
                const requestObject = {
                    projectScanFileId: projectScanFileId
                };

                const url = "d/rws/for-page/psb/scan-file-peak-intensity-binned-on-rt-mz-json-from-spectral-storage-data--search-scan-file-id-single-project-search-id";

                console.log("START: getting data from URL: " + url);

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObject, url});

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch((reason) => {
                    console.log("END: REJECTED: getting data from URL: " + url);
                    reject(reason)
                });

                promise_webserviceCallStandardPost.then(({responseData}: { responseData: any }) => { try {

                    console.log( "END: Successful: AJAX Call: getting data from URL: " + url );

                    const holder = _populate_DataPage_common_Data_Holder__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ_Root({responseData });

                    resolve(holder);

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return promise;
    }
}


/**
 *
 */
const _populate_DataPage_common_Data_Holder__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ_Root = function (
    {
        responseData
    } : {
        responseData: any

    }) : CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder {

    const item : CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_MS1_PeakIntensityBinnedOn_RT_MZ_ForSingle_ProjectScanFileId = responseData;


    if ( item.ms1_IntensitiesBinnedSummedMap === undefined || item.ms1_IntensitiesBinnedSummedMap === null ) {
        const msg = "( item.ms1_IntensitiesBinnedSummedMap === undefined || item.ms1_IntensitiesBinnedSummedMap === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( item.jsonContents === undefined || item.jsonContents === null ) {
        const msg = "( item.jsonContents === undefined || item.jsonContents === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! limelight__IsVariableAString( item.jsonContents ) ) {
        const msg = "( ! limelight__IsVariableAString( item.jsonContents ) )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( item.summaryData === undefined || item.summaryData === null ) {
        const msg = "( item.summaryData === undefined || item.summaryData === null )";
        console.warn(msg);
        throw Error(msg);
    }

    //  Sub part summaryData

    const summaryData = item.summaryData;

    if ( summaryData.jsonContents === undefined || summaryData.jsonContents === null ) {
        const msg = "( summaryData.jsonContents === undefined || summaryData.jsonContents === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! limelight__IsVariableAString( summaryData.jsonContents ) ) {
        const msg = "( ! limelight__IsVariableAString( summaryData.jsonContents ) )";
        console.warn(msg);
        throw Error(msg);
    }

    if ( summaryData.binnedSummedIntensityCount === undefined || summaryData.binnedSummedIntensityCount === null ) {
        const msg = "( summaryData.binnedSummedIntensityCount === undefined || summaryData.binnedSummedIntensityCount === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! limelight__variable_is_type_number_Check( summaryData.binnedSummedIntensityCount ) ) {
        const msg = "( ! limelight__variable_is_type_number_Check( summaryData.binnedSummedIntensityCount ) )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( summaryData.rtBinSizeInSeconds === undefined || summaryData.rtBinSizeInSeconds === null ) {
        const msg = "( summaryData.rtBinSizeInSeconds === undefined || summaryData.rtBinSizeInSeconds === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! limelight__variable_is_type_number_Check( summaryData.rtBinSizeInSeconds ) ) {
        const msg = "( ! limelight__variable_is_type_number_Check( summaryData.rtBinSizeInSeconds ) )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( summaryData.rtBinMinInSeconds === undefined || summaryData.rtBinMinInSeconds === null ) {
        const msg = "( summaryData.rtBinMinInSeconds === undefined || summaryData.rtBinMinInSeconds === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! limelight__variable_is_type_number_Check( summaryData.rtBinMinInSeconds ) ) {
        const msg = "( ! limelight__variable_is_type_number_Check( summaryData.rtBinMinInSeconds ) )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( summaryData.rtBinMaxInSeconds === undefined || summaryData.rtBinMaxInSeconds === null ) {
        const msg = "( summaryData.rtBinMaxInSeconds === undefined || summaryData.rtBinMaxInSeconds === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! limelight__variable_is_type_number_Check( summaryData.rtBinMaxInSeconds ) ) {
        const msg = "( ! limelight__variable_is_type_number_Check( summaryData.rtBinMaxInSeconds ) )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( summaryData.rtMaxPossibleValueInSeconds === undefined || summaryData.rtMaxPossibleValueInSeconds === null ) {
        const msg = "( summaryData.rtMaxPossibleValueInSeconds === undefined || summaryData.rtMaxPossibleValueInSeconds === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! limelight__variable_is_type_number_Check( summaryData.rtMaxPossibleValueInSeconds ) ) {
        const msg = "( ! limelight__variable_is_type_number_Check( summaryData.rtMaxPossibleValueInSeconds ) )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( summaryData.mzBinSizeInMZ === undefined || summaryData.mzBinSizeInMZ === null ) {
        const msg = "( summaryData.mzBinSizeInMZ === undefined || summaryData.mzBinSizeInMZ === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! limelight__variable_is_type_number_Check( summaryData.mzBinSizeInMZ ) ) {
        const msg = "( ! limelight__variable_is_type_number_Check( summaryData.mzBinSizeInMZ ) )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( summaryData.mzBinMinInMZ === undefined || summaryData.mzBinMinInMZ === null ) {
        const msg = "( summaryData.mzBinMinInMZ === undefined || summaryData.mzBinMinInMZ === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! limelight__variable_is_type_number_Check( summaryData.mzBinMinInMZ ) ) {
        const msg = "( ! limelight__variable_is_type_number_Check( summaryData.mzBinMinInMZ ) )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( summaryData.mzBinMaxInMZ === undefined || summaryData.mzBinMaxInMZ === null ) {
        const msg = "( summaryData.mzBinMaxInMZ === undefined || summaryData.mzBinMaxInMZ === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! limelight__variable_is_type_number_Check( summaryData.mzBinMaxInMZ ) ) {
        const msg = "( ! limelight__variable_is_type_number_Check( summaryData.mzBinMaxInMZ ) )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( summaryData.mzMaxPossibleValueInMZ === undefined || summaryData.mzMaxPossibleValueInMZ === null ) {
        const msg = "( summaryData.mzMaxPossibleValueInMZ === undefined || summaryData.mzMaxPossibleValueInMZ === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! limelight__variable_is_type_number_Check( summaryData.mzMaxPossibleValueInMZ ) ) {
        const msg = "( ! limelight__variable_is_type_number_Check( summaryData.mzMaxPossibleValueInMZ ) )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( summaryData.intensityBinnedMin === undefined || summaryData.intensityBinnedMin === null ) {
        const msg = "( summaryData.intensityBinnedMin === undefined || summaryData.intensityBinnedMin === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! limelight__variable_is_type_number_Check( summaryData.intensityBinnedMin ) ) {
        const msg = "( ! limelight__variable_is_type_number_Check( summaryData.intensityBinnedMin ) )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( summaryData.intensityBinnedMax === undefined || summaryData.intensityBinnedMax === null ) {
        const msg = "( summaryData.intensityBinnedMax === undefined || summaryData.intensityBinnedMax === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! limelight__variable_is_type_number_Check( summaryData.intensityBinnedMax ) ) {
        const msg = "( ! limelight__variable_is_type_number_Check( summaryData.intensityBinnedMax ) )";
        console.warn(msg);
        throw Error(msg);
    }

    return { scanData_ForSingle_ProjectScanFileId: item } ;
}
