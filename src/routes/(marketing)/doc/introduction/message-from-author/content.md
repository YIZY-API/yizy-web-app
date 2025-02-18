# A Message From the Author

Hello there! 👋🏻

Thanks for trying out Yizy!

My name is Kelvin and I have been building HTTP JSON APIs for most of my
programming career. I started with Restful APIs where I’d write the server code
and then write the client code. It has always bothered me that you don’t get
type safety across the server and client because servers and clients are often
written in different languages.

Soon I discovered Open API Specification. It’s basically a very complicated JSON
document describing what the endpoints of an API look like. It includes the
shape of the request and response models, security schemes, as well as other
useful information about the API.

Since Open API Specification describes the inputs and outputs of an endpoint in
a machine readable way, there are a lot of open source code generators that will
take the Open API Spec and generate client code so that you don’t have to write
it yourself. I immediately fell in love with building HTTP APIs this way. Not
only do you get type safety across the server and the client, but you also don’t
have to write the client implementation.

This code-first approach of building APIs works great until I had to generate
client code in multiple languages. Open API Spec has a lot of optional fields
and supports various ways to define complicated request and response models. It
sounds good on paper, but in reality, most code generators only choose to
support a subset of the features provided by Open API Spec. I started noticing
that sometimes the generated spec would generate unuseable client code in some
languages and I had to debug how the spec gets generated from code annotations
and how the client code gets generated from the spec.

Then I discovered a workflow called schema-first approach. In this approach, I’d
start API development with writing the Open API Specification by hand, and then
generate server and client code. With direct control over the content of the
spec, I can debug the generators more easily without having to go through the
pipeline of server code → spec → generated client code.

The schema-first approach is by far my favorite approach to build APIs. It
decouples the frontend and backend developers with a contract and enable the
frontend and backend devs to work in parallel. It also reduces a lot of back and
fourth communication between the teams and makes breaking changes very easy to
spot.

It has one caveat though. The amount of time and tedious effort it takes to set
up the toolchain for schema-first design does not justify the benefits it
brings, let alone convincing the devs in my team to write Open API Spec by hand.

So I decided to build Yizy. I am going to make Schema First/Contract First API
Design so unconventionally easy even your grandma could do it.
