docker rm -vf $(docker ps -a -q)
docker rmi -f $(docker images -a -q)
docker volume rm `docker volume ls -q`

# use this command to enter container: docker exec -it [container id]  bash