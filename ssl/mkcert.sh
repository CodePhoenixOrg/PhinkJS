#!/bin/bash

if [ ! -d certs ];
then 
	mkdir certs;
fi
cd certs;

openssl req \
	-newkey rsa:2048 \
	-nodes \
	-keyout hello.key \
	-out hello.csr \
	-subj "/C=FR/ST=IDF/L=Paris/O=CodePhoenixOrg/OU=Phink/CN=David Blanchard/emailAddress=dblanchard1@bbox.fr"

openssl x509 \
	-signkey hello.key \
	-in hello.csr \
	-req \
	-days 365 \
	-out hello.crt
