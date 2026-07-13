import { Structure, StructureElement, StructureProperties, StructureSelection, Unit } from "molstar/lib/mol-model/structure";
import { Script } from "molstar/lib/mol-script/script";
import { MolScriptBuilder } from "molstar/lib/mol-script/language/builder";
import { molstar_ChainTest_Expression__For_LabelAsymId } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_structure_widget/js/molstar_ChainTest_Expression";

/**
 * DEV-MODE diagnostics for Mol* chain selection.
 *
 * Verifying chain selection visually is hard: you have to already know which
 * chain is which, and the auth_asym_id vs label_asym_id distinction hides that.
 * These helpers turn "does this look like the right chain?" into "did it match a
 * non-zero, sensible set of atoms, under the auth chain I expect?" — by running
 * the SAME chain selection the widget uses and logging what actually matched.
 *
 * Enable in one of two ways:
 *   - at runtime, from the browser console (no rebuild):
 *         window.LIMELIGHT_MOLSTAR_DEBUG_SELECTION = true
 *   - in code, for a debugging session:
 *         molstar_DevMode_SelectionLogging__SetEnabled( true )
 *
 * When disabled (the default), every logging call is a cheap no-op.
 */

//  Runtime debug flag, settable from the browser console with no rebuild:
//      window.LIMELIGHT_MOLSTAR_DEBUG_SELECTION = true
//  Declared on Window so it is fully typed (no 'any' cast needed to read it).
declare global {
    interface Window {
        LIMELIGHT_MOLSTAR_DEBUG_SELECTION?: boolean;
    }
}

let devMode_SelectionLogging_Enabled_InCode = false;

/** Turn dev-mode selection logging on/off from code. */
export function molstar_DevMode_SelectionLogging__SetEnabled( enabled: boolean ): void {
    devMode_SelectionLogging_Enabled_InCode = enabled;
}

/** True when logging is enabled either in code or via the window flag. */
export function molstar_DevMode_SelectionLogging__IsEnabled(): boolean {
    if ( devMode_SelectionLogging_Enabled_InCode ) {
        return true;
    }
    if ( typeof window !== "undefined" && window.LIMELIGHT_MOLSTAR_DEBUG_SELECTION === true ) {
        return true;
    }
    return false;
}

/**
 * Run the widget's chain selection for a single label_asym_id and log what it
 * matched: the distinct auth_asym_id(s) among matched atoms (should be the one
 * auth chain that corresponds to that label chain), plus atom and residue counts.
 *
 * A match of 0 atoms is logged as a warning — that is the classic auth-vs-label
 * bug symptom (wrong chain id, or a chain-test matching the wrong id namespace).
 *
 * No-op unless dev-mode selection logging is enabled. Never throws: any failure
 * inside the diagnostic is caught and logged, so it cannot break the caller.
 *
 * @param structure               a Mol* Structure to run the selection against
 * @param chainId__label_asym_id  the label_asym_id being selected (e.g.
 *                                chainData.chainId_Label_AssignedAt_StructureFileCreation)
 * @param context                 optional label for the log line (e.g. which
 *                                call site / interaction triggered it)
 */
export function molstar_DevMode_LogChainSelection(
    {
        structure, chainId__label_asym_id, context,
    } : {
        structure: Structure
        chainId__label_asym_id: string
        context?: string
    }
): void {
    if ( ! molstar_DevMode_SelectionLogging__IsEnabled() ) {
        return;
    }

    const prefix = context ? `[molstar chain-select: ${ context }]` : "[molstar chain-select]";

    try {
        //  Build and run the SAME chain selection the widget uses.
        const expression = MolScriptBuilder.struct.generator.atomGroups( {
            "chain-test": molstar_ChainTest_Expression__For_LabelAsymId( chainId__label_asym_id ),
        } );

        const selection = Script.getStructureSelection( expression, structure );
        const selectedStructure = StructureSelection.unionStructure( selection );

        const atomCount = selectedStructure.elementCount;

        //  Collect the distinct auth_asym_id(s) and count residues among matched atoms.
        const authAsymIds = new Set<string>();
        const residueKeys = new Set<string>();

        const loc = StructureElement.Location.create( selectedStructure );
        for ( const unit of selectedStructure.units ) {
            if ( ! Unit.isAtomic( unit ) ) {
                continue;
            }
            loc.unit = unit;
            const elements = unit.elements;
            for ( let i = 0, n = elements.length; i < n; i++ ) {
                loc.element = elements[ i ];
                authAsymIds.add( StructureProperties.chain.auth_asym_id( loc ) );
                residueKeys.add(
                    StructureProperties.chain.label_asym_id( loc ) + ":" + StructureProperties.residue.label_seq_id( loc )
                );
            }
        }

        if ( atomCount === 0 ) {
            //  eslint-disable-next-line no-console
            console.warn( `${ prefix } label chain "${ chainId__label_asym_id }" matched NOTHING (0 atoms). Wrong chain id, or a chain-test matching auth instead of label?` );
        } else {
            //  eslint-disable-next-line no-console
            console.log( `${ prefix } label chain "${ chainId__label_asym_id }" -> ${ atomCount } atoms, ${ residueKeys.size } residues, auth_asym_id(s): [ ${ Array.from( authAsymIds ).join( ", " ) } ]` );
        }
    } catch ( e ) {
        //  Diagnostics must never break the caller.
        //  eslint-disable-next-line no-console
        console.warn( `${ prefix } dev-mode logging failed (ignored):`, e );
    }
}
