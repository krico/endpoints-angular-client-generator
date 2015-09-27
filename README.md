# endpoints-angular-client-generator [![Build Status](https://travis-ci.org/krico/endpoints-angular-client-generator.svg?branch=master)](https://travis-ci.org/krico/endpoints-angular-client-generator)
NodeJS module that generates a pure AngularJS javascript client based on your google endpoints service

## Why

Let me start by saying that **there is nothing wrong with google client.js**!  It is way better than the code this
tool generates!  Just include `https://apis.google.com/js/client.js` and you are done!

So why, why, why!  Well the integration of that client with "the angular way" is not ideal (IMO)

 * It doesn't use `$http` so the whole "handling of http errors, etc"  doesn't work
 * It doesn't use `$q` so you need to `$q.when` everything somehow
 * You need to hook up loading of client with startup of angular app (easy to get wrong)
 * Impossible to use with protractor (as protractor waits for `$http` and `$timeout`)
 * When I work on Bus, Tram or taxi with my laptop I need to go on 3G to be able to develop (to download client.js)
 * I ended up wrapping the client usage with an angular service, so every time I changed the backend (google endpoints)
 I had to go and change my hand-crafted wrapper.

So, I decided to try to simplify my life...  Let's see how it evolves!

## Status

This is still in very early stages... Documentation is poor, features are few...  It does what I need it to do.

Things I would like it to do:

 * Support authentication (Only API key supported atm)
 * Integrate with ng-resource
 * Generate documentation regarding data structures (request object, etc)
 * Maybe generate types for the schemas on the rest description document...

## Installing

Install using **npm**
~~~
npm i endpoints-angular-client-generator -g
~~~


## Usage

Here's what it can do for you:

~~~
$ endpoints-angular-client-generator -h

  Usage: endpoints-angular-client-generator [options] -d <file> -o <file>

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    -d, --document <file>       Read discovery document from <file>
    -o, --output-dir <dir>      Write generated code files to <dir>
    -s, --split-module          Split generated code into two files, one for the module another for provider
    -m, --module-name <name>    Override default module name to be "angular.module(<name>)"
    -p, --provider-name <name>  Override default provider/service name to be "angular.module().provider(<name>)"

~~~

### Examples

Have a look at [generate-examples.sh](scripts/generate-examples.sh) and how I used the output in [examples](examples/)
folder.  I'm getting it to work first, then I will write more examples and maybe publish that directory somehow.