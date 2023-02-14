import customTree from './src/tree.vue';

/* istanbul ignore next */
customTree.install = function(Vue) {
  Vue.component(customTree.name, customTree);
};

export default customTree;
