# Site Structure

- `/assets` - Minified image, font, icon files live here
- `/components` - individual smaller components
- `/fragments` - Larger chunks of a page composed of multiple `Components`
- `/layouts` - Page layouts used for different types of pages composed of `Components` and `Fragments`
- `/pages` - Custom pages or pages composed of layouts with hardcoded data `Components`, `Fragments`, & `Layouts`
- `/utils` - Utility functions of site
- `/redux` - Redux reducers, actions, and initial state using [DUCKs pattern](https://github.com/erikras/ducks-modular-redux)
- `layouts.js` - Layouts being added into the `PhenomicPageContainer`
- `store.js` - Redux Store
- `routes.js` -  Routing for pages and custom routes
- `app.js` - Main site container. Everything but custom routes render through here

Loosely based on Brad Frosts [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) and [pattern lab](http://demo.patternlab.io/)
