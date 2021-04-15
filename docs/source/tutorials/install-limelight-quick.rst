===================================
Installing Limelight (Quick Start)
===================================

Follow these steps to set up your own installation of Limelight on your own computer. These instructions
include running Limelight with default settings and require only minimal cofiguration by the user.

This tutorial assumes you have Docker installed on your system. Please see our :ref:`Docker Installation Tutorial <Installing Docker>`
to get Docker installed.

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


3. Download Limelight
===========================
The simplest way to download Limelight is by using ``git`` to download the code from GitHub.

Ensure Git is Installed
-------------------------
Chances are you already have Git installed on your system. If you type ``git`` and the command is not
found, `follow these instructions for installing Git <https://git-scm.com/book/en/v2/Getting-Started-Installing-Git>`_.

    .. note::
       If you are on **Windows** and followed our Docker instructions, follow the directions for installing
       Git on Ubuntu. Which are:

        .. code-block:: bash

           sudo apt install -y git

Download Limelight from GitHub
--------------------------------
First set up a Limelight project directory:

    .. code-block:: bash

       mkdir ~/limelight
       cd ~/limelight

Now, download the Limelight project:

    .. code-block:: bash

       # Download Limelight
       git clone https://github.com/yeastrc/limelight-core.git

       # Enter code directory
       cd limelight-core


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


5. Starting and Stopping Limelight
===================================
At this point, starting and stopping Limelight should be straight forward.

To start Limelight:

    .. code-block:: bash

       sudo docker-compose up --detatched

To stop Limelight:

    .. code-block:: bash

       sudo docker-compose down

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
Point your web browser to http://localhost:8080/ to access Limelight running on your own computer!

Login with Default User
------------------------
By default, you can log in using ``initial_user`` as the username and ``FJS483792nzmv,xc4#&@(!VMKSDL`` as the password.

Change Default User Information
---------------------------------
To change the default log in information click on ``INITIAL USER (initial_user)`` in the top right of the page:

    .. image:: /_static/tutorials/initial-user-link.png

Change values in the form to your liking.

Start Using Limelight
----------------------
That's it, you are ready to use Limelight!

7. Extra - Notes and Limitations
===========================================

Sending Emails
---------------
Some components of Limelight require Limelight to send emails--such as its forgotten password functionality. This
will not work by default after using this Quick Start Guide! For this to work, you must configure Limelight to
use a SMTP relay service. See our **Advanced Setup Guide** for more information.

Data Location
--------------
This Quick Start Guide allows Docker to manage where data are stored. To customize data storage locations for
various aspects of Limelight, see our **Advanced Setup Guide** for more information.
