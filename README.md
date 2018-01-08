# electron-start

When you just want to start a js app.

## Usage

- Install: `npm install -g electron-start`
- Start your app by pointing to an `html` file, eg: `electron-start index.html`
- You can also load a config file to set width / height of the browser window. Make a file like this:

```js
// config.js

module.exports = {
  width: 400,
  height: 300
}
```

And run `electron-start -c config.js index.html`

### Devtools

Set the `--dev` flag to automatically open devtools. Eg:

`electron-start index.html --dev`

### React Devtools

Set the `--react` flag to enable the React devtools extension. Eg:

`electron-start index.html --dev --react`

## License

MIT
