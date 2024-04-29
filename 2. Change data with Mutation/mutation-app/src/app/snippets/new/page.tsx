import { redirect } from "next/navigation";
import { db } from "@/db";

export default function page() {
    async function createSnippet(formData: FormData) {
        'use server';   //this string is to make it as server action
        // it means this function will execute on server (not in the browser)

        const title = formData.get('title') as string;
        const code = formData.get('code') as string;

        const snippet = await db.snippet.create({
            data: {
                title, code
            }
        });

        console.log(snippet);

        redirect('/');  //redirect to homepage
        

    }
  return (
    <div>
      <h1>Create New Snippet</h1>      
      <form action={createSnippet}>
        Title: <input type='text' placeholder='title' name='title'/> <br/><br/>
        Code: <textarea name='code'></textarea> <br/><br/>
        <button type='submit'>Save</button>
      </form>
    </div>
  );
}
