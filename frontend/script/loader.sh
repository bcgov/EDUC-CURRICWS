if test -z "$1" ; then
	echo "DO NOT LOAD"
else
	echo "$1"
	echo "$2"
	echo "$3"
	if [ "$1" == 1 ];
	then
		USERNAME=$1 PASSWORD=$2 DATABASE=$3 node loader.js
	fi
fi
