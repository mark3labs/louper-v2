import user from '$lib/stores/user'

export async function load() {
  let userValue

  user.subscribe((u) => {
    userValue = u
  })

  if (!userValue) {
    throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
    return {
      redirect: '/',
    }
  }
}
