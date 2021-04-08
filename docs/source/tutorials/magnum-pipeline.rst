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

We have also made example data input files available, and the steps below include downloading those.

Set Up Your Project Folder
=============================

 1. Open up a terminal. If you are on Windows, follow the directions on our :ref:`Docker Installation Tutorial <Installing Docker>`
    to open a Linux terminal.

 2. Create a project folder

    .. code-block:: bash

       mkdir ~/my-project
       cd ~/my-project

 3. Copy the example input data into the project folder

    .. code-block:: bash

       # download data from Google Drive into your project directory
       wget --load-cookies /tmp/cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget --quiet --save-cookies /tmp/cookies.txt --keep-session-cookies --no-check-certificate 'https://docs.google.com/uc?export=download&id=13IeYZu2Jb71VjBlw2BxFMO-3yFJV33Jl' -O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\1\n/p')&id=13IeYZu2Jb71VjBlw2BxFMO-3yFJV33Jl" -O treated.tgz && rm -rf /tmp/cookies.txt
       tar -xvzf treated.tgz

    .. note::
       If you are using macOS, you may not have ``wget`` installed on your system so the above step may fail. You can
       download ``treated.tgz`` using a web browser using
       `this link <https://drive.google.com/file/d/13IeYZu2Jb71VjBlw2BxFMO-3yFJV33Jl/view?usp=sharing>`_, and then save
       it to your project directory and run ``tar -xvzf treated.tgz``. You can alternatively install ``wget`` using
       Homebrew by typing the following:

         .. code-block:: bash

          # install Brew (if it is not installed)
          ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

          # install wget
          brew install wget


    If the above was successful, you can delete ``treated.tgz``

    .. code-block:: bash

       rm treated.tgz

    You should now have three files in your project directory:

    1. ``SearchDatabase.fasta`` - A FASTA-formatted text file containing protein sequences to be searched.
    2. ``treated-Magnum.conf`` - A Magnum configuration file, pre-configured for this tutorial. For more information
       about configuring Magnum, `visit the Magnum configuration website <http://magnum-ms.org/docs/config.html>`_.
    3. ``treated.mzML`` - The raw data from the mass spectrometer converted to mzML format.


Run Magnum
=================

 1. Ensure you are in your project directory (where you copied the files above).

    .. code-block:: bash

       cd ~/my-project

 2. Run the Magnum search.

    .. code-block:: bash

       sudo docker run --rm -it --user $(id -u):$(id -g) -v `pwd`:`pwd` -w `pwd` mriffle/magnum:alpha3 ./treated-Magnum.conf

    You should see Magnum output its progress as it searches the file.

`Visit the official Magnum website <https://magnum-ms.org/>`_ for more information about Magnum.

Run Percolator
===================
In the above example, Magnum would have generated a file named ``treated.perc.txt``. This is the input file for
the Percolator post processing software. To run percolator enter:

    .. code-block:: bash

      sudo docker run --rm -it --user $(id -u):$(id -g) -v `pwd`:`pwd` -w `pwd` mriffle/percolator:3.05 -X percout.xml treated.perc.txt

This will generate a file named ``percout.xml`` that contains the percolator results in XML format.

`Visit the official Percolator website <http://percolator.ms/>`_ for more information about Percolator.


Convert results to Limelight XML
=================================
To import data into Limelight, it must be converted to a Limelight XML file. After running the above steps you should
have the following files (plus others) in your project directory:

 1. ``treated-Magnum.conf`` - configuration file used by Magnum
 2. ``treated.pep.xml`` - Magnum search results in pepxml format. This will have the prefix of your mzml file name
    and the suffix of ``pep.xml``.
 3. ``percout.xml`` - The results from running percolator.
 4. ``SearchDatabase.fasta`` - The FASTA file you used to perform the Magnum search.

To generate the Limelight XML file, enter the following:

    .. code-block:: bash

      sudo docker run --rm -it --user $(id -u):$(id -g) -v `pwd`:`pwd` -w `pwd` mriffle/magnum-percolator-to-limelight -c ./treated-Magnum.conf -p ./percout.xml -f ./SearchDatabase.fasta -m ./treated.pep.xml -o treated.limelight.xml

