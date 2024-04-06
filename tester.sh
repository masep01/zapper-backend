#!/bin/bash

Usage(){
	which figlet >/dev/null 2>&1
	if [ "$?" -eq 0 ]; then
		figlet Zapper API Tester -f small
	else
		echo 'Zapper API TESTER'
	fi

	echo
	echo 'Usage: ./tester.sh MODE'
	echo
	echo '----------------- MODES --------------------'
	echo '* [1] newUser USER PASSWORD                *'
	echo '* [2] deleteUser ID                        *'
	echo '* [3] list                                 *'
	echo '* [4] getUser ID                           *'
	echo '---------------- EXAMPLES ------------------'
	echo '* $ ./tester.sh newUser zapper s3cret      *'
	echo '* $ ./tester.sh deleteUser 395af8as98fd894 *'
	echo '* $ ./tester.sh list                       *'
	echo '* $ ./tester.sh getUser 395af8as98fd894    *'
	echo '--------------------------------------------'
	echo
	exit 0
}

if [ "$#" -lt 1 ]; then
	Usage

elif [ "$1" == "newUser" ]; then
	if [ "$#" -ne 3 ]; then
		Usage
	else
		curl -X POST -H "Content-Type: application/json" -d '{"username": "'"$2"'", "password": "'"$3"'"}' --no-progress-meter http://localhost:8080/api/newUser | jq
	fi

elif [ "$1" == "deleteUser" ]; then
	if [ "$#" -ne 2 ]; then
		Usage
	else
		curl --no-progress-meter "http://localhost:8080/api/deleteUser/$2"
	fi

elif [ "$1" == "list" ]; then
	curl --no-progress-meter http://localhost:8080/api/users | jq

elif [ "$1" == "getUser" ]; then
	if [ "$#" -ne 2 ]; then
		Usage
	else
		curl --no-progress-meter "http://localhost:8080/api/user/$2"
	fi

else
	Usage
fi


