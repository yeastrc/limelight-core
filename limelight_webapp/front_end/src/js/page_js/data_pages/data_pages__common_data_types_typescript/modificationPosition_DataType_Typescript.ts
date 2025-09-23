/**
 * modificationPosition_DataType_Typescript.ts
 *
 * Type declaration for modification position in general.  This is for Variable or Open Modification.  Can be either a string or a number.  String is 'n' or 'c'.
 *
 * Could create an Enum for the string but not done for now
 *
 */

import {
    Limelight__ResiduePosition__c__Type,
    Limelight__ResiduePosition__n__Type
} from "page_js/constants_across_webapp/residue_position_n_c_constants/Limelight__ResiduePositions_n_c_Constants";

/**
 * Type declaration for modification position in general.
 *
 * This is for Variable or Open Modification.
 *
 * Can be either a number or 'n' or 'c'.
 *
 */
export type ModificationPosition_DataType = number | Limelight__ResiduePosition__n__Type | Limelight__ResiduePosition__c__Type
