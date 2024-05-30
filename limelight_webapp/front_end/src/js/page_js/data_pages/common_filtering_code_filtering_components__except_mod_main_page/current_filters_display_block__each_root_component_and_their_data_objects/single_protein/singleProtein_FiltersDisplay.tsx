/**
 * singleProtein_FiltersDisplay.tsx
 * 
 * Display currently applied Peptide Page Filters.
 * 
 * Includes the "clear all" link to clear all filters
 *
 * 
 */

import React from 'react'

import {currentFiltersDisplayBlock__SingleProtein__ProteinSequenceWidget} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__single_protein__display_elements/currentFiltersDisplayBlock__SingleProtein__ProteinSequenceWidget";
import {currentFiltersDisplayBlock__PSB__SearchSubGroups} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__common_psb__display_elements/currentFiltersDisplayBlock__PSB__SearchSubGroups";
import {currentFiltersDisplayBlock__Modifications_and_ReporterIons} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__common_display_elements/currentFiltersDisplayBlock__Modifications_and_ReporterIons";
import {currentFiltersDisplayBlock__ScanFilenameId_On_PSM_Filter_UserSelection} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__common_display_elements/currentFiltersDisplayBlock__ScanFilenameId_On_PSM_Filter_UserSelection";
import {currentFiltersDisplayBlock__Scan_RetentionTime_MZ_UserSelections} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__common_display_elements/currentFiltersDisplayBlock__Scan_RetentionTime_MZ_UserSelections";
import {currentFiltersDisplayBlock__Peptide_QC__PeptideUnique_UserSelection} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__peptide_qc__display_elements/currentFiltersDisplayBlock__Peptide_QC__PeptideUnique_UserSelection";
import {currentFiltersDisplayBlock__Peptide_QC__PeptideSequence_UserSelections} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__peptide_qc__display_elements/currentFiltersDisplayBlock__Peptide_QC__PeptideSequence_UserSelections";
import {currentFiltersDisplayBlock__Peptide_SingleProtein__PeptideList__FilterOnCounts_PSM_UserSelections} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__peptide__single_protein___display_elements/currentFiltersDisplayBlock__Peptide_SingleProtein__PeptideList__FilterOnCounts_PSM_UserSelections";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {SingleProtein_FiltersDisplay_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__each_root_component_and_their_data_objects/single_protein/singleProtein_FiltersDisplay_ComponentData";
import {currentFiltersDisplayBlock__Charge_On_PSM_Filter_UserSelection} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__common_display_elements/currentFiltersDisplayBlock__Charge_On_PSM_Filter_UserSelection";
import {Page_MainFiltersDisplay_CommonDisplayContainer_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__each_root_component_and_their_data_objects/common/page_MainFiltersDisplay_CommonDisplayContainer_Component";
import {currentFiltersDisplayBlock__PeptideSequence_MissedCleavageCount_UserSelections} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__common_display_elements/currentFiltersDisplayBlock__PeptideSequence_MissedCleavageCount_UserSelections";
import {currentFiltersDisplayBlock__PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__common_display_elements/currentFiltersDisplayBlock__PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections";
import {
    currentFiltersDisplayBlock__ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__common_display_elements/currentFiltersDisplayBlock__ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection";
import {
    currentFiltersDisplayBlock__ScanPeak_M_Over_Z__Intensity_Filter_UserSelection
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__common_display_elements/currentFiltersDisplayBlock__ScanPeak_M_Over_Z__Intensity_Filter_UserSelection";




/**
 * 
 */
export type SingleProtein_FiltersDisplay_clearAllFiltersClickHandler = () => void;

/**
 * 
 */
export interface SingleProtein_FiltersDisplay_Props {

    singleProtein_FiltersDisplay_ComponentData : SingleProtein_FiltersDisplay_ComponentData;

    //  All called clearAllFiltersClickHandler  has been modified to NOT clear ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
    clearAllFiltersClickHandler : SingleProtein_FiltersDisplay_clearAllFiltersClickHandler;
}

/**
 * 
 */
interface SingleProtein_FiltersDisplay_State {

    prev_singleProtein_FiltersDisplay_ComponentData : SingleProtein_FiltersDisplay_ComponentData;
}

/**
 * 
 */
export class SingleProtein_FiltersDisplay extends React.Component< SingleProtein_FiltersDisplay_Props, SingleProtein_FiltersDisplay_State > {

    //  bind to 'this' for passing as parameters
    private _clearAllFiltersClickHandler_BindThis = this._clearAllFiltersClickHandler.bind(this);

    /**
     * 
     */    
    constructor(props : SingleProtein_FiltersDisplay_Props) {
        super(props);

        this.state = { prev_singleProtein_FiltersDisplay_ComponentData : props.singleProtein_FiltersDisplay_ComponentData };
    }

    /**
     * 
     */   
    shouldComponentUpdate( nextProps: Readonly<SingleProtein_FiltersDisplay_Props>, nextState: Readonly<SingleProtein_FiltersDisplay_State>, nextContext: any) : boolean {

        if ( nextProps.singleProtein_FiltersDisplay_ComponentData !== this.props.singleProtein_FiltersDisplay_ComponentData ) {
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
                    scanFilenameId_On_PSM_Filter_UserSelection_StateObject: this.props.singleProtein_FiltersDisplay_ComponentData.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                    commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder: this.props.singleProtein_FiltersDisplay_ComponentData.commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            { // SearchSubGroups - NOT on Experiment Page

                const currentFilter = currentFiltersDisplayBlock__PSB__SearchSubGroups({
                    searchSubGroup_Are_All_SearchSubGroupIds_Selected: this.props.singleProtein_FiltersDisplay_ComponentData.searchSubGroup_Are_All_SearchSubGroupIds_Selected,
                    searchSubGroup_PropValue: this.props.singleProtein_FiltersDisplay_ComponentData.searchSubGroup_PropValue
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            {  //  Modifications and Reporter Ions

                const currentFilter = currentFiltersDisplayBlock__Modifications_and_ReporterIons({
                    modificationMass_UserSelections_StateObject: this.props.singleProtein_FiltersDisplay_ComponentData.modificationMass_UserSelections_StateObject,
                    reporterIonMass_UserSelections_StateObject: this.props.singleProtein_FiltersDisplay_ComponentData.reporterIonMass_UserSelections_StateObject
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            {  //  Scan_RetentionTime_MZ_UserSelections

                const currentFilter = currentFiltersDisplayBlock__Scan_RetentionTime_MZ_UserSelections({
                    scan_RetentionTime_MZ_UserSelections_StateObject: this.props.singleProtein_FiltersDisplay_ComponentData.scan_RetentionTime_MZ_UserSelections_StateObject
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            {  //  PSM Charge Filter

                const currentFilter = currentFiltersDisplayBlock__Charge_On_PSM_Filter_UserSelection({
                    psm_Charge_Filter_UserSelection_StateObject: this.props.singleProtein_FiltersDisplay_ComponentData.psm_Charge_Filter_UserSelection_StateObject
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            {  //  Scan Peak Filter

                const currentFilter = currentFiltersDisplayBlock__ScanPeak_M_Over_Z__Intensity_Filter_UserSelection({
                    scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject: this.props.singleProtein_FiltersDisplay_ComponentData.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject
                })
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            {  //  PSM Count Filter

                const currentFilter = currentFiltersDisplayBlock__Peptide_SingleProtein__PeptideList__FilterOnCounts_PSM_UserSelections({
                    peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject: this.props.singleProtein_FiltersDisplay_ComponentData.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }


            {  //  Scan Number Filter
                const currentFilter = currentFiltersDisplayBlock__ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection({
                    scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject: this.props.singleProtein_FiltersDisplay_ComponentData.scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject,
                    projectSearchIds: this.props.singleProtein_FiltersDisplay_ComponentData.projectSearchIds,
                    dataPageStateManager: this.props.singleProtein_FiltersDisplay_ComponentData.dataPageStateManager,
                    commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder: this.props.singleProtein_FiltersDisplay_ComponentData.commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            {  //  Peptide Unique UserSelections

                const currentFilter = currentFiltersDisplayBlock__Peptide_QC__PeptideUnique_UserSelection({
                    peptideUnique_UserSelection_StateObject: this.props.singleProtein_FiltersDisplay_ComponentData.peptideUnique_UserSelection_StateObject
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }


            {  //  Peptide Sequence UserSelections

                const currentFilter = currentFiltersDisplayBlock__Peptide_QC__PeptideSequence_UserSelections({
                    peptideSequence_UserSelections_StateObject: this.props.singleProtein_FiltersDisplay_ComponentData.peptideSequence_UserSelections_StateObject
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            {  //  Peptide Sequence Missed Cleavage Count UserSelections
                const currentFilter = currentFiltersDisplayBlock__PeptideSequence_MissedCleavageCount_UserSelections({
                    peptideSequence_MissedCleavageCount_UserSelections_StateObject: this.props.singleProtein_FiltersDisplay_ComponentData.peptideSequence_MissedCleavageCount_UserSelections_StateObject
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            {  //  Peptide Tryptic UserSelections
                const currentFilter = currentFiltersDisplayBlock__PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections({
                    peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject: this.props.singleProtein_FiltersDisplay_ComponentData.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
                })
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            {  //  Single Protein - ProteinSequenceWidget

                const currentFilter = currentFiltersDisplayBlock__SingleProtein__ProteinSequenceWidget({
                    proteinSequenceWidget_StateObject: this.props.singleProtein_FiltersDisplay_ComponentData.proteinSequenceWidget_StateObject
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
                <Page_MainFiltersDisplay_CommonDisplayContainer_Component clearAllFiltersClickHandler={ this.props.clearAllFiltersClickHandler } >
                    { currentFiltersArray }
                </Page_MainFiltersDisplay_CommonDisplayContainer_Component>
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

