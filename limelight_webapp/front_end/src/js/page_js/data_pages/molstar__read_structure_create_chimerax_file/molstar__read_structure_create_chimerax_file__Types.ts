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

export type Molstar__read_structure_create_chimerax_file__CACoordinateMap = Map<string, Vec3>;
// key: `${chainId}:${seqId}`

export interface Molstar__read_structure_create_chimerax_file__ConversionResult {
  script: string;
  warnings: string[];
}
