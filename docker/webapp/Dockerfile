FROM tomcat:11.0-jdk25-temurin
MAINTAINER Michael Riffle <mriffle@uw.edu>

# Contents copied into Tomcat's lib/ (e.g. mysql-connector-j-<version>.jar)
ADD tomcat_lib_jars/ /usr/local/tomcat/lib/
ADD context.xml /usr/local/tomcat/conf
# Tomcat fills ${NAME} in context.xml (DB user and password) from the process environment,
# so they are not passed as -D options on the Java command line (visible in ps / /proc/<pid>/cmdline)
RUN echo "org.apache.tomcat.util.digester.PROPERTY_SOURCE=org.apache.tomcat.util.digester.EnvironmentPropertySource" >> ${CATALINA_HOME}/conf/catalina.properties
ADD setenv.sh /usr/local/tomcat/bin

ADD limelight.war /usr/local/tomcat/webapps
