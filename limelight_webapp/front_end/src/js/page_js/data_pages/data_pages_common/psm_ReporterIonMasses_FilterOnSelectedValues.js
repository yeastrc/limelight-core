/**
 * psm_ReporterIonMasses_FilterOnSelectedValues.js
 * 
 * Javascript for Data Pages:  Filter PSMs on selected Reporter Ion Masses
 * 
 * returns psmIds and/or count
 * 
 * Uses psmReporterIonMassesPerPSM_ForPsmIdMap 
 *      which comes from loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs()
 *      after retrieval via reportedPeptideId and Object contents
 * 
 * 
 * 
 */

 /**
 * @param reporterIonMassesSelected - Set
 * @param psmReporterIonMassesPerPSM_ForPsmIdMap - Map
 * @param returnPsmIds - boolean
 * @param reporterIonMassTransformer - object.  Call: reporterIonMassTransformer.transformMass_ReturnNumber({ mass }) - optional
 */
export const psm_ReporterIonMasses_FilterOnSelectedValues = function({ reporterIonMassesSelected, psmReporterIonMassesPerPSM_ForPsmIdMap, returnPsmIds, reporterIonMassTransformer }) {

    if ( ! reporterIonMassesSelected ) {
        const msg = "psm_ReporterIonMasses_FilterOnSelectedValues: reporterIonMassesSelected not set";
        console.warn( msg );
        throw Error( msg );
    }

    if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap ) {
        const msg = "psm_ReporterIonMasses_FilterOnSelectedValues: psmReporterIonMassesPerPSM_ForPsmIdMap not set";
        console.warn( msg );
        throw Error( msg );
    }

    let count = 0;
	const psmIds = [];

    if ( reporterIonMassesSelected.size !== 0 ) {

        for ( const entry of psmReporterIonMassesPerPSM_ForPsmIdMap.entries() ) {
            const reporterIonMasses_Object = entry[ 1 ]; // Map entry value
            const psmId = reporterIonMasses_Object.psmId;
            const reporterIonMasses_Set = reporterIonMasses_Object.reporterIonMasses;
            for ( const reporterIonMass of reporterIonMasses_Set ) {

                let reporterIonMass_Local = reporterIonMass;
                if ( reporterIonMassTransformer ) {
                    reporterIonMass_Local = reporterIonMassTransformer.transformMass_ReturnNumber({ mass : reporterIonMass_Local });
                }
                if ( reporterIonMassesSelected.has( reporterIonMass_Local ) ) {

                    count++;
                    if ( returnPsmIds ) {
                        psmIds.push( psmId );
                    }
                    break;
                }
            }
        }
    }

    const result = { count };
    if ( returnPsmIds ) {
        result.psmIds = psmIds;
    }

    return result;
}
