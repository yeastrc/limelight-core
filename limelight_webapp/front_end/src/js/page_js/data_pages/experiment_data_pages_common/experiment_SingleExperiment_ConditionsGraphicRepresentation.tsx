/**
 * experiment_SingleExperiment_ConditionsGraphicRepresentation.tsx
 * 
 * Display a Graphical Representation of the Conditions for the Experiment
 * 
 * 
 */


 //  Glossary:

 //   Condition Cell:  a cell that contains a condition label.  
 //                     These will be on the top and on the left and the combination shows the user what each main cell is composed of for conditions

 //   Main Cell:  The main block of cells bounded on the top and left by condition cells.
 //                     These cells contain the main data the user is interested in.
 //                         One item these cells contain is the searches (projectSearchIds) that is associated with the set of conditions for that cell.

//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// When user adds or removes condition groups or conditions in the experiment builder, the data in for the main cells ('conditionGroupsDataContainer') is removed.  

//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



import React from 'react'

import { tooltip_Limelight_Create_Tooltip, Tooltip_Limelight_Created_Tooltip } from 'page_js/data_pages/common_all_pages/tooltip_LimelightLocal_ReactBased';

import { Experiment_ConditionGroupsContainer, Experiment_ConditionGroup, Experiment_Condition } from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';
import { ConditionGroupsDataContainer, ConditionGroupsDataContainer_DataEntry } from 'page_js/data_pages/experiment_data_pages_common/conditionGroupsDataContainer_Class'

// const tableStyle_Default = { borderCollapse : "collapse", borderSpacing: "0px", padding: "0px", width: "100%" }; // borderCollapse : "collapse", 

// const tableStyleRootTable_Default = { borderCollapse : "collapse", borderSpacing: "0px", padding: "0px" }; // borderCollapse : "collapse", 

// const standardBorderWidth = "2px";
// const noBorderWidth = "0px";

// const conditionLabelMaxWidth = "200px";


//  Class in this file TableCell is a single <td> in the table but not in the first row. 

//  Other classes at bottom for managing the tooltips

export type ExperimentConditions_GraphicRepresentation_MainCellClickHandler = ({ 
    
    event, mainCellIdentifier, entryCell_onMouseLeaveHandler 
} : {
    event: React.MouseEvent<HTMLElement, MouseEvent>
    mainCellIdentifier : ExperimentConditions_GraphicRepresentation_MainCell_Identifier
    entryCell_onMouseLeaveHandler 
}) => void


/**
 * 
 */
export class ExperimentConditions_GraphicRepresentation_PropsData_DisplayTableCell {

    conditionLabelCell? : boolean
    mainDataCell? : boolean
    label : string 
    styleOverrides : React.CSSProperties
    tableRowIndex? : number
    rowSpan? : number
    conditionId? : number 
    conditionIdPath? : Array<number>
    condition? : Experiment_Condition
    conditionGroup? : Experiment_ConditionGroup 
}

/**
 * 
 */
export class ExperimentConditions_GraphicRepresentation_PropsData {

    displayTableCells : Array<Array<ExperimentConditions_GraphicRepresentation_PropsData_DisplayTableCell>>
}


/**
 * An "Identifier" for a "Main Cell".  The set of Condition Ids that uniquely identify this "Main Cell"
 * 
 * A "Main Cell" contains things like Searches assigned to that cell
 */
export class ExperimentConditions_GraphicRepresentation_MainCell_Identifier {

    cell_ConditionIds_Set : Set<number>;

    constructor( { cell_ConditionIds_Set } : { cell_ConditionIds_Set : Set<number> } ) {

        this.cell_ConditionIds_Set = cell_ConditionIds_Set;
    }

    /**
     * @returns true if selectedCell_ConditionIds_Set same contents as otherObject.selectedCell_ConditionIds_Set
     */
    equals( otherObject : ExperimentConditions_GraphicRepresentation_MainCell_Identifier ) : boolean {
        if ( ! ( otherObject instanceof ExperimentConditions_GraphicRepresentation_MainCell_Identifier ) ) {
            const msg = "ERORR: ExperimentConditions_GraphicRepresentation_PropsData_SelectedCellEntry::equals. if ( ! ( otherObject instanceof ExperimentConditions_GraphicRepresentation_PropsData_SelectedCellEntry ) )";
            console.warn( msg );
            throw Error( msg );
        }
        if ( this.cell_ConditionIds_Set.size !== otherObject.cell_ConditionIds_Set.size ) {
            return false; // EARLY RETURN
        }
        for ( const entry of this.cell_ConditionIds_Set ) {
            if ( ! otherObject.cell_ConditionIds_Set.has( entry ) ){
                return false; // EARLY RETURN
            }
        }
        return true;
    }

