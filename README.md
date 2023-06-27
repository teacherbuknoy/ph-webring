# eleventy-template
Base project for eleventy websites

## Configuration

Generally, configuration is done in the `.eleventy.js` file. But for this project, configuration should be done in the JS files inside the `src/config` directory.

### `collections.js`
Collections are set in the file `src/config/collections.js`. The keys in this JS file will be the collection key in the `collections` object of Eleventy. So if the key in this file is `pages`, the collection will be accessed via `collections.pages`.

Each key should have a function value that returns an Eleventy collections object. See [Eleventy documentation](https://www.11ty.dev/docs/collections/#collection-api-methods) for details.

### `filter.js`
Eleventy filters are set in the file `src/config/collections.js`. Each key in this file will be the filter name in your template files. So if the key is `markdown`, you will use the filter in the template as {{ data | markdown }}.

Each key in this file should be mapped to a function value that will handle the filter. See [Eleventy documentation](https://www.11ty.dev/docs/filters/) for details.

### `passthrough.js`
Passthroughs should be in the `src/config/passthrough.js`. Each property in this file's exports should be mapped to a function that returns a key-value pair, where the key is the path of the passthrough in the `src` directory and the value is the path of the passthrough in the rendered site. Check [Eleventy docs](https://www.11ty.dev/docs/copy/) for details.

### `plugins.js`
Plugins should be set in the `src/config/plugins.js`. Each property in this file's exports should be mapped to a function that returns an object with the following keys:
- `plugin`: the plugin object
- `options`: the set of options that should be passed to the plugin

## Data
### Site (`site.json`)

#### `title`
The title of the website. This is also the default title of webpages.

#### `description`
The description of the website. This is also the default content of `<meta name="description">` tag.

#### `baseUrl`
The base URL of this website with **no trailing slash**.

#### `seo`
SEO images for the webpages. All of these keys have an `src` property which should contain the *rendered path* (path in the rendered site, not in the `src` directory) of the SEO image.
- **`og`** for Open Graph. Optimal image size `2400x1260`.
- **`twitter`** for Twitter. Optimal image size `2160x1080`.

#### `contact`
Contact details. You can set your own key for each contact detail object. Each of the objects in this property has the following keys:
- **`name`** - the name of the contact detail that will appear in links.
- **`identifier`** - the unique identifier for this contact detail. For phone numbers, this property will be the actual phone number. For online accounts, this could be the username. And for email accounts, this should be the email address.
- **`url`** - the URL for this contact details. If the contact detail is a phone number, this should be a `tel:` link. If the contact detail is an email address, this should be a `mailto:` link. If this is an online account, this property should be the URL of the online account profile.

#### `domains`
Some sites have multiple domains. This array will be used in canonical URLs. Each object in this array should have the following keys:
- **`name`** - the name of the domain service. For example, "Netlify", "Google Domains"
- **`domain`** - the domain name
- **`isPreferred`** -  `true` if this domain name should be the preferred one to use. Ideally, only one domain in the array has this property set to `true`. If there are multiple preferred domains, the first one will be used.

#### `api`
The different API endpoints used by this website. This is a key-value pair, where you can set your own key, and the value is the endpoint.

## Navigation Data
The file `src/data/navigation.json` contains the data for the navigation bar and menu.

This is an array of objects with the following keys:

- **`text`** - the text that will be the label of the navigation link
- **`url`** - the url of the navigation link