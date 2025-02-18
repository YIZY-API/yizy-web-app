# What Makes It Yizy?

## RPC over Restful

Yizy is tailored to help developers write RPC-like JSON API using POST requests.

## Action Based Routing Over Resource Based Routing

Instead of using 'resource' based routing, Yizy encourages developers to use
'action' based routing.

Here is an example.

Restful Url:

> `https://domain/api/users`

Yizy Url:

> `https://domain/api/getUserById`

## Pass Input with Request Body Instead of Using Query and Path Parameters

With traditional Restful API, there are many ways to pass in data to your
endpoint. You can use query parameters (eg. /users?name=Kelvin), path parameters
(eg. /users/{id}), request body and request headers.

There isn't a way to specify types for query parameters or path parameters, and
these make code generation difficult since the generator would have to check
many places for possible inputs and handle them accordingly. A better approach
is to include them in the request body where developers can specify types and
have more predictable output from the code generators.

**Use headers to handle auth. Use request body for input data.**

## Uniform Response Model For Different Status Code

Having different response interfaces across status code for the same endpoint
again makes code generation very difficult. I am a fan of how golang handles
error where functions return a result and a nullable error object. Developers
are encouraged to always check for error before consuming the result.

```typescript
interface Response {
  result: Result | null;
  error: Error | null;
}
```
