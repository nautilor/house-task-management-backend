#!/usr/bin/env bash

WARN='\033[0;33m'
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${GREEN}"
echo -e '░█▀░░█░█░▀█░░░░█▀█░█▀█░█▀▄░█▀█░█▄█'
echo -e '░█░░░▄▀▄░░█░░░░█▀▀░█▀█░█▀▄░█▀█░█░█'
echo -e '░▀▀░░▀░▀░▀▀░░░░▀░░░▀░▀░▀░▀░▀░▀░▀░▀'
echo -e "${NC}"
# check if the folder src/parmam exists
[ ! -d "src/param" ] && mkdir -p src/param

# cycle through all files in src/model
for file in src/model/*; do
	[ "$file" == "src/model/BaseModel.ts" ] && continue
	echo -e "${BLUE}Info: Analizing $file${NC}"
	filename=$(basename -- "$file")
	filename="${filename%.*}"
	param="src/param/${filename}Params.ts"
	[ -f "$param" ] && echo  -e "${WARN}Warn: ignoring $param as it already exists${NC}" && continue
	echo -e "${BLUE}Info: Creating param $param${NC}"
	# extract all the fields from the model
	# it is always the line after the one conaining "@Column"
	# FIXME if the field type is like '1 | 2 | 3' it does not work
	fields=$(grep -A 1 "@Column" $file | grep -v "@Column" | awk '{print $1 $2}' | sed 's/\?//' | sed 's/!//' | sed 's/--//')
	echo "export interface ${filename}Params {" > $param
	for field in $fields; do
		echo "	$field" | sed 's/:/: /' >> $param
	done
	echo "}" >> $param
  echo "export const ${filename}ParamSchema = {" >> $param
  echo '	type: "object",' >> $param
  echo 'properties: {' >> $param
	# FIXME if the field type is like '1 | 2 | 3' it does not work
	for field in $fields; do
		fieldname=$(echo $field | awk -F ':' '{print $1}')
		fieldtype=$(echo $field | sed 's/.*://' | sed 's/;//g')
		echo "		$fieldname: { type: \"$fieldtype\" }," >> $param
	done
  echo '	},' >> $param
  echo '	required: [],' >> $param
  echo '	additionalProperties: false,' >> $param
echo '};' >> $param
	done
