/**
 * modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class.ts
 *
 * React State data inserted into the component that contains the Modification Mass and Reporter Ion Mass, and "Current peptide filters:" Components
 *
 * Those components will display different options and text based on the contents of this object
 *
 * Create by class ModificationMass_ReporterIon__UserSelections__Coordinator_Class
 */

/**
 * React State data inserted into the component that contains the Modification Mass and Reporter Ion Mass, and "Current peptide filters:" Components
 *
 * Those components will display different options and text based on the contents of this object
 *
 * Create by class ModificationMass_ReporterIon__UserSelections__Coordinator_Class
 */
export class ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class {

    readonly show_Add_Option_InsteadOf_OR_AND : boolean
    readonly single_OR_AND_Selected : boolean

    constructor(
        {
            show_Add_Option_InsteadOf_OR_AND,
            single_OR_AND_Selected
        } : {
            show_Add_Option_InsteadOf_OR_AND: boolean
            single_OR_AND_Selected: boolean
        }) {
        this.show_Add_Option_InsteadOf_OR_AND = show_Add_Option_InsteadOf_OR_AND;
        this.single_OR_AND_Selected = single_OR_AND_Selected;
    }


}