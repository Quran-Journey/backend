#!/bin/bash
# declare -a arr=("https://fb.watch/9aSafKsOsJ/" "https://fb.watch/9aSbzuAuBP/" "https://fb.watch/9aSc73-k1N/" "https://fb.watch/9aSc_GuVUO/" "https://fb.watch/9aSg8LpHaA/")

# for i in "${arr[@]}"
# do
#     let x++;
#     mkdir $x;
#     cd $x;
#     youtube-dl --extract-audio --audio-format mp3 $i;
#     cd ..;
# done


POSITIONAL=()
while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
    -u|--url)
      URL="$2"
      shift # past argument
      shift # past value
      ;;
    -l|--location)
      LOCATION="$2"
      shift # past argument
      shift # past value
      ;;
    -n|--name)
      NAME="$2"
      shift # past argument
      shift # past value
      ;;
    *)    # unknown option
      POSITIONAL+=("$1") # save it in an array for later
      shift # past argument
      ;;
  esac
done

set -- "${POSITIONAL[@]}" # restore positional parameters

# This needs some fixing... tbh we don't really need this script

if [ -z ${NAME+x} ] && [ -z ${URL+x} ]; then
    echo "Usage: ./download_audio.sh -u url -n name"
else
    if ! [ -z ${LOCATION+x} ]; then
        if ! [ -d $LOCATION ]; then
            cd $LOCATION; # Just to get the error message
            echo "Usage: ./download_audio.sh -u url -l location -n name"
            exit;
        fi
        cd $LOCATION;
    fi
    youtube-dl --extract-audio --audio-format mp3 $URL --output "${NAME}.%(ext)s" > /dev/null;
    if ! [ -z ${LOCATION+x} ]; then 
        cd -;
    fi
fi