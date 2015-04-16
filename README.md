The Story
=========

## Introduction

A visual presentation of data. Thumbnails (representing data) are randomly looped in an automated slideshow. The slideshow can be paused by the user. Animations are used for a more compelling experience.

## Built With

- [Polymer](https://www.polymer-project.org/)
- [Rise storage](https://github.com/Rise-Vision/web-component-rise-storage)
  - *includes webcomponents and polymer core objects*
- [npm](https://www.npmjs.org)
- [Bower](http://bower.io/)
- [Gulp](http://gulpjs.com/)
- [web-component-tester](https://github.com/Polymer/web-component-tester) for testing

## Development

### Local Development Environment Setup and Installation

- View the proof of concept in Chrome
- Edit in text editor of your choice
- Read [documentation](Documentation.md)

For convenience, dependencies are included in this repository. If you wish to manage dependencies with package manager tools:

- install node and npm package manager
- install global dependencies:
  - gulp build tool: `npm install -g gulp`
  - install bower package manager: `npm install -g bower`
- install dependencies using: `npm install` (this will also run `bower install` to install web components).

### Run Local

View through a local webserver. Node [http-server](https://www.npmjs.org/package/http-server) or python recommended. Run on port 8000 using one of the commands below:

```shell
http-server -p 8000
```
or
```shell
python -m SimpleHTTPServer
```

### Dependencies

**Note:** web components are installed in a folder at the same level as this repo (*not* inside the repo), as recommended in the [polymer docs](https://www.polymer-project.org/0.5/docs/start/reusableelements.html#create)

- web components (install with `bower install`)
  - [rise-storage web component](https://github.com/Rise-Vision/web-component-rise-storage)
- libraries and scripts (install with `npm install`)
  - [knuth-shuffle](https://github.com/coolaj86/knuth-shuffle)
- development dependencies: gulp and plugins (install using `npm install`)

### Testing

_To be developed_

## Submitting Issues

If you encounter problems or find defects we really want to hear about them. If you could take the time to add them as issues to this Repository it would be most appreciated. When reporting issues please use the following format where applicable:

**Reproduction Steps**

1. did this
2. then that
3. followed by this (screenshots / video captures always help)

**Expected Results**

What you expected to happen.

**Actual Results**

What actually happened. (screenshots / video captures always help)

## Contributing

All contributions are greatly appreciated and welcome! If you would first like to sound out your contribution ideas please post your thoughts to our [community](http://community.risevision.com), otherwise submit a pull request and we will do our best to incorporate it.

### Languages

In order to support languages i18n needs to be added to this repository.  Please refer to our Suggested Contributions.

### Suggested Contributions

As we are at the proof of concept stage, all ideas are welcome! Please report any bugs with the code or anticipated difficulties with the user experience.

## Resources
If you have any questions or problems please don't hesitate to join our lively and responsive community at http://community.risevision.com.

If you are looking for user documentation on Rise Vision please see http://www.risevision.com/help/users/

If you would like more information on developing applications for Rise Vision please visit http://www.risevision.com/help/developers/.

**Facilitator**

[Ben Boyle](https://github.com/bboyle "Ben Boyle")
