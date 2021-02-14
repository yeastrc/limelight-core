/**
 * experiment_SingleExperiment_ConditionsGraphicRepresentation_Selections.ts
 * 
 * Selections in experiment_SingleExperiment_ConditionsGraphicRepresentation.tsx
 * 
 * Selections of:
 * 
 *   1)  Specific Condition Cells
 *   2)  'Main Cells': Main grid cells that the condition cells map to (currently hold searches)
 * 
 * !!!  This assumes that nothing else changes the provided Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass object
 */


 //  Glossary:

 //   Condition Cell:  a cell that contains a condition label.  
 //                     These will be on the top and on the left and the combination shows the user what each main cell is composed of for conditions

 //   Main Cell:  The main block of cells bounded on the top and left by condition cells.
 //                     These cells contain the main data the user is interested in.
 //                         One item these cells contain is the searches (projectSearchIds) that is associated with the set of conditions for that cell.

//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// When user adds or removes condition groups or conditions in the experiment builder, the data in for the main cells ('conditionGroupsDataContainer') is removed.  

//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

import {
    ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier,
    ExperimentConditions_GraphicRepresentation_MainCell_Identifier
} from './experiment_SingleExperiment_ConditionsGraphicRepresentation_Cell_Identifiers';
import {Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass} from './experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass';
import {Experiment_ConditionGroupsContainer} from "page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes";

const _ConstructorCodeFromBuilderValue = "vmnxlhfoiehtrgujehiugrhghkjasdhdfuiaq"


/**
 * Parameters passed to provided callback selectedConditionsChanged_Callback
 */
export class ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams {

    //  Values will be added when it is determined that they are needed

    private _placeholder: any // added so cannot add other properties to an object of this class
}

/**
 * 
 */
export type ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_Callback_Definition = ( params : ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams ) => void

/**
 * Call to create instance of ExperimentConditions_GraphicRepresentation_SelectedCells 
 *  when do NOT have instance of Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
 *
 *  @param conditionGroupsContainer,  //  Required if setting Condition Label Selections
 *  @param selectedConditionsChanged_Callback // Optional
 */
export const create_ExperimentConditions_GraphicRepresentation_SelectedCells__NO__ExperimentPageCommon_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass = function({

    conditionGroupsContainer,  //  Required if setting Condition Label Selections
    selectedConditionsChanged_Callback // Optional
} : {
    conditionGroupsContainer : Experiment_ConditionGroupsContainer
    selectedConditionsChanged_Callback? : ( params : ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams ) => void

}) : ExperimentConditions_GraphicRepresentation_SelectedCells {

    const result = new ExperimentConditions_GraphicRepresentation_SelectedCells({
        constructorCodeFromBuilderValue : _ConstructorCodeFromBuilderValue,
        conditionGroupsContainer,
        experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : undefined,
        selectedConditionsChanged_Callback
     });
    return result;
}

/**
 * Call to create instance of ExperimentConditions_GraphicRepresentation_SelectedCells
 *  when DO have instance of Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
 *
 *  @param experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
 *  @param conditionGroupsContainer,  //  Required if setting Condition Label Selections
 *  @param selectedConditionsChanged_Callback // Optional
 */
export const create_ExperimentConditions_GraphicRepresentation_SelectedCells__YES__ExperimentPageCommon_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass = function({

    //  Will be used for population of ExperimentConditions_GraphicRepresentation_SelectedCells
    // Will be Updated for changes in Selected Conditions
    experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,

    conditionGroupsContainer,  //  Required if setting Condition Label Selections

    selectedConditionsChanged_Callback // Optional
} : {
    experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
    conditionGroupsContainer : Experiment_ConditionGroupsContainer
    selectedConditionsChanged_Callback? : ( params : ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams ) => void

}) : ExperimentConditions_GraphicRepresentation_SelectedCells {

    const result = new ExperimentConditions_GraphicRepresentation_SelectedCells({
        constructorCodeFromBuilderValue : _ConstructorCodeFromBuilderValue,
        experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
        conditionGroupsContainer,
        selectedConditionsChanged_Callback
    });
    return result;
}

////////////////////////
////////////////////////
////////////////////////

/**
 * 
 */
export class ExperimentConditions_GraphicRepresentation_SelectedCells {

    //  !!!!  CRITICAL:  Any Class Members added must be added to method 'shallowClone'  !!!!

    private _experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass

    private _conditionGroupsContainer : Experiment_ConditionGroupsContainer

    private _selectedConditionsChanged_Callback : ( params : ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams ) => void

    //  * Class ConditionCell_Selections_SubGrouping:
    //  * 
    // * Condition Cell Selections within each Sub Grouping
    // * 
    // * Selections of:
    // * 
    // *   1) Conditions in first Condition Group
    // *   2) Conditions in other than first Condition Group, specified as a path from the second Condition Group down.
    // *         (this is done since below the 2nd group, each condition under a different parent is selected independently)
    
