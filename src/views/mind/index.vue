<template>
    <div class="dashboard-container">
        mind
        <div id="jsmind_container"></div>
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
    methods: {
        load_jsmind() {
            var mind = {
                meta: {
                    name: 'demo',
                    author: 'hizzgdev@163.com',
                    version: '0.2',
                },
                format: 'node_array',
                data: [
                    { id: 'root', isroot: true, topic: 'jsMind' },

                    {
                        'id': 'sub1',
                        'parentid': 'root',
                        'topic': 'sub1',
                        'background-color': '#0000ff',
                    },
                    { id: 'sub11', parentid: 'sub1', topic: 'sub11' },
                    { id: 'sub12', parentid: 'sub1', topic: 'sub12' },
                    { id: 'sub13', parentid: 'sub1', topic: 'sub13' },

                    { id: 'sub2', parentid: 'root', topic: 'sub2' },
                    { id: 'sub21', parentid: 'sub2', topic: 'sub21' },
                    {
                        'id': 'sub22',
                        'parentid': 'sub2',
                        'topic': 'sub22',
                        'foreground-color': '#33ff33',
                    },

                    { id: 'sub3', parentid: 'root', topic: 'sub3' },
                ],
            };
            var options = {
                container: 'jsmind_container', // 容器id
                editable: true, // 节点是否可以编辑
                theme: 'primary', // 主题
                mode: 'side', // 子节点只分布在根节点右侧
                support_html: false, // 节点内容 是否支持html
                view: {
                    draggable: true, // 当容器不能完全容纳思维导图时，是否允许拖动画布代替鼠标滚动
                    hide_scrollbars_when_draggable: true, // draggable == true 时，是否隐藏滚动条
                    engine: 'svg', // 各节点之间线条的绘制引擎
                    hmargin: 100, // 思维导图距容器外框的最小水平距离（像素）
                    vmargin: 50, // 思维导图距容器外框的最小垂直距离（像素）
                    line_width: 2, // 线条粗细
                    line_color: 'black', // 线条颜色
                    hspace: 30, // 节点之间的水平间距
                    vspace: 20, // 节点之间的垂直间距
                    // pspace: 30, // 节点收缩/展开控制器的尺寸 没用
                },
                shortcut: {
                    enable: true, // 是否启用快捷键
                },
                menuOpts: {
                    showMenu: true,
                    tipContent: '请选中节点！！！',
                    injectionList: [
                        {
                            target: 'edit', text: '编辑节点名称',
                            callback: function (node) {
                                console.log(node)
                            }
                        },
                        {
                            target: 'addChild', text: '添加子节点',
                            callback: function (node) {
                                console.log(node)
                            }
                        },
                        {
                            target: 'addBrother', text: '添加兄弟节点',
                            callback: function (node) {
                                console.log(node)
                            }
                        },
                        {
                            target: 'delete', text: '删除节点',
                            callback: function (node, next) {
                                console.log(node)
                            }
                        },

                        {
                            target: 'showAll', text: '展开全部节点',
                            callback: function (node, next) {
                                console.log(node)
                            }
                        },
                        {
                            target: 'hideAll', text: '收起全部节点',
                            callback: function (node, next) {
                                console.log(node)
                            }
                        },
                    ],

                }
            };
            var jm = jsMind.show(options, mind);
            // jm.set_readonly(true);
            // var mind_data = jm.get_data();
            // alert(mind_data);
            jm.add_node('sub2', 'sub23', 'new node', { 'background-color': 'red' });
            jm.set_node_color('sub21', 'green', '#ccc');
        }
    },
    mounted() {
        this.load_jsmind()
    }
}
</script>

<style lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;

        #jsmind_container {
            width: 100%;
            height: 80vh;
            border: solid 1px #ccc;
            /*background:#f4f4f4;*/
            background: #f4f4f4;
        }
    }

    &-text {
        font-size: 30px;
        line-height: 46px;
    }


}
</style>