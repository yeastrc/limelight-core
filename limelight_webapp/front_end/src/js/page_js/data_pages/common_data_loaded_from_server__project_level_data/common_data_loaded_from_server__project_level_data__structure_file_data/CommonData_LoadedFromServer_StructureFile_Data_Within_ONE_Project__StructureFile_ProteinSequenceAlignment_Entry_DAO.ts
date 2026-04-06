/**
 * CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO.ts
 *
 * common code of interact with Structure File (like PDB) within ONE Project - Protein Alignment
 *
 * DAO for the Structure File Contents Protein Alignment Webservices
 */

import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";

export class CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__ResultRoot {

    resultEntries: Array<CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value>
}

/**
 * A Single Protein Sequence Alignment
 *
 * Unique: ChainId / proteinSequenceVersionId
 */
export class CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value {

    /**
     * Parent record id
     */
    readonly structureFileId: number

    /**
     * Structure File Chain Id
     */
    readonly limelightAssigned_ChainId: number

    /**
     * Limelight protein id
     */
    readonly proteinSequenceVersionId: number

    /**
     * Search Ids - comma delimited
     *
     * Store which searches being viewed when this alignment is created.
     */
    readonly searchIds_CommaDelimited: string

    /**
     * '-' is inserted into the sequence to perform alignment
     */
    readonly structureFile_AlignedSequence: string

    /**
     * '-' is inserted into the sequence to perform alignment
     */
    readonly limelightProteinSequence_AlignedSequence: string

    /**
     * Map<limelightProteinSequence_Position, structureFile_AlignedSequence_Position>
     */
    private _structureFile_AlignedSequence_Position__Map_Key_limelightProteinSequence_Position: Map<number, number> = new Map()

    /**
     * Map<structureFile_AlignedSequence_Position , limelightProteinSequence_Position>
     */
    private _limelightProteinSequence_Position__Map_Key_structureFile_AlignedSequence_Position: Map<number, number> = new Map()

    /**
     *
     */
    private _sequenceInChain_Positions_ThatAlignTo_LimelightProteinSequencePositions_Set: Set<number> = new Set()


    /**
     * @param limelightProteinSequence_Position
     * @returns undefined if no entry found for param
     */
    get__structureFile_AlignedSequence_Position__FOR__limelightProteinSequence_Position( limelightProteinSequence_Position: number ) {

        return this._structureFile_AlignedSequence_Position__Map_Key_limelightProteinSequence_Position.get( limelightProteinSequence_Position )
    }

    /**
     * @param structureFile_AlignedSequence_Position
     * @returns undefined if no entry found for param
     */
    get__limelightProteinSequence_Position__FOR__structureFile_AlignedSequence_Position( structureFile_AlignedSequence_Position: number ) {

        return this._limelightProteinSequence_Position__Map_Key_structureFile_AlignedSequence_Position.get( structureFile_AlignedSequence_Position )
    }

    get__sequenceInChain_Positions_ThatAlignTo_LimelightProteinSequencePositions_Set() : ReadonlySet<number> {
        return this._sequenceInChain_Positions_ThatAlignTo_LimelightProteinSequencePositions_Set
    }

    /**
     *
     * @param id
     * @param chainId
     * @param proteinSequenceVersionId
     * @param searchIds_CommaDelimited
     * @param structureFile_AlignedSequence
     * @param limelightProteinSequence_AlignedSequence
     */
    constructor(
        {
            structureFileId, limelightAssigned_ChainId, proteinSequenceVersionId, searchIds_CommaDelimited, structureFile_AlignedSequence, limelightProteinSequence_AlignedSequence
        } : {
            /**
             * Parent record id
             */
            readonly structureFileId: number

            /**
             * Structure File Chain Id
             */
            readonly limelightAssigned_ChainId: number

            /**
             * Limelight protein id
             */
            readonly proteinSequenceVersionId: number

            /**
             * Search Ids - comma delimited
             *
             * Store which searches being viewed when this alignment is created.
             */
            readonly searchIds_CommaDelimited: string

            /**
             * '-' is inserted into the sequence to perform alignment
             */
            readonly structureFile_AlignedSequence: string

            /**
             * '-' is inserted into the sequence to perform alignment
             */
            readonly limelightProteinSequence_AlignedSequence: string
        }
    ) {
        if ( structureFile_AlignedSequence.length !== limelightProteinSequence_AlignedSequence.length ) {
            const msg = "structureFile_AlignedSequence AND limelightProteinSequence_AlignedSequence length MUST MATCH"
            console.error(msg)
            throw Error(msg)
        }

        this.structureFileId = structureFileId
        this.limelightAssigned_ChainId = limelightAssigned_ChainId
        this.proteinSequenceVersionId = proteinSequenceVersionId
        this.searchIds_CommaDelimited = searchIds_CommaDelimited
        this.structureFile_AlignedSequence = structureFile_AlignedSequence
        this.limelightProteinSequence_AlignedSequence = limelightProteinSequence_AlignedSequence

        this._populateInternalMaps()
    }

