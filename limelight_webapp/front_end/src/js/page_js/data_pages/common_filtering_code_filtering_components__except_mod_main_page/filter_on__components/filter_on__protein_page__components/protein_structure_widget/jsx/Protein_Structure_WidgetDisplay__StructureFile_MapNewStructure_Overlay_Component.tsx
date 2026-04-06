/**
 * Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component.tsx
 *
 * Upload a Protein Sequence Structure file --  Validate by parsing with Molstar
 *
 * One type of file is a PDB
 */


import React from "react";

import { DefaultPluginSpec } from "molstar/lib/mol-plugin/spec";
import { PluginContext } from "molstar/lib/mol-plugin/context";

import { Structure, StructureElement, StructureProperties, Unit as Molstar_Unit } from "molstar/lib/mol-model/structure";
import { DefaultPluginUISpec, PluginUISpec } from "molstar/lib/mol-plugin-ui/spec";
import { PluginConfig } from "molstar/lib/mol-plugin/config";
import { createPluginUI } from "molstar/lib/mol-plugin-ui";
import { renderReact18 } from "molstar/lib/mol-plugin-ui/react18";
import { BuiltInTrajectoryFormat } from "molstar/lib/mol-plugin-state/formats/trajectory";
import { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { Color as Molstar_Color } from "molstar/lib/commonjs/mol-util/color";
import { Expression } from "molstar/lib/mol-script/language/expression";
import { MolScriptBuilder } from "molstar/lib/mol-script/language/builder";


//  Molstar_Unit.Kind
//          TS2748: Cannot access ambient const enums when isolatedModules is enabled.
//          TS2475: const enums can only be used in property or index access expressions or the right hand side of an import declaration or export assignment or type query.

// @ts-ignore
const Molstar_Unit_Kind = Molstar_Unit.Kind

// @ts-ignore
if ( ! Molstar_Unit_Kind ) {

    const msg = "Molstar_Unit.Kind is NOT a value. if ( ! Molstar_Unit_Kind ) { "
    console.warn(msg)
    throw Error(msg)
}

// @ts-ignore
const Molstar_Unit_Kind_Atomic = Molstar_Unit_Kind.Atomic


// @ts-ignore
if ( Molstar_Unit_Kind_Atomic === undefined || Molstar_Unit_Kind_Atomic === null ) {

    const msg = "Molstar_Unit.Kind.Atomic is undefined or null. if ( Molstar_Unit_Kind_Atomic === undefined || Molstar_Unit_Kind_Atomic === null ) { "
    console.warn(msg)
    throw Error(msg)
}

import { MenuItem, Select } from "@mui/material";
import { ModalOverlay_Limelight_Component_v001_B_FlexBox } from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";

import { needlemanWunsch_Algorithm_AlignSequences } from "page_js/data_pages/common__algorithm_implementations/needlemanWunsch_Algorithm_Implementation";

import { limelight_add_ReactComponent_JSX_Element_To_DocumentBody, Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF } from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import { limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer, Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component } from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";
import {
    CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry,
    CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Root,
    CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Value, get_DisplayNameString_From_CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry
} from "page_js/data_pages/common_data_loaded_from_server__project_level_data/common_data_loaded_from_server__project_level_data__structure_file_data/CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_DAO";
import { CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT } from "page_js/data_pages/common_data_loaded_from_server__project_level_data/common_data_loaded_from_server__project_level_data__structure_file_data/CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT";
import {
    CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__ResultRoot,
    CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value
} from "page_js/data_pages/common_data_loaded_from_server__project_level_data/common_data_loaded_from_server__project_level_data__structure_file_data/CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO";


const _Overlay_Title = "Map to new structure"

const _Overlay_Width_Min = 500;
const _Overlay_Width_Max = 1000;

const _Overlay_Height_Min = 500;
const _Overlay_Height_Max = 750;


const _STRUCTURE_FILE_SELECT_OPTION_NONE_SELECTED = -999


enum INTERNAL__Overlay_Contents_Panel_ToDisplay {
    INITIAL_DISPLAY,
    EXISTING_STRUCTURE_FILE__ALL_CHAINS_HAVE_ALIGNMENTS,
    UPLOAD_STRUCTURE_FILE,
    DO_NEXT_FOR_EXISTING_FILE_SELECTED,
    SELECT_CHAIN_FOR_ALIGNMENT,
    DO_ALIGNMENT
}

const _STRUCTURE_FILENAME_ALLOWED_TYPE__NOT_SELECTED: BuiltInTrajectoryFormat = null

//  ALL Values Found:
// const _STRUCTURE_FILENAME_ALLOWED_TYPES: Array<BuiltInTrajectoryFormat> = [ "mmcif", "cifCore", "pdb", "pdbqt", "gro", "xyz", "lammps_data", "lammps_traj_data", "mol", "sdf", "mol2" ]

//  Types Supported to start with:
const _STRUCTURE_FILENAME_ALLOWED_TYPES: Array<BuiltInTrajectoryFormat> = [ "mmcif", "pdb" ]

const _STRUCTURE_FILENAME_ALLOWED_TYPES__TEXT_FOR_WEB_PAGE = "pdb (.pdb) or mmcif (.mmcif, .cif)"  //  displayed to user

const _STRUCTURE_FILENAME_ALLOWED_TYPES__ACCEPTED_FILE_SUFFIXES_SET__MAP_KEY_TYPE_BuiltInTrajectoryFormat: Map<BuiltInTrajectoryFormat, Set<string>> = new Map()

const _STRUCTURE_FILENAME_ALLOWED_TYPES__ACCEPTED_FILE_SUFFIXES__SUFFIX_START_CHARACTER = "."

const _structureFilename_Suffix_To_LowerCase_For_Comparison = function ( filename_suffix: string ) {

    return filename_suffix.toLowerCase()
}

{
    {
        //  For 'mmcif' file type

        const fileSuffixes_ForType: Set<string> = new Set()
        {
            const fileSuffix = "cif"

            const fileSuffix_ForCompare_With_StartCharacter = _STRUCTURE_FILENAME_ALLOWED_TYPES__ACCEPTED_FILE_SUFFIXES__SUFFIX_START_CHARACTER + _structureFilename_Suffix_To_LowerCase_For_Comparison( fileSuffix )
            fileSuffixes_ForType.add( fileSuffix_ForCompare_With_StartCharacter )
        }
        {
            const fileSuffix = "mmcif"

            const fileSuffix_ForCompare_With_StartCharacter = _STRUCTURE_FILENAME_ALLOWED_TYPES__ACCEPTED_FILE_SUFFIXES__SUFFIX_START_CHARACTER + _structureFilename_Suffix_To_LowerCase_For_Comparison( fileSuffix )
            fileSuffixes_ForType.add( fileSuffix_ForCompare_With_StartCharacter )
        }
        _STRUCTURE_FILENAME_ALLOWED_TYPES__ACCEPTED_FILE_SUFFIXES_SET__MAP_KEY_TYPE_BuiltInTrajectoryFormat.set( "mmcif", fileSuffixes_ForType )
    }
    {
        //  For 'pdb' file type

        const fileSuffixes_ForType: Set<string> = new Set()
        {
            const fileSuffix = "pdb"

            const fileSuffix_ForCompare_With_StartCharacter = _STRUCTURE_FILENAME_ALLOWED_TYPES__ACCEPTED_FILE_SUFFIXES__SUFFIX_START_CHARACTER + _structureFilename_Suffix_To_LowerCase_For_Comparison( fileSuffix )
            fileSuffixes_ForType.add( fileSuffix_ForCompare_With_StartCharacter )
        }
        _STRUCTURE_FILENAME_ALLOWED_TYPES__ACCEPTED_FILE_SUFFIXES_SET__MAP_KEY_TYPE_BuiltInTrajectoryFormat.set( "pdb", fileSuffixes_ForType )
    }
}

const _STRUCTURE_FILENAME_ALLOWED_TYPES__ACCEPTED_FILE_SUFFIXES__ALL__SET: Set<string> = new Set()

{
    for ( const mapEntry of _STRUCTURE_FILENAME_ALLOWED_TYPES__ACCEPTED_FILE_SUFFIXES_SET__MAP_KEY_TYPE_BuiltInTrajectoryFormat.entries() ) {

        const type_BuiltInTrajectoryFormat = mapEntry[ 0 ]
        const accepted_file_suffixes_set = mapEntry[ 1 ]

        for ( const acceptedFileSuffix of accepted_file_suffixes_set ) {

            _STRUCTURE_FILENAME_ALLOWED_TYPES__ACCEPTED_FILE_SUFFIXES__ALL__SET.add( acceptedFileSuffix )
        }
    }
}

const _STRUCTURE_FILENAME_ALLOWED_TYPES__ACCEPTED_FILE_SUFFIXES__ALL__COMMA_DELIM_STRING = Array.from( _STRUCTURE_FILENAME_ALLOWED_TYPES__ACCEPTED_FILE_SUFFIXES__ALL__SET ).join(",")


// Copied from class below:  private _selected__STRUCTURE_FILENAME_ALLOWED_Type: BuiltInTrajectoryFormat = _STRUCTURE_FILENAME_ALLOWED_TYPE__NOT_SELECTED

//  Only accept files of suffix of selected type
// const _STRUCTURE_FILENAME_ALLOWED_SUFFIXES_COMMA_DELIMITED = _STRUCTURE_FILENAME_ALLOWED_TYPES.join(",")




enum Alignment__Show_VS_Edit_Flag {
    SHOW,
    EDIT
}

const _ALIGNMENT__SELECTED__LIMELIGHT_ASSIGNED_CHAIN_ID__NO_SELECTION: number = Number.NEGATIVE_INFINITY

const _ALIGNMENT__SELECTED__LIMELIGHT_ASSIGNED_CHAIN_ID__NO_SELECTION_AS_STRING = _ALIGNMENT__SELECTED__LIMELIGHT_ASSIGNED_CHAIN_ID__NO_SELECTION.toString()

/**
 * Filler character added to make alignment
 */
const _PROTEIN_ALIGNMENT__FILLER_CHARACTER = "-"


///////////////////

export class Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component_Complete_Callback_Params {

    structureFile_Contents_Entry_Value: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Value
    proteinSequenceStructureFile_Contents: string
    structureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value
}

export class Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component_Complete_OnlyChangeAlignment_Callback_Params {

    structureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value
}
class Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component_CommonParams__ExistingAlignment_SubParams {

    canEditAlignment: boolean
    structureSequence_InChain: string
    chainData: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry
    structureFile__ProteinAlignment__CurrentProtein: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value
    structureFile_Contents_Entry_Value: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Value

    onlyChangeAlignment_Callback: ( params: Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component_Complete_OnlyChangeAlignment_Callback_Params ) => void
}

class Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component_CommonParams {

    proteinSequence: string
    proteinNames: string


    proteinSequenceVersionId: number
    searchIds_CommaDelimited: string

    limelight_SequenceCoverageColor_For_MaxValue: Molstar_Color

    commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT

    uploadComplete_Callback: ( params: Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component_Complete_Callback_Params ) => void

    /**
     * Skip to show/edit existing alignment when populated
     */
    existingAlignment_SubParams: Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component_CommonParams__ExistingAlignment_SubParams
}


export const open_Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component = function (
    {
        commonParams
    } : {
        commonParams: Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component_CommonParams
    }
) {
    let overlay_AddedTo_DocumentBody_Holder: Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF

    const callbackOn_Cancel_Close_Clicked = (): void => {

        overlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM()
    }

    const overlayComponent = (
        <Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component
            commonParams={ commonParams }
            close_Callback={ callbackOn_Cancel_Close_Clicked }
        />
    )

    overlay_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody( { componentToAdd: overlayComponent } );
}


////  React Components

/**
 *
 */
interface Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component_Props {

    commonParams: Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component_CommonParams
    close_Callback: () => void
}

/**
 *
 */
interface Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component_State {

    objectForceRerender?: object
}

/**
 *
 */
class Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component extends React.Component< Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component_Props, Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component_State > {

    //  bind to 'this' for passing as parameters
    private _upload_StructureFile_PDB_Etc_InputElement_Ref_Changed_BindThis = this._upload_StructureFile_PDB_Etc_InputElement_Ref_Changed.bind(this);

    private _upload_Button_Clicked_BindThis = this._upload_StructureFile_Button_Clicked.bind(this)
    private _cancel_Button_Clicked_BindThis = this._cancel_Button_Clicked.bind(this)

    private _alignment_save_Button_In_Show_Clicked_BindThis = this._alignment_save_Button_In_Show_Clicked.bind(this)
    private _alignment_edit_Button_Clicked_BindThis = this._alignment_edit_Button_Clicked.bind(this)

    private _alignment_TextArea_Changed_BindThis = this._alignment_TextArea_Changed.bind(this)
    private _alignment_save_Button_In_Edit_Clicked_BindThis = this._alignment_save_Button_In_Edit_Clicked.bind(this)

    //  "Ref"

    private _upload_StructureFile_PDB_Etc_InputElement_Ref: React.RefObject<HTMLInputElement>

    private _description_InputElement_Ref:  React.RefObject<HTMLInputElement>

    ////

    private _overlay_Contents_Panel_ToDisplay = INTERNAL__Overlay_Contents_Panel_ToDisplay.INITIAL_DISPLAY

    //  Initial Screen

    private _initialData_Show_LoadingMessage = true

    private _structureFile_Contents_Entry_Array__InitialData: Array<CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Value>

    /**
     * ALSO updated by uploading a new file
     */
    private _structureFile_Contents_Entry_Selection__InitialData: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Value

    /**
     * Goes along with _structureFile_Contents_Entry_Selection__InitialData
     */
    private _proteinSequenceStructureFile_Contents__For_SelectChain: string

    private _alignmentEntries_Result__For_SelectChain: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__ResultRoot


    ////////

    //  Upload Structure File

    private _upload_StructureFile_PDB_Etc_Disabled = true

    private _upload_StructureFile_PDB_Etc_InputElement_SingleValue_Populated = false

    private _selected__STRUCTURE_FILENAME_ALLOWED_Type: BuiltInTrajectoryFormat = _STRUCTURE_FILENAME_ALLOWED_TYPE__NOT_SELECTED

    private _upload__FileSelected_AND_File_Type_From_UploadedFilename_Accepted = false

    private _upload__FileSelected_AND_File_Type_From_UploadedFilename_Accepted_OrSelected = false


    private _errorMessage_StructureFile_Upload: string = undefined

    private _show_Uploading_StructureFile_Message = false

    ////////////

    //    Data from Structure file - new or existing

    private _proteinSequenceStructureFile_Contents__Passed_IsValid: string

    /**
     * All Parsed Chain data in the Structure.  The order the chains were retrieved from structure file.
     */
    private _chainData_Parsed_From_OnStructure_In_StructureFile_Order_Array: Array<CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry>

    /**
     * All Parsed Chain data in the Structure.  Sorted to order of Label (label is most common label for chain id)
     */
    private _chainData_Parsed_From_OnStructure_In_Label_Order_Array: Array<CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry>

    /**
     * Limelight Assigned Chain Id Selected for Alignment
     */
    private _limelightAssigned_ChainId_Selected_For_Alignment: number

    private _sequenceInChain_Map_Key_LimelightAssigned_ChainId: Map<number, string>

    /////////////

    /////////////

    //  For Select Chain Block

    private _in_DoAlignment_Show__NavigatedFrom_Select_Chain = false

    //    For Alignment Block

    private _alignment_TextArea_Element_Ref: React.RefObject<HTMLTextAreaElement>

    private _alignment_show_VS_Edit_Flag: Alignment__Show_VS_Edit_Flag = Alignment__Show_VS_Edit_Flag.SHOW

    private _alignment_limelightAssigned_ChainId: number
    private _alignment_sequenceInChain_For_limelightAssigned_ChainId: string
    private _alignment_ChainDisplayString_For_limelightAssigned_ChainId: string

    private _alignment_sequenceAlignment_Initial: {
        sequenceInChain_Aligned: string
        proteinSequence_Aligned: string
    }

    private _alignment_sequenceAlignment_Current: string = undefined

    private _alignment_errorMessage: string = undefined


    /**
     *
     */
    constructor( props: Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component_Props ) {
        super( props );

        try {
            this._upload_StructureFile_PDB_Etc_InputElement_Ref = React.createRef();
            this._description_InputElement_Ref = React.createRef();

            // this._proteinStructure_ViewerContainer_Ref = React.createRef();
            this._alignment_TextArea_Element_Ref = React.createRef();

            if ( this.props.commonParams.existingAlignment_SubParams ) {

                //  Existing Alignment

                this._overlay_Contents_Panel_ToDisplay = INTERNAL__Overlay_Contents_Panel_ToDisplay.DO_ALIGNMENT

                this._initialData_Show_LoadingMessage = false

                this._alignment_ChainDisplayString_For_limelightAssigned_ChainId = this.props.commonParams.existingAlignment_SubParams.chainData.chainId_Label_AssignedAt_StructureFileCreation

                this._alignment_sequenceAlignment_Initial = {
                    proteinSequence_Aligned: this.props.commonParams.existingAlignment_SubParams.structureFile__ProteinAlignment__CurrentProtein.limelightProteinSequence_AlignedSequence,
                    sequenceInChain_Aligned: this.props.commonParams.existingAlignment_SubParams.structureFile__ProteinAlignment__CurrentProtein.structureFile_AlignedSequence
                }

                this._alignment_sequenceAlignment_Current = this.props.commonParams.existingAlignment_SubParams.structureFile__ProteinAlignment__CurrentProtein.limelightProteinSequence_AlignedSequence + "\n" +
                    this.props.commonParams.existingAlignment_SubParams.structureFile__ProteinAlignment__CurrentProtein.structureFile_AlignedSequence

                this._alignment_sequenceInChain_For_limelightAssigned_ChainId = this.props.commonParams.existingAlignment_SubParams.structureSequence_InChain

                this._structureFile_Contents_Entry_Selection__InitialData = this.props.commonParams.existingAlignment_SubParams.structureFile_Contents_Entry_Value
                this._alignment_limelightAssigned_ChainId = this.props.commonParams.existingAlignment_SubParams.structureFile__ProteinAlignment__CurrentProtein.limelightAssigned_ChainId
            }

            this.state = {
                objectForceRerender: {}
            };

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     */
    componentDidMount() { try {

        this._runOn_ComponentDidMount()

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }

    /**
     *
     */
    private async _runOn_ComponentDidMount() {

        if ( this.props.commonParams.existingAlignment_SubParams ) {

            //  NOT need any of this when view/edit existing alignment

            return  // EARLY RETURN
        }

        const structureFile_Entries_AllFor_ProjectId_GetResult =
            await
                this.props.commonParams.commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT.
                get_commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_DAO().
                get_StructureFile_Entries_AllFor_ProjectId_WebserviceCall_RestrictedTo_Researcher_ProjectOwner()

        this._structureFile_Contents_Entry_Array__InitialData = structureFile_Entries_AllFor_ProjectId_GetResult.resultEntries

        if ( this._structureFile_Contents_Entry_Array__InitialData.length === 0 ) {

            this._overlay_Contents_Panel_ToDisplay = INTERNAL__Overlay_Contents_Panel_ToDisplay.UPLOAD_STRUCTURE_FILE
        }

        this._initialData_Show_LoadingMessage = false

        this.forceUpdate()
    }

    //////////////

    /**
     *
     * @param event
     * @private
     */
    private _upload_StructureFile_PDB_Etc_InputElement_Ref_Changed( event: React.ChangeEvent<HTMLInputElement, HTMLInputElement> ) { try {

        if ( ! this._upload_StructureFile_PDB_Etc_InputElement_Ref.current ) {

            this._upload__General_Set_UploadButton_Disabled_AsRequired()

            return  // EARLY RETURN
        }

        if ( this._upload_StructureFile_PDB_Etc_InputElement_Ref.current.files.length === 0 ) {
            // No File Selected

            this._upload_StructureFile_PDB_Etc_InputElement_SingleValue_Populated = false

            this._upload__General_Set_UploadButton_Disabled_AsRequired()

            this.forceUpdate()

            return // EARLY RETURN
        }

        if ( this._upload_StructureFile_PDB_Etc_InputElement_Ref.current.files.length > 1 ) {
            // > 1 File Selected
            this._errorMessage_StructureFile_Upload = "Only 1 file can be uploaded at a time"

            this._upload_StructureFile_PDB_Etc_InputElement_SingleValue_Populated = false

            this._upload__General_Set_UploadButton_Disabled_AsRequired()

            this.forceUpdate()

            return; // EARLY RETURN
        }

        this._selected__STRUCTURE_FILENAME_ALLOWED_Type = null

        {
            const structureFile_PDB_Etc = this._upload_StructureFile_PDB_Etc_InputElement_Ref.current.files[ 0 ]; // first element

            const filename = structureFile_PDB_Etc.name

            const filename_SuffixStartIndex = filename.lastIndexOf( _STRUCTURE_FILENAME_ALLOWED_TYPES__ACCEPTED_FILE_SUFFIXES__SUFFIX_START_CHARACTER )

            const filename_Suffix = filename.substring( filename_SuffixStartIndex ) // keep '.' since strings comparing to will have it

            const filename_Suffix_ForCompare = _structureFilename_Suffix_To_LowerCase_For_Comparison( filename_Suffix )

            //  Find file type based on filename suffix

            for ( const mapEntry of _STRUCTURE_FILENAME_ALLOWED_TYPES__ACCEPTED_FILE_SUFFIXES_SET__MAP_KEY_TYPE_BuiltInTrajectoryFormat.entries() ) {

                const fileType = mapEntry[ 0 ]
                const filenameSuffixes_For_FileType = mapEntry[ 1 ]

                for ( const filenameSuffix_For_FileType of filenameSuffixes_For_FileType ) {

                    if ( filename_Suffix_ForCompare === filenameSuffix_For_FileType ) {

                        this._selected__STRUCTURE_FILENAME_ALLOWED_Type = fileType

                        break
                    }
                }
            }
        }

        if ( ! this._selected__STRUCTURE_FILENAME_ALLOWED_Type ) {

            //  Filename Suffix not found

            //  TODO do something here

            this._upload__FileSelected_AND_File_Type_From_UploadedFilename_Accepted = false

            this._upload__FileSelected_AND_File_Type_From_UploadedFilename_Accepted_OrSelected = false
        } else {
            this._upload__FileSelected_AND_File_Type_From_UploadedFilename_Accepted = true

            this._upload__FileSelected_AND_File_Type_From_UploadedFilename_Accepted_OrSelected = true
        }

        this._upload_StructureFile_PDB_Etc_InputElement_SingleValue_Populated = true
        this._errorMessage_StructureFile_Upload = undefined

        this._upload__General_Set_UploadButton_Disabled_AsRequired()

        this.forceUpdate()

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }

    /**
     *
     */
    private _upload__General_Set_UploadButton_Disabled_AsRequired() { try {

        if ( ! this._upload_StructureFile_PDB_Etc_InputElement_SingleValue_Populated ) {

            this._upload_StructureFile_PDB_Etc_Disabled = true

        } else if ( ! this._upload__FileSelected_AND_File_Type_From_UploadedFilename_Accepted_OrSelected ) {

            this._upload_StructureFile_PDB_Etc_Disabled = true

        } else if ( ! this._description_InputElement_Ref.current ) {

            this._upload_StructureFile_PDB_Etc_Disabled = true

        } else if ( this._description_InputElement_Ref.current.value.trim() === "" ) {

            this._upload_StructureFile_PDB_Etc_Disabled = true

        } else {

            this._upload_StructureFile_PDB_Etc_Disabled = false
        }

        this.forceUpdate()

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }

    /**
     *
     */
    private async _process_ProteinStructureFile_Upload() {
        try {
            this._upload__General_Set_UploadButton_Disabled_AsRequired()

            if ( ! this._upload_StructureFile_PDB_Etc_InputElement_Ref.current ) {
                return // EARLY RETURN
            }

            if ( this._upload_StructureFile_PDB_Etc_InputElement_Ref.current.files.length === 0 ) {
                // No File Selected
                this._errorMessage_StructureFile_Upload = "A file must be selected"

                this._upload_StructureFile_PDB_Etc_InputElement_SingleValue_Populated = false
                this.forceUpdate()

                return // EARLY RETURN
            }

            if ( this._upload_StructureFile_PDB_Etc_InputElement_Ref.current.files.length > 1 ) {
                // > 1 File Selected
                this._errorMessage_StructureFile_Upload = "Only 1 file can be uploaded at a time"

                this._upload_StructureFile_PDB_Etc_InputElement_SingleValue_Populated = false
                this.forceUpdate()

                return; // EARLY RETURN
            }

            const description = this._description_InputElement_Ref.current.value

            if ( description.trim() === "" ) {
                // NO Description
                this._errorMessage_StructureFile_Upload = "Description is required"

                this.forceUpdate()

                return; // EARLY RETURN
            }

            const structureFile_PDB_Etc = this._upload_StructureFile_PDB_Etc_InputElement_Ref.current.files[0]; // first element

            const filename = structureFile_PDB_Etc.name

            const fileSize = structureFile_PDB_Etc.size

            let proteinSequenceStructureFile_Contents: string = undefined

            try {
                proteinSequenceStructureFile_Contents = await structureFile_PDB_Etc.text(); // Read the file content as a string
            } catch (error) {

                this._errorMessage_StructureFile_Upload = "Error reading file: " + filename

                this.forceUpdate()

                console.error("Error reading file: " + filename + ", error: ", error);

                return // EARLY RETURN
            }


            //////   !!!!!!!!!!    TODO  Defaulting to assume always PDB file format
            // const structureFile_PDB_ETC__DataFormat: BuiltInTrajectoryFormat = "pdb"  //  TODO  Defaulting to assume always PDB file format


            //  TODO  FAKE Test with other formats

            // const structureFile_PDB_ETC__DataFormat: BuiltInTrajectoryFormat = "mmcif"
            //
            // const structureFile_PDB_ETC__DataFormat: BuiltInTrajectoryFormat = "mol"
            //
            // const structureFile_PDB_ETC__DataFormat: BuiltInTrajectoryFormat = "mmcif"
            //
            // const structureFile_PDB_ETC__DataFormat: BuiltInTrajectoryFormat = "mmcif"

            const structureFile_PDB_ETC__DataFormat: BuiltInTrajectoryFormat = this._selected__STRUCTURE_FILENAME_ALLOWED_Type



            const isValid_Result = await this._process_StructureFile_PDB_Etc_Contents__Return_TrueIfValid({ proteinSequenceStructureFile_Contents, structureFile_PDB_ETC__DataFormat })

            if ( isValid_Result ) {

                const structureFile_Contents__ChainsData_Root: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Root = {

                    entries: this._chainData_Parsed_From_OnStructure_In_StructureFile_Order_Array
                }

                this._process_ProteinStructureFile_Upload_AfterValidation({
                    filename,
                    contentSize_InBytes: fileSize,
                    description, proteinSequenceStructureFile_Contents, structureFile_PDB_ETC__DataFormat,
                    structureFile_Contents__ChainsData_Root: structureFile_Contents__ChainsData_Root
                })

            } else {

                this._errorMessage_StructureFile_Upload = "Failed to parse file '" + filename + "'."

                this.forceUpdate()
            }

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     */
    private async _process_StructureFile_PDB_Etc_Contents__Return_TrueIfValid(
        {
            proteinSequenceStructureFile_Contents, structureFile_PDB_ETC__DataFormat
        } : {
            proteinSequenceStructureFile_Contents: string
            structureFile_PDB_ETC__DataFormat: BuiltInTrajectoryFormat
        }) : (
        Promise<boolean> ){
        try {

            // 1. Create a minimal Plugin Context without DOM
            const spec = DefaultPluginSpec();
            const plugin = new PluginContext( spec );
            await plugin.init();

            // 2. Load PDB data as string
            const data = await plugin.builders.data.rawData( { data: proteinSequenceStructureFile_Contents, label: 'test.pdb' } );

            // 3. Parse and create trajectory (without rendering)
            const proteinStructureFile_Trajectory = await plugin.builders.structure.parseTrajectory( data, structureFile_PDB_ETC__DataFormat );
            const proteinStructureFile_Model = await plugin.builders.structure.createModel( proteinStructureFile_Trajectory );
            const structure_StateObjectSelector = await plugin.builders.structure.createStructure( proteinStructureFile_Model );

            const structure: Structure = structure_StateObjectSelector.cell.obj?.data

            if ( ! structure ) {
                const msg = "structure_StateObjectSelector.cell.obj?.data is null or undefined"
                console.warn(msg)
                throw Error(msg)
            }

            const compute_FromStructure_Result =
                _molstar_ListChains_SingleStructure_Returns__ChainData_Parsed__SequenceInChain_Map_Key_LimelightAssigned_ChainId( structure )

            this._chainData_Parsed_From_OnStructure_In_StructureFile_Order_Array = compute_FromStructure_Result.result__structureFile_Contents__ChainsData_Entry_Array
            this._chainData_Parsed_From_OnStructure_In_Label_Order_Array = compute_FromStructure_Result.result__structureFile_Contents__ChainsData_Entry_Array
            this._sequenceInChain_Map_Key_LimelightAssigned_ChainId = compute_FromStructure_Result.sequenceInChain_Map_Key_LimelightAssigned_ChainId

            if ( ( ! this._chainData_Parsed_From_OnStructure_In_Label_Order_Array ) || this._chainData_Parsed_From_OnStructure_In_Label_Order_Array.length === 0 ) {

                //  NO structures to retrieve Chain Labels from

                //  TODO

                // const msg = "NO structures to retrieve Chain Labels from"
                // console.warn(msg)
                // throw Error(msg)

            } else {

                this._chainData_Parsed_From_OnStructure_In_Label_Order_Array.sort( (a,b) => {
                    if ( a.chainId_Label_AssignedAt_StructureFileCreation < b.chainId_Label_AssignedAt_StructureFileCreation ) {
                        return -1
                    }
                    if ( a.chainId_Label_AssignedAt_StructureFileCreation > b.chainId_Label_AssignedAt_StructureFileCreation ) {
                        return 1
                    }
                    return 0
                })
            }

            this._proteinSequenceStructureFile_Contents__Passed_IsValid = proteinSequenceStructureFile_Contents

            return  true

        } catch ( e ) {

            return false
        }
    }

    /**
     *
     */
    private async _process_ProteinStructureFile_Upload_AfterValidation(
        {
            filename, contentSize_InBytes, description, proteinSequenceStructureFile_Contents, structureFile_PDB_ETC__DataFormat, structureFile_Contents__ChainsData_Root
        } : {
            filename: string
            contentSize_InBytes: number
            description: string
            proteinSequenceStructureFile_Contents: string
            structureFile_PDB_ETC__DataFormat: BuiltInTrajectoryFormat

            structureFile_Contents__ChainsData_Root: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Root
        }
    ) {
        try {
            this._show_Uploading_StructureFile_Message = true

            this.forceUpdate()

            const structureFile_Contents_Entry_Value_AfterSave =
                await
                    this.props.commonParams.commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT.
                    get_commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_DAO().
                    saveNew_StructureFile_Contents_ToServer({
                        structureFile_Contents_Entry_Value: {
                            structureFileId: undefined,
                            name: filename,
                            description,
                            structureFile_PDB_ETC__DataFormat
                        },
                        structureFile_Contents__ChainsData_Root,
                        proteinSequenceStructureFile_Contents,
                        contentSize_InBytes
                    })

            if ( ! structureFile_Contents_Entry_Value_AfterSave ) {
                //  NO Data returned so likely got error so exit
                return  // EARLY RETURN
            }

            this._structureFile_Contents_Entry_Selection__InitialData = structureFile_Contents_Entry_Value_AfterSave

            this._proteinSequenceStructureFile_Contents__For_SelectChain = proteinSequenceStructureFile_Contents

            window.setTimeout( () => { try {

                this._show_Uploading_StructureFile_Message = false

                if ( ! this._chainData_Parsed_From_OnStructure_In_Label_Order_Array ) {
                    const msg = "In _process_ProteinStructureFile_Upload_AfterValidation(...) AND  ( ! this._chainData_Parsed_From_OnStructure_In_Label_Order_Array ) "
                    console.warn(msg)
                    throw Error(msg)
                }

                if ( this._chainData_Parsed_From_OnStructure_In_Label_Order_Array.length > 1 ) {

                    this._overlay_Contents_Panel_ToDisplay = INTERNAL__Overlay_Contents_Panel_ToDisplay.SELECT_CHAIN_FOR_ALIGNMENT

                    this.forceUpdate()

                } else if ( this._chainData_Parsed_From_OnStructure_In_Label_Order_Array.length === 1 ) {

                    const chainData_Parsed_From_OnStructure_FIRST = this._chainData_Parsed_From_OnStructure_In_Label_Order_Array[ 0 ]
                    this._limelightAssigned_ChainId_Selected_For_Alignment = chainData_Parsed_From_OnStructure_FIRST.limelightAssigned_ChainId

                    this._in_DoAlignment_Show__NavigatedFrom_Select_Chain = false

                    this._initialize_DoAlignment()
                } else {
                    const msg = "In _process_ProteinStructureFile_Upload_AfterValidation(...) AND  ( this._chainData_Parsed_From_OnStructure_In_Label_Order_Array.length NOT 1 or > 1 ) "
                    console.warn(msg)
                    throw Error(msg)
                }

            } catch ( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                throw e
            }
            }, 50 )

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     * @param event
     */
    private _upload_StructureFile_Button_Clicked( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) { try {

        this._process_ProteinStructureFile_Upload()

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }

    /**
     *
     * @param event
     */
    private _cancel_Button_Clicked( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) { try {

        this.props.close_Callback()

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }

    /**
     *
     * @param existingEntry_Selected
     */
    private _existing_StructureFile_Chosen(  existingEntry_Selected: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Value ) {


        this._structureFile_Contents_Entry_Selection__InitialData = existingEntry_Selected

        this._overlay_Contents_Panel_ToDisplay = INTERNAL__Overlay_Contents_Panel_ToDisplay.DO_NEXT_FOR_EXISTING_FILE_SELECTED

        this.forceUpdate()

        window.setTimeout( async () => { try {

            const structureFile_Contents_Entry_Contents_Value =
                await
                    this.props.commonParams.commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT.
                    get_commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Contents_Value().
                    get_proteinSequenceStructureFile_Contents_for_StructureFileId_ReturnsPromise( existingEntry_Selected.structureFileId )

            //  This step gets the chains data

            const structureFileContents_isValid =
                await this._process_StructureFile_PDB_Etc_Contents__Return_TrueIfValid( {
                    proteinSequenceStructureFile_Contents: structureFile_Contents_Entry_Contents_Value.proteinSequenceStructureFile_Contents,
                    structureFile_PDB_ETC__DataFormat: existingEntry_Selected.structureFile_PDB_ETC__DataFormat
            })

            if ( ! this._chainData_Parsed_From_OnStructure_In_Label_Order_Array ) {
                const msg = "In _existing_StructureFile_Chosen(...) AND  ( ! this._chainData_Parsed_From_OnStructure_In_Label_Order_Array ) "
                console.warn(msg)
                throw Error(msg)
            }

            if ( this._chainData_Parsed_From_OnStructure_In_Label_Order_Array.length > 1 ) {

                const alignmentEntries_Result =
                    await
                        this.props.commonParams.commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT.
                        get_commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO().
                        get_StructureFile_Alignment_Entries_AllFor_StructureFileId_ProteinSequenceVersionId_WebserviceCall({
                            structureFileId: existingEntry_Selected.structureFileId,
                            proteinSequenceVersionId: this.props.commonParams.proteinSequenceVersionId
                        })

                if ( alignmentEntries_Result.resultEntries.length >= this._chainData_Parsed_From_OnStructure_In_Label_Order_Array.length ) {

                    this._overlay_Contents_Panel_ToDisplay = INTERNAL__Overlay_Contents_Panel_ToDisplay.EXISTING_STRUCTURE_FILE__ALL_CHAINS_HAVE_ALIGNMENTS
                    this.forceUpdate()
                } else {
                    const proteinSequenceStructureFile_Contents_for_StructureFileId =
                        await
                            this.props.commonParams.commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT.
                            get_commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Contents_Value().
                            get_proteinSequenceStructureFile_Contents_for_StructureFileId_ReturnsPromise( this._structureFile_Contents_Entry_Selection__InitialData.structureFileId )

                    this._proteinSequenceStructureFile_Contents__For_SelectChain = proteinSequenceStructureFile_Contents_for_StructureFileId.proteinSequenceStructureFile_Contents

                    this._alignmentEntries_Result__For_SelectChain = alignmentEntries_Result

                    this._overlay_Contents_Panel_ToDisplay = INTERNAL__Overlay_Contents_Panel_ToDisplay.SELECT_CHAIN_FOR_ALIGNMENT

                    this.forceUpdate()
                }

            } else if ( this._chainData_Parsed_From_OnStructure_In_Label_Order_Array.length === 1 ) {

                const alignmentEntries_Result =
                    await
                        this.props.commonParams.commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT.
                        get_commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO().
                        get_StructureFile_Alignment_Entries_AllFor_StructureFileId_ProteinSequenceVersionId_WebserviceCall({
                            structureFileId: existingEntry_Selected.structureFileId,
                            proteinSequenceVersionId: this.props.commonParams.proteinSequenceVersionId
                        })

                if ( alignmentEntries_Result.resultEntries.length >= this._chainData_Parsed_From_OnStructure_In_Label_Order_Array.length ) {

                    this._overlay_Contents_Panel_ToDisplay = INTERNAL__Overlay_Contents_Panel_ToDisplay.EXISTING_STRUCTURE_FILE__ALL_CHAINS_HAVE_ALIGNMENTS

                    this.forceUpdate()

                } else {

                    const chainData_Parsed_From_OnStructure_FIRST = this._chainData_Parsed_From_OnStructure_In_Label_Order_Array[ 0 ]
                    this._limelightAssigned_ChainId_Selected_For_Alignment = chainData_Parsed_From_OnStructure_FIRST.limelightAssigned_ChainId

                    this._in_DoAlignment_Show__NavigatedFrom_Select_Chain = false

                    this._initialize_DoAlignment()
                }
            } else {
                const msg = "In _existing_StructureFile_Chosen(...) AND  ( this._chainData_Parsed_From_OnStructure_In_Label_Order_Array.length NOT 1 or > 1 ) "
                console.warn(msg)
                throw Error(msg)
            }

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
        }, 50 )
    }

    /**
     *
     */
    private _initialize_DoAlignment() {

        this._overlay_Contents_Panel_ToDisplay = INTERNAL__Overlay_Contents_Panel_ToDisplay.DO_ALIGNMENT

        const sequenceInChain = this._sequenceInChain_Map_Key_LimelightAssigned_ChainId.get( this._limelightAssigned_ChainId_Selected_For_Alignment )
        if ( ! sequenceInChain ) {
            throw Error("this._sequenceInChain_Map_Key_LimelightAssigned_ChainId.get( this._limelightAssigned_ChainId_Selected_For_Alignment ) returned NOTHING. this._limelightAssigned_ChainId_Selected_For_Alignment: " + this._limelightAssigned_ChainId_Selected_For_Alignment )
        }

        this._alignment_limelightAssigned_ChainId = this._limelightAssigned_ChainId_Selected_For_Alignment
        this._alignment_sequenceInChain_For_limelightAssigned_ChainId = sequenceInChain

        {
            const chainData = this._chainData_Parsed_From_OnStructure_In_StructureFile_Order_Array.find( (item) => {
                if ( item.limelightAssigned_ChainId === this._alignment_limelightAssigned_ChainId ) {
                    return item
                }
                return false
            })

            if ( ! chainData ) {
                const msg = "NO Entry found in this._chainData_Parsed_From_OnStructure_In_StructureFile_Order_Array for this._alignment_limelightAssigned_ChainId: " + this._alignment_limelightAssigned_ChainId
                console.warn(msg)
                throw Error(msg)
            }

            this._alignment_ChainDisplayString_For_limelightAssigned_ChainId = get_DisplayNameString_From_CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry( chainData )
        }

        window.setTimeout( () => { try {

            const call_Result_Sequence_Order_1 = needlemanWunsch_Algorithm_AlignSequences( this.props.commonParams.proteinSequence, sequenceInChain )

            const call_Result_Sequence_Order_2 = needlemanWunsch_Algorithm_AlignSequences( sequenceInChain, this.props.commonParams.proteinSequence )

            if ( call_Result_Sequence_Order_1.alignedSeq1 !== call_Result_Sequence_Order_2.alignedSeq2 ) {
                const msg = "proteinSequence is aligned differently when first vs second in call to needlemanWunsch_Algorithm_AlignSequences(...). call_Result_Sequence_Order_1.alignedSeq1: '" +
                    call_Result_Sequence_Order_1.alignedSeq1 +
                    ", call_Result_Sequence_Order_2.alignedSeq2: '" + call_Result_Sequence_Order_2.alignedSeq2 + "'."
                console.error(msg)
                throw Error(msg)
            }

            if ( call_Result_Sequence_Order_1.alignedSeq2 !== call_Result_Sequence_Order_2.alignedSeq1 ) {
                const msg = "sequenceInChain is aligned differently when first vs second in call to needlemanWunsch_Algorithm_AlignSequences(...). call_Result_Sequence_Order_1.alignedSeq2: '" +
                    call_Result_Sequence_Order_1.alignedSeq2 +
                    ", call_Result_Sequence_Order_2.alignedSeq1: '" + call_Result_Sequence_Order_2.alignedSeq1 + "'."
                console.error(msg)
                throw Error(msg)
            }

            this._alignment_sequenceAlignment_Initial = {
                proteinSequence_Aligned: call_Result_Sequence_Order_1.alignedSeq1,
                sequenceInChain_Aligned: call_Result_Sequence_Order_1.alignedSeq2
            }

            this._alignment_sequenceAlignment_Current = call_Result_Sequence_Order_1.alignedSeq1 + "\n" + call_Result_Sequence_Order_1.alignedSeq2

            this.forceUpdate()

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }}, 50 )

    }

    /**
     *
     * @param event
     */
    private _alignment_save_Button_In_Show_Clicked( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) { try {

        //  Save 'this._sequenceAlignment_Initial' since this is the 'Show' and not the 'Edit'

        this._alignment_save_OR_Update_SequenceAlignment_ToServer__ExecuteCallback({
            structureFile_AlignedSequence: this._alignment_sequenceAlignment_Initial.sequenceInChain_Aligned,
            limelightProteinSequence_AlignedSequence: this._alignment_sequenceAlignment_Initial.proteinSequence_Aligned,
        })

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }

    /**
     *
     * @param event
     */
    private _alignment_edit_Button_Clicked( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) { try {

        this._alignment_show_VS_Edit_Flag = Alignment__Show_VS_Edit_Flag.EDIT

        this.forceUpdate()

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }

    /**
     *
     * @param event
     */
    private _alignment_TextArea_Changed( event: React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement> ) { try {

        this._alignment_parse_sequenceAlignment_InProgress()

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }

    /**
     *
     */
    private _alignment_parse_sequenceAlignment_InProgress() {

        if ( ! this._alignment_TextArea_Element_Ref.current ) {
            return
        }

        const value_TextArea = this._alignment_TextArea_Element_Ref.current.value

        this._alignment_sequenceAlignment_Current = value_TextArea

        const inLines = value_TextArea.split("\n") // Split into lines

        if ( inLines.length !== 2 ) {
            //  NOT 2 lines
            this._alignment_errorMessage = "There must be exactly 2 lines."
            this.forceUpdate()
            return // EARLY RETURN
        }

        const proteinSequence_Aligned = inLines[ 0 ]
        const sequenceInChain_Aligned = inLines[ 1 ]

        //  Remove '-' from both '_Aligned' sequences to validate that what is left is the original sequences

        const proteinSequence_From_Aligned = proteinSequence_Aligned.replaceAll( _PROTEIN_ALIGNMENT__FILLER_CHARACTER, "" )
        const sequenceInChain_From_Aligned = sequenceInChain_Aligned.replaceAll( _PROTEIN_ALIGNMENT__FILLER_CHARACTER, "" )

        if ( proteinSequence_From_Aligned !== this.props.commonParams.proteinSequence ) {
            //  The aligned proteinSequence is not same as input proteinSequence after remove '-'
            this._alignment_errorMessage = "The Aligned protein sequence (first line) after removing hyphens is not the protein sequence."
            this.forceUpdate()
            return // EARLY RETURN
        }

        if ( sequenceInChain_From_Aligned !== this._alignment_sequenceInChain_For_limelightAssigned_ChainId ) {
            //  The aligned proteinSequence is not same as input proteinSequence after remove '-'
            this._alignment_errorMessage = "The Aligned sequence in the structure file (second line) after removing hyphens is not the sequence in the structure file."
            this.forceUpdate()
            return // EARLY RETURN
        }

        if ( proteinSequence_Aligned.length !== sequenceInChain_Aligned.length ) {
            //  The 2 lines are NOT equal length
            this._alignment_errorMessage = "Aligned sequences must be the same length. Use hyphens to indicate insertions in the sequences."
            this.forceUpdate()
            return // EARLY RETURN
        }

        this._alignment_errorMessage = undefined

        this.forceUpdate()

        return {
            proteinSequence_Aligned,
            sequenceInChain_Aligned
        }
    }

    /**
     *
     * @param event
     */
    private _alignment_save_Button_In_Edit_Clicked( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) { try {

        const parse_Result = this._alignment_parse_sequenceAlignment_InProgress()

        if ( ! parse_Result ) {
            return // EARLY RETURN
        }

        let id: number = undefined

        //  TODO  Currently NOT supporting edit existing alignment here

        // if ( this.props.commonParams.existing__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value ) {
        //
        //     id = this.props.commonParams.existing__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value.id
        // }

        this._alignment_save_OR_Update_SequenceAlignment_ToServer__ExecuteCallback({
            structureFile_AlignedSequence: parse_Result.sequenceInChain_Aligned,
            limelightProteinSequence_AlignedSequence: parse_Result.proteinSequence_Aligned
        })

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }

    /**
     *
     * @param structureFile_AlignedSequence
     * @param limelightProteinSequence_AlignedSequence
     */
    private _alignment_save_OR_Update_SequenceAlignment_ToServer__ExecuteCallback(
        {
            structureFile_AlignedSequence, limelightProteinSequence_AlignedSequence
        } : {
            structureFile_AlignedSequence: string
            limelightProteinSequence_AlignedSequence: string
        }
    ) {

        const itemToSave = new CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value({
            structureFileId: this._structureFile_Contents_Entry_Selection__InitialData.structureFileId,
            limelightAssigned_ChainId: this._alignment_limelightAssigned_ChainId,
            proteinSequenceVersionId: this.props.commonParams.proteinSequenceVersionId,
            searchIds_CommaDelimited: this.props.commonParams.searchIds_CommaDelimited,
            structureFile_AlignedSequence: structureFile_AlignedSequence,
            limelightProteinSequence_AlignedSequence: limelightProteinSequence_AlignedSequence
        })

        const saveResult_Promise =
            this.props.commonParams.commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT.
            get_commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO().
            save_OR_Update_SequenceAlignment_ToServer( itemToSave )

        saveResult_Promise.catch( (reason: any) => {  }  );

        saveResult_Promise.then( ( saveResult) => {
            try {

                if ( this.props.commonParams.uploadComplete_Callback ) {
                    this.props.commonParams.uploadComplete_Callback( {
                        structureFile_Contents_Entry_Value: this._structureFile_Contents_Entry_Selection__InitialData,
                        proteinSequenceStructureFile_Contents: this._proteinSequenceStructureFile_Contents__Passed_IsValid,
                        structureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value: saveResult
                    } )
                } else if ( this.props.commonParams?.existingAlignment_SubParams?.onlyChangeAlignment_Callback ) {
                    this.props.commonParams?.existingAlignment_SubParams?.onlyChangeAlignment_Callback({
                        structureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value: saveResult
                    })

                } else {
                    const msg = "Neither populated 'this.props.commonParams.uploadComplete_Callback' 'this.props.commonParams?.existingAlignment_SubParams?.onlyChangeAlignment_Callback'"
                    console.warn(msg)
                    throw Error(msg)
                }

                this.props.close_Callback()

            } catch (e) {
                reportWebErrorToServer.reportErrorObjectToServer({
                    errorException : e
                });
                throw e;
            }
        });

    }


    ///////////////////////

    //   RENDER

    /**
     *
     */
    render() {

        return (

            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ _Overlay_Height_Max }
                title={ _Overlay_Title }
                callbackOnClicked_Close={ this.props.close_Callback }
                close_OnBackgroundClick={ false } >

                <React.Fragment>

                    { this._overlay_Contents_Panel_ToDisplay === INTERNAL__Overlay_Contents_Panel_ToDisplay.INITIAL_DISPLAY ? (

                        this.render_InsideOverlay__InitialDisplay()


                    ) : this._overlay_Contents_Panel_ToDisplay === INTERNAL__Overlay_Contents_Panel_ToDisplay.EXISTING_STRUCTURE_FILE__ALL_CHAINS_HAVE_ALIGNMENTS ? (

                        this.render_InsideOverlay__AllChainsHaveAlignments()

                    ) : this._overlay_Contents_Panel_ToDisplay === INTERNAL__Overlay_Contents_Panel_ToDisplay.UPLOAD_STRUCTURE_FILE ? (

                        this.render_InsideOverlay__UploadStructureFile()

                    ) : this._overlay_Contents_Panel_ToDisplay === INTERNAL__Overlay_Contents_Panel_ToDisplay.DO_NEXT_FOR_EXISTING_FILE_SELECTED ? (

                        this.render_InsideOverlay__ProcessAfter_Select_Existing_StructureFile()

                    ) : this._overlay_Contents_Panel_ToDisplay === INTERNAL__Overlay_Contents_Panel_ToDisplay.SELECT_CHAIN_FOR_ALIGNMENT ? (

                        this.render_InsideOverlay__SelectChain_For_Alignment()

                        // <div>
                        //     SELECT_CHAIN_FOR_ALIGNMENT
                        // </div>

                    ) : this._overlay_Contents_Panel_ToDisplay === INTERNAL__Overlay_Contents_Panel_ToDisplay.DO_ALIGNMENT ? (

                        this.render_InsideOverlay__DoAlignment()

                    ) : (

                        <div>
                            Unknown value for panel to display
                        </div>
                    )}

                    { this._show_Uploading_StructureFile_Message ? (
                        <div className=" block-updating-overlay-container ">
                            Uploading file and saving it...
                        </div>
                    ) : null }

                </React.Fragment>
            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        )
    }

    /**
     *
     */
    render_InsideOverlay__InitialDisplay() { try {

        if ( this._initialData_Show_LoadingMessage ) {

            return (

                <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                     style={ { position: "relative", marginBottom: 12 } }
                    // style={ { padding : 6 } }
                >
                    <div>
                        Loading data...
                    </div>
                </div>
            )
        }

        let structureFile_Select_Options_ElementArray: Array<React.JSX.Element> = undefined

        if ( this._structureFile_Contents_Entry_Array__InitialData.length > 0 ) {

            structureFile_Select_Options_ElementArray = []

            { //  Selection of Structure File to display

                if ( ! this._structureFile_Contents_Entry_Selection__InitialData ) {
                    structureFile_Select_Options_ElementArray.push(
                        <MenuItem
                            key={ _STRUCTURE_FILE_SELECT_OPTION_NONE_SELECTED }
                            value={ _STRUCTURE_FILE_SELECT_OPTION_NONE_SELECTED }
                            disabled={ true }
                        >
                            Select a Structure File in Limelight
                        </MenuItem>
                    )
                }

                // structureFile_Select_Options_ElementArray.push(
                //     <option
                //         key={ _PROTEIN_BAR__SELECTED_PROJECT_SEARCH_ID__FOR__ALL_COMBINED }
                //         value={ _PROTEIN_BAR__SELECTED_PROJECT_SEARCH_ID__FOR__ALL_COMBINED }
                //     >
                //         Select a Structure File
                //     </option>
                // )

                for ( const structureFile_Data_Entry of this._structureFile_Contents_Entry_Array__InitialData ) {

                    structureFile_Select_Options_ElementArray.push(
                        <MenuItem
                            key={ structureFile_Data_Entry.structureFileId }
                            value={ structureFile_Data_Entry.structureFileId.toString() }
                            // sx={ { whiteSpace: 'normal', maxWidth: searchName_Select_MenuItem_MaxWidth } }
                        >
                            <>
                                <span>
                                    { structureFile_Data_Entry.name }
                                </span>
                            </>
                        </MenuItem>
                    )
                }
            }
        }

        return (

            <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                 style={ { position: "relative", marginBottom: 12 } }
                // style={ { padding : 6 } }
            >
                <div>
                    <div>
                        { structureFile_Select_Options_ElementArray && structureFile_Select_Options_ElementArray.length > 0 ? (
                            <>
                                <div
                                    style={ { fontSize: 24, fontWeight: "bold" } }
                                >
                                    Select from existing structure files
                                </div>
                                <div>

                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={ null }
                                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                    >
                                        <Select
                                            size="small"
                                            sx={ {
                                                // maxWidth: searchName_Select_MenuItem_MaxWidth,
                                                fontSize: 18 // limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.default_font_size_number
                                            } }
                                            // sx={ { width: searchName_Select_MenuItem_MaxWidth } }
                                            MenuProps={
                                                {
                                                    sx: {
                                                        // maxWidth: searchName_Select_MenuItem_MaxWidth,
                                                        fontSize: 18 // limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.default_font_size_number
                                                    }
                                                }
                                            }
                                            value={
                                                this._structureFile_Contents_Entry_Selection__InitialData ?
                                                    this._structureFile_Contents_Entry_Selection__InitialData.structureFileId.toString() :
                                                    _STRUCTURE_FILE_SELECT_OPTION_NONE_SELECTED.toString()
                                            }
                                            onChange={ async event => {
                                                try {

                                                    const structureIdValue_String = event.target.value  //  NOTE  value is ALWAYS a string regardless of what is passed to the 'value' property of <Select> so always pass a string to that 'value' property

                                                    const structureIdValue_Int = Number.parseInt( structureIdValue_String )
                                                    if ( Number.isNaN( structureIdValue_Int ) ) {
                                                        const msg = "onChange: structureIdValue_String does NOT parse to an int: '" + structureIdValue_String + "'"
                                                        console.warn( msg )
                                                        throw Error( msg )
                                                    }

                                                    if ( structureIdValue_Int === _STRUCTURE_FILE_SELECT_OPTION_NONE_SELECTED ) {

                                                        //  NOt changed so return

                                                        return // EARLY RETURN
                                                    }

                                                    const existingEntry_Selected =
                                                        this._structureFile_Contents_Entry_Array__InitialData.find( value => {
                                                            if ( value.structureFileId === structureIdValue_Int ) {
                                                                return true
                                                            }
                                                        } )

                                                    if ( ! existingEntry_Selected ) {
                                                        const msg = "onChange: structureIdValue_Int: " + structureIdValue_Int + " NOT FOUND in this._structureFile_Contents_Entry_Array__InitialData"
                                                        console.warn( msg + ": ", this._structureFile_Contents_Entry_Array__InitialData )
                                                        throw Error( msg )
                                                    }

                                                    this._existing_StructureFile_Chosen( existingEntry_Selected )

                                                } catch ( e ) {
                                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                    throw e
                                                }
                                            } }
                                        >
                                            { structureFile_Select_Options_ElementArray }
                                        </Select>
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                </div>
                            </>
                        ) : null }
                    </div>

                    <div
                        style={ { fontSize: 24, fontWeight: "bold", marginTop: 20, marginBottom: 20 } }
                    >
                        OR
                    </div>

                    <div>

                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                "Add a new structure file to Limelight to this project."
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <button
                                style={ { fontSize: 24 } }
                                onClick={ event => {
                                    this._overlay_Contents_Panel_ToDisplay = INTERNAL__Overlay_Contents_Panel_ToDisplay.UPLOAD_STRUCTURE_FILE
                                    this.forceUpdate()
                                } }
                            >
                                Upload new structure file
                            </button>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    </div>
                </div>
            </div>
        )


    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }

    render_InsideOverlay__AllChainsHaveAlignments() { try {

        return (
            <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                 style={ { position: "relative", marginBottom: 12 } }
                // style={ { padding : 6 } }
            >
                <div>
                    All chains in the selected structure file have alignments.
                </div>
                <div style={ { marginTop: 10 } }>
                    <button
                        onClick={ event => {
                            this.props.close_Callback()
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        )

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }

    /**
     *
     */
    render_InsideOverlay__UploadStructureFile() {
        try {

            const selectEntries : Array<React.JSX.Element> = [];

        if ( this._selected__STRUCTURE_FILENAME_ALLOWED_Type === _STRUCTURE_FILENAME_ALLOWED_TYPE__NOT_SELECTED ) {
            //  No initial selection so add "Select Format option at top

            const selectValue_Display = "Select Format";

            const selectEntry = (
                <option
                    key={ selectValue_Display }
                    value={ selectValue_Display }
                >
                    { selectValue_Display }
                </option>
            );

            selectEntries.push( selectEntry );
        }

        for ( const selectValue of _STRUCTURE_FILENAME_ALLOWED_TYPES ) {

            let selectValue_Display = selectValue.toLocaleString();

            const selectEntry = (
                <option
                    key={ selectValue }
                        value={ selectValue }
                >
                    { selectValue_Display }
                </option>
            );

            selectEntries.push( selectEntry );
        }

        return (
            <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                 style={ { position: "relative", marginBottom: 12 } }
                // style={ { padding : 6 } }
            >
                <div>

                    {/* DEMO PDB from URL */ }
                    {/*
                <div style={ { marginTop: 20, marginBottom: 20 } }>
                    <div>
                        <span
                            className="fake-link"
                            onClick={ event => {
                                this._processPDBContents_From_DEMO_URL_Create_MolstarInstance()
                            } }
                        >
                            Process DEMO PDB from URL { _DEMO_PDB_URL }
                        </span>
                    </div>
                    <div>
                        (The file type selected below is NOT used for this URL. hard coded to 'pdb')
                    </div>
                </div>
                */ }

                    {/*{ this._selected__STRUCTURE_FILENAME_ALLOWED_Type !== _STRUCTURE_FILENAME_ALLOWED_TYPE__NOT_SELECTED ? (*/}
                    <>
                        <div style={ { marginTop: 10, marginBottom: 10 } }>
                            <div style={ { marginBottom: 10 } }>
                                <span>Upload a Protein Structure File: (Supported file types: { _STRUCTURE_FILENAME_ALLOWED_TYPES__TEXT_FOR_WEB_PAGE })</span>
                            </div>
                            <div>
                                <input
                                    type="file"
                                    ref={ this._upload_StructureFile_PDB_Etc_InputElement_Ref }
                                    accept={ _STRUCTURE_FILENAME_ALLOWED_TYPES__ACCEPTED_FILE_SUFFIXES__ALL__COMMA_DELIM_STRING }
                                    onChange={ this._upload_StructureFile_PDB_Etc_InputElement_Ref_Changed_BindThis }
                                />
                            </div>
                        </div>


                        <div
                            hidden={ ! ( this._upload_StructureFile_PDB_Etc_InputElement_SingleValue_Populated && ( ! this._upload__FileSelected_AND_File_Type_From_UploadedFilename_Accepted ) ) }
                            style={ { marginTop: 20, marginBottom: 20 } }
                        >
                            <div>
                                The filename suffix is not recognized for the supported file types: { _STRUCTURE_FILENAME_ALLOWED_TYPES__TEXT_FOR_WEB_PAGE }.
                            </div>
                            <div style={ { marginTop: 8 } }>
                                If the file to upload is one of the supported types, change the filename suffix to match the type and upload the file again.
                            </div>

                            {/*  WAS   have a <select> where user chose the file type

                        <div>
                            The filename suffix is not recognized for the supported file types: { _STRUCTURE_FILENAME_ALLOWED_TYPES__TEXT_FOR_WEB_PAGE }.
                        </div>
                        <div>
                            <span>Please select a file type: </span>
                            <select
                                value={ this._selected__STRUCTURE_FILENAME_ALLOWED_Type }
                                onChange={ event => {
                                    const value = event.currentTarget.value


                                    let found_selectValue_Match_Value = false
                                    for ( const selectValue of _STRUCTURE_FILENAME_ALLOWED_TYPES ) {
                                        if ( selectValue === value ) {
                                            this._selected__STRUCTURE_FILENAME_ALLOWED_Type = selectValue
                                            found_selectValue_Match_Value = true
                                            break
                                        }
                                    }
                                    if ( ! found_selectValue_Match_Value ) {
                                        const msg = "new value from <select> not match any entry in _STRUCTURE_FILENAME_ALLOWED_TYPES.  new value from <select>: " + value
                                        console.warn( msg )
                                        throw Error()
                                    }

                                    this._upload__FileSelected_AND_File_Type_From_UploadedFilename_Accepted_OrSelected = true

                                    this.forceUpdate()
                                } }
                            >
                                { selectEntries }
                            </select>
                        </div>
                        */ }
                        </div>

                        <div
                            hidden={ ! ( this._upload__FileSelected_AND_File_Type_From_UploadedFilename_Accepted_OrSelected ) }
                            style={ { marginTop: 20, marginBottom: 20 } }>
                            <span>Add a Brief description (required): </span>
                            <input
                                ref={ this._description_InputElement_Ref }
                                style={ {} }
                                maxLength={ 30 }
                                onChange={ event => {
                                    this._upload__General_Set_UploadButton_Disabled_AsRequired()
                                }}
                            />
                        </div>

                        { this._errorMessage_StructureFile_Upload ? (
                            <div style={ { color: "red", marginTop: 10, marginBottom: 20 } }>
                                { this._errorMessage_StructureFile_Upload }
                            </div>
                        ) : null }

                        <div style={ { marginTop: 20 } }>

                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    ( ! this._upload_StructureFile_PDB_Etc_Disabled ) ?
                                        "Please select exactly 1 file, select a type if prompted, and add a description" :
                                        null
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <span>
                                    <button
                                        disabled={ this._upload_StructureFile_PDB_Etc_Disabled }
                                        onClick={ this._upload_Button_Clicked_BindThis }
                                    >
                                        Upload
                                    </button>
                                </span>
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            &nbsp;
                            <button
                                onClick={ this._cancel_Button_Clicked_BindThis }
                            >
                                cancel
                            </button>
                        </div>
                    </>
                </div>
            </div>
        )


    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }

    /**
     *
     */
    render_InsideOverlay__ProcessAfter_Select_Existing_StructureFile() {
        try {

            return (
                <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                     style={ { position: "relative", marginBottom: 12 } }
                    // style={ { padding : 6 } }
                >
                    <div>
                        Existing structure file selected. Loading data...
                    </div>
                </div>
            )

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     */
    render_InsideOverlay__SelectChain_For_Alignment() {

        return (
            <Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay____Select_StructureFile_Chain_Component
                structureFile_Contents_Entry_Selection__InitialData={ this._structureFile_Contents_Entry_Selection__InitialData }
                proteinSequenceStructureFile_Contents__For_SelectChain={ this._proteinSequenceStructureFile_Contents__For_SelectChain }
                alignmentEntries_Result__For_SelectChain={ this._alignmentEntries_Result__For_SelectChain }
                chainData_Parsed_From_OnStructure_In_Label_Order_Array={ this._chainData_Parsed_From_OnStructure_In_Label_Order_Array }
                commonParams={ this.props.commonParams }
                alignment_selected__limelightAssigned_ChainId_Callback={ ( alignment_selected__limelightAssigned_ChainId: number ) => {

                    this._alignment_limelightAssigned_ChainId = alignment_selected__limelightAssigned_ChainId

                    {
                        const chainData = this._chainData_Parsed_From_OnStructure_In_StructureFile_Order_Array.find( (item) => {
                            if ( item.limelightAssigned_ChainId === this._alignment_limelightAssigned_ChainId ) {
                                return item
                            }
                            return false
                        })

                        if ( ! chainData ) {
                            const msg = "NO Entry found in this._chainData_Parsed_From_OnStructure_In_StructureFile_Order_Array for this._alignment_limelightAssigned_ChainId: " + this._alignment_limelightAssigned_ChainId
                            console.warn(msg)
                            throw Error(msg)
                        }

                        this._alignment_ChainDisplayString_For_limelightAssigned_ChainId = get_DisplayNameString_From_CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry( chainData )
                    }


                    this.forceUpdate()

                    window.setTimeout( () => {
                        try {

                            //   TODO  Need when add viewer
                            // if ( this._molstar_PluginUIContext_Reference ) {
                            //
                            //     this._molstar_PluginUIContext_Reference.dispose()
                            // }

                            this._alignment_sequenceInChain_For_limelightAssigned_ChainId = this._sequenceInChain_Map_Key_LimelightAssigned_ChainId.get( this._alignment_limelightAssigned_ChainId )
                            if ( ! this._alignment_sequenceInChain_For_limelightAssigned_ChainId ) {
                                const msg = "Button Clicked to choose Chain:  this._sequenceInChain_Map_Key_LimelightAssigned_ChainId.get( this._alignment_limelightAssigned_ChainId ) returned NOTHING for this._alignment_limelightAssigned_ChainId:" + this._alignment_limelightAssigned_ChainId
                                console.warn( msg )
                                throw Error( msg )
                            }

                            this._limelightAssigned_ChainId_Selected_For_Alignment = this._alignment_limelightAssigned_ChainId

                            this.forceUpdate()

                            window.setTimeout( () => {
                                try {

                                    this._in_DoAlignment_Show__NavigatedFrom_Select_Chain = true

                                    this._initialize_DoAlignment()

                                } catch ( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                    throw e
                                }
                            }, 50 )

                        } catch ( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                            throw e
                        }
                    }, 50 )
                } }
                close_Callback={ this.props.close_Callback }
            />
        )
    }

    /**
     *
     */
    render_InsideOverlay__DoAlignment() { try {

        if ( ! this._alignment_sequenceAlignment_Initial ) {

            return (

                <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                     style={ { position: "relative", marginBottom: 12 } }
                    // style={ { padding : 6 } }
                >
                    <div>
                        Initial computing...
                    </div>
                </div>
            )
        }

        let canEditAlignment = true

        if ( this.props.commonParams.existingAlignment_SubParams
            && ( ! this.props.commonParams.existingAlignment_SubParams.canEditAlignment ) ) {

            canEditAlignment = false
        }

        return (

            <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                 style={ { position: "relative", marginBottom: 12 } }
                // style={ { padding : 6 } }
            >

                { this._in_DoAlignment_Show__NavigatedFrom_Select_Chain ? (

                    <div style={ { marginBottom: 20, } }>
                        <span
                            className=" fake-link "
                            onClick={ event => {

                                this._overlay_Contents_Panel_ToDisplay = INTERNAL__Overlay_Contents_Panel_ToDisplay.SELECT_CHAIN_FOR_ALIGNMENT

                                this.forceUpdate()
                            } }
                        >
                            choose a different chain
                        </span>

                    </div>
                ) : null }


                <div style={ { marginBottom: 20, fontSize: 16 } }>
                    { this._alignment_show_VS_Edit_Flag === Alignment__Show_VS_Edit_Flag.SHOW ? (
                        <span>Showing alignment for </span>
                    ) : (
                        <span>Editing alignment for </span>
                    ) }
                    <span> { this.props.commonParams.proteinNames } and structure file (Chain { this._alignment_ChainDisplayString_For_limelightAssigned_ChainId }):</span>
                </div>

                { this._alignment_show_VS_Edit_Flag === Alignment__Show_VS_Edit_Flag.SHOW ? (

                    //  Show
                    <>
                        <div
                            style={ { width: "calc(100% - 80px)", overflowX: "auto" } }
                        >
                            <div style={ { display: "grid", gridTemplateColumns: "max-content auto", columnGap: 10 } }>
                                {/*  Protein Sequence from Limelight  */ }
                                <div>
                                    { this.props.commonParams.proteinNames }
                                </div>
                                <div style={ { whiteSpace: "nowrap", fontFamily: "monospace" } }>
                                    { this._alignment_sequenceAlignment_Initial.proteinSequence_Aligned }
                                </div>
                                <div style={ { whiteSpace: "nowrap" } }>
                                    Structure File ({ this._alignment_ChainDisplayString_For_limelightAssigned_ChainId })
                                </div>
                                <div style={ { whiteSpace: "nowrap", fontFamily: "monospace" } }>
                                    { this._alignment_sequenceAlignment_Initial.sequenceInChain_Aligned }
                                </div>
                            </div>
                        </div>
                        <div style={ { marginTop: 20 } }>
                            { ( canEditAlignment ) ? (
                                <>
                                    <>
                                        <button
                                            onClick={ this._alignment_save_Button_In_Show_Clicked_BindThis }
                                        >
                                            Save
                                        </button>
                                        &nbsp;
                                    </>
                                    {/*) : null }*/ }
                                    <button
                                        onClick={ this._alignment_edit_Button_Clicked_BindThis }
                                    >
                                        Edit
                                    </button>
                                    &nbsp;
                                    <button
                                        onClick={ this._cancel_Button_Clicked_BindThis }
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                // CANNOT edit so only have close button
                                <button
                                    onClick={ this._cancel_Button_Clicked_BindThis }
                                >
                                    close
                                </button>
                            ) }
                        </div>
                    </>
                ) : (
                    //  EDIT
                    <>
                        <div
                            style={ { width: "calc(100% - 80px)" } }
                        >
                            <div
                                // style={ { overflowX: "scroll" } }
                            >
                        <textarea
                            ref={ this._alignment_TextArea_Element_Ref }
                            style={ { whiteSpace: "nowrap", width: "95%", height: "6em", fontFamily: "monospace" } }
                            value={ this._alignment_sequenceAlignment_Current }
                            onChange={ this._alignment_TextArea_Changed_BindThis }
                        />
                            </div>
                        </div>

                        { this._alignment_errorMessage ? (
                            <div style={ { color: "red", marginTop: 10 } }>
                                { this._alignment_errorMessage }
                            </div>
                        ) : null }

                        <div style={ { marginTop: 20 } }>
                            <button
                                onClick={ this._alignment_save_Button_In_Edit_Clicked_BindThis }
                            >
                                Save
                            </button>
                            &nbsp;
                            <button
                                onClick={ this._cancel_Button_Clicked_BindThis }
                            >
                                cancel
                            </button>
                        </div>
                        <div style={ { marginTop: 20 } }>
                            Instructions:
                        </div>
                        <div style={ { marginTop: 5 } }>
                            Sequence for protein { this.props.commonParams.proteinNames } is on the top and from structure file (Chain { this._alignment_ChainDisplayString_For_limelightAssigned_ChainId }) is on the bottom.
                        </div>

                        {/*{ this.props.commonParams.existing__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value ? (*/ }
                        {/*    <div>*/ }
                        {/*        Replace the text above with a new alignment (if desired) and click "Save."*/ }
                        {/*    </div>*/ }
                        {/*) : (*/ }
                        <div>
                            Replace the text above with a new alignment and click "Save."
                        </div>
                        {/*) }*/ }
                    </>
                ) }
            </div>
        )
    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }
}


/**
 *
 */
interface INTERNAL__Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay____Select_StructureFile_Chain_Component_Props {

    structureFile_Contents_Entry_Selection__InitialData: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Value

    /**
     * ONLY populated when new file
     */
    proteinSequenceStructureFile_Contents__For_SelectChain: string

    /**
     * ONLY populated when existing file
     */
    alignmentEntries_Result__For_SelectChain: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__ResultRoot

    chainData_Parsed_From_OnStructure_In_Label_Order_Array: Array<CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry>
    commonParams: Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component_CommonParams

    alignment_selected__limelightAssigned_ChainId_Callback: ( alignment_selected__limelightAssigned_ChainId: number ) => void
    close_Callback: () => void
}

/**
 *
 */
interface INTERNAL__Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay____Select_StructureFile_Chain_Component_State {

    objectForceRerender?: object
}

/**
 *
 */
class Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay____Select_StructureFile_Chain_Component extends React.Component< INTERNAL__Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay____Select_StructureFile_Chain_Component_Props, INTERNAL__Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay____Select_StructureFile_Chain_Component_State > {

    private _proteinStructure_ViewerContainer_Ref: React.RefObject<HTMLDivElement>

    private _molstar_PluginUIContext_Reference: PluginUIContext

    /**
     *
     */
    private _molstar_PluginUIContext_Reference_Promise: Promise<PluginUIContext>

    private _alignment_selected__limelightAssigned_ChainId: number = _ALIGNMENT__SELECTED__LIMELIGHT_ASSIGNED_CHAIN_ID__NO_SELECTION

    /**
     *
     */
    constructor( props: INTERNAL__Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay____Select_StructureFile_Chain_Component_Props ) {
        super( props );

        try {
            this._proteinStructure_ViewerContainer_Ref = React.createRef();

            this.state = {
                objectForceRerender: {}
            };

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     */
    componentDidMount() {
        try {
            this._add_StructureViewer_ToOverlay()

        } catch ( e ) {

            console.warn( "In 'componentWillUnmount()': molstar_Plugin_Reference?.dispose() threw exception: ", e )
            // reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            // throw e
        }
    }

    /**
     * Clean Up
     */
    componentWillUnmount() {
        try {
            if ( this._molstar_PluginUIContext_Reference ) {

                this._molstar_PluginUIContext_Reference.dispose()

            } else if ( this._molstar_PluginUIContext_Reference_Promise ) {

                this._molstar_PluginUIContext_Reference_Promise.then( molstar_Plugin_Reference => {
                    try {

                        molstar_Plugin_Reference?.dispose()

                    } catch ( e ) {

                        console.warn( "In 'componentWillUnmount()': 'this._molstar_PluginUIContext_Reference_Promise.then': molstar_Plugin_Reference?.dispose() threw exception: ", e )
                        // reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                        // throw e
                    }
                } )
            }

        } catch ( e ) {

            console.warn( "In 'componentWillUnmount()': molstar_Plugin_Reference?.dispose() threw exception: ", e )
            // reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            // throw e
        }
    }

    ///////////////////////////////


    /**
     * Create Mol* Instance
     *
     * this._molstar_Plugin_Reference is assigned when the promise returned resolves
     *
     * Called from this._add_StructureData_PDB_Etc__TO__MolStar_Instance(...)
     */
    private _create_Or_Clear_MolStar_Instance() {

        if ( ! this._proteinStructure_ViewerContainer_Ref.current ) {
            const msg = "In _loadData_OnMount_After_LoadData: ( ! this._proteinStructure_ViewerContainer_Ref.current ) "
            console.warn( msg )

            // ssss

            return  //  FAKE  return.  Unclear why .current not populated

            throw Error( msg )
        }

        if ( this._molstar_PluginUIContext_Reference_Promise ) {

            //  Already have pending Molstar create in progress.  when complete clear it and resolve new returned promise

            //  EARLY RETURN
            return new Promise<void>( ( resolve, reject ) => {
                try {

                    this._molstar_PluginUIContext_Reference_Promise.catch( reason => {

                        this._molstar_PluginUIContext_Reference_Promise = undefined

                        reject( reason )
                    } )
                    this._molstar_PluginUIContext_Reference_Promise.then( molstar_Plugin_Reference => {
                        try {
                            const clear_Promise = this._molstar_PluginUIContext_Reference.clear()

                            clear_Promise.catch( reason => {

                                reject( reason )
                            } )

                            clear_Promise.then( novalue => {
                                try {

                                    resolve()

                                } catch ( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                    throw e
                                }
                            } )

                        } catch ( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                            throw e
                        }
                    } )

                } catch ( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                    throw e
                }
            } )
        }

        if ( this._molstar_PluginUIContext_Reference ) {

            //  Already have Molstar instance.  clear it and resolve new returned promise

            //  EARLY RETURN
            return new Promise<void>( ( resolve, reject ) => {
                try {
                    const clear_Promise = this._molstar_PluginUIContext_Reference.clear()

                    clear_Promise.catch( reason => {

                        reject( reason )
                    } )

                    clear_Promise.then( novalue => {
                        try {

                            resolve()

                        } catch ( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                            throw e
                        }
                    } )
                } catch ( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                    throw e
                }
            } )
        }

        //  Create Structure Viewer

        //  Show only the canvas without everything around it

        const spec: PluginUISpec = {
            ...DefaultPluginUISpec(),
            layout: {
                initial: {
                    showControls: false, // Hides the side panels
                    isExpanded: false
                }
            },
            config: [
                [ PluginConfig.Viewport.ShowControls, false ],         // Hides the wrench/canvas overlay buttons
                [ PluginConfig.Viewport.ShowExpand, false ],           // Hides the Full screen
                [ PluginConfig.Viewport.ShowToggleFullscreen, false ], // Hides the Full screen if present
                [ PluginConfig.Viewport.ShowSettings, false ],        // Hides the settings gear if present
                [ PluginConfig.Viewport.ShowIllumination, false ],    // Hides the Illumination (SSGI) toggle button
                [ PluginConfig.Viewport.ShowXR, false ],              // Hides the Augmented Reality / XR toggle button
            ],
        }
        //  Create using 'createPluginUI'

        this._molstar_PluginUIContext_Reference_Promise = createPluginUI( {
            target: this._proteinStructure_ViewerContainer_Ref.current,
            render: renderReact18,
            spec: spec,

            // UI layout options
            // layoutIsExpanded: true,
            // layoutShowControls: false, // hides the side controls panel
            // layoutShowSequence: false, // hides sequence panel
            // layoutShowLog: false,      // hides bottom log
            // layoutShowLeftPanel: false,
            // layoutShowTopPanel: true,  // keep top bar (optional)
            // viewportShowExpand: true,  // keep expand button (optional)
            // viewportShowSelectionMode: false
        } );

        return new Promise<void>( ( resolve, reject ) => {
            try {

                this._molstar_PluginUIContext_Reference_Promise.catch( reason => {

                    this._molstar_PluginUIContext_Reference_Promise = undefined

                    reject( reason )
                } )
                this._molstar_PluginUIContext_Reference_Promise.then( molstar_Plugin_Reference => {
                    try {

                        this._molstar_PluginUIContext_Reference_Promise = undefined

                        this._molstar_PluginUIContext_Reference = molstar_Plugin_Reference

                        //  Set the background color of viewer
                        this._molstar_PluginUIContext_Reference.canvas3d?.setProps({
                            renderer: {
                                backgroundColor: Molstar_Color(0xFFFFFF)
                            }
                        });

                        resolve()

                    } catch ( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                        throw e
                    }
                } );

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }})
    }

    /**
     *
     */
    private async _add_StructureViewer_ToOverlay() { try {

        await this._create_Or_Clear_MolStar_Instance()

        //  TODO  This works with pdbString being the contents of the PDB file
        const proteinStructureFile_Data = await this._molstar_PluginUIContext_Reference.builders.data.rawData( {
            data: this.props.proteinSequenceStructureFile_Contents__For_SelectChain,
            label: 'Structure Label Parameter Value'  //  TODO  Used in the Default tooltip in the lower right corner
        } );

        //  Create Structure for below

        const proteinStructureFile_Trajectory = await this._molstar_PluginUIContext_Reference.builders.structure.parseTrajectory( proteinStructureFile_Data, this.props.structureFile_Contents_Entry_Selection__InitialData.structureFile_PDB_ETC__DataFormat );

        // Create a structure hierarchy
        const proteinStructureFile_Model = await this._molstar_PluginUIContext_Reference.builders.structure.createModel( proteinStructureFile_Trajectory );

        const structure_StateObjectSelector = await this._molstar_PluginUIContext_Reference.builders.structure.createStructure( proteinStructureFile_Model );

        const structure: Structure = structure_StateObjectSelector.cell.obj?.data

        if ( ! structure ) {
            const msg = "structure_StateObjectSelector.cell.obj?.data is null or undefined"
            console.warn(msg)
            throw Error(msg)
        }

        this._addRepresentation_ToStructure_TO_Format_and_Color({ structure_StateObjectSelector_Param: structure_StateObjectSelector })

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }}

    /**
     *
     * @private
     */
    private async _addRepresentation_ToStructure_TO_Format_and_Color(
        {
            structure_StateObjectSelector_Param
        } : {
            structure_StateObjectSelector_Param: any
        }
    ) {
        try {


            //  Remove Existing Representations

            {
                const structures = this._molstar_PluginUIContext_Reference.managers.structure.hierarchy.current.structures;


                // Flatten the list of all components from all structures
                const allComponents = structures.flatMap( s => s.components );


                // This now matches the expected type: readonly StructureComponentRef[]
                await this._molstar_PluginUIContext_Reference.managers.structure.component.removeRepresentations( allComponents );
            }

            // this._molstar_PluginUIContext_Reference.builders.structure

            /////////////

            //  OLD code for call '.addRepresentation(...)'
            // Add it to the plugin’s hierarchy for visualization
            //         await this._molstar_PluginUIContext_Reference.builders.structure.representation.addRepresentation(structure_StateObjectSelector, {
            //             type: 'cartoon',
            //             color: 'chain-id'
            //         });


            const structureRef_FirstStructureUnder_Current_FromPlugin = this._molstar_PluginUIContext_Reference.managers.structure.hierarchy.current.structures[ 0 ]

            let structure_StateObjectSelector = this._molstar_PluginUIContext_Reference.managers.structure.hierarchy.current.structures[ 0 ]?.cell

            if ( ! structure_StateObjectSelector ) {

                structure_StateObjectSelector = structure_StateObjectSelector_Param
            }

            {

                //  Color by Protein Coverage.  TODO   how to color different shades.  Maybe need a call to '.addRepresentation(...)' for each shade of coverage color.

                //  Color by selected chain

                for ( const chainData of this.props.chainData_Parsed_From_OnStructure_In_Label_Order_Array ) {

                    const polymer_Full_Expression = _molstar__PolymerExpression( chainData.chainId_Label_AssignedAt_StructureFileCreation );

                    let color: Molstar_Color = undefined

                    if ( chainData.limelightAssigned_ChainId === this._alignment_selected__limelightAssigned_ChainId ) {

                        //  Selected Chain

                        color = this.props.commonParams.limelight_SequenceCoverageColor_For_MaxValue

                    } else {
                        color = Molstar_Color( 0xCCCCCC ) // Grey for aligns to Limelight sequence but NO sequence coverage
                    }

                    const componentKey = 'seq--not-coverage-covered_chain_' + chainData.limelightAssigned_ChainId  //  TODO: NOTE every call to '.addRepresentation(...)' needs a different  componentKey value.  Otherwise it is more positions but old color.
                    const componentLabel = 'Not Covered'

                    const component = await this._molstar_PluginUIContext_Reference.builders.structure
                        .tryCreateComponentFromExpression( structure_StateObjectSelector, polymer_Full_Expression, componentKey, { label: componentLabel } );

                    if ( component ) {

                        // const type_Representation = this._selected__STRUCTURE_Display_Type as any

                        await this._molstar_PluginUIContext_Reference.builders.structure.representation.addRepresentation( component, {
                            type: "cartoon",
                            color: 'uniform',
                            // ssss: null,  //  TODO  Shows that the Typescript type does NOT validate these properties
                            colorParams: { value: color },
                        } );
                    }
                }
            }

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }}


    ///////////////////////////////

    /**
     *
     */
    render() {
        try {

            const chainSelect_Options_ElementArray: Array<React.JSX.Element> = []

            // const chainSelect_Options_Elements: Array<React.JSX.Element> = []

            if ( this._alignment_selected__limelightAssigned_ChainId === _ALIGNMENT__SELECTED__LIMELIGHT_ASSIGNED_CHAIN_ID__NO_SELECTION ) {

                // const element = (
                //     <option
                //         key={ _ALIGNMENT__SELECTED__LIMELIGHT_ASSIGNED_CHAIN_ID__NO_SELECTION }
                //     >
                //         Select a Chain Id
                //     </option>
                // )
                //
                // chainSelect_Options_Elements.push( element )

                const element = (
                    <MenuItem
                        key={ _ALIGNMENT__SELECTED__LIMELIGHT_ASSIGNED_CHAIN_ID__NO_SELECTION }
                        value={ _ALIGNMENT__SELECTED__LIMELIGHT_ASSIGNED_CHAIN_ID__NO_SELECTION_AS_STRING }
                        disabled={ true }
                    >
                        Select a Chain Id
                    </MenuItem>
                )
                chainSelect_Options_ElementArray.push( element )
            }


            let alignmentEntry_Map_Key_limelightAssigned_ChainId: Map<number, CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value> = undefined

            if ( this.props.alignmentEntries_Result__For_SelectChain.resultEntries ) {
                //  this.props.alignmentEntries_Result__For_SelectChain.resultEntries populated for existing structure file entry

                alignmentEntry_Map_Key_limelightAssigned_ChainId = new Map()

                for ( const alignmentEntry of this.props.alignmentEntries_Result__For_SelectChain.resultEntries ) {

                    alignmentEntry_Map_Key_limelightAssigned_ChainId.set( alignmentEntry.limelightAssigned_ChainId, alignmentEntry )
                }
            }


            for ( const chainEntry of this.props.chainData_Parsed_From_OnStructure_In_Label_Order_Array ) {

                //  TODO  NOT HAVE:  Chain id already aligned so SKIP

                // if ( this._chainIds_Aligned_To_Limelight_ProteinSequence.has( chainId ) ) {
                //     //  Chain id already aligned so SKIP
                //     continue  // EARLY CONINUE
                // }

                // const element = (
                //     <option
                //         key={ chainEntry.limelightAssigned_ChainId }
                //         value={ chainEntry.limelightAssigned_ChainId }
                //     >
                //         { get_DisplayNameString_From_CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry( chainEntry ) }
                //     </option>
                // )
                //
                // chainSelect_Options_Elements.push( element )

                let menuItem_Disabled = false
                let chainName_AddnlText_For_Disabled: string = null

                if ( alignmentEntry_Map_Key_limelightAssigned_ChainId ) {
                    if ( alignmentEntry_Map_Key_limelightAssigned_ChainId.has( chainEntry.limelightAssigned_ChainId ) ) {
                        menuItem_Disabled = true
                        chainName_AddnlText_For_Disabled = " - Disabled since already aligned for this protein"
                    }
                }

                const element = (

                    <MenuItem
                        key={ chainEntry.limelightAssigned_ChainId }
                        value={ chainEntry.limelightAssigned_ChainId }
                        disabled={ menuItem_Disabled }
                    >
                        {/*  Tooltip ONLY shown when NOT disabled  */}
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={ null }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <span>
                                { get_DisplayNameString_From_CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry( chainEntry ) }{ chainName_AddnlText_For_Disabled }
                            </span>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    </MenuItem>

                )
                chainSelect_Options_ElementArray.push( element )
            }

            const _SELECT_FONT_SIZE = 18

            return (
                <>
                    <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                         style={ { marginBottom: 30 } }
                        // style={ { padding : 6 } }
                    >
                        <div style={ { fontSize: 24 } }>
                            <span> Select a chain in the structure file: </span>

                            <Select
                                size="small"
                                sx={ {
                                    // maxWidth: searchName_Select_MenuItem_MaxWidth,
                                    fontSize: _SELECT_FONT_SIZE // limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.default_font_size_number
                                } }
                                // sx={ { width: searchName_Select_MenuItem_MaxWidth } }
                                MenuProps={
                                    {
                                        sx: {
                                            // maxWidth: searchName_Select_MenuItem_MaxWidth,
                                            fontSize: _SELECT_FONT_SIZE // limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.default_font_size_number
                                        }
                                    }
                                }
                                value={ this._alignment_selected__limelightAssigned_ChainId.toString() }
                                onChange={ async event => {
                                    try {

                                        const newValue_String = event.target.value

                                        {
                                            if ( newValue_String === _ALIGNMENT__SELECTED__LIMELIGHT_ASSIGNED_CHAIN_ID__NO_SELECTION_AS_STRING ) {
                                                //  Did NOT really change so skip
                                                return  // EARLY RETURN
                                            }
                                        }

                                        const newValue_Number = Number.parseInt( newValue_String )
                                        if ( Number.isNaN( newValue_Number ) ) {
                                            const msg = "On Change select Chain Id: event.target.value does NOT parse to Int.  event.target.value: " + event.target.value
                                            console.warn( msg )
                                            throw Error( msg )
                                        }

                                        this._alignment_selected__limelightAssigned_ChainId = newValue_Number

                                        this.forceUpdate()

                                        window.setTimeout( () => {
                                            try {

                                                this._add_StructureViewer_ToOverlay()

                                            } catch ( e ) {
                                                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                throw e
                                            }
                                        }, 50 )

                                    } catch ( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                        throw e
                                    }
                                } }
                            >
                                { chainSelect_Options_ElementArray }
                            </Select>
                            {/*<select */ }
                            {/*    value={ this._alignment_selected__limelightAssigned_ChainId }*/ }
                            {/*    onChange={ event => {*/ }
                            {/*        try {*/ }
                            {/*            const newValue_String = event.target.value*/ }

                            {/*            const newValue_Number = Number.parseInt( newValue_String )*/ }
                            {/*            if ( Number.isNaN( newValue_Number ) ) {*/ }
                            {/*                const msg = "On Change select Chain Id: event.target.value does NOT parse to Int.  event.target.value: " + event.target.value*/ }
                            {/*                console.warn( msg )*/ }
                            {/*                throw Error( msg )*/ }
                            {/*            }*/ }

                            {/*            this._alignment_selected__limelightAssigned_ChainId = newValue_Number*/ }

                            {/*            this.forceUpdate()*/ }

                            {/*            window.setTimeout( () => {*/ }
                            {/*                try {*/ }

                            {/*                    this._add_StructureViewer_ToOverlay()*/ }

                            {/*                } catch ( e ) {*/ }
                            {/*                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );*/ }
                            {/*                    throw e*/ }
                            {/*                }*/ }
                            {/*            }, 50 )*/ }

                            {/*        } catch ( e ) {*/ }
                            {/*            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );*/ }
                            {/*            throw e*/ }
                            {/*        }*/ }
                            {/*    } }*/ }
                            {/*>*/ }
                            {/*    { chainSelect_Options_Elements }*/ }
                            {/*</select>*/ }
                        </div>
                        <div style={ { marginTop: 6 } }>
                            <span>
                                <button
                                    disabled={ this._alignment_selected__limelightAssigned_ChainId === _ALIGNMENT__SELECTED__LIMELIGHT_ASSIGNED_CHAIN_ID__NO_SELECTION }
                                    onClick={ event => {
                                        try {
                                            this.props.alignment_selected__limelightAssigned_ChainId_Callback( this._alignment_selected__limelightAssigned_ChainId )

                                        } catch ( e ) {
                                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                            throw e
                                        }
                                    } }
                                >
                                    Choose Chain Id
                                </button>
                            </span>
                            &nbsp;
                            <button
                                onClick={ event => {
                                    try {

                                        this.props.close_Callback()

                                    } catch ( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                        throw e
                                    }
                                } }
                            >
                                Cancel
                            </button>
                        </div>
                    </div>

                    <div className=" top-level single-entry-variable-height modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right modal-overlay-body-standard-margin-bottom"
                        // style={ { marginBottom: 12 } }
                        // style={ { padding : 6 } }
                    >
                        <div
                            ref={ this._proteinStructure_ViewerContainer_Ref }
                            style={ {
                                position: "relative",   // "relative" required for viewer
                                height: "100%"          // so get full height for viewer
                                //  Optional width height to make it smaller
                                // width: "calc( min( 100%, 660px) )",  //  Set max width
                                // height: "calc( min( 100%, 300px) )", //  Set max height
                                // marginLeft: "auto", // to center left to right
                                // marginRight: "auto"  // to center left to right
                            } }  // height: "100%" so get full height for viewer
                        >
                            {/*This text is replaced when create the viewer*/}
                            Structure Viewer Here
                        </div>
                    </div>
                </>
            )

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }
}




//////////////////////////

/**
 * SPECIAL NOTE:
 *
 * Duplicated in file Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component.tsx  protein_Structure_WidgetDisplay__Main_Component.tsx
 *
 *
 * Molstar processing:
 *
 * Lists all unique chain IDs (label_asym_id) in the single structure.
 *
 * @returns Chain Data Parsed, SequenceInChain_Map_Key_LimelightAssigned_ChainId
 */
const _molstar_ListChains_SingleStructure_Returns__ChainData_Parsed__SequenceInChain_Map_Key_LimelightAssigned_ChainId = function ( structure: Structure ) {

    /**
     * Used to prevent duplicate additions to the array.  First entry with label_asym_id is added to result array 'structureFile_Contents__ChainsData_Entry_Array'.
     */
    const chainId_From_label_asym_id__Set: Set<string> = new Set();

    const result__structureFile_Contents__ChainsData_Entry_Array: Array<CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry> = []

    const sequenceInChain_Map_Key_LimelightAssigned_ChainId: Map<number, string> = new Map()

    const location = StructureElement.Location.create( structure );

    /**
     * Limelight Assigned sequence number.  Incremented before used so starts at 1
     */
    let limelightAssigned_ChainId = 0

    // 2. Iterate through units in the structure
    for ( const unit of structure.units ) {

        // Focus on atomic units (proteins, nucleic acids, etc.)
        if ( unit.kind === Molstar_Unit_Kind_Atomic ) {

            location.unit = unit;
            // Get the first element of the unit to identify the chain
            location.element = unit.elements[ 0 ];

            // 3. Extract the chain ID (label_asym_id is the standard mmCIF ID)
            const chainId__From__label_asym_id = StructureProperties.chain.label_asym_id( location );

            // 'auth_asym_id':  mmCIF new version of ChainId that allows longer text.  Other documentation is this is the Author assigned value.
            const chain_authAsymId = StructureProperties.chain.auth_asym_id( location );
            // console.log( "chain.auth_asym_id: '" + chain_authAsymId + "', chainId__From__label_asym_id: " + chainId__From__label_asym_id )

            const entityKey = StructureProperties.entity.key( location );

            const structureSequence_Entity = structure.model.sequence.byEntityKey[ entityKey ];

            if ( ! structureSequence_Entity ) {

                // const msg = "Chain " + chainId__From__label_asym_id + " does NOT have a sequence. structure.model.sequence.byEntityKey[ entityKey ]; returned nothing for entityKey: " + entityKey
                //
                // console.warn( msg )

                continue  // EARLY CONTINUE

            } else {

                // const msg = "Chain " + chainId__From__label_asym_id + " does have a sequence. structure.model.sequence.byEntityKey[ entityKey ]; returned data for entityKey: " + entityKey
                //
                // console.log( msg )

            }

            {
                if ( chainId_From_label_asym_id__Set.has( chainId__From__label_asym_id ) ) {
                    //  Already saved this chain id so skip

                    continue // EARLY CONTINUE
                }

                chainId_From_label_asym_id__Set.add( chainId__From__label_asym_id )  // store as having been stored
            }

            limelightAssigned_ChainId++  // Increment - First used is value 1. Initialized to zero.

            const structureFile_Contents__ChainsData_Entry: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry = {
                limelightAssigned_ChainId,
                chainId_Label_AssignedAt_StructureFileCreation: chainId__From__label_asym_id,
                chainId_AuthorId_AssignedAt_StructureFileCreation: chain_authAsymId
            }

            result__structureFile_Contents__ChainsData_Entry_Array.push( structureFile_Contents__ChainsData_Entry )

            const label_ToArray = Array.from( structureSequence_Entity.sequence.label.toArray() )

            const label_String = label_ToArray.join( "" )

            sequenceInChain_Map_Key_LimelightAssigned_ChainId.set( limelightAssigned_ChainId, label_String )

            // const model = structure.model
            //
            // const model_entities_data_details = model.entities.data.details.value( entityKey )

        }
    }

    return { result__structureFile_Contents__ChainsData_Entry_Array, sequenceInChain_Map_Key_LimelightAssigned_ChainId }
}

/**
 *
 * @param chainId
 */
const _molstar__PolymerExpression = function ( chainId: string | null ): Expression {
    const params: Record<string, Expression> = {
        'entity-test': MolScriptBuilder.core.rel.eq( [
            MolScriptBuilder.struct.atomProperty.macromolecular.entityType(),
            'polymer',
        ] ),
    };
    if ( chainId ) {
        params[ 'chain-test' ] = MolScriptBuilder.core.rel.eq( [
            MolScriptBuilder.struct.atomProperty.macromolecular.auth_asym_id(),
            chainId,
        ] );
    }
    return MolScriptBuilder.struct.generator.atomGroups( params );
}

