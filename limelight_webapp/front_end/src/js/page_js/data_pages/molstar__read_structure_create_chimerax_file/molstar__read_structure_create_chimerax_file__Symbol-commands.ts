import { Molstar__read_structure_create_chimerax_file__ResidueSymbolSpec, Molstar__read_structure_create_chimerax_file__CACoordinateMap } from './molstar__read_structure_create_chimerax_file__Types';
import { molstar__read_structure_create_chimerax_file__ResidueKey, molstar__read_structure_create_chimerax_file__NormalizeColor, molstar__read_structure_create_chimerax_file__FmtVec, molstar__read_structure_create_chimerax_file__FmtNum, molstar__read_structure_create_chimerax_file__Vec3_Offset } from './molstar__read_structure_create_chimerax_file__Chimerax-utils';
import {
    MOLSTAR__READ_STRUCTURE_CREATE_CHIMERAX_FILE__CONSTANTS,
} from './molstar__read_structure_create_chimerax_file__Constants';

/**
 * Generate ChimeraX commands for visual symbols placed at CA positions.
 *
 * Symbol types and their ChimeraX representation:
 *
 *   sphere      → marker #N position x,y,z radius r color c
 *   dot         → marker #N position x,y,z radius 0.15 color c
 *   arrow-up    → shape cone center x,y,z  x,y+h,z  radius r color c
 *   arrow-down  → shape cone center x,y,z  x,y-h,z  radius r color c
 *   cross       → 3 shape cylinder commands along X, Y, Z axes through CA
 *
 * All markers are placed in model #MARKER_MODEL_ID (default 98).
 * All shapes are placed in the same model via the `modelId` parameter.
 */
export function molstar__read_structure_create_chimerax_file__GenerateSymbolCommands(
    specs: Molstar__read_structure_create_chimerax_file__ResidueSymbolSpec[],
    caMap: Molstar__read_structure_create_chimerax_file__CACoordinateMap,
    warnings: string[],
): string[] {
    const lines: string[] = [];

    for (const spec of specs) {
        const key = molstar__read_structure_create_chimerax_file__ResidueKey(spec.chainId__label_asym_id, spec.residueSeqId__label_seq_id);
        const pos = caMap.get(key);

        if (!pos) {
            warnings.push(
                `Symbol "${spec.symbol}": CA not found for chain "${spec.chainId__label_asym_id}" residue ${spec.residueSeqId__label_seq_id} — skipped`,
            );
            continue;
        }

        const color = molstar__read_structure_create_chimerax_file__NormalizeColor(spec.color_RGB_WithPreceedingHash ?? '#FFFFFF');
        const id    = MOLSTAR__READ_STRUCTURE_CREATE_CHIMERAX_FILE__CONSTANTS.MARKER_MODEL_ID;

        switch (spec.symbol) {
            case 'sphere': {
                const r = molstar__read_structure_create_chimerax_file__FmtNum(spec.radius_In_Angstroms__Default_ZeroPointFive ?? MOLSTAR__READ_STRUCTURE_CREATE_CHIMERAX_FILE__CONSTANTS.DEFAULT_SPHERE_RADIUS);
                let cmd = `marker #${id} position ${molstar__read_structure_create_chimerax_file__FmtVec(pos)} radius ${r} color ${color}`;
                if (spec.label) cmd += ` label "${spec.label}"`;
                lines.push(cmd);
                break;
            }

            case 'dot': {
                const r = molstar__read_structure_create_chimerax_file__FmtNum(spec.radius_In_Angstroms__Default_ZeroPointFive ?? MOLSTAR__READ_STRUCTURE_CREATE_CHIMERAX_FILE__CONSTANTS.DEFAULT_DOT_RADIUS);
                let cmd = `marker #${id} position ${molstar__read_structure_create_chimerax_file__FmtVec(pos)} radius ${r} color ${color}`;
                if (spec.label) cmd += ` label "${spec.label}"`;
                lines.push(cmd);
                break;
            }

            case 'arrow-up': {
                const r = molstar__read_structure_create_chimerax_file__FmtNum(spec.radius_In_Angstroms__Default_ZeroPointFive ?? MOLSTAR__READ_STRUCTURE_CREATE_CHIMERAX_FILE__CONSTANTS.DEFAULT_ARROW_RADIUS);
                const h = MOLSTAR__READ_STRUCTURE_CREATE_CHIMERAX_FILE__CONSTANTS.DEFAULT_ARROW_HEIGHT;
                const tip = molstar__read_structure_create_chimerax_file__Vec3_Offset(pos, 0, h, 0);
                // cone: base at pos, tip pointing up; ChimeraX cone tapers to point at second coord
                lines.push(
                    `shape cone center ${molstar__read_structure_create_chimerax_file__FmtVec(pos)} ${molstar__read_structure_create_chimerax_file__FmtVec(tip)} radius ${r} color ${color} modelId #${id}`,
                );
                break;
            }

            case 'arrow-down': {
                const r = molstar__read_structure_create_chimerax_file__FmtNum(spec.radius_In_Angstroms__Default_ZeroPointFive ?? MOLSTAR__READ_STRUCTURE_CREATE_CHIMERAX_FILE__CONSTANTS.DEFAULT_ARROW_RADIUS);
                const h = MOLSTAR__READ_STRUCTURE_CREATE_CHIMERAX_FILE__CONSTANTS.DEFAULT_ARROW_HEIGHT;
                const tip = molstar__read_structure_create_chimerax_file__Vec3_Offset(pos, 0, -h, 0);
                lines.push(
                    `shape cone center ${molstar__read_structure_create_chimerax_file__FmtVec(pos)} ${molstar__read_structure_create_chimerax_file__FmtVec(tip)} radius ${r} color ${color} modelId #${id}`,
                );
                break;
            }

            case 'cross': {
                const r  = molstar__read_structure_create_chimerax_file__FmtNum(MOLSTAR__READ_STRUCTURE_CREATE_CHIMERAX_FILE__CONSTANTS.DEFAULT_CROSS_RADIUS);
                const arm = MOLSTAR__READ_STRUCTURE_CREATE_CHIMERAX_FILE__CONSTANTS.DEFAULT_CROSS_ARM;
                // X arm
                lines.push(
                    `shape cylinder center ${molstar__read_structure_create_chimerax_file__FmtVec(molstar__read_structure_create_chimerax_file__Vec3_Offset(pos, -arm, 0, 0))} ${molstar__read_structure_create_chimerax_file__FmtVec(molstar__read_structure_create_chimerax_file__Vec3_Offset(pos, arm, 0, 0))} radius ${r} color ${color} modelId #${id}`,
                );
                // Y arm
                lines.push(
                    `shape cylinder center ${molstar__read_structure_create_chimerax_file__FmtVec(molstar__read_structure_create_chimerax_file__Vec3_Offset(pos, 0, -arm, 0))} ${molstar__read_structure_create_chimerax_file__FmtVec(molstar__read_structure_create_chimerax_file__Vec3_Offset(pos, 0, arm, 0))} radius ${r} color ${color} modelId #${id}`,
                );
                // Z arm
                lines.push(
                    `shape cylinder center ${molstar__read_structure_create_chimerax_file__FmtVec(molstar__read_structure_create_chimerax_file__Vec3_Offset(pos, 0, 0, -arm))} ${molstar__read_structure_create_chimerax_file__FmtVec(molstar__read_structure_create_chimerax_file__Vec3_Offset(pos, 0, 0, arm))} radius ${r} color ${color} modelId #${id}`,
                );
                break;
            }
        }
    }

    return lines;
}
