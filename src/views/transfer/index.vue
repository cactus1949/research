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
                            <el-tree :data="targetData" show-checkbox node-key="id" :expand-on-click-node="false"
                                :check-strictly="true" default-expand-all :props="defaultPropsRight" ref="treeRight">
                            </el-tree>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Dashboard',
    computed: {
        ...mapGetters([
            'name'
        ])
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
    watch: {
        leftCheckedKeys(val) {
            console.log(val)
            if (val.length == 0) {
                this.targetData = []
            }
        }
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
            this.leftCheckedKeys = []
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
        filterData2(arr1, arr2, keys) {
            let children = this.defaultProps.children;
            let id = this.defaultProps.value;
            let rightArr = []
            let leftArr = []
            if (arr2) {
                arr2.map((item, index) => {
                    if (keys.indexOf(item[id]) != -1) {
                        rightArr.push({ noCheckedRight: true })
                        leftArr.push({ ...arr1[index], noCheckedLeft: false })
                    } else {
                        rightArr.push({ ...item })
                        leftArr.push({ ...arr1[index] })
                    }

                    if (item.hasOwnProperty(children) && item[children].length != 0) {
                        let childrenList1 = this._.cloneDeep(arr1[index][children])
                        let childrenList2 = this._.cloneDeep(item[children])
                        const { left, right } = this.filterData2(childrenList1, childrenList2, keys)
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
                let arr1 = this._.cloneDeep(this.data)
                let arr2 = this._.cloneDeep(this.targetData)
                const { left, right } = this.filterData2(arr1, arr2, checkedKeys)
                this.targetData = right;
                this.data = left;
                this.$refs.treeRight.setCheckedKeys([])

                this.leftCheckedKeys = this.leftCheckedKeys.filter(item => checkedKeys.indexOf(item) == -1)
                this.$refs.tree.setCheckedKeys(this.leftCheckedKeys)
            } else {
                this.$message.warning('请先勾选数据')
            }
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
