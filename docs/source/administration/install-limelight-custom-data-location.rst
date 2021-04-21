===========================
Customize Data Locations
===========================

.. note::
    This tutorial assumes you have completed our :doc:`install-limelight` tutorial through step 4.

By default, our installation tutorial will allow Docker to manage where Limelight stores its data. This
includes things like where MySQL stores its data files, where uploaded scans are stored, and working
directories for processing uploaded data. On Linux (including Windows running Ubuntu), these data will
mostly likely be kept under ``/var/lib/docker/``.

It is recommended that you let Docker manage the data directories if you can. However, if you would like to
customize where the data are stored for Limelight, follow the steps below.

1. Create data directories
================================================
You will need to create four directories for Limelight to store its data.

    1. MySQL data directory. This is the directory used to store the database.
    2. Spectr upload directory. This the directory used for spectra processing.
    3. Spectr storage directory. This the directory used to store spectra.
    4. Limelight upload directory. This is the directory where uploads are temporarily stored.

.. note::
    If you are using WSL2 on Windows, specifying a Windows filesystem drive (e.g., ``/mnt/d/``) for your
    data directories is not supported.

For example, if you would like store store all data in the ``/data/limelight-data`` directory, you would type
the following:

    .. code-block:: bash

        # make a parent directory for limelight data
        sudo mkdir -p /data/limelight-data

        # make the four directories for storing data
        sudo mkdir /data/limelight-data/mysql
        sudo mkdir /data/limelight-data/spectr-upload
        sudo mkdir /data/limelight-data/spectr-storage
        sudo mkdir /data/limelight-data/limelight-upload


2. Update ``.env`` with data storage locations
================================================
The ``.env`` configuration file will need to be updated to include the locations of the data directories.
Open this file using your favorite text editor. On Linux (including Docker on Windows), we'll assume
that is ``nano``. To edit the file, type:

    .. code-block:: bash

       # ensure you are in correct directory. if you followed tutorial type:
       cd ~/limelight/limelight-core

       # edit the file
       nano .env

Add the following lines to the end of the file. Substitute the actual directories with directories
you chose above. This example uses the example directory names:

    .. code-block:: none

       MYSQL_DATA_DIRECTORY=/data/limelight-data/mysql
       SPECTR_UPLOAD_DIRECTORY=/data/limelight-data/spectr-upload
       SPECTR_STORAGE_DIRECTORY=/data/limelight-data/spectr-storage
       LIMELIGHT_UPLOAD_DIRECTORY=/data/limelight-data/limelight-upload

Type ``Control-o``, ``<ENTER>``, and ``Control-x`` to save and exit ``nano``.


3. Starting and Stopping Limelight
===================================

.. important::
    The commands below are different than the commands for starting and stopping Limelight on our
    :doc:`install-limelight` tutorial! You must always use these commands if you have customized the
    data locations.

At this point, starting and stopping Limelight should be straight forward.

To start Limelight:

    .. code-block:: bash

       sudo docker-compose -f docker-compose-custom-data.yml up --detach

To stop Limelight:

    .. code-block:: bash

       sudo docker-compose -f docker-compose-custom-data.yml down

.. note::
   If you are using **Windows**, ensure Docker is running by typing:

   .. code-block:: bash

      sudo service docker start

   You should now be able to start Limelight.

.. note::
   The first time you start Limelight, all of the components will download and the database will
   initialize. This may take a few minutes, depending on your download speed. Subsequent startups
   of Limelight will not require these steps and will be faster.

.. note::
   These commands must be typed while you are in the project code directory. If you followed these
   instructions, you can ensure you are in this directory by typing:

   .. code-block:: bash

       cd ~/limelight/limelight-core


4. Proceed with installation
================================================
:ref:`You should now proceed to step 6 in our tutorial for installing limelight<6. Connect to Your Limelight Installation>`.
However, recall that your command for stopping and starting is different than that listed in the tutorial. (See above.)
