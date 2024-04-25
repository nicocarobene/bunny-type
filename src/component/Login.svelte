<script lang="ts"> 
import {login, logout} from '@/utils/auth'
	import type { User } from '@auth/sveltekit';
export let user: User|undefined

</script>


<header>

  {#if user}
    <div class="user">
      <img src={user.image} alt="{user.name} avatar" width="50" height="50"/>
      <button class="logout" on:click={logout}>Logout</button>
    </div>
    {:else}
    <button on:click={login}>Login</button>
  {/if}
</header>
<style>
  header{
    display: flex;
    align-items: center;
    justify-content: end;
  }
  .user{
    width: max-content;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    position: relative;
  }
  .logout{
    position: absolute;
    visibility: hidden;
    bottom: -50%;
  }
  img{
    cursor: pointer;
    background: transparent;
    border-radius: 50%;
    margin-right: 1rem;
    aspect-ratio: 1/1;
  }

  header:hover .logout{
    visibility: visible;
  }

</style>