/**
 * psm_list_view_MS_1_Scan_TableCell_ExternalComponent.tsx
 *
 * Cell in PSM List for "MS1 Scan" Fake Link - Click to show Scan Browser page with MS 1 scan for PSM scan number
 */

import React from 'react'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
import { PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter } from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/psm_list/js/psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects";
import { PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item } from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/psm_list/js/psmList_ForProjectSearchIdReportedPeptideId_GetDataFromServer";
import { limelight__IsTextSelected } from "page_js/common_all_pages/limelight__IsTextSelected";
import { psm_list_view_MS_1_Scan_Get_ScanBrowserPage_StateObject } from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/psm_list/js/psm_list_view_MS_1_Scan_Get_ScanBrowserPage_StateObject";
import { ScanFileBrowserPageRoot_CentralStateManagerObjectClass } from "page_js/data_pages/scan_file_driven_pages/scan_file_browser_page/scan_file_browser_page_root/scanFileBrowserPageRoot_CentralStateManagerObjectClass";
import { CentralPageStateManager } from "page_js/data_pages/central_page_state_manager/centralPageStateManager";
import { newURL_Build_PerProjectSearchIds_Or_ExperimentId } from "page_js/data_pages/data_pages_common/newURL_Build_PerProjectSearchIds_Or_ExperimentId";
import {
    _REFERRER_PATH_STRING,
    _STANDARD_PAGE_STATE_IDENTIFIER
} from "page_js/data_pages/data_pages_common/a_dataPagesCommonConstants";


/**
 *
 * @param psmListItem
 * @param psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter
 */
export const get_PsmList_MS_1_Scan_TableCell_ExternalReactComponent = function (
    {
        psmListItem,
        psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter
    } : {
        psmListItem: PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item
        psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter: PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter
    }) : JSX.Element {

    return (
        <Internal__PsmList_ViewSpectrumCell_ExternalReactComponent
            psmListItem={ psmListItem }
            psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter={ psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter }
        />
    )
}

/**
 *
 */
interface Internal__PsmList_ViewSpectrumCell_ExternalReactComponent_Props {

    psmListItem: PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item
    psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter: PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter
}

interface Internal__PsmList_ViewSpectrumCell_ExternalReactComponent_State {

    force_Rerender_Object: object
}

/**
 *
 */
class Internal__PsmList_ViewSpectrumCell_ExternalReactComponent extends React.Component< Internal__PsmList_ViewSpectrumCell_ExternalReactComponent_Props, Internal__PsmList_ViewSpectrumCell_ExternalReactComponent_State > {

    private _viewSpectrumFakeLinkClicked_BindThis = this._view_MS1_Scan_FakeLinkClicked.bind(this);

    private _show_LoadingData_Message = false

    private _show_DisabledSince_NO_MS1_ScanNumber = false

    /**
     *
     */
    constructor(props : Internal__PsmList_ViewSpectrumCell_ExternalReactComponent_Props) {
        super(props);

        this.state = { force_Rerender_Object : {} };
    }

