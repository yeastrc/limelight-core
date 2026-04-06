/**
 * CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_DAO.ts
 *
 * common code of interact with Structure File (like PDB) within ONE Project
 *
 * DAO for the Structure File Contents Webservices
 */
import { BuiltInTrajectoryFormat } from "molstar/lib/mol-plugin-state/formats/trajectory";
import { getWebserviceSyncTrackingCode, LIMELIGHT_WEBSERVICE_SYNC_TRACKING_CODE__HEADER_PARAM } from "page_js/common_all_pages/EveryPageCommon";
import { limelight__variable_is_type_number_Check } from "page_js/common_all_pages/limelight__variable_is_type_number_Check";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";
import { handleAJAXError } from "page_js/common_all_pages/handleServicesAJAXErrors";



export const get_DisplayNameString_From_CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry = function ( item: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry ) {

    return item.chainId_Label_AssignedAt_StructureFileCreation
}

export class CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Value {

    readonly structureFileId: number
    readonly name: string
    description: string
    readonly structureFile_PDB_ETC__DataFormat: BuiltInTrajectoryFormat  //   Type is from Molstar / Mol*.  May need some private Limelight type
}

/**
 * Stored in JSON blob with values in CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Value in same table
 */
export class CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Root {

    readonly entries: Array<CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry>
}

export class CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry {

    /**
     * Assigned here in Limelight at time of parsing Structure file.  Used for all tracking of selected chains.  Should always be same number if chains are parsed in same order.  "lid" property to/from webservice
     */
    readonly limelightAssigned_ChainId: number

    /**
     * Assigned by whatever program creates the structure file.  Most commonly displayed to the user. Often is 'A','B', but can be different.  "lbl" property to/from webservice
     */
    readonly chainId_Label_AssignedAt_StructureFileCreation: string

    /**
     * Assigned by the author of the structure file.  Some formats do not appear to support a separate field so this value may be same as 'Label' above.  "aal" property to/from webservice
     */
    readonly chainId_AuthorId_AssignedAt_StructureFileCreation: string
}

const _get_Webservice_Object_FROM_CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry = function ( entry: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry ) {

    return {
        lid: entry.limelightAssigned_ChainId,
        lbl: entry.chainId_Label_AssignedAt_StructureFileCreation,
        aal: entry.chainId_AuthorId_AssignedAt_StructureFileCreation
    }
}


export class CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_DAO {

    readonly projectId: number

    constructor(
        {
            projectId
        }: {
            projectId: number
        }
    ) {
        this.projectId = projectId
    }

