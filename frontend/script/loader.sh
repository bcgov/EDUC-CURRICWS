if test -z "$1" ; then
	echo "DO NOT LOAD"
else
	echo "$1"
	if [ "$1" == 1 ];
	then
		node loader.js
	fi
fi
