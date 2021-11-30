// https://github.com/hexojs/hexo-pagination
// 暂时未生效
var pagination = require('hexo-pagination');

pagination('', [], {
    perPage: 2,
    format: 'page/%d/',
    layout: ['archive', 'index'],
    data: {
        tag: 'hexo'
    }
});
