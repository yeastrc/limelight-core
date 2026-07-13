import { MolScriptBuilder } from "molstar/lib/mol-script/language/builder";
import { Expression } from "molstar/lib/mol-script/language/expression";

/**
 * MolScript 'chain-test' expression that matches a chain by label_asym_id.
 *
 * IMPORTANT: this matches on label_asym_id, NOT auth_asym_id.  The chain id used throughout the protein-structure
 * widget is chainData.chainId_Label_AssignedAt_StructureFileCreation, which is a label_asym_id (from
 * StructureProperties.chain.label_asym_id).  Matching on auth_asym_id selects the WRONG chain (or nothing) for any
 * structure where auth_asym_id != label_asym_id.
 *
 * Shared by protein_Structure_WidgetDisplay__Main_Component.tsx and
 * Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component.tsx so the two copies cannot
 * silently diverge.
 *
 * @param chainId__label_asym_id  a label_asym_id (e.g. chainData.chainId_Label_AssignedAt_StructureFileCreation)
 */
export function molstar_ChainTest_Expression__For_LabelAsymId( chainId__label_asym_id: string ): Expression {
    return MolScriptBuilder.core.rel.eq( [
        MolScriptBuilder.struct.atomProperty.macromolecular.label_asym_id(),
        chainId__label_asym_id,
    ] );
}
