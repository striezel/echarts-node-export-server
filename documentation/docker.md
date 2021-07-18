# Setup with Docker

## Preparation: Installation of Docker

If you prefer the non-native approach and like to use Docker instead, you have
to make sure that Docker is installed. For the purpose of this installation,
we will assume that you are using Debian 8.0 "jessie". The required steps should
be similar on other Linux distributions.

To install Docker, you need to add the APT repository for jessie-backports to
your APT sources, if that has not been done yet. Execute the following command
as root user to add the AP repository:

    echo "deb http://ftp.de.debian.org/debian/ jessie-backports main" >> /etc/apt/sources.list

After that you can install Docker by typing the following commands:

    # update of package lists
    apt-get update
    # install Docker package and dependencies without further confirmation
    apt-get install -y docker.io

The standard configuration right after the installation of Docker only allows
the root user to use Docker. Since it is more advisable to run Docker as a
different user, you need to add this other user (here: user1) to the group
docker. Type

    gpasswd -a user1 docker

to add the user _user1_ to the docker group. Repeat for other users, if needed.
Group membership will be applied _after the next login_ of the user, so these
users might need to log off and on again before they can continue.

Furthermore you should restart the Docker daemon:

    systemctl start docker

or

    systemctl restart docker

should trigger the restart.

After that the user _user1_ can type

    docker info

into a terminal in order to check whether he/she can execute docker commands in
his/her user context. If the command displays an error, then something is not
quite right yet.

## Let's party: Build docker image and create container

The following commands have to be issued in the root directory of the checked
out source code:

    # create image - may take several minutes during the first run; runs after
    # that are faster, because Docker caches some data
    docker build -t exportapp .
    # start container based on that image and pass port 3000 through
    docker run -d -p 3000:3000 --net=host exportapp

After that the Node.js application can be accessed in a web browser via
<http://localhost:3000>.
