<template lang="html">
  <div class="abstract">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
  .abstract {
    .card-wrapper {
      display: flex;
      flex-direction: column;
      .img {
        height: 150px;
      }
      .text {
        display: flex;
        justify-content: space-around;
        align-items: center;
        a {
          color: #20a0ff;
        }
      }
      img {
        width: 100%;
        height: 150px;
      }
    }
  }
</style>
