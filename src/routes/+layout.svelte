<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import Login from '@/component/Login.svelte';
	import type { User } from '@auth/sveltekit';
	import { io } from 'socket.io-client';
	export let data;
	const { session } = data;
	let user: User | undefined;
	if (session) {
		user = session.user;
	}

	const socket = io();

	socket.on('eventFromServer', (message) => {
		console.log(message);
	});
</script>

<Login {user} />
<main>
	<slot />
</main>

<style>
	:root {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		background-color: #323437;
		color-scheme: light dark;
		color: CanvasText;
		font-family: monospace;
		--main-color: #e2b714;
		--error-color: #ca4754;
		--text-color: #d1d0c5;
		--caret-color: #e2b714;
		--sub-color: #646669;
		--win-color: #11a8ab;
	}
	main {
		max-width: 1200px;
		display: grid;
		place-content: center;
		margin: auto;
	}
</style>
