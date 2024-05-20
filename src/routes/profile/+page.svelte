<script lang="ts">
	export let data;

	const { session } = data;
	const historyGame = {
		victory: 0,
		draw: 0,
		lose: 0
	};
</script>

<section class="profile__container">
	<aside class="profile__menu">
		<h3>Menu Box</h3>
		<ul>
			<li><a href="/messages">Messages</a></li>
			<li><a href="/acountSetting">Account Setting</a></li>
		</ul>
	</aside>
	<main class="profile__content">
		<article class="profile__profile">
			<img
				class="profile__avatar"
				src={session?.user?.image}
				alt="Avatar profile picture of {session?.user?.name}"
			/>
			<h2 class="profile__name">{session?.user?.name}</h2>
			<p class="profile__email">{session?.user?.email}</p>
			<div>
				<ul class="profile__history">
					<li class="profile__history-item">
						<span>{historyGame.draw}</span>
						<span> Draw </span>
					</li>
					<li class="profile__history-item">
						<span>{historyGame.victory}</span>
						<span> Win </span>
					</li>
					<li class="profile__history-item">
						<span>{historyGame.lose}</span>
						<span> Lose </span>
					</li>
				</ul>
			</div>
		</article>
	</main>
</section>

<style>
	.profile__menu {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2rem;
		view-transition-name: avatar;
		& ul {
			display: flex;
			gap: 1rem;
			flex-direction: column;
			list-style: none;
			& a {
				text-decoration: none;
				color: var(--main-color);
			}
		}
	}
	.profile__history {
		display: flex;
		gap: 1rem;
		list-style: none;
		padding: 2rem;
		gap: 2rem;
	}
	.profile__history-item:first-child {
		border-top: 3px solid var(--main-color);
	}
	.profile__history-item:nth-child(2) {
		border-top: 3px solid var(--win-color);
	}
	.profile__history-item:nth-child(3) {
		border-top: 3px solid var(--error-color);
	}
	.profile__history-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
	}

	.profile__container {
		display: flex;
		justify-content: center;
		align-items: start;
		gap: 5rem;
		width: 100%;
	}
	.profile__profile {
		width: 100%;
		padding: 3rem;
		display: flex;
		gap: 1rem;
		border-radius: 0.5rem;
		border: 3px solid var(--main-color);

		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.profile__avatar {
		width: 200px;
		background-color: transparent;
		border-radius: 50%;
		border: 3px solid var(--main-color);
		aspect-ratio: 1/1;
	}
	.profile__name {
		font-size: 3rem;
		color: var(--main-color);
	}
	.profile__email {
		font-size: 1.5rem;
		opacity: 0.7;
	}
</style>
