=========================
Welcome to Limelight
=========================

**Limelight** is a web application for analyzing, visualizing, and sharing and bottom-up proteomics results.

Citing
===============
If you use Limelight in your work, please cite:

  .. epigraph::
   `Discovery and visualization of uncharacterized drug-protein adducts using mass spectrometry. Michael Riffle, Michael R. Hoopmann, Daniel Jaschob, Guo Zhong, Robert L. Moritz, Michael J. MacCoss, Trisha N. Davis, Nina Isoherranen, Alex Zelter bioRxiv 2021.06.24.449838; doi: https://doi.org/10.1101/2021.06.24.449838 <https://www.biorxiv.org/content/10.1101/2021.06.24.449838v1>`_


Getting Help, Providing Feedback, or Reporting Problems
=======================================================
If after reading this documentation you have questions about Limelight, ideas for new features, or want to report any problems, please contact us!

* Try using the `Limelight Issue Page at GitHub <https://github.com/yeastrc/limelight-core/issues>`_.
* You can `join our Slack <https://join.slack.com/t/limelight-ms/shared_invite/zt-pdkll4k3-YR5km0ppSrtdlZCJBvgVyQ>`_ and chat with us.
* You can email us at limelightms@uw.edu


Introduction
=============

**Limelight** is designed to provide you with the full-stack of proteomics results, regardless of which processing
pipeline you used to search your data. Full-stack means that you have access to the global views of your
data (such as statistically comparing conditions), to viewing lists of proteins and peptides, to individual PSMs
and spectra--all showing the native scores from whichever pipeline you used. Additionally, all native scores from
your pipeline are available to you for filtering--even when contrasting multiple searches that each used different
pipelines.


Tutorials for Running Pipeline
==================================
We have developed tutorials to accompany Riffle M, Hoopmann M, et al. (2021) that describe the process for
running the Magnum, Percolator, Limelight pipeline; and how to then perform the statistical test for finding
mods of interest in Limelight. Please see our :ref:`Tutorials Page <Tutorials>`

.. toctree::
   :maxdepth: 2

   self
   using-limelight
   tutorials
   administration

