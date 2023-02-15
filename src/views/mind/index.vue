<template>
    <div class="dashboard-container">
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
                format: 'node_tree',
                // "data": {
                //     "id": "root", "topic": "萝卜价格指数", "children": [
                //         {
                //             "id": "1", "topic": "地区1-价格", "direction": "left", "children": [
                //                 {
                //                     "id": "2", "topic": "收购萝卜价格", children: [
                //                         {
                //                             id: 9, topic: "鲜销萝卜", children: [
                //                                 {
                //                                     id: 10, topic: '采集点1'
                //                                 },
                //                                 {
                //                                     id: 11, topic: '采集点2'
                //                                 }
                //                             ]
                //                         },
                //                         {
                //                             id: 12, topic: "加工萝卜", children: [
                //                                 {
                //                                     id: 13, topic: '采集点1'
                //                                 },
                //                                 {
                //                                     id: 14, topic: '采集点2'
                //                                 }
                //                             ]
                //                         }
                //                     ]
                //                 },
                //                 {
                //                     "id": "3", "topic": "批发萝卜价格", children: [
                //                         {
                //                             id: 15, topic: "鲜销萝卜(带泥)", children: [
                //                                 {
                //                                     id: 16, topic: '采集点1'
                //                                 },
                //                                 {
                //                                     id: 17, topic: '采集点2'
                //                                 }
                //                             ]
                //                         },
                //                         {
                //                             id: 18, topic: "鲜销萝卜（水洗）", children: [
                //                                 {
                //                                     id: 19, topic: '采集点1'
                //                                 },
                //                                 {
                //                                     id: 20, topic: '采集点2'
                //                                 }
                //                             ]
                //                         },
                //                         {
                //                             id: 21, topic: "加工萝卜", children: [
                //                                 {
                //                                     id: 22, topic: '采集点1'
                //                                 },
                //                                 {
                //                                     id: 23, topic: '采集点2'
                //                                 }
                //                             ]
                //                         }
                //                     ]
                //                 },
                //                 {
                //                     "id": "4", "topic": "礼品萝卜价格", children: [
                //                         {
                //                             id: 24, topic: '礼品萝卜', children: [
                //                                 {
                //                                     id: 25, topic: '采集点1'
                //                                 },
                //                                 {
                //                                     id: 26, topic: '采集点2'
                //                                 }
                //                             ]
                //                         }
                //                     ]
                //                 },
                //             ]
                //         },
                //         {
                //             "id": "5", "topic": "地区2-价格", "direction": "left", "children": [
                //                 { "id": "6", "topic": "收购萝卜价格" },
                //                 { "id": "7", "topic": "批发萝卜价格" },
                //                 { "id": "8", "topic": "礼品萝卜价格" },
                //             ]
                //         },
                //     ]
                // }
                data: {
                        id: 'root',
                        topic: 'jsMind',
                        children: [
                            {
                                id: 'easy',
                                topic: 'Easy',
                                direction: 'left',
                                children: [
                                    { id: 'easy1', topic: 'Easy to show' },
                                    { id: 'easy2', topic: 'Easy to edit' },
                                    { id: 'easy3', topic: 'Easy to store' },
                                    { id: 'easy4', topic: 'Easy to embed' },
                                    {
                                        'id': 'other3',
                                        'background-image': 'ant.png',
                                        'width': '100',
                                        'height': '100',
                                    },
                                ],
                            },
                            {
                                id: 'open',
                                topic: 'Open Source',
                                direction: 'right',
                                children: [
                                    {
                                        'id': 'open1',
                                        'topic': 'on GitHub',
                                        'background-color': '#eee',
                                        'foreground-color': 'blue',
                                    },
                                    { id: 'open2', topic: 'BSD License' },
                                ],
                            },
                            {
                                id: 'powerful',
                                topic: 'Powerful',
                                direction: 'right',
                                children: [
                                    { id: 'powerful1', topic: 'Base on Javascript' },
                                    { id: 'powerful2', topic: 'Base on HTML5' },
                                    { id: 'powerful3', topic: 'Depends on you' },
                                ],
                            },
                            {
                                id: 'other',
                                topic: 'test node',
                                direction: 'left',
                                children: [
                                    { id: 'other1', topic: "I'm from local variable" },
                                    { id: 'other2', topic: 'I can do everything' },
                                ],
                            },
                        ],
                }
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
                    line_width: 1, // 线条粗细
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
            // jm.add_node('sub2', 'sub23', 'new node', { 'background-color': 'red' });
            // jm.set_node_color('sub21', 'green', '#ccc');
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
            width: 50%;
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