    /**
     * @returns cell_ConditionIds_Set copied to Array
     */
    get_cell_ConditionIds_AsArray(): Array<number> {
        const result = Array.from( this.cell_ConditionIds_Set );
        return result;
    }
}

/**
 * 
 */
export class ExperimentConditions_GraphicRepresentation_SelectedCells {

    private selected_MainCell_Entries : Array<ExperimentConditions_GraphicRepresentation_MainCell_Identifier> = [];

    /**
     * 
     */
    shallowClone() : ExperimentConditions_GraphicRepresentation_SelectedCells {

        const clone = new ExperimentConditions_GraphicRepresentation_SelectedCells();
        clone.selected_MainCell_Entries = this.selected_MainCell_Entries;
        return clone;
    }

    /**
     * 
     */
    contains_MainCell_Entry( entryDoesContain : ExperimentConditions_GraphicRepresentation_MainCell_Identifier ) : boolean {

        if ( ! entryDoesContain ) {
            throw Error("ExperimentConditions_GraphicRepresentation_SelectedCells::contains_MainCell_Entry:  No parameter provided");
        }
        const entryToAdd_FoundIn_ExistingEntries = this.selected_MainCell_Entries.find( ( entry_selectedCellEntries ) => {  

            if ( entry_selectedCellEntries.equals( entryDoesContain ) ) {
                return entry_selectedCellEntries; // Is a Match
            }
            return undefined;  // Not a Match
        }, this );

        if ( entryToAdd_FoundIn_ExistingEntries ) {
            // Entry already in existing entries so exit
            return true //  EARLY EXIT
        }
        return false;
    }

    /**
     * 
     */
    add_MainCell_Entry( entryToAdd : ExperimentConditions_GraphicRepresentation_MainCell_Identifier ) : void {

        if ( ! entryToAdd ) {
            throw Error("ExperimentConditions_GraphicRepresentation_SelectedCells::add_MainCell_Entry:  No parameter provided");
        }
        const entryToAdd_FoundIn_ExistingEntries = this.selected_MainCell_Entries.find( ( entry_selectedCellEntries ) => {  

            if ( entry_selectedCellEntries.equals( entryToAdd ) ) {
                return entry_selectedCellEntries; // Is a Match
            }
            return undefined;  // Not a Match
        }, this );

        if ( entryToAdd_FoundIn_ExistingEntries ) {
            // Entry already in existing entries so exit
            return //  EARLY EXIT
        }
        
        this.selected_MainCell_Entries.push( entryToAdd );
    }

    /**
     * 
     */
    remove_MainCell_Entry( entryToRemove : ExperimentConditions_GraphicRepresentation_MainCell_Identifier ) : void {

        throw Error("remove_MainCell_Entry untested")

        this.selected_MainCell_Entries = this.selected_MainCell_Entries.filter( ( entry_selectedCellEntries, indexOptional ) => { 
            
            const returnValue = ! entry_selectedCellEntries.equals( entryToRemove ) ;
            return returnValue;  // return true to add to resulting Array
        }, this );
    }

    /**
     * 
     */
    clearEntries() : void {
        
        this.selected_MainCell_Entries = [];
    }

}

/**
 * 
 */
export interface Experiment_SingleExperiment_ConditionsGraphicRepresentation_Props {

    data : ExperimentConditions_GraphicRepresentation_PropsData;
    selectedCells? : ExperimentConditions_GraphicRepresentation_SelectedCells
    conditionCellClickHandler?
    mainCellClickHandler? : ExperimentConditions_GraphicRepresentation_MainCellClickHandler
    mainCell_getHoverContents?
}

interface Experiment_SingleExperiment_ConditionsGraphicRepresentation_State {

    placeholder
}

/**
 * 
 */
export class Experiment_SingleExperiment_ConditionsGraphicRepresentation extends React.Component< Experiment_SingleExperiment_ConditionsGraphicRepresentation_Props, Experiment_SingleExperiment_ConditionsGraphicRepresentation_State > {

    private _mainCellTooltipDisplayManager : MainCellTooltipDisplayManager;

