'use server';
import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const editSnippet = async (id: number, code: string) => {
	await db.snippet.update({
		where: { id },
		data: { code },
	});
	revalidatePath(`/snippets/${id}`);
	redirect(`/snippets/${id}`);
};

export const deleteSnippet = async (id: number) => {
	await db.snippet.delete({
		where: { id },
	});
	redirect('/');
};

export async function createSnippet(
	formState: { message: string },
	formData: FormData,
) {
	try {
		const title = formData.get('title') as string;
		const code = formData.get('code') as string;
		if (!title || !code) {
			return { message: 'Code or title is not provided' };
		}
		const snippet = await db.snippet.create({
			data: {
				title,
				code,
			},
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			return { message: error.message || 'Something went wrong' };
		} else {
			return { message: 'Something went wrong' };
		}
	}
	// redirect should be always outside of the try-catch block because when redirect is called
	// it throws a special error that is caught in the catch block and we don't want that
	redirect('/');
}
