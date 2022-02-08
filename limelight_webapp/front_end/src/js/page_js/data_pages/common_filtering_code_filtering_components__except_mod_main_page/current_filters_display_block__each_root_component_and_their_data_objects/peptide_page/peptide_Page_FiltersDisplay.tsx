/**
 * peptide_Page_FiltersDisplay.tsx
 * 
 * Display currently applied Peptide Page Filters.
 * 
 * Includes the "clear all" link to clear all filters
 *
 * 
 */

import React from 'react'

import {currentFiltersDisplayBlock__PSB__SearchSubGroups} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__common_psb__display_elements/currentFiltersDisplayBlock__PSB__SearchSubGroups";
import {currentFiltersDisplayBlock__Modifications_and_ReporterIons} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__common_display_elements/currentFiltersDisplayBlock__Modifications_and_ReporterIons";
import {currentFiltersDisplayBlock__ScanFilenameId_On_PSM_Filter_UserSelection} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__common_display_elements/currentFiltersDisplayBlock__ScanFilenameId_On_PSM_Filter_UserSelection";
import {currentFiltersDisplayBlock__Scan_RetentionTime_MZ_UserSelections} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__common_display_elements/currentFiltersDisplayBlock__Scan_RetentionTime_MZ_UserSelections";
import {currentFiltersDisplayBlock__Peptide_QC__PeptideUnique_UserSelection} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__peptide_qc__display_elements/currentFiltersDisplayBlock__Peptide_QC__PeptideUnique_UserSelection";
import {currentFiltersDisplayBlock__Peptide_QC__PeptideSequence_UserSelections} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__peptide_qc__display_elements/currentFiltersDisplayBlock__Peptide_QC__PeptideSequence_UserSelections";
import {currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__peptide_qc__display_elements/currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections";
import {currentFiltersDisplayBlock__Peptide_SingleProtein__PeptideList__FilterOnCounts_PSM_UserSelections} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__peptide__single_protein___display_elements/currentFiltersDisplayBlock__Peptide_SingleProtein__PeptideList__FilterOnCounts_PSM_UserSelections";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {Peptide_Page_FiltersDisplay_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__each_root_component_and_their_data_objects/peptide_page/peptide_Page_FiltersDisplay_ComponentData";




/**
 * 
 */
export type Peptide_Page_FiltersDisplay_clearAllFiltersClickHandler = () => void;

/**
 * 
 */
export interface Peptide_Page_FiltersDisplay_Props {

    peptide_Page_FiltersDisplay_ComponentData : Peptide_Page_FiltersDisplay_ComponentData;

    //  All called clearAllFiltersClickHandler  has been modified to NOT clear ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
    clearAllFiltersClickHandler : Peptide_Page_FiltersDisplay_clearAllFiltersClickHandler;
}

/**
 * 
 */
interface Peptide_Page_FiltersDisplay_State {

    prev_peptide_Page_FiltersDisplay_ComponentData : Peptide_Page_FiltersDisplay_ComponentData;
}

/**
 * 
 */
export class Peptide_Page_FiltersDisplay extends React.Component< Peptide_Page_FiltersDisplay_Props, Peptide_Page_FiltersDisplay_State > {

    //  bind to 'this' for passing as parameters
    private _clearAllFiltersClickHandler_BindThis = this._clearAllFiltersClickHandler.bind(this);

    /**
     * 
     */    
    constructor(props : Peptide_Page_FiltersDisplay_Props) {
        super(props);

        this.state = { prev_peptide_Page_FiltersDisplay_ComponentData : props.peptide_Page_FiltersDisplay_ComponentData };
    }

    /**
     * 
     */   
    shouldComponentUpdate( nextProps: Readonly<Peptide_Page_FiltersDisplay_Props>, nextState: Readonly<Peptide_Page_FiltersDisplay_State>, nextContext: any) : boolean {

        if ( nextProps.peptide_Page_FiltersDisplay_ComponentData !== this.props.peptide_Page_FiltersDisplay_ComponentData ) {
            return true;
        }
        return false;
    }

    /**
     * 
     */    
    _clearAllFiltersClickHandler( event : React.MouseEvent<HTMLSpanElement, MouseEvent> ) : void {

        // event.preventDefault();
        // event.stopPropagation();

        if ( this.props.clearAllFiltersClickHandler ) {
            this.props.clearAllFiltersClickHandler();
        }
    }

    ////////////////////////////////////////

    /**
     * 
     */    
    render() {
        try {

            const currentFiltersArray : Array<JSX.Element> = []

            {  //  scanFilenameId_On_PSM_Filter_UserSelection

                const currentFilter = currentFiltersDisplayBlock__ScanFilenameId_On_PSM_Filter_UserSelection({
                    scanFilenameId_On_PSM_Filter_UserSelection_StateObject: this.props.peptide_Page_FiltersDisplay_ComponentData.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                    dataPage_common_Data_Holder_Holder_SearchScanFileData_Root: this.props.peptide_Page_FiltersDisplay_ComponentData.dataPage_common_Data_Holder_Holder_SearchScanFileData_Root
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            { // SearchSubGroups - NOT on Experiment Page

                const currentFilter = currentFiltersDisplayBlock__PSB__SearchSubGroups({
                    searchSubGroup_Are_All_SearchSubGroupIds_Selected: this.props.peptide_Page_FiltersDisplay_ComponentData.searchSubGroup_Are_All_SearchSubGroupIds_Selected,
                    searchSubGroup_PropValue: this.props.peptide_Page_FiltersDisplay_ComponentData.searchSubGroup_PropValue
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            {  //  Modifications and Reporter Ions

                const currentFilter = currentFiltersDisplayBlock__Modifications_and_ReporterIons({
                    modificationMass_UserSelections_StateObject: this.props.peptide_Page_FiltersDisplay_ComponentData.modificationMass_UserSelections_StateObject,
                    reporterIonMass_UserSelections_StateObject: this.props.peptide_Page_FiltersDisplay_ComponentData.reporterIonMass_UserSelections_StateObject
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            {  //  Scan_RetentionTime_MZ_UserSelections

                const currentFilter = currentFiltersDisplayBlock__Scan_RetentionTime_MZ_UserSelections({
                    scan_RetentionTime_MZ_UserSelections_StateObject: this.props.peptide_Page_FiltersDisplay_ComponentData.scan_RetentionTime_MZ_UserSelections_StateObject
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            {  //  PSM Count Filter

                const currentFilter = currentFiltersDisplayBlock__Peptide_SingleProtein__PeptideList__FilterOnCounts_PSM_UserSelections({
                    peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject: this.props.peptide_Page_FiltersDisplay_ComponentData.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            {  //  Peptide Unique UserSelections

                const currentFilter = currentFiltersDisplayBlock__Peptide_QC__PeptideUnique_UserSelection({
                    peptideUnique_UserSelection_StateObject: this.props.peptide_Page_FiltersDisplay_ComponentData.peptideUnique_UserSelection_StateObject
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }


            {  //  Peptide Sequence UserSelections

                const currentFilter = currentFiltersDisplayBlock__Peptide_QC__PeptideSequence_UserSelections({
                    peptideSequence_UserSelections_StateObject: this.props.peptide_Page_FiltersDisplay_ComponentData.peptideSequence_UserSelections_StateObject
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            {  //  Protein Position Filter UserSelections

                const currentFilter = currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections({
                    proteinPositionFilter_UserSelections_StateObject: this.props.peptide_Page_FiltersDisplay_ComponentData.proteinPositionFilter_UserSelections_StateObject,
                    proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data: this.props.peptide_Page_FiltersDisplay_ComponentData.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            if ( currentFiltersArray.length === 0 ) {

                //  NO Filter Display returned anything to display

                return null; // EARLY RETURN
            }

            return (
                <React.Fragment>
                    <div className=" current-filters-label ">
                    <span  style={ { fontWeight: "bold" } } >
                        Current filters:
                    </span>
                        <span> </span>
                        <span style={ { fontSize: 12, fontWeight: "normal" } } className="fake-link " onClick={ this._clearAllFiltersClickHandler_BindThis } >clear all</span>
                    </div>
                    <div className=" filter-common-selection-block  " style={ { marginTop: 4, marginBottom: 10, marginLeft: 6 } }>

                        { currentFiltersArray }

                    </div>
                </React.Fragment>
            );

        } catch( e ) {
            console.warn("Exception caught in render()");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }
}

//////////////////////
//////////////////////
//////////////////////

//  NOT in any class
