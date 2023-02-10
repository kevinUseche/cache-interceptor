<script setup>
  import { onMounted } from "vue"
  import { getData } from "./services/services"

  onMounted(async () => {
    const url = 'https://jsonplaceholder.typicode.com/todos/2'
    const data = await getData(url)
    console.log("🚀 ~ file: App.vue:8 ~ onMounted ~ data", data)
  })

</script>

<template></template>

<style scoped>

</style>
