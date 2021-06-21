module.exports = {
  title: "Plants as Biosensors",
  tagline: "Database and Mediawiki",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  organizationName: "Foxster89", // Usually your GitHub org/user name.
  projectName: "docusaurus-2", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "Plants as Biosensors",
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      links: [
        {
          items: [
            {
            //activeBasePath: "docs/doc1",
            label: "About our project",
            position: "left",
            to: "docs/doc1",
            },
            {
            
            label: "Knowledge",
            position: "left",
            to: "docs/doc2",
            },
            {
            
            label: "Literature",
            position: "left",
            to: "docs/doc3",
            },
            {
            
            label: "Project status",
            position: "left",
            to: "docs/doc4",
            },
            {
            href: "https://github.com/Foxster89/docusaurus-2",
            label: "GitHub",
            position: "right",
            },
          ]
        },
      ],
    footer: {
      style: "dark",
      links: [
        {
          title: "Useful links",
          items: [
            {
              label: "About our project",
              to: "docs/doc1",
            },
            {
              label: "Plant SpikerBox",
              to: "docs/doc2",
            },
            {
              label: "Literature",
              to: "docs/doc3",
            },
            {
              label: "Project status",
              to: "docs/doc4",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/Foxster89/docusaurus-2",
            },
            {
              label: "Discord",
              href: "https://plantsasbiosensors.vercel.app",
            },
            {
              label: "Twitter",
              href: "https://plantsasbiosensors.vercel.app",
            },
          ],
        },
        /*{
          title: "More",
          items: [
            {
              label: "Blog",
              to: "blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/Foxster89/docusaurus-2",
            },
          ],
        },*/
      ],
      copyright: `Copyright © ${new Date().getFullYear()} COINs2021 Project.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        /*docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/edit/master/website/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },*/
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
},
