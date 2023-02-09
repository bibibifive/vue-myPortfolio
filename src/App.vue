<script setup>
import { RouterLink, RouterView } from 'vue-router'
import navigate from './components/nav/navigate.vue'
</script>

<template>
  <header>
    <navigate></navigate>
  </header>
  <main>
    <RouterView />
  </main>

</template>

<!--   <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView /> -->


<style lang="scss" scoped>
header {
  width: inherit;
  height: 10vh;
  flex: 0;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid var(--color-border);
}

main {
  flex: 1;
}


nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
