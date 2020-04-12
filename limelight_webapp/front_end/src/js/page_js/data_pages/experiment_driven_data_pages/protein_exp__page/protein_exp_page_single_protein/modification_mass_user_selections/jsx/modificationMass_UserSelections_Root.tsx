/**
 * modificationMass_UserSelections_Root.tsx
 * 
 * Modification Mass Selections - Root
 * 
 * 
 */

import React from 'react'

//   Modification Mass Rounding to provide some level of commonality between searches
import { 
    modificationMass_CommonRounding_ReturnNumber_Function,
    modificationMass_CommonRounding_ReturnString_Function,
    modificationMass_CommonRounding_ReturnNumber, 
    modificationMass_CommonRounding_ReturnString 
} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

import { ModificationMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import { ModificationMass_UserSelections_ComponentData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_ComponentData';

import { ModificationMass_UserSelections_StaticModifications } from './modificationMass_UserSelections_StaticModifications';
import { ModificationMass_UserSelections_VariableModifications } from './modificationMass_UserSelections_VariableModifications';


/**
 * 
 */
export interface ModificationMass_UserSelections_Root_Props {

    modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData;
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;
    proteinSequenceVersionId : number, 
    projectSearchIds : Array<number>,
    proteinNames : string
    proteinDescriptions : string
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>, 
    modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function
    updateMadeTo_modificationMass_UserSelections_StateObject_Callback : () => void;
    update_modificationMass_UserSelections_ComponentData_Callback : () => void;
}

/**
 * 
 */
export class ModificationMass_UserSelections_Root extends React.Component< ModificationMass_UserSelections_Root_Props, {} > {

    /**
     * 
     */    
    constructor(props : ModificationMass_UserSelections_Root_Props) {
        super(props);

        //  bind to 'this' for passing as parameters
        // this._callbackMethodForSelectedProteinSequenceChange_BindThis = this._callbackMethodForSelectedProteinSequenceChange.bind(this);

        this.state = {  };
    }


    /**
     * After render()
     */
    // componentDidMount() {

    //     console.log("ModificationMass_UserSelections_Root: componentDidMount");
    // }

    /**
     * Clean Up
     */
    // componentWillUnmount() {

    // }


    /**
     * Must be Static
     * Called before 
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     * 
     * Return new state (like return from setState(callback)) or null
     */
    // static getDerivedStateFromProps( props, state ) {

      // console.log("called: static getDerivedStateFromProps(): " );

      //  Return new state (like return from setState(callback)) or null

    //   return null;

    // }
  

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate(nextProps : ModificationMass_UserSelections_Root_Props, nextState) {

        // console.log("ModificationMass_UserSelections_Root: shouldComponentUpdate")

        //  Only update if changed: props: 

        if ( this.props.modificationMass_UserSelections_ComponentData !== nextProps.modificationMass_UserSelections_ComponentData ) {
            return true;
        }
        return false;

        //  If Comment out prev code, comment out this method
    }

    // getSnapshotBeforeUpdate( <see docs> ) {


    // }


    /**
     * After render()
     */
    // componentDidUpdate(prevProps, prevState, snapshot) {

    //     // console.log("ModificationMass_UserSelections_Root: componentDidUpdate")

    //     // if ( this.dataObject_columnEntry_NewValue_Callback ) {
    //     //     this.dataObject_columnEntry_NewValue_Callback({ dataObject_columnEntry : this.props.dataObject_columnEntry });
    //     // }
    // }

    /**
     * 
     */
    // _callbackMethodForSelectedProteinSequenceChange( params ) {

    //     console.log("ModificationMass_UserSelections_Root: _callbackMethodForSelectedProteinSequenceChange. params: ");
    //     console.log( params );

    // }

    /**
     * 
     */    
    render() {

        const modificationMass_UserSelections_ComponentData = this.props.modificationMass_UserSelections_ComponentData;

        const variableModificationsData = modificationMass_UserSelections_ComponentData.variableModificationsData;
        const staticModificationsData = modificationMass_UserSelections_ComponentData.staticModificationsData;

        return (
                
            <div className=" modification-mass-selection-outer-block ">

                {/*   Variable Modifications */}
                <ModificationMass_UserSelections_VariableModifications
                    variableModificationsData={ variableModificationsData }
                    modificationMass_UserSelections_StateObject={ this.props.modificationMass_UserSelections_StateObject }
                    updateMadeTo_modificationMass_UserSelections_StateObject_Callback={ this.props.updateMadeTo_modificationMass_UserSelections_StateObject_Callback }
                    update_modificationMass_UserSelections_ComponentData_Callback={ this.props.update_modificationMass_UserSelections_ComponentData_Callback }
                    //  For Selection in Overlay
                    proteinSequenceVersionId={ this.props.proteinSequenceVersionId }
                    projectSearchIds={ this.props.projectSearchIds }
                    proteinNames={ this.props.proteinNames }
                    proteinDescriptions={ this.props.proteinDescriptions }
                    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds={ this.props.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds }
                    modificationMass_CommonRounding_ReturnNumber={ this.props.modificationMass_CommonRounding_ReturnNumber }
                />

                {/* Static Modifications --}} */}
                <ModificationMass_UserSelections_StaticModifications 
                    staticModificationsData={ staticModificationsData }
                    modificationMass_UserSelections_StateObject={ this.props.modificationMass_UserSelections_StateObject }
                    updateMadeTo_modificationMass_UserSelections_StateObject_Callback={ this.props.updateMadeTo_modificationMass_UserSelections_StateObject_Callback }
                />
            </div>
        );

    }    
}

