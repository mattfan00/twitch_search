<template>
  <div class="results">
    <div v-if="loading" class="loading-icon">
      <img src="../assets/ellipsis.svg"/>
    </div>
    <div v-else>
      <div v-if="user" class="results-bar">
        <div>{{ user.username }}</div>
        <div>{{ user.followerCount }}</div>
      </div>
      <div v-else-if="err" class="err-bar">
        {{ err.message }}
      </div> 
    </div>
  </div>
</template>


<script>
export default {
  name: "ResultsBar",
  props: ['user', 'err', 'loading']
}
</script>

<style scoped>
.results {
  margin-top: 30px
}

.results-bar {
  background-color: #f3f3f3;
  border-radius: 10px;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
}

.err-bar {
  text-align: center;
}

.loading-icon {
  text-align: center;
}
.loading-icon img {
  width: 40px;
}

</style>