ps -ef| grep nodemon | awk '{print $2}' | xargs kill -15
ps -ef| grep index.js | awk '{print $2}' | xargs kill -15
nodemon dist/index.js > webout.log & 
ps -ef| grep gulp | awk '{print $2}' | xargs kill -15
gulp > buildout.log &
sleep 10
curl --data "param1=value1&param2=value2" http://weolopez.duckdns.org:3000/api/v1/heroes
pwd

