import { signIn, signOut } from '@auth/sveltekit/client'


export async function login() {
  await signIn('github')
}

export async function logout() {
  await signOut()
}