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
	if [ "$#" -ne 5 ]; then
		Usage
	else
		curl -X POST -H "Content-Type: application/json" -d '{"username": "'"$2"'", "password": "'"$3"'", "email": "'"$4"'", "age": "'"$5"'"}' --no-progress-meter http://localhost:8080/api/register | jq
	fi

elif [ "$1" == "deleteUser" ]; then 
	if [ "$#" -ne 2 ]; then
		Usage
	else
		curl -k -X POST -H "Content-Type: application/json" -d '{"username": "'"$2"'"}' --no-progress-meter https://gloom.fib.upc.edu/api/deleteUser
	fi

elif [ "$1" == "list" ]; then
	curl --no-progress-meter http://localhost:8080/api/users | jq

elif [ "$1" == "getUser" ]; then
	if [ "$#" -ne 2 ]; then
		Usage
	else
		curl --no-progress-meter "http://localhost:8080/api/user/$2"
	fi

elif [ "$1" == "login" ]; then 
	if [ "$#" -ne 3 ]; then
		Usage
	else
		curl -X POST -H "Content-Type: application/json" -d '{"username": "'"$2"'", "password": "'"$3"'"}' --no-progress-meter http://localhost:8080/api/login
	fi

elif [ "$1" == "nearUsers" ]; then 
	if [ "$#" -ne 2 ]; then
		Usage
	else
		curl -k 	-X POST -H "Content-Type: application/json" -d '{"username": "'"$2"'"}' --no-progress-meter https://gloom.fib.upc.edu/api/getNearUsers
	fi

elif [ "$1" == "updateLocation" ]; then 
	if [ "$#" -ne 4 ]; then
		Usage
	else
		curl -X POST -H "Content-Type: application/json" -d '{"username": "'"$2"'", "longitude": "'"$3"'", "latitude": "'"$4"'"}' --no-progress-meter http://localhost:8080/api/updateLocation
	fi

elif [ "$1" == "updateUserInfo" ]; then 
	if [ "$#" -gt 4 ]; then
		Usage
	else
		curl -X POST -H "Content-Type: application/json" -d '{"username": "'"$2"'", "instagram": "'"$3"'", "twitter": "'"$4"'"}' --no-progress-meter http://localhost:8080/api/updateUserInfo
	fi

elif [ "$1" == "getUserInfo" ]; then 
	if [ "$#" -ne 2 ]; then
		Usage
	else
		curl -X POST -H "Content-Type: application/json" -d '{"username": "'"$2"'"}' --no-progress-meter http://localhost:8080/api/getUserInfo
	fi

else
	Usage
fi


