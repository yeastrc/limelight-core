# The DB user and password reach context.xml from the environment (EnvironmentPropertySource, see the Dockerfile),
# not as -D options on the Java command line
JAVA_OPTS="-server"

CATALINA_OPTS="${WEBAPP_JAVA_OPTIONS}"
