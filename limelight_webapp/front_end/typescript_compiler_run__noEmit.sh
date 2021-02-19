

##  Run Typescript compiler with noEmit to get Errors

echo
echo 'running tsc --noEmit to detect Typescript compilation errors'
echo

date

./node_modules/typescript/bin/tsc --noEmit >tsc_NoEmit_out.txt 2> tsc_NoEmit_err.txt

exit_code=$?

 date

if [  $exit_code != 0 ]; then

	echo
	echo 'tsc exit code is NOT zero.  Typescript compilation errors Found.  check sysout tsc_NoEmit_out.txt for errors'
	echo
	echo 'less tsc_NoEmit_out.txt'
	echo

	exit 1
else
	echo
	echo 'tsc exit code IS zero.  NO Typescript compilation errors found.'
	echo
fi

