# Development environment for gesundleben webspecials

## Setup

1. click on `Use this template`
2. name repo `gehe-webspecial-NAME`

## Development

To locally develop on a project, run:

```shell
npm i
npm run start
```

This will serve the templates locally with auto reload enabled.

## Preview

To generate a preview which can be viewed in any browser, run:

```shell
npm run preview
```

This will generate the `html` file and copy the assets to the `dist` folder. These files can now, e.g., be zipped and sent to the project manager or client.

## Production

1. adjust the assets path in `.config/webspecial.config.json`
2. upload the assets to S3 to match the adjusted path from previous step
3. publish pages:

```shell
npm run publish
```
