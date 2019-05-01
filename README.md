# GLEVN

Glevn is a tool that helps manage node based application's environment variables.

## INSTALLATION

Glevn can be installed either globally or locally. Example for installing globally:
`npm install -g glevn`
and glevn will be installed globally to your system path.

Also Glevn can be installed locally:
`npm install --save-dev glevn`

If glevn is intalled locally, it is only available on npm scripts(`npm run start`).

## USAGE

---

Glevn require a environment file named `.env` in root directory of your project. That file path and name can be changed(Also using json files supported).

### Example .env file

```env
  HELLO=WORLD #that's a comment
  SECRET=SECRET
  PASSWORD=123456
  #That's a comment too
```

also json file can be used instead of .env file

```json
//env.json
{
  "HELLO": "WORLD",
  "SECRET": "SECRET",
  "PASSWORD": 123456
}
```

and run your `app.js` file using `glevn app.js`. in your `app.js` file you can reach all envoirment variables using `process.env.<variable name(key)>`.

### GLEVMON

Glevmon is a feature that restarts the app when a file changed in watched directory. Activating glevmon require some additional arguments (`--glevmon`). For example:

`glevmon app.js --glevmon`

### .glevnfile

`.glevnfile` includes global modules, configurations, unwatched files. Example .glevnfile:

```python
  DEFINE MODULES
  import lodash as  _
  import module
  #That's a comment

  DEFINE CONFIG

  assign project_name = glevn
  assign-num year = 1881
  assign-bool isProduction = true

  DEFINE UNWATCHED
  # That's a comment too
  src/node_modules/
  *.md

```

Also json file is allowed:

```json
{
  "MODULES": [
    {
      "name": "_",
      "ref": "lodash"
    }
  ],
  "CONFIG": {
    "year": 1881,
    "isProduction": true
  },
  "UNWATCHED": ["src/node_modules/", "*.md"]
}
```
