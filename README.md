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

Run with `--dev` to automatically open devtools.

## Hey

If your `html` file has a `<script>` tag that loads a javascript module, you can do all the fancy stuff like `require(...)` without needing webpack / browserify!

## License

MIT
