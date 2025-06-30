<script>
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

<div style="margin: 1rem; max-width: 80rem;">
  <h1 style="color: var(--g4-t);">Time to Build! 🏗️</h1>
  <h2>Steps</h2>
  <h3>Create project on your computer from template</h3>
  <p>
    Macbook is my machine choice. Open the terminal. cd into a folder on your computer that you want to keep the
    project. Run the command (but replace "my-project" with the name of your project):
  </p>
  <p>npx create-sveltekit-ui-site my-project</p>
  <p>run <code>code .</code> to open your editor. (I use vs code)</p>
  <p><code>npm i</code></p>
  <p><code>npm run dev</code></p>
  <h3>The Code</h3>
  <p>
    The project is built using <a href="https://svelte.dev/docs/kit/introduction">SvelteKit</a> and a component library
    called <a href="https://www.sveltekit-ui.com">Sveltekit-UI</a>
  </p>
  <p>Create a <a href="https://github.com">GitHub</a> account and save your project into a repository</p>
  <h3>Create Logo</h3>
  <p>
    Use an image or if possible an svg. If you have some skill and time you can use a tool like adobe illustrator or I
    like <a href="https://affinity.serif.com/en-us/designer/">Affinity Designer</a> on my MacBook. Flatten to svg and export
  </p>
  <p>You can minify the svg code using <a href="https://jakearchibald.github.io/svgomg/">this</a> and prefer viewbox</p>
  <p>Use a Favicon Generator. I like <a href="https://realfavicongenerator.net">Real Favicon Generator</a></p>
  <p>Delete the favicon.ico because we dont need it</p>
  <p>Drag those files into the static folder</p>
  <p>Update the src/lib/components/Logo/index.svelte to show your new logo (ideally icon + name)</p>
  <h3>Hosting</h3>
  <p>Create an account on <a href="https://vercel.com">Vercel</a></p>
  <p>Buy a domain name</p>
  <h3>Email</h3>
  <p>Create an account on <a href="https://www.contibase.com">Contibase</a></p>
  <p>Set up email services for your domain</p>
  <p>You can also use Contibase for tracking user sign-ins and create and custom data tables for other data</p>
  <h4>Now it's up to you</h4>
  <p>Refer to documentation and ask AI for help to speed up your building process</p>
</div>
