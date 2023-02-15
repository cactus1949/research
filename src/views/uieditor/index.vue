<template>
    <div class="dashboard-container">
        uieditor
        <TreeChart :json="treeData"></TreeChart>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TreeChart from "vue-tree-chart";
export default {
    name: 'Dashboard',
    computed: {
        ...mapGetters([
            'name'
        ])
    },
    components: {
        TreeChart
    },
    data(){
        return {
            treeData:   {
                name: 'root',
                image_url: "https://i.328888.xyz/2023/02/15/mgskb.jpeg",
                class: ["rootNode"],
                children: [
                {
                    name: 'children1',
                    image_url: "https://i.328888.xyz/2023/02/15/mgskb.jpeg"
                },
                {
                    name: 'children2',
                    image_url: "https://i.328888.xyz/2023/02/15/mgskb.jpeg",
                    mate: [{
                    name: 'mate',
                    image_url: "https://i.328888.xyz/2023/02/15/mgskb.jpeg"
                    }],
                    children: [
                    {
                        name: 'grandchild',
                        image_url: "https://i.328888.xyz/2023/02/15/mgskb.jpeg"
                    },
                    {
                        name: 'grandchild2',
                        image_url: "https://i.328888.xyz/2023/02/15/mgskb.jpeg"
                    },
                    {
                        name: 'grandchild3',
                        image_url: "https://i.328888.xyz/2023/02/15/mgskb.jpeg"
                    }
                    ]
                },
                {
                    name: 'children3',
                    image_url: "https://i.328888.xyz/2023/02/15/mgskb.jpeg"
                }
                ]
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;
    }

    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
</style>
