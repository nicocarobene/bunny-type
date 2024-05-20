<script lang="ts">
	import { login, logout } from '@/utils/auth';
	import type { User } from '@auth/sveltekit';
	export let user: User | undefined;
</script>

<header class="header">
	<a href="/">
		<h4>Bunny Game</h4>
	</a>

	{#if user}
		<div class="user">
			<a href="/profile">
				<img class="avatar" src={user.image} alt="{user.name} avatar" width="50" height="50" />
			</a>
			<button class="logout" on:click={logout}>Logout</button>
		</div>
	{:else}
		<button on:click={login}>Login</button>
	{/if}
</header>

<style>
	header {
		display: flex;
		align-items: center;
		justify-content: end;
	}
	.avatar {
		view-transition-name: avatar;
	}
	.user {
		width: max-content;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		position: relative;
	}
	.logout {
		position: absolute;
		visibility: hidden;
		bottom: -60%;
		left: 0;
	}
	.logout::before {
		content: ' ';
		position: absolute;
		top: -10px;
		left: 50%;
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-bottom: 10px solid gray;
		margin-left: -10px;
	}
	img {
		cursor: pointer;
		background: transparent;
		border-radius: 50%;
		margin-right: 1rem;
		aspect-ratio: 1/1;
	}

	header:hover .logout {
		visibility: visible;
	}
</style>
