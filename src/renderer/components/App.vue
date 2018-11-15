<template>
  <div id="app">
    <div id="NativeTitlebar"></div>
    <router-view/>
  </div>
</template>

<style>
#NativeTitlebar {
  width: 100%;
  height: 1.5rem;
  -webkit-app-region: drag;
}
</style>