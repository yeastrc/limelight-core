=======================
Installing Docker
=======================
.. image:: /_static/docker-logo.png
    :width: 250

Many of these tutorials will assume Docker is installed on your system. Docker allows you to run software
on your computer in containers that include the tested environment for running that software--regardless
of your own operating system or other installed programs. If Docker is not already installed on your system, see below
for instructions to install Docker on most major operating systems.

For more information about Docker, see `the official Docker website <https://www.docker.com/>`_

Microsoft Windows
====================
We recommend installing Docker via the Windows Subsystem for Linux (WSL 2). WSL 2 one of the latest
features of Windows that supports natively running Linux right alongside Windows at the same
time. This opens the Linux ecosystem up to Windows users and makes installing and using many Linux applications
much simpler.

To enable WSL 2 on your Windows 10 installation,
`follow these directions from Microsoft <https://docs.microsoft.com/en-us/windows/wsl/install-win10>`_. Scroll down
to the **Manual Installation Steps** section and follow the instructions. Once you get to **Step 6** these instructions
will assume you have installed **Ubuntu 20.04 LTS**.

Windows Terminal
-------------------
We recommend installing **Windows Terminal** at this time.
`Follow these directions from Microsoft to install Windows Terminal <https://docs.microsoft.com/en-us/windows/terminal/get-started>`_. Once installed
you can easily access the command line of your new Ubuntu 20.04 LTS installation by launching Windows Terminal
and clicking the menu icon as depicted below.

.. image:: /_static/windows-terminal-ubuntu.png

If you do not install Windows Terminal, you can access your new Ubuntu 20.04 LTS installation by opening
a command prompt (Press the Win + R keys on your keyboard, then type cmd, and press Enter on your keyboard or click/tap OK).
Enter ``bash`` into the command prompt and hit enter.

Once you have completed the installation of WSL 2, please view the :ref:`Ubuntu` section below to install Docker.

Apple macOS
====================
`Follow the official directions to install Docker on macOS <https://docs.docker.com/docker-for-mac/install/>`_
Once installed and running, Docker may be accessed by opening a new Terminal and typing ``docker``.

Linux
==============
Below are instructions and links to instructions for installing Docker on the most popular Linux distributions. If
you installed WSL 2 on Windows per the instructions above, follow the **Ubuntu** instructions.

Ubuntu
---------
The simplest way to install Docker on Ubuntu is opening a terminal and entering:

.. code-block:: bash

   sudo apt update -y
   sudo apt install docker.io -y

However, you will not always receive updates to the Docker engine when they are released. To ensure updates
to Docker always immediately available, `follow these alternative instructions <https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04>`_.

CentOS
------
`Follow the official Docker instructions for CentOS <https://docs.docker.com/engine/install/centos/>`_.

Debian
------
`Follow the official Docker instructions for Debian <https://docs.docker.com/engine/install/debian/>`_.

Fedora
------
`Follow the official Docker instructions for Fedora <https://docs.docker.com/engine/install/fedora/>`_.

Other Linux Distributions
--------------------------
`Please see the offical Docker install guides <https://docs.docker.com/engine/install/>`_ for more information
about installing Docker on other Linux distributions.
