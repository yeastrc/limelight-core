/**
 * lorikeetSpectrumViewer_Data_ForLorikeet_Data.ts
 *
 * Classes for the objects passed to Lorikeet
 *
 */


/**
 * Passed to Lorikeet
 *
 */
export class LorikeetSpectrumViewer_Data_ForLorikeet_Data_Root {

    charge: number;
    precursorMz: number;

    /**
     * Filename for display
     */
    fileName: string;

    /**
     * Scan Number
     */
    scanNum: number;

    /**
     * Peptide Sequence
     */
    sequence: string;

    /**
     * Each sublist is one peak with [<mz>,intensity]
     */
    peaks: any;

    /**
     * Each sublist is one peak with [<mz>,intensity]
     */
    ms1peaks: any;

    /**
     * Static Mods
     */
    staticMods: Array<LorikeetSpectrumViewer_Data_ForLorikeet_StaticModificationDataItem_Data>;

    /**
     * Variable Mods / Dynamic Mods
     */
    variableMods: Array<LorikeetSpectrumViewer_Data_ForLorikeet_VariableModificationDataItem_Data>;

    ntermMod: number; //  additional mass to be added to the n-term
    ctermMod: number; //  additional mass to be added to the c-term

    //  Reporter Ions

    userReporterIons: Array<number>;

    massError : number; // mass tolerance (in th) for labeling peaks

    peakDetect: boolean = false;

    ms1scanLabel: string;


    /**
     *
     */
    height: number; // int

    width: number; // int

}

/**
 * Static Modification for Lorikeet
 */
export class LorikeetSpectrumViewer_Data_ForLorikeet_StaticModificationDataItem_Data {

    /**
     * Amino Acid
     */
    aminoAcid: string;

    /**
     * mass of the Static Modification
     */
    modMass: number; // double
}

/**
 * Variable Modification for Lorikeet,  aka: Dynamic Modification
 *
 * Lorikeet supports more properties ("losses" being one of them).
 *     Need to research them before adding them.
 *
 */
export class LorikeetSpectrumViewer_Data_ForLorikeet_VariableModificationDataItem_Data {

    /**
     * Variable Modification Position, One (1) based. aka: Dynamic Modification
     */
    index: number;  //

    /**
     * mass of the Variable Modification, aka: Dynamic Modification
     */
    modMass: number; //

    /**
     * Amino Acid at the position, One (1) based
     */
    aminoAcid: string;
}
