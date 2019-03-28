/**
 * modification_mass_rounding.js
 * 
 * Javascript for rounding Dynamic and Static Modifications
 */


const _MODIFICATION_MASS_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT = 2;
 
const _10_POWER_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT = Math.pow( 10, _MODIFICATION_MASS_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT );


/**
* @param modificationMass
* @returns Number with modification mass rounded
*/
const modificationMass_CommonRounding_ReturnNumber = function( modificationMass ) {

   if ( modificationMass === undefined ) {
       throw Error("modificationMass === undefined");
   }
   const modificationMass_Times_places = modificationMass * _10_POWER_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT
   const modificationMass_Times_places_rounded = Math.round( modificationMass_Times_places );
   const modificationMassRounded = modificationMass_Times_places_rounded / _10_POWER_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT;
   return modificationMassRounded;
}

/**
* @param modificationMass
* @returns String with modification mass rounded
*/
const modificationMass_CommonRounding_ReturnString = function( modificationMass ) {

   if ( modificationMass === undefined ) {
       throw Error("modificationMass === undefined");
   }
   let modificationMassRoundedString = modificationMass.toFixed( _MODIFICATION_MASS_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT );
   if ( _MODIFICATION_MASS_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT > 0 ) {
       //  Remove any trailing '0' and remove '.' if then last character
       modificationMassRoundedString = modificationMassRoundedString.replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1');
   }
   return modificationMassRoundedString;
}

export { modificationMass_CommonRounding_ReturnNumber, modificationMass_CommonRounding_ReturnString }
