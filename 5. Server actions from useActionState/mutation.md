## Start Prisma

-> npx prisma migrate dev // to take latest updated changes

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
