#!/bin/bash

npm version prerelease
git push --tags
npm publish