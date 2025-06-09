/**
 * filter_selection_item__any__all__selection_item.tsx
 *
 * In Filter Section of Single Protein
 *
 * A Single Selection Item which is in Variable/Open Mod, Static Mod, and Reporter Ion selections
 *
 *
 */

import React from 'react'
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_reporter_ion__user_selections__coordinator/js/modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class";
import {filter_selection_item__any__all__selection_item_TooltipText__Selected} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/filter_selectionItem_Any_All_SelectionItem/jsx/filter_selection_item__any__all__selection_item_TooltipText__Selected_and_Buttons";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";


/**
 *
 */
export interface Filter_selectionItem_Any_All_SelectionItem_Props {

    textLabel : string
    current_selection_SelectionType : SingleProtein_Filter_SelectionType

    modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class: ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class
}

interface Filter_selectionItem_Any_All_SelectionItem_State { //  Keep shouldComponentUpdate up to date
    placeHolder?: any
}

/**
 *
 */
export class Filter_selectionItem_Any_All_SelectionItem extends React.Component< Filter_selectionItem_Any_All_SelectionItem_Props, Filter_selectionItem_Any_All_SelectionItem_State > {

    //  bind to 'this' for passing as parameters

    /**
     *
     */
    constructor(props: Filter_selectionItem_Any_All_SelectionItem_Props) {
        super(props);

    }


    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate(nextProps: Filter_selectionItem_Any_All_SelectionItem_Props, nextState : Filter_selectionItem_Any_All_SelectionItem_State ) {

        //  Only update if changed: props:

        if (this.props.textLabel !== nextProps.textLabel
            || this.props.current_selection_SelectionType !== nextProps.current_selection_SelectionType
            || this.props.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class === nextProps.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class
        ) {
            return true;
        }
        return false;

        //  If Comment out prev code, comment out this method
    }

    componentDidUpdate(prevProps: Readonly<Filter_selectionItem_Any_All_SelectionItem_Props>, prevState: Readonly<Filter_selectionItem_Any_All_SelectionItem_State>, snapshot?: any) {

    }

    /**
     *
     */
    render() {

        const cssClassNames_total = " clickable"

        const iconStyle : React.CSSProperties = { marginTop: 2, marginLeft: 2, marginRight: 2 }


        let tooltipMainText : string = undefined

        if ( this.props.current_selection_SelectionType === SingleProtein_Filter_SelectionType.ANY ) {
            tooltipMainText = filter_selection_item__any__all__selection_item_TooltipText__Selected._OR__TOOLTIP_MAIN_TEXT_STRING
        } else if ( this.props.current_selection_SelectionType === SingleProtein_Filter_SelectionType.ALL ) {

            if ( this.props.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class
                && this.props.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class.single_OR_AND_Selected ) {
                tooltipMainText = filter_selection_item__any__all__selection_item_TooltipText__Selected._ADD__ONLY__TOOLTIP_MAIN_TEXT_STRING
            } else {
                tooltipMainText = filter_selection_item__any__all__selection_item_TooltipText__Selected._AND__TOOLTIP_MAIN_TEXT_STRING
            }
        } else if ( this.props.current_selection_SelectionType === SingleProtein_Filter_SelectionType.NOT ) {
            tooltipMainText = filter_selection_item__any__all__selection_item_TooltipText__Selected._NOT__TOOLTIP_MAIN_TEXT_STRING
        } else {

            //  No tooltip text needed.  Tooltip component will properly handle 'undefined' and NOT display a tooltip.
        }

        return (
            <div className=" " style={ { position : "relative" } }>

                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                    title={ tooltipMainText }
                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                >
                    <div
                        className={ cssClassNames_total }
                    >

                        <div style={ { display: "inline-block" } }>

                            {(this.props.current_selection_SelectionType) ?
                                //  Selected: Edit Icon: Pencil
                                <img src="static/images/icon-edit.png" className="fake-link-image icon-small" style={ iconStyle } />
                                :
                                //  Not Selected: Add Icon: Plus
                                <img src="static/images/icon-expand.png" className="fake-link-image icon-small" style={ iconStyle } />
                            }
                        </div>
                        <div style={ { display: "inline-block", whiteSpace : "nowrap" } }>
                            { this.props.textLabel }
                        </div>
                    </div>
                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
            </div>
        )
    }
}
