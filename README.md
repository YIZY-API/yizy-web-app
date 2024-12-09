# Introduction

I am a big fan of schema-first / contract-first design where I’d write an Open
API spec and then use code generators to generate server and client code. It’s a
pretty good workflow when it works, but it requires a lot of fiddling and setup
to get everything to work nicely across the stack such as

- writing the spec in json / yaml is tedious since there is limited code
  completion and a ton of optional fields, I find myself having to read the
  documentation constantly while writing the spec
- picking (installing, configuring, and testing) a generator that works
- finding the perfect combination between the spec style and the generated code
  (things like whether to define models inline or in the #components section, or
  sometimes the generator would outright ignore what I have in the spec
- always forgetting to update the version after changing the spec

# Simplify Open API Spec by Giving up Restful Conventions

Here is a crazy thought. What if we give up Restful conventions and use Open API
Spec for a simple POST-request-based JSON RPC described below?

- Use 'Action' instead of 'Resource' in url. Eg. /getUserById instead of
  /user/{'{id}'}
- Endpoints must only accept POST request with content type application/json.
- Endpoints must only allow POST requests with headers and a body. Query and
  path parameters are ignored
- Endpoints must return a response body with consistent schema regardless of
  status code

# Further Simplifying Open API Spec by Distilling It

- remove security (this can be documented either in the service description or
  endpoint description
- remove validation rules (this can be documented in the field description)
- remove the ability to define inline model

# The Result

We end up with a minimalistic spec that is both machine and human friendly.

![yizy-spec-example](https://github.com/YIZY-API/yizy-web-app/blob/master/src/lib/assets/exampleSpec.png?raw=true)
