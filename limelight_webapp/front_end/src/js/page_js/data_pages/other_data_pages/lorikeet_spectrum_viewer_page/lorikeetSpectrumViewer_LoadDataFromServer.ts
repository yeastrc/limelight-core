/**
 * lorikeetSpectrumViewer_LoadDataFromServer.ts
 * 
 * Javascript for  page lorikeetSpectrumViewerView.jsp 
 * 
 * Lorikeet Spectrum Viewer on it's own page
 * 
 * Load data from server
 * 
 */


//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";


//  module import 

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';

import { DataPageStateManager, AnnotationTypeData_Root, AnnotationTypeItems_PerProjectSearchId, AnnotationTypeItem } from 'page_js/data_pages/data_pages_common/dataPageStateManager';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { AnnotationTypeDataRetrieval } from 'page_js/data_pages/data_pages_common/annotationTypeDataRetrieval';

import {AnnotationTypeData_ReturnSpecifiedTypes} from "page_js/data_pages/data_pages_common/annotationTypeData_ReturnSpecifiedTypes";
import {
    LorikeetSpectrumViewer_DataFromServer_AnnotationDataItem_Data,
    LorikeetSpectrumViewer_DataFromServer_OpenModificationDataItem_Data,
    LorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data_Root,
    LorikeetSpectrumViewer_DataFromServer_VariableModificationDataItem_Data
} from "page_js/data_pages/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data";
import {LorikeetSpectrumViewer_DataFromServer_Root_Data} from "page_js/data_pages/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_DataFromServer_Root_Data";
import {
    LorikeetSpectrumViewer_DataFromServer_Spectrum_Data_Root,
    LorikeetSpectrumViewer_DataFromServer_Spectrum_ServiceResult,
    LorikeetSpectrumViewer_DataFromServer_StaticModificationDataItem_Data
} from "page_js/data_pages/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_DataFromServer_Spectrum_Data";
import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";


export class LorikeetSpectrumViewer_LoadDataFromServer {

