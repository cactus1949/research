<template>
    <div class="dashboard-container">
        <w-drawer :visible.sync="drawer" :with-header="false" show-close size="40%">
            <div class="drawer-container">
                <p>id: {{ node && node.id }}</p>
                <p>topic: {{ node && node.topic }}</p>
                <p>type: {{ node && node.type }}</p>
            </div>
        </w-drawer>
</div>
</template>

<script>
export default {
    name: "App",
    props: {
        nodeType: { // 节点类型
            type: String,
            default: '1'
        }
    },
    data() {
        return {
            drawer: false,
            node: null
        };
    },
    mounted() {
    },
    methods: {
        showDrawer() {
            this.drawer = true;
            this.node = this.$parent.$data.currentNode;
            console.log(this.node)
        },
        closeDrawer() {
            this.drawer = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.dashboard-container {
    .drawer-container {
        padding: 20px;
    }
}
</style>
