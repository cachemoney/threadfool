module.exports = {
  siteMetadata: {
    title: 'Robin Paul',
    description: `
      Robin Paul is a developer, application architect.
      This website is a platform for documenting the learning
      of new languages, architectures, and patterns.
    `,
    authorLink: 'https://github.com/cachemoney',
    blogRepo: 'https://github.com/cachemoney/threadfool',
    siteUrl: 'https://threadfool.com',
    image: '',
    author: {
      name: 'Robin Paul',
      minibio: `Robin Paul is a developer, application architect.`,
    },
    organization: {
      name: 'Robin Paul',
      url: 'https://threadfool.com',
      logo: '',
    },
    social: {
      twitterHandle: '@threadf00l',
      twitter: 'https://twitter.com/threadf00l',
      fbAppID: '',
      linkedIn: 'https://www.linkedin.com/in/robinpaul00',
      github: 'https://github.com/cachemoney'
    }
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-41313989-2`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Threadfool`,
        short_name: `Threadfool`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        includePaths: [`${__dirname}/node_modules`, `${__dirname}/src/`],
        precision: 8
      }
    },
  ],
}
