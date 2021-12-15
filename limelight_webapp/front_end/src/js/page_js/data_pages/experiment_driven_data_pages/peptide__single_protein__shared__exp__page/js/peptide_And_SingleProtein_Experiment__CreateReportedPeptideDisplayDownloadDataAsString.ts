import {CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData";
import {experiment_getConditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId} from "page_js/data_pages/experiment_data_pages_common/experiment_Get_ConditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId";
import {Experiment_ConditionGroupsContainer} from "page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes";
import {Experiment_ConditionGroupsDataContainer} from "page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";

/**
 * peptide_And_SingleProtein_Experiment__CreateReportedPeptideDisplayDownloadDataAsString.ts
 *
 * Peptide Experiment Page AND Single Protein Experiment Page:
 *
 * CreateReportedPeptideDisplay As String
 *
 *
 */

/**
 * Create Reported Peptide Data as String, for Download
 *
 * @param peptideList
 * @param conditionGroupsContainer
 * @param conditionGroupsDataContainer
 * @param dataPageStateManager
 */
export const peptide_And_SingleProtein_Experiment__CreateReportedPeptideDisplayDownloadDataAsString = function (
    {
        peptideList,
        conditionGroupsContainer,
        conditionGroupsDataContainer,
        dataPageStateManager,
    } : {
        peptideList : Array<CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry>
        conditionGroupsContainer : Experiment_ConditionGroupsContainer
        conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer
        dataPageStateManager : DataPageStateManager
    }
) : string {

    const { conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId, conditionGroupLabels_Only_InSameOrder } =
        experiment_getConditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId({
            conditionGroupsContainer : conditionGroupsContainer,
            conditionGroupsDataContainer : conditionGroupsDataContainer
        });

    //  For getting search info for projectSearchIds
    //   searchNamesKeyProjectSearchId is Map with key are projectSearchId as type number
    const searchNamesMap_KeyProjectSearchId = dataPageStateManager.get_searchNames_AsMap();


    //  Array of Arrays of reportLineParts
    const reportLineParts_AllLines = []; //  Lines will be joined with separator '\n' with '\n' added to last line prior to join

    //  reportLineParts will be joined with separator '\t'

    //  Header Line
    {
        const reportLineParts = [ 'Search Id', 'Search Name', 'Sequence', 'PSM Count' ];

        for ( const conditionGroupLabel of conditionGroupLabels_Only_InSameOrder ) {

            reportLineParts.push( conditionGroupLabel );
        }

        reportLineParts_AllLines.push( reportLineParts );
    }

    //  Data Lines - One line per peptideSequenceDisplay / Search Id

    for ( const peptideItem of peptideList ) {

        for ( const mapEntry of peptideItem.psmCountsMap_KeyProjectSearchId.entries() ) {

            const projectSearchId = mapEntry[ 0 ];
            const psmCount = mapEntry[ 1 ];

            const searchNameEntry = searchNamesMap_KeyProjectSearchId.get( projectSearchId ); //   searchNamesKeyProjectSearchId is Object with property names are projectSearchId as type number
            if ( ! searchNameEntry ) {
                const msg = "createReportedPeptideDisplayDownloadDataAsString: No value in searchNamesKeyProjectSearchId for projectSearchId: " + projectSearchId;
                console.warn( msg );
                throw Error( msg );
            }

            const searchId = searchNameEntry.searchId;
            const searchName = searchNameEntry.name;

            const reportLineParts = [
                searchId.toString(),
                searchName,
                peptideItem.peptideSequenceDisplay,
                psmCount.toString()
            ];

            const conditionGroupLabel_and_ConditionLabel_Data = conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId.get( projectSearchId );
            if ( ! conditionGroupLabel_and_ConditionLabel_Data ) {
                const msg = "createReportedPeptideDisplayDownloadDataAsString: No value in conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId for projectSearchId: " + projectSearchId;
                console.warn( msg );
                throw Error( msg );
            }

            for ( const conditionGroupLabel_and_ConditionLabel_Data_Entry of conditionGroupLabel_and_ConditionLabel_Data ) {

                reportLineParts.push( conditionGroupLabel_and_ConditionLabel_Data_Entry.conditionLabel );
            }

            reportLineParts_AllLines.push( reportLineParts );
        }
    }

    //  Join all line parts into string for each line, delimit on '\t'

    const reportLine_AllLines = [];

    for ( const reportLineParts of reportLineParts_AllLines ) {

        const reportLine = reportLineParts.join( "\t" );
        reportLine_AllLines.push( reportLine );
    }

    //  Add empty string to array so get \n at end of last line when do reportLine_AllLines.join( '\n' );
    reportLine_AllLines.push("");

    //  Join all Lines into single string, delimit on '\n'.  Last line already has '\n' at end

    const reportLinesSingleString = reportLine_AllLines.join( '\n' );

    return reportLinesSingleString;
}