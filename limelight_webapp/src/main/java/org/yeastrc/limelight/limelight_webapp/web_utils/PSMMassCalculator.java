package org.yeastrc.limelight.limelight_webapp.web_utils;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.dto.IsotopeLabelDTO;
import org.yeastrc.limelight.limelight_shared.dto.StaticModDTO;
import org.yeastrc.proteomics.mass.MassUtils.MassType;
import org.yeastrc.proteomics.peptide.atom.AtomUtils;
import org.yeastrc.proteomics.peptide.isotope_label.IsotopeAbundanceCalculator;
import org.yeastrc.proteomics.peptide.isotope_label.LabelFactory;
import org.yeastrc.proteomics.peptide.peptide.Peptide;
import org.yeastrc.proteomics.peptide.peptide.PeptideMassCalculator;

/**
 * Copied from Proxl
 * 
 * See Proxl if add 
 *
 */
@Component
public class PSMMassCalculator {

	/**
	 * Params Class
	 *
	 */
	public static class PSMMassCalculatorParams {

		private Double precursorMZ;
		
		private PSMMassCalculator_PeptideSequence peptideSequence;

		private List<PSMMassCalculator_DynamicOpenModificationMass> dynamicOpenModMasses;

		private IsotopeLabelDTO label;
				
		private List<StaticModDTO> staticMods;

		private Integer charge;

		public Double getPrecursorMZ() {
			return precursorMZ;
		}

		public void setPrecursorMZ(Double precursorMZ) {
			this.precursorMZ = precursorMZ;
		}

		public IsotopeLabelDTO getLabel() {
			return label;
		}

		public void setLabel(IsotopeLabelDTO label) {
			this.label = label;
		}

		public List<StaticModDTO> getStaticMods() {
			return staticMods;
		}

		public void setStaticMods(List<StaticModDTO> staticMods) {
			this.staticMods = staticMods;
		}

		public Integer getCharge() {
			return charge;
		}

		public void setCharge(Integer charge) {
			this.charge = charge;
		}


		public List<PSMMassCalculator_DynamicOpenModificationMass> getDynamicOpenModMasses() {
			return dynamicOpenModMasses;
		}

		public void setDynamicOpenModMasses(List<PSMMassCalculator_DynamicOpenModificationMass> dynamicOpenModMasses) {
			this.dynamicOpenModMasses = dynamicOpenModMasses;
		}

		public PSMMassCalculator_PeptideSequence getPeptideSequence() {
			return peptideSequence;
		}

		public void setPeptideSequence(PSMMassCalculator_PeptideSequence peptideSequence) {
			this.peptideSequence = peptideSequence;
		}
		
	}

	public static class PSMMassCalculator_DynamicOpenModificationMass {
		
		private double mass;

		public double getMass() {
			return mass;
		}

		public void setMass(double mass) {
			this.mass = mass;
		}

	}
	
	public static class PSMMassCalculator_PeptideSequence {
		
		private String sequence;

		public String getSequence() {
			return sequence;
		}

