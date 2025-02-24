#!/usr/bin/env bash

WARN='\033[0;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN}"
echo -e '░█▀▀░█▀▄░█░█░█▀▄░█▀▄░█░█  /\\_/\\'
echo -e '░█░░░█▀▄░█░█░█░█░█░█░░█░ ( o.o )'
echo -e '░▀▀▀░▀░▀░▀▀▀░▀▀░░▀▀░░░▀░  > ^ <'
echo ""
echo "Automating your CRUD operations"
echo -e "${NC}"

# check if the folder tools exists
[ ! -d "cruddy_tools" ] && echo -e "${RED}Error: cruddy_tools does not exist${NC}" && exit 1

# exit if the folder tools is empty
[ ! "$(ls -A cruddy_tools)" ] && echo -e "${RED}Error: cruddy_tools is empty${NC}" && exit 1

# exit if the folder src/model does not exist
[ ! -d "src/model" ] && echo -e "${RED}Error: src/model does not exist${NC}" && exit 1

# exit if the folder src/model is empty
[ ! "$(ls -A src/model)" ] && echo -e "${RED}Error: src/model is empty${NC}" && exit 1

# count the number of models in src/model
count=$(ls src/model/ | grep -v BaseModel | wc -l)
[ $count -eq 0 ] && echo -e "${RED}Error: src/model does not contain any models${NC}" && exit 1

echo -e "${BLUE}Info: found $count models to analize${NC}"

# call all sh files in tools
for file in cruddy_tools/*.sh; do
	echo ""
	echo ""
	echo -e "${BLUE}Info: Running $file${NC}"
	bash $file
done
