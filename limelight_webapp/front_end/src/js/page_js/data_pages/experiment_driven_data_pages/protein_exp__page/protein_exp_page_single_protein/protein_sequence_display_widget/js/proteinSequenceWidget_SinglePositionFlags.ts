/**
 * proteinSequenceWidget_SinglePositionFlags.ts
 * 
 * Protein Sequence Widget - React Version - The Flags for a Single Protein Sequence Flag
 * 
 *  !!!! React Version !!!!
 * 
 * State Object used in: 
 *      proteinSequenceWidget_BuildDisplayObject.ts
 *      proteinSequenceWidgetDisplay_AllMainLines_Component_React.tsx - class ProteinSequence_SinglePosition
 */

/**
 * 
 */
export class ProteinSequenceWidget_SinglePositionFlags {

    private _Sequence_Position_Uncovered : boolean;
    private _Sequence_Position_No_Filters_Mod : boolean;
    private _Sequence_Position_No_Filters_No_Mod : boolean;
    private _Sequence_Position_Covered_Within_Filter_Mod_No_Filter : boolean;
    private _Sequence_Position_Covered_Within_Filter_Mod_Within_Filter : boolean;
    private _Sequence_Position_Covered_Within_Filter_Mod_Outside_Filter : boolean;
    private _Sequence_Position_Covered_Within_Filter_No_Mod : boolean;
    private _Sequence_Position_Covered_Outside_Filter_Mod : boolean;
    private _Sequence_Position_Covered_Outside_Filter_No_Mod : boolean;
    private _Sequence_Position_Match_User_Peptide_Filter_Search_String : boolean;
    
    private _UserSelected_ProteinSequencePosition : boolean; // Not currently Read

    /**
     * 
     */
	constructor() {}
    
    /**
     * 
     */
    set_Sequence_Position_Uncovered() {
        this._Sequence_Position_Uncovered = true;
    }
    /**
     * 
     */
    get_Sequence_Position_Uncovered() : boolean {
        return this._Sequence_Position_Uncovered;
    }

    /////////////////////////
    
    /**
     * 
     */
    set_Sequence_Position_No_Filters_Mod() {
        this._Sequence_Position_No_Filters_Mod = true;
    }
    /**
     * 
     */
    get_Sequence_Position_No_Filters_Mod() : boolean {
        return this._Sequence_Position_No_Filters_Mod;
    }

    /////////////////////////
    
    /**
     * 
     */
    set_Sequence_Position_No_Filters_No_Mod() {
        this._Sequence_Position_No_Filters_No_Mod = true;
    }
    /**
     * 
     */
    get_Sequence_Position_No_Filters_No_Mod() : boolean {
        return this._Sequence_Position_No_Filters_No_Mod;
    }

    // /////////////////////////
    
    /**
     * 
     */
    set_Sequence_Position_Covered_Within_Filter_Mod_No_Filter() {
        this._Sequence_Position_Covered_Within_Filter_Mod_No_Filter = true;
    }
    /**
     * 
     */
    get_Sequence_Position_Covered_Within_Filter_Mod_No_Filter() : boolean {
        return this._Sequence_Position_Covered_Within_Filter_Mod_No_Filter;
    }

    // /////////////////////////
    
    /**
     * 
     */
    set_Sequence_Position_Covered_Within_Filter_Mod_Within_Filter() {
        this._Sequence_Position_Covered_Within_Filter_Mod_Within_Filter = true;
    }
    /**
     * 
     */
    get_Sequence_Position_Covered_Within_Filter_Mod_Within_Filter() : boolean {
        return this._Sequence_Position_Covered_Within_Filter_Mod_Within_Filter;
    }

    // /////////////////////////
    
    /**
     * 
     */
    set_Sequence_Position_Covered_Within_Filter_Mod_Outside_Filter() {
        this._Sequence_Position_Covered_Within_Filter_Mod_Outside_Filter = true;
    }
    /**
     * 
     */
    get_Sequence_Position_Covered_Within_Filter_Mod_Outside_Filter() : boolean {
        return this._Sequence_Position_Covered_Within_Filter_Mod_Outside_Filter;
    }
    
    // /////////////////////////
    
    /**
     * 
     */
    set_Sequence_Position_Covered_Within_Filter_No_Mod() {
        this._Sequence_Position_Covered_Within_Filter_No_Mod = true;
    }
    /**
     * 
     */
    get_Sequence_Position_Covered_Within_Filter_No_Mod() : boolean {
        return this._Sequence_Position_Covered_Within_Filter_No_Mod;
    }

    // /////////////////////////
    
    /**
     * 
     */
    set_Sequence_Position_Covered_Outside_Filter_Mod() {
        this._Sequence_Position_Covered_Outside_Filter_Mod = true;
    }
    /**
     * 
     */
    get_Sequence_Position_Covered_Outside_Filter_Mod() : boolean {
        return this._Sequence_Position_Covered_Outside_Filter_Mod;
    }

    // /////////////////////////
    
    /**
     * 
     */
    set_Sequence_Position_Covered_Outside_Filter_No_Mod() {
        this._Sequence_Position_Covered_Outside_Filter_No_Mod = true;
    }
    /**
     * 
     */
    get_Sequence_Position_Covered_Outside_Filter_No_Mod() : boolean {
        return this._Sequence_Position_Covered_Outside_Filter_No_Mod;
    }

    /////////////////////////
    
    /**
     * 
     */
    set_Sequence_Position_Match_User_Peptide_Filter_Search_String() {
        this._Sequence_Position_Match_User_Peptide_Filter_Search_String = true;
    }
    /**
     * 
     */
    get_Sequence_Position_Match_User_Peptide_Filter_Search_String() : boolean {
        return this._Sequence_Position_Match_User_Peptide_Filter_Search_String;
    }

    /////////////////////////
    
    /**
     * 
     */
    set_UserSelected_ProteinSequencePosition() {
        this._UserSelected_ProteinSequencePosition = true;
    }
    /**
     * 
     */
    get_UserSelected_ProteinSequencePosition() : boolean {
        return this._UserSelected_ProteinSequencePosition;
    }

}

