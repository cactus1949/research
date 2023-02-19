<template>
    <div class="dashboard-container">
        <div class="json-container">
            <w-input
                v-model.trim="newObj"
                type="textarea"
                rows="30"
            >
            </w-input>
            <div class="control-btns">    
                <el-button type="primary" @click="showMind">生成mind</el-button>
                <el-button type="primary" @click="getDefaultJSONData">获取模板</el-button>
            </div>
        </div>
        <w-dialog
            title="Basic Modal"
            :with-header='false'
            show-close
            :visible.sync="dialogVisible"
            width="80%"
            @cancel='handleCancel'>
            <div id="map"></div>
            <span slot="footer">
                <w-button @click="handleCancel">返回</w-button>
            </span>
        </w-dialog>
</div>
</template>

<script>
import MindElixir, { E } from "@/plugin/mind-elixir/MindElixir";

export default {
    name: "App",
    data() {
        return {
            ME: null,
            currentNode: {},
            dialogVisible: false,
            newObj: '',
            defaultData: {
                "nodeData": {
                    "id": "root",
                    "topic": "关于xx影响力的评估",
                    "type": "root",
                    "root": "true",
                    "children": [
                    {
                        "topic": "一级指标1",
                        "id": "bd4313fbac40284b",
                        "type": "1",
                        "direction": "0",
                        "expanded": "true",
                        "children": [
                        {
                            "topic": "二级指标",
                            "id": "c1f068377de9f3a0",
                            "type": "2",
                        },
                        ],
                    }
                    ],
                    "expanded": "true",
                }
            },
        };
    },
    computed: {
    },
    components: {
    },
    mounted() {
    },
    methods: {
        init(){
            this.ME = new MindElixir({
                el: '#map', // or HTMLDivElement
                direction: MindElixir.RIGHT, // MindElixir.LEFT / MindElixir.RIGHT 默认节点方向
                draggable: true, // default true 是否可拖拽
                contextMenu: false, // default true
                toolBar: true, // default true
                nodeMenu: false, // default true
                keypress: false, // default true
                editable: false,
                locale: 'zh_CN', // [zh_CN,zh_TW,en,ja,pt] waiting for PRs
                overflowHidden: false, // default false
                primaryLinkStyle: 2, // [1,2] default 1
                primaryNodeVerticalGap: 15, // default 25
                primaryNodeHorizontalGap: 15, // default 65
            });
            
            this.setData(JSON.parse(this.newObj))
            // this.ME.init(MindElixir.new("new topic"));
        },
        showMind(){
            if(this.isJsonString(this.newObj)){
                this.dialogVisible = true;
                this.$nextTick(()=>{
                    this.init()
                })
            }
        },
        handleCancel(){
            this.dialogVisible = false;
        },
        isJsonString(str) {
            try {
                if (typeof JSON.parse(str) == "object") {
                    return true;
                }
            } catch(e) {
                this.$message.error('请检查json格式')
            }
            return false;
        },
        getDefaultJSONData(){
            this.newObj = JSON.stringify(this.defaultData,null,4);
        },
        // objToJson(obj){
        //     console.log(obj)
        //     const result = JSON.stringify(obj,null,4)
        //     console.log(result)
        //     return result
        // },
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
        .control-btns{
            margin-top: 20px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #map {
            width: 100%;
            height: 60vh;
        }
    }

    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
</style>