    private _selected_ConditionCells_First_ConditionGroup : ConditionCell_Selections_First_ConditionGroup
    private _selected_ConditionCells_OtherThanFirst_ConditionGroup : ConditionCell_Selections_OtherThanFirst_ConditionGroup

    //  Tracking of "Main Cells" selected

    //    Main Cells Selected by direct selection from user
    private _selected_MainCell_DirectSelections : MainCells_Selections = new MainCells_Selections();

    private _selectedConditionsChanged_Internal_Callback_BindThis = this._selectedConditionsChanged_Internal_Callback.bind(this);

    //    Main Cells Selected by selection of associated Condition Label cells.  Only updated internally from updated selected Condition Label cells.
    private _selected_MainCell_SelectionsThrough_ConditionLabelSelections : MainCells_Selections = new MainCells_Selections();

    //  !!!!  CRITICAL:  Any Class Members added must be added to method 'shallowClone'  !!!!

    /**
     * 
     */
    constructor({ 
        
        constructorCodeFromBuilderValue,

        //  Will be used for population of ExperimentConditions_GraphicRepresentation_SelectedCells
        // Will be Updated for changes in Selected Conditions
        experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,

        //  Required to support updating main cell selections from condition label cell selections
        conditionGroupsContainer,

        selectedConditionsChanged_Callback // Optional
    } : {

        constructorCodeFromBuilderValue : string
        experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
        conditionGroupsContainer : Experiment_ConditionGroupsContainer
        selectedConditionsChanged_Callback : ( params : ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams ) => void
    }) {

        if ( constructorCodeFromBuilderValue !== _ConstructorCodeFromBuilderValue ) {
            const msg = "ExperimentConditions_GraphicRepresentation_SelectedCells::constructor: if ( constructorCodeFromBuilderValue !== _ConstructorCodeFromBuilderValue ) {"
            console.warn( msg )
            throw Error( msg )
        }
        this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass = experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
        this._conditionGroupsContainer = conditionGroupsContainer;
        this._selectedConditionsChanged_Callback = selectedConditionsChanged_Callback

        this._selected_ConditionCells_First_ConditionGroup = new ConditionCell_Selections_First_ConditionGroup({ 
            experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass, selectedConditionsChanged_Callback, selectedConditionsChanged_Internal_Callback : this._selectedConditionsChanged_Internal_Callback_BindThis
        });

        this._selected_ConditionCells_First_ConditionGroup.populate_FromStateManagement();

        this._selected_ConditionCells_OtherThanFirst_ConditionGroup = new ConditionCell_Selections_OtherThanFirst_ConditionGroup({
            experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass, selectedConditionsChanged_Callback, selectedConditionsChanged_Internal_Callback : this._selectedConditionsChanged_Internal_Callback_BindThis
        });

        this._selected_ConditionCells_OtherThanFirst_ConditionGroup.populate_FromStateManagement();

        this._rebuild__selected_MainCell_SelectionsThrough_ConditionLabelSelections();
    }

    /**
     *
     */
    shallowClone(): ExperimentConditions_GraphicRepresentation_SelectedCells {

        const clone = new ExperimentConditions_GraphicRepresentation_SelectedCells({
            constructorCodeFromBuilderValue: _ConstructorCodeFromBuilderValue,
            experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass: this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
            conditionGroupsContainer : this._conditionGroupsContainer,
            selectedConditionsChanged_Callback: this._selectedConditionsChanged_Callback
        });

        clone._selected_ConditionCells_First_ConditionGroup = this._selected_ConditionCells_First_ConditionGroup;
        clone._selected_ConditionCells_OtherThanFirst_ConditionGroup = this._selected_ConditionCells_OtherThanFirst_ConditionGroup;
        clone._selected_MainCell_DirectSelections = this._selected_MainCell_DirectSelections;
        clone._selected_MainCell_SelectionsThrough_ConditionLabelSelections = this._selected_MainCell_SelectionsThrough_ConditionLabelSelections;

        return clone;
    }

    /**
     *
     */
    clear_All_Selection_Entries(): void {

        this.clear_MainCell_Selection_Entries();
        this.clear_All_ConditionSelection_Entries();
    }

