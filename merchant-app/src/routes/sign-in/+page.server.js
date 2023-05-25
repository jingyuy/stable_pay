import { fail, redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { USER_EMAIL, USER_PWD, USER_SESSION } from '$env/static/private';

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = form.get('email');
		const password = form.get('password');

		if (email === '' || password === '') {
			throw redirect(307, '/sign-in');
		}
		if (email !== USER_EMAIL || password !== USER_PWD) {
			return fail(400, { email, incorrect: true });
		}

		cookies.set('session_id', USER_SESSION, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: !dev,
			maxAge: 60 * 60 * 24 * 7 // one week
		});
		throw redirect(303, '/');
	}
};
