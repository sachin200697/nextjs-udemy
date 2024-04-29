## Prisma setpu

npm i prisma

npx prisma init --datasource-provider sqlite   //this command will generate prisma folder.

-> prisma/schama.prisma  -> make a mode inside this file 

model Snippet {
  id Int @id @default(autoincrement())
  title String
  code String
}

-> npx prisma migrate dev  // to take latest updated changes

create a file => src/db/index.ts  and create and export PrismaClient from it to create records inside 
database.

## Next components

1. Normal components -> similar to react components but we need to use special string to make it: 
   'use client';
   Limitations: 1. can not show a server component
2. Server Components -> we can directly use async/await in the component function.
   
Limitation of Server components:
1. can not use hooks. 
2. can not assign event handlers

## Create route like /snippets/1

make file src/app/snippets/[id]/page.tsx

## notFound method from next/navigation

If we are using route like snippets/3 and 3 is not present in db then we can show a inbuild component
by returning: notFound();

we can customize this component by create a file not-found.tsx file inside [id] folder.

## loading.tsx

loading.tsx retur a component that will be automatically displayed if fetching date take some time.

It's like implementing a spinner component.