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

This tutorial will install WSL2 (Microsoft's Windows Subsystem for Linux) and Docker Desktop, which will allow you to
run any Docker containers natively in Linux on Windows.

1. Install WSL2 by `following these directions from Microsoft <https://learn.microsoft.com/en-us/windows/wsl/install>`_. If WSL2 is already installed, skip this step.
2. Install Docker Desktop and link it to WSL2 by `following these directions from Microsoft <https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-containers>`_. If Docker Desktop is already installed, follow the link and follow the directions to ensure it is enabled in your Linux distribution.

   You can skip the optional steps for installing Visual Studio Code and signing up for a Docker ID.

Windows Terminal
-------------------
If you are using Windows 10, we recommend installing **Windows Terminal** at this time. Windows 11 has Windows Terminal installed by default.
`Follow these directions from Microsoft to install Windows Terminal <https://docs.microsoft.com/en-us/windows/terminal/get-started>`_. Once installed
you can easily access the command line of your new Ubuntu LTS installation by launching Windows Terminal
and clicking the menu icon as depicted below. Note `Ubuntu 20.04` may be a different version number on your system.

.. image:: /_static/windows-terminal-ubuntu.png

If you do not install Windows Terminal, you can access your new Ubuntu LTS installation by opening
a command prompt (Press the Win + R keys on your keyboard, then type cmd, and press Enter on your keyboard or click/tap OK).
Enter ``bash`` into the command prompt and hit enter.

Apple macOS
====================
`Follow the official directions to install Docker on macOS <https://docs.docker.com/docker-for-mac/install/>`_
Once installed and running, Docker may be accessed by opening a new Terminal and typing ``docker``.

Linux
==============
Below are instructions and links to instructions for installing Docker on the most popular Linux distributions.

Ubuntu 20.04
---------------
Copy and paste each of the following commands, one by one, into the Linux terminal:

    .. code-block:: bash

       sudo apt update -y
       sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
       curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
       sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
       sudo apt update -y
       apt-cache policy docker-ce
       sudo apt install docker-ce -y


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
`Please see the official Docker install guides <https://docs.docker.com/engine/install/>`_ for more information
about installing Docker on other Linux distributions.