Here is that same command in multi-line format with comments. Note the command below won't run as-is, it is only
meant to show you which parameters are being used in the event that you need to change the values.

    .. code-block:: bash

      sudo docker run --rm -it --user $(id -u):$(id -g) -v `pwd`:`pwd` -w `pwd` mriffle/magnum-percolator-to-limelight\
        -c ./treated-Magnum.conf     # the Magnum configuration file
        -p ./percout.xml             # the output from percolator
        -f ./SearchDatabase.fasta    # the FASTA file used in the search
        -m ./treated.pep.xml         # the Magnum results
        -o treated.limelight.xml     # the limelight XML file that will be created

You should now have a ``treated.limelight.xml`` file that will be used to import the results into Limelight.

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

          cp ~/my-project/treated.limelight.xml /mnt/c/data_directory/treated.limelight.xml

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

Optional: Analyze and upload the untreated sample
==================================================
The above steps search and upload the results for the treated sample. If you would also like to search
and upload the untreated sample to compare in Limelight follow these directions.

Get the untreated data
-----------------------
 1. Ensure you are in the project folder

    .. code-block:: bash

       cd ~/my-project

 2. Copy the example input data into the project folder

    .. code-block:: bash

       # download data from Google Drive into your project directory
       wget --load-cookies /tmp/cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget --quiet --save-cookies /tmp/cookies.txt --keep-session-cookies --no-check-certificate 'https://docs.google.com/uc?export=download&id=1AzGMBh9kCByX2K5esBS3RDF-7ZTxsSiK' -O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\1\n/p')&id=1AzGMBh9kCByX2K5esBS3RDF-7ZTxsSiK" -O treated.tgz && rm -rf /tmp/cookies.txt
       tar -xvzf untreated.tgz

    .. note::
       If you are using macOS, you may not have ``wget`` installed on your system so the above step may fail. You can
       download ``treated.tgz`` using a web browser using
       `this link <https://drive.google.com/file/d/1HHur4Vm8s20VYwp6eWUxReIy4nax-4GF/view?usp=sharing>`_, and then
       save it to your project directory and run tar -xvzf untreated.tgz.

    If the above was successful, you can delete ``untreated.tgz``

    .. code-block:: bash

       rm untreated.tgz

    You should now have three files in your project directory:

    1. ``SearchDatabase.fasta`` - A FASTA-formatted text file containing protein sequences to be searched.
    2. ``untreated-Magnum.conf`` - A Magnum configuration file, pre-configured for this tutorial. For more information
       about configuring Magnum, `visit the Magnum configuration website <http://magnum-ms.org/docs/config.html>`_.
    3. ``untreated.mzML`` - The raw data from the mass spectrometer converted to mzML format.


Run Magnum on Untreated Data
------------------------------

    .. code-block:: bash

       sudo docker run --rm -it --user $(id -u):$(id -g) -v `pwd`:`pwd` -w `pwd` mriffle/magnum:alpha3 ./untreated-Magnum.conf

Run Percolator on Untreated Data
---------------------------------

    .. code-block:: bash

      sudo docker run --rm -it --user $(id -u):$(id -g) -v `pwd`:`pwd` -w `pwd` mriffle/percolator:3.05 -X percout.xml untreated.perc.txt

Convert Untreated Results to Limelight XML
----------------------------------------------

    .. code-block:: bash

      sudo docker run --rm -it --user $(id -u):$(id -g) -v `pwd`:`pwd` -w `pwd` mriffle/magnum-percolator-to-limelight -c ./untreated-Magnum.conf -p ./percout.xml -f ./SearchDatabase.fasta -m ./untreated.pep.xml -o untreated.limelight.xml

You should now have a ``untreated.limelight.xml`` file that will be used to import the results into Limelight.


Upload Untreated Data to Limelight
-----------------------------------
Follow the instructions above to :ref:`Upload to Limelight`.
