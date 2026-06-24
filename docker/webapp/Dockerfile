FROM tomcat:11.0-jdk25-temurin
MAINTAINER Michael Riffle <mriffle@uw.edu>

# Contents copied into Tomcat's lib/ (e.g. mysql-connector-j-<version>.jar)
ADD tomcat_lib_jars/ /usr/local/tomcat/lib/
ADD context.xml /usr/local/tomcat/conf
ADD setenv.sh /usr/local/tomcat/bin

ADD limelight.war /usr/local/tomcat/webapps
