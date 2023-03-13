FROM amazoncorretto:11-alpine-jdk

ADD limelight_importer_config_file.properties  /usr/local/bin/
ADD run_importer_config_file.properties  /usr/local/bin/
ADD limelightImporter_XMLFile_ScanFiles.jar  /usr/local/bin/
ADD limelightRunImporter.jar  /usr/local/bin/

ENTRYPOINT ["java", "-jar", "/usr/local/bin/limelightRunImporter.jar", "-c", "/usr/local/bin/run_importer_config_file.properties"]
