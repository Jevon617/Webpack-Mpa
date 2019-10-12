
<template>
    <div class="app" @click="add">
        123123
        <div v-if="isShow">show</div>
    </div>
</template>

<script>
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
            sayHello()
        }
    }
}
</script>

<style scoped lang='scss'>
.app {
    color: black;
}
</style>
