#!/usr/bin/env bash

WARN='\033[0;33m'
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${GREEN}"
echo -e '░█▀░░█░█░▀█░░░░█▀▄░█▀▀░█▀█░█▀█░█▀▀░▀█▀░▀█▀░█▀█░█▀▄░█░█'
echo -e '░█░░░▄▀▄░░█░░░░█▀▄░█▀▀░█▀▀░█░█░▀▀█░░█░░░█░░█░█░█▀▄░░█░'
echo -e '░▀▀░░▀░▀░▀▀░░░░▀░▀░▀▀▀░▀░░░▀▀▀░▀▀▀░▀▀▀░░▀░░▀▀▀░▀░▀░░▀░'
echo -e "${NC}"


# check if the folder src/repository exists
[ ! -d "src/repository" ] && mkdir -p src/repository

# cycle through all files in src/model
for file in src/model/*; do
	[ "$file" == "src/model/BaseModel.ts" ] && continue
	echo -e "${BLUE}Info: Analizing $file${NC}"
	filename=$(basename -- "$file")
	filename="${filename%.*}"
	repository="src/repository/${filename}Repository.ts"
	[ -f "$repository" ] && echo  -e "${WARN}Warn: ignoring $repository as it already exists${NC}" && continue
	echo -e "${BLUE}Info: Creating repository $repository${NC}"
	echo 'import datasource from "@config/init";' > $repository
	echo "import $filename from \"@model/${filename}\";" >> $repository
	echo "" >> $repository
	echo "export const ${filename}Repository = datasource.getRepository($filename);" >> $repository
done
