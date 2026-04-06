/**
 * Constants
 */
export const MOLSTAR__READ_STRUCTURE_CREATE_CHIMERAX_FILE__CONSTANTS = {

     MARKER_MODEL_ID : 98,   // ChimeraX model # for markers/symbols
     DISK_MODEL_ID : 99,   // ChimeraX model # for cylinders/disks

     DEFAULT_SPHERE_RADIUS : 0.5,   // Angstroms
     DEFAULT_DOT_RADIUS : 0.15,  // Angstroms
     DEFAULT_ARROW_RADIUS : 0.6,   // Angstroms (cone base radius)
     DEFAULT_ARROW_HEIGHT : 2.0,   // Angstroms
     DEFAULT_CROSS_ARM : 1.0,   // Angstroms (half-length of each arm)
     DEFAULT_CROSS_RADIUS : 0.15,  // Angstroms (cylinder radius for cross arms)

     DEFAULT_DISK_RADIUS : 1.0,   // Angstroms (cylinder radius)
     DEFAULT_DISK_HEIGHT : 0.1, // 0.4,   // Angstroms (thin disk thickness)
     DEFAULT_DISK_OPACITY : 0.8,   // 0–1
     DEFAULT_DISK_COLOR : '#888888',
} as const