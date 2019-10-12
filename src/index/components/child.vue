<template>
    <div>
        <img src="../images/depositad.jpg" alt />
        <ul>
            <li v-for="item in list" :key="item">
                <a :href="isPro && '/mpa/mobile.html' || '/mobile.html'">{{ item }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [1, 2, 3, 4, 5, 10010]
        }
    },
    computed: {
        isPro() {
            return process.env.NODE_ENV === 'production'
        }
    }
}
</script>

<style scoped lang='scss'>
div {
    color: red;
    ul {
        li {
            line-height: 100px;
        }
    }
}
</style>
