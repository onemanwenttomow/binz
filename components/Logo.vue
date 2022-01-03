<template>
  <div class="logo-container">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style scoped>
.logo-container {
  display: flex;
  gap: 1px;
  background-color: #1a202c;
  border: solid 1px #1a202c;
}

.logo-container div {
  height: 50px;
  width: 25px;
}

.logo-container div:nth-child(1) {
  background-color: #68d391;
}
.logo-container div:nth-child(2) {
  background-color: #f6e05e;
}
.logo-container div:nth-child(3) {
  background-color: #cbd5e0;
}
.logo-container div:nth-child(4) {
  background-color: #63b3ed;
}
</style>
