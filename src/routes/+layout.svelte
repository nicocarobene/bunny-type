<script lang="ts">
	import Login from '@/component/Login.svelte';
	import type { User } from '@auth/sveltekit';
  export let data
  const  {session}= data 
  let user: User|undefined
  if(session){
    user = session.user
 }

</script>

<Login {user}/>
<main>
  <slot/>
</main>



<style>
  :root{
    color-scheme: light dark;
    color: CanvasText;
  }
  main{
    max-width: 1200px;
    display: grid;
    place-content: center;
    margin: auto;
  }
</style>



