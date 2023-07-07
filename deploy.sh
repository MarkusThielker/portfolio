username=markus
server=server
image=portfolio-prod
version=${1:-"1.0.0"}

# build image and export to tar
docker image build --no-cache -t $image:"$version" .
docker image save -o portfolio-prod-"$version".tar portfolio-prod:"$version"
gzip portfolio-prod-"$version".tar

# copy image to server and load it
scp  portfolio-prod-"$version".tar.gz $username@$server:~/dev/portfolio/portfolio-prod-"$version".tar.gz
scp ./docker/portfolio-prod/docker-compose.yaml $username@$server:~/dev/portfolio/docker-compose.yaml
scp ./docker/portfolio-prod/.env $username@$server:~/dev/portfolio/.env

# execute remote script on server
ssh $username@$server "bash -s" < ./deploy-remote.sh $image "$version"

# clean up files
rm -rf portfolio-prod-"$version".tar.gz
