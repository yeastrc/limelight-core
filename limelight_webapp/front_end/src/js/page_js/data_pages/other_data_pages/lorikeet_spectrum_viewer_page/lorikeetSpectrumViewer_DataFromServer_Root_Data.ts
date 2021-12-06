import {LorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data_Root} from "page_js/data_pages/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data";
import {LorikeetSpectrumViewer_DataFromServer_Spectrum_ServiceResult} from "page_js/data_pages/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_DataFromServer_Spectrum_Data";

/**
 * lorikeetSpectrumViewer_DataFromServer_Root_Data.ts
 *
 * Root class for the data returned from the server
 *
 */


export class LorikeetSpectrumViewer_DataFromServer_Root_Data {

    primaryLorikeetData : LorikeetSpectrumViewer_DataFromServer_Spectrum_ServiceResult
    psmPeptideData : LorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data_Root
}