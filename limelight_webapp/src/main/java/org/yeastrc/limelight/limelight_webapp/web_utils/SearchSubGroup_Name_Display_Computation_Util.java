/*
 * Original author: Daniel Jaschob <djaschob .at. uw.edu>
 *
 * Copyright 2018 University of Washington - Seattle, WA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.yeastrc.limelight.limelight_webapp.web_utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

/**
 * Compute the DEFAULT display label for each search sub-group ("Sub Search") of a single search.
 *
 * <p>Algorithm ("divergence-anchored, token-aware"): strip the longest common suffix shared by all
 * names (boilerplate/extension), then anchor each name's window at where it first diverges from its
 * most-similar sorted neighbour (adjacent longest-common-prefix), backed up to the token boundary just
 * before that point when a separator is present in EVERY name (char context otherwise); take up to
 * {@link #MAX_LENGTH_OF_DISPLAY_STRING} characters from the anchor, then guarantee uniqueness within the
 * search. A user-entered display value always wins and is used verbatim (computed labels are still
 * de-duplicated against the user values).
 *
 * <p>Cap stays at 8 characters — the QC page Plotly plots require the short cap; do NOT raise it.
 *
 * <p>This is a faithful port of the approved reference implementation (Python {@code new_algorithm}),
 * verified for parity against every existing server sub-group record.
 */
@Component
public class SearchSubGroup_Name_Display_Computation_Util {

	private static final int MAX_LENGTH_OF_DISPLAY_STRING = 8;

	/**
	 * Separators tried, in priority order, when detecting a token separator present in every name.
	 * Also the set of characters trimmed from the ends of a computed label.
	 */
	private static final char[] SEPARATOR_CHARS = { '_', '-', '.', ' ' };

	public static class SearchSubGroup_Name_Display_Computation_Entry {

		private int searchSubGroupId; // Unique within a search id
		private Integer displayOrder;
		private String subgroupName_fromImportFile;
		private String subgroupName_Display_FromServer_IfUserEnteredAValue; // null until user enters a value
		private String subgroupName_Display; //  Populated in SearchSubGroup_Name_Display_Computation_Util

		public int getSearchSubGroupId() {
			return searchSubGroupId;
		}
		public void setSearchSubGroupId(int searchSubGroupId) {
			this.searchSubGroupId = searchSubGroupId;
		}
		public String getSubgroupName_fromImportFile() {
			return subgroupName_fromImportFile;
		}
		public void setSubgroupName_fromImportFile(String subgroupName_fromImportFile) {
			this.subgroupName_fromImportFile = subgroupName_fromImportFile;
		}
		public String getSubgroupName_Display_FromServer_IfUserEnteredAValue() {
			return subgroupName_Display_FromServer_IfUserEnteredAValue;
		}
		public void setSubgroupName_Display_FromServer_IfUserEnteredAValue(
				String subgroupName_Display_FromServer_IfUserEnteredAValue) {
			this.subgroupName_Display_FromServer_IfUserEnteredAValue = subgroupName_Display_FromServer_IfUserEnteredAValue;
		}
		public String getSubgroupName_Display() {
			return subgroupName_Display;
		}
		public void setSubgroupName_Display(String subgroupName_Display) {
			this.subgroupName_Display = subgroupName_Display;
		}
		public Integer getDisplayOrder() {
			return displayOrder;
		}
		public void setDisplayOrder(Integer displayOrder) {
			this.displayOrder = displayOrder;
		}
	}

