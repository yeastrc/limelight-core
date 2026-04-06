import { Molstar__read_structure_create_chimerax_file__DiskSpec, Molstar__read_structure_create_chimerax_file__CACoordinateMap } from './molstar__read_structure_create_chimerax_file__Types';
import {
    molstar__read_structure_create_chimerax_file__ResidueKey,
    molstar__read_structure_create_chimerax_file__NormalizeColor,
    molstar__read_structure_create_chimerax_file__FmtVec,
    molstar__read_structure_create_chimerax_file__FmtNum,
    molstar__read_structure_create_chimerax_file__OpacityToTransparencyCmd,
    molstar__read_structure_create_chimerax_file__Midpoint_BetweenTwo_Vec3_Positions, molstar__read_structure_create_chimerax_file__UnitDirection, molstar__read_structure_create_chimerax_file__Vec3Scale, molstar__read_structure_create_chimerax_file__Vec3Add
} from './molstar__read_structure_create_chimerax_file__Chimerax-utils';
import {
    MOLSTAR__READ_STRUCTURE_CREATE_CHIMERAX_FILE__CONSTANTS
} from './molstar__read_structure_create_chimerax_file__Constants';

/**
 * Generate ChimeraX `shape cylinder` commands for disks between residue pairs.
 *
 * Each disk is a thin cylinder centered at the midpoint between the two CA
 * atoms and oriented along the axis connecting them. It does NOT extend from
 * CA to CA — it is only DEFAULT_DISK_HEIGHT (0.4 Å) thick, sitting at the
 * midpoint like a washer between the two residues.
 *
 *   M  = midpoint(pos1, pos2)
 *   axis = normalize(pos2 - pos1)
 *   fromPoint = M - (height/2) * axis
 *   toPoint   = M + (height/2) * axis
 */
export function molstar__read_structure_create_chimerax_file__GenerateDiskCommands(
    specs: Molstar__read_structure_create_chimerax_file__DiskSpec[],
    caMap: Molstar__read_structure_create_chimerax_file__CACoordinateMap,
    warnings: string[],
): string[] {
    const lines: string[] = [];

    for (const spec of specs) {
        // Validate distinct residues
        if (spec.residueSeqId1 === spec.residueSeqId2) {
            warnings.push(
                `Disk: residueSeqId1 === residueSeqId2 (${spec.residueSeqId1}) for chain "${spec.chainId__label_asym_id}" — skipped`,
            );
            continue;
        }

        const key1 = molstar__read_structure_create_chimerax_file__ResidueKey(spec.chainId__label_asym_id, spec.residueSeqId1);
        const key2 = molstar__read_structure_create_chimerax_file__ResidueKey(spec.chainId__label_asym_id, spec.residueSeqId2);
        const pos1 = caMap.get(key1);
        const pos2 = caMap.get(key2);

        if (!pos1) {
            warnings.push(
                `Disk: CA not found for chain "${spec.chainId__label_asym_id}" residue ${spec.residueSeqId1} — skipped`,
            );
            continue;
        }
        if (!pos2) {
            warnings.push(
                `Disk: CA not found for chain "${spec.chainId__label_asym_id}" residue ${spec.residueSeqId2} — skipped`,
            );
            continue;
        }

        const color   = molstar__read_structure_create_chimerax_file__NormalizeColor(spec.color_RGB_WithPreceedingHash_HasDefault ?? MOLSTAR__READ_STRUCTURE_CREATE_CHIMERAX_FILE__CONSTANTS.DEFAULT_DISK_COLOR);
        const radius  = molstar__read_structure_create_chimerax_file__FmtNum(spec.radius_In_Angstroms__Default_OnePointZero ?? MOLSTAR__READ_STRUCTURE_CREATE_CHIMERAX_FILE__CONSTANTS.DEFAULT_DISK_RADIUS);
        const opacity = spec.opacity ?? MOLSTAR__READ_STRUCTURE_CREATE_CHIMERAX_FILE__CONSTANTS.DEFAULT_DISK_OPACITY;
        const height   = MOLSTAR__READ_STRUCTURE_CREATE_CHIMERAX_FILE__CONSTANTS.DEFAULT_DISK_HEIGHT;
        const name    = `disk_${spec.chainId__label_asym_id}_${spec.residueSeqId1}_${spec.residueSeqId2}`;

        // Place a thin disk at the midpoint, oriented along the inter-residue axis
        const mid  = molstar__read_structure_create_chimerax_file__Midpoint_BetweenTwo_Vec3_Positions(pos1, pos2);
        const axis = molstar__read_structure_create_chimerax_file__UnitDirection(pos1, pos2);
        const half = molstar__read_structure_create_chimerax_file__Vec3Scale(axis, height / 2);
        const from = molstar__read_structure_create_chimerax_file__Vec3Add(mid, molstar__read_structure_create_chimerax_file__Vec3Scale(half, -1));
        const to   = molstar__read_structure_create_chimerax_file__Vec3Add(mid, half);

        lines.push(
            `shape cylinder fromPoint ${molstar__read_structure_create_chimerax_file__FmtVec(from)} toPoint ${molstar__read_structure_create_chimerax_file__FmtVec(to)} radius ${radius} color ${color} name ${name}`,
        );

        const transCmd = molstar__read_structure_create_chimerax_file__OpacityToTransparencyCmd(opacity, `#!${name}`);
        if (transCmd)
            lines.push(transCmd);

        const transPct = Math.round((1 - opacity) * 100);
        if (transPct > 0) {
            lines.push(`transparency ${transPct} models #${MOLSTAR__READ_STRUCTURE_CREATE_CHIMERAX_FILE__CONSTANTS.DISK_MODEL_ID}`);
        }
    }

    return lines;
}
