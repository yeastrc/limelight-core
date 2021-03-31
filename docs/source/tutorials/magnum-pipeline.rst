=================================
Magnum Protein Adduct Pipeline
=================================

This tutorial covers how to run the pipeline for protein adduct discovery and visualization
using **Magnum**, **Percolator**, and uploading to **Limelight** as discussed in:

  .. epigraph::
   Riffle M, Hoopmann M, et al (2021)...

This tutorial assumes you have Docker installed on your system. Please see our :ref:`Docker Installation Tutorial <Installing Docker>`
to get Docker installed. Because Docker is being used, you **do not need to install Magnum, Percolator, or
the Limelight XML converter**.

For simplicity in this tutorial, we will assume all necessary files are in the same folder. Examples of commands
will be given using a Linux or macOS command line. Windows user may access their Linux command line using the
instructions in our :ref:`Docker Installation Tutorial <Installing Docker>`

Organize Your Project Folder
=============================

 1. Create a project folder

    .. code-block:: bash

       mkdir ~/my-project
       cd ~/my-project

 2. Copy the necessary files for Magnum into the project directory

    .. code-block:: bash

       # get the FASTA file
       cp /location/of/fasta/yeast.fasta ./yeast.fasta

       # get the spectral data
       cp /location/of/mzml/spectra.mzml ./spectra.mzml

    Note, if you are on Windows: It's likely your files are on the ``C:`` or ``D:`` drives. To copy files
    from that location use:

    .. code-block:: bash

       # get the FASTA file from C:\location\of\fasta\yeast.fasta
       cp /mnt/c/location/of/fasta/yeast.fasta ./yeast.fasta

       # get the spectral data from D:\location\of\mzml\spectra.mzml
       cp /mnt/d/location/of/mzml/spectra.mzml ./spectra.mzml

Run Magnum
=================

 1. Ensure you are in your project directory (where you copied the files above).

    .. code-block:: bash

       cd ~/my-project

 2. Generate a default ``Magnum.conf`` file.

    .. code-block:: bash

       sudo docker run --rm -it --user $(id -u):$(id -g) -v `pwd`:`pwd` -w `pwd`  mriffle/magnum -p

 3. Edit the ``Magnum.conf`` file with your favorite editor. Here we assume your favorite editor is ``nano``.

    .. code-block:: bash

       nano Magnum.conf

 4. Change the following configuration settings in the file:

    a. Change MS_data_file to the spectral file you copied into your project directory.

    .. code-block:: none

      MS_data_file = spectra.mzml

    b. Specify additional output formats.

    .. code-block:: none

      export_percolator = 1
      export_pepXML = 1

    c. Change database to the FASTA file you copied into your project directory.

    .. code-block:: none

      database = yeast.fasta

    d. Set other parameters as necessary. `Visit the Magnum Configuration Website <http://magnum-ms.org/docs/config.html>`_ for details about how to configure Magnum.

    e. Save Magnum.conf and exit the text editor. In ``nano`` this is ``Control-o``, ``Enter Key``, then ``Control-x``.

 5. Run the Magnum search.

    .. code-block:: bash

       sudo docker run --rm -it --user $(id -u):$(id -g) -v `pwd`:`pwd` -w `pwd` mriffle/magnum ./Magnum.conf

    You should see Magnum output its progress as it searches the file.

`Visit the official Magnum website <https://magnum-ms.org/>`_ for more information about Magnum.

Run Percolator
===================
In the above example, Magnum would have generated a file named ``spectra.perc.txt``. It will have the prefix of your
mzml file name and the suffix of ``.perc.txt``. This is the input file for the Percolator post processing
software. To run percolator enter:

    .. code-block:: bash

      sudo docker run --rm -it --user $(id -u):$(id -g) -v `pwd`:`pwd` -w `pwd` mriffle/percolator:3.05 -X percout.xml spectra.perc.txt

This will generate a file named ``percout.xml`` that contains the percolator results in XML format.

`Visit the official Percolator website <http://percolator.ms/>`_ for more information about Percolator.


Convert results to Limelight XML
=================================
To import data into Limelight, it must be converted to a Limelight XML file. After running the above steps you should
have the following files (plus others) in your project directory:

 1. ``Magnum.conf`` - configuration file used by Magnum
 2. ``spectra.pep.xml`` - Magnum search results in pepxml format. This will have the prefix of your mzml file name
    and the suffix of ``pep.xml``.
 3. ``percout.xml`` - The results from running percolator.
 4. ``yeast.fasta`` - The FASTA file you used to perform the Magnums earch.

To generate the Limelight XML file, enter the following:

    .. code-block:: bash

      sudo docker run --rm -it --user $(id -u):$(id -g) -v `pwd`:`pwd` -w `pwd` mriffle/magnum-percolator-to-limelight -c ./Magnum.conf -p ./percout.xml -f ./yeast.fasta -m ./spectra.pep.xml -o limelight.xml

Here is that same command in multi-line format with comments. Note the command below won't run as-is, it is only
meant to show you which parameters are being used in the event that you need to change the values.

    .. code-block:: bash

      sudo docker run --rm -it --user $(id -u):$(id -g) -v `pwd`:`pwd` -w `pwd` mriffle/magnum-percolator-to-limelight\
        -c ./Magnum.conf     # the Magnum configuration file
        -p ./percout.xml     # the output from percolator
        -f ./yeast.fasta     # the FASTA file used in the search
        -m ./spectra.pep.xml # the Magnum results
        -o limelight.xml     # the limelight XML file that will be created

You should now have a ``limelight.xml`` file that will be used to import the results into Limelight.

`Visit the converter GitHub repository <https://github.com/yeastrc/limelight-import-magnum-percolator>`_ for more
details about this converter.


Upload to Limelight
==========================
To view the results in Limelight, use the Limelight web interface to upload the Limelight XML and (optionally)
the mzml file.

      .. note::
         If you are using Windows, this step is greatly simplified by first copying your Limelight XML file to a
         Windows filesystem drive, such as ``C:\``. To do this enter the following into the Linux terminal:

         .. code-block:: bash

          cp ~/my-project/limelight.xml /mnt/c/data_directory/limelight.xml

         Where ``data_directory`` is a directory of your choice. This is the file's location that you will
         upload to Limelight.


Steps to upload your data to Limelight:

 1. Log into Limelight

 2. Navigate to an existing project or create a new project.

 3. Scroll down to the ``Upload Data`` section and click the arrow on the left to expand the section.

     .. image:: /_static/share-data-section.png

 4. Click the ``Import Limelight XML File`` button. You should see the following dialog appear:

     .. image:: /_static/import-limelight-xml.png

 5. Click on the ``+Add Limelight XML File`` link and select your Limelight XML file on your computer.

 6. (Optional) Click on the ``+Add Scan File`` link and select your mzml file on your computer. This is required
    if you would like to view spectra associated with peptide identifications.

 7. Click the ``Submit Upload`` button to submit your data to Limelight.

After several minutes, refresh the page and your search should appear under the ``Explore Data`` section
of the project page. Click on the ``Peptides``, ``Proteins``, or ``Modifications`` links to view the
data.
