#!/bin/bash

endpoints-angular-client-generator -o example -d discovery/discovery-v1.discovery.json
endpoints-angular-client-generator -o example -d discovery/urlshortener-v1.discovery.json
endpoints-angular-client-generator -o example -d discovery/jasify-v1.discovery.json