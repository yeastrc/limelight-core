/**
 * modificationMass_UserSelections_StaticModifications.tsx
 * 
 * Modification Mass Selections - Static Modifications
 * 
 * 
 */

import React from 'react'

import { ModificationMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {SingleProtein_Filter_PerUniqueIdentifier_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_CommonObjects";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import { Filter_selectionItem_Any_All_SelectionItem_Container } from '../../filter_selectionItem_Any_All_SelectionItem/jsx/filter_selection_item__any__all__selection_item__container';
import {
    ModificationMass_UserSelections_ComponentData_StaticModificationsData,
    ModificationMass_UserSelections_ComponentData_StaticModificationsData_Entry
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_ComponentData";


/**
 * 
 */
export interface ModificationMass_UserSelections_StaticModifications_Props {

    staticModificationsData :  ModificationMass_UserSelections_ComponentData_StaticModificationsData
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;
    updateMadeTo_modificationMass_UserSelections_StateObject_Callback : () => void;
}

interface ModificationMass_UserSelections_StaticModifications_State {

    _placeholder: any
    // prev_staticModificationsData
}

/**
 * 
 */
export class ModificationMass_UserSelections_StaticModifications extends React.Component< ModificationMass_UserSelections_StaticModifications_Props, ModificationMass_UserSelections_StaticModifications_State > {

    /**
     * 
     */    
    constructor(props : ModificationMass_UserSelections_StaticModifications_Props) {
        super(props);

        //  bind to 'this' for passing as parameters
        // this._callbackMethodForSelectedProteinSequenceChange_BindThis = this._callbackMethodForSelectedProteinSequenceChange.bind(this);

        // this.state = { prev_staticModificationsData : props.staticModificationsData };
    }


    /**
     * After render()
     */
    // componentDidMount() {

    //     console.log("ModificationMass_UserSelections_StaticModifications: componentDidMount");
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
    // static getDerivedStateFromProps( props : ModificationMass_UserSelections_StaticModifications_Props, state : ModificationMass_UserSelections_StaticModifications_State ) {

    // //   console.log("called: static getDerivedStateFromProps(): " );

    // //    Return new state (like return from setState(callback)) or null

    //   return { staticModificationsData : props.staticModificationsData };;

    // }
  

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate( nextProps : ModificationMass_UserSelections_StaticModifications_Props, nextState : ModificationMass_UserSelections_StaticModifications_State ) {

        // console.log("ModificationMass_UserSelections_StaticModifications: shouldComponentUpdate")

        //  Only update if changed: props: dataPerSequencePosition_length

        if ( this.props.staticModificationsData !== nextProps.staticModificationsData ) {
            return true;
        }
        return false;

        //  If Comment out prev code, comment out this function
    }

    // getSnapshotBeforeUpdate( <see docs> ) {


    // }


    /**
     * After render()
     */
    // componentDidUpdate(prevProps, prevState, snapshot) {

    //     // console.log("ModificationMass_UserSelections_StaticModifications: componentDidUpdate")

    //     // if ( this.dataObject_columnEntry_NewValue_Callback ) {
    //     //     this.dataObject_columnEntry_NewValue_Callback({ dataObject_columnEntry : this.props.dataObject_columnEntry });
    //     // }
    // }

    /**
     * 
     */
    // _callbackMethodForSelectedProteinSequenceChange( params ) {

    //     console.log("ModificationMass_UserSelections_StaticModifications: _callbackMethodForSelectedProteinSequenceChange. params: ");
    //     console.log( params );

    // }

    /**
     * 
     */    
    render() {

        const staticModificationsData = this.props.staticModificationsData;

        const showNoStaticModificationsMsg = staticModificationsData.showNoStaticModificationsMsg;
        const staticModificationEntries = staticModificationsData.staticModificationEntries;

        if ( showNoStaticModificationsMsg ) {

            //  Nothing to Render
            return null;  // EARLY RETURN
        }

        let singleModification_Entries = null;

        if ( staticModificationEntries ) {

            singleModification_Entries = staticModificationEntries.map( (staticModificationEntry, index) => {

                return (
                    <SingleModification_Entry key={ staticModificationEntry.modMass + "," + staticModificationEntry.residueLetter } 
                        staticModificationEntry={ staticModificationEntry }
                        modificationMass_UserSelections_StateObject={ this.props.modificationMass_UserSelections_StateObject }
                        updateMadeTo_modificationMass_UserSelections_StateObject_Callback={ this.props.updateMadeTo_modificationMass_UserSelections_StateObject_Callback }
                    />
                );
            });
        }

        return (
            <React.Fragment>

                {/* Parent is CSS Grid with 2 Columns */}

                <div className=" filter-common-filter-label ">Filter On Static Modifications:</div>

                <div className=" filter-common-selection-block " >
                    <div className=" filter-common-selection-inner-block ">

                            { singleModification_Entries }

                    </div>          
                </div> 

            </React.Fragment>
        );

    }    
}

interface SingleModification_Entry_Props {
    staticModificationEntry :  ModificationMass_UserSelections_ComponentData_StaticModificationsData_Entry
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;
    updateMadeTo_modificationMass_UserSelections_StateObject_Callback : () => void;
}

interface SingleModification_Entry_State {
    selection_SelectionType : SingleProtein_Filter_SelectionType
    prevProp_staticModificationEntry? :  ModificationMass_UserSelections_ComponentData_StaticModificationsData_Entry
}

/**
 * 
 */
class SingleModification_Entry extends React.Component< SingleModification_Entry_Props, SingleModification_Entry_State > {

    //  bind to 'this' for passing as parameters
    private _choice_ANY_Clicked_Callback_BindThis = this._choice_ANY_Clicked_Callback.bind(this)
    private _choice_ALL_Clicked_Callback_BindThis = this._choice_ALL_Clicked_Callback.bind(this)
    private _choice_NOT_Clicked_Callback_BindThis = this._choice_NOT_Clicked_Callback.bind(this)
    private _choice_Remove_Clicked_Callback_BindThis = this._choice_Remove_Clicked_Callback.bind(this)

    /**
     * 
     */    
    constructor(props : SingleModification_Entry_Props) {
        super(props);

        const staticModificationEntry = props.staticModificationEntry;

        const residueLetter = staticModificationEntry.residueLetter;
        const modMass = staticModificationEntry.modMass;

        let selection_SelectionType : SingleProtein_Filter_SelectionType = null

        const selectionEntry = this.props.modificationMass_UserSelections_StateObject.get_StaticModification_Selected({ residueLetter, modMass })
        if ( selectionEntry ) {
            selection_SelectionType = selectionEntry.selectionType
        }

        this.state = { selection_SelectionType, prevProp_staticModificationEntry : props.staticModificationEntry };
    }

    /**
     * Must be Static
     * Called before 
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     * 
     * Return new state (like return from setState(callback)) or null
     */
    static getDerivedStateFromProps( props : SingleModification_Entry_Props, state : SingleModification_Entry_State ) : SingleModification_Entry_State {

        // console.log("called: static getDerivedStateFromProps(): " );

        //    Return new state (like return from setState(callback)) or null

        if ( props.staticModificationEntry !== state.prevProp_staticModificationEntry ) {

            //   staticModificationEntry changed so update selection_SelectionType

            const staticModificationEntry = props.staticModificationEntry;

            const residueLetter = staticModificationEntry.residueLetter;
            const modMass = staticModificationEntry.modMass;

            let selection_SelectionType : SingleProtein_Filter_SelectionType = null

            const selectionEntry = props.modificationMass_UserSelections_StateObject.get_StaticModification_Selected({ residueLetter, modMass })
            if ( selectionEntry ) {
                selection_SelectionType = selectionEntry.selectionType
            }

            return { selection_SelectionType, prevProp_staticModificationEntry : props.staticModificationEntry };
        }
            
        return null;
    }
    
    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate(nextProps : SingleModification_Entry_Props, nextState : SingleModification_Entry_State ) {

        // console.log("ModificationMass_UserSelections_Variable_or_Open_Modifications: shouldComponentUpdate")

        //  Only update if changed: props or state: 

        if ( this.state.selection_SelectionType !== nextState.selection_SelectionType ) {
            return true;
        }
        return false;

        //  If Comment out prev code, comment out this method
    }

    /**
     *
     */
    private _choice_ANY_Clicked_Callback() {
        try {
            const selectionType = SingleProtein_Filter_SelectionType.ANY

            this.setState( (state, props) : SingleModification_Entry_State => {

                return { selection_SelectionType : selectionType }
            });

            const staticModificationEntry = this.props.staticModificationEntry;

            const residueLetter = staticModificationEntry.residueLetter;
            const modMass = staticModificationEntry.modMass;

            const newEntry = new SingleProtein_Filter_PerUniqueIdentifier_Entry({ selectionType })
            this.props.modificationMass_UserSelections_StateObject.set_StaticModification_Selected({ residueLetter, modMass, entry : newEntry });

            this._updateRestofPage();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _choice_ALL_Clicked_Callback() {
        try {
            const selectionType = SingleProtein_Filter_SelectionType.ALL

            this.setState( (state, props) : SingleModification_Entry_State => {

                return { selection_SelectionType : selectionType }
            });

            const staticModificationEntry = this.props.staticModificationEntry;

            const residueLetter = staticModificationEntry.residueLetter;
            const modMass = staticModificationEntry.modMass;

            const newEntry = new SingleProtein_Filter_PerUniqueIdentifier_Entry({ selectionType })
            this.props.modificationMass_UserSelections_StateObject.set_StaticModification_Selected({ residueLetter, modMass, entry : newEntry });

            this._updateRestofPage();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _choice_NOT_Clicked_Callback() {
        try {
            const selectionType = SingleProtein_Filter_SelectionType.NOT

            this.setState( (state, props) : SingleModification_Entry_State => {

                return { selection_SelectionType : selectionType }
            });

            const staticModificationEntry = this.props.staticModificationEntry;

            const residueLetter = staticModificationEntry.residueLetter;
            const modMass = staticModificationEntry.modMass;

            const newEntry = new SingleProtein_Filter_PerUniqueIdentifier_Entry({ selectionType })
            this.props.modificationMass_UserSelections_StateObject.set_StaticModification_Selected({ residueLetter, modMass, entry : newEntry });

            this._updateRestofPage();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _choice_Remove_Clicked_Callback() {
        try {
            this.setState( (state, props) : SingleModification_Entry_State => {

                return { selection_SelectionType : null }
            });
            const staticModificationEntry = this.props.staticModificationEntry;

            const residueLetter = staticModificationEntry.residueLetter;
            const modMass = staticModificationEntry.modMass;
            this.props.modificationMass_UserSelections_StateObject.delete_StaticModification_Selected({ residueLetter, modMass })

            this._updateRestofPage();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _updateRestofPage() {
        try {
            window.setTimeout( () => {
                try {
                    this.props.updateMadeTo_modificationMass_UserSelections_StateObject_Callback();

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 1 );

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * 
     */    
    render() {

        const staticModificationEntry = this.props.staticModificationEntry;

        const textLabel = staticModificationEntry.modMass + " (" + staticModificationEntry.residueLetter + ")";

        return (
            <Filter_selectionItem_Any_All_SelectionItem_Container
                textLabel={ textLabel }
                current_selection_SelectionType={ this.state.selection_SelectionType }
                any_Selected_Callback={ this._choice_ANY_Clicked_Callback_BindThis }
                all_Selected_Callback={ this._choice_ALL_Clicked_Callback_BindThis }
                not_Selected_Callback={ this._choice_NOT_Clicked_Callback_BindThis }
                remove_Selected_Callback={ this._choice_Remove_Clicked_Callback_BindThis }
            />
        );
    }
}
