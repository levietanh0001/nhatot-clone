
env $(cat ./backend/.env.prod && cat ./frontend/.env)
docker volume create mysql_data
docker volume create redis_data
docker volume create mongo_data
docker compose -f ./docker-compose.prod.yml up --build