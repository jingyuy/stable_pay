import { redirect } from '@sveltejs/kit';

/**
 * @param {{ locals: { user: any; }; }} event
 */
export function load(event) {
	if (!event.locals.user) {
		throw redirect(303, '/sign-in');
	}
	return {
		user: event.locals.user
	};
}
