import type { UserThemeConfig } from 'valaxy-theme-yun'
import { defineValaxyConfig } from 'valaxy'

// add icons what you will need

const safelist = [
  'i-ri-home-line',
]

/**
 * User Config
 */
export default defineValaxyConfig<UserThemeConfig>({
  // site config see site.config.ts

  theme: 'yun',

  themeConfig: {
    banner: {
      enable: true,
      title: '荡凌の赛博实验室',
    },
    bg_image: {
      enable: true,
      url: '/images/background.jpg',
      opacity: 0.7
    },
    pages: [
      {
        name: '我的小伙伴们',
        url: '/links/',
        icon: 'i-ri-genderless-line',
        color: 'dodgerblue',
      },
      {
        name: '喜欢的女孩子',
        url: '/girls/',
        icon: 'i-ri-women-line',
        color: 'hotpink',
      },
    ],

    footer: {
      since: 2026,
      beian: {
        enable: true,
        icp: '',
        police: '',
      },
    },
  },

  unocss: {
    safelist,
    // 只屏蔽 Verilog 位宽这类 [数字:数字] 记号。
    // 它们会被 UnoCSS 当成 arbitrary property，生成 `.\[15\:0\]{15:0;}` 这种非法 CSS，
    // 导致 lightningcss 压缩抛 SyntaxError、SSG 构建中断（且 valaxy 仍以退出码 0 结束）。
    // 切勿改成 /^\[.*\]$/ 之类的宽泛规则：那会连带剥掉 UnoCSS 生成的 attributify
    // 选择器（[m~="0"]、[flex~=center] 等）与 @property --un-*，造成界面样式丢失。
    blocklist: [/^\[\d+:\d+\]$/],
  },
})
