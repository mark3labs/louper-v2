import user from '$lib/stores/user'
import { redirect } from '@sveltejs/kit'

export async function load() {
  let userValue

  user.subscribe((u) => {
    userValue = u
  })

  if (!userValue) {
    throw redirect(307, '/')
  }
}
