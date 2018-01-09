# electron-start

When you just want to start a js app.

## Usage

`npx electron-start`

This will open an electron window displaying `index.html` in your current directory.

And hey, if your `html` file has a `<script>` tag that loads a javascript module, you can do all the fancy stuff like `require(...)` without needing webpack / browserify!

_Note:_ If you use `npx`, no installation step is needed! Of course you can always `npm install -g electron-start` if you prefer.

## Advanced Usage

You can also load a config file to set width / height of the browser window. Make a file like this:

```js
// config.js

module.exports = {
  width: 400,
  height: 300
}
```

And run `npx electron-start -c config.js`

### Show devtools by default

Set the `--dev` flag to automatically open devtools. Eg:

`npx electron-start --dev`

### React devtools extension

Set the `--react` flag to enable the React devtools extension. Eg:

`npx electron-start --dev --react`

## License

MIT
