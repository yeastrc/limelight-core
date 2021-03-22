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
    modificationMass_CommonRounding_ReturnNumber_Function
} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

import { ModificationMass_UserSelections_StateObject } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import { ModificationMass_UserSelections_ComponentData } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_ComponentData';

import { ModificationMass_UserSelections_StaticModifications } from './modificationMass_UserSelections_StaticModifications';
import { ModificationMass_UserSelections_Variable_or_Open_Modifications } from './modificationMass_UserSelections_Variable_or_Open_Modifications';
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_Component} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/jsx/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Component";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_reporter_ion__user_selections__coordinator/js/modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class";


/**
 * 
 */
export interface ModificationMass_UserSelections_Root_Props {

    modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange: object  //  Clear modificationMassSelections_AlwaysShow when this object reference changes

    openModification_OpenSelectMassOverlay_Override_Callback : () => void
    modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData;
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;

    modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData

    modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class: ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class

    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass;
    updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback : () => void;

    proteinSequenceVersionId : number, 
    projectSearchIds : Array<number>,
    proteinNames : string
    proteinDescriptions : string
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>, 
    modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function
    updateMadeTo_modificationMass_UserSelections_StateObject_Callback : () => void;
    update_modificationMass_UserSelections_ComponentData_Callback : () => void;
}

interface ModificationMass_UserSelections_Root_State {

    _placeholder: any
}

/**
 * 
 */
export class ModificationMass_UserSelections_Root extends React.Component< ModificationMass_UserSelections_Root_Props, ModificationMass_UserSelections_Root_State > {

    /**
     * 
     */    
    constructor(props : ModificationMass_UserSelections_Root_Props) {
        super(props);

        this.state = { _placeholder: null };
    }

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
    shouldComponentUpdate(nextProps : ModificationMass_UserSelections_Root_Props, nextState: ModificationMass_UserSelections_Root_State ) {

        // console.log("ModificationMass_UserSelections_Root: shouldComponentUpdate")

        //  Only update if changed: props: 

        if ( this.props.modificationMass_UserSelections_ComponentData !== nextProps.modificationMass_UserSelections_ComponentData ) {
            return true;
        }
        if ( this.props.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class !== nextProps.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class ) {
            return true;
        }
        if ( this.props.modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData !== nextProps.modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData ) {
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
    render() {

        const modificationMass_UserSelections_ComponentData = this.props.modificationMass_UserSelections_ComponentData;

        const variableModificationsData = modificationMass_UserSelections_ComponentData.variableModificationsData;
        const open_ModificationsData = modificationMass_UserSelections_ComponentData.open_ModificationsData;
        const staticModificationsData = modificationMass_UserSelections_ComponentData.staticModificationsData;

        return (
                
            <React.Fragment>

                {/*   Variable Modifications */}
                <ModificationMass_UserSelections_Variable_or_Open_Modifications
                    variable_Modifications_DISPLAY={ true }
                    open_Modifications_DISPLAY={ false }
                    modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange={ this.props.modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange }
                    openSelectMassOverlay_Override_Callback={ undefined }
                    variable_or_Open_ModificationsData={ variableModificationsData }
                    modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class={ this.props.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class }
                    modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject={ this.props.modificationMass_UserSelections_StateObject.get_VariableModificationSelections() }
                    updateMadeTo_modificationMass_UserSelections_StateObject_Callback={ this.props.updateMadeTo_modificationMass_UserSelections_StateObject_Callback }
                    update_modificationMass_UserSelections_ComponentData_Callback={ this.props.update_modificationMass_UserSelections_ComponentData_Callback }
                    //  For Selection in Overlay
                    proteinSequenceVersionId={ this.props.proteinSequenceVersionId }
                    projectSearchIds={ this.props.projectSearchIds }
                    proteinNames={ this.props.proteinNames }
                    proteinDescriptions={ this.props.proteinDescriptions }
                    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds={ this.props.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds }
                    modificationMass_CommonRounding_ReturnNumber={ this.props.modificationMass_CommonRounding_ReturnNumber }
                    //  For Enclosed <ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_Component>
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData={ null }
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass={ null }
                    updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback={ null }
                />

                {/*   Open Modifications.  Includes: Checkbox for User to specify that Open Mod masses that round to Zero are not considered to be Open Mod Masses */}
                <ModificationMass_UserSelections_Variable_or_Open_Modifications
                    variable_Modifications_DISPLAY={ false }
                    open_Modifications_DISPLAY={ true }
                    modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange={ this.props.modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange }
                    openSelectMassOverlay_Override_Callback={ this.props.openModification_OpenSelectMassOverlay_Override_Callback }
                    variable_or_Open_ModificationsData={ open_ModificationsData }
                    modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class={ this.props.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class }
                    modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject={ this.props.modificationMass_UserSelections_StateObject.get_OpenModificationSelections() }
                    updateMadeTo_modificationMass_UserSelections_StateObject_Callback={ this.props.updateMadeTo_modificationMass_UserSelections_StateObject_Callback }
                    update_modificationMass_UserSelections_ComponentData_Callback={ this.props.update_modificationMass_UserSelections_ComponentData_Callback }
                    //  For Selection in Overlay
                    proteinSequenceVersionId={ this.props.proteinSequenceVersionId }
                    projectSearchIds={ this.props.projectSearchIds }
                    proteinNames={ this.props.proteinNames }
                    proteinDescriptions={ this.props.proteinDescriptions }
                    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds={ this.props.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds }
                    modificationMass_CommonRounding_ReturnNumber={ this.props.modificationMass_CommonRounding_ReturnNumber }
                    //  For Enclosed <ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_Component>
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData={ this.props.modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData }
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass={ this.props.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass }
                    updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback={ this.props.updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback }
                />

                {/* Static Modifications --}} */}
                <ModificationMass_UserSelections_StaticModifications
                    staticModificationsData={ staticModificationsData }
                    modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class={ this.props.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class }
                    modificationMass_UserSelections_StateObject={ this.props.modificationMass_UserSelections_StateObject }
                    updateMadeTo_modificationMass_UserSelections_StateObject_Callback={ this.props.updateMadeTo_modificationMass_UserSelections_StateObject_Callback }
                />

            </React.Fragment>
        );

    }    
}

