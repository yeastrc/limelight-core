/**
 * tag_Filter_Expression_Builder_Grouped_Component.tsx
 *
 * Build a grouped tag filter expression:
 *
 *      ( a AND b )  OR  ( c OR d )  OR  ( e )
 *
 *   - Each group combines ITS OWN literals with its own operator ( groupOperator: AND or OR ) --
 *     the groups are independent of one another.
 *   - A single, independent betweenGroups_Operator ( AND or OR ) combines the groups.
 *   - Each tag literal may be negated ( "NOT tag" -- matches when the tag is absent ).
 *
 * This component holds its OWN internal state ( the expression being built ) and notifies the parent
 * of changes via expression_Changed_Callback ( the parent persists the expression and drives the actual
 * search filtering from it ).
 */

import React from 'react'
import Switch from '@mui/material/Switch'

import { limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants } from "page_js/common_all_pages/limelight__Limelight_Colors_Etc__SyncWith_global.scss__Constants";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_NOT_FollowMousePointer_DefaultPosition,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";
import {
    Search_Tags_SelectSearchTags_Component_SearchTagData_Root,
    Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry
} from "page_js/data_pages/search_tags__display_management/search_tags_SelectSearchTags_Component/search_Tags_SelectSearchTags_Component";
import {tagFilter_Expression_TagPicker_Overlay__openOverlay} from "page_js/data_pages/search_tags__display_management/tag_filter_expression_builder_grouped_component/tag_Filter_Expression_TagPicker_Overlay";


/////


//  Short alias for the shared Limelight brand-color constants ( used for every brand color in this file )
const _limelightColors = limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants;


//  A single tag literal inside a group
interface Internal__Grouped_Literal {
    _uiId: number
    tagId: number
    negated: boolean
}

//  A single group.  Its literals are combined with THIS group's own groupOperator.
interface Internal__Grouped_Group {
    _uiId: number
    literals: Array<Internal__Grouped_Literal>
    groupOperator: 'AND' | 'OR'
}


//  Seed shape ( e.g. translated from the existing simple OR/AND/NOT tag selections ).
//  Plain data ( no internal _uiId ) supplied by the caller.
export interface Tag_Filter_Expression_Builder_Grouped_Component__Seed_Literal {
    tagId: number
    negated: boolean
}
export interface Tag_Filter_Expression_Builder_Grouped_Component__Seed_Group {
    literals: ReadonlyArray<Tag_Filter_Expression_Builder_Grouped_Component__Seed_Literal>
    groupOperator: 'AND' | 'OR'
}

//  The whole expression -- groups ( each with its own operator ) + the single between-groups operator.
//  Used for seeding and for change notifications.
export interface Tag_Filter_Expression_Builder_Grouped_Component__Expression {
    groups: ReadonlyArray<Tag_Filter_Expression_Builder_Grouped_Component__Seed_Group>
    betweenGroups_Operator: 'AND' | 'OR'
}

interface Internal__Tag_Filter_Expression_Builder_Grouped_Component_Props {
    searchTagData_Root: Search_Tags_SelectSearchTags_Component_SearchTagData_Root

    //  Number of searches ( in the whole project ) that have each tag, keyed by tagId.  Shown in the tag picker.
    searchesPerTagId_Map?: ReadonlyMap<number, number>

    //  Optional initial expression.  If omitted OR empty, starts pristine ( no groups yet ).
    initial_Groups?: ReadonlyArray<Tag_Filter_Expression_Builder_Grouped_Component__Seed_Group>

    //  Optional initial between-groups operator ( default 'AND' )
    initial_BetweenGroups_Operator?: 'AND' | 'OR'

    //  Fired whenever the expression changes ( for persistence by the parent )
    expression_Changed_Callback?: ( expression: Tag_Filter_Expression_Builder_Grouped_Component__Expression ) => void
}

//  The expression itself is NOT in React state ( it lives in instance properties -- see the class fields ),
//  so state carries no real data:  a throwaway object is put here only to force a re-render.
interface Internal__Tag_Filter_Expression_Builder_Grouped_Component_State {
    force_Rerender?: unknown
}


/**
 *
 */
