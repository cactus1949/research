<template>
    <div class="dashboard-container">
        <div>
            <el-row style="height: 70vh;">
                <el-col :span="10">
                    <div class="transfer-box-title">未选中</div>
                    <div class="transfer-box">
                        <div class="transfer-box-content left-tree">
                            <el-tree :data="data" show-checkbox node-key="id" ref="tree" :check-strictly="true"
                                default-expand-all :expand-on-click-node="false" :props="defaultProps">
                            </el-tree>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="control-btns">
                        <i class="el-icon-arrow-right" @click="add"></i>
                        <i class="el-icon-arrow-left" @click="del"></i>
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="transfer-box-title">已选中</div>
                    <div class="transfer-box">
                        <div class="transfer-box-content right-tree">
                            <custom-tree :data="targetData" show-checkbox node-key="id" :expand-on-click-node="false"
                                :check-strictly="true" default-expand-all :props="defaultPropsRight" ref="treeRight">
                            </custom-tree>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import customTree from '@/components/customTree/src/tree.vue'
function recursion(obj, cb) {
    if (Array.isArray(obj) && obj.length > 0) {
        for (const item of obj) {
            if (item.children) recursion(item.children, cb);
            typeof cb == "function" && cb(obj, item);
        }
    }
}
export default {
    name: 'Dashboard',
    computed: {
        ...mapGetters([
            'name'
        ])
    },
    components: {
        customTree
    },
    data() {
        return {
            perId: '',
            btnLoading: false,
            selectedrightRows: [],
            leftCheck: '',
            rightCheck: '',
            defaultProps: {
                children: 'children',//子集
                label: 'label',//显示的文本
                value: 'id',
                disabled: 'noCheckedLeft'
            },
            defaultPropsRight: {
                children: 'children',//子集
                label: 'label',//显示的文本
                value: 'id',
                disabled: 'noCheckedRight'
            },
            targetData: [],
            getNodeId: [],//初始化时获取所有勾选的id
            checkedKeys: [], // 选中的keys
            leftCheckedKeys: [],
            rightCheckedKeys: [],
            data: [],
        };
    },
    mounted() {
        this.getAllTreeList()
    },
    methods: {
        //获取所有菜单信息
        getAllTreeList() {
            this.data = [
                {
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [
                        {
                            id: 5,
                            label: '二级 2-1'
                        }
                    ]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }
            ]
            this.leftCheckedKeys = [9, 2, 5]
            this.$refs.tree.setCheckedKeys(this.leftCheckedKeys)
            if (this.leftCheckedKeys && this.leftCheckedKeys.length != 0) {
                let arr = this._.cloneDeep(this.data)
                const { left, right } = this.filterData(arr, this.leftCheckedKeys)
                this.targetData = right
                this.data = left
            }
        },
        filterData(arr, keys) {
            let children = this.defaultProps.children;
            let id = this.defaultProps.value;
            let rightArr = []
            let leftArr = []
            if (arr) {
                arr.map((item, index) => {
                    if (keys.indexOf(item[id]) != -1) {
                        rightArr.push(item)
                        leftArr.push({ ...item, noCheckedLeft: true })
                    } else {
                        leftArr.push(item)
                        rightArr.push({ noCheckedRight: true })
                    }

                    if (item.hasOwnProperty(children) && item[children].length != 0) {
                        let childrenList = this._.cloneDeep(item[children])
                        const { left, right } = this.filterData(childrenList, keys)
                        rightArr[index][children] = right;
                        leftArr[index][children] = left;
                    }
                })
            } else {
                return { right: [], left: [] }
            }
            return { right: rightArr, left: leftArr }
        },
        // 向右
        add() {
            let checkedKeys = this.$refs.tree.getCheckedKeys()
            if (checkedKeys.length > this.leftCheckedKeys.length) {
                this.leftCheckedKeys.push(...checkedKeys)
                this.leftCheckedKeys = [...new Set(this.leftCheckedKeys)]
                this.$refs.tree.setCheckedKeys(this.leftCheckedKeys)
                let arr = this._.cloneDeep(this.data)
                const { left, right } = this.filterData(arr, this.leftCheckedKeys)
                this.targetData = right;
                this.data = left;
            } else {
                this.$message.warning('请先勾选数据')
            }
        },
        // 向左
        del() {
            let checkedKeys = this.$refs.treeRight.getCheckedKeys()
            if (checkedKeys.length > this.rightCheckedKeys.length) {
                // this.rightCheckedKeys.push(...checkedKeys)
                // this.rightCheckedKeys = [...new Set(this.rightCheckedKeys)]
                // this.$refs.treeRight.setCheckedKeys(this.rightCheckedKeys)
                // let arr = this._.cloneDeep(this.data)
                // const { left, right } = this.filterData(arr, this.rightCheckedKeys)
                // this.targetData = right;
                // this.data = left;
            } else {
                this.$message.warning('请先勾选数据')
            }
        },
        /**
         *selectedKeys参数为勾选的id，不包含半勾选
         selectedNodes参数为获取所有勾选的node
         targetData参数为操作后获得的结果数据
         data参数为需要操作勾选的源数据 **/
        handleData(selectedKeys, selectedNodes, targetData, data) {
            selectedNodes.forEach((nodes) => {
                let parentNode;
                recursion(targetData, function (obj, item) {
                    //寻找要插入的元素的父节点是否存在
                    if (nodes.rightParentid == item.rightId) parentNode = item;
                });
                //初始化要插入的节点数据
                let nodeObj = {
                    rightId: nodes.rightId,
                    rightName: nodes.rightName,
                    rightParentid: nodes.rightParentid,
                };
                nodes.rightParentid && (nodeObj.nodeObj = nodes.rightParentid);
                nodes.children && (nodeObj.children = []);
                //如果找到父节点,那么代表是子节点，没有找到那么就是一级节点。
                if (parentNode) {
                    //判断父节点是否已经存在这个节点。如果不存在就插入
                    if (
                        !parentNode.children.find((item) => item.rightId == nodes.rightId)
                    )
                        parentNode.children.push(nodeObj);
                } else {
                    //一级节点需要在顶层数组里插入
                    if (!targetData.find((item) => item.rightId == nodes.rightId))
                        targetData.push(nodeObj);
                }
            });
            //删除选中的元素
            recursion(data, function (obj, item) {
                selectedKeys.forEach((delItem) => {
                    //找到选中的元素删除
                    let index = obj.findIndex((findItem) => {
                        return delItem == findItem.rightId;
                    });
                    index > -1 && obj.splice(index, 1);

                });
            });
        },
    }
}
</script>
<style lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;

        .control-btns {
            display: flex;
            flex-direction: column;
            cursor: pointer;
            align-items: center;
            justify-content: center;
            height: 100%;

            i {
                padding: 10px;
            }
        }
    }

    &-text {
        font-size: 30px;
        line-height: 46px;
    }


}

.el-col {
    height: 100%;
}

.transfer-box-title {
    margin-bottom: 10px;
}

.transfer-box {
    height: 100%;
    border: 1px solid gainsboro;

    .transfer-box-content {
        padding: 10px;
    }
}
</style>
