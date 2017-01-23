# DavidWells.io

Forked from [Serverless Site](https://serverless.com/)

This site is 100% serverless! :tada:

Built using react, redux and [phenomic](https://github.com/MoOx/phenomic) this site is statically built and hosted on the [netlify](https://www.netlify.com/) CDN for 🔥blazingly fast performance and scale.

The [site content](https://github.com/serverless/site/tree/master/content), [docs](https://github.com/serverless/serverless/tree/master/docs), and [blog](https://github.com/serverless/blog) are hosted on github, so if you see a typo or error feel free to contribute back!

API calls are made with the [serverless framework](https://github.com/serverless/serverless/tree/master/docs) pinging AWS lambda functions. User Authentication is handled via [Auth0](auth0.com). Site search handled by [Algolia](https://community.algolia.com/docsearch/).

- [See the site](https://serverless.com/) :point_right: [View the SRC Luke](https://github.com/serverless/site/tree/master/src)
- [Check out the blog](https://serverless.com/blog) :point_right: [Contribute to the blog](https://github.com/serverless/blog)
- [Read the docs](https://serverless.com/framework/docs) :point_right: [Contribute to the docs](https://github.com/serverless/serverless)

# Quick Start

**1. Clone down the site**

```bash
git clone git@github.com:serverless/site.git
```

**2. Install site dependencies**

```bash
npm install
```

**3. Run site on your local computer**

```bash
npm start
```

Open your browser to http://localhost:3333

Run `npm run syncProd` or `npm run syncLocal` to pull in the blog and docs repos (if the postinstall command doesn't run for you). These 2 commands pull in the external content sources the site uses.

# Editing Site Content

When you start the site with `npm start` it will start watching for file changes and they will be automatically refreshed in the site on `http://localhost:3333`

### Editing pages

To make edits to other pages, edit the markdown in `./content`

Some pages have custom designs/layouts and the html might need to be altered. That content can be found in `./src/layouts` or `./src/pages`

# Publishing Site Updates

**1. Test the build command locally**

```bash
npm run build
```

**2. If build command succeeds, push up your changes to a new branch**

We are using [netlify](http://netlify.com) to distribute the site.

When pushing up to a new branch, netlify will automatically publish that change to a unique subdomain, like: `https://[lowercase-branch-name]--serverless.netlify.com`

For example the branch `updateDocsSetup` published to `https://updatedocssetup--serverless.netlify.com`

Successful deploys are published to the [notifications slack channel](https://serverlessteam.slack.com/archives/notifications)

**Note: The `master` branch is the live site. Never push directly to the master branch!**

**3. Review your live site changes**

If everything looks good on your unique netlify subdomain, you can go ahead and merge your branch to master on github.

Merging branches into master will trigger a site rebuild and `serverless.com` will be updated.

# Making Phenomic changes while working on the site

If you want to work on [phenomic](https://phenomic.io/) src code while working on the site, change the [transpile path in phenomic's package.json](https://github.com/MoOx/phenomic/blob/master/package.json#L149) to point to the the sites node_module path. `../site/node_modules/phenomic/lib`

Then inside of the phenomic src directory you can run `npm run transpile -- --watch` to work on phenomic src code and see the live changes effect the serverless site.
