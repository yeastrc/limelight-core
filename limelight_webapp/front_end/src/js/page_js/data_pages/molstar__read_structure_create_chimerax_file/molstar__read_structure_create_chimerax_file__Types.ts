import { Vec3 } from 'molstar/lib/mol-math/linear-algebra';

// --- Input specs ---

export interface Molstar__read_structure_create_chimerax_file__ResidueColorSpec {
  chainId__label_asym_id: string;       // label_asym_id
  residueSeqId__label_seq_id: number;  // label_seq_id
  color_RGB_WithPreceedingHash_OR_CSS_NamedColor: string;         // "#RRGGBB" or CSS named color
}

export interface Molstar__read_structure_create_chimerax_file__ResidueSymbolSpec {
  chainId__label_asym_id: string;
  residueSeqId__label_seq_id: number;
  symbol: Molstar__read_structure_create_chimerax_file__SymbolType;
  color_RGB_WithPreceedingHash?: string;
  radius_In_Angstroms__Default_ZeroPointFive?: number;       // Angstroms, default 0.5
  label?: string;        // optional ChimeraX marker label
}

export type Molstar__read_structure_create_chimerax_file__SymbolType = 'sphere' | 'arrow-up' | 'arrow-down' | 'cross' | 'dot';

export interface Molstar__read_structure_create_chimerax_file__DiskSpec {
  chainId__label_asym_id: string;
  residueSeqId1: number;
  residueSeqId2: number;
  color_RGB_WithPreceedingHash_HasDefault?: string;        // default '#888888'
  opacity?: number;      // 0.0–1.0, default 0.8
  radius_In_Angstroms__Default_OnePointZero?: number;       // cylinder radius in Angstroms, default 1.0
}

// --- Internal ---

/**
 * One entry in the residue map — one per residue in the structure.
 *
 * The Map is KEYED by LABEL numbering (`label_asym_id:label_seq_id`) — a clean,
 * gap-free integer sequence with no insertion codes, which makes a stable
 * internal key and matches the label-based specs coming in from Limelight.
 *
 * The AUTH identity (`auth_asym_id` / `auth_seq_id` / insertion code) is carried
 * on every entry because ChimeraX resolves residue specifiers like `/A:42` in
 * AUTH space, NOT label space. Anything that emits a ChimeraX residue spec (e.g.
 * the `color` command) MUST use these auth fields, not the label key — otherwise
 * the command lands on the wrong residue whenever auth != label.
 *
 * `pos` (the CA coordinate) is present only when the residue has a CA atom.
 * Coordinate-based output (symbols, disks) uses `pos` and skips residues where
 * it is undefined; color output ignores `pos` entirely.
 */
export interface Molstar__read_structure_create_chimerax_file__ResidueEntry {
  pos?: Vec3;          // CA coordinate — present only when the residue has a CA atom
  authAsymId: string;  // auth_asym_id — the ChimeraX chain id
  authSeqId: number;   // auth_seq_id — the ChimeraX residue number
  insCode: string;     // pdbx_PDB_ins_code, '' when none
}

export type Molstar__read_structure_create_chimerax_file__CACoordinateMap = Map<string, Molstar__read_structure_create_chimerax_file__ResidueEntry>;
// key: `${label_asym_id}:${label_seq_id}`  (see ResidueEntry above)

// --- Auth-numbering collisions (ambiguous coloring) ---

/**
 * A single ChimeraX color spec `/authAsymId:authSeqId[insCode]` that is claimed by MORE THAN ONE
 * residue. Happens only in an out-of-spec structure whose author numbering duplicates a residue
 * within one auth chain (e.g. two label chains share an auth_asym_id AND overlap in auth_seq_id).
 * ChimeraX merges such chains and cannot tell the residues apart, so `color /A:100` colors them all
 * the same — the one case where this file diverges from the label-based Mol* viewer.
 */
export interface Molstar__read_structure_create_chimerax_file__AuthCollision {
  authAsymId: string;   // the shared ChimeraX (auth) chain id
  authSeqId: number;    // the shared ChimeraX (auth) residue number
  insCode: string;      // shared insertion code, '' when none
  residues: Array<{ labelAsymId: string; labelSeqId: number }>;  // the >= 2 distinct residues that collide, in label identity
}

export interface Molstar__read_structure_create_chimerax_file__ConversionResult {
  script: string;
  warnings: string[];
  collisions: Molstar__read_structure_create_chimerax_file__AuthCollision[];
}