    /**
     *
     */
    clear_All_ConditionSelection_Entries(): void {

        console.warn( "clear_All_ConditionSelection_Entries(): This should likely be coded differently")

        this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.clear_All_ConditionSelection_Entries();

        this._selected_ConditionCells_First_ConditionGroup = new ConditionCell_Selections_First_ConditionGroup({
            experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass: this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
            selectedConditionsChanged_Callback: this._selectedConditionsChanged_Callback, selectedConditionsChanged_Internal_Callback : this._selectedConditionsChanged_Internal_Callback_BindThis
        });
        this._selected_ConditionCells_OtherThanFirst_ConditionGroup = new ConditionCell_Selections_OtherThanFirst_ConditionGroup({
            experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass: this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
            selectedConditionsChanged_Callback: this._selectedConditionsChanged_Callback, selectedConditionsChanged_Internal_Callback : this._selectedConditionsChanged_Internal_Callback_BindThis
        });

        this._rebuild__selected_MainCell_SelectionsThrough_ConditionLabelSelections();

        if ( this._selectedConditionsChanged_Callback ) {
            const params = new ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams()
            this._selectedConditionsChanged_Callback( params );
        }
    }


        //////////////////////////////
    //////////////////////////////
    //////////////////////////////

    //   Condition Cell Selection


    //   Condition Cell Selection - First Condition Group

    /**
     * Selections of Conditions in other than first Condition Group, specified as a path from the second Condition Group down.
     *         (this is done since below the 2nd group, each condition under a different parent is selected independently)
     */
    get_selected_ConditionCells_First_ConditionGroup(): ConditionCell_Selections_First_ConditionGroup {
        return this._selected_ConditionCells_First_ConditionGroup;
    }

    /////////
    /////////

    //   Condition Cell Selection - Other Than First Condition Group

    /**
     * Selections of Conditions in other than first Condition Group, specified as a path from the second Condition Group down.
     *         (this is done since below the 2nd group, each condition under a different parent is selected independently)
     */
    get_selected_ConditionCells_OtherThanFirst_ConditionGroup(): ConditionCell_Selections_OtherThanFirst_ConditionGroup {
        return this._selected_ConditionCells_OtherThanFirst_ConditionGroup;
    }

    /**
     * Callback from
     * this._selected_ConditionCells_First_ConditionGroup and this._selected_ConditionCells_OtherThanFirst_ConditionGroup
     * when they change
     *
     * Internal to this class
     */
    private _selectedConditionsChanged_Internal_Callback() {

        this._rebuild__selected_MainCell_SelectionsThrough_ConditionLabelSelections();
    }



    /**
     * rebuild this._selected_MainCell_SelectionsThrough_ConditionLabelSelections
     * From original or updated updated this._selected_ConditionCells_First_ConditionGroup and this._selected_ConditionCells_OtherThanFirst_ConditionGroup
     */
    private _rebuild__selected_MainCell_SelectionsThrough_ConditionLabelSelections() : void {

        this._rebuild__selected_MainCell_SelectionsThrough_ConditionLabelSelections_Standalone({
            selected_MainCell_SelectionsThrough_ConditionLabelSelections : this._selected_MainCell_SelectionsThrough_ConditionLabelSelections,
            selected_ConditionCells_First_ConditionGroup : this._selected_ConditionCells_First_ConditionGroup,
            selected_ConditionCells_OtherThanFirst_ConditionGroup : this._selected_ConditionCells_OtherThanFirst_ConditionGroup,
            conditionGroupsContainer : this._conditionGroupsContainer
        });
    }


    /**
     * rebuild this._selected_MainCell_SelectionsThrough_ConditionLabelSelections
     * From original or updated updated this._selected_ConditionCells_First_ConditionGroup and this._selected_ConditionCells_OtherThanFirst_ConditionGroup
     */
    private _rebuild__selected_MainCell_SelectionsThrough_ConditionLabelSelections_Standalone({

        selected_MainCell_SelectionsThrough_ConditionLabelSelections, selected_ConditionCells_First_ConditionGroup, selected_ConditionCells_OtherThanFirst_ConditionGroup, conditionGroupsContainer
    } : {

        selected_MainCell_SelectionsThrough_ConditionLabelSelections : MainCells_Selections
        selected_ConditionCells_First_ConditionGroup : ConditionCell_Selections_First_ConditionGroup
        selected_ConditionCells_OtherThanFirst_ConditionGroup : ConditionCell_Selections_OtherThanFirst_ConditionGroup
        conditionGroupsContainer : Experiment_ConditionGroupsContainer

    }) : void {

        selected_MainCell_SelectionsThrough_ConditionLabelSelections.clear_MainCell_Selection_Entries();

        const leftConditionGroup_Any_Selected = selected_ConditionCells_OtherThanFirst_ConditionGroup.is_Any_ConditionCell_Selected();

        this._rebuild__selected_MainCell_SelectionsThrough_ConditionLabelSelections_Standalone_Recursive({
            leftConditionIdPath_Parent : [], //  Fake to start
            leftConditionGroup_ParentSelected : false, leftConditionGroup_ParentLevel_OnlyOther_Selected : false, leftConditionGroup_Any_Selected,
            selected_MainCell_SelectionsThrough_ConditionLabelSelections, selected_ConditionCells_First_ConditionGroup, selected_ConditionCells_OtherThanFirst_ConditionGroup, conditionGroupsContainer
        })
    }

