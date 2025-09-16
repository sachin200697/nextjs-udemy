## Start Prisma

-> npx prisma migrate dev // to take latest updated changes

## Command to upgrade to latest next

npm install next@latest react@latest react-dom@latest eslint-config-next@latest

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

## Breaking Changes in Forms with React 19

In the upcoming lecture, we will implement displaying validation errors when
submitting our form. React 19 (which Next.js 15 uses by default) introduces some
major breaking changes in regards to form submissions. Notably, forms are now
reset after submission by default.

https://github.com/facebook/react/issues/29034#issuecomment-2143595195

As of now, we will need to make a few major adjustments to the code that will
mitigate the resetting of the form.

In src/app/snippets/new/page.tsx:

1. import the startTransition hook

import { useActionState, startTransition } from "react";

2. Create a handleSubmit function

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
event.preventDefault(); const formData = new FormData(event.currentTarget);
startTransition(() => { action(formData); }); }

4. Pass the new handleSubmit function to the onSubmit prop to opt out of the
   form reset

<form onSubmit={handleSubmit}>

Completed page.tsx

"use client";

import { useActionState, startTransition } from "react";

import \* as actions from "@/actions";

export default function SnippetCreatePage() { const [formState, action] =
useActionState(actions.createSnippet, { message: "", });

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
event.preventDefault(); const formData = new FormData(event.currentTarget);
startTransition(() => { action(formData); }); } return (

<form onSubmit={handleSubmit}> <h3 className="font-bold m-3">Create a
Snippet</h3> <div className="flex flex-col gap-4"> <div className="flex gap-4">
<label className="w-12" htmlFor="title"> Title </label> <input
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          /> </div>

        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>

        {formState.message ? (
          <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
            {formState.message}
          </div>
        ) : null}

        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>

); }

## Error handling

To handle errors we need to create a error.tsx file. This file must be a client
component.

Create a file /src/snippets/new/error.tsx

## use of redirect inside a try catch block

redirect should be always outside of the try-catch block because when redirect
is called it throws a special error that is caught in the catch block and we
don't want that
