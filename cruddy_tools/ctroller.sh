#!/usr/bin/env bash

WARN='\033[0;33m'
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${GREEN}"
echo -e '░█▀░░█░█░▀█░░░░█▀▀░█▀█░█▀█░▀█▀░█▀▄░█▀█░█░░░█░░░█▀▀░█▀▄'
echo -e '░█░░░▄▀▄░░█░░░░█░░░█░█░█░█░░█░░█▀▄░█░█░█░░░█░░░█▀▀░█▀▄'
echo -e '░▀▀░░▀░▀░▀▀░░░░▀▀▀░▀▀▀░▀░▀░░▀░░▀░▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀░▀░▀'
echo -e "${NC}"

# check if the folder src/controller exists
[ ! -d "src/controller" ] && mkdir -p src/controller

# cycle through all files in src/model
for file in src/model/*; do
	[ "$file" == "src/model/BaseModel.ts" ] && continue
	echo -e "${BLUE}Info: Analizing $file${NC}"
	filename=$(basename -- "$file")
	filename="${filename%.*}"
	controller="src/controller/${filename}Controller.ts"
	[ -f "$controller" ] && echo  -e "${WARN}Warn: ignoring $controller as it already exists${NC}" && continue
	echo -e "${BLUE}Info: Creating controller $controller${NC}"
	upper_filename=$(echo $filename | awk '{print toupper($0)}')
	lower_filename=$(echo $filename | awk '{print tolower($0)}')

	# check if the file controller.ts.template exists
	[ ! -f "cruddy_tools/controller.ts.template" ] && echo -e "${RED}Error: cruddy_tools/controller.ts.template does not exist${NC}" && exit 1
	
	# load the template
	template=$(cat cruddy_tools/controller.ts.template)

	# replace the placeholders
	# replace FILENAME_UPPER with the upper case filename
	template=$(echo "$template" | sed "s/FILENAME_UPPER/$upper_filename/g")
	# replace FILENAME_LOWER with the lower case filename
	template=$(echo "$template" | sed "s/FILENAME_LOWER/$lower_filename/g")
	# replace FILENAME with the filename
	template=$(echo "$template" | sed "s/FILENAME/$filename/g")
	# create the controller file
	echo "$template" > $controller

done