    /**
     * rebuild this._selected_MainCell_SelectionsThrough_ConditionLabelSelections
     * From original or updated updated this._selected_ConditionCells_First_ConditionGroup and this._selected_ConditionCells_OtherThanFirst_ConditionGroup
     */
    private _rebuild__selected_MainCell_SelectionsThrough_ConditionLabelSelections_Standalone_Recursive(
        {
        leftConditionIdPath_Parent, leftConditionGroup_ParentSelected, leftConditionGroup_ParentLevel_OnlyOther_Selected, leftConditionGroup_Any_Selected,
        selected_MainCell_SelectionsThrough_ConditionLabelSelections, selected_ConditionCells_First_ConditionGroup, selected_ConditionCells_OtherThanFirst_ConditionGroup, conditionGroupsContainer
    } : {
        leftConditionIdPath_Parent : Array<number>
        leftConditionGroup_ParentSelected : boolean
        leftConditionGroup_ParentLevel_OnlyOther_Selected : boolean
        leftConditionGroup_Any_Selected : boolean
        selected_MainCell_SelectionsThrough_ConditionLabelSelections : MainCells_Selections
        selected_ConditionCells_First_ConditionGroup : ConditionCell_Selections_First_ConditionGroup
        selected_ConditionCells_OtherThanFirst_ConditionGroup : ConditionCell_Selections_OtherThanFirst_ConditionGroup
        conditionGroupsContainer : Experiment_ConditionGroupsContainer

    }) : void {

        const conditionGroups = conditionGroupsContainer.conditionGroups;

        if ( leftConditionIdPath_Parent.length === ( conditionGroups.length - 1 ) ) {

            //  conditionGroups Left processing fully processed.

            //  Process First conditionGroup (Top Condition Label cells) to have full path to Main Cells

            const current_conditionGroup = conditionGroups[ 0 ]; // First Condition Group

            const current_conditions = current_conditionGroup.conditions;

            for ( const current_condition of current_conditions ) {

                let addTo_selected_MainCell_SelectionsThrough_ConditionLabelSelections = false;

                const cell_ConditionIds_Path_Array = [ current_condition.id, ...leftConditionIdPath_Parent ];

                if ( leftConditionGroup_ParentSelected ) {

                    if ( selected_ConditionCells_First_ConditionGroup.is_Any_ConditionCell_Selected() ) {

                        //  Any selected so this must be selected
                        if ( selected_ConditionCells_First_ConditionGroup.contains_ConditionCell_Entry( current_condition.id ) ) {

                            addTo_selected_MainCell_SelectionsThrough_ConditionLabelSelections = true;
                        }
                    } else {
                        addTo_selected_MainCell_SelectionsThrough_ConditionLabelSelections = true;
                    }
                } else if ( leftConditionGroup_Any_Selected ) {
                    //  Skip since 'Only Other' selected

                } else {
                    //  NO Left Selections so only driven by Top Selections
                    if ( selected_ConditionCells_First_ConditionGroup.contains_ConditionCell_Entry( current_condition.id ) ) {

                        addTo_selected_MainCell_SelectionsThrough_ConditionLabelSelections = true;
                    }
                }

                if ( addTo_selected_MainCell_SelectionsThrough_ConditionLabelSelections ) {
                    const cell_ConditionIds_Set = new Set( cell_ConditionIds_Path_Array );
                    const entryToAdd: ExperimentConditions_GraphicRepresentation_MainCell_Identifier = new ExperimentConditions_GraphicRepresentation_MainCell_Identifier({ cell_ConditionIds_Set });
                    selected_MainCell_SelectionsThrough_ConditionLabelSelections.add_MainCell_Entry( entryToAdd );
                }
            }

           return;  // EARLY RETURN
        }

        const current_conditionGroup_Index = leftConditionIdPath_Parent.length + 1;  //   + 1 (increment to next Condition Group).  Will automatically skip over First Condition Group

        const current_conditionGroup = conditionGroups[ current_conditionGroup_Index ];

        const current_conditions = current_conditionGroup.conditions;

        const current_conditionIds_Selected : Set<number> = new Set();

        for ( const current_condition of current_conditions ) {

            const cell_ConditionIds_Path_Array = [...leftConditionIdPath_Parent, current_condition.id];

            const entry_ConditionCell_Identifier = new ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier({cell_ConditionIds_Path_Array: cell_ConditionIds_Path_Array})
            if (selected_ConditionCells_OtherThanFirst_ConditionGroup.contains_ConditionCell_Entry(entry_ConditionCell_Identifier)) {
                current_conditionIds_Selected.add( current_condition.id );
            }
        }

        for ( const current_condition of current_conditions ) {

            const cell_ConditionIds_Path_Array = [ ...leftConditionIdPath_Parent, current_condition.id ];

            let is_current_condition_Selected = false;

            if ( current_conditionIds_Selected.has( current_condition.id ) ) {
                is_current_condition_Selected = true;
            }

            let child_leftConditionGroup_ParentSelected = false;
            let child_leftConditionGroup_ParentLevel_OnlyOther_Selected = false;

            if ( is_current_condition_Selected ) {

                child_leftConditionGroup_ParentSelected = true;

            } else if ( current_conditionIds_Selected.size > 0 ) {

                child_leftConditionGroup_ParentLevel_OnlyOther_Selected = true;

            } else if ( leftConditionGroup_ParentSelected ) {

                child_leftConditionGroup_ParentSelected = true;

            } else if ( leftConditionGroup_ParentLevel_OnlyOther_Selected ) {

                child_leftConditionGroup_ParentLevel_OnlyOther_Selected = true;
            }

            this._rebuild__selected_MainCell_SelectionsThrough_ConditionLabelSelections_Standalone_Recursive({
                leftConditionIdPath_Parent : cell_ConditionIds_Path_Array,
                leftConditionGroup_ParentSelected : child_leftConditionGroup_ParentSelected,
                leftConditionGroup_ParentLevel_OnlyOther_Selected : child_leftConditionGroup_ParentLevel_OnlyOther_Selected,
                leftConditionGroup_Any_Selected,
                selected_MainCell_SelectionsThrough_ConditionLabelSelections, selected_ConditionCells_First_ConditionGroup, selected_ConditionCells_OtherThanFirst_ConditionGroup, conditionGroupsContainer
            })
        }
    }

