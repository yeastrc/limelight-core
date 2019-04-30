
How to create a Limelight Importer Runnable Jar


This uses/requires the file aa_ant__build_all_limelight_config.properties at the root of the limelight-core folder.
(can be created from aa_ant__build_all_limelight_config.properties_Sample in same folder) 


Run ant__create_runnable_jar_run_importer.xml with ant:
  (in the same directory this file is in )

    ant -f ant__create_runnable_jar_run_importer.xml


This runs the gradle build in the parent folder (limelight_run_importer).


The created runnable jar file will be in 'deploy' sub-folder.



What is changed:

A runnable JAR is created:

	A manifest with the Java main class used in the importer


