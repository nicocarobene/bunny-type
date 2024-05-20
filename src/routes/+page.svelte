<script lang="ts">
	import { subscribe, restartBunnyGame } from '@/store/bunnystore';
	import GameComponent from '@/component/GameComponent.svelte';
	import Chart from '@/component/Chart.svelte';
	import type { initialState } from '@/utils/const';
	export let time = 5;
	let state: initialState;

	subscribe((value) => {
		state = value;
	});

	function accLetters(correct: boolean) {
		const accLetter = correct ? 'correctLetter' : 'incorrectLetter';
		let total = 0;
		Object.values(state[accLetter]).forEach((value) => (total += value));
		return total;
	}
	function acc() {
		let acc = accLetters(true);
		const accuracy = (acc * 100) / state.total;
		if (isNaN(accuracy)) return 0;
		return accuracy.toFixed(2);
	}
</script>

{#if state.gameOver}
	<div class="chart-container">
		<div>
			<h1>Game Over</h1>
			<div class="stats-container">
				<h2>
					score: {state.total}
				</h2>
				<div class="stats">
					<span> acc: <span class="stats-value">{acc()} %</span></span>
					<span> time: <span class="stats-value">{state.time}</span></span>
					<span> incorrect: <span class="stats-value"> {accLetters(false)}</span> </span>
					<span> correct: <span class="stats-value"> {accLetters(true)}</span></span>
				</div>
				<button on:click={() => restartBunnyGame()}>Play Again</button>
			</div>
		</div>
		<Chart />
	</div>
{:else}
	<GameComponent {time} mode="easy" />
{/if}

<style>
	button {
		padding: 1rem 3rem;
		border-radius: 0.5rem;
		cursor: pointer;
		width: max-content;
		outline: none;
		transition: background-color 0.05s linear;
		margin-top: 2rem;
	}
	button:hover {
		background-color: #d1d0c5d4;
	}
	.stats {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 1rem;
		margin-left: 10px;
	}
	span {
		color: #d1d0c5d8;
	}
	.stats-value {
		color: var(--main-color);
	}
	.chart-container {
		width: 80dvw;
		height: 80dvh;
		display: flex;
		flex: 1;
		gap: 2rem;
	}
	.stats-container {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
</style>