    /**
     * 
     */
    constructor(props : Experiment_SingleExperiment_ConditionsGraphicRepresentation_Props) {
        super(props);

        this._mainCellTooltipDisplayManager = new MainCellTooltipDisplayManager();

        // this.state = { };
        // console.log("class Experiment_SingleExperiment_ConditionsGraphicRepresentation: constructor()");
    }

    // componentDidMount() {
    //     // console.log("class Experiment_SingleExperiment_ConditionsGraphicRepresentation: componentDidMount()");
    // }

    // componentWillUnmount() {
    //     // console.log("class Experiment_SingleExperiment_ConditionsGraphicRepresentation: componentWillUnmount()");
    // }

    /**
     * 
     */
    render () {

        const data = this.props.data;

        const displayTableCells = data.displayTableCells;

        if ( ( ! displayTableCells ) || displayTableCells.length === 0 ) {
            return null;
        }

        const rowsDisplay = [];

        {
            let counter_Row = 0;
            for ( const row of displayTableCells ) {

                const cellsDisplay = [];
                {
                    let counter_Cell = 0;
                    for ( const cell of row ) {
    
                        const cellDisplay = (
                            <TableCell key={ counter_Cell }
                                cell={ cell }
                                experiment_SingleExperiment_ConditionsGraphicRepresentation_Props={ this.props }
                                mainCellTooltipDisplayManager={ this._mainCellTooltipDisplayManager }
                            />
                        );
                        cellsDisplay.push( cellDisplay );
                        counter_Cell++;
                    }
                }

                const rowDisplay = (
                    <tr key={ counter_Row }>
                        { cellsDisplay }
                    </tr>
                );
                rowsDisplay.push( rowDisplay );
                counter_Row++;
            }
       
        }

        return (
            <div className=" experiment-display-container ">
                <table className=" root-table ">
                    <tbody>
                        { rowsDisplay }
                    </tbody>
                </table>
            </div>
        );
    }
}

//////////////////

interface TableCell_Props {

    cell : ExperimentConditions_GraphicRepresentation_PropsData_DisplayTableCell
    experiment_SingleExperiment_ConditionsGraphicRepresentation_Props : Experiment_SingleExperiment_ConditionsGraphicRepresentation_Props
    mainCellTooltipDisplayManager
}

interface TableCell_State {

    _placeholder
}

/**
 * a single <td> in the table but not in the first row. 
 */
class TableCell extends React.Component< TableCell_Props, TableCell_State > {

    private _cellClickHandler_BindThis = this._cellClickHandler.bind(this);
    private _cell_onMouseEnterHandler_BindThis = this._cell_onMouseEnterHandler.bind(this);
    private _cell_onMouseLeaveHandler_BindThis = this._cell_onMouseLeaveHandler.bind(this);

    private paddingTop_Set
    private td_Ref
    
    
    /**
     * a single <td> in the table but not in the first row. 
     */
    constructor( props : TableCell_Props ) {
        super(props);

        this.paddingTop_Set = undefined;
        this.td_Ref = React.createRef();

        // this.state = { };
        // console.log("class TableCell: constructor()");
    }

    /**
     * Must be Static
     * Called before 
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     * 
     * Return new state (like return from setState(callback)) or null
     */
    // static getDerivedStateFromProps( props, state ) {

    //     // console.log("called: static getDerivedStateFromProps(): " );

    //     //  Return new state (like return from setState(callback)) or null

    //     // return { setIn_getDerivedStateFromProps : true };
    //     return null;
    // }


