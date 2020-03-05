<template>
<v-container>
    <template>
    <p>{{statedeneme}}</p>
    </template>
</v-container>
</template>

<script>
export default {
    name: 'HelloWorld2',

    data: () => ({

    }),

    methods: {

    },
    computed: {
        statedeneme() {
            return this.$store.getters.countreturn
        },
    },

}
</script>
