/**
 * lorikeetSpectrumViewer_PsmList_ClickHandlerParam_Class.ts
 *
 *  The Object passed to the PSM table Row Click Handler
 */

/**
 *
 *  The Object passed to the PSM table Row Click Handler
 */
export class LorikeetSpectrumViewer_PsmList_ClickHandlerParam_Class {

    psmId : number

    constructor({ psmId } : { psmId : number }) {
        this.psmId = psmId;
    }
}