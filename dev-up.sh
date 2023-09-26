docker volume create mysql_data
docker volume create redis_data
docker volume create mongo_data
env $(cat ./.env.dev) docker compose -f ./docker-compose.dev.yml up
# env $(cat ./backend/.env.dev && cat ./frontend/.env) docker compose -f ./docker-compose.dev.yml up