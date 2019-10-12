
<template>
    <div class="app" @click="add">
        {{ count }}
        <child></child>
        <div v-if="isShow">show</div>
    </div>
</template>

<script>
import child from './child.vue'
import { sayHello } from '@/common/utils'
export default {
    data() {
        return {
            count: 111231,
            isShow: false
        }
    },
    methods: {
        add() {
            import('loadsh').then(res => {
                console.log('引入loadsh成功')
            })
        }
    },
    components: {
        child
    }
}
</script>

<style scoped lang='scss'>
.app {
    color: yellow;
}
</style>
