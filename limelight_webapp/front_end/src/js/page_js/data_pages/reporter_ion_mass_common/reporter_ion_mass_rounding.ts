/**
 * reporter_ion_mass_rounding.ts
 * 
 * Javascript for rounding Reporter Ion Mass
 */


const _REPORTER_ION_MASS_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT = 2;
 
const _10_POWER_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT = Math.pow( 10, _REPORTER_ION_MASS_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT );


type reporterIonMass_CommonRounding_ReturnNumber_Function = ( reporterIonMass : number ) => number;
type reporterIonMass_CommonRounding_ReturnString_Function = ( reporterIonMass : number ) => string;


/**
* @param reporterIonMass
* @returns Number with reporterIon mass rounded
*/
const reporterIonMass_CommonRounding_ReturnNumber = function( reporterIonMass : number ) : number {

   if ( reporterIonMass === undefined ) {
       throw Error("reporterIonMass === undefined");
   }
   const reporterIonMass_Times_places = reporterIonMass * _10_POWER_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT
   const reporterIonMass_Times_places_rounded = Math.round( reporterIonMass_Times_places );
   const reporterIonMassRounded = reporterIonMass_Times_places_rounded / _10_POWER_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT;
   return reporterIonMassRounded;
}

/**
 *
* @param reporterIonMass
* @returns String with reporterIon mass rounded
*/
const reporterIonMass_CommonRounding_ReturnString = function( reporterIonMass : number ) : string {

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

/**
 *
 * @param reporterIonMass
 * @returns true if more decimal places than allowed
 */
const reporterIonMass_CommonRounding_Needed = function ( reporterIonMass : number ) : boolean {

    if ( reporterIonMass === undefined ) {
        throw Error("reporterIonMass === undefined");
    }
    const reporterIonMassString = reporterIonMass.toString();
    const decimalIndex = reporterIonMassString.indexOf( "." );
    if ( decimalIndex === -1){
        // not found
        return false;
    }
    const decimalPortionLength = reporterIonMassString.length - decimalIndex - 1;
    if ( decimalPortionLength > _REPORTER_ION_MASS_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT ) {
        return true;
    }
    return false;

}

////////////////////////////////

export { 
    reporterIonMass_CommonRounding_ReturnNumber_Function,
    reporterIonMass_CommonRounding_ReturnString_Function,
    reporterIonMass_CommonRounding_ReturnNumber, 
    reporterIonMass_CommonRounding_ReturnString,
    reporterIonMass_CommonRounding_Needed,
    _REPORTER_ION_MASS_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT 
}
