#!/bin/bash

# DEFINE FILES
torWorkingDir="/full/path/to/project/here/";
torSourceFile="template.js";
torOutputFile="tor-redirect.js";
ProductionDir="/var/www/website/path/here/";

# DATE FORMAT
torLastUpdate=$(date -u)

# GET INFO FROM TORPROJECT.ORG
torExitIPList=$(curl --silent https://check.torproject.org/torbulkexitlist?ip=1.1.1.1 | grep -v "#" | sort -u | awk '{print "\"" $1 "\","}' | tr -d "\n" | sed 's/.$//')

# COMPILE OUTPUT FILE
sed 's/\#DATE\#/'"$torLastUpdate"'/g;s/\#ARRAY-OF-TOR-IPS\#/'"$torExitIPList"'/g' $torWorkingDir$torSourceFile > $torWorkingDir$torOutputFile;

# COPY TO PRODUCTION SITE FOLDER
rsync -avz $torWorkingDir$torOutputFile $ProductionDir$torOutputFile;
