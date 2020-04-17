const siteConfig = require('./src/config/blog-config');
const path = require('path');

module.exports = {
  siteMetadata: {
    siteUrl: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    author: siteConfig.author.name,
    copyright: siteConfig.copyright
  },
  plugins: [
    'gatsby-plugin-mdx',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.resolve('content'),
        name: 'markdown-pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.resolve('static'),
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          'gatsby-remark-prismjs',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1060,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/components/Layout/index.jsx'),
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
    },
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: siteConfig.googleAnalyticsId,
        // Puts tracking script in the head instead of the body
        head: true,
        // IP anonymization for GDPR compliance
        anonymize: true,
        // Disable analytics for users with `Do Not Track` enabled
        respectDNT: true,
        // // Avoids sending pageview hits from custom paths
        // exclude: ['/preview/**'],
        // // Specifies what percentage of users should be tracked
        // sampleRate: 100,
        // // Determines how often site speed tracking beacons will be sent
        // siteSpeedSampleRate: 10,
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-no-sourcemaps',
    'gatsby-plugin-postcss',
    'gatsby-plugin-netlify',
    // 'gatsby-plugin-brotli',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: ['/tag/*'],
      },
    },
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: path.join(__dirname, 'src', 'pages'),
      },
    },
    'gatsby-plugin-preact',
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `MoonLoss`,
        short_name: `moonloss`,
        start_url: `/`,
        background_color: `#0188e9`,
        theme_color: `#0188e9`,
        display: `standalone`,
        icon: `src/images/icon.png`,
        include_favicon: true,
        crossOrigin: `use-credentials`
      },
    },
    `gatsby-plugin-offline` // This plugin must be behind the manifest
  ]
}
