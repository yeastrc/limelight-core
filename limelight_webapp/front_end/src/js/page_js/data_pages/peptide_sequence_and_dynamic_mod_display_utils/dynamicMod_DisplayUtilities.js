/**
 * dynamicMod_DisplayUtilities.js
 * 
 * Javascript for displaying Dynamic Mods
 */

 const _DYNAMIC_MOD_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT = 1;
 
 const _10_POWER_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT = Math.pow( 10, _DYNAMIC_MOD_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT );

 const dynamicMod_CommonRounding_ReturnNumber = function( dynamicModMass ) {

    if ( dynamicModMass === undefined ) {
        throw Error("dynamicModMass === undefined");
    }
    const dynamicModMass_Times_places = dynamicModMass * _10_POWER_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT
    const dynamicModMass_Times_places_rounded = Math.round( dynamicModMass_Times_places );
    const dynamicModMassRounded = dynamicModMass_Times_places_rounded / _10_POWER_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT;
    return dynamicModMassRounded;
 }

export { dynamicMod_CommonRounding_ReturnNumber }
