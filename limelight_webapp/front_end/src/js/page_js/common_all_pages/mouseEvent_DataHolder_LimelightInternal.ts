/**
 * mouseEvent_DataHolder_LimelightInternal.ts
 * 
 * class that holds the data from a MouseEvent
 * 
 * Data copied from a React.MouseEvent object since data in that object is not valid across setTimeout and other async operations
 * 
 */


/**
 * 
 */
export const build_MouseEvent_DataHolder_LimelightInternal = function( event: React.MouseEvent<HTMLElement, MouseEvent> ) {



}


/**
 * 
 */
export class MouseEvent_DataHolder_LimelightInternal {

    target : HTMLElement
    
    shiftKey : boolean
    ctrlKey : boolean
    metaKey : boolean
    ctrlKey_metaKey : boolean
}