    /**
     * 
     */
    lorikeetSpectrumViewer_LoadDataFromServer({ psmId, projectSearchId, dataPageStateManager_DataFrom_Server } : {
        
        psmId: number
        projectSearchId: number
        dataPageStateManager_DataFrom_Server  : DataPageStateManager

    }) : Promise<LorikeetSpectrumViewer_DataFromServer_Root_Data> {

        return new Promise<LorikeetSpectrumViewer_DataFromServer_Root_Data>( ( resolve, reject ) => {
            try {
                const loadSpectrumDataPromise = this._loadSpectrumData( { psmId, projectSearchId } );

                const loadPSMPeptideDataPromise = this._loadPSMPeptideData( { psmId, projectSearchId, dataPageStateManager_DataFrom_Server } );
                                
                Promise.all( [ loadSpectrumDataPromise , loadPSMPeptideDataPromise ] ).then(function(resultArray) {
                    try {
                        const result_primaryLorikeetData : LorikeetSpectrumViewer_DataFromServer_Spectrum_ServiceResult = resultArray[0];

                        const result_psmPeptideData : LorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data_Root = resultArray[1];

                        const loadedDataFromServer : LorikeetSpectrumViewer_DataFromServer_Root_Data = {
                            primaryLorikeetData: result_primaryLorikeetData,
                            psmPeptideData: result_psmPeptideData
                        }

                        resolve(loadedDataFromServer);

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                }).catch( function( reason ) {
                    reject();
                })
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }); 
    }

    /**
     * 
     */
    _loadSpectrumData(
        {
            psmId, projectSearchId
        }: {
            psmId: number
            projectSearchId: number

        } ) : Promise<LorikeetSpectrumViewer_DataFromServer_Spectrum_ServiceResult> {
        
        return new Promise<LorikeetSpectrumViewer_DataFromServer_Spectrum_ServiceResult>( ( resolve, reject ) => {
                try {
                        console.log("AJAX Call to get Spectrum Data START, Now: " + new Date() );

                        let requestObject = {
                            psmId,
                            projectSearchId
                        };

                        const url = "d/rws/for-page/psb/spectrum-for-psm-id";

                        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;
        
                        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;
        
                        promise_webserviceCallStandardPost.catch( () => { 
                            try {
                                //  newWindow not defined
                                // if ( newWindow ) {
                                //     newWindow.close(); // close here before call handleAJAXFailure(...) since that may reload the page
                                // }

                                reject();

                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        } );

                        promise_webserviceCallStandardPost.then( ({ responseData }:{ responseData: any }) => {
                            try {
                                console.log("AJAX Call to get Spectrum Data END, Now: " + new Date() );

                                const processedResponse = this._loadSpectrumData_Process_Validate_ServerResponse({ serverResponse : responseData })

                                resolve( processedResponse );

                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }

                        });
                } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                }
        }); 
    }

    /**
     * Validate Server response
     */
    _loadSpectrumData_Process_Validate_ServerResponse( { serverResponse } : {

        serverResponse: LorikeetSpectrumViewer_DataFromServer_Spectrum_ServiceResult

    }  ) :  LorikeetSpectrumViewer_DataFromServer_Spectrum_ServiceResult {

        if ( ! serverResponse.lorikeet_ScanData_RetentionTime_PrecursorMZ ) {
            const msg = "_loadSpectrumData_Process_Validate_ServerResponse: ( ! serverResponse.lorikeet_ScanData_RetentionTime_PrecursorMZ )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( serverResponse.lorikeet_ScanData_RetentionTime_PrecursorMZ.scan_precursorMZ === undefined || serverResponse.lorikeet_ScanData_RetentionTime_PrecursorMZ.scan_precursorMZ === null ) {
            const msg = "_loadSpectrumData_Process_Validate_ServerResponse: ( serverResponse.lorikeet_ScanData_RetentionTime_PrecursorMZ.scan_precursorMZ === undefined || serverResponse.lorikeet_ScanData_RetentionTime_PrecursorMZ.scan_precursorMZ === null )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( ! limelight__variable_is_type_number_Check( serverResponse.lorikeet_ScanData_RetentionTime_PrecursorMZ.scan_precursorMZ ) ) {
            const msg = "_loadSpectrumData_Process_Validate_ServerResponse: ( ! limelight__variable_is_type_number_Check( serverResponse.lorikeet_ScanData_RetentionTime_PrecursorMZ.scan_precursorMZ ) )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( serverResponse.lorikeet_ScanData_RetentionTime_PrecursorMZ.scan_retentionTimeSeconds !== undefined && serverResponse.lorikeet_ScanData_RetentionTime_PrecursorMZ.scan_retentionTimeSeconds !== null ) {
            if ( ! limelight__variable_is_type_number_Check( serverResponse.lorikeet_ScanData_RetentionTime_PrecursorMZ.scan_retentionTimeSeconds ) ) {
                const msg = "_loadSpectrumData_Process_Validate_ServerResponse: ( ! limelight__variable_is_type_number_Check( serverResponse.lorikeet_ScanData_RetentionTime_PrecursorMZ.scan_retentionTimeSeconds ) )";
                console.warn(msg);
                throw Error(msg);
            }
        }

        if ( ! serverResponse.data ) {
            const msg = "_loadSpectrumData_Process_Validate_ServerResponse: ( ! serverResponse.data )";
            console.warn(msg);
            throw Error(msg);
        }

        {
            const data = serverResponse.data;

            if ( data.fileName === undefined || data.fileName === null ) {
                const msg = "_loadSpectrumData_Process_Validate_ServerResponse: ( data.fileName === undefined || data.fileName === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! limelight__IsVariableAString( data.fileName ) ) {
                const msg = "_loadSpectrumData_Process_Validate_ServerResponse: ( ! limelight__IsVariableAString( data.fileName ) )";
                console.warn(msg);
                throw Error(msg);
            }

            if ( data.scanNum === undefined || data.scanNum === null ) {
                const msg = "_loadSpectrumData_Process_Validate_ServerResponse: ( data.scanNum === undefined || data.scanNum === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( data.scanNum ) ) {
                const msg = "_loadSpectrumData_Process_Validate_ServerResponse: ( ! limelight__variable_is_type_number_Check( data.scanNum ) )";
                console.warn(msg);
                throw Error(msg);
            }

            if ( data.peaks === undefined || data.peaks === null ) {
                const msg = "_loadSpectrumData_Process_Validate_ServerResponse: ( data.peaks === undefined || data.peaks === null )";
                console.warn(msg);
                throw Error(msg);
            }

            if ( data.staticMods !== undefined && data.staticMods !== null ) {

                if ( ! ( data.staticMods instanceof Array ) ) {
                    const msg = "_loadSpectrumData_Process_Validate_ServerResponse: ( ! ( data.staticMods instanceof Array ) )";
                    console.warn(msg);
                    throw Error(msg);
                }

                for ( const staticModItem of data.staticMods ) {

                    if ( staticModItem.modMass === undefined || staticModItem.modMass === null ) {
                        const msg = "_loadSpectrumData_Process_Validate_ServerResponse: ( staticModItem.modMass === undefined || staticModItem.modMass === null )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                    if ( ! limelight__variable_is_type_number_Check( staticModItem.modMass ) ) {
                        const msg = "_loadSpectrumData_Process_Validate_ServerResponse: ( ! limelight__variable_is_type_number_Check( staticModItem.modMass ) )";
                        console.warn(msg);
                        throw Error(msg);
                    }

                    if ( staticModItem.aminoAcid === undefined || staticModItem.aminoAcid === null ) {
                        const msg = "_loadSpectrumData_Process_Validate_ServerResponse: ( staticModItem.aminoAcid === undefined || staticModItem.aminoAcid === null )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                    if ( ! limelight__IsVariableAString( staticModItem.aminoAcid ) ) {
                        const msg = "_loadSpectrumData_Process_Validate_ServerResponse: ( ! limelight__IsVariableAString( staticModItem.aminoAcid ) )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                }
            }
        }

        return  serverResponse;
    }

    /**
     * 
     */
    _loadPSMPeptideData( { psmId, projectSearchId, dataPageStateManager_DataFrom_Server } : {
        
        psmId: number,
        projectSearchId: number,
        dataPageStateManager_DataFrom_Server  : DataPageStateManager

    }  ) :  Promise<LorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data_Root> {
        
        return new Promise<LorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data_Root>( ( resolve, reject ) => {
            try {

                // Build dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay for request to 'retrieveSearchAnnotationTypeData(...)'

                const dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = new DataPageStateManager();

                dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.set_projectSearchIds( [ projectSearchId ] );

                const annotationTypeDataRetrieval = new AnnotationTypeDataRetrieval();

                const retrieveAnnotationType_Promise =
                    annotationTypeDataRetrieval.retrieveSearchAnnotationTypeData( {
                        dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
                        dataPageStateManager_DataFrom_Server
                    } );

                if ( ! retrieveAnnotationType_Promise ) {
                    throw Error("retrieveAnnotationType_Promise is null or undefined");
                }

                retrieveAnnotationType_Promise.catch( () => { reject() });

                retrieveAnnotationType_Promise.then( () => {
                    try {
  
                        //  Pull Default PSM Ann Type Display 

                        const psmDefaultAnnTypeDisplay : Array<number> = this._get_psmDefaultAnnTypeDisplay({ projectSearchId, dataPageStateManager_DataFrom_Server });

                        const annotationTypeData_ReturnSpecifiedTypes = new AnnotationTypeData_ReturnSpecifiedTypes({ dataPageStateManager_DataFrom_Server })

                        let psmAnnotationTypeIdsForSorting = annotationTypeData_ReturnSpecifiedTypes.get_Psm_AnnotationTypeIds_WhereSortOrderPopulated( { projectSearchId } );
                        
                        let requestObject = {
                            psmId : psmId,
                            projectSearchId : projectSearchId,
                            psmAnnTypeDisplay : psmDefaultAnnTypeDisplay,
                            psmAnnotationTypeIdsForSorting : psmAnnotationTypeIdsForSorting,
                        };
                        
                        console.log("AJAX Call to get PSM data for Spectrum Viewer window START, Now: " + new Date() );

                        const url = "d/rws/for-page/psb/psm-peptide-list-display-with-spectrum-viewer";

                        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                        promise_webserviceCallStandardPost.catch( () => { 
                            try {
                                reject();

                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        });

                        promise_webserviceCallStandardPost.then( ({ responseData }:{ responseData: any }) => {
                            try {
                                console.log("AJAX Call to get PSM data for Spectrum Viewer window END, Now: " + new Date() );

                                const processedResponse = this._loadPSMPeptideData_Process_Validate_ServerResponse({ serverResponse : responseData })

                                resolve( processedResponse );

                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        });
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                })
            } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
            }
        }); 
    }


    /**
     * Validate Server response and Copy Array to Map
     */
    _loadPSMPeptideData_Process_Validate_ServerResponse( { serverResponse } : {

        serverResponse: LorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data_Root

    }  ) :  LorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data_Root {

        if ( ! serverResponse.resultList ) {
            const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! serverResponse.resultList )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( ! ( serverResponse.resultList instanceof Array ) ) {
            const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! ( serverResponse.resultList instanceof Array ) )";
            console.warn(msg);
            throw Error(msg);
        }
        for ( const resultItem of serverResponse.resultList ) {

            if ( ! resultItem.psmId ) {
                const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! resultItem.psmId )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( resultItem.psmId ) ) {
                const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! limelight__variable_is_type_number_Check( resultItem.psmId ) )";
                console.warn(msg);
                throw Error(msg);
            }

            if ( ! resultItem.charge ) {
                const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! resultItem.charge )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( resultItem.charge ) ) {
                const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! limelight__variable_is_type_number_Check( resultItem.charge ) )";
                console.warn(msg);
                throw Error(msg);
            }

            if ( resultItem.psm_precursor_RetentionTime !== undefined && resultItem.psm_precursor_RetentionTime !== null ) {
               if ( ! limelight__variable_is_type_number_Check( resultItem.psm_precursor_RetentionTime ) ) {
                   const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! limelight__variable_is_type_number_Check( resultItem.psm_precursor_RetentionTime ) )";
                   console.warn(msg);
                   throw Error(msg);
               }
            }

            if ( resultItem.psm_precursor_MZ && resultItem.psm_precursor_MZ !== null ) {
                if ( ! limelight__variable_is_type_number_Check( resultItem.psm_precursor_MZ ) ) {
                    const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! limelight__variable_is_type_number_Check( resultItem.psm_precursor_MZ ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
            }

            if ( ! resultItem.scanNumber ) {
                const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! resultItem.scanNumber )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( resultItem.scanNumber ) ) {
                const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! limelight__variable_is_type_number_Check( resultItem.scanNumber ) )";
                console.warn(msg);
                throw Error(msg);
            }

            if ( resultItem.psmAnnotationList ) {

                if ( ! ( resultItem.psmAnnotationList instanceof Array ) ) {
                    const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! ( resultItem.psmAnnotationList instanceof Array ) )";
                    console.warn(msg);
                    throw Error(msg);
                }

                //  Copy Array to Map

                resultItem.psmAnnotationMap_Key_AnnotationTypeId = new Map();

                for ( const psmAnnotationItem of resultItem.psmAnnotationList ) {

                    if ( ! psmAnnotationItem.annotationTypeId ) {
                        const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! psmAnnotationItem.annotationTypeId )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                    if ( ! limelight__variable_is_type_number_Check( psmAnnotationItem.annotationTypeId ) ) {
                        const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! limelight__variable_is_type_number_Check( psmAnnotationItem.annotationTypeId ) )";
                        console.warn(msg);
                        throw Error(msg);
                    }

                    if ( psmAnnotationItem.valueDouble !== undefined && psmAnnotationItem.valueDouble !== null ) {
                        if ( ! limelight__variable_is_type_number_Check( psmAnnotationItem.valueDouble ) ) {
                            const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! limelight__variable_is_type_number_Check( psmAnnotationItem.valueDouble ) )";
                            console.warn(msg);
                            throw Error(msg);
                        }
                    }
                    if ( psmAnnotationItem.valueString !== undefined && psmAnnotationItem.valueString !== null ) {
                        if ( ! limelight__IsVariableAString( psmAnnotationItem.valueString ) ) {
                            const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! limelight__IsVariableAString( psmAnnotationItem.valueString ) )";
                            console.warn(msg);
                            throw Error(msg);
                        }
                    }

