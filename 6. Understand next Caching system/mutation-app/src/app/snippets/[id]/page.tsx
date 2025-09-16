import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/db';
import * as actions from '@/actions';

interface SnippetShowPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
	const { id } = await props.params;

	// if go to http://localhost:port/snippets/1 then
	console.log(props); //{ params: { id: '1' }, searchParams: {} }
	const snippet = await db.snippet.findFirst({ where: { id: parseInt(id) } });
	if (!snippet) {
		//notFound will try to find closest not-found.tsx file, it means it will try to find the
		// file in the same component and if not present there then will try to find it parent
		// folder and so on. if at the last if does not found the file then it render
		// defaul not found component.
		return notFound();
	}

	const handleDeleteSnippet = actions.deleteSnippet.bind(null, parseInt(id));
	return (
		<div>
			<h1>{snippet?.title}</h1>
			<Link href={`/snippets/${id}/edit`}>Edit</Link>{' '}
			<form action={handleDeleteSnippet}>
				<button type='submit'>Delete</button>
			</form>
			<pre>
				<code>{snippet?.code}</code>
			</pre>
		</div>
	);
}

// this function is used to generate static params for dynamic routes
// it will be called at build time to enable caching for dynamic routes
export async function generateStaticParams() {
	const snippets = await db.snippet.findMany();
	return snippets.map((snippet) => ({
		id: snippet.id.toString(), // it should be string
	}));
}
