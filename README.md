- Don't create a type called Subscriptions ... It's reserved for um...subscriptions
- Introspec occurs on startup meaning dependant downstream services will need to be restarted when schema is updated (unless we duplicate schema which defeats the purpose of stitching)

- Things to try... conflicts with the same type
Basically look at https://www.apollographql.com/docs/graphql-tools/schema-stitching.html#complex-example

onTypeConflict
