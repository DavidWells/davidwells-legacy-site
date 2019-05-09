---
title: A Netlify year in review
author: DavidWells
date: 2019-05-08 06:50:28
layout: Post
---

How time flies 🚀!

It feels like only yesterday... I was building [serverless.com](https://serverless.com) & falling in love with Netlify's truly magical workflow.

Jump cut to a year ago, I found myself joining the Netlify team in the dog patch of San Francisco as a Growth + DX Engineer as employee #26!

**My mission was simple:** Help the company grow, make developer lives better & educate the JAMstack world on all things serverless.

What happened next, no one could have predicted...

## What a year

I've experienced the most prolific year of my professional life.

Wrote a ton of [blog posts](https://www.netlify.com/authors/david-wells/), helped close sale deals, integrate with partners, gave some [talks/workshops](https://github.com/DavidWells/netlify-functions-workshop), [built a whole lot of awesome](#building-the-awesome) and learned a lot along the way!

I also had the opportunity to work with a wide variety of awesome people in the JAMstack/SaaS world and of course the **world class Netlify team** 🎉!  (P.S. [we are hiring](https://boards.greenhouse.io/netlify))

Working at Netlify has been a phenomenal catalyst for my personal growth over the past year.

But what do you do David? I'm GLAD YOU ASKED!

If I had to describe my job in a simple Venn diagram it would look a little something like this:

<img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/blog/DX-ven-diagram.jpg" />

On a daily basis, I find myself at the intersection of devOps, devRel, frontend, product, & marketing. Add in working with [partners](#integrating-with-partners--netlify-add-ons) and that almost covers it.

It's been great to combine the skills I've acquired over the years into one role!

Let's dive deeper.

## Building the Awesome

The DX team is focused on empowering developers (customers & partners) by making it as easy & streamlined as possible for them to build awesome stuff on top of the expanding Netlify Platform.

We are the internal dogfooders. We stretch, bend, and break the tools we offer to make things better for the ever expanding group of developers.

This led to a number of interesting projects including:

- [Netlify + Express](https://github.com/netlify-labs/netlify-functions-express)
- [How to create Single Sign On flows with role based access controls](https://github.com/netlify-labs/netlify-gated-sites)
- [How to use Netlify OAuth Applications](https://github.com/netlify-labs/oauth-example)
- [Integrating Intercom login flows with OAuth & functions](https://github.com/netlify-labs/intercom-netlify-oauth)
- [Running headless chrome in serverless functions](https://github.com/netlify-labs/netlify-functions-headless-chrome)
- [Building GraphQL APIs with serverless functions](https://github.com/netlify-labs/functions-and-graphql)
- [Progressive Form enhancement with serverless functions](https://github.com/DavidWells/progressive-enhancement-form-functions)
- [Cache me outside](https://github.com/DavidWells/cache-me-outside)

and then some...

### 👨‍💻 Netlify CLI

One of my favorite projects was re-building the [Netlify CLI](https://github.com/netlify/cli).

A green field project is always fun & crafting CLI experiences is a hobby of mine. (Weird hobbies I know)

The wonderful [Bret Comnes](https://twitter.com/bcomnes) and myself hacked away at building a new CLI experience that we thought people would love.

<img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/work/netlify-cli-deploy.svg" />

```
# Install the netlify CLI
npm install netlify-cli -g
```

[All of the CLI commands can be seen here](https://cli.netlify.com/)

The CLI is extendable via plugins and there is much more in store for it in the future.

### ⚡️ functions.netlify.com

In an effort to educate the world of whats possible with serverless tech. I built out [functions.netlify.com](https://functions.netlify.com).

It's everything you ever wanted to know about Netlify Functions

- [Functions Site](https://functions.netlify.com)
- [Functions Examples](https://functions.netlify.com/examples)
- [Functions Tutorials](https://functions.netlify.com/tutorials)
- [Repo](https://github.com/netlify-labs/functions-site)

Make sure to checkout the site for all the awesome [examples](https://functions.netlify.com/examples/) & [tutorials](https://functions.netlify.com/tutorials)

<img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/work/netlify-functions-site-examples.jpg" />

Shout out to [Gatsby](https://www.gatsbyjs.org/) for the awesome framework the site is built on.

### ❤️ CodeSandbox + Netlify deploy

This was an integration project with CodeSandbox. We wanted to add a way for CodeSandbox users to be able to one-click deploy from their CodeSandbox project. You can read more about it here in the [blog post](https://www.netlify.com/blog/2019/03/26/deploy-codesandbox-to-netlify/)

<iframe width="560" height="315" src="https://www.youtube.com/embed/S4Nshf2IGmM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The end result is a nice lil' Deploy to Netlify flow!

<img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/work/csb-deploy.jpg" />

It was a true pleasure working closely with [Sara Vieira](https://twitter.com/nikkitaftw) & [Ives van Hoorne](https://twitter.com/CompuIves) on this one!

### 🚀 AWS CloudFormation

Deploy Netlify sites as part of [serverless](https://serverless.com), SAM, or raw AWS CloudFormation stacks.

This project lets you define your Netlify site as infrastructure as code.

- [Post](https://www.netlify.com/blog/2018/11/29/deploying-netlify-sites-with-aws-cloudformation/)
- [Example](https://github.com/DavidWells/netlify-site-as-aws-custom-resource-example)

<iframe width="560" height="315" src="https://www.youtube.com/embed/AQ-f-U8Pncc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 💸 FaunaDB + Netlify Integration

What started out as building a quick example application quickly turned into much much more and became the first official Netlify add-on.

The humble beginnings of this [application](https://faunadb-example.netlify.com/) is using React for the frontend, Netlify Functions for API calls, and FaunaDB as the backing database.

You can read more about the project in the [README](https://github.com/netlify/netlify-faunadb-example/blob/master/README.md) or in the [blog post](https://github.com/netlify/netlify-faunadb-example)

We ended up turning the project & add-on into a [one click Fauna Stack](https://github.com/netlify/fauna-one-click). Seriously, it's one click for a working FullStack NoSQL backed React application.

The backend works like so:

<img src="https://user-images.githubusercontent.com/532272/42067494-5c4c2b94-7afb-11e8-91b4-0bef66d85584.png" />

You can install the `faunadb` add-on with the Netlify CLI via:

```bash
# Add a faunaDB to your netlify site
netlify addons:create fauna
```

For more information checkout the [add-on docs](https://www.netlify.com/docs/partner-add-ons/).

## Integrating with partners & Netlify Add-ons

I've had a heck of a time keeping up with the various integration partners & companies that want to build on top of the Netlify ecosystem & platform.

Still in it's alpha phase, I've been working tirelessly with companies to help them integrate and build [Netlify add-on extensions](https://github.com/netlify/addons).

- [Building Reference implementations](https://github.com/netlify/addons/tree/master/examples)
- [Writing the docs](https://github.com/netlify/addons#building-add-on-integrations-with-netlify)
- Working with truly awesome partners like [FaunaDB](https://fauna.com/) & [TakeShape](https://www.takeshape.io/)
- and building wonderful ASCII art

<img src="https://user-images.githubusercontent.com/532272/45775428-93c74000-bc04-11e8-9a27-084170353563.png" />

If you are curious about [Netlify add-ons checkout this deck](https://docs.google.com/presentation/d/1x-pE1-_-eN1kvyITTAHIuIWReUxQulQHoiEBBmB3dsE/edit?usp=sharing) and get in touch with me.

### Super secret upcoming integrations

We have some additional integrations cooking! Stay tuned...

## Marketing

On the marketing front, I've been in charge of instrumenting analytics on the various Netlify products from [app.netlify.com](https://app.netlify.com/), [our site](http://netlify.com), API, and wide variety of micro sites. This data is a crucial part of the product feedback loop and helps us make data driven decisions on where we head to next.

On the marketing-ops front, I've built a variety of serverless services to help with new user onboarding, sales enablement, usage telemetry & referral tracking. I'm hoping to open source these at some point.

User Retention + Activation is also a large component of what I have been working on for the past year here at Netlify. You might have seen an email or two for me 🙈. I apologize for that, we try to make them as helpful & actionable as possible!

We are leveraging the all powerful [customer.io](http://customer.io) platform for fine-grained communications and I'm **digging it**.

Recently, I built out the [email preference center](https://messages.netlify.com/) for users to manage what kinds of emails they want, or they can opt out completely!

Working close to the numbers & leveraging them for informed decisions its critical for any company. If you're unfamiliar with web analytics / telemetry [holler at me](https://davidwells.io/contact/) and I can point you in the right direction.

## Teaching people

I'm **insanely passionate** about teaching people the raw super powers that come when adopting serverless technology.

Scaling, Operating, and Maintaining an application at massive scale is now well within the grasp of the frontend devs. If you can write javascript, you can build a badass serverless stack.

To that end, most of my content is focus around that.

- [Workshop on serverless functions](https://github.com/DavidWells/netlify-functions-workshop)
- [Building Serverless CRUD apps with Netlify Functions & FaunaDB](https://www.netlify.com/blog/2018/07/09/building-serverless-crud-apps-with-netlify-functions--faunadb/)
- [How to setup serverless OAuth Flows with Netlify Functions & Intercom](https://www.netlify.com/blog/2018/07/30/how-to-setup-serverless-oauth-flows-with-netlify-functions--intercom/) [Video](https://www.youtube.com/watch?v=zErvY08uNM0)
- [5 Key Benefits of "Going Serverless"](https://www.netlify.com/blog/2018/08/06/five-key-benefits-of-going-serverless/)
- [Netlify CLI 2.0 now in Beta 🎉 ](https://www.netlify.com/blog/2018/09/10/netlify-cli-2.0-now-in-beta-/)
- [Deploying Netlify Sites with AWS CloudFormation](https://www.netlify.com/blog/2018/11/29/deploying-netlify-sites-with-aws-cloudformation/)
- [Deploy CodeSandbox to Netlify](https://www.netlify.com/blog/2019/03/26/deploy-codesandbox-to-netlify/)
- [Building an app with Netlify OAuth (Video)](https://www.youtube.com/watch?v=LN8cL2yPR3c)
- [What the heck is serverless webinar series](https://github.com/netlify-labs/what-the-heck-is-serverless)
- [What the heck is serverless? (Video)](https://www.youtube.com/watch?v=AEBWLm1L-qI)
- [CSS Tricks: Serverless 101 (Video)](https://www.youtube.com/watch?v=2N_sUmpjzZk)
- [First Steps with Serverless (Video)](https://www.youtube.com/watch?v=h5R_SxV-cFY)
- [Building Your Backend With Serverless Functions](https://www.youtube.com/watch?v=iZrzuUwm-9Y)
- [Netlify Add-ons (deck)](https://docs.google.com/presentation/d/1x-pE1-_-eN1kvyITTAHIuIWReUxQulQHoiEBBmB3dsE/edit?usp=sharing)

If you're curious about other serverless stuff, I highly recommend checking out [this](https://www.manning.com/livevideo/production-ready-serverless) and [this](https://github.com/DavidWells/serverless-workshop) & subscribing to [this](https://www.jeremydaly.com/newsletter/). Also feel free to drop me a line.

## How did this happen?

I like to think all these things were made possible by all the wonderful folks on the Netlify team and these guiding principles.

- Be creative
- Experiment, try new things, don't be afraid to fail
- Be data driven
- Learn from failures
- Relish & repeat success
- **Have fun & build awesome** ✨

> Most importantly, have fun and build awesome!

Looking back at the past year Netlify has enabled me to do just that.

<img src="https://s3-us-west-2.amazonaws.com/assets.davidwells.io/blog/success-kid.jpg" />

It's been a wild ride and I can't wait to see what the next year holds.

Shoutout to [Matt](https://twitter.com/biilmann) & [Chris](https://twitter.com/chr_bach) the two founders of Netlify. They are killing it & recruit the best folks (minus myself)

Also to Daniel Freeman who continues to be an awesome mentor & empowers me to build all this awesome shit!

P.S. [we are hiring a bunch of people](https://boards.greenhouse.io/netlify) & trying to expand the awesome. If this post peaked your interest, please reach out.
