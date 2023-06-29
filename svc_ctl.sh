#!/usr/bin/env bash

#    Name: svc_ctl.sh
#    Purpose: Service control for the mediumroast.io
#    Copyright: Copyright 2021 and 2022 mediumroast.io. All rights reserved.
#    Author(s): Michael Hay, John Goodman

###################################
###
### Environment variables
###
###################################

# Service specific variables
SERVICE_NAME="chart-server.mediumroast.io"
HELLO_EMAIL="hello@mediumroast.io"
IMAGE_NAME="chart-server_chart-server"

# Colors
NC='\033[0m'
ORANGE='\033[0;33m'
RED='\033[0;31m'
BLUE='\033[0;94m'
GREEN='\033[0;92m'

# Generic variables
SERVICE="chart-server"

###################################
###
### Generic functions
###
###################################

function check_error () {
    EXIT=$1
    CMD=$2

    if [ $EXIT -eq 0 ]; then
        echo -e "${GREEN}ok${NC}"
    else
        echo "${RED}FAILED${NC}, ${CMD} exited with code: ${EXIT}"
        exit -1
    fi
}

function print_header () {
    HEADER="${1}"
    echo "-----[ BEGIN: ${HEADER} ]-----"
}

function print_step () {
	MSG="${1}"
    SEP=" ... "
    echo -n -e "${ORANGE}${MSG}${NC}${SEP}"
}

function print_detail () {
    DETAIL="${1}"
    echo -e "${BLUE}${DETAIL}${NC}"
}

function print_footer () {
    FOOTER="${1}"
    echo "-----[ END: ${FOOTER} ]-----"
}
		

function bring_down_server () {
    FUNC="Bring down service"
    STEP="bring_down_server"
    print_header "${FUNC}"

	print_step "Bring down ${SERVICE} and nginx"
        docker-compose down

    print_footer $FUNC
}

function bring_up_server () {
    FUNC="Bring up service"
    STEP="bring_up_server"
    print_header $FUNC

        print_step "Build docker images"
        docker-compose build

    	print_step "Pull docker images"
        docker-compose pull

	    print_step "Bring up ${SERVICE}"
        docker-compose up -d

    print_footer $FUNC
}

function stop_server () {
    FUNC="Stop ${SERVICE}"
    STEP="stop_server"
    print_header $FUNC

	print_step "Stop ${SERVICE}"
        docker-compose stop

    print_footer $FUNC
}

function start_server () {
    FUNC="Start ${SERVICE}"
    STEP="start_server"
    print_header $FUNC

	print_step "Start ${SERVICE}"
        docker-compose start

    print_footer $FUNC
}

function build_server () {
    FUNC="Building ${SERVICE}"
    STEP="build_server"
    print_header $FUNC

	print_step "Build ${SERVICE}"
        docker-compose build

    print_footer $FUNC
}

function run_foreground () {
    FUNC="Running ${SERVICE} in the foreground"
    STEP="run_foreground"
    print_header $FUNC

	print_step "Running ${SERVICE}"
        docker-compose up

    print_footer $FUNC
}

function tail_backend () {
    FUNC="Tail the backend log file"
    STEP="tail_backend"
    print_header $FUNC

    print_step "Tailing the docker image for ${SERVICE}\n"
        docker_image=`docker ps |grep ${IMAGE_NAME} |awk '{print $1}'`
        echo "'${docker_image}'"
        docker logs -f ${docker_image}
}

###################################
###
### Service specific functions
###
###################################


function create_cert () {
    certbot --agree-tos -d ${SERVICE_NAME} -m ${HELLO_EMAIL} --manual --preferred-challenges dns certonly --config-dir=./var --work-dir=./var --logs-dir=./var --no-eff-email
}

function print_help () {
    clear
    echo "NAME:"
    echo "    $0 <command>"
    echo ""
    echo "DESCRIPTION:"
    echo "    Control functions to run ${SERVICE} for the mediumroast.io."
    echo ""
    echo "COMMANDS:"
    echo "    help up down start stop cert build foreground tail"
    echo ""
    echo "    help - call up this help text"
    echo "    up - bring up the service including building and pulling the docker image"
    echo "    down - bring down the service and remove the docker image"
    echo "    start - start the service using docker-compose "
    echo "    stop - stop the docker service"
    echo "    cert - create a new TLS certificate which lasts for 90 days"
    echo "    build - build the docker images for the server"
    echo "    foreground - run the server in the foreground to watch for output"
    echo "    tail - tail the logs for a server running in the background"
    echo ""
    exit -1
}

###################################
###
### Main control shell logic
###
###################################


if [ ! $1 ] || [ $1 == "help" ]; then
    print_help

elif [ $1 == "up" ]; then
    bring_up_server

elif [ $1 == "down" ]; then
    bring_down_server

elif [ $1 == "clean_slate" ]; then
    clean_slate

elif [ $1 == "start" ]; then
    start_server

elif [ $1 == "stop" ]; then
    stop_server

elif [ $1 == "cert" ]; then
    create_cert

elif [ $1 == "build" ]; then
    build_server

elif [ $1 == "foreground" ]; then
    run_foreground

elif [ $1 == "tail" ]; then
    tail_backend
fi

exit 0
