import { Vec3 } from 'molstar/lib/mol-math/linear-algebra';

/** Canonical map key for a residue. */
export function molstar__read_structure_create_chimerax_file__ResidueKey( chainId: string, seqId: number): string {
    return `${chainId}:${seqId}`;
}

/** Format a Vec3 as "x,y,z" for ChimeraX commands. */
export function molstar__read_structure_create_chimerax_file__FmtVec( v: Vec3): string {
    return `${v[0].toFixed(3)},${v[1].toFixed(3)},${v[2].toFixed(3)}`;
}

/** Format a number to 3 decimal places. */
export function molstar__read_structure_create_chimerax_file__FmtNum( n: number): string {
    return n.toFixed(3);
}

const NAMED_COLORS: Record<string, string> = {
    red: '#FF0000', green: '#00FF00', blue: '#0000FF',
    white: '#FFFFFF', black: '#000000', yellow: '#FFFF00',
    orange: '#FFA500', purple: '#800080', cyan: '#00FFFF',
    magenta: '#FF00FF', gray: '#808080', grey: '#808080',
    pink: '#FFC0CB', brown: '#A52A2A', lime: '#00FF00',
    navy: '#000080', teal: '#008080', silver: '#C0C0C0',
    gold: '#FFD700', violet: '#EE82EE',
};

/**
 * Normalize a color string to ChimeraX-compatible uppercase #RRGGBB format.
 * Falls back to passing the value through as-is if it can't be recognized
 * (ChimeraX will report an error itself in that case).
 */
export function molstar__read_structure_create_chimerax_file__NormalizeColor( color: string): string {
    // Already #RRGGBB
    if (/^#[0-9a-fA-F]{6}$/.test(color)) {
        return color.toUpperCase();
    }
    // #RGB shorthand → #RRGGBB
    if (/^#[0-9a-fA-F]{3}$/.test(color)) {
        const r = color[1];
        const g = color[2];
        const b = color[3];
        return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
    }
    // Named color
    const lower = color.toLowerCase().trim();
    if (NAMED_COLORS[lower]) return NAMED_COLORS[lower];
    // Pass through and let ChimeraX handle it
    return color;
}

/** Return a new Vec3 offset by (dx, dy, dz). */
export function molstar__read_structure_create_chimerax_file__Vec3_Offset( v: Vec3, dx: number, dy: number, dz: number): Vec3 {
    return Vec3.create(v[0] + dx, v[1] + dy, v[2] + dz);
}

/** Midpoint between two Vec3 positions. */
export function molstar__read_structure_create_chimerax_file__Midpoint_BetweenTwo_Vec3_Positions( a: Vec3, b: Vec3): Vec3 {
    return Vec3.create(
        (a[0] + b[0]) / 2,
        (a[1] + b[1]) / 2,
        (a[2] + b[2]) / 2,
    );
}

/**
 * Return a unit vector pointing from a to b.
 * If a === b (zero-length), returns (0, 0, 1) as a safe fallback.
 */
export function molstar__read_structure_create_chimerax_file__UnitDirection(a: Vec3, b: Vec3): Vec3 {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const dz = b[2] - a[2];
    const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (len < 1e-6) return Vec3.create(0, 0, 1);
    return Vec3.create(dx / len, dy / len, dz / len);
}

/** Scale a Vec3 by a scalar. */
export function molstar__read_structure_create_chimerax_file__Vec3Scale(v: Vec3, s: number): Vec3 {
    return Vec3.create(v[0] * s, v[1] * s, v[2] * s);
}

/** Add two Vec3 values. */
export function molstar__read_structure_create_chimerax_file__Vec3Add(a: Vec3, b: Vec3): Vec3 {
    return Vec3.create(a[0] + b[0], a[1] + b[1], a[2] + b[2]);
}

/**
 * Convert opacity (0–1) to a ChimeraX transparency percentage string.
 * Returns null if the shape is fully opaque (no transparency command needed).
 */
export function molstar__read_structure_create_chimerax_file__OpacityToTransparencyCmd(opacity: number, nameOrSpec: string): string | null {
    const pct = Math.round((1 - opacity) * 100);
    if (pct <= 0) return null;
    return `transparency ${pct} ${nameOrSpec}`;
}
