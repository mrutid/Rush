#!/bin/bash
set -x
set -e
TAG=$1
SCRPT=$2

#deploy
if [  "$1" != "-" ]
then
	rm -rf BRANCH
	mkdir BRANCH
	rm -f $TAG
	wget --no-check-certificate https://github.com/mrutid/Rush/zipball/$TAG
	unzip -d BRANCH -u $TAG
	NODE_DIR=`ls BRANCH` 
	pushd BRANCH/${NODE_DIR}
	if [ -f package.json ]; then
		npm install
	fi
	popd
fi


#start
if [ "$2" != "-" ]
then
NODE_DIR=`ls BRANCH` 
if [ -e "${SCRPT}.pid" ]
then
pid2kill=`cat ${SCRPT}.pid`
if [ -f /proc/$pid2kill/exe ]; then
    kill $pid2kill 
fi
rm ${SCRPT}.pid
fi
pushd BRANCH/${NODE_DIR}
nohup node ${SCRPT} </dev/null  >${SCRPT}.out  2>&1 &
SPID=$!
popd
#ps -fp  $SPID
echo $SPID > ${SCRPT}.pid
fi


