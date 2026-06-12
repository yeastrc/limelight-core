FROM tomcat:11.0-jdk25-temurin
MAINTAINER Michael Riffle <mriffle@uw.edu>

ADD mysql-connector-java-8.0.26.jar /usr/local/tomcat/lib
ADD context.xml /usr/local/tomcat/conf
ADD setenv.sh /usr/local/tomcat/bin

ADD limelight.war /usr/local/tomcat/webapps
