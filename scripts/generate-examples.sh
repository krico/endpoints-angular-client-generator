#!/bin/bash

endpoints-angular-client-generator -o example -d discovery/discovery-v1.discovery.json
endpoints-angular-client-generator -o example -d https://www.googleapis.com/discovery/v1/apis/discovery/v1/rest
endpoints-angular-client-generator -s -o example -d discovery/urlshortener-v1.discovery.json
endpoints-angular-client-generator -s -o example -d discovery/jasify-v1.discovery.json -m "jasifyEndpoint" -p "Jas"