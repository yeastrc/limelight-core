/**
 * protein_Structure_WidgetDisplay__SequenceAlignment_Overlay_Component.tsx
 *
 *
 * Structure Chain Sequence alignment to
 */

//  Needs updating if will keep

// import React from "react";
//
// import { needlemanWunsch_Algorithm_AlignSequences } from "page_js/data_pages/common__algorithm_implementations/needlemanWunsch_Algorithm_Implementation";
//
// import { limelight_add_ReactComponent_JSX_Element_To_DocumentBody, Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF } from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
// import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
// import { ModalOverlay_Limelight_Component_v001_B_FlexBox } from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
// import { DefaultPluginUISpec, PluginUISpec } from "molstar/lib/mol-plugin-ui/spec";
// import { PluginConfig } from "molstar/lib/mol-plugin/config";
// import { createPluginUI } from "molstar/lib/mol-plugin-ui";
// import { renderReact18 } from "molstar/lib/mol-plugin-ui/react18";
// import { BuiltInTrajectoryFormat } from "molstar/lib/mol-plugin-state/formats/trajectory";
// import { Structure } from "molstar/lib/mol-model/structure/structure/structure";
// import { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
// import { Color as Molstar_Color } from "molstar/lib/commonjs/mol-util/color";
// import { Expression } from "molstar/lib/mol-script/language/expression";
// import { MolScriptBuilder } from "molstar/lib/mol-script/language/builder";
// import { CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value } from "page_js/data_pages/common_data_loaded_from_server__project_level_data/common_data_loaded_from_server__project_level_data__structure_file_data/CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO";
// import { CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT } from "page_js/data_pages/common_data_loaded_from_server__project_level_data/common_data_loaded_from_server__project_level_data__structure_file_data/CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT";
//
//
//
// const _Overlay_Width_Min = 500;
// const _Overlay_Width_Max = 1000;
//
// const _Overlay_Height_Min = 500;
// const _Overlay_Height_Max = 900;
//
// /**
//  * Filler character added to make alignment
//  */
// const _PROTEIN_ALIGNMENT__FILLER_CHARACTER = "-"
//
//
// enum SelectChain_VS_AlignSequences_Flag {
//     SELECT_CHAIN,
//     ALIGN_SEQUENCES
// }
//
//
// enum Show_VS_Edit_Flag {
//     SHOW,
//     EDIT
// }
//
// const _SELECTED_CHAIN_ID__NO_SELECTION = ""
//
//
// export class Protein_Structure_WidgetDisplay__SequenceAlignment_Overlay_Component_AlignmentComplete_Callback_Params {
//
//     structureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value
// }
//
// class Protein_Structure_WidgetDisplay__SequenceAlignment_Overlay_Component_CommonParams {
//
//     structureFile_Like_PDB_File_Id: number
//
//     limelight_Max_SequenceCoverageColor: Molstar_Color
//
//     structureFile_PDB_Etc_Contents: string
//     structureFile_PDB_ETC__DataFormat: BuiltInTrajectoryFormat
//
//     /**
//      * All Chain Ids in the Structure.
//      */
//     chainLabels_ALL_Array_Sorted_OnStructure: Array<string>
//
//     /**
//      * All sequences in the Structure.  Map Key ChainId
//      */
//     sequenceInChain_Map_Key_ChainId: ReadonlyMap<string, string>
//
//     /**
//      * Chain Ids already aligned to Limelight Protein Sequence
//      */
//     chainIds_Aligned_To_Limelight_ProteinSequence: ReadonlySet<string>
//
//     proteinSequence: string
//
//     proteinSequenceVersionId: number
//     proteinNames: string
//
//     searchIds_CommaDelimited: string
//
//     /**
//      * undefined or null if not populated
//      */
//     existing__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value
//
//     commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT
//
//     alignmentComplete_Callback: ( params: Protein_Structure_WidgetDisplay__SequenceAlignment_Overlay_Component_AlignmentComplete_Callback_Params ) => void
// }
//
//
// export const open_protein_Structure_WidgetDisplay__SequenceAlignment_Overlay_Component = function (
//     {
//         commonParams
//     } : {
//         commonParams: Protein_Structure_WidgetDisplay__SequenceAlignment_Overlay_Component_CommonParams
//     }
// ) {
//
//     window.alert("NOT Currently Working.  May be deleted")
//
//     // let overlay_AddedTo_DocumentBody_Holder: Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
//     //
//     // const callbackOn_Cancel_Close_Clicked = (): void => {
//     //
//     //     overlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM()
//     // }
//     //
//     // const overlayComponent = (
//     //     <Protein_Structure_WidgetDisplay__SequenceAlignment_Overlay_Component
//     //         commonParams={ commonParams }
//     //         close_Callback={ callbackOn_Cancel_Close_Clicked }
//     //     />
//     // )
//     //
//     // overlay_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody( { componentToAdd: overlayComponent } );
// }


////  React Components

// /**
//  *
//  */
// interface Protein_Structure_WidgetDisplay__SequenceAlignment_Overlay_Component_Props {
//
//     commonParams: Protein_Structure_WidgetDisplay__SequenceAlignment_Overlay_Component_CommonParams
//     close_Callback: () => void
// }
//
// /**
//  *
//  */
// interface Protein_Structure_WidgetDisplay__SequenceAlignment_Overlay_Component_State {
//
//     objectForceRerender?: object
// }
//
// /**
//  *
//  */
// class Protein_Structure_WidgetDisplay__SequenceAlignment_Overlay_Component extends React.Component< Protein_Structure_WidgetDisplay__SequenceAlignment_Overlay_Component_Props, Protein_Structure_WidgetDisplay__SequenceAlignment_Overlay_Component_State > {
//
//     private _save_Button_In_Show_Clicked_BindThis = this._save_Button_In_Show_Clicked.bind(this)
//     private _edit_Button_Clicked_BindThis = this._edit_Button_Clicked.bind(this)
//
//     private _alignment_TextArea_Changed_BindThis = this._alignment_TextArea_Changed.bind(this)
//     private _save_Button_In_Edit_Clicked_BindThis = this._save_Button_In_Edit_Clicked.bind(this)
//     private _cancel_Button_Clicked_BindThis = this._cancel_Button_Clicked.bind(this)
//
//     private _selectChain_VS_AlignSequences_Flag: SelectChain_VS_AlignSequences_Flag
//
//     /////////////
//
//     //  For Select Chain Block
//
//     private _selectedChainId: string = _SELECTED_CHAIN_ID__NO_SELECTION
//
//     private _proteinStructure_ViewerContainer_Ref: React.RefObject<HTMLDivElement>
//
//
//     private _molstar_PluginUIContext_Reference: PluginUIContext
//
//     /**
//      *
//      */
//     private _molstar_PluginUIContext_Reference_Promise: Promise<PluginUIContext>
//
//
//     /////////////
//
//     //    For Alignment Block
//
//     private _alignment_TextArea_Element_Ref: React.RefObject<HTMLTextAreaElement>
//
//     private _show_VS_Edit_Flag: Show_VS_Edit_Flag = Show_VS_Edit_Flag.SHOW
//
//     private _chainId: string
//     private _sequenceInChain_For_ChainId: string
//
//     private _sequenceAlignment_Initial: {
//         sequenceInChain_Aligned: string
//         proteinSequence_Aligned: string
//     }
//
//     private _sequenceAlignment_Current: string = undefined
//
//     private _errorMessage: string = undefined
//
//     /**
//      *
//      */
//     constructor( props: Protein_Structure_WidgetDisplay__SequenceAlignment_Overlay_Component_Props ) {
//         super( props );
//
//         try {
//             this._proteinStructure_ViewerContainer_Ref = React.createRef();
//             this._alignment_TextArea_Element_Ref = React.createRef();
//
//             this._compute_On_ConstructorCall( props )
//
//             this.state = {
//                 objectForceRerender: {}
//             };
//
//         } catch ( e ) {
//             reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//             throw e
//         }
//     }
//
//     /**
//      * Clean Up
//      */
//     componentWillUnmount() {
//         try {
//             if ( this._molstar_PluginUIContext_Reference ) {
//
//                 this._molstar_PluginUIContext_Reference.dispose()
//
//             } else if ( this._molstar_PluginUIContext_Reference_Promise ) {
//
//                 this._molstar_PluginUIContext_Reference_Promise.then( molstar_Plugin_Reference => {
//                     try {
//
//                         molstar_Plugin_Reference?.dispose()
//
//                     } catch ( e ) {
//
//                         console.warn( "In 'componentWillUnmount()': 'this._molstar_PluginUIContext_Reference_Promise.then': molstar_Plugin_Reference?.dispose() threw exception: ", e )
//                         // reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//                         // throw e
//                     }
//                 } )
//             }
//
//         } catch ( e ) {
//
//             console.warn( "In 'componentWillUnmount()': molstar_Plugin_Reference?.dispose() threw exception: ", e )
//             // reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//             // throw e
//         }
//     }
//
//     /**
//      *
//      */
//     componentDidMount() {  try {
//
//         if ( this._selectChain_VS_AlignSequences_Flag === SelectChain_VS_AlignSequences_Flag.ALIGN_SEQUENCES ) {
//
//             if ( this.props.commonParams.existing__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value ) {
//
//                 const existing_Alignment = this.props.commonParams.existing__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value
//
//                 this._sequenceAlignment_Initial = {
//                     proteinSequence_Aligned: existing_Alignment.limelightProteinSequence_AlignedSequence,
//                     sequenceInChain_Aligned: existing_Alignment.structureFile_AlignedSequence
//                 }
//
//                 this._sequenceAlignment_Current = existing_Alignment.limelightProteinSequence_AlignedSequence + "\n" + existing_Alignment.structureFile_AlignedSequence
//
//                 this._show_VS_Edit_Flag = Show_VS_Edit_Flag.EDIT
//
//                 this.forceUpdate()
//
//                 return  // EARLY RETURN
//             }
//
//             this._compute_SequenceAlignment()
//
//             return  // EARLY RETURN
//         }
//
//         this._initialize_SelectChain()
//
//     } catch ( e ) {
//         reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//         throw e
//     }
//     }
//
//     /**
//      *
//      */
//     private _compute_On_ConstructorCall( props: Protein_Structure_WidgetDisplay__SequenceAlignment_Overlay_Component_Props ) {
//
//         if ( props.commonParams.existing__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value ) {
//
//             this._chainId = props.commonParams.existing__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value.limelightAssigned_ChainId
//
//             this._sequenceInChain_For_ChainId = props.commonParams.sequenceInChain_Map_Key_ChainId.get( this._chainId )
//             if ( ! this._sequenceInChain_For_ChainId ) {
//                 const msg = "if ( props.commonParams.existing_proteinStructure_LikePDB__SequenceAlignment_Chain_FileSequence_to_LimelightSequence__SingleProteinSequenceAlignment ) { BUT props.commonParams.sequenceInChain_Map_Key_ChainId.get( this._chainId ) returned NOTHING for this._chainId:" + this._chainId
//                 console.warn(msg)
//                 throw Error(msg)
//             }
//
//             this._selectChain_VS_AlignSequences_Flag = SelectChain_VS_AlignSequences_Flag.ALIGN_SEQUENCES
//
//             return  // EARLY RETURN
//         }
//
//         if ( props.commonParams.chainLabels_ALL_Array_Sorted_OnStructure.length === ( props.commonParams.chainIds_Aligned_To_Limelight_ProteinSequence.size + 1 ) ) {
//
//             //  Only 1 chain NOT aligned so go directly to align it
//
//             for ( const chainId of props.commonParams.chainLabels_ALL_Array_Sorted_OnStructure ) {
//
//                 if ( ! props.commonParams.chainIds_Aligned_To_Limelight_ProteinSequence.has( chainId ) ) {
//
//                     this._chainId = chainId
//
//                     this._sequenceInChain_For_ChainId = props.commonParams.sequenceInChain_Map_Key_ChainId.get( chainId )
//                     if ( ! this._sequenceInChain_For_ChainId ) {
//                         const msg = "if ( props.commonParams.chainLabels_ALL_Array_Sorted_OnStructure.length === ( props.commonParams.chainIds_Aligned_To_Limelight_ProteinSequence.size + 1 ) ) { BUT props.commonParams.sequenceInChain_Map_Key_ChainId.get( chainId ) returned NOTHING for chainId:" + chainId
//                         console.warn(msg)
//                         throw Error(msg)
//                     }
//
//                     break
//                 }
//             }
//             if ( this._chainId === undefined ) {
//                 const msg = "if ( props.commonParams.chainLabels_ALL_Array_Sorted_OnStructure.length === ( props.commonParams.chainIds_Aligned_To_Limelight_ProteinSequence.size + 1 ) ) { BUT NO VALUE FOUND FOR if ( ! props.commonParams.chainIds_Aligned_To_Limelight_ProteinSequence.has( chainId ) ) {"
//                 console.warn(msg)
//                 throw Error(msg)
//             }
//
//             this._selectChain_VS_AlignSequences_Flag = SelectChain_VS_AlignSequences_Flag.ALIGN_SEQUENCES
//
//             return  // EARLY RETURN
//         }
//
//         //  Select Chain
//
//         this._selectChain_VS_AlignSequences_Flag = SelectChain_VS_AlignSequences_Flag.SELECT_CHAIN
//     }
//
//     /**
//      *
//      */
//     private _initialize_SelectChain() {
//
//         if ( ! this._proteinStructure_ViewerContainer_Ref.current ) {
//             const msg = "_initialize_SelectChain(): if ( ! this._proteinStructure_ViewerContainer_Ref.current ) {"
//             console.warn(msg)
//             throw Error(msg)
//         }
//
//         const containerBoundingRect = this._proteinStructure_ViewerContainer_Ref.current.getBoundingClientRect()
//
//         //  Explicitly set the width and height for the Mol* Structure Viewer.  This assumes no window resize for the duration of this overlay being open
//
//         this._proteinStructure_ViewerContainer_Ref.current.style.width = containerBoundingRect.width + "px"
//         this._proteinStructure_ViewerContainer_Ref.current.style.height = containerBoundingRect.height + "px"
//
//         window.setTimeout( () => { try {
//
//             this._add_StructureViewer_ToOverlay()
//
//         } catch ( e ) {
//             reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//             throw e
//         }}, 50 )
//     }
//
//     /**
//      * Create Mol* Instance
//      *
//      * this._molstar_Plugin_Reference is assigned when the promise returned resolves
//      *
//      * Called from this._add_StructureData_PDB_Etc__TO__MolStar_Instance(...)
//      */
//     private _create_Or_Clear_MolStar_Instance() {
//
//         if ( ! this._proteinStructure_ViewerContainer_Ref.current ) {
//             const msg = "In _loadData_OnMount_After_LoadData: ( ! this._proteinStructure_ViewerContainer_Ref.current ) "
//             console.warn( msg )
//
//             // ssss
//
//             return  //  FAKE  return.  Unclear why .current not populated
//
//             throw Error( msg )
//         }
//
//         if ( this._molstar_PluginUIContext_Reference_Promise ) {
//
//             //  Already have pending Molstar create in progress.  when complete clear it and resolve new returned promise
//
//             //  EARLY RETURN
//             return new Promise<void>( ( resolve, reject ) => {
//                 try {
//
//                     this._molstar_PluginUIContext_Reference_Promise.catch( reason => {
//
//                         this._molstar_PluginUIContext_Reference_Promise = undefined
//
//                         reject( reason )
//                     } )
//                     this._molstar_PluginUIContext_Reference_Promise.then( molstar_Plugin_Reference => {
//                         try {
//                             const clear_Promise = this._molstar_PluginUIContext_Reference.clear()
//
//                             clear_Promise.catch( reason => {
//
//                                 reject( reason )
//                             } )
//
//                             clear_Promise.then( novalue => {
//                                 try {
//
//                                     resolve()
//
//                                 } catch ( e ) {
//                                     reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//                                     throw e
//                                 }
//                             } )
//
//                         } catch ( e ) {
//                             reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//                             throw e
//                         }
//                     } )
//
//                 } catch ( e ) {
//                     reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//                     throw e
//                 }
//             } )
//         }
//
//         if ( this._molstar_PluginUIContext_Reference ) {
//
//             //  Already have Molstar instance.  clear it and resolve new returned promise
//
//             //  EARLY RETURN
//             return new Promise<void>( ( resolve, reject ) => {
//                 try {
//                     const clear_Promise = this._molstar_PluginUIContext_Reference.clear()
//
//                     clear_Promise.catch( reason => {
//
//                         reject( reason )
//                     } )
//
//                     clear_Promise.then( novalue => {
//                         try {
//
//                             resolve()
//
//                         } catch ( e ) {
//                             reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//                             throw e
//                         }
//                     } )
//                 } catch ( e ) {
//                     reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//                     throw e
//                 }
//             } )
//         }
//
//         //  Create Structure Viewer
//
//         //  Show only the canvas without everything around it
//
//         const spec: PluginUISpec = {
//             ...DefaultPluginUISpec(),
//             layout: {
//                 initial: {
//                     showControls: false, // Hides the side panels
//                     isExpanded: false
//                 }
//             },
//             config: [
//                 [ PluginConfig.Viewport.ShowControls, false ],         // Hides the wrench/canvas overlay buttons
//                 [ PluginConfig.Viewport.ShowExpand, false ],           // Hides the Full screen
//                 [ PluginConfig.Viewport.ShowToggleFullscreen, false ], // Hides the Full screen if present
//                 [ PluginConfig.Viewport.ShowSettings, false ],        // Hides the settings gear if present
//                 [ PluginConfig.Viewport.ShowIllumination, false ],    // Hides the Illumination (SSGI) toggle button
//                 [ PluginConfig.Viewport.ShowXR, false ],              // Hides the Augmented Reality / XR toggle button
//             ],
//         }
//         //  Create using 'createPluginUI'
//
//         this._molstar_PluginUIContext_Reference_Promise = createPluginUI( {
//             target: this._proteinStructure_ViewerContainer_Ref.current,
//             render: renderReact18,
//             spec: spec,
//
//             // UI layout options
//             // layoutIsExpanded: true,
//             // layoutShowControls: false, // hides the side controls panel
//             // layoutShowSequence: false, // hides sequence panel
//             // layoutShowLog: false,      // hides bottom log
//             // layoutShowLeftPanel: false,
//             // layoutShowTopPanel: true,  // keep top bar (optional)
//             // viewportShowExpand: true,  // keep expand button (optional)
//             // viewportShowSelectionMode: false
//         } );
//
//         return new Promise<void>( ( resolve, reject ) => {
//             try {
//
//                 this._molstar_PluginUIContext_Reference_Promise.catch( reason => {
//
//                     this._molstar_PluginUIContext_Reference_Promise = undefined
//
//                     reject( reason )
//                 } )
//                 this._molstar_PluginUIContext_Reference_Promise.then( molstar_Plugin_Reference => {
//                     try {
//
//                         this._molstar_PluginUIContext_Reference_Promise = undefined
//
//                         this._molstar_PluginUIContext_Reference = molstar_Plugin_Reference
//
//                         //  Set the background color of viewer
//                         this._molstar_PluginUIContext_Reference.canvas3d?.setProps({
//                             renderer: {
//                                 backgroundColor: Molstar_Color(0xFFFFFF)
//                             }
//                         });
//
//                         resolve()
//
//                     } catch ( e ) {
//                         reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//                         throw e
//                     }
//                 } );
//
//         } catch ( e ) {
//             reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//             throw e
//         }})
//     }
//
//     /**
//      *
//      */
//     private async _add_StructureViewer_ToOverlay() { try {
//
//         await this._create_Or_Clear_MolStar_Instance()
//
//         //  TODO  This works with pdbString being the contents of the PDB file
//         const proteinStructureFile_Data = await this._molstar_PluginUIContext_Reference.builders.data.rawData( {
//             data: this.props.commonParams.structureFile_PDB_Etc_Contents,
//             label: 'Structure Label Parameter Value'  //  TODO  Used in the Default tooltip in the lower right corner
//         } );
//
//         //  Create Structure for below
//
//         const proteinStructureFile_Trajectory = await this._molstar_PluginUIContext_Reference.builders.structure.parseTrajectory( proteinStructureFile_Data, this.props.commonParams.structureFile_PDB_ETC__DataFormat );
//
//         // Create a structure hierarchy
//         const proteinStructureFile_Model = await this._molstar_PluginUIContext_Reference.builders.structure.createModel( proteinStructureFile_Trajectory );
//
//         const structure_StateObjectSelector = await this._molstar_PluginUIContext_Reference.builders.structure.createStructure( proteinStructureFile_Model );
//
//         const structure: Structure = structure_StateObjectSelector.cell.obj?.data
//
//         if ( ! structure ) {
//             const msg = "structure_StateObjectSelector.cell.obj?.data is null or undefined"
//             console.warn(msg)
//             throw Error(msg)
//         }
//
//         this._addRepresentation_ToStructure_TO_Format_and_Color({ structure_StateObjectSelector_Param: structure_StateObjectSelector })
//
//     } catch ( e ) {
//         reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//         throw e
//     }}
//
//     /**
//      *
//      * @private
//      */
//     private async _addRepresentation_ToStructure_TO_Format_and_Color(
//         {
//             structure_StateObjectSelector_Param
//         } : {
//             structure_StateObjectSelector_Param: any
//         }
//     ) {
//         try {
//
//
//             //  Remove Existing Representations
//
//             {
//                 const structures = this._molstar_PluginUIContext_Reference.managers.structure.hierarchy.current.structures;
//
//
//                 // Flatten the list of all components from all structures
//                 const allComponents = structures.flatMap( s => s.components );
//
//
//                 // This now matches the expected type: readonly StructureComponentRef[]
//                 await this._molstar_PluginUIContext_Reference.managers.structure.component.removeRepresentations( allComponents );
//             }
//
//             // this._molstar_PluginUIContext_Reference.builders.structure
//
//             /////////////
//
//             //  OLD code for call '.addRepresentation(...)'
//             // Add it to the plugin’s hierarchy for visualization
//             //         await this._molstar_PluginUIContext_Reference.builders.structure.representation.addRepresentation(structure_StateObjectSelector, {
//             //             type: 'cartoon',
//             //             color: 'chain-id'
//             //         });
//
//
//             const structureRef_FirstStructureUnder_Current_FromPlugin = this._molstar_PluginUIContext_Reference.managers.structure.hierarchy.current.structures[ 0 ]
//
//             let structure_StateObjectSelector = this._molstar_PluginUIContext_Reference.managers.structure.hierarchy.current.structures[ 0 ]?.cell
//
//             if ( ! structure_StateObjectSelector ) {
//
//                 structure_StateObjectSelector = structure_StateObjectSelector_Param
//             }
//
//             {
//
//                 //  Color by Protein Coverage.  TODO   how to color different shades.  Maybe need a call to '.addRepresentation(...)' for each shade of coverage color.
//
//                 //  Color by selected chain
//
//                 for ( const chainId of this.props.commonParams.chainLabels_ALL_Array_Sorted_OnStructure ) {
//
//                     const polymer_Full_Expression = _molstar__PolymerExpression( chainId );
//
//                     let color: Molstar_Color = undefined
//
//                     if ( chainId === this._selectedChainId ) {
//
//                         //  Selected Chain
//
//                         color = this.props.commonParams.limelight_Max_SequenceCoverageColor
//
//                     } else {
//                         color = Molstar_Color( 0xCCCCCC ) // Grey for aligns to Limelight sequence but NO sequence coverage
//                     }
//
//                     const componentKey = 'seq--not-coverage-covered_chain_' + chainId  //  TODO: NOTE every call to '.addRepresentation(...)' needs a different  componentKey value.  Otherwise it is more positions but old color.
//                     const componentLabel = 'Not Covered'
//
//                     const component = await this._molstar_PluginUIContext_Reference.builders.structure
//                         .tryCreateComponentFromExpression( structure_StateObjectSelector, polymer_Full_Expression, componentKey, { label: componentLabel } );
//
//                     if ( component ) {
//
//                         // const type_Representation = this._selected__STRUCTURE_Display_Type as any
//
//                         await this._molstar_PluginUIContext_Reference.builders.structure.representation.addRepresentation( component, {
//                             type: "cartoon",
//                             color: 'uniform',
//                             // ssss: null,  //  TODO  Shows that the Typescript type does NOT validate these properties
//                             colorParams: { value: color },
//                         } );
//                     }
//                 }
//             }
//
//     } catch ( e ) {
//         reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//         throw e
//     }}
//
//
//
//
//     /////////////////
//
//     /**
//      *
//      */
//     private _compute_SequenceAlignment() { try {
//
//         window.setTimeout( () => { try {
//
//             const call_Result_Sequence_Order_1 = needlemanWunsch_Algorithm_AlignSequences( this.props.commonParams.proteinSequence, this._sequenceInChain_For_ChainId )
//
//             const call_Result_Sequence_Order_2 = needlemanWunsch_Algorithm_AlignSequences( this._sequenceInChain_For_ChainId, this.props.commonParams.proteinSequence )
//
//             if ( call_Result_Sequence_Order_1.alignedSeq1 !== call_Result_Sequence_Order_2.alignedSeq2 ) {
//                 const msg = "proteinSequence is aligned differently when first vs second in call to needlemanWunsch_Algorithm_AlignSequences(...). call_Result_Sequence_Order_1.alignedSeq1: '" +
//                     call_Result_Sequence_Order_1.alignedSeq1 +
//                     ", call_Result_Sequence_Order_2.alignedSeq2: '" + call_Result_Sequence_Order_2.alignedSeq2 + "'."
//                 console.error(msg)
//                 throw Error(msg)
//             }
//
//             if ( call_Result_Sequence_Order_1.alignedSeq2 !== call_Result_Sequence_Order_2.alignedSeq1 ) {
//                 const msg = "sequenceInChain is aligned differently when first vs second in call to needlemanWunsch_Algorithm_AlignSequences(...). call_Result_Sequence_Order_1.alignedSeq2: '" +
//                     call_Result_Sequence_Order_1.alignedSeq2 +
//                     ", call_Result_Sequence_Order_2.alignedSeq1: '" + call_Result_Sequence_Order_2.alignedSeq1 + "'."
//                 console.error(msg)
//                 throw Error(msg)
//             }
//
//             this._sequenceAlignment_Initial = {
//                 proteinSequence_Aligned: call_Result_Sequence_Order_1.alignedSeq1,
//                 sequenceInChain_Aligned: call_Result_Sequence_Order_1.alignedSeq2
//             }
//
//             this._sequenceAlignment_Current = call_Result_Sequence_Order_1.alignedSeq1 + "\n" + call_Result_Sequence_Order_1.alignedSeq2
//
//             this.forceUpdate()
//
//         } catch ( e ) {
//             reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//             throw e
//         }}, 50 )
//
//     } catch ( e ) {
//         reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//         throw e
//     }
//     }
//
//     /**
//      *
//      * @param event
//      */
//     private _save_Button_In_Show_Clicked( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) { try {
//
//         //  Save 'this._sequenceAlignment_Initial' since this is the 'Show' and not the 'Edit'
//
//         this._save_OR_Update_SequenceAlignment_ToServer__ExecuteCallback({
//             structureFile_AlignedSequence: this._sequenceAlignment_Initial.sequenceInChain_Aligned,
//             limelightProteinSequence_AlignedSequence: this._sequenceAlignment_Initial.proteinSequence_Aligned,
//             id: undefined
//         })
//
//     } catch ( e ) {
//         reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//         throw e
//     }
//     }
//
//     /**
//      *
//      * @param event
//      */
//     private _edit_Button_Clicked( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) { try {
//
//         this._show_VS_Edit_Flag = Show_VS_Edit_Flag.EDIT
//
//         this.forceUpdate()
//
//     } catch ( e ) {
//         reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//         throw e
//     }
//     }
//
//     /**
//      *
//      * @param event
//      */
//     private _alignment_TextArea_Changed( event: React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement> ) { try {
//
//         this._parse_sequenceAlignment_InProgress()
//
//     } catch ( e ) {
//         reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//         throw e
//     }
//     }
//
//     private _parse_sequenceAlignment_InProgress() {
//
//         if ( ! this._alignment_TextArea_Element_Ref.current ) {
//             return
//         }
//
//         const value_TextArea = this._alignment_TextArea_Element_Ref.current.value
//
//         this._sequenceAlignment_Current = value_TextArea
//
//         const inLines = value_TextArea.split("\n") // Split into lines
//
//         if ( inLines.length !== 2 ) {
//             //  NOT 2 lines
//             this._errorMessage = "There must be exactly 2 lines."
//             this.forceUpdate()
//             return // EARLY RETURN
//         }
//
//         const proteinSequence_Aligned = inLines[ 0 ]
//         const sequenceInChain_Aligned = inLines[ 1 ]
//
//         //  Remove '-' from both '_Aligned' sequences to validate that what is left is the original sequences
//
//         const proteinSequence_From_Aligned = proteinSequence_Aligned.replaceAll( _PROTEIN_ALIGNMENT__FILLER_CHARACTER, "" )
//         const sequenceInChain_From_Aligned = sequenceInChain_Aligned.replaceAll( _PROTEIN_ALIGNMENT__FILLER_CHARACTER, "" )
//
//         if ( proteinSequence_From_Aligned !== this.props.commonParams.proteinSequence ) {
//             //  The aligned proteinSequence is not same as input proteinSequence after remove '-'
//             this._errorMessage = "The Aligned protein sequence (first line) after removing hyphens is not the protein sequence."
//             this.forceUpdate()
//             return // EARLY RETURN
//         }
//
//         if ( sequenceInChain_From_Aligned !== this._sequenceInChain_For_ChainId ) {
//             //  The aligned proteinSequence is not same as input proteinSequence after remove '-'
//             this._errorMessage = "The Aligned sequence in the structure file (second line) after removing hyphens is not the sequence in the structure file."
//             this.forceUpdate()
//             return // EARLY RETURN
//         }
//
//         if ( proteinSequence_Aligned.length !== sequenceInChain_Aligned.length ) {
//             //  The 2 lines are NOT equal length
//             this._errorMessage = "Aligned sequences must be the same length. Use hyphens to indicate insertions in the sequences."
//             this.forceUpdate()
//             return // EARLY RETURN
//         }
//
//         this._errorMessage = undefined
//
//         this.forceUpdate()
//
//         return {
//             proteinSequence_Aligned,
//             sequenceInChain_Aligned
//         }
//     }
//
//     /**
//      *
//      * @param event
//      */
//     private _save_Button_In_Edit_Clicked( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) { try {
//
//         const parse_Result = this._parse_sequenceAlignment_InProgress()
//
//         if ( ! parse_Result ) {
//             return // EARLY RETURN
//         }
//
//         let id: number = undefined
//
//         if ( this.props.commonParams.existing__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value ) {
//
//             id = this.props.commonParams.existing__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value.id
//         }
//
//         this._save_OR_Update_SequenceAlignment_ToServer__ExecuteCallback({
//             structureFile_AlignedSequence: parse_Result.sequenceInChain_Aligned,
//             limelightProteinSequence_AlignedSequence: parse_Result.proteinSequence_Aligned,
//             id
//         })
//
//     } catch ( e ) {
//         reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//         throw e
//     }
//     }
//
//     /**
//      *
//      * @param structureFile_AlignedSequence
//      * @param limelightProteinSequence_AlignedSequence
//      */
//     private _save_OR_Update_SequenceAlignment_ToServer__ExecuteCallback(
//         {
//             structureFile_AlignedSequence, limelightProteinSequence_AlignedSequence, id
//         } : {
//             structureFile_AlignedSequence: string
//             limelightProteinSequence_AlignedSequence: string
//             id: number
//         }
//     ) {
//
//         const itemToSave = new CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value({
//             id,
//             structureFileId: this.props.commonParams.structureFile_Like_PDB_File_Id,
//             limelightAssigned_ChainId: this._chainId,
//             proteinSequenceVersionId: this.props.commonParams.proteinSequenceVersionId,
//             searchIds_CommaDelimited: this.props.commonParams.searchIds_CommaDelimited,
//             structureFile_AlignedSequence: structureFile_AlignedSequence,
//             limelightProteinSequence_AlignedSequence: limelightProteinSequence_AlignedSequence
//         })
//
//         const saveResult_Promise =
//             this.props.commonParams.commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT.
//             get_commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO().
//             save_OR_Update_SequenceAlignment_ToServer( itemToSave )
//
//         saveResult_Promise.catch( (reason: any) => {  }  );
//
//         saveResult_Promise.then( ( saveResult) => {
//             try {
//                 this.props.commonParams.alignmentComplete_Callback({ structureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value: saveResult })
//
//                 this.props.close_Callback()
//
//             } catch (e) {
//                 reportWebErrorToServer.reportErrorObjectToServer({
//                     errorException : e
//                 });
//                 throw e;
//             }
//         });
//
//     }
//
//
//     /**
//      *
//      * @param event
//      */
//     private _cancel_Button_Clicked( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) { try {
//
//         this.props.close_Callback()
//
//     } catch ( e ) {
//         reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//         throw e
//     }
//     }
//
//     /**
//      *
//      */
//     render() {  try {
//
//         let overlay_Title: string = undefined
//
//         if ( this._selectChain_VS_AlignSequences_Flag === SelectChain_VS_AlignSequences_Flag.SELECT_CHAIN ) {
//
//             overlay_Title = "Select Chain"
//
//         } else {
//
//             if ( this._show_VS_Edit_Flag === Show_VS_Edit_Flag.SHOW ) {
//                 overlay_Title = "Show PDB Alignment"
//             } else {
//                 overlay_Title = "Edit PDB Alignment"
//             }
//         }
//
//         return (
//             <ModalOverlay_Limelight_Component_v001_B_FlexBox
//                 widthMinimum={ _Overlay_Width_Min }
//                 widthMaximum={ _Overlay_Width_Max }
//                 heightMinimum={ _Overlay_Height_Min }
//                 heightMaximum={ _Overlay_Height_Max }
//                 title={ overlay_Title }
//                 callbackOnClicked_Close={ this.props.close_Callback }
//                 close_OnBackgroundClick={ false } >
//
//                 <React.Fragment>
//
//                         { this._selectChain_VS_AlignSequences_Flag === SelectChain_VS_AlignSequences_Flag.SELECT_CHAIN ? (
//
//                             this.render_InsideOverlay__Select_Chain()
//                         ) :
//                             this. render_InsideOverlay__Alignment_Sequences()
//                         }
//                 </React.Fragment>
//             </ModalOverlay_Limelight_Component_v001_B_FlexBox>
//         )
//
//     } catch ( e ) {
//         reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//         throw e
//     }
//     }
//
//     /**
//      *
//      */
//     render_InsideOverlay__Select_Chain() {
//
//         const chainSelect_Options_Elements: Array<React.JSX.Element> = []
//
//         if ( this._selectedChainId === _SELECTED_CHAIN_ID__NO_SELECTION ) {
//
//             const element = (
//                 <option
//                     key={ _SELECTED_CHAIN_ID__NO_SELECTION }
//                 >
//                     Select a Chain Id
//                 </option>
//             )
//
//             chainSelect_Options_Elements.push( element )
//         }
//         for ( const chainId of this.props.commonParams.chainLabels_ALL_Array_Sorted_OnStructure ) {
//
//             if ( this.props.commonParams.chainIds_Aligned_To_Limelight_ProteinSequence.has( chainId ) ) {
//                 //  Chain id already aligned so SKIP
//                 continue  // EARLY CONINUE
//             }
//
//             const element = (
//                 <option
//                     key={ chainId }
//                 >
//                     { chainId }
//                 </option>
//             )
//
//             chainSelect_Options_Elements.push( element )
//         }
//
//         return (
//             <>
//                 <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
//                      style={ { marginBottom: 12 } }
//                     // style={ { padding : 6 } }
//                 >
//                     <div>
//                         <span>Chain Id: </span>
//                         <select
//                             value={ this._selectedChainId }
//                             onChange={ event => {
//                                 try {
//                                 this._selectedChainId = event.target.value
//
//                                 this.forceUpdate()
//
//                                     window.setTimeout( () => {
//                                         try {
//
//                                             this._add_StructureViewer_ToOverlay()
//
//                                         } catch ( e ) {
//                                             reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//                                             throw e
//                                         }
//                                     }, 50 )
//
//                                 } catch ( e ) {
//                                     reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//                                     throw e
//                                 }
//                             } }
//                         >
//                             { chainSelect_Options_Elements }
//                         </select>
//                     </div>
//                     <div style={ { marginTop: 6 } }>
//                         <span>
//                             <button
//                                 disabled={ this._selectedChainId === _SELECTED_CHAIN_ID__NO_SELECTION }
//                                 onClick={ event => {
//                                     try {
//
//                                         this._chainId = this._selectedChainId
//
//                                         this.forceUpdate()
//
//                                         window.setTimeout( () => {
//                                             try {
//
//                                                 if ( this._molstar_PluginUIContext_Reference ) {
//
//                                                     this._molstar_PluginUIContext_Reference.dispose()
//                                                 }
//
//                                                 this._sequenceInChain_For_ChainId = this.props.commonParams.sequenceInChain_Map_Key_ChainId.get( this._chainId )
//                                                 if ( ! this._sequenceInChain_For_ChainId ) {
//                                                     const msg = "Button Clicked to choose Chain:  this.props.commonParams.sequenceInChain_Map_Key_ChainId.get( this._chainId ) returned NOTHING for this._chainId:" + this._chainId
//                                                     console.warn( msg )
//                                                     throw Error( msg )
//                                                 }
//
//                                                 this._selectChain_VS_AlignSequences_Flag = SelectChain_VS_AlignSequences_Flag.ALIGN_SEQUENCES
//
//                                                 this.forceUpdate()
//
//                                                 window.setTimeout( () => {
//                                                     try {
//
//                                                         this._compute_SequenceAlignment()
//
//                                                     } catch ( e ) {
//                                                         reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//                                                         throw e
//                                                     }
//                                                 }, 50 )
//
//                                             } catch ( e ) {
//                                                 reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//                                                 throw e
//                                             }
//                                         }, 50 )
//                                     } catch ( e ) {
//                                         reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//                                         throw e
//                                     }
//                                 } }
//                             >
//                                 Choose Chain Id
//                             </button>
//                         </span>
//                         &nbsp;
//                         <button
//                             onClick={ event => {
//                                 try {
//
//                                     this.props.close_Callback()
//
//                                 } catch ( e ) {
//                                     reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//                                     throw e
//                                 }
//                             } }
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </div>
//
//                 <div className=" top-level single-entry-variable-height modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right modal-overlay-body-standard-margin-bottom"
//                      // style={ { marginBottom: 12 } }
//                     // style={ { padding : 6 } }
//                 >
//                     <div
//                         ref={ this._proteinStructure_ViewerContainer_Ref }
//                         style={ { position: "relative", height: "100%" } }  // height: "100%" so get full height for viewer
//                     >
//                         Structure Viewer Here
//                     </div>
//                 </div>
//             </>
//         )
//     }
//
//     /**
//      *
//      */
//     render_InsideOverlay__Alignment_Sequences() {
//
//         if ( ! this._sequenceAlignment_Initial ) {
//             return (
//                 <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
//                      style={ { marginBottom: 12 } }
//                     // style={ { padding : 6 } }
//                 >
//                     <div>
//                         Initial alignment computation in progress...
//                     </div>
//                 </div>
//             );
//         }
//
//         return (
//             <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
//                  style={ { marginBottom: 12 } }
//                 // style={ { padding : 6 } }
//             >
//                 <div style={ { marginTop: 20, marginBottom: 20, fontSize: 16 } }>
//                     { this._show_VS_Edit_Flag === Show_VS_Edit_Flag.SHOW ? (
//                         <span>Showing alignment for </span>
//                     ) : (
//                         <span>Editing alignment for </span>
//                     ) }
//                     <span> { this.props.commonParams.proteinNames } and structure file (Chain { this._chainId }):</span>
//                 </div>
//
//                 { this._show_VS_Edit_Flag === Show_VS_Edit_Flag.SHOW ? (
//
//                     //  Show
//                     <>
//                         <div
//                             style={ { width: "calc(100% - 80px)", overflowX: "auto" } }
//                         >
//                             <div style={ { display: "grid", gridTemplateColumns: "max-content auto", columnGap: 10 } }>
//                                 {/*  Protein Sequence from Limelight  */ }
//                                 <div>
//                                     { this.props.commonParams.proteinNames }
//                                 </div>
//                                 <div style={ { whiteSpace: "nowrap", fontFamily: "monospace" } }>
//                                     { this._sequenceAlignment_Initial.proteinSequence_Aligned }
//                                 </div>
//                                 <div style={ { whiteSpace: "nowrap" } }>
//                                     Structure File ({ this._chainId })
//                                 </div>
//                                 <div style={ { whiteSpace: "nowrap", fontFamily: "monospace" } }>
//                                     { this._sequenceAlignment_Initial.sequenceInChain_Aligned }
//                                 </div>
//                             </div>
//                         </div>
//                         <div style={ { marginTop: 20 } }>
//                             { ( ! this.props.commonParams.existing__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value ) ? (
//                                 <>
//                                     <button
//                                         onClick={ this._save_Button_In_Show_Clicked_BindThis }
//                                     >
//                                         Save
//                                     </button>
//                                     &nbsp;
//                                 </>
//                             ) : null }
//                             <button
//                                 onClick={ this._edit_Button_Clicked_BindThis }
//                             >
//                                 Edit
//                             </button>
//                             &nbsp;
//                             <button
//                                 onClick={ this._cancel_Button_Clicked_BindThis }
//                             >
//                                 cancel
//                             </button>
//                         </div>
//                     </>
//                 ) : (
//                     //  EDIT
//                     <>
//                         <div
//                             style={ { width: "calc(100% - 80px)" } }
//                         >
//                             <div
//                                 // style={ { overflowX: "scroll" } }
//                             >
//                         <textarea
//                             ref={ this._alignment_TextArea_Element_Ref }
//                             style={ { whiteSpace: "nowrap", width: "95%", height: "6em", fontFamily: "monospace" } }
//                             value={ this._sequenceAlignment_Current }
//                             onChange={ this._alignment_TextArea_Changed_BindThis }
//                         />
//                             </div>
//                         </div>
//
//                         { this._errorMessage ? (
//                             <div style={ { color: "red", marginTop: 10 } }>
//                                 { this._errorMessage }
//                             </div>
//                         ) : null }
//
//                         <div style={ { marginTop: 20 } }>
//                             <button
//                                 onClick={ this._save_Button_In_Edit_Clicked_BindThis }
//                             >
//                                 Save
//                             </button>
//                             &nbsp;
//                             <button
//                                 onClick={ this._cancel_Button_Clicked_BindThis }
//                             >
//                                 cancel
//                             </button>
//                         </div>
//                         <div style={ { marginTop: 20 } }>
//                             Instructions:
//                         </div>
//                         <div style={ { marginTop: 5 } }>
//                             Sequence for protein { this.props.commonParams.proteinNames } is on the top and from structure file (Chain { this._chainId }) is on the bottom.
//                         </div>
//
//                         { this.props.commonParams.existing__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value ? (
//                             <div>
//                                 Replace the text above with a new alignment (if desired) and click "Save."
//                             </div>
//                         ) : (
//                             <div>
//                                 Replace the text above with a new alignment and click "Save."
//                             </div>
//                         ) }
//                     </>
//                 ) }
//             </div>
//         )
//     }
//
// }
//
//
// /**
//  *
//  * @param chainId
//  */
// const _molstar__PolymerExpression = function ( chainId: string | null ): Expression {
//     const params: Record<string, Expression> = {
//         'entity-test': MolScriptBuilder.core.rel.eq( [
//             MolScriptBuilder.struct.atomProperty.macromolecular.entityType(),
//             'polymer',
//         ] ),
//     };
//     if ( chainId ) {
//         params[ 'chain-test' ] = MolScriptBuilder.core.rel.eq( [
//             MolScriptBuilder.struct.atomProperty.macromolecular.auth_asym_id(),
//             chainId,
//         ] );
//     }
//     return MolScriptBuilder.struct.generator.atomGroups( params );
// }
//