		public void setSequence(String sequence) {
			this.sequence = sequence;
		}
	}

	
	/**
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public double calculatePPMEstimateForPSM( PSMMassCalculatorParams params ) throws Exception {
		
		if( params.getCharge() == null )
			throw new Exception( "charge cannot be null." );
		
		if( params.getPrecursorMZ() == null )
			throw new Exception( "precursorMZ cannot be null." );
			
		if( params.getPeptideSequence() == null )
			throw new Exception( "peptide1 cannot be null." );
		
		
		double mass = calculateTheoreticalNeutralMassForPSM( params );

		double precusorMZ = params.getPrecursorMZ();
		double calcMZ = getMZ( mass, params.getCharge() );
		int charge = params.getCharge();
				
		Map< BigDecimal, Double > massShiftProbabilities = getMassShiftProbabilities( params );
		
		if( calcMZ > precusorMZ ) {
			for( BigDecimal massShift : massShiftProbabilities.keySet() ) {

				double totalNeutralMass = mass - massShift.doubleValue();
				double totalMoverZ = getMZ( totalNeutralMass, charge );
					
				if( Math.abs( precusorMZ - totalMoverZ ) < Math.abs( precusorMZ - calcMZ ) ) {
					calcMZ = totalMoverZ;
				}
			}
		} else {
			for( BigDecimal massShift : massShiftProbabilities.keySet() ) {
				
				double totalNeutralMass = mass + massShift.doubleValue();
				double totalMoverZ = getMZ( totalNeutralMass, charge );
					
				if( Math.abs( precusorMZ - totalMoverZ ) < Math.abs( precusorMZ - calcMZ ) ) {		
					calcMZ = totalMoverZ;
				}
			}
		}

		return getPPMError( precusorMZ, calcMZ );	
	}


	/**
	 * Calculate the theoretical neutral mass for the peptide ion associated with a particular PSM. For cross-links
	 * this will be both peptides linked together with a cross-linker.
	 * 
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public static double calculateTheoreticalNeutralMassForPSM( PSMMassCalculatorParams params ) throws Exception {
		
		double mass = 0.0;
		
		if( params.getPeptideSequence() == null )
			throw new Exception( "peptide cannot be null" );
		
		Peptide peptide = null;
		
		if( params.getLabel() != null ) {
			peptide = new Peptide( params.getPeptideSequence().getSequence(), LabelFactory.getInstance().getLabel( params.getLabel().getName() ) );
		} else {
			peptide = new Peptide( params.getPeptideSequence().getSequence() );
		}
		
		mass += getTotalMassWithMods( peptide, params.getStaticMods(), params.getDynamicOpenModMasses() );
				
		return mass;
	}
	
	/**
	 * Get the mass of the peptide, including the static mods and dynamic mods.
	 * 
	 * @param peptide The YRC proteomics utils peptide, which should have the label set (if any)
	 * @param staticMods The static mods in the experiment
	 * @param dynamicModMasses The dynamic mods found for this peptide for this PSM
	 * @return
	 * @throws Exception
	 */
	private static double getTotalMassWithMods( Peptide peptide, List<StaticModDTO> staticMods, List<PSMMassCalculator_DynamicOpenModificationMass> dynamicModMasses ) throws Exception {
		
		double mass = PeptideMassCalculator.getInstance().getMassForPeptide( peptide, MassType.MONOISOTOPIC );
		
		// add in the dynamic mods
		if( dynamicModMasses != null && dynamicModMasses.size() > 0 ) {
			for( PSMMassCalculator_DynamicOpenModificationMass mod : dynamicModMasses ) {
				mass += mod.getMass();
			}
		}
		
		// add in the static mods
		if( staticMods != null && staticMods.size() > 0 ) {
			for( StaticModDTO staticMod : staticMods ) {
				double staticMass = staticMod.getMass().doubleValue();
				int count = getNumberOfTimesResidueOccurs( staticMod.getResidue(), peptide.getSequence() );
				
				mass += staticMass * count;
			}
		}
		
		return mass;
		
	}
	
	/**
	 * @param residue
	 * @param sequence
	 * @return
	 */
	private static int getNumberOfTimesResidueOccurs( String residue, String sequence ) {
		return StringUtils.countMatches( sequence,  residue );
	}

	/**
	 * Get what the m/z would be for applying the supplied charge to the given neutral mass
	 * @param mass
	 * @param charge
	 * @return
	 * @throws Exception
	 */
	private static double getMZ( double mass, int charge ) throws Exception {
		
		// add in the mass of the protons (charge == number of proteins)
		mass += charge * AtomUtils.getAtom( "p" ).getMass( MassType.MONOISOTOPIC );

		// divide by the charge
		mass /= charge;

		return mass;	
		
	}
	
	/**
	 * Calculate the error in PPM for the supplied observed m/z given the supplied calculated m/z
	 * @param obsMZ Observed m/z
	 * @param calcMZ Calculated m/z
	 * @return
	 */
	private static double getPPMError( double obsMZ, double calcMZ ) {
		return ( obsMZ - calcMZ ) / calcMZ * 1000000;
	}
	
	
	/**
	 * @param params
	 * @return
	 * @throws Exception
	 */
	private static Map< BigDecimal, Double > getMassShiftProbabilities( PSMMassCalculatorParams params ) throws Exception {
		
		Collection< Peptide > peptides = new HashSet<>();
		
		{
			Peptide peptide = null;
			if( params.getLabel() != null ) {
				peptide = new Peptide( params.getPeptideSequence().getSequence(), LabelFactory.getInstance().getLabel( params.getLabel().getName() ) );
			} else {
				peptide = new Peptide( params.getPeptideSequence().getSequence() );
			}
				
			peptides.add( peptide );
		}
		
		return IsotopeAbundanceCalculator.getInstance().getIsotopMassShiftProbabilities( peptides, params.getCharge(), 1E-5 );		
	}
	
}
