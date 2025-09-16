// in the previous folder name: '2 3 4 Change data with Mutation', this component was a server component
// but to perform some validation on client side, we need to make this a client component,
// so we need to move createSnippet function to a actions file and import it here
'use client';
import { useActionState } from 'react';
import * as actions from '@/actions';

export default function page() {
	// useFormState (migrated to useActionState in next>=15) is a hook that takes a server action and
	// an initial state
	// that passes the form state (an object like {message: ''}) to the server action
	// formState is the current state of the form and action gives the updated version of the server action
	// when the form is submitted, the action function is called with the form data and the current form state
	// and the formState is updated with the new state returned from the server action
	// this way we can show error messages or loading states on the client side
	const [formState, action] = useActionState(actions.createSnippet, {
		message: '',
	});

	return (
		<div>
			<h1>Create New Snippet</h1>
			<form action={action}>
				Title: <input type='text' placeholder='title' name='title' /> <br />
				<br />
				Code: <textarea name='code'></textarea> <br />
				<br />
				<div>
					{formState.message && (
						<p style={{ color: 'red' }}>{formState.message}</p>
					)}
				</div>
				<button type='submit'>Save</button>
			</form>
		</div>
	);
}
