# API HTML

Convert any API Specification into an awesome HTML documentation website

![](https://raw.githubusercontent.com/asfand-dev/api-html/master/src/assets/img/apis.svg)

# Screenshot
![](https://cdn.jsdelivr.net/npm/api-html@1.0.1/assets/img/screenshot.png)

<br /><br />

## Use the online tool

[API HTML](https://asfand-dev.github.io/api-html/)

## Use CLI

### Installation

`npm i api-html -g`

<br /><br />

### Usage

`api-html --url https://petstore.swagger.io/v2/swagger.json`

[Demo](https://pets-shop-swagger.netlify.app/)

The above command will convert the given `url` into a static website in the current directory with the name of `dist` directory.

There is also a possibility to pass a `file` instead of `url`.

### Params

| Param | Short | Required | Default Value | Details |
|---|---|---|---|---|
|`--file`| `-f`  | `required` | null | Path to a local source file, `--file` or `--url` on is required at same time.
|`--url`| `-u`  | `required` | null | URL to an online source file, `--file` or `--url` on is required at same time.
|`--type`| `-t`  | optional | `swagger` | Encoded type of the API specification, like `swagger`, `openapi`, `api_blueprint`, `io_docs`, `google`, `raml` or `wadl`
|`--version`| `-v`  | optional | `2` | Version of the OpenAPI (`swagger`), possible values are 1, 2 or 3. Only applicable to `swagger`
|`--yaml`| `-y`  | optional | `0` | If the source file type is `yaml` then the value should be `1`, only applicable to `swagger`
|`--option`| `-o`  | optional | `./options.json` | Path to the options file, see the details below

### Example

```
  api-html --yaml 1 --url https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v2.0/yaml/api-with-examples.yaml
  # A Swagger (OpenAPI) version 2 source file with yaml type

  api-html --version 3 --url https://api.gettyimages.com/swagger/v3/swagger.json
  # A Swagger (OpenAPI) version 3 source file with json type

  api-html --version 3 --yaml 1 --url https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore-expanded.yaml
  # A Swagger (OpenAPI) version 3 source file with yaml type

  api-html --type api_blueprint --url https://raw.githubusercontent.com/apiaryio/api-blueprint/master/examples/Polls%20API.md
  # An API Blueprint source file

  api-html --type google --url https://www.googleapis.com/discovery/v1/apis/translate/v2/rest
  # A Google API descory source file

  api-html --type raml --url https://raw.githubusercontent.com/raml-apis/XKCD/master/api.raml
  # A RAML source file

  api-html --type io_docs --url https://raw.githubusercontent.com/lucybot/api-spec-converter/master/test/input/io_docs/foursquare.json
  # An IO Docs source file
```
<br /><br /><br />

### Options (options.json)
The options should be in a json file, If you don't pass the `--option` parameter then we will check in the current directory with the name of `options.json`.


| Name | Default Value | Description |
|---|---|---|---|
|`baseColor`| `#6e9a04`  | Set the base color of the theme
|`textColor`| `#FFF`  | Set the text color of the theme
|`logo`| 'swagger-logo'  | Point a logo to a local file
|`logoUrl`| ''  | Point a logo to the URL
|`isCoding`| `true`  | Show or Hide the coding section in the request
|`isSearch`| `true`  | Show or Hide the Search feature
|`isTryRequest`| `true`  | Show or Hide the "try out" button in the request
|`isBackToTopButton`| `true`  | Hide or show the `BackToTop` button
|`pageTitle`| the  `title` from the `swagger.json` file  | Set the page title shown on browser title bar.
|`customHeadScript`| ''  | Add custom script to the head tag
|`customFootScript`| ''  | Add custom script to the foot tag
|`pageTags`| ''  | Represent the meta keywords of the page, Each keyword should be seperated by a comma. Meta Keywords are helpful for the page SEO.
|`pageDescription`| ''  | Represent the meta description of page
|`apiVersions`| ''  | API Versions, enter in the following format:<br/>(Name)[URL]<br/>(Name)[URL]<br/>...<br/>Exp:<br/>(V1)[https://zamacall.io/docs/v1/]<br/>(V2)[https://zamacall.io/docs/v2/]
|`headerMenuItems`| ''  | Header Menu Items, enter in the following format:<br>(Name)[URL]<br>(Name)[URL]<br>...<br>Exp:<br>(Main Website)[https://zamacall.io]<br>(Contact Us)[https://zamacall.io/contact/]



#### Example

```
{
  "logo": "logo.svg",
  "baseColor": "blue"
} 
```


## Change log
+ Added support for `IO Docs` source file
+ Added support for `WADL` source file
+ Added support for `RAML` source file
+ Added support for `Google API Descory` source file
+ Added support for `API Blueprint` source file
+ Added support for `YAML` source file
+ Added support for `OpenAPI `(swagger) version 1, 2, & 3.
+ Added the search functionality
+ Added support for trying the api request
+ Added support for code generation for languages like: `cURL`, `Node`, `Python` & `JavaScript`
+ Added an online tool to preview and download through online website
+ Added automatic description to the Authentication sections, will replace the empty descriptions.
+ Added support for small screens like mobile devices


## Report an issue or request a feature

[Github issues](https://github.com/asfand-dev/api-html/issues)

## Contact us

asfand@gmail.com