    /**
     *
     * @private
     */
    private _populateInternalMaps() {

        if ( this.structureFile_AlignedSequence.length !== this.limelightProteinSequence_AlignedSequence.length ) {
            const msg = "this.structureFile_AlignedSequence AND this.limelightProteinSequence_AlignedSequence length MUST MATCH"
            console.error(msg)
            throw Error(msg)
        }

        const _ALIGNMENT_FILLER_CHARACTER = "-"

        const alignedSequence_Length = this.structureFile_AlignedSequence.length

        let limelightProteinSequence_Position = 0;
        let structureFile_AlignedSequence_Position = 0;

        for ( let index = 0; index < alignedSequence_Length; index++ ) {

            const limelightProteinSequence_AlignedSequence_At_Index = this.limelightProteinSequence_AlignedSequence[ index ]
            const structureFile_AlignedSequence_At_Index = this.structureFile_AlignedSequence[ index ]

            if ( limelightProteinSequence_AlignedSequence_At_Index !== _ALIGNMENT_FILLER_CHARACTER ) {
                limelightProteinSequence_Position++;
            }
            if ( structureFile_AlignedSequence_At_Index !== _ALIGNMENT_FILLER_CHARACTER ) {
                structureFile_AlignedSequence_Position++;
            }

            if ( limelightProteinSequence_AlignedSequence_At_Index !== _ALIGNMENT_FILLER_CHARACTER
                && structureFile_AlignedSequence_At_Index !== _ALIGNMENT_FILLER_CHARACTER ) {

                //  Both aligned sequences do NOT have filler so add references in the Maps between those positions

                /**
                 * Map<limelightProteinSequence_Position, structureFile_AlignedSequence_Position>
                 */
                this._structureFile_AlignedSequence_Position__Map_Key_limelightProteinSequence_Position.set( limelightProteinSequence_Position, structureFile_AlignedSequence_Position )

                /**
                 * Map<structureFile_AlignedSequence_Position , limelightProteinSequence_Position>
                 */
                this._limelightProteinSequence_Position__Map_Key_structureFile_AlignedSequence_Position.set( structureFile_AlignedSequence_Position, limelightProteinSequence_Position )

                this._sequenceInChain_Positions_ThatAlignTo_LimelightProteinSequencePositions_Set.add( structureFile_AlignedSequence_Position )
            }
        }
    }
}




export class CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO {

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
    get_StructureFile_Alignment_Entries_AllFor_StructureFileId_ProteinSequenceVersionId_WebserviceCall(
        {
            structureFileId, proteinSequenceVersionId
        } : {
            structureFileId: number
            proteinSequenceVersionId: number
        }
    ) { try {

        return new Promise<CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__ResultRoot>( (resolve, reject) => { try {

            const url = "d/rws/for-page/structure-file-chain-to-limelight-protein-alignment-get-list-for-structure-file-id-and-protein-sequence-version-id"

            const requestObj = {
                structureFileId,
                proteinSequenceVersionId
            }

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: true }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason: any) => { reject(reason) }  );

            promise_webserviceCallStandardPost.then( ({ responseData }:{ responseData: any }) => {
                try {
                    // console.warn( "response from URL: " + url + " is: ", responseData )

                    const resultEntries: Array<CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value> = []

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
                        const resultEntry = new CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value({
                            structureFileId: responseData__resultItem.structureFileId,
                            limelightAssigned_ChainId: responseData__resultItem.limelightAssigned_ChainId,
                            proteinSequenceVersionId: responseData__resultItem.proteinSequenceVersionId,
                            searchIds_CommaDelimited: responseData__resultItem.searchIds_CommaDelimited,
                            structureFile_AlignedSequence: responseData__resultItem.structureFile_AlignedSequence,
                            limelightProteinSequence_AlignedSequence: responseData__resultItem.limelightProteinSequence_AlignedSequence
                        })

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
     * @param item
     * @returns - new item with updated id if save
     */
    save_OR_Update_SequenceAlignment_ToServer( item: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value ) {

        return new Promise<CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value>( (resolve, reject) => { try {

            const url = "d/rws/for-page/structure-file-chain-to-limelight-protein-alignment-save-or-update";

            const requestObj = {
                structureFile_Like_PDB_File_Id: item.structureFileId,
                limelightAssigned_ChainId: item.limelightAssigned_ChainId,
                proteinSequenceVersionId: item.proteinSequenceVersionId,
                searchIds_CommaDelimited: item.searchIds_CommaDelimited,
                structureFile_AlignedSequence: item.structureFile_AlignedSequence,
                limelightProteinSequence_AlignedSequence: item.limelightProteinSequence_AlignedSequence
            }

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: true }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason: any) => { reject(reason) }  );

            promise_webserviceCallStandardPost.then( ({ responseData }:{ responseData: any }) => {
                try {
                    if ( ! responseData.statusSuccess ) {
                        window.alert( "Failed to save alignment" )
                        const msg = "failed to save alignment. ( ! responseData.statusSuccess ) "
                        console.warn(msg)
                        throw Error(msg)
                    }

                    const result = new CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value({
                        structureFileId: item.structureFileId,
                        limelightAssigned_ChainId: item.limelightAssigned_ChainId,
                        proteinSequenceVersionId: item.proteinSequenceVersionId,
                        searchIds_CommaDelimited: item.searchIds_CommaDelimited,
                        structureFile_AlignedSequence: item.structureFile_AlignedSequence,
                        limelightProteinSequence_AlignedSequence: item.limelightProteinSequence_AlignedSequence
                    })

                    resolve( result )

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

    /**
     *
     * @param structureFileId
     */
    delete_FromServer(
        {
            structureFile_Like_PDB_File_Id, limelightAssigned_ChainId, proteinSequenceVersionId
        } : {
            /**
             * Parent id
             */
            structureFile_Like_PDB_File_Id: number

            /**
             * Structure File Limelight Assigned Chain Id
             */
            limelightAssigned_ChainId: number

            proteinSequenceVersionId: number
        }) {

        return new Promise<void>( (resolve, reject) => { try {

            const url = "d/rws/for-page/structure-file-chain-to-limelight-protein-alignment-delete";

            const requestObj = {
                structureFile_Like_PDB_File_Id, limelightAssigned_ChainId, proteinSequenceVersionId
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