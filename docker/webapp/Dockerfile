FROM tomcat:9-jdk11-corretto
MAINTAINER Michael Riffle <mriffle@uw.edu>

ADD mysql-connector-java-8.0.26.jar /usr/local/tomcat/lib
ADD context.xml /usr/local/tomcat/conf
ADD setenv.sh /usr/local/tomcat/bin

ADD limelight.war /usr/local/tomcat/webapps
