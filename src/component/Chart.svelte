<script lang="ts">
	import { subscribe } from '@/store/bunnystore';
	import type { initialState } from '@/utils/const';
	import { Chart } from 'chart.js/auto';
	import { fade } from 'svelte/transition';

	let ctx: HTMLCanvasElement | undefined;
	let chart: Chart | undefined;
	let stateGame: initialState;

	subscribe((state) => (stateGame = state));

	function accLetters(correct: boolean) {
		console.log(stateGame.incorrectLetter);
		const accLetter = correct ? 'correctLetter' : 'incorrectLetter';
		let total: number[] = [];
		Object.values(stateGame[accLetter]).forEach((value) => {
			total.push(value);
		});
		return total.reverse();
	}

	$: if (ctx) {
		if (chart) {
			chart.destroy();
		}
		chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: Array.from({ length: stateGame.time }, (_, i) => i + 1),
				datasets: [
					{
						label: '# of wpm',
						data: accLetters(true),
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)'
						],
						borderColor: [
							'#e2b714',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)'
						],
						borderWidth: 1
					},
					{
						label: '# of wpm',
						data: accLetters(false),
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)'
						],
						borderColor: ['rgba(255, 99, 132, 1)'],
						borderWidth: 1
					}
				]
			},
			options: {
				scales: {
					y: {
						title: {
							display: true,
							text: 'wpm'
						},
						beginAtZero: true
					},
					x: {
						title: {
							display: true,
							text: 'time'
						}
					}
				}
			}
		});
	}
</script>

<canvas bind:this={ctx} width="110" height="70" in:fade />