    /**
     *
     */
    _view_MS1_Scan_FakeLinkClicked( event: React.MouseEvent<HTMLDivElement, MouseEvent> ) : void {
      try {

        event.preventDefault();   //  Prevent Default Action of event
        event.stopPropagation();  // Stop bubbling of event

          if ( limelight__IsTextSelected() ) {
              return
          }

          //  Show "Loading Data" message
          this._show_LoadingData_Message = true
          this.setState({ force_Rerender_Object: {} })

          window.setTimeout( () => { try {

              const promise_psm_list_view_MS_1_Scan_Get_ScanBrowserPage_StateObject =
                  psm_list_view_MS_1_Scan_Get_ScanBrowserPage_StateObject({
                      psmListItem: this.props.psmListItem,
                      psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter: this.props.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter
                  })

              promise_psm_list_view_MS_1_Scan_Get_ScanBrowserPage_StateObject.catch(reason => { })
              promise_psm_list_view_MS_1_Scan_Get_ScanBrowserPage_StateObject.then(value_psm_list_view_MS_1_Scan_Get_ScanBrowserPage_StateObject_Result => { try {

                  if ( // value_psm_list_view_MS_1_Scan_Get_ScanBrowserPage_StateObject_Result.no_MS1_Scans ||
                      value_psm_list_view_MS_1_Scan_Get_ScanBrowserPage_StateObject_Result.ms1_ScanNumber_NOT_Found ) {

                      window.alert("No MS1 data found for PSM.")

                      this._show_LoadingData_Message = false
                      this._show_DisabledSince_NO_MS1_ScanNumber = true

                      this.setState({ force_Rerender_Object: {} })

                      return // EARLY RETURN

                  } else if ( ! value_psm_list_view_MS_1_Scan_Get_ScanBrowserPage_StateObject_Result.scanFileBrowserPage_SingleScan_UserSelections_StateObject ) {

                      const msg = "no_MS1_Scans AND ms1_ScanNumber_NOT_Found are false AND scanFileBrowserPage_SingleScan_UserSelections_StateObject is NOT populated "
                      console.warn(msg)
                      throw Error(msg)
                  }


                  const singleSingleScanData = value_psm_list_view_MS_1_Scan_Get_ScanBrowserPage_StateObject_Result.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getEncodedStateData()

                  const scanFileBrowserPageRoot_CentralStateManagerObjectClass_ForNewWindow = new ScanFileBrowserPageRoot_CentralStateManagerObjectClass({ centralPageStateManager: undefined, no_centralPageStateManager: true })
                  scanFileBrowserPageRoot_CentralStateManagerObjectClass_ForNewWindow.set_SingleScanDataEncodedStateData({ singleSingleScanData })


                  const centralPageStateManager = new CentralPageStateManager()

                  const stateAsJSON_Compressed = centralPageStateManager.get_CurrentState_AsStringForUrl({ componentOverridesAdditions: [ scanFileBrowserPageRoot_CentralStateManagerObjectClass_ForNewWindow ]})

                  let newWindowURL = newURL_Build_PerProjectSearchIds_Or_ExperimentId({
                      pageControllerPath: value_psm_list_view_MS_1_Scan_Get_ScanBrowserPage_StateObject_Result.scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc__Result.basePathURL,
                      experimentId: undefined,
                      featureDetectionId_Encoded: undefined,
                      projectScanFileId_Encoded: value_psm_list_view_MS_1_Scan_Get_ScanBrowserPage_StateObject_Result.scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc__Result.codeForProjectScanFileId,
                      searchDataLookupParamsCode: undefined,
                      pageStateIdentifier: _STANDARD_PAGE_STATE_IDENTIFIER,
                      pageStateString: stateAsJSON_Compressed,
                      referrer: _REFERRER_PATH_STRING
                  });

                  const newWindow = window.open( newWindowURL, "_blank", "noopener" );

                  //  REMOVE Show "Loading Data" message
                  this._show_LoadingData_Message = false
                  this.setState({ force_Rerender_Object: {} })

              } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

          } catch( e ) {
              console.warn( "Error in DataTable_Table_HeaderRowEntry._viewSpectrumFakeLinkClicked: ", e )
              reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
              throw e;
          }}, 10 )

      } catch( e ) {
          console.warn( "Error in DataTable_Table_HeaderRowEntry._viewSpectrumFakeLinkClicked: ", e )
          reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
          throw e;
      }
    }

    /**
     *
     */
    render() {

        if ( this._show_LoadingData_Message ) {
            return (
                <span
                    className="table-data-cell-property-value "
                    title="Loading Data"
                >
                    Loading Data
                </span>
            )
        }

        if ( this._show_DisabledSince_NO_MS1_ScanNumber ) {
            return (
                <span
                    className="table-data-cell-property-value fake-link-disabled "
                    title="No MS1 data found for PSM."
                >
                    NO MS1 Scan
                </span>
            )
        }

        return (
            <span
                className="table-data-cell-property-value fake-link"
                onClick={ this._viewSpectrumFakeLinkClicked_BindThis }
            >
                MS1 Scan
            </span>
        );
    }
}