    ////

    /**
     *
     */
    mainCell_Selected_FromConditionLabelSelections_HasAnyEntries() : boolean {

        return this._selected_MainCell_SelectionsThrough_ConditionLabelSelections.hasAnyEntries();
    }

    /**
     *
     */
    mainCell_Selected_FromConditionLabelSelections_ContainsEntry(entryDoesContain: ExperimentConditions_GraphicRepresentation_MainCell_Identifier): boolean {

        return this._selected_MainCell_SelectionsThrough_ConditionLabelSelections.contains_MainCell_Entry( entryDoesContain );
    }


    //////////////////////////////
    //////////////////////////////
    //////////////////////////////

    //   Main Cell Selection

    /**
     *
     */
    contains_MainCell_Entry(entryDoesContain: ExperimentConditions_GraphicRepresentation_MainCell_Identifier): boolean {

        return this._selected_MainCell_DirectSelections.contains_MainCell_Entry( entryDoesContain );
    }

    /**
     *
     */
    add_MainCell_Entry(entryToAdd: ExperimentConditions_GraphicRepresentation_MainCell_Identifier): void {

        if (!entryToAdd) {
            throw Error("ExperimentConditions_GraphicRepresentation_SelectedCells::add_MainCell_Entry:  No parameter provided");
        }

        this._selected_MainCell_DirectSelections.add_MainCell_Entry( entryToAdd );
    }

    /**
     *
     */
    remove_MainCell_Entry(entryToRemove: ExperimentConditions_GraphicRepresentation_MainCell_Identifier): void {

        this._selected_MainCell_DirectSelections.remove_MainCell_Entry( entryToRemove );
    }

    /**
     *
     */
    clear_MainCell_Selection_Entries(): void {

        this._selected_MainCell_DirectSelections.clear_MainCell_Selection_Entries();
    }


}

//////////

/**
 * Main Cell Selections (2 instances for Directly or through Condition Label Selections)
 */
class MainCells_Selections {

    private _selected_MainCell_Entries : Array<ExperimentConditions_GraphicRepresentation_MainCell_Identifier> = [];

    /**
     *
     */
    hasAnyEntries(): boolean {

        if ( this._selected_MainCell_Entries && this._selected_MainCell_Entries.length > 0 ) {
            return  true;
        }
        return  false;
    }

    /**
     *
     */
    contains_MainCell_Entry(entryDoesContain: ExperimentConditions_GraphicRepresentation_MainCell_Identifier): boolean {

        if (!entryDoesContain) {
            throw Error("ExperimentConditions_GraphicRepresentation_SelectedCells::contains_MainCell_Entry:  No parameter provided");
        }
        for ( const selected_MainCell_Entry of this._selected_MainCell_Entries ) {

            if (selected_MainCell_Entry.equals(entryDoesContain)) {
                return true; // Found a Match
            }
        }

        return false;
    }

    /**
     *
     */
    add_MainCell_Entry(entryToAdd: ExperimentConditions_GraphicRepresentation_MainCell_Identifier): void {

        if (!entryToAdd) {
            throw Error("ExperimentConditions_GraphicRepresentation_SelectedCells::add_MainCell_Entry:  No parameter provided");
        }

        if ( this.contains_MainCell_Entry( entryToAdd ) ) {
            // Entry already in existing entries so exit
            return //  EARLY EXIT
        }

        this._selected_MainCell_Entries.push(entryToAdd);
    }

