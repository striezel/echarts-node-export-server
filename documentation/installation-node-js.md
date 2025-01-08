# Installation of Node.js

Since this a Node.js application, Node.js is obviously required to run it.
I recommend to use a supported LTS version of Node.js, for example version 20.
Using an older version of Node.js may work, but it is not recommended.

## Node.js on Windows

If you are on Windows, just [download](https://nodejs.org/en/download/) the MSI
installer package and install it.

## Node.js on Linux

If your Linux distribution does not provide a recent Node.js version (at least
version 20 is recommended), you can add an (unofficial) Node.js package
repository to your system.

### Debian-based

On Debian-based systems create the file **/etc/apt/sources.list.d/nodejs.list**
and give it the following contents:

    # Node.js 20.x for Debian 12
    deb [signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main

Furthermore, the package signing key for that package repository needs to be
imported. You will need `wget` (or `curl`) and `gpg` for that. They should be
installed on most systems, but if they aren't, a simple

    apt-get install wget gpg

will take care of that.
After that the package signing key can be downloaded and installed with

    wget --quiet -O - https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor > /usr/share/keyrings/nodesource.gpg

This downloads the key with `wget`, converts it into the proper format using
`gpg` and saves it as `/usr/share/keyrings/nodesource.gpg`.

Next, run

    apt-get update

to update the APT package lists. To install Node.js 20, type

    apt-get install nodejs

That's it.

### RedHat-based

On a RedHat-based system (e.g. CentOS) make sure curl is installed and then type

    curl -sL https://rpm.nodesource.com/setup_20.x | bash -

to download and execute a bash script that will take care of the installation.
You might want to check the script code before doing that, though.

## Initial setup: install Node.js packages

The application requires a package for canvas-based rendering. To install that,
type

    npm install

in the directory `export-server/`. You only need to do this once. The packages
are then cached in the `node_modules/` directory for future use.

Note that this can possibly fail for some operating systems where no
pre-compiled version of the Node.js
[`canvas` package](https://www.npmjs.com/package/canvas/v/3.0.1#compiling)
is available. In that case Node.js attempts to compile the package from source.
However, that requires some additional software, for example a C++ compiler as
well as Cairo and Pango. The documentation of `canvas` has more information on
how those dependencies can to be installed:
<https://github.com/Automattic/node-canvas/wiki>

Basically, it boils down to one of the following commands:

| OS           | Command to install dependencies                               |
| ------------ | ------------------------------------------------------------- |
| Alpine Linux | apk update && apk add g++ make pkgconf cairo-dev pango-dev    |
| Debian       | apt-get install build-essential libcairo2-dev libpango1.0-dev |
| Fedora       | yum install gcc-c++ cairo-devel pango-devel                   |

After all dependencies for compilation of `canvas` are installed, `npm install`
will succeed.
