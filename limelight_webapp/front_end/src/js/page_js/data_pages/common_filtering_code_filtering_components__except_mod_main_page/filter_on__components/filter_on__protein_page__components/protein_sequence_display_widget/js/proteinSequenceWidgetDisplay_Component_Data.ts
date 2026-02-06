/**
 * proteinSequenceWidgetDisplay_Component_Data.ts
 * 
 * Component Data for: proteinSequenceWidgetDisplay_Root_Component_React.tsx
 */

import { ProteinSequenceWidget_SinglePositionFlags } from './proteinSequenceWidget_SinglePositionFlags';

/**
 * 
 */
export class ProteinSequenceWidgetDisplay_Component_Data {
    
    dataPerSequencePosition : Array<ProteinSequenceWidgetDisplay_Component_DataPerSequencePositionEntry>;
    selectedProteinSequencePositions : Set<number>;

    sequenceCoverage_Percentage_AllPeptides: number

    proteinPosition_Covered_AllPeptides_Count: number

    /**
     * undefined if no filtering
     */
    sequenceCoverage_Percentage_FilteredPeptides: number

    /**
     * undefined if no filtering
     */
    proteinPosition_Covered_UserSelectedPeptides_Count: number

    // selectedVariableModifications : Set<number>

    /**
     * 
     */
    shallowClone() : ProteinSequenceWidgetDisplay_Component_Data {

        const proteinSequenceWidgetDisplay_Component_Data = new ProteinSequenceWidgetDisplay_Component_Data()

        proteinSequenceWidgetDisplay_Component_Data.dataPerSequencePosition = this.dataPerSequencePosition;
        proteinSequenceWidgetDisplay_Component_Data.selectedProteinSequencePositions = this.selectedProteinSequencePositions;

        return proteinSequenceWidgetDisplay_Component_Data;
    }
}


/**
 * 
 */
export class ProteinSequenceWidgetDisplay_Component_DataPerSequencePositionEntry {
    
    residue : string
    sequencePosition_Flags : ProteinSequenceWidget_SinglePositionFlags // class ProteinSequenceWidget_SinglePositionFlags

    variableModifications : Array<ProteinSequenceWidgetDisplay_Component_DataPerSequencePosition_VariableModificationEntry>
    staticModifications : Array<ProteinSequenceWidgetDisplay_Component_DataPerSequencePosition_StaticModificationEntry>

    constructor({  
        residue,
        sequencePosition_Flags,
        variableModifications,
        staticModifications
        } : {
        residue : string
        sequencePosition_Flags : ProteinSequenceWidget_SinglePositionFlags // class ProteinSequenceWidget_SinglePositionFlags
        variableModifications : Array<ProteinSequenceWidgetDisplay_Component_DataPerSequencePosition_VariableModificationEntry>
        staticModifications : Array<ProteinSequenceWidgetDisplay_Component_DataPerSequencePosition_StaticModificationEntry>
    
    }) {
       this.residue = residue;
       this.sequencePosition_Flags = sequencePosition_Flags;
       this.variableModifications = variableModifications;
       this.staticModifications = staticModifications;
    }
}


/**
 * Variable Modification Entry for a specific Protein Position
 */
export class ProteinSequenceWidgetDisplay_Component_DataPerSequencePosition_VariableModificationEntry {
    
    variableModificationMass : number
    isSelected : boolean

    constructor({  
        variableModificationMass,
        isSelected
    } : {
        variableModificationMass : number
        isSelected : boolean
    }) {
       this.variableModificationMass = variableModificationMass;
       this.isSelected = isSelected;
    }
}

/**
 * Static Modification Entry for a specific Protein Position
 * 
 * Does not contain the residue since that is specified at the protein position
 */
export class ProteinSequenceWidgetDisplay_Component_DataPerSequencePosition_StaticModificationEntry {
    
    staticModificationMass : number
    isSelected : boolean

    constructor({  
        staticModificationMass,
        isSelected
    } : {
        staticModificationMass : number
        isSelected : boolean
    }) {
       this.staticModificationMass = staticModificationMass;
       this.isSelected = isSelected;
    }
}
