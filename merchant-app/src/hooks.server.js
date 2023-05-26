import { redirect } from '@sveltejs/kit';
import { USER_EMAIL, USER_PWD, USER_SESSION } from '$env/static/private';
const unProtectedRoutes = ['/sign-in'];

export const handle = async ({ event, request, resolve }) => {
	const sessionId = event.cookies.get('session_id');
	if (!sessionId && !unProtectedRoutes.includes(event.url.pathname)) {
		throw redirect(303, '/sign-in');
	}
	if (USER_SESSION == sessionId) {
		event.locals.user = {
			isAuthenticated: true,
			email: USER_EMAIL,
			id: USER_PWD
		};
	} else {
		if (!unProtectedRoutes.includes(event.url.pathname)) {
			throw redirect(303, '/sign-in');
		}
	}
	const query = event.url.searchParams.get('signout');
	if (Boolean(query) == true) {
		await event.cookies.delete('session_id', { path: '/' });
		throw redirect(303, '/sign-in');
	}
	return resolve(event);
};
