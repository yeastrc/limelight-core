===================================
Major Version Update Instructions
===================================

Follow these steps to update your Limelight installation to a newer major version number. E.g., update your
**2**.x.x installation of Limelight to the latest release of **3**.x.x.

This guide assumes you have completed all the steps in the :doc:`install-limelight` tutorial.

.. important::
   Never update to a new major version that is more than one ahead of your current version! If you are on
   version **2**.x.x (major version 2), you can only go to **3**.x.x (major version 3).  After **3**.x.x
   is running, you may then update to version **4**.x.x, and so on.

   To update multiple steps (e.g., from major version 2 to 5), follow all of these steps to upgrade from
   major version 2 to 3, then repeat steps 8 and 9 once to update from major version 3 to 4, then repeat
   steps 8 and 9 again to update from major version 4 to 5.

   You can see your current Limelight major version by following the instructions on our
   :doc:`update-limelight` instructions. This must be done before following these steps.

1. Open a Terminal
===========================
On Linux and MacOS, open a normal terminal. On Windows, if you followed our instructions for installing Docker,
follow the directions on our :ref:`Docker Installation Tutorial <Windows Terminal>` to open a Linux terminal.

2. Backup the Limelight Database
================================
It is critical that you backup your database before updating it. Please follow the instructions for backing up
MySQL Data on the :doc:`back-up-limelight` instructions page.

3. Shutdown Limelight
=============================
Go into your Limelight project directory:

.. code-block:: bash

   cd ~/limelight

If you have not customized the data locations for Limelight, type the following to start Limelight:

.. code-block:: bash

   sudo docker-compose down

If you have customized the data locations for Limelight by following our
:doc:`install-limelight-custom-data-location` tutorial, type the following:

.. code-block:: bash

   sudo docker-compose -f docker-compose-custom-data.yml down

4. Download the Latest Installation Package
===========================================

.. important::
   This process will overwrite your your ``docker-compose.yml`` and ``docker-compose-custom-data.yml`` files. Most
   likely you have not changed either file, but if you have, back it up by typing:

      .. code-block:: bash

         # back up whichever file you have customized:
         cp docker-compose.yml docker-compose-customized.yml
         cp docker-compose-custom-data.yml docker-compose-custom-data-customized.yml

Download the latest Limelight Docker Compose files:

    .. code-block:: bash

       # Download Limelight Docker Compose files
       curl -L "https://github.com/yeastrc/limelight-core/releases/latest/download/docker-compose-files.tgz" -o docker-compose-files.tgz

       # Expand the archive
       tar -xvzf docker-compose-files.tgz

.. note::
    If you prefer to download a ZIP file or if you prefer to download the file another way, the latest
    release can be found on GitHub at https://github.com/yeastrc/limelight-core/releases/latest


If you have customized your ``docker-compose.yml`` or ``docker-compose-custom-data.yml`` files, copy your
customizations from the backup you made above into the new ``docker-compose.yml`` or ``docker-compose-custom-data.yml``
file.

5. Update Other Limelight Components
===========================================
Use the following command to download the latest version of all of the Limelight application components:

    .. code-block:: bash

       sudo docker-compose pull

6. Add Any New ``.env`` File Entries
===========================================
This is only necessary if you have customized your data storage locations, as described on
our :doc:`install-limelight-custom-data-location` tutorial. If you have not customized the data storage
locations for Limelight, you can skip this step.

You will need to configure any new data locations needed by the new release of Limelight. All required
data locations are listed at our :doc:`install-limelight-custom-data-location` tutorial under step 2. Follow
the directions for step 2 to add any missing configuration values to your ``.env`` file.

7. Bring up Limelight
===========================================
If you have not customized the data locations for Limelight, type the following to start Limelight:

.. code-block:: bash

   sudo docker-compose up --detach

If you have customized the data locations for Limelight by following our
:doc:`install-limelight-custom-data-location` tutorial, type the following:

.. code-block:: bash

   sudo docker-compose -f docker-compose-custom-data.yml up --detach

8. Perform Necessary Database Updates
===========================================

Determine If Database Update Is Necessary
-----------------------------------------
Type the following, but replace ``3`` in the first line with the major version number you are upgrading *to*.

.. code-block:: bash

   export LIMELIGHT_NEW_VERSION="3"
   ls database_scripts/version_upgrades/$LIMELIGHT_NEW_VERSION/version_upgrade.sql

.. important::
    It is critical that you set the ``LIMELIGHT_NEW_VERSION`` to the correct version number. If you are upgrading
    from major version 2, you must set this number to ``3``. Never set this number to be more than 1 higher than
    your current version--doing so may corrupt your database.

If the response is something like:

.. code-block:: bash

   ls: cannot access 'database_scripts/version_upgrades/3/version_upgrade.sql': No such file or directory

Then you do *not* need to perform a database upgrade and you can skip this step and step 8.

If you see something like:

.. code-block:: bash

   database_scripts/version_upgrades/3/version_upgrade.sql

Then you *do* need to perform a version upgrade.

Perform The Database Update
-----------------------------------------
Run the following command to update the database. This assumes you ran the ``export LIMELIGHT_NEW_VERSION=`` command
given above.

.. note::

    ``MYSQL_ROOT_PASSWORD`` should be replaced with the actual root password for your MySQL installation. If you followed
    our :doc:`install-limelight` tutorial, this will be in your ``.env`` file as described on step 4 of the tutorial.

.. code-block:: bash

   cat database_scripts/version_upgrades/$LIMELIGHT_NEW_VERSION/version_upgrade.sql | sudo docker exec -i limelight-mysql sh -c 'exec mysql -u root -p"MYSQL_ROOT_PASSWORD" limelight'


9. Restart Limelight
=============================
If you did not perform a database update in step 7, you can skip this step.

If you have not customized the data locations for Limelight, type the following to start Limelight:

.. code-block:: bash

   sudo docker-compose down
   sudo docker-compose up --detach

If you have customized the data locations for Limelight by following our
:doc:`install-limelight-custom-data-location` tutorial, type the following:

.. code-block:: bash

   sudo docker-compose -f docker-compose-custom-data.yml down
   sudo docker-compose -f docker-compose-custom-data.yml up --detach


10. (Optional) Remove Orphaned Docker Images
============================================
If new Limelight components are pulled down using the command above, the replaced Docker images will be "orphaned". To
remove the old Docker images and free up disk space, you can use the following command:

    .. code-block:: bash

       sudo docker system prune

You will see the following output:

    .. code-block:: none

        WARNING! This will remove:
          - all stopped containers
          - all networks not used by at least one container
          - all dangling images
          - all dangling build cache

        Are you sure you want to continue? [y/N]


Enter ``y`` and hit enter. The orphaned images will be removed.