	/**
	 * Populate {@code subgroupName_Display} on every entry (the entries for ONE search; the caller groups
	 * by searchId), then sort the list on displayOrder (nulls last) and then computed display label.
	 */
	public void searchSubGroup_Name_Display_Computation__SortOn_DisplayOrder_SubGroupNameDisplay__Util( List<SearchSubGroup_Name_Display_Computation_Entry> entriesToUpdate ) {

		final int n = entriesToUpdate.size();

		//  Parallel arrays in the list's given order:  names = import-file names;  uservals = the user-entered
		//  display value (null when none). Both feed the algorithm; the user value simply wins as the label.
		final String[] names = new String[ n ];
		final String[] uservals = new String[ n ];
		for ( int i = 0; i < n; i++ ) {
			SearchSubGroup_Name_Display_Computation_Entry entry = entriesToUpdate.get( i );
			names[ i ] = entry.subgroupName_fromImportFile;
			uservals[ i ] = StringUtils.isNotEmpty( entry.subgroupName_Display_FromServer_IfUserEnteredAValue )
					? entry.subgroupName_Display_FromServer_IfUserEnteredAValue : null;
		}

		final String[] labels = computeDisplayLabels( names, uservals, MAX_LENGTH_OF_DISPLAY_STRING );

		for ( int i = 0; i < n; i++ ) {
			entriesToUpdate.get( i ).subgroupName_Display = labels[ i ];
		}

		Collections.sort( entriesToUpdate, new Comparator<SearchSubGroup_Name_Display_Computation_Entry>() {

			@Override
			public int compare(SearchSubGroup_Name_Display_Computation_Entry o1, SearchSubGroup_Name_Display_Computation_Entry o2) {

				if ( o1.getDisplayOrder() == null && o2.getDisplayOrder() == null ) {
					//  Neither entry has Display Order set so sort on Sub Group Name Display (Truncated strings created above)
					return o1.getSubgroupName_Display().compareTo( o2.getSubgroupName_Display() );
				}
				if ( o1.getDisplayOrder() != null && o2.getDisplayOrder() == null ) {
					//  Sort record without sort order after record with sort order
					return -1;
				}
				if ( o1.getDisplayOrder() == null && o2.getDisplayOrder() != null ) {
					//  Sort record without sort order after record with sort order
					return 1;
				}
				if ( o1.getDisplayOrder().intValue() < o2.getDisplayOrder().intValue() ) {
					return -1;
				}
				if ( o1.getDisplayOrder().intValue() > o2.getDisplayOrder().intValue() ) {
					return 1;
				}
				return 0;
			}
		});

	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////
	//  Faithful port of the approved reference implementation (Python new_algorithm + helpers).
	//////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * @param names     import-file name per entry, in the entry list's order (never null/empty per importer invariant)
	 * @param uservals  user-entered display value per entry, or null when none
	 * @param maxLen    hard cap on the label length ({@link #MAX_LENGTH_OF_DISPLAY_STRING})
	 * @return the computed display label per entry, in the same order as {@code names}
	 */
	private String[] computeDisplayLabels( String[] names, String[] uservals, final int maxLen ) {

		final int n = names.length;
		final String[] labels = new String[ n ];
		if ( n == 0 ) {
			return labels;
		}
		if ( n == 1 ) {
			String c = names[ 0 ];
			if ( StringUtils.isNotEmpty( uservals[ 0 ] ) ) {
				labels[ 0 ] = uservals[ 0 ];
			} else {
				labels[ 0 ] = ( c.length() > maxLen ) ? c.substring( c.length() - maxLen ) : c;
			}
			return labels;
		}

		//  Strip the longest common suffix (shared boilerplate/extension) to get the "core" of each name.
		final int suffixLen = commonSuffixLen( names );
		final String[] cores = new String[ n ];
		for ( int i = 0; i < n; i++ ) {
			String nm = names[ i ];
			String core;
			if ( 0 < suffixLen && suffixLen < nm.length() ) {
				core = nm.substring( 0, nm.length() - suffixLen );
			} else {
				core = nm;
			}
			cores[ i ] = ( core != null && ! core.isEmpty() ) ? core : nm;
		}

		//  Token separator = first of SEPARATOR_CHARS (in priority order) present in EVERY core; else char path.
		Character tokenSep = null;
		for ( char s : SEPARATOR_CHARS ) {
			boolean inAll = true;
			for ( String c : cores ) {
				if ( c.indexOf( s ) < 0 ) { inAll = false; break; }
			}
			if ( inAll ) { tokenSep = Character.valueOf( s ); break; }
		}

		//  Sort entry indices by core (stable: ties keep original order, matching Python's stable sort).
		final String[] coresForSort = cores;
		final Integer[] order = new Integer[ n ];
		for ( int i = 0; i < n; i++ ) { order[ i ] = Integer.valueOf( i ); }
		Arrays.sort( order, new Comparator<Integer>() {
			@Override
			public int compare( Integer a, Integer b ) {
				return coresForSort[ a.intValue() ].compareTo( coresForSort[ b.intValue() ] );
			}
		});

		for ( int pos = 0; pos < n; pos++ ) {
			final int i = order[ pos ].intValue();
			if ( StringUtils.isNotEmpty( uservals[ i ] ) ) {
				labels[ i ] = uservals[ i ]; //  user-entered value wins verbatim
				continue;
			}
			final String c = cores[ i ];
			//  k = longest common prefix with the nearest sorted neighbour (prev/next).
			int k = 0;
			if ( pos > 0 ) {
				k = Math.max( k, lcpLen( c, cores[ order[ pos - 1 ].intValue() ] ) );
			}
			if ( pos < n - 1 ) {
				k = Math.max( k, lcpLen( c, cores[ order[ pos + 1 ].intValue() ] ) );
			}
			int anchor;
			if ( tokenSep != null ) {
				//  Start of the token containing position k: last separator strictly before k, +1.
				int b = c.substring( 0, k ).lastIndexOf( tokenSep.charValue() );
				anchor = ( b != -1 ) ? b + 1 : 0;
			} else {
				anchor = Math.max( 0, k - 4 );
			}
			if ( anchor >= c.length() ) {
				anchor = 0;
			}
			int end = Math.min( c.length(), anchor + maxLen );
			String label = stripSeparators( c.substring( anchor, end ) );
			if ( label.isEmpty() ) {
				label = c.substring( 0, Math.min( maxLen, c.length() ) );
			}
			labels[ i ] = label;
		}

		resolveCollisions( labels, cores, maxLen );
		ensureUnique( labels, maxLen ); //  guaranteed backstop

		return labels;
	}

	/** Longest common prefix length of two strings. */
	private int lcpLen( String a, String b ) {
		int m = Math.min( a.length(), b.length() );
		int i = 0;
		while ( i < m && a.charAt( i ) == b.charAt( i ) ) {
			i++;
		}
		return i;
	}

	/** Length of the longest suffix common to ALL names. */
	private int commonSuffixLen( String[] names ) {
		String first = names[ 0 ];
		int k = 0;
		while ( k < first.length() ) {
			char ch = first.charAt( first.length() - 1 - k );
			for ( String nm : names ) {
				if ( k >= nm.length() || nm.charAt( nm.length() - 1 - k ) != ch ) {
					return k;
				}
			}
			k++;
		}
		return k;
	}

	/** Trim any leading/trailing {@link #SEPARATOR_CHARS} from the string. */
	private String stripSeparators( String s ) {
		int start = 0;
		int end = s.length();
		while ( start < end && isSeparatorChar( s.charAt( start ) ) ) {
			start++;
		}
		while ( end > start && isSeparatorChar( s.charAt( end - 1 ) ) ) {
			end--;
		}
		return s.substring( start, end );
	}

	private boolean isSeparatorChar( char ch ) {
		for ( char c : SEPARATOR_CHARS ) {
			if ( c == ch ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Resolve duplicate labels within the group: first try a longer window (still &le; maxLen) of the core
	 * that is unique; then a per-rank counter backstop (base truncated so base+counter &le; maxLen).
	 * Repeats up to 10 passes. Port of Python {@code _resolve_collisions}.
	 */
	private void resolveCollisions( String[] labels, String[] cores, final int maxLen ) {
		final int n = labels.length;
		for ( int iter = 0; iter < 10; iter++ ) {

			//  Bucket indices by current label, in first-occurrence order.
			Map<String, List<Integer>> buckets = bucketByLabel( labels );

			//  Collect the still-duplicated labels, in first-occurrence order.
			Map<String, List<Integer>> dups = new LinkedHashMap<>();
			for ( Map.Entry<String, List<Integer>> en : buckets.entrySet() ) {
				if ( en.getValue().size() > 1 ) {
					dups.put( en.getKey(), en.getValue() );
				}
			}
			if ( dups.isEmpty() ) {
				return;
			}

			//  Try to lengthen each colliding label to a still-unique window within the cap.
			for ( Map.Entry<String, List<Integer>> en : dups.entrySet() ) {
				String lb = en.getKey();
				for ( int i : en.getValue() ) {
					String c = cores[ i ];
					int start = c.indexOf( lb );
					if ( start < 0 ) {
						start = 0;
					}
					int endMax = Math.min( c.length(), start + maxLen );
					for ( int end = start + lb.length() + 1; end <= endMax; end++ ) {
						String cand = c.substring( start, end );
						boolean unique = true;
						for ( int j = 0; j < n; j++ ) {
							if ( j != i && cand.equals( labels[ j ] ) ) {
								unique = false;
								break;
							}
						}
						if ( unique ) {
							labels[ i ] = cand;
							break;
						}
					}
					//  Nothing longer-within-cap helped; leave for the counter pass below.
				}
			}

			//  Counter fallback (capped at maxLen) for whatever is still duplicated.
			Map<String, List<Integer>> buckets2 = bucketByLabel( labels );
			for ( Map.Entry<String, List<Integer>> en : buckets2.entrySet() ) {
				List<Integer> idxs = en.getValue();
				if ( idxs.size() > 1 ) {
					String lb = en.getKey();
					int rank = 1;
					for ( int i : idxs ) {
						String suffix = Integer.toString( rank );
						int baseLen = Math.max( 0, maxLen - suffix.length() );
						String base = lb.substring( 0, Math.min( baseLen, lb.length() ) );
						labels[ i ] = base + suffix;
						rank++;
					}
				}
			}
		}
	}

	/**
	 * Guarantee global uniqueness within the group: on any repeat, append a growing counter, truncating the
	 * base so the result never exceeds maxLen. Port of Python {@code _ensure_unique}.
	 */
	private void ensureUnique( String[] labels, final int maxLen ) {
		Set<String> used = new HashSet<>();
		for ( int i = 0; i < labels.length; i++ ) {
			String lb = labels[ i ];
			if ( ! used.contains( lb ) ) {
				used.add( lb );
				continue;
			}
			int counter = 1;
			while ( true ) {
				String suffix = Integer.toString( counter );
				int cut = maxLen - suffix.length();
				String base = ( lb.length() > cut ) ? lb.substring( 0, Math.max( 0, cut ) ) : lb;
				String cand = base + suffix;
				if ( ! used.contains( cand ) ) {
					labels[ i ] = cand;
					used.add( cand );
					break;
				}
				counter++;
			}
		}
	}

	/** Bucket the label indices by label value, preserving first-occurrence (index) order. */
	private Map<String, List<Integer>> bucketByLabel( String[] labels ) {
		Map<String, List<Integer>> buckets = new LinkedHashMap<>();
		for ( int i = 0; i < labels.length; i++ ) {
			List<Integer> list = buckets.get( labels[ i ] );
			if ( list == null ) {
				list = new ArrayList<>();
				buckets.put( labels[ i ], list );
			}
			list.add( Integer.valueOf( i ) );
		}
		return buckets;
	}

}
