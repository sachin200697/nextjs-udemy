## Prisma setpu

npm i prisma

npx prisma init --datasource-provider sqlite //this command will generate prisma
folder.

-> prisma/schama.prisma -> make a model inside this file

model Snippet { id Int @id @default(autoincrement()) title String code String }

-> npx prisma migrate dev // to take latest updated changes

create a file => src/db/index.ts and create and export PrismaClient from it to
create records inside database.

## Next components

1. Normal components -> similar to react components but we need to use special
   string to make it: 'use client'; Limitations: 1. can not show a server
   component
2. Server Components -> we can directly use async/await in the component
   function.

Limitation of Server components:

1. can not use hooks.
2. can not assign event handlers

## Create route like /snippets/1

make file src/app/snippets/[id]/page.tsx

## notFound method from next/navigation

If we are using route like snippets/3 and 3 is not present in db then we can
show a inbuild component by returning: notFound();

we can customize this component by create a file not-found.tsx file inside [id]
folder.

## loading.tsx

loading.tsx retur a component that will be automatically displayed if fetching
date take some time.

It's like implementing a spinner component.

## some special file names inside app folder

1. page.tsx: displays primary content of the page
2. layout.tsx: wraps up the current displayed page Use to show content common
   accross many pages
3. not-found.tsx: displayed when we call notFound function
4. loading.tsx: displayed when a server component fetching some data.

   example: put this code to see if it is working

   await new promise(r=>setTimeout(r, 2000))

5. error.tsx: displayed when an error occures on server component 6. route.tsx:
   defines api endpoints

## Async Dynamic Params in Next.js 15

Find this code in /src/app/snippets/[id]/page.tsx:

const snippet = await db.snippet.findFirst({ where: { id:
parseInt(props.params.id) }, });

And change it to this:

const { id } = await props.params;

const snippet = await db.snippet.findFirst({ where: { id: parseInt(id) }, });

Also, we need to update the Interface and wrap the params in a Promise:

interface SnippetShowPageProps { params: Promise<{ id: string; }>; }

## Calling server actions from client

There are two way to do it:

1.  Pass server action from a Server component as props to a child Client
    component

2.  Create a separate file to define all server actions and directly import them
    from client component.

    Create a file => src/actions/index.ts

    code of index.ts: 'use server';

    export const editSnippet = (code: string, formData: FormData) { ..... }

    To call server actions from a client, we can use a form action attribute to
    call it:

    inside client component:

    import \* as actions from '@/actions';

    first aproach(prefered): with this aproach we can run action even without
    executing js on browser

         const clientAction = actions.editSnippet.bind(null, code)

         calling:
            <form action={clientAction}>
               <button type='save'>Click</button>
            </form>

    second aproach:

         import {startTransition} from 'react'
         // startTransition make sure that first we update data then navigate to some page


         in this case editSnippet server action will be like this:

         export const editSnippet = (code: string) { ..... }

         clinet file:
         cosnt handleClick = () => {
            startTransition(async () => {
               await actions.editSnippet(code)
            })
         }

## Communication from server action to client component

when we call a server action from a client component and if there is any error
occured or some validation failed then to communicate it back to client we can
use a special hook useActionState:

when we submit form the state defined with useActionState will also included in
formdata and will be send to server action. and if any error occured then this
state can be modified from server action. Then server action need to return this
object to update and rerender the client component.

useActionState in Next v15

In the upcoming lecture, we will be implementing the useFormState hook in our
code. If you are using Next.js v15, then you will need to make a slight change
to the import and name.

This is due to the useFormState hook being renamed to useActionState and moving
into the React core between the Canary release and the final React 19 stable
release.

https://react.dev/reference/react/useActionState

Change the import from this:

import { useFormState } from 'react-dom';

to this:

import { useActionState } from "react";

Change the hook name from this:

const [formState, action] = useFormState(actions.createSnippet, {

to this:

const [formState, action] = useActionState(actions.createSnippet, {
