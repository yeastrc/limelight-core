===================================
Installing Limelight
===================================

Follow these steps to set up your own installation of Limelight on your own computer. These instructions
include running Limelight with default settings and require only minimal cofiguration by the user. If you already
have access to Limelight, you do not need to do this to use Limelight.

This tutorial assumes you have Docker installed on your system. Please see our :ref:`Docker Installation Tutorial <Installing Docker>`
to get Docker installed.

.. important::
    System Requirements: Limelight will consume a large amount of RAM, particularly when uploading data.
    You should have at least 6 gigabytes of RAM available on your system.

1. Open a Terminal
===========================
On Linux and MacOS, open a normal terminal. On Windows, if you followed our instructions for installing Docker,
follow the directions on our :ref:`Docker Installation Tutorial <Windows Terminal>` to open a Linux terminal.

2. Install Docker Compose
=============================
Docker Compose is an official add-on to Docker that greatly simplifies running applications that have multiple parts. Limelight
has several parts, including a database, multiple web applications, and running programs. Docker Compose allows you to
run a single command to launch and correctly stitch all of those components together into a working system. This all
happens inside of Docker and does not install the software elsewhere on your computer.

If you are on MacOS, you will likely already have Docker Compose installed. If you are on Linux (including
Windows users who installed Docker according to our instructions), test if Docker Compose is installed
by typing ``docker-compose``.  If the command is not found, please install Docker Compose by typing the following:

    .. code-block:: bash

       sudo curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
       sudo chmod +x /usr/local/bin/docker-compose

If you run into any trouble installing Docker Compose, `please see Docker's official Docker Compose installation instructions <https://docs.docker.com/compose/install/>`_.


3. Download Limelight Install Files
===========================================
First set up a Limelight project directory:

    .. code-block:: bash

       mkdir ~/limelight
       cd ~/limelight

Now, download the Limelight Docker Compose files:

    .. code-block:: bash

       # Download Limelight Docker Compose files
       curl -L "https://github.com/yeastrc/limelight-core/releases/latest/download/docker-compose-files.tgz" -o docker-compose-files.tgz

       # Expand the archive
       tar -xvzf docker-compose-files.tgz

.. note::
    If you prefer to download a ZIP file or if you prefer to download the file another way, the latest
    release can be found on GitHub at https://github.com/yeastrc/limelight-core/releases/latest

4. Configure Limelight
===========================
Copy the sample configuration file into place:

    .. code-block:: bash

       cp docker/env-sample ./.env

The ``.env`` file holds all of the necessary configuration for Limelight. It is recommended (but not required)
that you change the first two lines of the file, which contain passwords to be used for the MySQL database.

The ``.env`` file should look something like this:

    .. code-block:: none

       # .env file for supplying settings to initializing Limelight using docker-compose

       # Change these passwords.
       MYSQL_ROOT_PASSWORD=change_this_password
       MYSQL_PASSWORD=change_this_password

       # Can change the mysql user Limelight uses, but not necessary
       MYSQL_USER=limelight_db_user

       # This manages the memory usage of components of Limelight
       IMPORTER_JAVA_OPTIONS=-Xmx3g -Xms500m
       WEBAPP_JAVA_OPTIONS=-Xms2024m -Xmx2024m

       # This manages optimization settings for MySQL
       MYSQL_OPTIONS=--max-connections=500


These can be changed using your favorite text editor. On Linux (including Docker on Windows), we'll assume
that is ``nano``. To edit the file, type:

    .. code-block:: bash

       nano .env

Change the passwords and type ``Control-o``, ``<ENTER>``, and ``Control-x`` to save and exit.

.. important::
    By default, Docker manages where data are stored on your disk. If you would like to customize where Limelight
    stores data, please follow our :doc:`install-limelight-custom-data-location` tutorial. This should be done before
    continuing on to Step 6 below. Once that is complete, proceed to Step 6.


5. Starting and Stopping Limelight
===================================
At this point, starting and stopping Limelight should be straight forward.

To start Limelight:

    .. code-block:: bash

       sudo docker-compose up --detach

To stop Limelight:

    .. code-block:: bash

       sudo docker-compose down

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


6. Connect to Your Limelight Installation
===========================================
Point your web browser to |limelight_link| to access Limelight running on your own computer!

.. |limelight_link| raw:: html

   <a href="http://localhost:8080/limelight/" target="_blank" class="reference external">http://localhost:8080/limelight/</a>

.. note::
   If this is the first time bringing up Limelight, it may take a minute for the database to initialize. If you see message
   saying there was a problem with your request, try again in about a minute.

Login with Default User
------------------------
By default, you can log in using ``admin`` as the username and ``changeme`` as the password.

Change Default User Information
---------------------------------
To change the default log in information click on ``Admin User (admin)`` in the top right of the page:

    .. image:: /_static/tutorials/initial-user-link.png

Change the name, username, and password in the form to your liking.

Start Using Limelight
----------------------
That's it, you are ready to use Limelight!

7. Optional - Set up SMTP For Emails
===========================================
Some functions of Limelight require sending email to users. Examples of this include
inviting new users to projects, resetting forgotten passwords, and notifications that
data uploads have been completed. Although it's not required that you set up SMTP,
the above features will not be enabled unless you do. If you would like to enable these
features, please see our :doc:`install-limelight-smtp`.

If you do not set up SMTP, you must use the administrative interface to add new users
to Limelight. See our :ref:`guide for managing users <Manage Users (Add, Disable, Permissions)>`.