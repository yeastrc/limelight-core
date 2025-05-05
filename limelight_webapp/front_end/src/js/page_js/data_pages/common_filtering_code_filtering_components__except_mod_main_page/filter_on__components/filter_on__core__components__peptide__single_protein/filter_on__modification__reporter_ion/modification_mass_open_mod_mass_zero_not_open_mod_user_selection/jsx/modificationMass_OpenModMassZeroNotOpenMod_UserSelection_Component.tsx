/**
 * modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Component.tsx
 *
 * Treat Mass 0 As Unmodified:   User Input Checkbox Selection
 *
 * Do not treat open modification masses that round to 0 (0.5 <= mass < 0.5) as open modifications.
 *
 *  !!!  ONLY Show when Search has Open Mod Mass
 *
 */

import React from 'react'

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";

/**
 *
 */
export interface ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_Component_Props {

    modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass;
    updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback : () => void;
    skipRenderConditional : boolean
}

interface ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_Component_State {

    treatOpenModMassZeroAsUnmodified_UserSelection? : boolean
    prev_modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData? : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData
}

/**
 *
 */
export class ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_Component extends React.Component< ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_Component_Props, ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_Component_State > {

    private _inputFieldChanged_BindThis = this._inputFieldChanged.bind(this);

    /**
     *
     */
    constructor(props : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_Component_Props) {
        super(props);

        let treatOpenModMassZeroAsUnmodified_UserSelection = props.modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData.treatOpenModMassZeroAsUnmodified_UserSelection;

        if ( ! treatOpenModMassZeroAsUnmodified_UserSelection ) {
            treatOpenModMassZeroAsUnmodified_UserSelection = false;
        }
        this.state = {
            treatOpenModMassZeroAsUnmodified_UserSelection,
            prev_modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData : props.modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData ,
        };
    }

    /**
     * Must be Static
     * Called before
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     *
     * Return new state (like return from setState(callback)) or null
     */
    static getDerivedStateFromProps( props : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_Component_Props, state : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_Component_State ) : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_Component_State {

        // console.log("called: static getDerivedStateFromProps(): " );

        //    Return new state (like return from setState(callback)) or null

        if ( props.modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData !== state.prev_modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData ) {

            //   modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData changed so update modificationMass_OpenModMassZeroNotOpenMod_UserSelection

            let treatOpenModMassZeroAsUnmodified_UserSelection = props.modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData.treatOpenModMassZeroAsUnmodified_UserSelection;

            if ( ! treatOpenModMassZeroAsUnmodified_UserSelection ) {
                treatOpenModMassZeroAsUnmodified_UserSelection = false;
            }

            return {
                treatOpenModMassZeroAsUnmodified_UserSelection,
                prev_modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData : props.modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData,
            };
        }

        return null;
    }

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate( nextProps : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_Component_Props, nextState : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_Component_State ) : boolean {

        // console.log(" shouldComponentUpdate")

        //  Only update if changed: props or state: 

        if ( this.props.modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData.searchesHaveOpenModMassEntries
            !== nextProps.modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData.searchesHaveOpenModMassEntries ) {
            return true;
        }
        if ( this.state.treatOpenModMassZeroAsUnmodified_UserSelection !== nextState.treatOpenModMassZeroAsUnmodified_UserSelection ) {
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

    //     // console.log("ModificationMass_OpenModMassZeroNotOpenMod_UserSelection: componentDidUpdate")

    //     // if ( this.dataObject_columnEntry_NewValue_Callback ) {
    //     //     this.dataObject_columnEntry_NewValue_Callback({ dataObject_columnEntry : this.props.dataObject_columnEntry });
    //     // }
    // }

    /**
     *
     */
    private _inputFieldChanged() {
        try {
            let newValue = true;
            if ( this.props.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {
                this.props.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.setTreatOpenModMassZeroAsUnmodified_Selection( false );
                newValue = false;
            } else {
                this.props.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.setTreatOpenModMassZeroAsUnmodified_Selection( true );
            }

            this.setState({ treatOpenModMassZeroAsUnmodified_UserSelection: newValue } );

            this.props.updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {

        if ( ! this.props.skipRenderConditional ) {
            if (!this.props.modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData.searchesHaveOpenModMassEntries) {

                //  NO searches contain OPEN Mod Masses so do NOT show this Component

                return null;  //  EARLY RETURN
            }
        }

        const treatOpenModMassZeroAsUnmodified_UserSelection = this.state.treatOpenModMassZeroAsUnmodified_UserSelection;

        const marginBottomSize = 4;

        const tooltipContent = (
            <span>
                <span>Any open modification mass that rounds to zero </span>
                <span style={ { whiteSpace: "nowrap" } }>{ "(>= -0.5 Da and < 0.5 Da)" }</span>
                <span> will not be treated as a modified peptide for purposes of defining distinct peptides, building
                    modified peptide sequence strings, or any other purpose.</span>
            </span>
        )

        return (
            <React.Fragment>

                {/* Parent is CSS Grid with 2 Columns */ }

                <div className=" filter-common-filter-label " style={ { marginBottom: marginBottomSize } }>
                    Treat Mass 0 As Unmodified:

                    <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                        title={ tooltipContent }
                    />
                </div>
                <div className=" filter-common-selection-block peptide-sequence-selection-block "  style={ { marginBottom : marginBottomSize } } >
                    <div className=" filter-common-selection-inner-block ">
                        <div className=" ">  {/* left-margin-same-as-checkbox; to align with checkbox in Unique Peptide */}
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={ tooltipContent }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <input type="checkbox" checked={ treatOpenModMassZeroAsUnmodified_UserSelection }
                                       onChange={ this._inputFieldChanged_BindThis }
                                />
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );

    }
}


