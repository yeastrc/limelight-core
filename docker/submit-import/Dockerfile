FROM amazoncorretto:11.0.17

ADD limelightSubmitImport.jar  /usr/local/bin/limelightSubmitImport.jar
ADD entrypoint.sh /usr/local/bin/entrypoint.sh
ADD limelightSubmitImport /usr/local/bin/limelightSubmitImport

RUN chmod 755 /usr/local/bin/entrypoint.sh && \
    chmod 755 /usr/local/bin/limelightSubmitImport && \
    yum install -y procps && \
    yum clean all && \
    rm -rf /var/cache/yum

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD []
