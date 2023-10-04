import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      width: {
        cardSm: '18rem',
        cardLg: '20rem',
        cardXl: '22rem',
        sidebar: '18rem',
      },
      screens: {
        xlOver: '1432px',
      },
      gridTemplateColumns: {
        app: '18rem 1fr',
        overview: '728px minmax(352px, 1fr)',
        transactions: 'auto 1fr 1fr',
      },
      gridTemplateRows: {
        home: 'auto 1fr',
        leftSideHome: 'auto 1fr',
        card: 'auto 1fr',
      },
      colors: {
        appBlack: '#191919',
        appGreen: '#299D91',
        appGray800: '#525256',
        appGray700: '#666666',
        appGray500: '#878787',
        appGray400: '#9F9F9F',
        appGray100: '#E8E8E8',
        appWhite: '#F3F3F3',
        appSpecialBg2: 'rgba(255, 255, 255, 0.70)',
        appSpecialBg3: 'rgba(255, 255, 255, 0.08)',
      },
    },
  },
  plugins: [],
}
export default config