    /**
     *
     */
    get_StructureFile_HasEntries_AllFor_ProjectId_ProteinSequenceVersionId_WebserviceCall(
        {
            proteinSequenceVersionId
        } : {
            proteinSequenceVersionId: number
        }
    ) { try {

        return new Promise<{
            hasAnyEntries: boolean
        }>( (resolve, reject) => { try {

            const url = "d/rws/for-page/structure-file-has-any-for-project-id-protein-sequence-version-id"

            const requestObj = {
                projectIdentifier: this.projectId.toString(),
                proteinSequenceVersionId
            }

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: true }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason: any) => { reject(reason) }  );

            promise_webserviceCallStandardPost.then( ({ responseData }:{ responseData: any }) => {
                try {
                    // console.warn( "response from URL: " + url + " is: ", responseData )

                    resolve({
                        hasAnyEntries: responseData.hasAnyEntries
                    });

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({
                        errorException : e
                    });
                    throw e;
                }
            });

        } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } })

    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

    /**
     *
     */
    get_StructureFile_Entries_AllFor_ProjectId_ProteinSequenceVersionId_WebserviceCall(
        {
            proteinSequenceVersionId
        } : {
            proteinSequenceVersionId: number
        }
    ) { try {

        return new Promise<{
            resultEntries: Array<CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Value>
        }>( (resolve, reject) => { try {

            const url = "d/rws/for-page/structure-file-list-all-for-project-id-protein-sequence-version-id"

            const requestObj = {
                projectIdentifier: this.projectId.toString(),
                proteinSequenceVersionId
            }

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: true }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason: any) => { reject(reason) }  );

            promise_webserviceCallStandardPost.then( ({ responseData }:{ responseData: any }) => {
                try {
                    // console.warn( "response from URL: " + url + " is: ", responseData )

                    const resultEntries: Array<CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Value> = []

                    if ( ! responseData.resultItemList ) {
                        const msg = "( ! responseData.resultItemList ).  url: " + url
                        console.warn( msg )
                        throw Error(msg)
                    }

                    if ( ! ( responseData.resultItemList instanceof Array ) ) {
                        const msg = "( ! ( responseData.resultItemList instanceof Array ) ).  url: " + url
                        console.warn( msg )
                        throw Error(msg)
                    }

                    for ( const responseData__resultItem of responseData.resultItemList ) {

                        const resultEntry: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Value = {
                            structureFileId: responseData__resultItem.id,
                            name: responseData__resultItem.name,
                            description: responseData__resultItem.description,
                            structureFile_PDB_ETC__DataFormat: responseData__resultItem.fileType_ShortName  //   Type is from Molstar / Mol*.  May need some private Limelight type
                        }

                        resultEntries.push( resultEntry )
                    }

                    resolve({
                        resultEntries
                    });

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({
                        errorException : e
                    });
                    throw e;
                }
            });

        } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } })

    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

    /**
     *
     */
    get_StructureFile_Entries_AllFor_ProjectId_WebserviceCall_RestrictedTo_Researcher_ProjectOwner() { try {

        return new Promise<{
            resultEntries: Array<CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Value>
        }>( (resolve, reject) => { try {

            //  TODO  Initially getting all for project id but later will ONLY initially get for project id and protein sequence version id

            const url = "d/rws/for-page/structure-file-list-all-for-project"

            const requestObj = {
                projectIdentifier: this.projectId.toString()
            }

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: true }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason: any) => { reject(reason) }  );

            promise_webserviceCallStandardPost.then( ({ responseData }:{ responseData: any }) => {
                try {
                    // console.warn( "response from URL: " + url + " is: ", responseData )

                    // resolve({ responseData });

                    const resultEntries: Array<CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Value> = []

                    if ( ! responseData.resultItemList ) {
                        const msg = "( ! responseData.resultItemList ).  url: " + url
                        console.warn( msg )
                        throw Error(msg)
                    }

                    if ( ! ( responseData.resultItemList instanceof Array ) ) {
                        const msg = "( ! ( responseData.resultItemList instanceof Array ) ).  url: " + url
                        console.warn( msg )
                        throw Error(msg)
                    }

                    for ( const responseData__resultItem of responseData.resultItemList ) {

                        const resultEntry: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Value = {
                            structureFileId: responseData__resultItem.id,
                            name: responseData__resultItem.name,
                            description: responseData__resultItem.description,
                            structureFile_PDB_ETC__DataFormat: responseData__resultItem.fileType_ShortName  //   Type is from Molstar / Mol*.  May need some private Limelight type
                        }

                        resultEntries.push( resultEntry )
                    }

                    resolve({
                        resultEntries
                    });

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({
                        errorException : e
                    });
                    throw e;
                }
            });

        } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } })

    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

    /**
     *
     * @param structureFile_Contents_Entry_Value - Must pass in with property 'structureFileId' set to undefined
     * @returns NEW object with property 'structureFileId' set
     */
    async saveNew_StructureFile_Contents_ToServer(
        {
            structureFile_Contents_Entry_Value, structureFile_Contents__ChainsData_Root, proteinSequenceStructureFile_Contents, contentSize_InBytes
        }: {
            /**
             * Must pass in with property 'structureFileId' set to undefined
             */
            structureFile_Contents_Entry_Value: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Value

            structureFile_Contents__ChainsData_Root: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Root

            proteinSequenceStructureFile_Contents: string

            /**
             * Must be bytes, not characters
             */
            contentSize_InBytes: number

        }
    ): Promise<CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Value> {

        if ( structureFile_Contents_Entry_Value.structureFileId !== undefined ) {
            const msg = "method saveNew_StructureFile_Contents_ToServer(...): structureFile_Contents_Entry_Value.structureFileId MUST be set to undefined. "
            console.warn( msg )
            throw Error( msg )
        }

        // const projectIdentifier = currentProjectId_ProjectSearchId_Based_DataPages_FromDOM() // string

        const projectIdentifier = this.projectId.toString()


        // 1. Encode the string as a Uint8Array (UTF-8 is standard for crypto operations)
        const textEncoder = new TextEncoder();
        const proteinSequenceStructureFile_Contents_Encoded = textEncoder.encode( proteinSequenceStructureFile_Contents ); //


        const _DIGEST_ALGORITHM = 'SHA-256'

        // Use the SubtleCrypto API to digest the ArrayBuffer with SHA-256
        const hash_ArrayBuffer = await window.crypto.subtle.digest( _DIGEST_ALGORITHM, proteinSequenceStructureFile_Contents_Encoded );

        const contentToSend_HashHex = Array.from( new Uint8Array( hash_ArrayBuffer ) )
            .map( byte => byte.toString( 16 ).padStart( 2, '0' ) ) // 'padStart': ensure is 2 characters by prefix with zero
            .join( '' );


        /////////

        const LIMELIGHT_UPLOAD_FILE_PARAMS_JSON__HEADER_PARAM = "limelight_upload_file_params_json"  //  Keep in sync with server side

        const uploadFileHeaderParams = {
            projectIdentifier, // string
            fileType_String: structureFile_Contents_Entry_Value.structureFile_PDB_ETC__DataFormat,
            name: structureFile_Contents_Entry_Value.name,
            description: structureFile_Contents_Entry_Value.description,
            upload_Content_Size_InBytes: contentSize_InBytes, // TODO  Only send if have content in bytes.  files can get size of file.  If ever do URL downloads need something for that.
            sha256_Value_For_FileContents: contentToSend_HashHex
        }
        const uploadFileHeaderParamsJSON = JSON.stringify( uploadFileHeaderParams );

        ///////

        const LIMELIGHT_UPLOAD_FILE__CHAINS_DATA__PARAMS_JSON__HEADER_PARAM = "limelight_upload_structure_file_chains_id_label_auth_json"  //  Keep in sync with server side

        const uploadFile_ChainsData_Entries: Array<any> = []

        {

            const limelightAssigned_ChainId_ALL_Set: Set<number> = new Set()
            const chainId_Label_AssignedAt_StructureFileCreation_ALL_Set: Set<string> = new Set()

            for ( const chainData of structureFile_Contents__ChainsData_Root.entries ) {


                if ( limelightAssigned_ChainId_ALL_Set.has( chainData.limelightAssigned_ChainId ) ) {
                     const msg = "Duplicate value for 'limelightAssigned_ChainId': " + chainData.limelightAssigned_ChainId
                    throw new Error(msg)
                }
                limelightAssigned_ChainId_ALL_Set.add( chainData.limelightAssigned_ChainId )

                if ( chainId_Label_AssignedAt_StructureFileCreation_ALL_Set.has( chainData.chainId_Label_AssignedAt_StructureFileCreation ) ) {
                    const msg = "Duplicate value for 'chainId_Label_AssignedAt_StructureFileCreation': " + chainData.chainId_Label_AssignedAt_StructureFileCreation
                    throw new Error(msg)
                }
                chainId_Label_AssignedAt_StructureFileCreation_ALL_Set.add( chainData.chainId_Label_AssignedAt_StructureFileCreation )

                const uploadFile_ChainsData_Entry = _get_Webservice_Object_FROM_CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry(
                    chainData
                )
                uploadFile_ChainsData_Entries.push( uploadFile_ChainsData_Entry )
            }
        }

        const uploadFile_ChainsData_HeaderParams = {
            entries: uploadFile_ChainsData_Entries
        }
        const uploadFile_ChainsData_HeaderParamsJSON = JSON.stringify( uploadFile_ChainsData_HeaderParams );

        //////

        const webserviceSyncTrackingCode = getWebserviceSyncTrackingCode();

        /////

        const url = "d/rws/for-page/structure-file-contents-upload-data"

        const httpHeaders: any = {
            "Content-Type": "application/octet-stream",
            [ LIMELIGHT_WEBSERVICE_SYNC_TRACKING_CODE__HEADER_PARAM ]: webserviceSyncTrackingCode,
            [ LIMELIGHT_UPLOAD_FILE_PARAMS_JSON__HEADER_PARAM ]: uploadFileHeaderParamsJSON,
            [ LIMELIGHT_UPLOAD_FILE__CHAINS_DATA__PARAMS_JSON__HEADER_PARAM ]: uploadFile_ChainsData_HeaderParamsJSON
        }

        const fetch_Response = await window.fetch( url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: httpHeaders,
            // redirect: "follow", // manual, *follow, error
            // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: proteinSequenceStructureFile_Contents // body data type must match "Content-Type" header
        } )

        const fetchResponse_Status = fetch_Response.status

        console.warn( " fetchResponse.status: " + fetch_Response.status )

        console.warn( " fetchResponse", fetch_Response )

        if ( ! fetch_Response.ok ) {
            handleAJAXError( {
                fetch_Results: {
                    fetch_Results_statusCode: fetch_Response.status,
                    fetch_Results_statusText: fetch_Response.statusText,
                    fetch_Results_ResponseText: undefined
                },
                url,
                requestData: undefined
            } );  //  Sometimes throws exception so rest of processing won't always happen

            if ( fetch_Response.status === 403 ) {
                // window.alert( "Need to Log In.   HTTP Status code " + fetch_Response.status + " was returned." )

                limelight__ReloadPage_Function()

                return

            // } else {
            //
            //     window.alert( "Send Structure File contents to server FAILED.  HTTP Status code " + fetch_Response.status + " was returned." )
            }

            const msg = "Send Structure File contents to server FAILED. " + "fetch_Response.ok : " + fetch_Response.ok + "'. fetch_Response.status: " + fetch_Response.status
            console.warn( msg )
            // throw Error( msg )

            return  // EARLY RETURN

        }

        const fetch_Response_text = await fetch_Response.text()

        const fetch_Response_JSON_TO_Object = JSON.parse( fetch_Response_text )

        if ( ! fetch_Response_JSON_TO_Object.statusSuccess ) {

            const msg = "Send Structure File contents to server FAILED.  statusSuccess in response is not true.."
            console.warn( msg )
            throw Error( msg )
        }

        const structureFileId = fetch_Response_JSON_TO_Object.structureFileId

        if ( ! limelight__variable_is_type_number_Check( structureFileId ) ) {
            const msg = "Send Structure File contents to server returned property 'structureFileId' which NOT a number. structureFileId: " + structureFileId
            console.warn( msg )
            throw Error( msg )
        }

        const result: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Value = {

            structureFileId: structureFileId,
            name: structureFile_Contents_Entry_Value.name,
            description: structureFile_Contents_Entry_Value.description,
            structureFile_PDB_ETC__DataFormat: structureFile_Contents_Entry_Value.structureFile_PDB_ETC__DataFormat  //   Type is from Molstar / Mol*.  May need some private Limelight type
        }

        return result

    }


    /**
     *
     * @param structureFileId
     */
    delete_FromServer( structureFileId: number ) {

        return new Promise<void>( (resolve, reject) => { try {

            const url = "d/rws/for-page/structure-file-delete";

            const requestObj = {
                structureFileId
            }

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: true }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason: any) => { reject(reason) }  );

            promise_webserviceCallStandardPost.then( ({ responseData }:{ responseData: any }) => {
                try {
                    if ( ! responseData.statusSuccess ) {
                        window.alert( "Failed to delete" )
                        const msg = "failed to delete. ( ! responseData.statusSuccess ) "
                        console.warn(msg)
                        throw Error(msg)
                    }

                    resolve()

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({
                        errorException : e
                    });
                    throw e;
                }
            });


        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException : e
            });
            throw e;
        }})
    }

}