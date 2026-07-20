/**
 * proteinStructure_StructureDisplayError_MessageContent_Component.tsx
 *
 * Shared message content shown when a structure file cannot be displayed in the Mol* viewer
 * (ProteinStructure_MolstarLoad_Error). Rendered in BOTH the modal overlay and, in place of the normal
 * controls, in the user-inputs panel to the side of the viewer. Asks the user to report the problem and
 * includes the current page URL so it can be reviewed.
 */

import React from "react";

/**
 * No props: reads the current page URL at render time.
 */
export function ProteinStructure_StructureDisplayError_MessageContent_Component(): React.JSX.Element {

    return (
        <div>
            <p>This structure file could not be displayed.</p>
            <p>Please report this problem, including the page address below, so it can be reviewed:</p>
            <p style={ { wordBreak: "break-all", fontFamily: "monospace", marginTop: "0.5em" } }>{ window.location.href }</p>
        </div>
    );
}
