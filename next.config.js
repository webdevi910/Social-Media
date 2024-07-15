/* eslint-disable @typescript-eslint/no-var-requires */

const withTM = require('next-transpile-modules')([]);

module.exports = withTM({
  swcMinify: false,
  trailingSlash: true,
  env: {
    HOST_API_KEY: 'https://minimal-assets-api.vercel.app',
    NEXT_CHUNK_CHUNK_UPLOAD:'https://devupload.gardenoflove.ir/graphql/',
    NEXT_PUBLIC_GQL_POST_TOKEN:'eyJraWQiOiJVZVwvY1pTSEVHaFB4MFhFV1FLS3pYRkJkNk9NUW5PWlg5ZHhPSTQzZktMYz0iLCJhbGciOiJSUzI1NiJ9.eyJvcmlnaW5fanRpIjoiMTU3Zjg4NjEtZTkwOC00ZGY5LTg0ZjktZTVlNjNkZDhjMTA4Iiwic3ViIjoiMjQ0ZGYxNDctMmFjZS00OGZkLWE2MDQtY2FiN2MzYzg0MmVkIiwiZXZlbnRfaWQiOiJhZjNmM2FjZC01M2ZjLTQ3OWQtYTAxYy03OTZiY2IwODcxNmIiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjQ5NjU0NDE5LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9SdzhWdW9ib0QiLCJleHAiOjE2NDk3NDA4MTksImlhdCI6MTY0OTY1NDQxOSwianRpIjoiZGI2Mzg2Y2QtZGU5NC00YmVjLWEwOTctNGY5ZDdlNDg2ZTMwIiwiY2xpZW50X2lkIjoiM2Y1cGFiNjltdG80NzNsZm0yYzA5aXZjN2siLCJ1c2VybmFtZSI6InNhaGFuZHphbWluaUBnbWFpbC5jb20ifQ.eq1QbKK46HXsDYq-Znu_1Ldf-o7qrBK-72yXZPOkiw54ulgX3YErxju2iy4wRemardSSYqPi-aS1eggJKPg-aiGkceWQA_ls3KfIJFbk97Laja2VkzuGy8YOcAmZ6LUwoAzZw9qYMiyQLPY43iQdDnIqR2hVThz0aDBYqVsc1Bu4XZfGHbJMU3vlYNvNGL8VaFWITj-LGEswytK0Q00I3f7C2LlcYvm5gPorfeYl_-0KmyviugJnqQvWL_AW9KYFgvClwBpEW12QyTWn0dhuUcPnKL2-SWRm3mVtUOKfsZfmsDjNNqbA-h51iO22YQa9hbAmxvgnDob7EGcsP6XJcQ'
  },
  images: {
    domains: [
      'static.kino.de',
      'www.teahub.io',
      'static.tvtropes.org',
      'via.placeholder.com',
      '95.216.218.153',
      'media0.giphy.com',
      'media1.giphy.com',
      'media2.giphy.com',
      'media3.giphy.com',
      'media4.giphy.com',
    ],
  },
});