    componentDidMount() {
        // console.log("class TableCell: componentDidMount()");
        if ( this.props.cell.rowSpan > 1 && this.props.cell.tableRowIndex === 1 ) {
            this.paddingTop_Set = true;
            const node = this.td_Ref.current;
            window.setTimeout( () => {
                //  When add this inside a setTimeout, then Google Chrome properly aligns the top border of the cells in the second row.
                //    (First row is labels of first Condition Group)
                //  It's weird but it works.
                node.style.paddingTop = "1px"; // A hack to change the DOM this way.
            }, 100 );
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     var z = 0;
    // }

    // getSnapshotBeforeUpdate() is invoked right before the most recently rendered output is committed to e.g. the DOM. 
    // It enables your component to capture some information from the DOM (e.g. scroll position) before it is potentially changed. 
    // Any value returned by this lifecycle will be passed as a parameter to componentDidUpdate().

    // If your component implements the getSnapshotBeforeUpdate(prevProps, prevState) lifecycle (which is rare), 
    // the value it returns will be passed as a third “snapshot” parameter to componentDidUpdate(). 
    // Otherwise this parameter will be undefined.

    componentDidUpdate(prevProps, prevState, snapshot) {

        // console.log("class TableCell: componentDidUpdate()");
        if ( ! this.paddingTop_Set ) {
            if ( this.props.cell.rowSpan > 1 && this.props.cell.tableRowIndex === 1 ) {
                this.paddingTop_Set = true;
                const node = this.td_Ref.current;
                window.setTimeout( () => {
                    //  When add this inside a setTimeout, then Google Chrome properly aligns the top border of the cells in the second row.
                    //    (First row is labels of first Condition Group)
                    //  It's weird but it works.
                    node.style.paddingTop = "1px"; // A hack to change the DOM this way.
                }, 100 );
            }
        } else {
            if ( this.props.cell.rowSpan > 1 && this.props.cell.tableRowIndex === 1 ) {
                var empty = true;
            } else {
                if ( this.paddingTop_Set ) {
                    this.paddingTop_Set = false;
                    const node = this.td_Ref.current;
                    //  Clear paddingTop since should no longer be set
                    window.setTimeout( () => {
                        //  When add this inside a setTimeout, then Google Chrome properly aligns the top border of the cells in the second row.
                        //    (First row is labels of first Condition Group)
                        //  It's weird but it works.
                        node.style.paddingTop = "0px"; // A hack to change the DOM this way.
                    }, 100 );
                }
            }
        }
    }


    // componentWillUnmount() {
    //     // console.log("class TableCell: componentWillUnmount()");
    // }

    _cellClickHandler( event : React.MouseEvent<HTMLElement, MouseEvent> ) {
        
        event.preventDefault();
        event.stopPropagation(); //  

        if ( this.props.cell.conditionLabelCell ) {

            if ( this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.conditionCellClickHandler ) {
                const conditionGroup = this.props.cell.conditionGroup;
                const conditionGroup_Id = conditionGroup.id;
                const condition = this.props.cell.condition;
                const condition_Id = condition.id;
                this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.conditionCellClickHandler({ event, conditionGroup_Id,  condition_Id });
            }
        }

        if ( this.props.cell.mainDataCell ) {

            if ( this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.mainCellClickHandler ) {

                // console.warn( "Ignoring value for this.props.mainCellClickHandler")

                let entryCell_onMouseLeaveHandler = undefined;
                
                if ( this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.mainCell_getHoverContents ) {
                    entryCell_onMouseLeaveHandler = this._cell_onMouseLeaveHandler_BindThis;
                }

                const conditionIdPath = this.props.cell.conditionIdPath;
                if ( ! conditionIdPath ) {
                    const msg = "No value for cell.conditionIdPath:  In if ( this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.mainCellClickHandler ) {"
                    console.warn( msg );
                    throw Error( msg );
                }
                const conditionIdPath_Set = new Set( conditionIdPath );
                
                const experimentConditions_GraphicRepresentation_MainCell_Identifier = (
                    new ExperimentConditions_GraphicRepresentation_MainCell_Identifier({ cell_ConditionIds_Set : conditionIdPath_Set })
                );
                this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.mainCellClickHandler({ 
                    event, 
                    mainCellIdentifier : experimentConditions_GraphicRepresentation_MainCell_Identifier, 
                    entryCell_onMouseLeaveHandler 
                });
            }
        }
    }

    _cell_onMouseEnterHandler( event : React.MouseEvent<HTMLElement, MouseEvent> ) { 

        const conditionIdPath = this.props.cell.conditionIdPath;

        const hoverContents = this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.mainCell_getHoverContents({ conditionIdPath });

        const tooltipContents = hoverContents.hoverContent;
        
        this.props.mainCellTooltipDisplayManager.mainCellMouseEnter({ event, tooltipContents });
    }

    _cell_onMouseLeaveHandler( event : React.MouseEvent<HTMLElement, MouseEvent> ) { 
        // console.log("TableCell: onMouseLeave: entryCell_onMouseLeaveHandler");

        this.props.mainCellTooltipDisplayManager.mainCellMouseLeave({ event });
    }

    /**
     * 
     */
    render () {

        let entryCell_ClickHandler = undefined;
        let entryCell_onMouseEnterHandler = undefined;
        let entryCell_onMouseLeaveHandler = undefined;

        if ( this.props.cell.conditionLabelCell ) {

            if ( this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.conditionCellClickHandler ) {

                entryCell_ClickHandler = this._cellClickHandler_BindThis;
            }
        }

        if ( this.props.cell.mainDataCell ) {

            if ( this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.mainCell_getHoverContents ) {

                entryCell_onMouseEnterHandler = this._cell_onMouseEnterHandler_BindThis;
                entryCell_onMouseLeaveHandler = this._cell_onMouseLeaveHandler_BindThis
            }

            if ( this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.mainCellClickHandler ) {

                entryCell_ClickHandler = this._cellClickHandler_BindThis;
            }
        }
        
        let classNames_Clickable = "";
        if ( entryCell_ClickHandler ) {
            classNames_Clickable = " clickable "
        }
        let classNames_MainDataCell = "";
        let classNames_MainDataCell_Selected = "";
        if ( this.props.cell.mainDataCell ) {
            classNames_MainDataCell = " main-condition-cell ";

            //  Determine if current cell is a selected cell.  If selected cell, variable 'found' is true and CSS class name is added

            if ( this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.selectedCells ) {

                const conditionIdPath_AsSet = new Set( this.props.cell.conditionIdPath );
                const selected_MainCell_Entry_ForLookup = new ExperimentConditions_GraphicRepresentation_MainCell_Identifier({ cell_ConditionIds_Set : conditionIdPath_AsSet });

                const found = this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.selectedCells.contains_MainCell_Entry( selected_MainCell_Entry_ForLookup );
                if ( found ) {
                    classNames_MainDataCell_Selected = " selected ";
                }
            } 
        } 
        const className = " cell " + classNames_Clickable + classNames_MainDataCell + classNames_MainDataCell_Selected;
        
        let style = getDefaultCellStyle();

        if ( this.props.cell.mainDataCell ) {
            style.textAlign = "center";
        }
        if ( this.props.cell.styleOverrides ) {
            style = Object.assign( style, this.props.cell.styleOverrides ); // overlay with properties from cell.styleOverrides
        }
            
        return (
            <td ref={ this.td_Ref }
                onClick={ entryCell_ClickHandler }
                onMouseEnter={ entryCell_onMouseEnterHandler }
                onMouseLeave={ entryCell_onMouseLeaveHandler }
                className={ className }
                style={ style }
                rowSpan={ this.props.cell.rowSpan } >
                <div className=" cell-contents-container ">
                    { this.props.cell.label }
                </div>
            </td>
        );
    }
}


/**
 * Object with default cell style
 */
const getDefaultCellStyle = function() {
    
    return {
        borderTopWidth : 0, 
        borderBottomWidth : 0, 
        borderLeftWidth : 0, 
        borderRightWidth : 0,
        textAlign : undefined
    };
}


/**
 * Class to manage tooltip for Main Cell
 */
class MainCellTooltipDisplayManager {

    private _tooltip_CurrentTooltip : Tooltip_Limelight_Created_Tooltip

	/**
	 * Called when onMouseEnter of main cell
	 */
	mainCellMouseEnter({ event, tooltipContents }) {

        const mouseEnter_target_DOM_Element = event.target;
        
        if ( this._tooltip_CurrentTooltip ) {

            //  Already have tooltip so remove it

            this._tooltip_CurrentTooltip.removeTooltip();

            this._tooltip_CurrentTooltip = undefined;
        }

        const tooltip_Limelight_Created_Tooltip : Tooltip_Limelight_Created_Tooltip = tooltip_Limelight_Create_Tooltip({ tooltip_target_DOM_Element : mouseEnter_target_DOM_Element, tooltipContents });

        this._tooltip_CurrentTooltip = tooltip_Limelight_Created_Tooltip;
	}

	/**
	 * Called when onMouseLeave of main cell
	 */
	mainCellMouseLeave({ event }) {

        // console.log("mainCellMouseLeave(...)");

        if ( ! this._tooltip_CurrentTooltip ) {

            //  No <div> to hold tooltip exists so exit

            return; // EARLY EXIT
        }

        //  Hack hack to leave tooltip shown after number of mouse leave events
        // if ( this._leaveCount >= 2 ) {
        //     return;
        // }

        // if ( ! this._leaveCount ) {
        //     this._leaveCount = 0;
        // }
        // this._leaveCount++;

        this._tooltip_CurrentTooltip.removeTooltip();

        this._tooltip_CurrentTooltip = undefined;
	}

}
