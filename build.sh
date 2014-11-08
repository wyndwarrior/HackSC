rm -rf build
mkdir build
javac -cp "/usr/share/tomcat7/lib/*:/usr/share/tomcat7/bin/bootstrap.jar:/usr/share/tomcat7/bin/tomcat-juli.jar" src/*.java -d build
DIR='server/WEB-INF/classes'
rm -rf $DIR
mkdir $DIR
cp build/* $DIR