    /**
     *
     */
    remove_MainCell_Entry(entryToRemove: ExperimentConditions_GraphicRepresentation_MainCell_Identifier): void {

        throw Error("remove_MainCell_Entry untested")

        // this.selected_MainCell_Entries = this.selected_MainCell_Entries.filter( ( entry_selectedCellEntries, indexOptional ) => {

        //     const returnValue = ! entry_selectedCellEntries.equals( entryToRemove ) ;
        //     return returnValue;  // return true to add to resulting Array
        // }, this );
    }

    /**
     *
     */
    clear_MainCell_Selection_Entries(): void {

        this._selected_MainCell_Entries = [];
    }
}

    //////////////////////////////
    //////////////////////////////
    //////////////////////////////

/**
 * Selections of Conditions in first Condition Group
 */
class ConditionCell_Selections_First_ConditionGroup {

    private _selected_ConditionCell_ConditionIds : Set<number> = new Set();

    private experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
    private selectedConditionsChanged_Callback : ( params : ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams ) => void
    private _selectedConditionsChanged_Internal_Callback : () => void

    /**
     * 
     */
    constructor({ experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass, selectedConditionsChanged_Callback, selectedConditionsChanged_Internal_Callback } : {

        experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
        selectedConditionsChanged_Callback : ( params : ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams ) => void
        selectedConditionsChanged_Internal_Callback : () => void

    }) {
        this.experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass = experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass;
        this.selectedConditionsChanged_Callback = selectedConditionsChanged_Callback;
        this._selectedConditionsChanged_Internal_Callback = selectedConditionsChanged_Internal_Callback
    }

    /**
     * 
     */
    populate_FromStateManagement() {
        if ( this.experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass && this.experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.get_selectedConditionIds_First_ConditionGroup() ) {
            this._selected_ConditionCell_ConditionIds = new Set( this.experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.get_selectedConditionIds_First_ConditionGroup() );
        }
    }

    /**
     * 
     */
    conditionCell_Selected_ConditionIds_Iterator() : IterableIterator<number> {
        return this._selected_ConditionCell_ConditionIds.values()
    }

    /**
     * 
     */
    is_Any_ConditionCell_Selected() : boolean {

        if ( this._selected_ConditionCell_ConditionIds.size > 0 ) {
            return true;
        }
        return false;
    }

    /**
     * 
     */
    contains_ConditionCell_Entry( conditionId : number ) : boolean {
        return this._selected_ConditionCell_ConditionIds.has( conditionId );
    }
    
    /**
     * 
     */
    add_ConditionCell_Entry( conditionId : number ) : void {
        
        this._selected_ConditionCell_ConditionIds.add( conditionId );

        this.experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.set_selectedConditionIds_FirstConditionGroup( new Set( this._selected_ConditionCell_ConditionIds ) );

        this._selectedConditionsChanged_Internal_Callback();

        if ( this.selectedConditionsChanged_Callback ) {
            const params = new ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams()
            this.selectedConditionsChanged_Callback( params );
        }
    }

    /**
     * @param conditionId - Value to remove
     * @returns true if conditionId found and removed, otherwise false
     */
    remove_ConditionCell_Entry( conditionId : number ) : boolean {
        
        const entryRemoved : boolean = this._selected_ConditionCell_ConditionIds.delete( conditionId );

        if ( ! entryRemoved ) {
            //  Nothing removed so no changes so just return
            return entryRemoved;
        }
        
        this.experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.set_selectedConditionIds_FirstConditionGroup( new Set( this._selected_ConditionCell_ConditionIds ) );

        if ( this.selectedConditionsChanged_Callback ) {
            const params = new ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams()
            this.selectedConditionsChanged_Callback( params );
        }

        return entryRemoved;
    }

    /**
     * Toggle: Remove conditionId if is selected, else add to selected
     * 
     * @param conditionId
     */
    toggle_ConditionCell_Entry( conditionId : number ) : void {
        
        const entryRemoved : boolean = this._selected_ConditionCell_ConditionIds.delete( conditionId );

        if ( ! entryRemoved ) {
            //  Nothing removed so need to add
            this._selected_ConditionCell_ConditionIds.add( conditionId );
        }
        
        this.experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.set_selectedConditionIds_FirstConditionGroup( new Set( this._selected_ConditionCell_ConditionIds ) );

        this._selectedConditionsChanged_Internal_Callback();

        if ( this.selectedConditionsChanged_Callback ) {
            const params = new ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams()
            this.selectedConditionsChanged_Callback( params );
        }
    }

}

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////


/**
 * Selections of Conditions in other than first Condition Group, specified as a path from the second Condition Group down.
 *         (this is done since below the 2nd group, each condition under a different parent is selected independently)
 */
class ConditionCell_Selections_OtherThanFirst_ConditionGroup {

