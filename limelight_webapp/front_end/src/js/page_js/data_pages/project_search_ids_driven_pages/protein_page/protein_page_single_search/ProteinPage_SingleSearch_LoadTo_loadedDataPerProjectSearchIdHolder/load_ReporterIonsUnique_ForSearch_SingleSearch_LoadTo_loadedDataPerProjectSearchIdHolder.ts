/**
 * load_ReporterIonsUnique_ForSearch_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder.ts
 *
 * Load data into object of class ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 *
 */


import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";

/**
 * Load Reporter Ion Masses Unique within a Single Search
 */
export const load_ReporterIonsUnique_ForSearch_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder = function ( { projectSearchId, loadedDataPerProjectSearchIdHolder } : {

    projectSearchId : number
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder

} ) : Promise<unknown>{

    return new Promise<void>((resolve, reject) => {
        try {
            const promise_getData = _get_ReporterIonsUnique_ForSearch_forProjectSearchId( { projectSearchId } );

            promise_getData.catch((reason) => { reject(reason)});

            promise_getData.then( (reporterIonMassesUniqueList) => {
                try {
                    // DB Results: reporterIonMassesUniqueList: result list item BigDecimal
                    // Store: Set <mass>

                    if ( ! ( reporterIonMassesUniqueList instanceof  Array ) ) {
                        const msg = "reporterIonMassesUniqueList is not an Array";
                        console.warn( msg + ". reporterIonMassesUniqueList: ", reporterIonMassesUniqueList )
                        throw Error(msg);
                    }

                    //  Validate each entry is a number

                    for ( const entry of reporterIonMassesUniqueList ) {
                        if ( ! variable_is_type_number_Check( entry ) ) {
                            const msg = "entry in reporterIonMassesUniqueList is not a number";
                            console.warn( msg + ". reporterIonMassesUniqueList: ", reporterIonMassesUniqueList )
                            throw Error(msg);
                        }
                    }

                    const reporterIonMassesUniqueSet = new Set( reporterIonMassesUniqueList )

                    loadedDataPerProjectSearchIdHolder.set_reporterIonMasses_ForSearch(reporterIonMassesUniqueSet);

                    resolve();

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
        } catch( e ) {
            console.log("Exception caught in New Promise in _getAndProcess_ReporterIonsUnique_ForSearch_forProjectSearchId(...)");
            console.log( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    });
}

/**
 * Get Reporter Ions - Unique Masses for this Search - For Single Project Search Id
 *
 * result list item { String residue, BigDecimal mass }
 */
const _get_ReporterIonsUnique_ForSearch_forProjectSearchId = function ( { projectSearchId }: { projectSearchId: number } ) {

    let promise = new Promise( function( resolve, reject ) {
        try {
            let requestObject = {
                projectSearchId : projectSearchId
            };

            console.log("AJAX Call to get Get Reporter Ions - Unique Masses for this Search START, Now: " + new Date() );

            const url = "d/rws/for-page/psb/reporter-ion-masses-unique-search-level-single-project-search-id";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { reject() }  );

            promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                try {
                    console.log("AJAX Call to get Get Reporter Ions - Unique Masses for this Search END, Now: " + new Date() );

                    resolve( responseData.reporterIonMassesUniqueList );

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

    return promise;
}
