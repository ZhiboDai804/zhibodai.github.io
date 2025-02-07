![Vortisil](/images/screenshots.png)

<h4 align=center><a href="https://khitezza.com" rel="nofollow">[ Demo Site ]</a></h4>

## Features

- Light / Dark theme
- All articles search
- Responsive design
- Rendering mathematical formulas with MathJax.js

## Quick Start

Before start, make sure [Git](https://git-scm.com/) and [Hugo](https://gohugo.io/) are installed.

Then download the zip file below for a quick start template:

[QuickStartTemplate v1.0.1](https://github.com/khitezza/vortisil/releases/download/v1.0.1/quick-start-template-1.0.1.zip)

Unzip and enter this folder and run the ```git init``` command:

```bash
git init
```

### Add and Update Theme

Add theme by git submodule:

```bash
git submodule add https://github.com/khitezza/vortisil themes/vortisil
```

And updated Theme:

```bash
git submodule update --remote --merge
```

### Content Management

Add a new common article:

```bash
hugo new content posts/20xx-xx-xx-Titile.md
```

Or easily manage images:

```bash
hugo new content posts/20xx-xx-xx-Titile/index.md
mv ~/images/cover.webp content/posts/20xx-xx-xx-Titile/cover.webp
```

Hugo article head archetype configurations:

```
+++
title = '{{ replace .File.ContentBaseName "-" " " | title }}'    <!-- Automatic generation according to file name.-->
date = {{ .Date }}    <!-- Auto get the date this article was created. -->
lastmodified = ""    <!-- Please fill in the date yourself when editing this article. -->
author = ""    <!-- You can write other people's names and help them publish articles. -->
authorList = ""    <!-- Co-authors' names. E.g., authorList = "Mr. A, Miss B, Jhon Doe". -->
license = "CC BY-NC-SA 4.0"
license_url = "https://creativecommons.org/licenses/by-nc-sa/4.0/"
cover = ""    <!-- Cover image url. -->
math = false    <!-- Set true if you need to use mathematical formulas in your posts. -->
draft = true
+++
```

## Custom

Create ```hugo.toml``` and modify it:

```toml
baseURL = "https://example.com"
languageCode = "en"
title = "Example Site"
copyright = "Name" # Footer copyright.
theme = "vortisil"
pagination.pagerSize = 10

[params]
    author = "Name" # Author name of the article.
    logoImg = true # If false, the site title will display.
    logoInvert = true # If the image logo needs to be turned on Image Colour Inversion.
    defaultCover = true # true: show he default cover, false: never show the default cover.
    math = true
    antafont = false

[params.meta]
    description = "A fast, minimal, and restrained Hugo theme." # Site description
```

The Position of the logo/hero/default cover and favicon:

```bash
assets/assets/imgs/logo.png
assets/assets/imgs/hero.webp
assets/assets/imgs/defaultCover.webp

static/assets/imgs/favicon.ico
static/assets/imgs/favicon-16x16.png
static/assets/imgs/favicon-32x32.png
static/assets/imgs/apple-touch-icon.png
```

Create ```assets/assets/scss/custom.scss``` and change the primary color:

```scss
[data-theme="light"] {
    --color-primary: #297d7a !important;
}

[data-theme="dark"] {
    --color-primary: #68bdae !important;
}
```

After much thought, I dropped the i18n system and added ```data/l10n.toml```.

You can use a git patch or pull request to help complete the translation of l10n.toml.

```toml
# Language: English (en, en_US)
#
home = 'Home'
about = 'About'
archives = 'Archives'
search = 'Search'
blogs = 'Blogs'
latest_blogs = 'Latest Blogs'
works = 'Works'
authors = 'Authors'
author = 'Author'
posted_on = 'Posted on'
last_modified = 'Last modified'
pagenotfound_title = 'Page Not Found'
pagenotfound_desc = 'The page you requested cannot be found'
return_home = 'Return to the home page'
all_rights_reserved = 'All rights reserved'
powered_by = 'Powered by <a href="https://gohugo.io">Hugo</a> & <a href="https://github.com/khitezza/vortisil/">Vortisil</a>'
license = 'This article is licensed under <a href="%s" target="_blank" rel="license noopener noreferrer">__license__</a>'
```

Use ```data/works.toml``` to display works on the homepage.

```toml
[[works]]
  name = "Example Works" # Title of the work.
  url = "https://github.com/your-name/repo-name" # Works website (Git repository or product site).
  desc = "A fast, minimal, and restrained Hugo theme." # Description.
```

## Deployments

Copy this to ```.github/workflows/gh-pages.yaml``` for building the Hugo website and deploying it to GitHub Pages.

```yaml
# Sample workflow for building and deploying a Hugo site to GitHub Pages
name: Deploy Hugo site to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ["trunk"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

# Default to bash
defaults:
  run:
    shell: bash

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.143.1
    steps:
      - name: Install Hugo CLI
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb
      - name: Install Dart Sass
        run: sudo snap install dart-sass
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v5
      - name: Install Node.js dependencies
        run: "[[ -f package-lock.json || -f npm-shrinkwrap.json ]] && npm ci || true"
      - name: Build with Hugo
        env:
          HUGO_CACHEDIR: ${{ runner.temp }}/hugo_cache
          HUGO_ENVIRONMENT: production
        run: |
          hugo \
            --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/"
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

If you have a domain, add ``CNAME`` and configure the domain dns settings.

```bash
echo "example.com" >> CNAME
```

Push to git platforms like Github.

```bash
git add .
git commit -m "commit 1"
git branch -M trunk
git remote add origin https://github.com/your-name/repo-name.git
git push -u origin trunk
```

## Copyright

Licensed under [The GNU General Public License v3.0](LICENSE)