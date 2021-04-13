FROM amazoncorretto:11-alpine-jdk

COPY limelight_importer_config_file.properties  /usr/local/bin/
COPY run_importer_config_file.properties  /usr/local/bin/
COPY limelightImporter_XMLFile_ScanFiles.jar  /usr/local/bin/
COPY limelightRunImporter.jar  /usr/local/bin/

ENTRYPOINT ["java", "-jar", "/usr/local/bin/limelightRunImporter.jar", "-c", "/usr/local/bin/run_importer_config_file.properties"]
