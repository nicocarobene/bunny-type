<script lang="ts">
	import { onMount } from 'svelte';
	import {
		changeLetter,
		confirError,
		handleLetter,
		handleParent,
		toggleClass
	} from '@/utils/handleLetter';
	import { setTimeBunnyGame, gameOverBunnyGame } from '@/store/bunnystore';
	const words = ['Svelte', 'typescript', 'auth', 'playwright', 'sveltekit'];

	export let time = 30;
	let timeCounter = time;
	export let mode = 'easy';
	let startGame = false;
	console.log(time, mode);

	let input$: HTMLInputElement | null = null;
	let dialog$: HTMLDialogElement | null = null;
	let currentLetter$: HTMLSpanElement | null = null;

	onMount(() => {
		setTimeBunnyGame(time);
		window.addEventListener('input', (e) => {
			const event = e as InputEvent;
			handleInput(event);
		});
		if (!window) return;
		window.addEventListener('keydown', () => handleDialog(true));
		window.addEventListener('blur', () => handleDialog(false));

		return () => {
			input$?.removeEventListener('input', (e) => {
				const event = e as InputEvent;
				handleInput(event);
			});
			window.removeEventListener('keydown', () => {
				console.log('destroy event');
				handleDialog();
			});
		};
	});

	const initialCounter = () => {
		const timer = setInterval(() => {
			timeCounter -= 1;
			if (timeCounter === 0) {
				clearInterval(timer);
				gameOver();
			}
		}, 1000);
		return timeCounter;
	};

	const gameOver = () => {
		gameOverBunnyGame();
	};

	const handleInput = (e: InputEvent) => {
		if (!startGame) {
			startGame = true;
			initialCounter();
		}
		if (!input$) return;
		if (!currentLetter$) return;
		const value = e.data;
		const isTruthy = Boolean(value);
		if (!isTruthy) {
			if (
				currentLetter$.classList.contains('last-letter') &&
				currentLetter$.classList.contains('currentLetter')
			) {
				currentLetter$.classList.remove('last-letter', 'correct', 'incorrect');
				return;
			}
			currentLetter$.classList.remove('currentLetter');
			currentLetter$ = changeLetter({ element: currentLetter$, next: false });
			currentLetter$.classList.remove('correct', 'incorrect', 'last-letter');
			currentLetter$.classList.add('currentLetter');
			return;
		}
		if (value === ' ') {
			confirError(currentLetter$);
			const nextLetter = handleParent({ element: currentLetter$ });
			nextLetter?.classList.add('currentLetter');
			currentLetter$ = nextLetter;
			return;
		}
		const currentLetter = currentLetter$.textContent ?? '';
		const result = handleLetter({ userInput: value as string, currentLetter, second: timeCounter });
		toggleClass({ className: result, element: currentLetter$ });
		const nextLetter$ = changeLetter({ element: currentLetter$ });
		currentLetter$.classList.remove('currentLetter');
		currentLetter$ =
			nextLetter$ === currentLetter$
				? (nextLetter$.classList.add('last-letter', 'currentLetter'), nextLetter$)
				: (nextLetter$.classList.add('currentLetter'), nextLetter$);
	};

	const handleDialog = (toggle?: boolean) => {
		if (toggle) {
			dialog$?.close();
			input$?.focus();
			return;
		}
		input$?.blur();
		dialog$?.showModal();
	};
</script>

<section>
	<dialog bind:this={dialog$}>
		<button on:click={() => handleDialog(true)}>👆 Click here or press any key to focus </button>
	</dialog>
	<time datetime={timeCounter.toString()}> {timeCounter}</time>
	<input tabindex="0" type="text" name="" id="" bind:this={input$} />
	<p>
		{#each words as word, i}
			<span class="word" class:current={i === 0}>
				{#each word as letter, j}
					{#if j === 0 && i === 0}
						<span class="letter currentLetter" bind:this={currentLetter$}>{letter}</span>
					{:else}
						<span class="letter">{letter}</span>
					{/if}
				{/each}
			</span>
		{/each}
	</p>
</section>

<style>
	time {
		color: var(--main-color);
		font-size: 3rem;
	}
	input {
		opacity: 0;
	}
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 60vh;
	}

	p {
		font-size: 3rem;
	}

	.word:is(.error) {
		text-decoration: underline;
		text-decoration-color: var(--error-color);
	}
	.letter {
		color: var(--sub-color);
	}
	.letter:is(.correct) {
		color: var(--text-color);
	}
	.letter:is(.incorrect) {
		color: var(--error-color);
	}

	.currentLetter::before {
		content: '';
		border-left: 3px solid var(--caret-color);
		animation: pulse 1.2s infinite;
	}
	.letter:last-child:is(.last-letter)::before {
		border: none;
	}
	.letter:last-child:is(.last-letter)::after {
		content: '';
		border-left: 3px solid var(--caret-color);
		animation: pulse 1.2s infinite;
	}

	dialog {
		border-color: #d1d0c5d4;
		border-radius: 15px;
		padding: 0px;
		background-color: #64666927;
		overflow: hidden;
		& button {
			padding: 20px 40px;
			background-color: transparent;
			outline: none;
			border: none;
			width: max-content;
			font-size: 2rem;
			cursor: pointer;
			font-family: monospace;
		}
	}
	dialog::backdrop {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		backdrop-filter: blur(3px);
		background-color: rgba(0, 0, 0, 0.5);
	}

	dialog[open] {
		animation: show-dialog 0.3s ease-in-out;
	}

	@keyframes show-dialog {
		from {
			opacity: 0;
			transform: translateY(-100%);
		}
		to {
			opacity: 1;
			transform: translateY(0%);
		}
	}

	@keyframes pulse {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
