/**
 * CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Contents_Value.ts
 *
 * common code of retrieve File Contents with Structure File (like PDB) within ONE Project
 *
 * For the Structure File Contents Webservices
 */

import { getWebserviceSyncTrackingCode, LIMELIGHT_WEBSERVICE_SYNC_TRACKING_CODE__HEADER_PARAM } from "page_js/common_all_pages/EveryPageCommon";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";


export class CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Contents_Value__GetResult_Entry {

    readonly proteinSequenceStructureFile_Contents: string
}

export class CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Contents_Value {

    private _proteinSequenceStructureFile_Contents_Entry__Map_Key_StructureFileId: Map<number, CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Contents_Value__GetResult_Entry> = new Map()

    private _retrievalPromise_Per_StructureFileId: Map<number, Promise<CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Contents_Value__GetResult_Entry>> = new Map()


    /**
     *
     * @param structureFileId
     * @param proteinSequenceStructureFile_Contents
     */
    set_proteinSequenceStructureFile_Contents_for_StructureFileId(
        {
            structureFileId, proteinSequenceStructureFile_Contents
        } : {
            proteinSequenceStructureFile_Contents: string
            structureFileId: number
        }): void {

        const entry: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Contents_Value__GetResult_Entry = {
            proteinSequenceStructureFile_Contents
        }

        this._proteinSequenceStructureFile_Contents_Entry__Map_Key_StructureFileId.set( structureFileId, entry )

        this._retrievalPromise_Per_StructureFileId.delete( structureFileId )
    }

    /**
     *
     * @param structureFileId
     * @returns a container with the data for the requested structureFileId
     */
    get_proteinSequenceStructureFile_Contents_for_StructureFileId_ReturnsPromise( structureFileId: number ):
        Promise<CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Contents_Value__GetResult_Entry>
     {

         const mainResult = this.get_proteinSequenceStructureFile_Contents_for_StructureFileId( structureFileId )
         if ( mainResult.data ) {
             return Promise.resolve( mainResult.data )
         }

         return mainResult.promise
    }


    /**
     *
     * @param structureFileId
     * @returns a container with the data for the requested structureFileId.  Either in 'data' or 'promise'
     */
    get_proteinSequenceStructureFile_Contents_for_StructureFileId( structureFileId: number ): {
        data: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Contents_Value__GetResult_Entry
        promise: Promise<CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Contents_Value__GetResult_Entry>
    } {

        {
            const data = this._proteinSequenceStructureFile_Contents_Entry__Map_Key_StructureFileId.get( structureFileId )
            if ( data ) {
                return { promise: undefined, data }
            }
        }
        {
            const promise = this._retrievalPromise_Per_StructureFileId.get( structureFileId )
            if ( promise ) {
                return { data: undefined, promise }
            }
        }

        const promise = this._get_DataFromServer({ structureFileId })

        promise.catch(reason => {
            this._retrievalPromise_Per_StructureFileId.delete( structureFileId )
        })
        promise.then( value => {
            this._retrievalPromise_Per_StructureFileId.delete( structureFileId )
            this._proteinSequenceStructureFile_Contents_Entry__Map_Key_StructureFileId.set( structureFileId, value )
        })

        this._retrievalPromise_Per_StructureFileId.set( structureFileId, promise )

        return { promise, data: undefined }
    }

    /**
     *
     */
    private _get_DataFromServer(
        {
            structureFileId
        } : {
            structureFileId: number
        }
    ) { try {

        return new Promise<CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Contents_Value__GetResult_Entry>( (resolve, reject) => { try {

            const url = "d/rws/for-page/structure-file-contents-for-structure-file-id"

            const requestObj = {
                structureFileId
            }


            const requestJSON = JSON.stringify( requestObj );

            const webserviceSyncTrackingCode = getWebserviceSyncTrackingCode();

            const httpHeaders: any = {
                "Content-Type": "application/json",
                [ LIMELIGHT_WEBSERVICE_SYNC_TRACKING_CODE__HEADER_PARAM ]: webserviceSyncTrackingCode
            }

            const fetch_Response_Promise = window.fetch( url, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: httpHeaders,
                // redirect: "follow", // manual, *follow, error
                // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: requestJSON // body data type must match "Content-Type" header
            } )

            fetch_Response_Promise.catch(reason => { reject(reason)})
            fetch_Response_Promise.then(fetch_Response => { try {


                // const fetchResponse_Status = fetch_Response.status
                //
                // console.warn( " fetchResponse.status: " + fetch_Response.status )
                //
                // console.warn( " fetchResponse", fetch_Response )

                if ( ! fetch_Response.ok ) {
                    if ( fetch_Response.status === 403 ) {
                        window.alert( "Need to Log In.   HTTP Status code " + fetch_Response.status + " was returned." )
                    } else {
                        window.alert( "Send Structure File contents to server FAILED.  HTTP Status code " + fetch_Response.status + " was returned." )
                    }

                    const msg = "Send Structure File contents to server FAILED. " + "fetch_Response.ok : " + fetch_Response.ok + "'. fetch_Response.status: " + fetch_Response.status
                    console.warn( msg )
                    throw Error( msg )
                }


                const fetch_Response_text_Promise = fetch_Response.text()

                fetch_Response_text_Promise.catch(reason => { reject(reason) })
                fetch_Response_text_Promise.then(fetch_Response_text => { try {

                    resolve({ proteinSequenceStructureFile_Contents: fetch_Response_text })

                } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } })

            } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } })

        } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } })

    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

}