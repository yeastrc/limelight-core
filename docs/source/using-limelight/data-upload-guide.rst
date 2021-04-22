====================================
How to Upload Data to Limelight
====================================
Follow these steps to upload your data to Limelight.

Convert to Limelight XML
=============================
Before search results can be uploaded to Limelight, they must be converted to Limelight XML. Please
see our :doc:`conversion-guide` guide for more information.

Upload via Limelight Web Site
=============================
The simplest option for uploading data is to upload through the Limelight web interface. Just
follow these steps:

    1. Log into Limelight

    2. Navigate to an existing project or create a new project.

    3. Scroll down to the ``Upload Data`` section and click the arrow on the left to expand the section.

     .. image:: /_static/share-data-section.png

    4. Click the ``Import Limelight XML File`` button. You should see the following dialog appear:

     .. image:: /_static/import-limelight-xml.png

    5. Enter a description of this run. E.g., ``Treated``.

    6. Click on the ``+Add Limelight XML File`` link and select your Limelight XML file on your computer.

    7. (Optional) Click on the ``+Add Scan File`` link and select the corresponding mzXML (or mzXML) file on your computer. This is required if you would like to view spectra associated with peptide identifications.

    8. Click the ``Submit Upload`` button to submit your data to Limelight.

After several minutes, refresh the page and your search should appear under the ``Explore Search Results`` section
of the project page. Click on the ``Peptides``, ``Proteins``, or ``Modifications`` links to view the data.

Upload via Command Line
========================
You may also upload to Limelight directly from the command line of your computer or server. This is useful for
automating the upload of a large number of files, or if the server has a faster connection to Limelight. Follow
these steps to upload from the command line.

Obtain the submission Java program
-----------------------------------
If you haven't already, download the submission program. This is the program you will run on the command
line to send data to Limelight.

1. Log into Limelight
2. Navigate to an existing project or create a new project.
3. Scroll down to the ``Upload Data`` section and click the arrow on the left to expand the section.
4. Click the ``Command Line Import Info`` button.

    .. image:: /_static/command-line-import-button.png

5. In the window that opens, click the ``Submit Import Program`` link to download the import program. Save it
   to a location on your computer that you will remember.

    .. image:: /_static/command-line-import-program.png

   Alternatively, you can download it using ``wget`` in your terminal. Right-click on the ``Submit Import Program``,
   copy the link address to your clipboard and type the following into your terminal:

    .. code-block:: bash

        wget <paste link address>

        # for example:
        wget https://limelight.yeastrc.org/limelight/static/limelightSubmitImport/limelightSubmitImport.jar


Run the submission Java program
-----------------------------------
Follow these directions to run the command line submission program.

1. Ensure Java is installed on the system where you will be running the submission program. If it is not installed,
   see the `official download site for Java <https://www.java.com/en/download/>`_.

2. Following the first 4 steps above, note the following highlighted information in the ``Command Line Import Information``
   window:

    .. image:: /_static/command-line-import-info.png

   This information is needed to upload data to this project. The first line is the URL of this Limelight
   installation URL, the second line is the project id number for this project, and the third line is an
   unguessable key that provides access to upload data to this project. You can save this information
   for future use, without logging into Limelight.

   Be ready to copy and paste this information into the command for running the submission program (below).

3. Run the command line submission program. The command to run the importer is the following. You will need to
replace the locations of the limelightSubmitImport.jar, your Limelight XML file, and your mzML file(s)
to your actual locations. You will also need to replace lines 2, 3, and 4 with what you copied from step
2 above.

    .. code-block:: bash

        # the command line program if you DO have scan file(s)
        java -jar /location/to/limelightSubmitImport.jar \
                  --limelight-web-app-url=https://limelight.yeastrc.org/limelight \
                  --project-id=7 \
                  --user-submit-import-key=12dee46123ceb09c61af8d34a9151c512657cf7f39 \
                  --limelight-xml-file=/location/to/limelight.xml \
                  --scan-file=/location/to/your.mzML

        # --scan-file can be repeated multiple times if you have multiple mzML files in the search results.

If you do not have scan files to upload, the command would be the following:

    .. code-block:: bash

        # the command line program if you DO NOT have scan file(s)
        java -jar /location/to/limelightSubmitImport.jar \
                  --limelight-web-app-url=https://limelight.yeastrc.org/limelight \
                  --project-id=7 \
                  --user-submit-import-key=12dee46123ceb09c61af8d34a9151c512657cf7f39 \
                  --limelight-xml-file=/location/to/limelight.xml \
                  --no-scan-files