export class Tag_Filter_Expression_Builder_Grouped_Component
    extends React.Component< Internal__Tag_Filter_Expression_Builder_Grouped_Component_Props, Internal__Tag_Filter_Expression_Builder_Grouped_Component_State > {

    private _nextUiId = 1;

    private _generateUiId = () : number => {
        const result = this._nextUiId;
        this._nextUiId++;
        return result;
    }

    //  While the stay-open tag picker is open, suppress ALL updates ( both this builder's re-render AND the
    //  parent notification ) and apply them once on close -- there is no reason for the page under the overlay
    //  to change per pick, and it avoids the distracting flicker of the block updating beneath the overlay.
    private _suppress_Updates_WhilePickerOpen = false;

    //  The expression is held as INSTANCE PROPERTIES ( not this.state ) so a value is readable synchronously the
    //  instant after it is set -- setState is async, and reading it back in the same flow gives a stale value.
    //  render() reads these directly;  _mutated() / _rerender() force the re-render via a throwaway state object.
    //    _groups                 -- each group combines its literals with its own groupOperator
    //    _betweenGroups_Operator -- the single, independent operator that combines the groups
    private _groups : Array<Internal__Grouped_Group> = [];
    private _betweenGroups_Operator : 'AND' | 'OR' = 'AND';

    //  Which AND/OR operator dropdown is currently open ( unique key per operator pill ), or null if none.
    //  The dropdown is a small custom menu; clicking outside closes it ( see the document mousedown listener ).
    private _operatorDropdown_OpenKey : string | null = null;
    //  Ref to the currently-open operator dropdown's wrapper ( pill + menu ), for outside-click detection.
    private _operatorDropdown_Wrapper_Ref = React.createRef<HTMLSpanElement>();

    /**
     *
     */
    constructor( props : Internal__Tag_Filter_Expression_Builder_Grouped_Component_Props ) {
        super( props );

        let groups : Array<Internal__Grouped_Group>;

        if ( props.initial_Groups && props.initial_Groups.length > 0 ) {
            //  Seed from the caller ( e.g. translated from the existing simple tag selections )
            groups = props.initial_Groups.map( seedGroup => ( {
                _uiId: this._generateUiId(),
                groupOperator: ( seedGroup.groupOperator === 'AND' ) ? 'AND' : 'OR',
                literals: seedGroup.literals.map( seedLiteral => ( {
                    _uiId: this._generateUiId(),
                    tagId: seedLiteral.tagId,
                    negated: seedLiteral.negated
                } ) )
            } ) );
        } else {
            //  Start with NO groups -- render() shows the "Start building a tag filter" empty-state callout.
            //  ( The first "Add tags to first group" action creates the first group. )
            groups = [];
        }

        this._groups = groups;
        this._betweenGroups_Operator = ( props.initial_BetweenGroups_Operator === 'AND' || props.initial_BetweenGroups_Operator === 'OR' ) ? props.initial_BetweenGroups_Operator : 'AND';

        this.state = {};
    }

    componentDidMount() {
        document.addEventListener( 'mousedown', this._onDocumentMouseDown_ForOperatorDropdown );
    }
    componentWillUnmount() {
        document.removeEventListener( 'mousedown', this._onDocumentMouseDown_ForOperatorDropdown );
    }

    //  Close the operator dropdown when a mousedown lands outside its wrapper ( like a native <select> ).
    private _onDocumentMouseDown_ForOperatorDropdown = ( ev : MouseEvent ) : void => {
        if ( this._operatorDropdown_OpenKey === null ) {
            return;
        }
        const wrapper = this._operatorDropdown_Wrapper_Ref.current;
        if ( wrapper && ev.target instanceof Node && wrapper.contains( ev.target ) ) {
            return;   //  click inside the open dropdown ( its pill or menu ) -- leave it open
        }
        this._operatorDropdown_OpenKey = null;
        this._rerender();
    }

    //  Force a re-render.  The expression lives in instance properties, so state is only a render trigger.
    private _rerender() {
        this.setState( { force_Rerender: {} } );
    }

    //  After mutating the expression:  re-render this builder and notify the parent -- BUT while the stay-open
    //  picker is open, do neither ( batch ):  the page under the overlay stays put, and one update is applied
    //  when the overlay closes ( see _openTagPicker_ForGroup's onOverlayClosed ).
    private _mutated() {
        if ( this._suppress_Updates_WhilePickerOpen ) {
            return;
        }
        this._rerender();
        this._fireExpressionChanged();
    }

    private _fireExpressionChanged() {
        if ( this.props.expression_Changed_Callback ) {
            this.props.expression_Changed_Callback( this._currentExpression() );
        }
    }

    //  Current expression as plain data ( groups + per-group operator + between-groups operator )
    private _currentExpression() : Tag_Filter_Expression_Builder_Grouped_Component__Expression {
        const groups = this._groups.map( g => ( {
            groupOperator: g.groupOperator,
            literals: g.literals.map( lit => ( { tagId: lit.tagId, negated: lit.negated } ) )
        } ) );
        return { groups, betweenGroups_Operator: this._betweenGroups_Operator };
    }

    ////  ---   Operator mutation helpers   ---

    //  SET ( not toggle ) a specific group's operator -- idempotent ( immune to a double onChange )
    private _set_GroupOperator = ( groupUiId : number, groupOperator : 'AND' | 'OR' ) : void => {
        this._groups = this._groups.map( g => g._uiId === groupUiId ? { ...g, groupOperator } : g );
        this._mutated();
    }

    //  SET ( not toggle ) the single between-groups operator
    private _set_BetweenGroups_Operator = ( betweenGroups_Operator : 'AND' | 'OR' ) : void => {
        this._betweenGroups_Operator = betweenGroups_Operator;
        this._mutated();
    }

    //  Open ( or close, if already open ) the small AND/OR dropdown for a given operator pill
    private _toggle_OperatorDropdown = ( dropdownKey : string ) : void => {
        this._operatorDropdown_OpenKey = ( this._operatorDropdown_OpenKey === dropdownKey ) ? null : dropdownKey;
        this._rerender();
    }
    private _close_OperatorDropdown = () : void => {
        if ( this._operatorDropdown_OpenKey !== null ) {
            this._operatorDropdown_OpenKey = null;
            this._rerender();
        }
    }

    ////  ---   Tag catalog lookup helpers   ---

    private _get_TagEntry_Map() : Map<number, Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry> {
        const result = new Map<number, Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry>();
        if ( this.props.searchTagData_Root && this.props.searchTagData_Root.searchTag_Array ) {
            for ( const tagEntry of this.props.searchTagData_Root.searchTag_Array ) {
                result.set( tagEntry.tagId, tagEntry );
            }
        }
        return result;
    }

    private _get_CategoryLabel_Map() : Map<number, string> {
        const result = new Map<number, string>();
        if ( this.props.searchTagData_Root && this.props.searchTagData_Root.searchTagCategory_Array ) {
            for ( const category of this.props.searchTagData_Root.searchTagCategory_Array ) {
                result.set( category.category_id, category.category_label );
            }
        }
        return result;
    }

    ////  ---   Expression mutation helpers ( immutable-style: build new arrays, assign, then _mutated() )   ---

    private _addGroup = () : void => {
        const newGroup : Internal__Grouped_Group = { _uiId: this._generateUiId(), literals: [], groupOperator: 'OR' };
        this._groups = [ ...this._groups, newGroup ];
        this._mutated();
    }

    //  The "first step" from the empty state:  open the tag picker on the first group ( creating one if needed ),
    //  so the very first thing the user does is add a tag rather than reason about groups.
    private _openTagPicker_StartFirstGroup = () : void => {
        let groupUiId : number;
        if ( this._groups.length > 0 ) {
            groupUiId = this._groups[ 0 ]._uiId;
        } else {
            const newGroup : Internal__Grouped_Group = { _uiId: this._generateUiId(), literals: [], groupOperator: 'OR' };
            groupUiId = newGroup._uiId;
            //  Create the first group but DON'T re-render / notify now:  the picker opens immediately on top and
            //  batches, so the page under it stays put until close.  Instance properties are set synchronously, so
            //  _openTagPicker_ForGroup below sees this group at once ( no re-render needed for that ).
            this._groups = [ newGroup ];
        }
        this._openTagPicker_ForGroup( groupUiId );
    }

    private _removeGroup = ( groupUiId : number ) : void => {
        this._groups = this._groups.filter( g => g._uiId !== groupUiId );
        this._mutated();
    }

    //  Open the home-grown overlay ( categories-left / tags-right ) to add a tag to an existing group.
    //  When the group is still EMPTY, the picker also shows OR/AND radios so the user can choose how THIS
    //  group's tags will combine before adding them ( for a group that already has tags, the operator is set
    //  by clicking the inline AND/OR between its tags instead ).
    private _openTagPicker_ForGroup = ( groupUiId : number ) : void => {

        const group = this._groups.find( g => g._uiId === groupUiId );
        //  ( instance properties are synchronous, so a just-created group is already present here; the
        //  not-found fallback below is only defensive. )  Treat an empty group as needing the OR/AND chooser.
        const isEmptyGroup = ( ! group ) || group.literals.length === 0;
        const includeOperatorChooser = isEmptyGroup;
        const groupOperator : 'AND' | 'OR' = group ? group.groupOperator : 'OR';
        const initialDisabledTagIds = group ? new Set<number>( group.literals.map( lit => lit.tagId ) ) : new Set<number>();

        //  Stay-open picker:  batch -- suppress ALL updates ( re-render + notify ) until the overlay closes
        this._suppress_Updates_WhilePickerOpen = true;

        tagFilter_Expression_TagPicker_Overlay__openOverlay( {
            searchTagData_Root: this.props.searchTagData_Root,
            searchesPerTagId_Map: this.props.searchesPerTagId_Map,
            title: includeOperatorChooser ? "Add tags to the group" : "Add a tag to the group",
            promptText: includeOperatorChooser
                ? "Choose how these tags combine, then click tags to add them to this group.  You can add several, then close."
                : "Click a tag to add it to this group ( combined with " + groupOperator + " ).  You can add several, then close.",
            initialDisabledTagIds,
            disabledReason: "Already in this group",
            onPickTagId: ( tagId ) => this._addTagToGroup( groupUiId, tagId ),
            operatorChooser: includeOperatorChooser ? {
                initial_GroupOperator: groupOperator,
                onChoose_GroupOperator: ( chosen ) => this._set_GroupOperator( groupUiId, chosen )
            } : undefined,
            onOverlayClosed: () => {
                //  Apply everything once, now that the overlay is closed:  re-render this builder AND notify the
                //  parent ( persist + re-filter the search list ) a single time.
                this._suppress_Updates_WhilePickerOpen = false;
                this._mutated();
            }
        } );
    }

    private _addTagToGroup = ( groupUiId : number, tagId : number ) : void => {
        this._groups = this._groups.map( g => {
            if ( g._uiId !== groupUiId ) {
                return g;
            }
            //  Skip if this tagId is already in this group ( ignore whether negated )
            if ( g.literals.some( lit => lit.tagId === tagId ) ) {
                return g;
            }
            const newLiteral : Internal__Grouped_Literal = { _uiId: this._generateUiId(), tagId, negated: false };
            return { ...g, literals: [ ...g.literals, newLiteral ] };
        } );
        this._mutated();
    }

    private _removeLiteral = ( groupUiId : number, literalUiId : number ) : void => {
        this._groups = this._groups.map( g => {
            if ( g._uiId !== groupUiId ) {
                return g;
            }
            return { ...g, literals: g.literals.filter( lit => lit._uiId !== literalUiId ) };
        } );
        this._mutated();
    }

    //  SET ( not toggle ) so it's idempotent -- immune to a control firing onChange more than once per click
    private _setLiteralNegated = ( groupUiId : number, literalUiId : number, negated : boolean ) : void => {
        this._groups = this._groups.map( g => {
            if ( g._uiId !== groupUiId ) {
                return g;
            }
            return {
                ...g,
                literals: g.literals.map( lit => lit._uiId === literalUiId ? { ...lit, negated } : lit )
            };
        } );
        this._mutated();
    }

    ////  ---   Expression preview   ---

    //  Shared tooltip contents for a tag chip.  Uses a 2-column CSS grid so the values left-align.
    //  searchCount:  number of searches in the project that have this tag ( undefined = count data not available ).
    private _build_TagTooltipContents( tagString : string, categoryLabel : string, negated : boolean, searchCount : number | undefined ) : React.JSX.Element {
        return (
            <span>
                <div style={ { display: "grid", gridTemplateColumns: "max-content 1fr", columnGap: 8, rowGap: 2 } }>
                    <div>Tag:</div>
                    <div><b>{ tagString }</b></div>
                    <div>Category:</div>
                    <div>{ categoryLabel ? categoryLabel : "(uncategorized)" }</div>
                </div>
                { searchCount !== undefined ? (
                    <div style={ { marginTop: 8 } }>
                        { searchCount === 0
                            ? "No searches have this tag"
                            : ( searchCount + ( searchCount === 1 ? " search has this tag" : " searches have this tag" ) ) }
                    </div>
                ) : null }
                { negated ? ( <div style={ { marginTop: 4, fontStyle: "italic" } }>Negated ( NOT ) — tag must be ABSENT</div> ) : null }
            </span>
        );
    }

    ////  ---   Render helpers   ---

    /**
     * Render a clickable AND/OR operator pill.  Clicking it opens a small dropdown to choose AND or OR
     * ( each option has a tooltip; clicking outside closes it, like a <select> ).  variant:
     *   'inline'  = operator shown between tags inside a group  ( chooses THAT group's operator )
     *   'between' = operator shown between groups               ( chooses the single between-groups operator )
     * The two variants are styled differently ( see below ) so in-group vs between-groups stay distinct.
     */
    private _render_ClickableOperator( params : {
        operator : 'AND' | 'OR',
        variant : 'inline' | 'between',
        dropdownKey : string,
        onChoose : ( operator : 'AND' | 'OR' ) => void,
        pillTooltipContents : React.JSX.Element
    } ) : React.JSX.Element {

        const { operator, variant, dropdownKey, onChoose, pillTooltipContents } = params;

        const isOpen = this._operatorDropdown_OpenKey === dropdownKey;

        //  Limelight green ( brand ):  dark green ( site_color_very_dark ) filled with white for the prominent
        //  between-groups operator;  light green ( site_color_medium ) with dark-green text + medium-green border
        //  ( link_color_underline ) for the lower-emphasis inline operator.
        const baseStyle : React.CSSProperties = variant === 'between'
            ? { color: _limelightColors.color_white, backgroundColor: _limelightColors.site_color_very_dark, borderWidth: 1, borderStyle: "solid", borderColor: _limelightColors.site_color_very_dark, borderRadius: 4, paddingTop: 2, paddingBottom: 2, paddingLeft: 7, paddingRight: 7 }
            : { color: _limelightColors.site_color_very_dark, backgroundColor: _limelightColors.site_color_medium, borderWidth: 1, borderStyle: "solid", borderColor: _limelightColors.link_color_underline, borderRadius: 3, paddingTop: 1, paddingBottom: 1, paddingLeft: 4, paddingRight: 4, marginTop: 0, marginBottom: 0, marginLeft: 3, marginRight: 3 };

        return (
            <span
                //  ref only on the OPEN pill's wrapper -- outside-click detection uses it ( wrapper holds pill + menu )
                ref={ isOpen ? this._operatorDropdown_Wrapper_Ref : undefined }
                style={ { position: "relative", display: "inline-block" } }
            >
                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                    title={ isOpen ? null : pillTooltipContents /* hide the pill tooltip while the menu is open */ }
                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                >
                    <span
                        onClick={ () => this._toggle_OperatorDropdown( dropdownKey ) }
                        style={ { ...baseStyle, fontWeight: "bold", cursor: "pointer", whiteSpace: "nowrap" } }
                    >
                        { operator } ▾
                    </span>
                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                { isOpen ? this._render_OperatorDropdownMenu( { variant, current: operator, onChoose } ) : null }
            </span>
        );
    }

    /**
     * The small AND/OR dropdown menu shown under an operator pill.  Two options ( OR, AND ), each with a
     * tooltip; the current one is checked.  Styled to echo the pill's variant ( between = dark-green accent,
     * inline = medium-green accent ) so the in-group vs between-groups distinction carries into the menu.
     */
    private _render_OperatorDropdownMenu( params : { variant : 'inline' | 'between', current : 'AND' | 'OR', onChoose : ( operator : 'AND' | 'OR' ) => void } ) : React.JSX.Element {

        const { variant, current, onChoose } = params;

        const selected_BackgroundColor = variant === 'between' ? _limelightColors.site_color_very_dark : _limelightColors.site_color_medium;
        const selected_Color = variant === 'between' ? _limelightColors.color_white : _limelightColors.site_color_very_dark;

        const options : Array<'OR' | 'AND'> = [ 'OR', 'AND' ];

        return (
            <div
                style={ {
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    marginTop: 3,
                    zIndex: 1400,   //  below the MUI tooltip ( z 1500 ) so the per-option tooltips render on top
                    minWidth: 92,
                    backgroundColor: _limelightColors.color_white,
                    //  Thicker, darker border + a white halo ring + stronger shadow so the menu reads as a
                    //  floating surface, clearly separated from the pale-green panel and any content around/under
                    //  it ( e.g. the "Add a group" button when the between-groups pill wraps right above it ).
                    //  The white ring ( first box-shadow ) is the key separator:  it keeps the dark menu edge from
                    //  visually merging with the green button below.
                    borderWidth: 2,
                    borderStyle: "solid",
                    borderColor: _limelightColors.site_color_very_dark,
                    borderRadius: 4,
                    boxShadow: "0 0 0 3px " + _limelightColors.color_white + ", 0 4px 16px rgba(0,0,0,0.30)",
                    paddingTop: 3,
                    paddingBottom: 3
                } }
            >
                { options.map( option => {
                    const isSelected = option === current;
                    const baseBackgroundColor = isSelected ? selected_BackgroundColor : _limelightColors.color_white;
                    const baseColor = isSelected ? selected_Color : _limelightColors.font_color_default;
                    return (
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            key={ option }
                            title={ this._operatorOption_TooltipContents( variant, option ) }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_NOT_FollowMousePointer_DefaultPosition() }
                        >
                            <div
                                onClick={ () => { onChoose( option ); this._close_OperatorDropdown(); } }
                                //  Simple hover highlight for non-selected options ( direct DOM, avoids extra state )
                                onMouseEnter={ ev => { if ( ! isSelected ) { ev.currentTarget.style.backgroundColor = _limelightColors.site_color_light } } }
                                onMouseLeave={ ev => { ev.currentTarget.style.backgroundColor = baseBackgroundColor } }
                                style={ {
                                    display: "flex",
                                    alignItems: "center",
                                    paddingTop: 4,
                                    paddingBottom: 4,
                                    paddingLeft: 8,
                                    paddingRight: 12,
                                    cursor: "pointer",
                                    whiteSpace: "nowrap",
                                    fontWeight: "bold",
                                    backgroundColor: baseBackgroundColor,
                                    color: baseColor
                                } }
                            >
                                <span style={ { display: "inline-block", width: 14 } }>{ isSelected ? "✓" : "" }</span>
                                <span>{ option }</span>
                            </div>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    );
                } ) }
            </div>
        );
    }

    //  Tooltip for an AND / OR option in the operator dropdown, per context ( within a group vs between groups )
    private _operatorOption_TooltipContents( variant : 'inline' | 'between', option : 'AND' | 'OR' ) : React.JSX.Element {
        if ( variant === 'inline' ) {
            return (
                <span>
                    <div><b>{ option }</b> within this group.</div>
                    <div style={ { marginTop: 3 } }>
                        { option === 'OR'
                            ? "A search matches this group if it has ANY of the group's tags."
                            : "A search matches this group only if it has ALL of the group's tags." }
                    </div>
                </span>
            );
        }
        return (
            <span>
                <div><b>{ option }</b> between groups.</div>
                <div style={ { marginTop: 3 } }>
                    { option === 'OR'
                        ? "A search passes if it matches AT LEAST ONE group."
                        : "A search passes only if it matches EVERY group." }
                </div>
            </span>
        );
    }

    //  Tooltip for the inline ( within-group ) operator
    private _inlineOperator_TooltipContents( groupOperator : 'AND' | 'OR' ) : React.JSX.Element {
        return (
            <span>
                <div>Tags in this group are combined with <b>{ groupOperator }</b>.</div>
                <div style={ { marginTop: 3 } }>
                    { groupOperator === 'OR'
                        ? "A search matches this group if it has ANY of these tags."
                        : "A search matches this group only if it has ALL of these tags." }
                </div>
                <div style={ { marginTop: 10 } }>Click to choose <b>AND</b> or <b>OR</b> for this group.</div>
            </span>
        );
    }

    //  Tooltip for the between-groups operator
    private _betweenOperator_TooltipContents( betweenOperator : 'AND' | 'OR' ) : React.JSX.Element {
        return (
            <span>
                <div>The groups are combined with <b>{ betweenOperator }</b>.</div>
                <div style={ { marginTop: 3 } }>
                    { betweenOperator === 'AND'
                        ? "A search must match EVERY group."
                        : "A search must match AT LEAST ONE group." }
                </div>
                <div style={ { marginTop: 10 } }>Click to choose <b>AND</b> or <b>OR</b> ( applies between all groups ).</div>
            </span>
        );
    }

    /**
     * Render one tag literal chip ( inside a group ):  [ not ] tagString  x
     */
    private _render_LiteralChip(
        group : Internal__Grouped_Group,
        literal : Internal__Grouped_Literal,
        tagEntry_Map : Map<number, Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry>,
        categoryLabel_Map : Map<number, string>
    ) : React.JSX.Element {

        const tagEntry = tagEntry_Map.get( literal.tagId );

        const backgroundColor = tagEntry ? tagEntry.tag_Color_Background : "#eeeeee";
        const fontColor = tagEntry ? tagEntry.tag_Color_Font : "#000000";
        const borderColor = tagEntry ? tagEntry.tag_Color_Border : "#999999";
        const tagString = tagEntry ? tagEntry.tagString : ( "tagId " + literal.tagId );

        const categoryLabel = ( tagEntry && tagEntry.tagCategoryId !== undefined && tagEntry.tagCategoryId !== null )
            ? categoryLabel_Map.get( tagEntry.tagCategoryId ) : null;

        const searchCount : number | undefined = this.props.searchesPerTagId_Map ? ( this.props.searchesPerTagId_Map.get( literal.tagId ) ?? 0 ) : undefined;
        const tooltipContents = this._build_TagTooltipContents( tagString, categoryLabel, literal.negated, searchCount );

        const _NEGATED_COLOR = "#c0392b";  //  red

        //  Tooltip for the NOT pill:  explain what it does and that clicking adds/removes the NOT
        const notPill_TooltipContents = literal.negated
            ? ( <span>NOT is on — this tag must be <b>absent</b>.  Click to remove NOT.</span> )
            : ( <span>Click to add <b>NOT</b> — require this tag be <b>absent</b> ( exclude it ).</span> );

        return (
            <span
                style={ {
                    display: "inline-flex",
                    alignItems: "center",
                    backgroundColor,
                    color: fontColor,
                    //  Longhand borderColor ( fall back to transparent ) so setting a possibly-empty tag color can't
                    //  produce an invalid "2px solid " shorthand string that the browser silently ignores ( the
                    //  "stuck red border" bug ).  Also matches the house style of explicit longhand properties.
                    borderWidth: 2,
                    borderStyle: "solid",
                    borderColor: literal.negated ? _NEGATED_COLOR : ( borderColor ? borderColor : "transparent" ),
                    borderRadius: 4,
                    paddingTop: 1,
                    paddingRight: 4,
                    paddingBottom: 1,
                    paddingLeft: 3,
                    marginTop: 2,
                    marginRight: 2,
                    marginBottom: 2,
                    marginLeft: 2,
                    whiteSpace: "nowrap"
                } }
            >
                <span style={ { display: "inline-flex", alignItems: "center" } }>

                    {/*  NOT toggle pill -- its own tooltip explains what it does.  MUI small Switch, set from 'checked' ( idempotent ).  */}
                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                        title={ notPill_TooltipContents }
                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                    >
                        <label
                            style={ {
                                display: "inline-flex",
                                alignItems: "center",
                                marginRight: 5,
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingLeft: 5,
                                paddingRight: 5,
                                borderRadius: 3,
                                backgroundColor: "#ededed",
                                color: literal.negated ? _NEGATED_COLOR : "#555555",
                                cursor: "pointer"
                            } }
                        >
                            <Switch
                                checked={ literal.negated }
                                onChange={ ( event ) => this._setLiteralNegated( group._uiId, literal._uiId, event.target.checked ) }
                                color="error"
                                disableRipple
                                size="small"
                                sx={ { marginRight: "4px" } }
                            />
                            <span style={ { fontWeight: "bold" } }>NOT</span>
                        </label>
                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                    {/*  Tag name -- carries the tag + category ( + negated ) tooltip  */}
                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                        title={ tooltipContents }
                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                    >
                        <span style={ literal.negated ? { textDecoration: "line-through" } : undefined }>{ tagString }</span>
                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                    {/*  Remove literal  */}
                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                        title={ <span>Remove tag from group</span> }
                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                    >
                        <span
                            className=" clickable "
                            onClick={ () => this._removeLiteral( group._uiId, literal._uiId ) }
                            style={ { marginLeft: 6, fontWeight: "bold", color: fontColor } }
                        >
                            &times;
                        </span>
                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                </span>
            </span>
        );
    }

    /**
     * Render one group box.  The group combines its literals with its own groupOperator ( toggled by clicking
     * the inline AND/OR between the tags ).
     */
    private _render_Group(
        group : Internal__Grouped_Group,
        groupIndex : number,
        tagEntry_Map : Map<number, Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry>,
        categoryLabel_Map : Map<number, string>,
        isLastGroup : boolean
    ) : React.JSX.Element {

        //  Shared tooltip for the "add tag(s) to this group" controls ( empty-group button and per-group "Add tag" )
        const addTagTooltip = ( <span>Add a tag to this group.  Opens a picker with the project's tags grouped by category; tags within this group are combined with <b>{ group.groupOperator }</b>.  You can add several, then close.</span> );

        return (
            <div
                key={ group._uiId }
                style={ {
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: _limelightColors.link_color_underline,
                    borderRadius: 6,
                    paddingTop: 8,
                    paddingRight: 8,
                    paddingBottom: 8,
                    paddingLeft: 8,
                    backgroundColor: _limelightColors.site_color_light,
                    minWidth: 180,
                    //  Extra space to the right of ONLY the last group, so the "Add a group" button ( the next
                    //  flex item ) sits with breathing room when on the same line.  Because the space lives on
                    //  the group ( not before the button ), it becomes harmless trailing space at the end of the
                    //  line when the button wraps -- the button stays flush-left with no indent.
                    marginRight: isLastGroup ? 18 : undefined
                } }
            >
                {/*  Group header  */}
                <div style={ { display: "flex", alignItems: "center", marginBottom: 4 } }>
                    <span style={ { fontWeight: "bold", color: _limelightColors.site_color_very_dark, marginRight: 6 } }>
                        Group { groupIndex + 1 }
                    </span>
                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                        title={ <span>Remove Group</span> }
                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                    >
                        <img
                            className=" icon-small clickable "
                            src="static/images/icon-circle-delete.png"
                            onClick={ () => this._removeGroup( group._uiId ) }
                        />
                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                </div>

                { group.literals.length === 0 ? (

                    //  Empty group:  a button to add tags, and an "(Empty Group)" marker below it ( the
                    //  "Filtering on tags:" warning refers to empty groups, so name the state here ).
                    <div>
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={ addTagTooltip }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <button
                                type="button"
                                onClick={ () => this._openTagPicker_ForGroup( group._uiId ) }
                                style={ { cursor: "pointer" } }
                            >
                                Add tags to group
                            </button>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        <div style={ { color: "#888888", fontStyle: "italic", marginTop: 4 } }>
                            (Empty Group)
                        </div>
                    </div>

                ) : ( <>

                    {/*  Literals ( combined with this group's own operator; click the inline AND/OR to toggle it )  */}
                    <div>
                        { group.literals.map( ( literal, literalIndex ) => (
                            <React.Fragment key={ literal._uiId }>
                                { literalIndex > 0 ? this._render_ClickableOperator( {
                                    operator: group.groupOperator,
                                    variant: 'inline',
                                    dropdownKey: "group:" + group._uiId + ":op" + literalIndex,
                                    onChoose: ( chosen ) => this._set_GroupOperator( group._uiId, chosen ),
                                    pillTooltipContents: this._inlineOperator_TooltipContents( group.groupOperator )
                                } ) : null }
                                { this._render_LiteralChip( group, literal, tagEntry_Map, categoryLabel_Map ) }
                            </React.Fragment>
                        ) ) }
                    </div>

                    {/*  Add-tag control  ( opens the categories-left / tags-right overlay )  */}
                    <div style={ { marginTop: 6 } }>
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={ addTagTooltip }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <span
                                className=" fake-link "
                                onClick={ () => this._openTagPicker_ForGroup( group._uiId ) }
                                style={ { cursor: "pointer" } }
                            >
                                Add tag
                            </span>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    </div>

                </> ) }
            </div>
        );
    }

    /**
     * The pristine / empty first view:  a friendly dashed callout with ONE prominent primary action
     * ( "Add tags to first group" ) so the first step is obvious, instead of a bare empty group box.
     */
    private _render_EmptyState() : React.JSX.Element {
        return (
            <div
                style={ {
                    maxWidth: 650,
                    marginTop: 8,
                    borderWidth: 1,
                    borderStyle: "dashed",
                    borderColor: _limelightColors.link_color_underline,
                    borderRadius: 8,
                    backgroundColor: _limelightColors.site_color_light,
                    paddingTop: 22,
                    paddingRight: 20,
                    paddingBottom: 22,
                    paddingLeft: 20,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    rowGap: 12
                } }
            >
                <div style={ { fontWeight: "bold", fontSize: 16, color: _limelightColors.site_color_very_dark } }>
                    Start adding tags to the first group.
                </div>
                <div style={ { color: "#666666", maxWidth: 560 } }>
                    <div>
                        More groups can be added later.
                    </div>
                    <div style={ { marginTop: 10, marginLeft: "auto", marginRight: "auto" } }>
                        <div style={ { whiteSpace: "nowrap" } }>
                            Build an expression like
                        </div>
                        <div style={ { whiteSpace: "nowrap" } }>
                            <code>( a OR b OR c ) AND ( d OR e OR f )</code>
                        </div>
                    </div>
                </div>

                {/*  The single, prominent first step  */}
                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                    title={ <span>Opens a picker with the project's tags grouped by category.  Choose how the tags combine ( OR / AND ), then click tags to add them; you can add several, then close.</span> }
                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                >
                    <span
                        onClick={ () => this._openTagPicker_StartFirstGroup() }
                        style={ {
                            display: "inline-flex",
                            alignItems: "center",
                            backgroundColor: _limelightColors.site_color_very_dark,
                            color: _limelightColors.color_white,
                            fontWeight: "bold",
                            fontSize: 15,
                            borderWidth: 1,
                            borderStyle: "solid",
                            borderColor: _limelightColors.site_color_very_dark,
                            borderRadius: 5,
                            paddingTop: 7,
                            paddingBottom: 7,
                            paddingLeft: 16,
                            paddingRight: 16,
                            cursor: "pointer",
                            whiteSpace: "nowrap"
                        } }
                    >
                        Add tags to first group
                    </span>
                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
            </div>
        );
    }

    /**
     *
     */
    render() {

        const tagEntry_Map = this._get_TagEntry_Map();
        const categoryLabel_Map = this._get_CategoryLabel_Map();

        const betweenGroups_Operator = this._betweenGroups_Operator;

        //  Pristine == no groups at all ( the untouched initial view ).  Show the empty-state callout with one
        //  clear first step.  As soon as there is any group ( even empty ), show the builder instead.
        const isPristine = this._groups.length === 0;

        //  Wrap the ( non-pristine ) builder in a light panel that shrink-wraps to its content
        //  ( width: fit-content ) so it does NOT stretch to the page's right edge -- while still letting the
        //  groups row use the available width and wrap as many groups per line as fit ( fit-content grows to
        //  the available width when the groups need it, then wraps ).
        const panelStyle : React.CSSProperties = {
            width: "fit-content",
            maxWidth: "100%",
            boxSizing: "border-box",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: _limelightColors.link_color_underline,
            borderRadius: 6,
            backgroundColor: _limelightColors.site_color_light,
            paddingTop: 10,
            paddingRight: 12,
            paddingBottom: 10,
            paddingLeft: 12
        };

        return (
            <div>

                { isPristine ? ( <>

                    <div style={ { marginBottom: 6, fontWeight: "bold", fontSize: 18 } }>
                        Advanced Search Tag Filter
                    </div>
                    { this._render_EmptyState() }

                </> ) : (

                    <div style={ panelStyle }>

                        {/*  Header ( inside the panel so the border encloses all parts )  */}
                        <div style={ { marginBottom: 8, display: "flex", alignItems: "baseline", flexWrap: "wrap", columnGap: 6, rowGap: 2 } }>
                            <div style={ { fontWeight: "bold", fontSize: 18, whiteSpace: "nowrap" } }>
                                Advanced Search Tag Filter
                            </div>
                            <div style={ { color: "#666666", maxWidth: 620 } }>
                                e.g. <code>( a OR b ) AND ( c OR d )</code>.
                                Each group combines its own tags with <b>AND</b> or <b>OR</b>, and the groups are combined by a
                                separate between-groups operator &mdash; <b>click any AND/OR to change just that one</b>.
                            </div>
                        </div>

                        {/*  The groups, with the ( single ) between-groups operator as a separator between them.  The
                             "Add a group" button is the last item in this same flex-wrap row, so it sits to the RIGHT
                             of the last group ( and wraps onto a new line only when there isn't room ).  */}
                        <div style={ { display: "flex", flexWrap: "wrap", alignItems: "stretch", gap: 6 } }>
                            { this._groups.map( ( group, groupIndex ) => (
                                <React.Fragment key={ group._uiId }>
                                    { groupIndex > 0 ? (
                                        <div style={ { display: "flex", alignItems: "center" } }>
                                            { this._render_ClickableOperator( {
                                                operator: betweenGroups_Operator,
                                                variant: 'between',
                                                dropdownKey: "between:" + groupIndex,
                                                onChoose: ( chosen ) => this._set_BetweenGroups_Operator( chosen ),
                                                pillTooltipContents: this._betweenOperator_TooltipContents( betweenGroups_Operator )
                                            } ) }
                                        </div>
                                    ) : null }
                                    { this._render_Group( group, groupIndex, tagEntry_Map, categoryLabel_Map, groupIndex === this._groups.length - 1 ) }
                                </React.Fragment>
                            ) ) }

                            {/*  Add control:  add a new ( empty ) group;  the user then adds tags to it.  Kept
                                 inside the groups row ( vertically centered against the group boxes ) so it
                                 displays to the right of the last group unless it wraps to the next line.
                                 marginTop/Bottom give it more vertical separation when it wraps onto its own line.  */}
                            <div style={ { display: "flex", alignItems: "center", marginTop: 10, marginBottom: 10 } }>
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={ <span>Add a <b>new group</b> ( joined to the other groups with <b>{ betweenGroups_Operator }</b> ), then add tags to it.</span> }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <button
                                        type="button"
                                        onClick={ () => this._addGroup() }
                                        style={ { cursor: "pointer", whiteSpace: "nowrap" } }
                                    >
                                        Add a group
                                    </button>
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            </div>
                        </div>

                        {/*  NOTE:  the "Filtering on tags:" summary is rendered by the PARENT ( in the shared
                             "filter-on-tags--currently-filtering" block, next to "Filtering on text:" ) via
                             Tag_Filter_Expression_Preview_Component -- this builder is edit-only.  */}

                    </div>

                ) }

            </div>
        );
    }
}
