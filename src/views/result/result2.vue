<template>
    <div class="dashboard-container">
        <w-container class="demo-layout-lr-dark demo-layout-lf">
            <w-aside>
                <w-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
                </w-tree>
            </w-aside>
            <w-container>
                <w-header height="auto">
                    <w-form class="header-container" :inline="true" ref='form' :model='form' label-width="auto">
                        <w-form-item label="指数名称：" prop="name">
                            <w-input v-model="form.name" placeholder="请输入指数名称"></w-input>
                        </w-form-item>
                        <w-form-item label="类型：" prop='type'>
                            <w-select v-model="form.type" placeholder="请选择">
                                <w-option v-for="item in typeOptions" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </w-option>
                            </w-select>
                        </w-form-item>
                        <w-form-item label="发布状态：" prop='status'>
                            <w-select v-model="form.stauts" placeholder="请选择">
                                <w-option v-for="item in statusOptions" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </w-option>
                            </w-select>
                        </w-form-item>
                        <w-button type="primary" @click="search">查询</w-button>
                        <w-button type="primary" @click="resetSearch">重置</w-button>
                        <w-button type="primary" @click="handleClickAdd">新建</w-button>
                        <w-button type="primary" @click="handleClickDelete">删除</w-button>
                    </w-form>
                </w-header>
                <w-main>
                    <div class="content">
                        <w-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
                            <w-table-column type="selection" width="55">
                            </w-table-column>
                            <w-table-column prop="name" label="Name" width="180">
                                <template slot-scope="scope">
                                    <span class='name'>{{ scope.row.name }}</span>
                                </template>
                            </w-table-column>
                            <w-table-column prop="age" label="Age" width="180">
                            </w-table-column>
                            <w-table-column prop="address" label="Address" width="180">
                            </w-table-column>
                            <w-table-column prop="age" label="Age" width="180">
                            </w-table-column>
                            <w-table-column prop="address" label="Address" width="180">
                            </w-table-column>
                            <w-table-column prop="age" label="Age" width="180">
                            </w-table-column>
                            <w-table-column prop="address" label="Address" width="180">
                            </w-table-column>
                            <w-table-column prop="age" label="Age" width="180">
                            </w-table-column>
                            <w-table-column prop="address" label="Address" width="180">
                            </w-table-column>
                            <w-table-column prop="age" label="Age" width="180">
                            </w-table-column>
                            <w-table-column prop="address" label="Address" width="180">
                            </w-table-column>
                            <w-table-column prop="age" label="Age" width="180">
                            </w-table-column>
                            <w-table-column prop="address" label="Address" width="180">
                            </w-table-column>
                            <w-table-column prop="action" label="操作" width="350">
                                <template slot-scope="scope">
                                    <w-button type="text">查看</w-button>
                                    <w-button type="text">编辑</w-button>
                                    <w-button type="text">发布</w-button>
                                    <w-button type="text">指数分析</w-button>
                                </template>
                            </w-table-column>
                        </w-table>
                    </div>
                </w-main>
                <w-footer>
                    <w-pagination layout="->,total,prev, pager, next,sizes,jumper" :total="total"></w-pagination>
                </w-footer>
            </w-container>
        </w-container>
</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "Dashboard",
    computed: {
        ...mapGetters(["name"]),
    },
    data() {
        return {
            multipleSelection: [],
            form: {
                name: '',
                type: 0,
                stauts: 0
            },
            typeOptions: [
                {
                    label: '全部',
                    value: 0
                },
                {
                    label: '主题指数',
                    value: 1
                },
                {
                    label: '价格指数',
                    value: 2
                },
                {
                    label: '评价指数',
                    value: 3
                },
                {
                    label: '景气指数',
                    value: 4
                },
            ],
            statusOptions: [
                {
                    label: '全部',
                    value: 0
                },
                {
                    label: '已发布',
                    value: 1
                },
                {
                    label: '未发布',
                    value: 2
                }
            ],
            total: 50,
            tableData: [
                {
                    name: 'Wen Ge',
                    age: 32,
                    address: 'text'
                },
                {
                    name: 'John Brown',
                    age: 38,
                    address: 'text'
                },
                {
                    name: 'John Brown',
                    age: 52,
                    address: 'text'
                },
                {
                    name: 'John Brown',
                    age: 52,
                    address: 'text'
                }
            ],
            data: [{
                label: '一级 1',
                children: [{
                    label: '二级 1-1',
                    children: [{
                        label: '三级 1-1-1'
                    }]
                }]
            }, {
                label: '一级 2',
                children: [{
                    label: '二级 2-1',
                    children: [{
                        label: '三级 2-1-1'
                    }]
                }, {
                    label: '二级 2-2',
                    children: [{
                        label: '三级 2-2-1'
                    }]
                }]
            }, {
                label: '一级 3',
                children: [{
                    label: '二级 3-1',
                    children: [{
                        label: '三级 3-1-1'
                    }]
                }, {
                    label: '二级 3-2',
                    children: [{
                        label: '三级 3-2-1'
                    }]
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        };
    },
    mounted() { },
    watch: {},
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        search() {
            this.$message({
                type: 'info',
                message: '查询'
            })
        },
        resetSearch() {
            this.form = {
                name: '',
                type: 0,
                stauts: 0
            },
                this.search()
        },
        handleClickAdd() {

        },
        handleClickDelete() {
            if (this.multipleSelection && this.multipleSelection.length != 0) {
                // delete
                this.$message.success('删除成功')
            } else {
                this.$message.warning('请选择')
            }
        },
        handleNodeClick(data) {
            console.log(data);
            this.search()
        }
    },
};
</script>
<style lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;

        .demo-layout-lf {
            height: 400px;

            .w-aside {
                overflow: auto;
            }
        }

        .demo-layout-lr-dark {
            padding: 20px;
            box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.12);
            height: calc(100vh - 120px);

            .w-aside {
                background-color: #fff;
                border-right: 1px solid rgba(0, 0, 0, 0.12);
                z-index: 3;
                width: 25vw;
            }

            .w-container {
                .w-header {
                    background: #fff;
                    display: flex;
                    align-items: center;

                    .header-container {
                        width: 100%;
                    }

                    i {
                        cursor: pointer;
                        font-size: 20px;
                    }
                }

                .w-main {
                    display: flex;
                    flex-direction: column;
                    padding: 0;



                    .content {
                        padding: 20px;
                        background: #fff;
                        flex: 1;
                    }
                }
            }
        }
    }

    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
</style>
