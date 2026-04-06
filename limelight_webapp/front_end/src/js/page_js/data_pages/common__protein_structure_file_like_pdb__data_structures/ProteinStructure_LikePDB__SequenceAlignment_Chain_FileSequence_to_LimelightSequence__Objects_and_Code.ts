/**
 * ProteinStructure_LikePDB__SequenceAlignment_Chain_FileSequence_to_LimelightSequence__Objects_and_Code.ts
 *
 *
 * Objects and Code for storing and processing Sequence Alignment of the Sequence in the file to the sequence stored in Limelight for the search
 */

// /**
//  * For Currently Active Protein Structure File Id
//  */
// export class ProteinStructure_LikePDB__SequenceAlignment_Chain_FileSequence_to_LimelightSequence__RootClass {
//
//     readonly proteinStructureFileId: number
//     private _dataFor_Chains_Map_Key_ChainId: Map<string, ProteinStructure_LikePDB__SequenceAlignment_Chain_FileSequence_to_LimelightSequence__SingleChain> = new Map()
//
//     constructor(
//         {
//             proteinStructureFileId
//         } : {
//             proteinStructureFileId: number
//         }
//     ) {
//         this.proteinStructureFileId = proteinStructureFileId
//     }
//
//     is_AnyChains() {
//         if ( this._dataFor_Chains_Map_Key_ChainId.size > 0 ) {
//             return true
//         }
//         return false
//     }
//
//     get_ChainIds_WithData() {
//         return this._dataFor_Chains_Map_Key_ChainId.keys()
//     }
//
//     get_DataForChain( chainId: string ) {
//
//         return this._dataFor_Chains_Map_Key_ChainId.get( chainId )
//     }
//
//     // get_Chains_InChainId_Order() {
//     //
//     //     const result = Array.from( this._dataFor_Chains_Map_Key_ChainId.values() )
//     //     result.sort( (a,b) => {
//     //         if ( a.chainId < b.chainId ) {
//     //             return -1
//     //         }
//     //         if ( a.chainId > b.chainId ) {
//     //             return 1
//     //         }
//     //
//     //         const msg = "Invalid that a.chainId === b.chainId"
//     //         console.warn(msg)
//     //         throw Error(msg)
//     //     })
//     //
//     //     return result
//     // }
//
//     insert_DataForChain( entry : ProteinStructure_LikePDB__SequenceAlignment_Chain_FileSequence_to_LimelightSequence__SingleChain ) {
//
//         this._dataFor_Chains_Map_Key_ChainId.set( entry.chainId, entry )
//     }
//
//     /**
//      * Direct insert of Protein Sequence Alignment
//      * @param entry
//      */
//     insert_DataFor_ProteinSequenceAlignment( entry : ProteinStructure_LikePDB__SequenceAlignment_Chain_FileSequence_to_LimelightSequence__SingleProteinSequenceAlignment ) {
//
//         const chainId = entry.chainId
//
//         let dataFor_Chain = this._dataFor_Chains_Map_Key_ChainId.get( chainId )
//         if ( ! dataFor_Chain ) {
//             dataFor_Chain = new ProteinStructure_LikePDB__SequenceAlignment_Chain_FileSequence_to_LimelightSequence__SingleChain({ chainId })
//             this._dataFor_Chains_Map_Key_ChainId.set( chainId, dataFor_Chain )
//         }
//
//         dataFor_Chain.insert_DataFor_ProteinSequenceVersionId( entry )
//     }
//
//     delete_For_ChainId_ProteinSequenceVersionId(
//         {
//         chainId, proteinSequenceVersionId
//         } : {
//             chainId: string
//             proteinSequenceVersionId: number
//         }) {
//
//         let dataFor_Chain = this._dataFor_Chains_Map_Key_ChainId.get( chainId )
//         if ( dataFor_Chain ) {
//
//             dataFor_Chain.delete_For_ProteinSequenceVersionId({ proteinSequenceVersionId })
//
//             if ( ! dataFor_Chain.is_AnyEntries() ) {
//                 this._dataFor_Chains_Map_Key_ChainId.delete( chainId )
//             }
//         }
//     }
// }
//
//
// /**
//  *
//  */
// export class ProteinStructure_LikePDB__SequenceAlignment_Chain_FileSequence_to_LimelightSequence__SingleChain {
//
//     /**
//      * Structure File Chain Id
//      */
//     readonly chainId: string
//
//     private _dataFor_Chains_Map_Key_ProteinSequenceVersionId: Map<number, ProteinStructure_LikePDB__SequenceAlignment_Chain_FileSequence_to_LimelightSequence__SingleProteinSequenceAlignment> = new Map()
//
//     constructor(
//         {
//             chainId
//         } : {
//             readonly chainId: string
//         }
//     ) {
//         this.chainId = chainId
//     }
//
//     is_AnyEntries() {
//         if ( this._dataFor_Chains_Map_Key_ProteinSequenceVersionId.size > 0 ) {
//             return true
//         }
//         return false
//     }
//
//     get_DataFor_ProteinSequenceVersionId( proteinSequenceVersionId: number ) {
//
//         return this._dataFor_Chains_Map_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId )
//     }
//
//     get_Data_All() {
//
//         return this._dataFor_Chains_Map_Key_ProteinSequenceVersionId.values()
//     }
//
//     insert_DataFor_ProteinSequenceVersionId( entry : ProteinStructure_LikePDB__SequenceAlignment_Chain_FileSequence_to_LimelightSequence__SingleProteinSequenceAlignment ) {
//
//         this._dataFor_Chains_Map_Key_ProteinSequenceVersionId.set( entry.proteinSequenceVersionId, entry )
//     }
//
//     delete_For_ProteinSequenceVersionId(
//         {
//             proteinSequenceVersionId
//         } : {
//             proteinSequenceVersionId: number
//         }
//     ) {
//
//         this._dataFor_Chains_Map_Key_ProteinSequenceVersionId.delete( proteinSequenceVersionId )
//     }
//
//
// }
