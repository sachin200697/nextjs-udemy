'use client';
// the issue with this error page showing, now user can see only the content of this error page
// and can not do anything else on the page
interface ErrorProps {
	error: Error;
	reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
	return (
		<div>
			<h2 style={{ color: 'red' }}>Error creating snippet</h2>
			<p>{error.message}</p>
			<button onClick={() => reset()}>Try again</button>
		</div>
	);
}
