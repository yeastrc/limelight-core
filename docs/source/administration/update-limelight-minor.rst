===================================
Minor Version Update Instructions
===================================

Follow these steps to update Limelight to the latest release of your current major version. E.g., update your
**2**.x.x installation of Limelight to the latest release of **2**.x.x.

This guide assumes you have completed all the steps in the :doc:`install-limelight` tutorial.

1. Open a Terminal
===========================
On Linux and MacOS, open a normal terminal. On Windows, if you followed our instructions for installing Docker,
follow the directions on our :ref:`Docker Installation Tutorial <Windows Terminal>` to open a Linux terminal.

2. Shutdown Limelight
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

3. Update Limelight
===========================================
Use the following command to automatically download the latest version of all of the Limelight application components:

    .. code-block:: bash

       sudo docker-compose pull

4. (Optional) Remove Orphaned Docker Images
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


5. Restart Limelight
===================================
Use the following command to bring Limelight back up using the new images:

If you have not customized the data locations for Limelight, type the following to start Limelight:

.. code-block:: bash

   sudo docker-compose up --detach

If you have customized the data locations for Limelight by following our
:doc:`install-limelight-custom-data-location` tutorial, type the following:

.. code-block:: bash

   sudo docker-compose -f docker-compose-custom-data.yml up --detach
