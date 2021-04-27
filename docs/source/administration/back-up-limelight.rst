===================================
Back Up and Restore Limelight Data
===================================
If you are running your own Limelight installation, this guide will provide direction on how to back up and
restore your data. This guide will assume you have followed our :doc:`install-limelight` tutorial and are running
Limelight using Docker and Docker Compose. Even if this is not the case, this guide should provide sufficient
detail for you to back up and restore your data.

Back Up Data
===================================
Most data in Limelight are stored in MySQL, a relational database management engine. Spectra that are uploaded
are stored as processed files on disk. Follow the sections below to back up each of these sets of data.

.. note::

    Backing up will work best if no data imports are currently running.

Back Up MySQL Data
------------------
.. important::

    The Limelight application must be running to back up MySQL in this way. :ref:`Review how to start and stop Limelight<5. Starting and Stopping Limelight>`.


To back up a current snapshot of your data, use the ``mysqldump`` command. This can be done via Docker by
typing the following into your Linux terminal (including Windows users running Docker on WSL2 as per our
:doc:`/tutorials/install-docker` tutorial).

.. code-block:: none

    sudo docker exec limelight-mysql sh -c 'exec mysqldump --opt --max_allowed_packet=200M --single-transaction -u root -p"MYSQL_ROOT_PASSWORD" limelight' | pigz --stdout > ~/limelight-backup.sql.gz

If you are not running MySQL in Docker, the command would be:

.. code-block:: none

    mysqldump --opt --max_allowed_packet=200M --single-transaction -u root -p"MYSQL_ROOT_PASSWORD" limelight | pigz --stdout > ~/limelight-backup.sql.gz

.. note::

    ``MYSQL_ROOT_PASSWORD`` should be replaced with the actual root password for your MySQL installation. If you followed
    our :doc:`install-limelight` tutorial, this will be in your ``.env`` file as described on Step 4.

.. note::

    If the ``pigz`` command is not found, ``gzip`` can be substituted into the command.

This will create a file in your home directory named ``limelight-backup.sql.gz`` that contains a compressed backup of the
database.

To output this file with the name ``limelight-backup-20210501.sql.gz`` and to a different location,
perhaps ``D:\limelight-backups\`` on a Windows machine, ensure that directory exists then run:

 .. code-block:: none

    sudo docker exec limelight-mysql sh -c 'exec mysqldump --opt --max_allowed_packet=200M --single-transaction -u root -p"MYSQL_ROOT_PASSWORD" limelight' | pigz --stdout > /mnt/d/limelight-backups/limelight-backup-20210501.sql.gz

For extensive documentation of ``mysqldump`` see `the official MySQL website <https://dev.mysql.com/doc/refman/5.7/en/mysqldump.html>`_

Back Up Spectra Data
--------------------
The spectra data are files on disk, and so can be easily backed up using standard archiving and compression programs,
like tar, gzip, or zip.  To do this the files must first be located.

Docker-Managed Data Location
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If Docker is managing where files are store (the default behavior in our tutorial), type the following into your
Linux terminal (including Windows users running Docker on WSL2 as per our :doc:`/tutorials/install-docker` tutorial).

.. code-block:: bash

   sudo docker inspect limelight-core_spectr_storage

The output should be similar to:

.. code-block:: json

    [
        {
            "CreatedAt": "2021-04-27T12:48:13-07:00",
            "Driver": "local",
            "Labels": {
                "com.docker.compose.project": "limelight-core",
                "com.docker.compose.version": "1.29.1",
                "com.docker.compose.volume": "spectr_storage"
            },
            "Mountpoint": "/var/lib/docker/volumes/limelight-core_spectr_storage/_data",
            "Name": "limelight-core_spectr_storage",
            "Options": null,
            "Scope": "local"
        }
    ]

The directory is the one labeled with ``Mountpoint``. In this case, the data directory is: ``/var/lib/docker/volumes/limelight-core_spectr_storage/_data``.

Customized Data Location
^^^^^^^^^^^^^^^^^^^^^^^^
If you have customized the data storage locations, as per our :doc:`install-limelight-custom-data-location` tutorial,
this will be the directory you have assigned to the ``SPECTR_STORAGE_DIRECTORY`` in your ``.env`` file. For example,
if the line in your ``.env`` file reads:

.. code-block:: none

   SPECTR_STORAGE_DIRECTORY=/data/limelight-data/spectr-storage

Your directory is ``/data/limelight-data/spectr-storage``.


