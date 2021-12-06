/**
 * lorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data.ts
 *
 * Classes for the objects returned from the server for PSM/Peptide List
 *
 */


export class LorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data_Root {

    resultList: Array<LorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data_Entry>
}

export class LorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data_Entry {  //  Server class: public static class WebserviceResult_Item {

    psmId: number // long

    charge: number // int
    psm_precursor_RetentionTime: number; // BigDecimal  precursor_retention_time
    psm_precursor_MZ: number;            // BigDecimal  precursor_m_z

    scanNumber: number;  // int

    psmAnnotationList: Array<LorikeetSpectrumViewer_DataFromServer_AnnotationDataItem_Data>;  // From Server

    psmAnnotationMap_Key_AnnotationTypeId: Map<number, LorikeetSpectrumViewer_DataFromServer_AnnotationDataItem_Data>;  // Populated in JS code from psmAnnotationList

    reportedPeptideId: number; // int

    reportedPeptideString: string;
    peptideSequence: string;

    reporterIonMassList: Array<number>; // List<BigDecimal>
    hasReporterIons: boolean;

    openModificationMassAndPositionsList: Array<LorikeetSpectrumViewer_DataFromServer_OpenModificationDataItem_Data>;
    hasOpenModifications: boolean;


    /**
     * Variable Mods / Dynamic Mods
     */
    variableMods: Array<LorikeetSpectrumViewer_DataFromServer_VariableModificationDataItem_Data>;

    ntermMod: number; // double:  additional mass to be added to the n-term
    ctermMod: number; // double:  additional mass to be added to the c-term

    label: string;		// stable isotope label name

}


export class LorikeetSpectrumViewer_DataFromServer_OpenModificationDataItem_Data {  //  Server class: public static class WebserviceResult_Item_OpenMod_SubPart {

    openModMass: number; // double
    positionEntries_Optional: Array<LorikeetSpectrumViewer_DataFromServer_OpenModification_Position_SubPart_Data>;  // may be null or undefined
}

export class LorikeetSpectrumViewer_DataFromServer_OpenModification_Position_SubPart_Data {  //  Server class: public static class WebserviceResult_Item_OpenMod__OpenModPosition_SubPart {

    position: number;  // int
    is_N_Terminal: boolean;
    is_C_Terminal: boolean;
}


export class LorikeetSpectrumViewer_DataFromServer_VariableModificationDataItem_Data {  //  Server class: public class LorikeetVariableMod {

    /**
     * Variable Modification Position, One (1) based. aka: Dynamic Modification
     */
    index: number;  // int

    /**
     * mass of the Variable Modification, aka: Dynamic Modification
     */
    modMass: number; // double

    /**
     * Amino Acid at the position, One (1) based
     */
    aminoAcid: string;
}

export class LorikeetSpectrumViewer_DataFromServer_AnnotationDataItem_Data {  //  Server class: public static class AnnotationDataItem_ForPage {

    annotationTypeId: number; // Integer
    valueDouble: number; // Double
    valueString: string;
}

