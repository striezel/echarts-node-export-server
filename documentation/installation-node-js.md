# Installation of Node.js

Since this a Node.js application, Node.js is obviously required to run it.
I recommend to use the LTS version of Node.js, which is currently version 14.
This is also the version under which this application has been developed and
tested. Therefore, using an older version of Node.js may work, but it is not
recommended.

## Node.js on Windows
If you are on Windows, just [download](https://nodejs.org/en/download/) the MSI
installer package and install it.

## Node.js on Linux
If your Linux distribution does not provide a recent Node.js version (at least
version 8 is recommended), you can add an (unofficial) Node.js package
repository to your system.

### Debian-based

On Debian-based systems create the file **/etc/apt/sources.list.d/nodejs.list**
and give it the following contents:

    # Node.js 14.x for Debian 9 (codename stretch)
    deb https://deb.nodesource.com/node_14.x stretch main
    deb-src https://deb.nodesource.com/node_14.x stretch main

After that do

    apt-get update && apt-get upgrade

to update the APT package lists. To install Node.js 14, type

    apt-get install nodejs

That's it.

### RedHat-based

On a RedHat-based system (e.g. CentOS) make sure curl is installed and then type

    curl -sL https://rpm.nodesource.com/setup_14.x | bash -

to download and execute a bash script that will take care of the installation.
You might want to check the script code before doing that, though.

## Initial setup: install Node.js packages

The application requires a package for PhantomJS. To install that, type

    npm install

in the directory `export-server/`. You only need to do this once. The packages
are then cached in the `node_modules/` directory for future use.

However, PhantomJS does not offer a prebuilt package for some platforms, namely
ARM which is used by Raspberry Pi (among others). In such case you can install
the PhantomJS package provided by your package manager via

    apt-get install phantomjs

on Raspbian, or via

    yum install phantomjs

on RedHat-based distributions.
