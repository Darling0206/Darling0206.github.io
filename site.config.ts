import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  url: 'https://blog.danglinglab.com/',
  lang: 'zh-CN',
  title: '荡凌の赛博实验室',
  subtitle: 'Technology change our life',
  author: {
    name: '荡凌',
    avatar: '/images/avatar.png'
  },
  description: '醉后不知天在水，满船清梦压星河',
  social: [
    {
      name: 'QQ 1319972027',
      link: 'https://qm.qq.com/q/H63sxLcJ8G',
      icon: 'i-ri-qq-line',
      color: '#12B7F5',
    },
    {
      name: 'GitHub',
      link: 'https://github.com/Darling0206',
      icon: 'i-ri-github-line',
      color: '#6e5494',
    },
    {
      name: '哔哩哔哩',
      link: 'https://space.bilibili.com/323872888',
      icon: 'i-ri-bilibili-line',
      color: '#FF8EB3',
    },
  ],

  search: {
    enable: false,
  },

})
