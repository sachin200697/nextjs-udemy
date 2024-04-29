import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/db';

interface SnippetShowPageProps {
    params: {
        id: string
    }
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
    const id = parseInt(props.params.id);
    // if go to http://localhost:port/snippets/1 then 
    console.log(props); //{ params: { id: '1' }, searchParams: {} }
    const snippet = await db.snippet.findFirst({where: {id}});
    if(!snippet){
        //notFound will try to find closest not-found.tsx file, it means it will try to find the 
        // file in the same component and if now present there then will try to find it parent 
        // folder and so on. if at the last if does not found the file then it render 
        // defaul not found component.
        return notFound();
    }
  return (
    <div>
      <h1>{snippet?.title}</h1>
      <Link href={`/snippets/${id}/edit`}>Edit</Link>
      {' '}
      <Link href={'/'}>Delete</Link>
      <pre><code>{snippet?.code}</code></pre>
    </div>
  );
}
