# GLEVN

---

Glevn() is a tool that helps manage node based application's envorinment variables by reading from a file.

## INSTALLATION

---

Glevn can be installed either globally or locally(recommended way). For installing globally:
`npm install -g glevn`
and glevn will be installed globally to your system path.

Also Glevn can be installed locally as developer dependency:
`npm install --save-dev glevn`

If glevn is intalled locally, it is only available on npm scripts(`npm run start`).

## USAGE

---

Glevn require a environment file named `.env` in root directory of your project. That file path and name can be changed(Also using json file supported).

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

and run your javascript using `glevn app.js`. in your app.js file you can reach all envoirment variables using `process.env.<variable name>`.

### GLEVMON

Glevmon is a feature that restart the app when a file changed in watched directory or app crashed. Activating glevmon require some additional arguments : `--whatch=dirname/` and `--glevmon`. for example:

`glevmon app.js --glevmon --whatch=src`

### .glevnfile(Devoloping)

Global file includes Global modules, configurations, unwatched file. Example .glevnfile:

```python
  DEFINE MODULES
  import lodash as  _
  import module
  #That's a comment

  DEFINE CONGIG

  assign project_name = glevn
  assign-num year = 1881
  assign-bool isProduction = true

  DEFINE UNWATCHED
  # That's a comment too
  src/node_modules/
  *.md

```

Also json file can be used instead of .glevnfile:

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
