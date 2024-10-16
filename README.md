# Pick random user

## What is it?

The Pick Random User Plugin shows a modal for moderator to pick a user (mainly viewer but it could also be a moderator) randomly out of the whole list of users present in a meetings. 

![Gif of plugin demo](./public/assets/plugin.gif)

## Running the Plugin from Source

1. Start the development server:

```bash
cd $HOME/src/plugin-pick-random-user-plugin
npm install
npm start
```

2. Add this create parameter:

```
pluginsManifests=[{"url": "http://172.17.0.1:4701/manifest.json"}]
```

## Building the Plugin

To build the plugin for production use, follow these steps:

```bash
cd $HOME/src/plugin-pick-random-user-plugin
npm ci
npm run build-bundle
```

The above command will generate the `dist` folder, containing the bundled JavaScript file named `PickRandomUserPlugin.js`. This file can be hosted on any HTTPS server along with its `manifest.json`.

Remember to change the `javascriptEntrypointUrl` in the `manifest.json` that you will host.

To use the plugin in BigBlueButton, send this parameter along in create call:

```
pluginsManifests=[{"url": "<manifest.json url>"}]
```