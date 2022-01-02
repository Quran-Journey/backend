npx swagger-inline "../model/*.js" "../routes/*.js" --base oasBase.json --format .json > temp.json
python3 formatOAS.py temp.json
rm temp.json
redoc-cli bundle oas.json --options.theme.colors.primary.main=brown
docker build . -t qj_docs
docker run -p 80:80 qj_docs