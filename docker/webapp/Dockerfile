FROM tomcat:jdk11-corretto
MAINTAINER Michael Riffle <mriffle@uw.edu>

RUN yum install -y sendmail

ADD mysql-connector-java-5.1.29-bin.jar /usr/local/tomcat/lib
ADD context.xml /usr/local/tomcat/conf
ADD setenv.sh /usr/local/tomcat/bin

ADD limelight.war /usr/local/tomcat/webapps
