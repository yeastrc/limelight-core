===========================================================
Find Statistically Significant Modifications with Limelight
===========================================================

This tutorial covers how to use Limelight to compare the results of two searches (treated and untreated) to find
the modifications with the most statistically significant differences (in terms of their spectral counts) between
the two conditions. This is the method employed in the following publication:

  .. epigraph::
   Discovery and visualization of uncharacterized drug-protein adducts using mass spectrometry. Riffle M,
   Hoopmann MR, Jaschob D, Zhong G, Mortiz RL, MacCoss MJ, Davis TN, Isoherranen N, Zelter A. 2021. *Submitted*

This tutorial will assume the user has completed our :ref:`Magnum Pipeline Tutorial <Magnum Protein Adduct Pipeline>`
to generate a ``treated.limelight.xml`` file, and has completed the optional step to produce the
``untreated.limelight.xml`` file.

Upload Data to Limelight
=========================
Although uploading data is covered in our :ref:`Magnum Pipeline Tutorial <Magnum Protein Adduct Pipeline>`, we will
repeat those steps here. If you have already uploaded your ``treated.limelight.xml`` and ``untreated.limelight.xml``
files to Limelight, skip this step.

      .. note::
         If you are using Windows, this step is greatly simplified by first copying your Limelight XML files to a
         Windows filesystem drive, such as ``C:\``. To copy ``treated.limelight.xml`` and ``untreated.limelight.xml``
         to ``C:\data_directory\`` you would enter the following into your terminal.

         .. code-block:: bash

          cp ~/my-project/treated.limelight.xml /mnt/c/data_directory/treated.limelight.xml
          cp ~/my-project/untreated.limelight.xml /mnt/c/data_directory/untreated.limelight.xml

          # Optional: You must upload your mzML files to view spectra. Copy to C:\ for upload later
          cp ~/my-project/treated.mzML /mnt/c/data_directory/treated.mzML
          cp ~/my-project/untreated.mzML /mnt/c/data_directory/untreated.mzML

         ``/mnt/c/`` corresponds to your ``C:\`` drive. ``/mnt/d/`` corresponds to your ``D:\`` drive, and so on.


Steps to upload your data to Limelight:

 1. Log into Limelight

 2. Navigate to an existing project or create a new project.

 3. Scroll down to the ``Upload Data`` section and click the arrow on the left to expand the section.

     .. image:: /_static/share-data-section.png

 4. Click the ``Import Limelight XML File`` button. You should see the following dialog appear:

     .. image:: /_static/import-limelight-xml.png

 5. Enter a description of this run. E.g., ``Treated``.

 6. Click on the ``+Add Limelight XML File`` link and select your ``treated.limelight.xml`` on your computer.

 7. (Optional) Click on the ``+Add Scan File`` link and select your ``treated.mzML`` file on your computer. This is required
    if you would like to view spectra associated with peptide identifications.

 8. Click the ``Submit Upload`` button to submit your data to Limelight.

 9. Repeat steps 4-6 for your ``unreated.limelight.xml`` and, optionally, your ``untreated.mzML`` file.

After several minutes, refresh the page and your searches should appear under the ``Explore Data`` section
of the project page.

Navigate to the Mod View Page
==============================
Once your data are imported, the searches will appear under the ``Explore Data`` section:

     .. image:: /_static/tutorials/explore-data.png

You will see your two searches listed here. To find the modifications with significantly different
spectral counts between the searches, click the check box next to each search and click the
``Compare Mod View`` button:

     .. image:: /_static/tutorials/explore-data-merged-mod-button.png

Change Visualization Options
==============================
By default the mod page will show the following:

     .. image:: /_static/tutorials/mod-view-default.png

The heat map shows the spectral count for all PSMs with a given mod mass in each of the two searches. In this
example, the spectral counts for 0, 16, and 57 are drowning out the signal for the open modification masses, which
will have a modification mass of 60 or higher.

To restrict the mod masses to those with a mass of 60 or higher, change the minimum mod mass to 60 and click the
``Update Visualization`` button, as depicted below:

     .. image:: /_static/tutorials/mod-view-change-options.png

The page should update to the following:

     .. image:: /_static/tutorials/mod-view-interesting-bands.png

The heat map is more informative. Note the bands that appear near 470 in the treated sample, but not the untreated
sample.

Run the Report
===============
To run a statistical analysis comparing the spectral counts for mod masses in the two searches, click the
``View ZScore Report`` link below the data visualization:

     .. image:: /_static/tutorials/mod-view-report-link.png

This will compare the ratio of PSMs that have a given mod mass to all PSMs in each search using a test for
proportions and produce the following report:

     .. image:: /_static/tutorials/significant-mods-table.png

This report is ordered by the magnitude of the Z-score. Note that the modification masses 469, 470, and 471 have
the most significant Z-scores. A negative Z-score in this case denotes enrichment in the treated sample.
