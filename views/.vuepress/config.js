module.exports = {
    title: '江南一点雨',
    head: [
        ['link', {rel: 'icon', href: 'https://open.weixin.qq.com/qr/code?username=a_javaboy'}]
    ],
    themeConfig: {
        logo: 'https://open.weixin.qq.com/qr/code?username=a_javaboy',
        nav: [
            {text: '首页', link: '/'},
            {text: '国际站', link: 'http://www.javaboy.org'},
            {text: '国内站', link: 'http://www.itboyhub.com'}
        ],
        sidebar: 'auto',
        sidebar: [
            {
                title: 'Java',
                path: '/java/',
                collapsable: true,
                sidebarDepth: 5,
                children: [
                    '/java/java-1',
                    '/java/java-2'
                ]
            },
            {
                title: 'Python',
                path: '/python/',
                collapsable: false,
                sidebarDepth: 2,
                children: [
                    '/python/python-1',
                    '/python/python-2'
                ]
            },
        ]

    },

};