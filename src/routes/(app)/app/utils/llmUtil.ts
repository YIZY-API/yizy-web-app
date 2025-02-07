export function buildSystemPrompt(spec: string): string {
  const sys =
    `<yizy-spec> is a simplified http JSON API specification format that supports documenting endpoints that takes in POST requests and return responses in json. 
  <yizy-spec>${spec}</yizy-spec>

  <role>You are an API expert who is able to answer all kinds of question about how to interact with APIs documented by <yizy-spec></role>`;
  console.log(sys);
  return sys;
}