                    //  Put in Map
                    resultItem.psmAnnotationMap_Key_AnnotationTypeId.set( psmAnnotationItem.annotationTypeId, psmAnnotationItem );
                }
            }


            if ( ! resultItem.reportedPeptideId ) {
                const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! resultItem.reportedPeptideId )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( resultItem.reportedPeptideId ) ) {
                const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! limelight__variable_is_type_number_Check( resultItem.reportedPeptideId ) )";
                console.warn(msg);
                throw Error(msg);
            }

            if ( ! resultItem.reportedPeptideString ) {
                const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! resultItem.reportedPeptideString )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! limelight__IsVariableAString( resultItem.reportedPeptideString ) ) {
                const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! limelight__IsVariableAString( resultItem.reportedPeptideString ) )";
                console.warn(msg);
                throw Error(msg);
            }

            if ( ! resultItem.peptideSequence ) {
                const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! resultItem.peptideSequence )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! limelight__IsVariableAString( resultItem.peptideSequence ) ) {
                const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! limelight__IsVariableAString( resultItem.peptideSequence ) )";
                console.warn(msg);
                throw Error(msg);
            }

            if ( resultItem.reporterIonMassList ) {

                if ( ! ( resultItem.reporterIonMassList instanceof Array ) ) {
                    const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! ( resultItem.reporterIonMassList instanceof Array ) )";
                    console.warn(msg);
                    throw Error(msg);
                }

                for ( const reporterIonMass of resultItem.reporterIonMassList ) {

                    if ( ! limelight__variable_is_type_number_Check( reporterIonMass ) ) {
                        const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! limelight__variable_is_type_number_Check( reporterIonMass ) )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                }
            }

            if ( resultItem.hasReporterIons ) {
                resultItem.hasReporterIons = true;
            } else {
                resultItem.hasReporterIons = false;
            }


            if ( resultItem.openModificationMassAndPositionsList ) {

                if ( ! ( resultItem.openModificationMassAndPositionsList instanceof Array ) ) {
                    const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! ( resultItem.openModificationMassAndPositionsList instanceof Array ) )";
                    console.warn(msg);
                    throw Error(msg);
                }

                for ( const openModificationMassAndPositionsItem of resultItem.openModificationMassAndPositionsList ) {

                    if ( openModificationMassAndPositionsItem.openModMass === undefined && openModificationMassAndPositionsItem.openModMass === null ) {
                        const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( openModificationMassAndPositionsItem.openModMass === undefined && openModificationMassAndPositionsItem.openModMass === null )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                    if ( ! limelight__variable_is_type_number_Check( openModificationMassAndPositionsItem.openModMass ) ) {
                        const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! limelight__variable_is_type_number_Check( openModificationMassAndPositionsItem.openModMass ) )";
                        console.warn(msg);
                        throw Error(msg);
                    }

                    if ( openModificationMassAndPositionsItem.positionEntries_Optional ) {

                        if ( ! ( openModificationMassAndPositionsItem.positionEntries_Optional instanceof Array ) ) {
                            const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! ( openModificationMassAndPositionsItem.positionEntries_Optional instanceof Array ) )";
                            console.warn(msg);
                            throw Error(msg);
                        }

                        for ( const positionEntries_Optional_Item of openModificationMassAndPositionsItem.positionEntries_Optional ) {

                            if ( positionEntries_Optional_Item.position === undefined && positionEntries_Optional_Item.position === null ) {
                                const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( positionEntries_Optional_Item.position === undefined && positionEntries_Optional_Item.position === null )";
                                console.warn(msg);
                                throw Error(msg);
                            }
                            if ( ! limelight__variable_is_type_number_Check( positionEntries_Optional_Item.position ) ) {
                                const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! limelight__variable_is_type_number_Check( positionEntries_Optional_Item.position ) )";
                                console.warn(msg);
                                throw Error(msg);
                            }

                            if ( positionEntries_Optional_Item.is_N_Terminal ) {
                                positionEntries_Optional_Item.is_N_Terminal = true;
                            } else {
                                positionEntries_Optional_Item.is_N_Terminal = false;
                            }

                            if ( positionEntries_Optional_Item.is_C_Terminal ) {
                                positionEntries_Optional_Item.is_C_Terminal = true;
                            } else {
                                positionEntries_Optional_Item.is_C_Terminal = false;
                            }
                        }
                    }
                }
            }

            if ( resultItem.hasOpenModifications ) {
                resultItem.hasOpenModifications = true;
            } else {
                resultItem.hasOpenModifications = false;
            }


            if ( resultItem.variableMods ) {

                if ( ! ( resultItem.variableMods instanceof Array ) ) {
                    const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! ( resultItem.variableMods instanceof Array ) )";
                    console.warn(msg);
                    throw Error(msg);
                }

                for ( const variableModsItem of resultItem.variableMods ) {

                    if ( variableModsItem.index === undefined && variableModsItem.index === null ) {
                        const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( variableModsItem.index === undefined && variableModsItem.index === null )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                    if ( ! limelight__variable_is_type_number_Check( variableModsItem.index ) ) {
                        const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! limelight__variable_is_type_number_Check( variableModsItem.index ) )";
                        console.warn(msg);
                        throw Error(msg);
                    }

                    if ( variableModsItem.modMass === undefined && variableModsItem.modMass === null ) {
                        const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( variableModsItem.modMass === undefined && variableModsItem.modMass === null )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                    if ( ! limelight__variable_is_type_number_Check( variableModsItem.modMass ) ) {
                        const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! limelight__variable_is_type_number_Check( variableModsItem.modMass ) )";
                        console.warn(msg);
                        throw Error(msg);
                    }

                    if ( variableModsItem.aminoAcid === undefined && variableModsItem.aminoAcid === null ) {
                        const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( variableModsItem.aminoAcid === undefined && variableModsItem.aminoAcid === null )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                    if ( ! limelight__IsVariableAString( variableModsItem.aminoAcid ) ) {
                        const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! limelight__IsVariableAString( variableModsItem.aminoAcid ) )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                }
            }

            if ( resultItem.ntermMod === undefined && resultItem.ntermMod === null ) {
                const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( resultItem.ntermMod === undefined && resultItem.ntermMod === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( resultItem.ntermMod ) ) {
                const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! limelight__variable_is_type_number_Check( resultItem.ntermMod ) )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( resultItem.ctermMod === undefined && resultItem.ctermMod === null ) {
                const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( resultItem.ctermMod === undefined && resultItem.ctermMod === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( resultItem.ctermMod ) ) {
                const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! limelight__variable_is_type_number_Check( resultItem.ctermMod ) )";
                console.warn(msg);
                throw Error(msg);
            }

            if ( resultItem.label !== undefined && resultItem.label !== null ) {  // can be null
                if ( ! limelight__IsVariableAString( resultItem.label ) ) {
                    const msg = "_loadPSMPeptideData_Process_Validate_ServerResponse: ( ! limelight__IsVariableAString( resultItem.label ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
            }
        }

        return serverResponse;
    }


    /**
     *
     */
    _get_psmDefaultAnnTypeDisplay({ projectSearchId, dataPageStateManager_DataFrom_Server } : {
        
        projectSearchId: any,
        dataPageStateManager_DataFrom_Server  : DataPageStateManager
    }) : Array<number> {

        const psmDefaultAnnTypeDisplay : Array<number> = [];
        
        const annotationTypeDataLoaded_Root : AnnotationTypeData_Root = dataPageStateManager_DataFrom_Server.get_annotationTypeData_Root();

        const annotationTypeDataLoaded_SingleProjectSearchId : AnnotationTypeItems_PerProjectSearchId = annotationTypeDataLoaded_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
        if ( ! annotationTypeDataLoaded_SingleProjectSearchId ) {
            throw Error("No Data for annotationTypeDataLoaded_SingleProjectSearchIds for projectSearchId: " + projectSearchId );
        }
        const psmFilterableAnnotationTypes_Map : Map<number, AnnotationTypeItem> = annotationTypeDataLoaded_SingleProjectSearchId.psmFilterableAnnotationTypes;
        if ( psmFilterableAnnotationTypes_Map ) {
            this._add_psmDefaultAnnTypeDisplay_FilterableOrDescriptive({ annotationTypes_Map : psmFilterableAnnotationTypes_Map, psmDefaultAnnTypeDisplay });
        }
        const psmDescriptiveAnnotationTypes_Map : Map<number, AnnotationTypeItem> = annotationTypeDataLoaded_SingleProjectSearchId.psmDescriptiveAnnotationTypes;
        if ( psmDescriptiveAnnotationTypes_Map ) {
            this._add_psmDefaultAnnTypeDisplay_FilterableOrDescriptive({ annotationTypes_Map : psmDescriptiveAnnotationTypes_Map, psmDefaultAnnTypeDisplay });
        }

        return psmDefaultAnnTypeDisplay;
    }


    _add_psmDefaultAnnTypeDisplay_FilterableOrDescriptive({ annotationTypes_Map, psmDefaultAnnTypeDisplay } : { 
        
        annotationTypes_Map : Map<number, AnnotationTypeItem>, 
        psmDefaultAnnTypeDisplay : Array<number>
    }) : void {
        for ( const annotationTypes_Map_Entry of annotationTypes_Map.entries() ) {
            const annotationTypeEntry = annotationTypes_Map_Entry[ 1 ]; // value of map entry
            if ( annotationTypeEntry.defaultVisible ) {
                psmDefaultAnnTypeDisplay.push( annotationTypeEntry.annotationTypeId );
            }
        }
    }



	/**
	 * return Promise
	 */
	retrieveSearchNameFromServer({ projectSearchId }:{ projectSearchId: any }) {

        let retrieval = function( resolve: any, reject: any ) {
            try {
                let requestObj = { projectSearchIds : [ projectSearchId ] };

                const url = "d/rws/for-page/psb/search-name-list-from-psi";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => {
                    try { 
                        reject();
                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    } 
                });

                promise_webserviceCallStandardPost.then( ({ responseData }:{ responseData: any }) => {
                    try {
                        resolve({ responseData });

                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                });
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }

        return new Promise( retrieval );
    }

        
	/**
	 * return Promise
	 */
	retrieveProjectTitleFromServer({ projectIdentifier }:{ projectIdentifier: any }) {

        let retrieval = function( resolve: any, reject: any ) {
            try {
                let requestObj = { projectIdentifier : projectIdentifier };

                const url = " d/rws/for-page/project-get-title";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => {
                    try { 
                        reject();
                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    } 
                });

                promise_webserviceCallStandardPost.then( ({ responseData }:{ responseData: any }) => {
                    try {
                        resolve({ responseData });

                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                });
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }

        return new Promise( retrieval );
    }
}
