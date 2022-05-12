===================================
Update Limelight
===================================

New versions of Limelight with new features and bug fixes are regularly released. It's important to keep your
Limelight installation up-to-date. Follow these instructions to update your installation of Limelight.

Limelight releases use semantic versioning and are given version numbers such as 2.1.6. The `2` is considered the major
version number. Limelight versioning is carefully controlled, so that all updates to a new release that use
the same major version (e.g., **2**.1.6 to **2**.3.12) do not require any database updates. This kind of update is considered
a **minor version update**. Updates that move to a new major version (e.g. **2**.1.6 to **3**.5.2) may require database updates.
This kind of update is considered a **major version update**.

Minor version updates are relatively simple to perform. Major version updates are more complex--requiring extra steps such as
backing up and updating the database.

Determine Latest Limelight Version
==================================
Visit `the official Limelight Release Page <https://github.com/yeastrc/limelight-core/releases>`_ to view the latest
releases of Limelight.  The most current release is listed at the top of the list of releases.

Determine Your Limelight Version
================================
Follow these directions to determine your major version number.

.. important::
   This guide assumes you have completed all the steps in the :doc:`install-limelight` tutorial.

1. Open a Terminal
-------------------
On Linux and MacOS, open a normal terminal. On Windows, if you followed our instructions for installing Docker,
follow the directions on our :ref:`Docker Installation Tutorial <Windows Terminal>` to open a Linux terminal.

2. Get Version Number From ``docker-compose.yml``
--------------------------------------------------
Type the following into your terminal. The first line takes you into the directory where you downloaded
Limelight. The second command retrieves the version numbers.

    .. code-block:: bash

       cd ~/limelight
       grep 'mriffle/limelight-webapp' docker-compose.yml

The output should be similar to:

    .. code-block:: bash

       image: mriffle/limelight-webapp:2

The **2** at the end of that line is your **major version number**.


Perform Appropriate Update
================================
If the most recent release of Limelight has the same major version number as your local installation, perform
a minor version update.

If the most recent release of Limelight has a newer major version number than your local installation, you
may perform a minor or a major version update. A minor version update will ensure you are using the latest release
of Limelight that has the same major version number as your installation (e.g., the latest **2**.x.x version). A major
version update will be more complicated to perform, but will ensure you have access to all the latest features
and bug fixes in Limelight.

Follow the instructions below to perform a minor or major version update.

.. toctree::
   :maxdepth: 1
   :titlesonly:

   update-limelight-minor
   update-limelight-major