Back Up the Data
^^^^^^^^^^^^^^^^^^^^
Using the directory you found above, type the following into a Linux terminal to back up the spectra data:

.. code-block:: bash

   # replace DIRECTORY_PATH with the directory you found above
   sudo tar -C DIRECTORY_PATH -czf /path/to/limelight-spectra-backup.tgz .

   # for example:
   sudo tar -C /var/lib/docker/volumes/limelight-core_spectr_storage/_data -czf ~/limelight-spectra-backup.tgz .

This will create a file named ``limelight-spectra-backup.tgz`` in your home directory that contains the
spectra data. The ``~/limelight-spectra-backup.tgz`` part of the command may be replaced with any
directory or filename you prefer to use for your backup. For example:

.. code-block:: bash

   # for example:
   sudo tar -C /var/lib/docker/volumes/limelight-core_spectr_storage/_data -czf /mnt/d/limelight-backups/limelight-spectra-20210501.tgz .

Would save the backup in the ``limelight-backups`` directory of the ``D:\`` drive with the filename ``limelight-spectra-20210501.tgz``.

.. note::

    If you are on a different operating system or want to back up the data in a different way, any method for backing
    up the above directory should suffice.


Restore Data
===================================
Follow the guides below to restore your data from a backup.

Restore MySQL Data
-------------------

.. important::

    Restoring data will replace your existing data! You will lose any data created after the time of the
    backup file you are restoring.

.. important::

    The Limelight application must be running to restore MySQL data in this way. :ref:`Review how to start and stop Limelight<5. Starting and Stopping Limelight>`.

To restore a Limelight MySQL backup, type the following into your Linux terminal (including Windows users running Docker on WSL2 as per our Installing Docker tutorial).

.. code-block:: bash

   zcat /path/to/limelight-backup.sql.gz | sudo docker exec -i limelight-mysql sh -c 'exec mysql -u root -p"MYSQL_ROOT_PASSWORD" limelight'

If you are not using Docker to run MySQL, the command would be:

.. code-block:: bash

   zcat /path/to/limelight-backup.sql.gz | mysql -u root -p"MYSQL_ROOT_PASSWORD" limelight

For example, if the backup file is named ``limelight-backup-20210501.sql.gz`` and is in ``D:\limelight-backups\`` on a
Windows machine, then run:

.. code-block:: bash

   zcat /mnt/d/limelight-backups/limelight-backup-20210501.sql.gz | sudo docker exec -i limelight-mysql sh -c 'exec mysql -u root -p"MYSQL_ROOT_PASSWORD" limelight'

.. note::

    ``MYSQL_ROOT_PASSWORD`` should be replaced with the actual root password for your MySQL installation. If you followed
    our :doc:`install-limelight` tutorial, this will be in your ``.env`` file as described on Step 4.

This will replace your Limelight MySQL database with the data in the backup file.

You should now stop and start the Limelight app. :ref:`Review how to start and stop Limelight<5. Starting and Stopping Limelight>`.


Restore Spectra Data
---------------------
.. important::

    Shut down the Limelight app before restoring spectra data! :ref:`Review how to start and stop Limelight<5. Starting and Stopping Limelight>`.

To restore spectra data, determine the directory in which the spectra data should be found by :ref:`following the directions above<Back Up Spectra Data>`.

Type the following into a Linux terminal to restore a spectra data backup:

.. code-block:: bash

   sudo tar -xzf /path/to/backup.tgz -C /path/to/spectra/data

``/path/to/backup.tgz`` is the location of your backup file made with the instructions above. ``/path/to/spectra/data``
is the location where the spectra data should go, determined by following the instructions above.

For example, to restore a backup file named ``limelight-spectra-20210501.tgz`` found in ``D:\limelight-backups`` to
the directory ``/var/lib/docker/volumes/limelight-core_spectr_storage/_data`` type the following:

.. code-block:: bash

   sudo tar -xzf /mnt/d/limelight-backups/limelight-spectra-20210501.tgz -C /var/lib/docker/volumes/limelight-core_spectr_storage/_data

You can now start Limelight. :ref:`Review how to start and stop Limelight<5. Starting and Stopping Limelight>`.

Getting Help
==========================================
If you have any questions, bug reports, or feature requests, please contact us!

* Try using the `Limelight Issue Page at GitHub <https://github.com/yeastrc/limelight-core/issues>`_.
* You can `join our Slack <https://join.slack.com/t/limelight-ms/shared_invite/zt-pdkll4k3-YR5km0ppSrtdlZCJBvgVyQ>`_ and chat with us.
* You can email us at limelightms@uw.edu
