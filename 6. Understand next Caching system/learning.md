## Start Prisma

-> npx prisma migrate dev // to take latest updated changes

## Next caching

By Default next implements it's own caching machanism. Next user different types
of caching. Here are some types

1. Data cache: Responses from requests made with fetch are stored and used
   across requests

2. Router cache: Soft navigation b/w routes are cached in browser and reused
   when a user revisits a page

3. Request Memoization: make two or more 'GET' requests with fetch during a
   user's request to server? only one GET is actually executed

4. Full Route cache: at build time, next decides if your route is static or
   dynamic. if it is static, the page is rendered and result is stored. In
   production, users are given this pre-rendered result.

Disadvantage: In case of Full route cache, if we are showing some data on the
page and this page is static. Then next will stored pre-rendered result in build
time and will serve the same. But if we modify some data then next will not
consider it by default and will give the same pre-rendered result.

## Static and Dynamic

when we run 'next build' command then at last it gives some results like this:

```
┌ ○ /                                      165 B         105 kB
├ ○ /_not-found                            996 B         103 kB
├ ƒ /snippets/[id]                         165 B         105 kB
├ ƒ /snippets/[id]/edit                  4.64 kB         107 kB
└ ○ /snippets/new                          670 B         103 kB
+ First Load JS shared by all             102 kB
  ├ chunks/255-40634877ae3e8e9d.js       45.7 kB
  ├ chunks/4bd1b696-c023c6e3521b1417.js  54.2 kB
  └ other shared chunks (total)          1.96 kB

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand

```

with these symbols we can identify which route is dynamic or static

## what make a page dynamic

page using => cookies.set(), cookies.delete(), useSearchParams(), searchParams
Prop, fetch('...', { next: {revalidata: 0}}) api, folder path like:
/snippet/[id],

also page using these statements:

1. export const dynamic = 'force-dynamic'
2. export const revalidate = 0

## we have these options to solve cache issues

1.  Time-Based: Every x seconds, ignore the cached response and fetch new data

    export const revalidate = 3 // it means every 3 seconds this page will be
    re-rendered

2.  On-Demand: Forcibly purge a cached response

    import { revalidatePath } from 'next/cache'

    revalidate('/snippets') // call revalidatePath when we think data that
    '/snippets' routes uses has changes

3.  Disable Caching: Don't do any caching at all

    There are two ways to do it:

    1. export const dynamic = 'force-dynamic'
    2. export const revalidate = 0

## Enable caching for dynamic routes

By default caching will not work for dynamic routes. To enable a little bit
caching we can use 'generatStaticParams' function
