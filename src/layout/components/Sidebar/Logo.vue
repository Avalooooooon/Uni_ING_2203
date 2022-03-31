<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <div class="sidebar-logo-link">
        <img src="../../../assets/logo.jpg" style="width: 100%">
      <!--        <h1 v-else class="sidebar-title">{{ title }} </h1>-->
      </div>
      <!--      <router-link v-else key="expand" class="sidebar-logo-link" to="/">-->
      <!--      <img v-if="logo" src="logo" class="sidebar-logo">-->
      <!--        <h1 class="sidebar-title">{{ title }} </h1>-->
      <!--      </router-link>-->
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'Vue Element Admin',
      // logo: '../assets/logo.jpg'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #ffffff;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;

    & .sidebar-logo {
      width: 100%;
      height: 100%;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
