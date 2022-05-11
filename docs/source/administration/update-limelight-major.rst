===================================
Major Version Update Instructions
===================================

Follow these steps to update your Limelight installation to a newer major version number. E.g., update your
**2**.x.x installation of Limelight to the latest release of **3**.x.x.

This guide assumes you have completed all the steps in the :doc:`install-limelight` tutorial.

.. important::
   Never update to a new major version that is more than one ahead of your current version! If you are on
   version **2**.x.x, you can only go to **3**.x.x.  After **3**.x.x is running, you may then update to
   version **4**.x.x, and so on.

1. Open a Terminal
===========================
On Linux and MacOS, open a normal terminal. On Windows, if you followed our instructions for installing Docker,
follow the directions on our :ref:`Docker Installation Tutorial <Windows Terminal>` to open a Linux terminal.

.. note::
   If you are using **Windows**, you may need to start Docker by typing:

   .. code-block:: bash

      sudo service docker start

2. Shutdown Limelight
=============================
Go into your Limelight project directory:

    .. code-block:: bash

       cd ~/limelight

Shutdown Limelight:

    .. code-block:: bash

       sudo docker-compose down

3. Backup the Limelight Database
================================
Please follow the instructions for backing up MySQL Data on the :doc:`back-up-limelight` instructions page.

4. Download the Latest Installation Package
===========================================


5. Add Any New `.env` Entries
===========================================

6. Bring up Limelight
===========================================

7. Perform Database Updates
===========================================

8. Restart Limelight
=============================
Go into your Limelight project directory:

    .. code-block:: bash

       cd ~/limelight

Shutdown Limelight:

    .. code-block:: bash

       sudo docker-compose down

Startup Limelight:

    .. code-block:: bash

       sudo docker-compose up --detach


9. (Optional) Remove Orphaned Docker Images
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