    private _selected_ConditionCell_Entries : Array<ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier> = [];

    private experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
    private readonly selectedConditionsChanged_Callback : (params : ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams ) => void
    private _selectedConditionsChanged_Internal_Callback : () => void

    /**
     * 
     */
    constructor({ experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass, selectedConditionsChanged_Callback, selectedConditionsChanged_Internal_Callback } : {

        experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
        selectedConditionsChanged_Callback : ( params : ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams ) => void
        selectedConditionsChanged_Internal_Callback : () => void

    }) {
        this.experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass = experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass;
        this.selectedConditionsChanged_Callback = selectedConditionsChanged_Callback;
        this._selectedConditionsChanged_Internal_Callback = selectedConditionsChanged_Internal_Callback
    }

    /**
     * 
     */
    populate_FromStateManagement() {

        this._selected_ConditionCell_Entries = [];

        if ( this.experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass ) {

            const selectedConditionIdPaths_OtherThan_First_ConditionGroup = this.experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.get_selectedConditionIdPaths_OtherThan_First_ConditionGroup();

            if (selectedConditionIdPaths_OtherThan_First_ConditionGroup && selectedConditionIdPaths_OtherThan_First_ConditionGroup.length > 0) {

                for (const entry_StateMgmt of selectedConditionIdPaths_OtherThan_First_ConditionGroup) {

                    const entry_Result = new ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier({cell_ConditionIds_Path_Array: entry_StateMgmt})

                    this._selected_ConditionCell_Entries.push(entry_Result)
                }
            }
        }
    }

    /**
     * 
     */
    is_Any_ConditionCell_Selected() : boolean {

        if ( this._selected_ConditionCell_Entries.length > 0 ) {
            return true;
        }
        return false;
    }

    /**
     * For determining if a Condition Label Cell is Selected
     */
    contains_ConditionCell_Entry( entry : ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier ) : boolean {

        if ( ! entry ) {
            const msg = "ExperimentConditions_GraphicRepresentation_SelectedCells::contains_ConditionCell_Entry:  No parameter provided";
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! ( entry instanceof  ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier ) ) {
            const msg = "ExperimentConditions_GraphicRepresentation_SelectedCells::contains_ConditionCell_Entry:   ( ! ( entry instanceof  ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier ) ) ";
            console.warn( msg + ". entry: ", entry );
            throw Error( msg );
        }
        const entry_FoundIn_ExistingEntries = this._selected_ConditionCell_Entries.find( ( entry_selectedCellEntries ) => {  

            if ( entry_selectedCellEntries.equals( entry ) ) {
                return entry_selectedCellEntries; // Is a Match
            }
            return undefined;  // Not a Match
        }, this );

        if ( entry_FoundIn_ExistingEntries ) {
            // Entry already in existing entries so exit
            return true //  EARLY EXIT
        }
        return false;
    }

    /**
     * 
     */
    contains_ConditionCell_Entry_With__ParentPath( parentPath : Array<number> ) : boolean {

        if ( ! parentPath ) {
            throw Error("ExperimentConditions_GraphicRepresentation_SelectedCells::contains_ConditionCell_Entry_With__ParentPath:  No parameter provided");
        }
        const entry_FoundIn_ExistingEntries = this._selected_ConditionCell_Entries.find( ( entry_selectedCellEntries ) => {  

            if ( entry_selectedCellEntries.matches_ParentPath_ConditionIds({ parentPath }) ) {
                return entry_selectedCellEntries; // Is a Match
            }
            return undefined;  // Not a Match
        }, this );

        if ( entry_FoundIn_ExistingEntries ) {
            // Entry already in existing entries so exit
            return true //  EARLY EXIT
        }
        return false;
    }

    /**
     * 
     */
    add_ConditionCell_Entry( paramValue : ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier ) : void {

        if ( ! paramValue ) {
            throw Error("ExperimentConditions_GraphicRepresentation_SelectedCells::add_ConditionCell_Entry:  No parameter provided");
        }
        if ( ! ( paramValue instanceof ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier ) ) {
            throw Error("ExperimentConditions_GraphicRepresentation_SelectedCells::add_ConditionCell_Entry:  ( ! ( paramValue instanceof ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier ) )");
        }

        const entryToAdd_FoundIn_ExistingEntries = this._selected_ConditionCell_Entries.find( ( entry_selectedCellEntries ) => {  

            if ( entry_selectedCellEntries.equals( paramValue ) ) {
                return entry_selectedCellEntries; // Is a Match
            }
            return undefined;  // Not a Match
        }, this );

        if ( entryToAdd_FoundIn_ExistingEntries ) {
            // Entry already in existing entries so exit
            return //  EARLY EXIT
        }

        this._selected_ConditionCell_Entries.push( paramValue );

        {   //  Update Page State Variable

            const selectedConditionIdPaths_OtherThan_First_ConditionGroup_SetValue : Array<Array<number>> = [];

            for ( const selected_ConditionCell_Entry of this._selected_ConditionCell_Entries ) {
                const conditionIds_AsArray = selected_ConditionCell_Entry.get_cell_ConditionIds_AsArray();
                selectedConditionIdPaths_OtherThan_First_ConditionGroup_SetValue.push( conditionIds_AsArray );
            }
            this.experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.set_selectedConditionIdPaths_OtherThan_First_ConditionGroup( selectedConditionIdPaths_OtherThan_First_ConditionGroup_SetValue );
        }

        this._selectedConditionsChanged_Internal_Callback();

        if ( this.selectedConditionsChanged_Callback ) {
            const params = new ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams()
            this.selectedConditionsChanged_Callback( params );
        }
    }

