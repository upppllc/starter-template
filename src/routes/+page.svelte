<script>
  import { create_content_manager, Content } from "sveltekit-ui"

  let content_manager = create_content_manager({
    val: {
      type_id: "div",
      children: [
        {
          type_id: "div",
          children: [
            {
              type_id: "h1",
              children: [
                {
                  type_id: "base_text",
                  children: [],
                  attributes: { content: "Time to Build! 🏗️", text_color: null },
                  selector_id: "zkwoqbjr",
                },
              ],
              attributes: null,
              selector_id: "mswlvhaz",
            },
            {
              type_id: "h3",
              children: [
                {
                  type_id: "base_text",
                  children: [],
                  attributes: { content: "Start Your Project From a Template", text_color: null },
                  selector_id: "uqvqvoea",
                },
              ],
              attributes: null,
              selector_id: "drztktjq",
            },
            {
              type_id: "p",
              children: [
                {
                  type_id: "base_text",
                  children: [],
                  attributes: {
                    content:
                      "We recommend using an Apple MacBook for development, but any laptop will work fine. Open your terminal and cd into the directory where you’d like your project to live. Then, run the following command, replacing “my-project” with your desired project name:",
                    text_color: null,
                  },
                  selector_id: "opylmkjq",
                },
              ],
              attributes: null,
              selector_id: "wmqxcvwn",
            },
            {
              type_id: "p",
              children: [
                {
                  type_id: "code_inline",
                  children: [],
                  attributes: { content: "npx create-sveltekit-ui-site my-project", color: null },
                  selector_id: "wtblzema",
                },
              ],
              attributes: null,
              selector_id: "gqoulqia",
            },
            {
              type_id: "p",
              children: [
                {
                  type_id: "base_text",
                  children: [],
                  attributes: {
                    content: "Next, cd into your projet folder and open your code editor with:",
                    text_color: null,
                  },
                  selector_id: "gjsrjtqs",
                },
                {
                  type_id: "code_inline",
                  children: [],
                  attributes: { content: "code .", color: null },
                  selector_id: "bsrokwdk",
                },
                {
                  type_id: "base_text",
                  children: [],
                  attributes: { content: " (VS Code is recommended)", text_color: null },
                  selector_id: "skgzavek",
                },
              ],
              attributes: null,
              selector_id: "dmnyjpcv",
            },
            {
              type_id: "p",
              children: [
                {
                  type_id: "base_text",
                  children: [],
                  attributes: { content: "Update any outdated packages with ", text_color: null },
                  selector_id: "skgzavek",
                },
                {
                  type_id: "code_inline",
                  children: [],
                  attributes: { content: "ncu -u", color: null },
                  selector_id: "lqkixjsi",
                },
                {
                  type_id: "base_text",
                  children: [],
                  attributes: { content: ". Install packages with", text_color: null },
                  selector_id: "skgzavek",
                },
                {
                  type_id: "code_inline",
                  children: [],
                  attributes: { content: "npm i", color: null },
                  selector_id: "lqkixjsi",
                },
              ],
              attributes: null,
              selector_id: "hduicqof",
            },
            {
              type_id: "p",
              children: [
                {
                  type_id: "base_text",
                  children: [],
                  attributes: { content: "Run the project locally with ", text_color: null },
                  selector_id: "skgzavek",
                },
                {
                  type_id: "code_inline",
                  children: [],
                  attributes: { content: "npm run dev", color: null },
                  selector_id: "igrxprdp",
                },
              ],
              attributes: null,
              selector_id: "frxpfqfm",
            },
            {
              type_id: "h3",
              children: [
                {
                  type_id: "base_text",
                  children: [],
                  attributes: { content: "Project Structure & Stack", text_color: null },
                  selector_id: "gmlwthgq",
                },
              ],
              attributes: null,
              selector_id: "tnotrdvm",
            },
            {
              type_id: "p",
              children: [
                {
                  type_id: "base_text",
                  children: [],
                  attributes: { content: "Your site uses ", text_color: null },
                  selector_id: "dwcjyxmj",
                },
                {
                  type_id: "link",
                  children: [
                    {
                      type_id: "base_text",
                      children: [],
                      attributes: { content: "SvelteKit", text_color: null },
                      selector_id: "qeimeuyf",
                    },
                  ],
                  attributes: {
                    href: "https://svelte.dev/docs/kit/introduction",
                    display_text: null,
                    text_color: null,
                    is_show_preview: null,
                  },
                  selector_id: "wggnmjzf",
                },
                {
                  type_id: "base_text",
                  children: [],
                  attributes: { content: " along with the ", text_color: null },
                  selector_id: "ttfdtidi",
                },
                {
                  type_id: "link",
                  children: [
                    {
                      type_id: "base_text",
                      children: [],
                      attributes: { content: "Sveltekit-UI", text_color: null },
                      selector_id: "qnxwjmqt",
                    },
                  ],
                  attributes: {
                    href: "https://www.sveltekit-ui.com",
                    display_text: null,
                    text_color: null,
                    is_show_preview: null,
                  },
                  selector_id: "vrgwkfrt",
                },
                {
                  type_id: "base_text",
                  children: [],
                  attributes: { content: " component library.", text_color: null },
                  selector_id: "apsebxaj",
                },
              ],
              attributes: null,
              selector_id: "xdvhazmg",
            },
            {
              type_id: "p",
              children: [
                {
                  type_id: "base_text",
                  children: [],
                  attributes: { content: "Set up a ", text_color: null },
                  selector_id: "uukdnhax",
                },
                {
                  type_id: "link",
                  children: [
                    {
                      type_id: "base_text",
                      children: [],
                      attributes: { content: "GitHub", text_color: null },
                      selector_id: "vhihkvvf",
                    },
                  ],
                  attributes: {
                    href: "https://github.com",
                    display_text: null,
                    text_color: null,
                    is_show_preview: null,
                  },
                  selector_id: "jakwmqzk",
                },
                {
                  type_id: "base_text",
                  children: [],
                  attributes: { content: " repository to save your project.", text_color: null },
                  selector_id: "qkcwofbs",
                },
              ],
              attributes: null,
              selector_id: "nqzlkdgu",
            },
            {
              type_id: "h3",
              children: [
                {
                  type_id: "base_text",
                  children: [],
                  attributes: { content: "Create a Logo", text_color: null },
                  selector_id: "vwjecivg",
                },
              ],
              attributes: null,
              selector_id: "xxwimexq",
            },
            {
              type_id: "p",
              children: [
                {
                  type_id: "base_text",
                  children: [],
                  attributes: {
                    content:
                      "Use an image or, ideally, an SVG for your logo. If you have some design experience, try tools like Adobe Illustrator or ",
                    text_color: null,
                  },
                  selector_id: "lwmmdywo",
                },
                {
                  type_id: "link",
                  children: [
                    {
                      type_id: "base_text",
                      children: [],
                      attributes: { content: "Affinity Designer", text_color: null },
                      selector_id: "czpaqelo",
                    },
                  ],
                  attributes: {
                    href: "https://affinity.serif.com/en-us/designer/",
                    display_text: null,
                    text_color: null,
                    is_show_preview: null,
                  },
                  selector_id: "ewvblzqw",
                },
                {
                  type_id: "base_text",
                  children: [],
                  attributes: { content: " on Mac. Flatten and export your design as SVG.", text_color: null },
                  selector_id: "mgefrlbv",
                },
              ],
              attributes: null,
              selector_id: "ogpayldx",
            },
            {
              type_id: "p",
              children: [
                {
                  type_id: "base_text",
                  children: [],
                  attributes: { content: "You can optimize your SVG using ", text_color: null },
                  selector_id: "ixyugrbq",
                },
                {
                  type_id: "link",
                  children: [
                    {
                      type_id: "base_text",
                      children: [],
                      attributes: { content: "SVGOMG", text_color: null },
                      selector_id: "gdefhjob",
                    },
                  ],
                  attributes: {
                    href: "https://jakearchibald.github.io/svgomg/",
                    display_text: null,
                    text_color: null,
                    is_show_preview: null,
                  },
                  selector_id: "mgycovbg",
                },
                {
                  type_id: "base_text",
                  children: [],
                  attributes: { content: ", and be sure to set a viewBox if possible.", text_color: null },
                  selector_id: "yvszyaam",
                },
              ],
              attributes: null,
              selector_id: "rrtqhzul",
            },
            {
              type_id: "p",
              children: [
                {
                  type_id: "base_text",
                  children: [],
                  attributes: { content: "Generate your favicons (I recommend ", text_color: null },
                  selector_id: "cblearzs",
                },
                {
                  type_id: "link",
                  children: [
                    {
                      type_id: "base_text",
                      children: [],
                      attributes: { content: "Real Favicon Generator", text_color: null },
                      selector_id: "ybfswksv",
                    },
                  ],
                  attributes: {
                    href: "https://realfavicongenerator.net",
                    display_text: null,
                    text_color: null,
                    is_show_preview: null,
                  },
                  selector_id: "dhulpsdf",
                },
                {
                  type_id: "base_text",
                  children: [],
                  attributes: {
                    content: "). Then, delete the default favicon.ico and replace it with your preferred icons.",
                    text_color: null,
                  },
                  selector_id: "ccodcpbb",
                },
              ],
              attributes: null,
              selector_id: "jgjxikdk",
            },
            {
              type_id: "p",
              children: [
                {
                  type_id: "base_text",
                  children: [],
                  attributes: { content: "Move the logo and favicon files to the static directory.", text_color: null },
                  selector_id: "riutepzb",
                },
              ],
              attributes: null,
              selector_id: "oibblgva",
            },
            {
              type_id: "p",
              children: [
                {
                  type_id: "base_text",
                  children: [],
                  attributes: { content: "Update ", text_color: null },
                  selector_id: "muhkjupn",
                },
                {
                  type_id: "code_inline",
                  children: [],
                  attributes: { content: "src/lib/components/Logo/index.svelte", color: null },
                  selector_id: "ovxgbdjl",
                },
                {
                  type_id: "base_text",
                  children: [],
                  attributes: {
                    content: " to use your new logo (preferably an icon and your brand name).",
                    text_color: null,
                  },
                  selector_id: "whqovpuv",
                },
              ],
              attributes: null,
              selector_id: "cnyrezsr",
            },
            {
              type_id: "h3",
              children: [
                {
                  type_id: "base_text",
                  children: [],
                  attributes: { content: "Deployment & Hosting", text_color: null },
                  selector_id: "faipwafx",
                },
              ],
              attributes: null,
              selector_id: "xnpnyrme",
            },
            {
              type_id: "p",
              children: [
                {
                  type_id: "base_text",
                  children: [],
                  attributes: { content: "Create a free account on ", text_color: null },
                  selector_id: "mmcxrbaa",
                },
                {
                  type_id: "link",
                  children: [
                    {
                      type_id: "base_text",
                      children: [],
                      attributes: { content: "Vercel", text_color: null },
                      selector_id: "csxeqjlx",
                    },
                  ],
                  attributes: {
                    href: "https://vercel.com",
                    display_text: null,
                    text_color: null,
                    is_show_preview: null,
                  },
                  selector_id: "fvzbdepo",
                },
                {
                  type_id: "base_text",
                  children: [],
                  attributes: { content: " and purchase a custom domain name.", text_color: null },
                  selector_id: "lxxlieqz",
                },
              ],
              attributes: null,
              selector_id: "alwipxht",
            },
            {
              type_id: "h3",
              children: [
                {
                  type_id: "base_text",
                  children: [],
                  attributes: { content: "Set Up Email", text_color: null },
                  selector_id: "onuhwere",
                },
              ],
              attributes: null,
              selector_id: "xcuvziyt",
            },
            {
              type_id: "p",
              children: [
                {
                  type_id: "base_text",
                  children: [],
                  attributes: { content: "Sign up for a free account at ", text_color: null },
                  selector_id: "efcnhtwx",
                },
                {
                  type_id: "link",
                  children: [
                    {
                      type_id: "base_text",
                      children: [],
                      attributes: { content: "Contibase", text_color: null },
                      selector_id: "ezgvutcq",
                    },
                  ],
                  attributes: {
                    href: "https://www.contibase.com",
                    display_text: null,
                    text_color: null,
                    is_show_preview: null,
                  },
                  selector_id: "znsvapoa",
                },
                {
                  type_id: "base_text",
                  children: [],
                  attributes: { content: ", and configure email services for your domain.", text_color: null },
                  selector_id: "bnrojwys",
                },
              ],
              attributes: null,
              selector_id: "sakjynzb",
            },
            {
              type_id: "p",
              children: [
                {
                  type_id: "base_text",
                  children: [],
                  attributes: {
                    content:
                      "Contibase can also help you manage user sign-ins and offers tools to create custom data tables for any other data needs.",
                    text_color: null,
                  },
                  selector_id: "qxcvrbxg",
                },
              ],
              attributes: null,
              selector_id: "uubqkavd",
            },
            {
              type_id: "h4",
              children: [
                {
                  type_id: "base_text",
                  children: [],
                  attributes: { content: "Ready to Make Something Great!", text_color: null },
                  selector_id: "sqisgszq",
                },
              ],
              attributes: null,
              selector_id: "swzlytnc",
            },
            {
              type_id: "p",
              children: [
                {
                  type_id: "base_text",
                  children: [],
                  attributes: {
                    content:
                      "Check the official docs and remember you can always use AI to help speed up your process!",
                    text_color: null,
                  },
                  selector_id: "krxicwts",
                },
              ],
              attributes: null,
              selector_id: "ezbwpmla",
            },
          ],
          attributes: {
            background_color: null,
            border_color: null,
            border_radius: null,
            padding: 1,
            align_content: "center",
            justify_content: "center",
          },
          selector_id: "jhvqdpou",
        },
      ],
      attributes: {
        background_color: null,
        border_color: null,
        border_radius: null,
        padding: null,
        align_content: "center",
        justify_content: "center",
      },
      selector_id: "ghyfohew",
    },
  })
</script>

<svelte:head>
  <title>__APP_NAME__</title>
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <!-- <meta name="description" content="tbd" />
  <meta property="og:title" content="__APP_NAME__" />
  <meta property="og:description" content="tbd" />
  <meta property="og:image" content="https://www.example.com/thumbnail.webp" /> 
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="https://www.example.com/thumbnail.webp" /> -->
</svelte:head>

<div style="display: grid; justify-content: center;">
  <div style="margin: 1rem; max-width: 80rem;">
    <Content manager={content_manager} />
  </div>
</div>
