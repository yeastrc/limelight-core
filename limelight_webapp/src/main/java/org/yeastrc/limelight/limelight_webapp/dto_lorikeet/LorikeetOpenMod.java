package org.yeastrc.limelight.limelight_webapp.dto_lorikeet;

import java.util.List;

/**
 * Open Modification for Lorikeet, 
 *
 * Lorikeet supports more properties ("losses" being one of them).
 *     Need to research them before adding them.
 * 
 */
public class LorikeetOpenMod {
	
	/**
	 * mass of the Open Modification,
	 */
	private double modMass;

	private List<LorikeetOpenModPosition> positions;

	/**
	 * mass of the Open Modification
	 * @return
	 */
	public double getModMass() {
		return modMass;
	}

	/**
	 * mass of the Open Modification
	 * 
	 * @param modMass
	 */
	public void setModMass(double modMass) {
		this.modMass = modMass;
	}
	public List<LorikeetOpenModPosition> getPositions() {
		return positions;
	}

	public void setPositions(List<LorikeetOpenModPosition> positions) {
		this.positions = positions;
	}


	/**
	 * Single Position for the Open Modification
	 *
	 */
	public static class LorikeetOpenModPosition {

		/**
		 * Open Modification Position, One (1) based.
		 */
		private int index;

		private boolean is_N_Terminal;
		private boolean is_C_Terminal;

		/**
		 * Amino Acid at the position, One (1) based
		 */
		private String aminoAcid;
		
		/**
		 * Open Modification Position, One (1) based,
		 * @return
		 */
		public int getIndex() {
			return index;
		}

		/**
		 * Open Modification Position, One (1) based,
		 * 
		 * @param index
		 */
		public void setIndex(int index) {
			this.index = index;
		}

		/**
		 * Amino Acid at the position for the Open Modification,
		 * 
		 * @return
		 */
		public String getAminoAcid() {
			return aminoAcid;
		}

		/**
		 * Amino Acid at the position for the Open Modification
		 * 
		 * @param aminoAcid
		 */
		public void setAminoAcid(String aminoAcid) {
			this.aminoAcid = aminoAcid;
		}

		public boolean isIs_N_Terminal() {
			return is_N_Terminal;
		}

		public void setIs_N_Terminal(boolean is_N_Terminal) {
			this.is_N_Terminal = is_N_Terminal;
		}

		public boolean isIs_C_Terminal() {
			return is_C_Terminal;
		}

		public void setIs_C_Terminal(boolean is_C_Terminal) {
			this.is_C_Terminal = is_C_Terminal;
		}

	}

}