    /**
     * "Toggle"
     * 
     * Add if not in selection, otherwise remove.
     */
    toggle_ConditionCell_Entry( paramValue : ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier ) : void {

        if ( ! paramValue ) {
            throw Error("ExperimentConditions_GraphicRepresentation_SelectedCells::toggle_ConditionCell_Entry:  No parameter provided");
        }
        if ( ! ( paramValue instanceof ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier ) ) {
            throw Error("ExperimentConditions_GraphicRepresentation_SelectedCells::toggle_ConditionCell_Entry:  ( ! ( paramValue instanceof ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier ) )");
        }

        const removedEntry = this._remove_ConditionCell_Entry_Internal( paramValue );

        if ( ! removedEntry ) {
            //  No entry found to remove so add it

            this._selected_ConditionCell_Entries.push(paramValue);
        }
        {   //  Update Page State Variable

            const selectedConditionIdPaths_OtherThan_First_ConditionGroup_SetValue : Array<Array<number>> = [];

            for ( const selected_ConditionCell_Entry of this._selected_ConditionCell_Entries ) {
                const conditionIds_AsArray = selected_ConditionCell_Entry.get_cell_ConditionIds_AsArray();
                selectedConditionIdPaths_OtherThan_First_ConditionGroup_SetValue.push( conditionIds_AsArray );
            }
            this.experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.set_selectedConditionIdPaths_OtherThan_First_ConditionGroup( selectedConditionIdPaths_OtherThan_First_ConditionGroup_SetValue );
        }

        this._selectedConditionsChanged_Internal_Callback();

        if ( this.selectedConditionsChanged_Callback ) {
            const params = new ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams()
            this.selectedConditionsChanged_Callback( params );
        }
    }

    /**
     * @return true if removed value matching paramValue
     */
    remove_ConditionCell_Entry( paramValue : ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier ) : boolean {

        if (!paramValue) {
            throw Error("ExperimentConditions_GraphicRepresentation_SelectedCells::remove_ConditionCell_Entry:  No parameter provided");
        }
        if (!(paramValue instanceof ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier)) {
            throw Error("ExperimentConditions_GraphicRepresentation_SelectedCells::remove_ConditionCell_Entry:  ( ! ( paramValue instanceof ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier ) )");
        }

        const foundMatch = this._remove_ConditionCell_Entry_Internal( paramValue );

        {   //  Update Page State Variable

            const selectedConditionIdPaths_OtherThan_First_ConditionGroup_SetValue : Array<Array<number>> = [];

            for ( const selected_ConditionCell_Entry of this._selected_ConditionCell_Entries ) {
                const conditionIds_AsArray = selected_ConditionCell_Entry.get_cell_ConditionIds_AsArray();
                selectedConditionIdPaths_OtherThan_First_ConditionGroup_SetValue.push( conditionIds_AsArray );
            }
            this.experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.set_selectedConditionIdPaths_OtherThan_First_ConditionGroup( selectedConditionIdPaths_OtherThan_First_ConditionGroup_SetValue );
        }

        this._selectedConditionsChanged_Internal_Callback();

        if ( this.selectedConditionsChanged_Callback ) {
            const params = new ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams()
            this.selectedConditionsChanged_Callback( params );
        }

        return foundMatch;
    }


    /**
     * @return true if removed value matching paramValue
     */
    private _remove_ConditionCell_Entry_Internal( paramValue : ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier ) : boolean {

        let foundMatch = false;

        this._selected_ConditionCell_Entries = this._selected_ConditionCell_Entries.filter( ( entry_selectedCellEntries, indexOptional ) => { 

            const isMatch = entry_selectedCellEntries.equals( paramValue ) ;
            if ( isMatch ) {
                foundMatch = true;
            }
            const returnValue = ! isMatch ;
            return returnValue;  // return true to add to resulting Array
        }, this );

        return foundMatch;
    }

    /**
     * 
     */
    clear_Selection_Entries() : void {
        
        this._selected_ConditionCell_Entries = [];
    }

    
}

