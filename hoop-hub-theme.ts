
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const hoopHubTheme: CustomThemeConfig = {
    name: 'hoop-hub-theme',
    properties: {
        // =~= Theme Properties =~=
        "--theme-font-family-base": `system-ui`,
        "--theme-font-family-heading": `system-ui`,
        "--theme-font-color-base": "0 0 0",
        "--theme-font-color-dark": "255 255 255",
        "--theme-rounded-base": "9999px",
        "--theme-rounded-container": "12px",
        "--theme-border-base": "1px",
        // =~= Theme On-X Colors =~=
        "--on-primary": "0 0 0",
        "--on-secondary": "0 0 0",
        "--on-tertiary": "0 0 0",
        "--on-success": "0 0 0",
        "--on-warning": "0 0 0",
        "--on-error": "255 255 255",
        "--on-surface": "255 255 255",
        // =~= Theme Colors  =~=
        // primary | #f2f2f2
        "--color-primary-50": "253 253 253", // #fdfdfd
        "--color-primary-100": "252 252 252", // #fcfcfc
        "--color-primary-200": "252 252 252", // #fcfcfc
        "--color-primary-300": "250 250 250", // #fafafa
        "--color-primary-400": "246 246 246", // #f6f6f6
        "--color-primary-500": "242 242 242", // #f2f2f2
        "--color-primary-600": "218 218 218", // #dadada
        "--color-primary-700": "182 182 182", // #b6b6b6
        "--color-primary-800": "145 145 145", // #919191
        "--color-primary-900": "119 119 119", // #777777
        // secondary | #E8EBE5
        "--color-secondary-50": "252 252 251", // #fcfcfb
        "--color-secondary-100": "250 251 250", // #fafbfa
        "--color-secondary-200": "249 250 249", // #f9faf9
        "--color-secondary-300": "246 247 245", // #f6f7f5
        "--color-secondary-400": "239 241 237", // #eff1ed
        "--color-secondary-500": "232 235 229", // #E8EBE5
        "--color-secondary-600": "209 212 206", // #d1d4ce
        "--color-secondary-700": "174 176 172", // #aeb0ac
        "--color-secondary-800": "139 141 137", // #8b8d89
        "--color-secondary-900": "114 115 112", // #727370
        // tertiary | #94D2FD
        "--color-tertiary-50": "239 248 255", // #eff8ff
        "--color-tertiary-100": "234 246 255", // #eaf6ff
        "--color-tertiary-200": "228 244 255", // #e4f4ff
        "--color-tertiary-300": "212 237 254", // #d4edfe
        "--color-tertiary-400": "180 224 254", // #b4e0fe
        "--color-tertiary-500": "148 210 253", // #94D2FD
        "--color-tertiary-600": "133 189 228", // #85bde4
        "--color-tertiary-700": "111 158 190", // #6f9ebe
        "--color-tertiary-800": "89 126 152", // #597e98
        "--color-tertiary-900": "73 103 124", // #49677c
        // success | #84cc16
        "--color-success-50": "237 247 220", // #edf7dc
        "--color-success-100": "230 245 208", // #e6f5d0
        "--color-success-200": "224 242 197", // #e0f2c5
        "--color-success-300": "206 235 162", // #ceeba2
        "--color-success-400": "169 219 92", // #a9db5c
        "--color-success-500": "132 204 22", // #84cc16
        "--color-success-600": "119 184 20", // #77b814
        "--color-success-700": "99 153 17", // #639911
        "--color-success-800": "79 122 13", // #4f7a0d
        "--color-success-900": "65 100 11", // #41640b
        // warning | #EAB308
        "--color-warning-50": "252 244 218", // #fcf4da
        "--color-warning-100": "251 240 206", // #fbf0ce
        "--color-warning-200": "250 236 193", // #faecc1
        "--color-warning-300": "247 225 156", // #f7e19c
        "--color-warning-400": "240 202 82", // #f0ca52
        "--color-warning-500": "234 179 8", // #EAB308
        "--color-warning-600": "211 161 7", // #d3a107
        "--color-warning-700": "176 134 6", // #b08606
        "--color-warning-800": "140 107 5", // #8c6b05
        "--color-warning-900": "115 88 4", // #735804
        // error | #D41976
        "--color-error-50": "249 221 234", // #f9ddea
        "--color-error-100": "246 209 228", // #f6d1e4
        "--color-error-200": "244 198 221", // #f4c6dd
        "--color-error-300": "238 163 200", // #eea3c8
        "--color-error-400": "225 94 159", // #e15e9f
        "--color-error-500": "212 25 118", // #D41976
        "--color-error-600": "191 23 106", // #bf176a
        "--color-error-700": "159 19 89", // #9f1359
        "--color-error-800": "127 15 71", // #7f0f47
        "--color-error-900": "104 12 58", // #680c3a
        // surface | #495a8f
        "--color-surface-50": "228 230 238", // #e4e6ee
        "--color-surface-100": "219 222 233", // #dbdee9
        "--color-surface-200": "210 214 227", // #d2d6e3
        "--color-surface-300": "182 189 210", // #b6bdd2
        "--color-surface-400": "128 140 177", // #808cb1
        "--color-surface-500": "73 90 143", // #495a8f
        "--color-surface-600": "66 81 129", // #425181
        "--color-surface-700": "55 68 107", // #37446b
        "--color-surface-800": "44 54 86", // #2c3656
        "--color-surface-900": "36 44 70", // #242c46
    }
}