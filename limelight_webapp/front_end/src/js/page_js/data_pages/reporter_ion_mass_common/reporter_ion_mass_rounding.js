/**
 * reporter_ion_mass_rounding.js
 * 
 * Javascript for rounding Reporter Ion Mass
 */


const _REPORTER_ION_MASS_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT = 2;
 
const _10_POWER_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT = Math.pow( 10, _REPORTER_ION_MASS_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT );


/**
* @param modificationMass
* @returns Number with modification mass rounded
*/
const reporterIonMass_CommonRounding_ReturnNumber = function( reporterIonMass ) {

   if ( reporterIonMass === undefined ) {
       throw Error("modificationMass === undefined");
   }
   const reporterIonMass_Times_places = reporterIonMass * _10_POWER_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT
   const reporterIonMass_Times_places_rounded = Math.round( reporterIonMass_Times_places );
   const reporterIonMassRounded = reporterIonMass_Times_places_rounded / _10_POWER_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT;
   return reporterIonMassRounded;
}

/**
 *
* @param modificationMass
* @returns String with modification mass rounded
*/
const reporterIonMass_CommonRounding_ReturnString = function( reporterIonMass ) {

   if ( reporterIonMass === undefined ) {
       throw Error("reporterIonMass === undefined");
   }
   let reporterIonMassRoundedString = reporterIonMass.toFixed( _REPORTER_ION_MASS_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT );
   if ( _REPORTER_ION_MASS_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT > 0 ) {
       //  Remove any trailing '0' and remove '.' if then last character
       reporterIonMassRoundedString = reporterIonMassRoundedString.replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1');
   }
   return reporterIonMassRoundedString;
}

export { reporterIonMass_CommonRounding_ReturnNumber, reporterIonMass_CommonRounding_ReturnString, _REPORTER_ION_MASS_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT }
