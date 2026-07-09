/**
 * tag_Filter_Expression_Builder_CNF_Component.tsx
 *
 * Build a CNF (Conjunctive Normal Form) tag filter expression:
 *
 *      ( a OR b OR c )  AND  ( d OR e OR f )
 *
 *   - By default the top level is AND and each group is OR ( the global AND/OR mode toggle flips this to DNF ).
 *   - Each tag literal may be negated ( "NOT tag" ).
 *
 * This component holds its OWN internal state (the CNF expression being built) and notifies the parent
 * of changes via expression_Changed_Callback ( the parent persists the expression and drives the actual
 * search filtering from it ).
 */

import React from 'react'
import Switch from '@mui/material/Switch'

import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";
import {
    Search_Tags_SelectSearchTags_Component_SearchTagData_Root,
    Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry
} from "page_js/data_pages/search_tags__display_management/search_tags_SelectSearchTags_Component/search_Tags_SelectSearchTags_Component";
import {tagFilter_Expression_OperatorChooser_Overlay__openOverlay} from "page_js/data_pages/search_tags__display_management/tag_filter_expression_builder_cnf_component/tag_Filter_Expression_OperatorChooser_Overlay";
import {tagFilter_Expression_TagPicker_Overlay__openOverlay} from "page_js/data_pages/search_tags__display_management/tag_filter_expression_builder_cnf_component/tag_Filter_Expression_TagPicker_Overlay";


/////


//  A single tag literal inside an OR group
interface Internal__CNF_Literal {
    _uiId: number
    tagId: number
    negated: boolean
}

//  A single OR group.  The literals are OR'd together.
interface Internal__CNF_OrGroup {
    _uiId: number
    literals: Array<Internal__CNF_Literal>
}


//  Seed shape ( e.g. translated from the existing simple OR/AND/NOT tag selections ).
//  Plain data ( no internal _uiId ) supplied by the caller.
export interface Tag_Filter_Expression_Builder_CNF_Component__Seed_Literal {
    tagId: number
    negated: boolean
}
export interface Tag_Filter_Expression_Builder_CNF_Component__Seed_OrGroup {
    literals: ReadonlyArray<Tag_Filter_Expression_Builder_CNF_Component__Seed_Literal>
}

//  The whole expression -- groups + the within-group operator.  Used for seeding and for change notifications.
export interface Tag_Filter_Expression_Builder_CNF_Component__Expression {
    andGroups: ReadonlyArray<Tag_Filter_Expression_Builder_CNF_Component__Seed_OrGroup>
    withinGroup_Operator: 'AND' | 'OR'
}

interface Internal__Tag_Filter_Expression_Builder_CNF_Component_Props {
    searchTagData_Root: Search_Tags_SelectSearchTags_Component_SearchTagData_Root

    //  Optional initial expression.  If omitted OR empty, starts with a single empty OR group.
    initial_AndGroups?: ReadonlyArray<Tag_Filter_Expression_Builder_CNF_Component__Seed_OrGroup>

    //  Optional initial within-group operator ( default 'OR' )
    initial_WithinGroup_Operator?: 'AND' | 'OR'

    //  Fired whenever the expression changes ( for persistence by the parent )
    expression_Changed_Callback?: ( expression: Tag_Filter_Expression_Builder_CNF_Component__Expression ) => void
}

interface Internal__Tag_Filter_Expression_Builder_CNF_Component_State {

    //  The CNF expression:  andGroups are AND'd together;  literals within a group are OR'd.
    andGroups: Array<Internal__CNF_OrGroup>

    //  Global combine mode:
    //    'OR'  => OR within each group, AND between groups  ( CNF, the default )
    //    'AND' => AND within each group, OR between groups   ( DNF )
    withinGroup_Operator: 'AND' | 'OR'
}


/**
 *
 */
export class Tag_Filter_Expression_Builder_CNF_Component
    extends React.Component< Internal__Tag_Filter_Expression_Builder_CNF_Component_Props, Internal__Tag_Filter_Expression_Builder_CNF_Component_State > {

    private _nextUiId = 1;

    private _generateUiId = () : number => {
        const result = this._nextUiId;
        this._nextUiId++;
        return result;
    }

    //  While the stay-open tag picker is open, suppress per-change notifications and fire once on close ( performance )
    private _suppress_ExpressionChanged = false;

    /**
     *
     */
    constructor( props : Internal__Tag_Filter_Expression_Builder_CNF_Component_Props ) {
        super( props );

        let andGroups : Array<Internal__CNF_OrGroup>;

        if ( props.initial_AndGroups && props.initial_AndGroups.length > 0 ) {
            //  Seed from the caller ( e.g. translated from the existing simple tag selections )
            andGroups = props.initial_AndGroups.map( seedGroup => ( {
                _uiId: this._generateUiId(),
                literals: seedGroup.literals.map( seedLiteral => ( {
                    _uiId: this._generateUiId(),
                    tagId: seedLiteral.tagId,
                    negated: seedLiteral.negated
                } ) )
            } ) );
        } else {
            //  Start with a single empty OR group so the UI is immediately usable
            andGroups = [ { _uiId: this._generateUiId(), literals: [] } ];
        }

        this.state = {
            andGroups,
            withinGroup_Operator: ( props.initial_WithinGroup_Operator === 'AND' || props.initial_WithinGroup_Operator === 'OR' ) ? props.initial_WithinGroup_Operator : 'OR'
        };
    }

    //  Notify the parent when the expression changes ( for persistence + filtering )
    componentDidUpdate( prevProps : Internal__Tag_Filter_Expression_Builder_CNF_Component_Props, prevState : Internal__Tag_Filter_Expression_Builder_CNF_Component_State ) {
        //  While the stay-open picker is open, batch:  don't notify per pick -- fire once on close
        if ( this._suppress_ExpressionChanged ) {
            return;
        }
        //  andGroups is replaced with a new array on every mutation, so a reference check is sufficient
        if ( prevState.andGroups !== this.state.andGroups || prevState.withinGroup_Operator !== this.state.withinGroup_Operator ) {
            this._fireExpressionChanged();
        }
    }

    private _fireExpressionChanged() {
        if ( this.props.expression_Changed_Callback ) {
            this.props.expression_Changed_Callback( this._currentExpression() );
        }
    }

    //  Current expression as plain data ( groups + operator )
    private _currentExpression() : Tag_Filter_Expression_Builder_CNF_Component__Expression {
        const andGroups = this.state.andGroups.map( g => ( {
            literals: g.literals.map( lit => ( { tagId: lit.tagId, negated: lit.negated } ) )
        } ) );
        return { andGroups, withinGroup_Operator: this.state.withinGroup_Operator };
    }

    //  Between-groups operator is always the opposite of the within-group operator
    private _betweenGroups_Operator() : 'AND' | 'OR' {
        return this.state.withinGroup_Operator === 'OR' ? 'AND' : 'OR';
    }

    //  Open the home-grown modal overlay to choose the AND/OR combine mode
    private _openOperatorChooser = () : void => {
        tagFilter_Expression_OperatorChooser_Overlay__openOverlay( {
            current_WithinGroup_Operator: this.state.withinGroup_Operator,
            onChoose: ( withinGroup_Operator ) => { this.setState( { withinGroup_Operator } ) }
        } );
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

    ////  ---   State mutation helpers ( immutable-style: build new arrays, then setState )   ---

    private _addGroup = () : void => {
        const newGroup : Internal__CNF_OrGroup = { _uiId: this._generateUiId(), literals: [] };
        this.setState( { andGroups: [ ...this.state.andGroups, newGroup ] } );
    }

    //  The "first step" from the empty state:  open the tag picker on the first group ( creating one if needed ),
    //  so the very first thing the user does is add a tag rather than reason about groups.
    private _openTagPicker_StartFirstGroup = () : void => {
        let groupUiId : number;
        if ( this.state.andGroups.length > 0 ) {
            groupUiId = this.state.andGroups[ 0 ]._uiId;
        } else {
            const newGroup : Internal__CNF_OrGroup = { _uiId: this._generateUiId(), literals: [] };
            groupUiId = newGroup._uiId;
            this.setState( { andGroups: [ newGroup ] } );
        }
        this._openTagPicker_ForGroup( groupUiId );
    }

    private _removeGroup = ( groupUiId : number ) : void => {
        const andGroups = this.state.andGroups.filter( g => g._uiId !== groupUiId );
        this.setState( { andGroups } );
    }

    //  Open the home-grown overlay ( categories-left / tags-right ) to add a tag to an existing group
    private _openTagPicker_ForGroup = ( groupUiId : number ) : void => {
        const group = this.state.andGroups.find( g => g._uiId === groupUiId );
        const initialDisabledTagIds = group ? new Set<number>( group.literals.map( lit => lit.tagId ) ) : new Set<number>();

        //  Stay-open picker:  batch the picks -- suppress notifications until the overlay closes, then fire once
        this._suppress_ExpressionChanged = true;

        tagFilter_Expression_TagPicker_Overlay__openOverlay( {
            searchTagData_Root: this.props.searchTagData_Root,
            title: "Add a tag to the group",
            promptText: "Click a tag to add it to this group ( combined with " + this.state.withinGroup_Operator + " ).  You can add several, then close.",
            initialDisabledTagIds,
            disabledReason: "Already in this group",
            onPickTagId: ( tagId ) => this._addTagToGroup( groupUiId, tagId ),
            onOverlayClosed: () => {
                this._suppress_ExpressionChanged = false;
                this._fireExpressionChanged();   //  apply/persist the accumulated picks once
            }
        } );
    }

    //  Open the overlay to add a tag as a NEW 1-tag group ( joined by the between-groups operator ).
    //  closeAfterPick: one pick creates one new group, then the overlay closes ( each pick = its own group ).
    private _openTagPicker_ForNewGroup = () : void => {
        const betweenOp = this._betweenGroups_Operator();
        tagFilter_Expression_TagPicker_Overlay__openOverlay( {
            searchTagData_Root: this.props.searchTagData_Root,
            title: "Add a tag as a new group",
            promptText: "Click a tag to " + betweenOp + " it as a new group.",
            initialDisabledTagIds: new Set<number>(),
            disabledReason: "",
            onPickTagId: ( tagId ) => this._addTag_AsNewGroup( tagId ),
            closeAfterPick: true
        } );
    }

    private _addTag_AsNewGroup = ( tagId : number ) : void => {
        const newGroup : Internal__CNF_OrGroup = {
            _uiId: this._generateUiId(),
            literals: [ { _uiId: this._generateUiId(), tagId, negated: false } ]
        };
        this.setState( { andGroups: [ ...this.state.andGroups, newGroup ] } );
    }

    private _addTagToGroup = ( groupUiId : number, tagId : number ) : void => {
        const andGroups = this.state.andGroups.map( g => {
            if ( g._uiId !== groupUiId ) {
                return g;
            }
            //  Skip if this tagId is already in this group ( ignore whether negated )
            if ( g.literals.some( lit => lit.tagId === tagId ) ) {
                return g;
            }
            const newLiteral : Internal__CNF_Literal = { _uiId: this._generateUiId(), tagId, negated: false };
            return { ...g, literals: [ ...g.literals, newLiteral ] };
        } );
        this.setState( { andGroups } );
    }

    private _removeLiteral = ( groupUiId : number, literalUiId : number ) : void => {
        const andGroups = this.state.andGroups.map( g => {
            if ( g._uiId !== groupUiId ) {
                return g;
            }
            return { ...g, literals: g.literals.filter( lit => lit._uiId !== literalUiId ) };
        } );
        this.setState( { andGroups } );
    }

    //  SET ( not toggle ) so it's idempotent -- immune to a control firing onChange more than once per click
    private _setLiteralNegated = ( groupUiId : number, literalUiId : number, negated : boolean ) : void => {
        const andGroups = this.state.andGroups.map( g => {
            if ( g._uiId !== groupUiId ) {
                return g;
            }
            return {
                ...g,
                literals: g.literals.map( lit => lit._uiId === literalUiId ? { ...lit, negated } : lit )
            };
        } );
        this.setState( { andGroups } );
    }

    ////  ---   Expression preview   ---

    //  Shared tooltip contents for a tag chip.  Uses a 2-column CSS grid so the values left-align.
    private _build_TagTooltipContents( tagString : string, categoryLabel : string, negated : boolean ) : React.JSX.Element {
        return (
            <span>
                <div style={ { display: "grid", gridTemplateColumns: "max-content 1fr", columnGap: 8, rowGap: 2 } }>
                    <div>Tag:</div>
                    <div><b>{ tagString }</b></div>
                    <div>Category:</div>
                    <div>{ categoryLabel ? categoryLabel : "(uncategorized)" }</div>
                </div>
                { negated ? ( <div style={ { marginTop: 4, fontStyle: "italic" } }>Negated ( NOT ) — tag must be ABSENT</div> ) : null }
            </span>
        );
    }

    //  A read-only ( non-interactive ) colored tag chip for the Expression preview, with a tag+category tooltip
    private _render_PreviewTagChip(
        literal : Internal__CNF_Literal,
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

        const tooltipContents = this._build_TagTooltipContents( tagString, categoryLabel, literal.negated );

        const _NEGATED_COLOR = "#c0392b";  //  red

        return (
            <span
                style={ {
                    display: "inline-flex",
                    alignItems: "center",
                    backgroundColor,
                    color: fontColor,
                    //  Always a VALID border color ( see note in _render_LiteralChip ) so un-NOT clears the red
                    borderWidth: 2,
                    borderStyle: "solid",
                    borderColor: literal.negated ? _NEGATED_COLOR : ( borderColor ? borderColor : "transparent" ),
                    borderRadius: 4,
                    paddingTop: 1,
                    paddingBottom: 1,
                    paddingLeft: 5,
                    paddingRight: 5,
                    whiteSpace: "nowrap"
                } }
            >
                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                    title={ tooltipContents }
                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                >
                    <span style={ { display: "inline-flex", alignItems: "center" } }>
                        { literal.negated ? ( <span style={ { fontWeight: "bold", color: _NEGATED_COLOR, marginRight: 4 } }>NOT</span> ) : null }
                        <span style={ literal.negated ? { textDecoration: "line-through" } : undefined }>{ tagString }</span>
                    </span>
                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
            </span>
        );
    }

    private _render_ExpressionPreview(
        tagEntry_Map : Map<number, Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry>,
        categoryLabel_Map : Map<number, string>
    ) : React.JSX.Element {

        const nonEmptyGroups = this.state.andGroups.filter( g => g.literals.length > 0 );
        if ( nonEmptyGroups.length === 0 ) {
            return <span style={ { color: "#888888" } }>(no tags selected)</span>;
        }

        const withinOp = this.state.withinGroup_Operator;
        const betweenOp = this._betweenGroups_Operator();

        return (
            <span style={ { display: "inline-flex", flexWrap: "wrap", alignItems: "center", gap: 4 } }>
                { nonEmptyGroups.map( ( g, groupIndex ) => (
                    <React.Fragment key={ g._uiId }>
                        { groupIndex > 0 ? ( <span style={ { fontWeight: "bold", marginTop: 0, marginBottom: 0, marginLeft: 3, marginRight: 3 } }>{ betweenOp }</span> ) : null }
                        <span style={ { display: "inline-flex", flexWrap: "wrap", alignItems: "center", gap: 4 } }>
                            <span style={ { fontWeight: "bold" } }>(</span>
                            { g.literals.map( ( literal, literalIndex ) => (
                                <React.Fragment key={ literal._uiId }>
                                    { literalIndex > 0 ? ( <span style={ { fontWeight: "bold" } }>{ withinOp }</span> ) : null }
                                    { this._render_PreviewTagChip( literal, tagEntry_Map, categoryLabel_Map ) }
                                </React.Fragment>
                            ) ) }
                            <span style={ { fontWeight: "bold" } }>)</span>
                        </span>
                    </React.Fragment>
                ) ) }
            </span>
        );
    }

    ////  ---   Render helpers   ---

    /**
     * Render a clickable AND/OR operator.  Clicking opens the mode-chooser overlay.  variant:
     *   'inline'  = operator shown between tags inside a group
     *   'between' = operator shown between groups
     */
    private _render_ClickableOperator( params : { operator : 'AND' | 'OR', variant : 'inline' | 'between' } ) : React.JSX.Element {

        const { operator, variant } = params;

        const baseStyle : React.CSSProperties = variant === 'between'
            ? { color: "#ffffff", backgroundColor: "#33557a", borderWidth: 1, borderStyle: "solid", borderColor: "#22405f", borderRadius: 4, paddingTop: 2, paddingBottom: 2, paddingLeft: 7, paddingRight: 7 }
            : { color: "#33557a", backgroundColor: "#dbe6f2", borderWidth: 1, borderStyle: "solid", borderColor: "#8aa9c9", borderRadius: 3, paddingTop: 1, paddingBottom: 1, paddingLeft: 4, paddingRight: 4, marginTop: 0, marginBottom: 0, marginLeft: 3, marginRight: 3 };

        const tooltipContents = (
            <span>
                <div><b>{ operator }</b> — click to change how tags combine.</div>
                <div style={ { marginTop: 3 } }>
                    Switches between: OR inside groups &amp; AND between groups &nbsp;⇄&nbsp; AND inside groups &amp; OR between groups.
                </div>
            </span>
        );

        return (
            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                title={ tooltipContents }
                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
            >
                <span
                    onClick={ () => this._openOperatorChooser() }
                    style={ { ...baseStyle, fontWeight: "bold", cursor: "pointer", whiteSpace: "nowrap" } }
                >
                    { operator } ▾
                </span>
            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
        );
    }

    /**
     * Render one tag literal chip ( inside an OR group ):  [ not ] tagString  x
     */
    private _render_LiteralChip(
        group : Internal__CNF_OrGroup,
        literal : Internal__CNF_Literal,
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

        const tooltipContents = this._build_TagTooltipContents( tagString, categoryLabel, literal.negated );

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
     * Render one group box ( a group is AND'd or OR'd internally depending on the current mode )
     */
    private _render_Group(
        group : Internal__CNF_OrGroup,
        groupIndex : number,
        tagEntry_Map : Map<number, Search_Tags_SelectSearchTags_Component_SingleSearchTag_Entry>,
        categoryLabel_Map : Map<number, string>
    ) : React.JSX.Element {

        return (
            <div
                key={ group._uiId }
                style={ {
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#8aa9c9",
                    borderRadius: 6,
                    paddingTop: 8,
                    paddingRight: 8,
                    paddingBottom: 8,
                    paddingLeft: 8,
                    backgroundColor: "#f4f8fc",
                    minWidth: 180
                } }
            >
                {/*  Group header  */}
                <div style={ { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 } }>
                    <span style={ { fontWeight: "bold", color: "#33557a" } }>
                        Group { groupIndex + 1 }
                    </span>
                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                        title={ <span>Remove this entire group and all of its tags from the filter.  The other groups still apply.</span> }
                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                    >
                        <span
                            className=" fake-link "
                            onClick={ () => this._removeGroup( group._uiId ) }
                            style={ { cursor: "pointer" } }
                        >
                            remove group
                        </span>
                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                </div>

                {/*  Literals ( OR'd )  */}
                <div>
                    { group.literals.length === 0 ? (
                        <span style={ { color: "#888888", fontStyle: "italic" } }>
                            (empty &mdash; add a tag)
                        </span>
                    ) : (
                        group.literals.map( ( literal, literalIndex ) => (
                            <React.Fragment key={ literal._uiId }>
                                { literalIndex > 0 ? this._render_ClickableOperator( { operator: this.state.withinGroup_Operator, variant: 'inline' } ) : null }
                                { this._render_LiteralChip( group, literal, tagEntry_Map, categoryLabel_Map ) }
                            </React.Fragment>
                        ) )
                    ) }
                </div>

                {/*  Add-tag control  ( opens the categories-left / tags-right overlay )  */}
                <div style={ { marginTop: 6 } }>
                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                        title={ <span>Add a tag to this group.  Opens a picker with the project's tags grouped by category; tags within this group are combined with <b>{ this.state.withinGroup_Operator }</b>.  You can add several, then close.</span> }
                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                    >
                        <span
                            className=" fake-link "
                            onClick={ () => this._openTagPicker_ForGroup( group._uiId ) }
                            style={ { cursor: "pointer" } }
                        >
                            + tag
                        </span>
                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                </div>
            </div>
        );
    }

    /**
     * The pristine / empty first view:  a friendly dashed callout with ONE prominent primary action
     * ( "+ Add a tag" ) so the first step is obvious, instead of a bare empty group box + two faint links.
     */
    private _render_EmptyState() : React.JSX.Element {
        return (
            <div
                style={ {
                    marginTop: 8,
                    borderWidth: 1,
                    borderStyle: "dashed",
                    borderColor: "#8aa9c9",
                    borderRadius: 8,
                    backgroundColor: "#f4f8fc",
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
                <div style={ { fontWeight: "bold", fontSize: 16, color: "#33557a" } }>
                    Start building a tag filter
                </div>
                <div style={ { color: "#666666", maxWidth: 560 } }>
                    Add a tag to filter the searches below.  Add more tags and groups to build an expression like&nbsp;
                    <code>( a OR b OR c ) AND ( d OR e OR f )</code> &mdash; you can switch how tags combine at any time.
                </div>

                {/*  The single, prominent first step  */}
                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                    title={ <span>Opens a picker with the project's tags grouped by category.  Pick a tag to start the filter; you can add several, then close.</span> }
                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                >
                    <span
                        onClick={ () => this._openTagPicker_StartFirstGroup() }
                        style={ {
                            display: "inline-flex",
                            alignItems: "center",
                            backgroundColor: "#33557a",
                            color: "#ffffff",
                            fontWeight: "bold",
                            fontSize: 15,
                            borderWidth: 1,
                            borderStyle: "solid",
                            borderColor: "#22405f",
                            borderRadius: 5,
                            paddingTop: 7,
                            paddingBottom: 7,
                            paddingLeft: 16,
                            paddingRight: 16,
                            cursor: "pointer",
                            whiteSpace: "nowrap"
                        } }
                    >
                        + Add a tag
                    </span>
                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                {/*  Secondary, lower-emphasis path  */}
                <div style={ { color: "#888888" } }>
                    or&nbsp;
                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                        title={ <span>Add an <b>empty group</b>, then add tags to it.</span> }
                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                    >
                        <span
                            className=" fake-link "
                            onClick={ () => this._addGroup() }
                            style={ { cursor: "pointer", whiteSpace: "nowrap" } }
                        >
                            add an empty group
                        </span>
                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                </div>
            </div>
        );
    }

    /**
     *
     */
    render() {

        const tagEntry_Map = this._get_TagEntry_Map();
        const categoryLabel_Map = this._get_CategoryLabel_Map();

        //  A new group is joined to the existing groups by the between-groups operator
        const betweenGroups_Operator = this._betweenGroups_Operator();

        //  Is anything actually being filtered on ( any group has at least one tag )?
        const hasTagFilter = this.state.andGroups.some( g => g.literals.length > 0 );

        //  Pristine == the untouched initial view ( no tags yet, no extra groups built ).  In that case show the
        //  empty-state callout with one clear first step instead of a bare empty group box + faint links.
        const isPristine = ( ! hasTagFilter ) && this.state.andGroups.length <= 1;

        return (
            <div>

                <div style={ { marginBottom: 6, display: "grid", gridTemplateColumns: "max-content 1fr", alignItems: "baseline" } }>
                    <div style={ { fontWeight: "bold", marginRight: 6, fontSize: 18 } }>
                        Advanced Search Tag Filter
                    </div>
                    { isPristine ? null : (
                        <div style={ { color: "#666666" } }>
                            e.g. <code>( a OR b OR c ) AND ( d OR e OR f )</code>.
                            By default tags within a group are OR'd and groups are AND'd &mdash; <b>click any AND/OR to switch modes</b>.
                        </div>
                    ) }
                </div>

                { isPristine ? this._render_EmptyState() : ( <>

                {/*  The groups, with "AND" separators between them  */}
                <div style={ { display: "flex", flexWrap: "wrap", alignItems: "stretch", gap: 6 } }>
                    { this.state.andGroups.map( ( group, groupIndex ) => (
                        <React.Fragment key={ group._uiId }>
                            { groupIndex > 0 ? (
                                <div style={ { display: "flex", alignItems: "center" } }>
                                    { this._render_ClickableOperator( { operator: this._betweenGroups_Operator(), variant: 'between' } ) }
                                </div>
                            ) : null }
                            { this._render_Group( group, groupIndex, tagEntry_Map, categoryLabel_Map ) }
                        </React.Fragment>
                    ) ) }
                </div>

                {/*  Add controls:  one-click "<between-op> a tag" ( new 1-tag group ) and "<between-op> an empty group"  */}
                <div style={ { marginTop: 8, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" } }>
                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                        title={ <span>Add a tag as a <b>new group</b> ( joined to the other groups with <b>{ betweenGroups_Operator }</b> ).  Opens a picker; pick one tag and it's added as a new group.</span> }
                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                    >
                        <span
                            className=" fake-link "
                            onClick={ () => this._openTagPicker_ForNewGroup() }
                            style={ { cursor: "pointer", fontWeight: "bold", whiteSpace: "nowrap" } }
                        >
                            { this.state.andGroups.length > 0 ? ( "+ " + betweenGroups_Operator + " a tag" ) : "+ add a tag" }
                        </span>
                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                        title={ <span>Add a <b>new empty group</b> ( joined to the other groups with <b>{ betweenGroups_Operator }</b> ), then add tags to it.</span> }
                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                    >
                        <span
                            className=" fake-link "
                            onClick={ () => this._addGroup() }
                            style={ { cursor: "pointer", whiteSpace: "nowrap" } }
                        >
                            { this.state.andGroups.length > 0 ? ( "+ " + betweenGroups_Operator + " an empty group" ) : "+ add an empty group" }
                        </span>
                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                </div>

                {/*  Live expression preview -- styled like the "Filtering on tags:" block:  yellow border ( from the
                     CSS class ) when filtering, a label block on the left and the expression block on the right.
                     When nothing is selected, show "No search filtering" instead.  */}
                { hasTagFilter ? (
                    <div
                        className=" filter-on-tags--currently-filtering "
                        style={ { marginTop: 10, padding: 10, display: "grid", gridTemplateColumns: "max-content auto" } }
                    >
                        <div style={ { fontWeight: "bold", whiteSpace: "nowrap", fontSize: 18, marginRight: 6 } }>
                            Filtering on tags:
                        </div>
                        <div>
                            { this._render_ExpressionPreview( tagEntry_Map, categoryLabel_Map ) }
                        </div>
                    </div>
                ) : (
                    <div style={ { marginTop: 10, fontWeight: "bold" } }>
                        No search filtering
                    </div>
                ) }

                </> ) }

            </div>
        );
    }
}
