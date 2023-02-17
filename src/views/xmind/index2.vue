<template>
    <div class="dashboard-container">
        <div id="map"></div>
</div>
</template>

<script>
import mapSetting from "./components/third/mapSetting.vue";
// import MindElixir, { E } from "mind-elixir";
import MindElixir, { E } from "@/plugin/mind-elixir/MindElixir";
import example from './js/example.js'
import example2 from './js/example2.js'
import example3 from './js/example3.js'
export default {
    name: "App",
    data() {
        return {
            ME: null,
            currentNode: {},
        };
    },
    components: {
        mapSetting
    },
    mounted() {
        this.ME = new MindElixir({
            el: '#map', // or HTMLDivElement
            direction: MindElixir.RIGHT, // MindElixir.LEFT / MindElixir.RIGHT 默认节点方向
            draggable: true, // default true 是否可拖拽
            contextMenu: true, // default true
            toolBar: true, // default true
            nodeMenu: false, // default true
            keypress: true, // default true
            locale: 'zh_CN', // [zh_CN,zh_TW,en,ja,pt] waiting for PRs
            overflowHidden: false, // default false
            primaryLinkStyle: 2, // [1,2] default 1
            primaryNodeVerticalGap: 15, // default 25
            primaryNodeHorizontalGap: 15, // default 65
            // contextMenuOption: {
            //     focus: true,
            //     link: true,
            //     extend: [
            //         {
            //             name: 'Node edit',
            //             onclick: () => {
            //                 alert('extend menu')
            //             },
            //         },
            //     ],
            // },
        });
        this.ME.init(MindElixir.new("new topic"));

        this.ME.bus.addListener('operation', operation => {
            console.log(operation)
            // return {
            //   name: action name,
            //   obj: target object
            // }

            // name: [insertSibling|addChild|removeNode|beginEdit|finishEdit]
            // obj: target

            // name: moveNode
            // obj: {from:target1,to:target2}
        })

        this.ME.bus.addListener('selectNode', node => {
            console.log(node)
            this.currentNode = node;
            this.currentNode.fullName = this.getNodeFullName(this.currentNode)
            // drawer
            // this.$refs.mapSetingRef.showDrawer()


        })
        this.ME.bus.addListener('unselectNode', node => {
            console.log(node)
            this.currentNode = {};
            // this.currentNode.fullName = this.getNodeFullName(this.currentNode)
            // drawer
            // this.$refs.mapSetingRef.showDrawer()


        })

        this.ME.bus.addListener('expandNode', node => {
            console.log('expandNode: ', node)
        })



        this.setDefaultData()
    },
    methods: {
        getNodeFullName(node) {
            let nodeFullName = []
            while (node.parent && node.type != '0') {
                nodeFullName.unshift(node.topic)
                node = node.parent;
            }
            return nodeFullName.join('-');
        },
        setTestData() {
            this.ME.init(example3)
        },
        setDefaultData() {
            this.setData(example2)
        },
        setMoreData() {
            this.setData(example)
        },
        resetData() {
            this.setData(MindElixir.new("new topic"))
        },
        setData(data) {
            this.ME.init(data)
        }
    }
};
</script>
<style>
.lt {
    display: none !important;
}
</style>

<style lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;

        #map {
            width: 100%;
            height: calc(100vh - 200px);
        }

        .control-btns {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 20px;
        }
    }

    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
</style>
