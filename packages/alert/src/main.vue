<template>
  <transition name="alert-fade">
    <div class="qun-alert"
         v-if="visible"
         @click.self="handleHide"
         @touchmove.prevent>
      <div class="container">
        <i class="icon-close"
           @click="handleHide">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAAGz7rX1AAAAAXNSR0IArs4c6QAAAkNJREFUSA2tVbtOw0AQjCOlSAqgQsJxSJOamiChlPxGeBSAaPiDdCkpeDUQ+BNKUvEFKSIl+QGqVDYzJ49lX+4sg7CU7Hl3ZnZv7+Fau92+rdlPGIYJf/TX7eD/vSuFFO1346/kzEAYjCUnC9+8jmc3iqLXnDNutVoHAR0KxHF8CufObDb7FrBGbXTpTQ7TEDhJ3w6CIBY7SJ0ZXQExC7bb7e5Re0z9UiRoVCauoECSiyxwr9fbEsFMUy+0JGO6Z/JxMoVpI7Cx9OwPCZj1O+16vb6jdT6uMgh0lc3WzRHrusogSY/KbjQaYYBVWS2XywjlFDsjdGqBG2I4qCdJEuIlht1oiDiIXyHO5d6vEcgW8+ciEcwY7KcEvCQnWCw7kw9cqJskAGOJoBHT1WrV1zttYRHTTt0IgO4daSxbILAMBB6oTACzuRphyHbN9pwMSH82WH4nyQf2kcyiubohAm2uezEnFuWDZePRaFQ3mw8KIYG4XCaLxeIibW8Z1xvjFKH3CIBZY2h1ApbY6XRe8if1L8kc4tNms3nCE5/tqL8mKxPXdLMkclRNVkVcmhtJFPAlQ1u/gLnHTz3P2iKubb1JBHQlY4zbUT0X1mcLZ9AFwj14qds4H0fyQ97KLCLvd429Sdhz3Go86E8govBgyosZVwu/oxOKcUcCZz5+Zck2qqi6oBStuvWzJFXF7XZUScYTPwSQ0zcJf7Og+YSuZNB6RnuvuSYDJsDzkfa8b3+X82K+MfgJbvdzrhnFgeNn4ph31w+u4Z5CKRx7ygAAAABJRU5ErkJggg=="></i>
        <slot></slot>
        <template v-if="!isSlot">
          <h3 class="title"
              v-if="title">{{title}}</h3>
          <span :class="['msg',type]"
                v-html="message"></span>
        </template>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Alert',
  props: {
    type: {
      default: 'info',
      type: String,
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['info', 'warn', 'error', 'ok'].indexOf(value) !== -1
      }
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: true,
      timer: null,
      oldHash: window.location.hash
    }
  },
  computed: {
    isSlot() {
      return this.$slots.default
    }
  },
  methods: {
    handleHide() {
      this.hide()
    },
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
      clearInterval(this.timer)
    },
    checkRouter() {
      this.timer = setInterval(() => {
        if (window.location.hash !== this.oldHash) {
          this.hide()
        }
      }, 100)
    }
  },
  mounted() {
    this.checkRouter()
  }
}
</script>
<style lang="scss" scoped>
@import '../../theme-default/style/var.scss';
@import '../../theme-default/style/mixin.scss';
.alert-fade-enter-active,
.alert-fade-leave-active {
  transition: opacity 0.3s;
}

.alert-fade-enter,
.alert-fade-leave-to {
  opacity: 0;
}

.qun-alert {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: $__mask-background-color;
  z-index: $__mask-zindex;
  .container {
    width: $__message-box-width;
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2em 1em;
    background-color: $__white;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    border-radius: 0.4em;
    min-height: 5em;
    @include MQ(md) {
      width: 26em;
    }
    .icon-close {
      position: absolute;
      right: 1em;
      top: 1em;
      width: 1em;
      height: 1em;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .title {
      margin-bottom: 1em;
      font-size: 1.2em;
    }
    .msg {
      font-size: 1em;
      color: $__black;
      line-height: 1.2;
      &.info {
        color: $__black;
      }
      &.warn {
        color: $__yellow;
      }
      &.error {
        color: $__red;
      }
      &.ok {
        color: $__green;
      }
    }
  }
}
</style>
