<template>
    <div class="dashboard-container">
        <w-container class="demo-layout-lr-dark demo-layout-lf">
            <w-aside>
                <w-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
                </w-tree>
            </w-aside>
            <w-container>
                <w-header>
                    <w-tabs v-model="activeName" @tab-click="handleClick">
                        <w-tab-pane :label="item.label" :name="item.name" v-for="item in tabList"
                            :key="item.label"></w-tab-pane>
                    </w-tabs>
                </w-header>
                <w-main>
                    <div class="content">
                        <w-table :data="tableData" style="width: 100%">
                            <w-table-column prop="name" label="Name" width="180">
                                <template slot-scope="scope">
                                    <span class='name'>{{ scope.row.name }}</span>
                                </template>
                            </w-table-column>
                            <w-table-column prop="age" label="Age" width="180">
                            </w-table-column>
                            <w-table-column prop="address" label="Address">
                            </w-table-column>
                            <w-table-column prop="action" label="Action">
                                <template slot-scope="scope">
                                    <w-button type="text">审核</w-button>
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
                }
            ],
            tabList: [
                {
                    label: '待我审核',
                    name: '1'
                },
                {
                    label: '我通过的',
                    name: '2'
                },
                {
                    label: '我驳回的',
                    name: '3'
                },
                {
                    label: '全部',
                    name: '4'
                },
            ],
            activeName: '1',
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
        handleNodeClick(data) {
            console.log(data);
        },
        handleClick(tab, event) {
            console.log(tab, event);
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
