docker volume create mysql_data
docker volume create redis_data
docker volume create mongo_data
env $(cat ./.env.prod) docker compose -f ./docker-compose.dev.yml up --build