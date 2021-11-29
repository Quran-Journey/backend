npx swagger-inline "./*/*.js" --base oasBase.json --format .json > falafel.json
python3 formatOAS.py falafel.json 
redoc-cli bundle oas.json --options.theme.colors.primary.main=brown