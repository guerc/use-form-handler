# use-form-handler

[![Build Status](https://travis-ci.com/guerc/use-form-handler.svg?branch=master)](https://travis-ci.com/guerc/use-form-handler) [![codecov](https://codecov.io/gh/guerc/use-form-handler/branch/master/graph/badge.svg)](https://codecov.io/gh/guerc/use-form-handler) [![Known Vulnerabilities](https://snyk.io//test/github/guerc/use-form-handler/badge.svg?targetFile=package.json)](https://snyk.io//test/github/guerc/use-form-handler?targetFile=package.json) [![Dev Dependencies Status](https://david-dm.org/guerc/use-form-handler/dev-status.svg)](https://david-dm.org/guerc/use-form-handler?type=dev) [![Minified Bundle Size](https://badgen.net/bundlephobia/min/use-form-handler)](https://bundlephobia.com/result?p=use-form-handler)

A strongly typed React Hook for form input handling.

_use-form-handler_’s main goals are to keep it user-friendly, easy to use and type-safe. It shall be extended to include the most useful functions for form handling.

## Installation

```
npm install use-form-handler
```

## Usage

In your component, initialize the Hook using `useFormHandler` like so:

```js
const initial = {
  name: 'Marie Curie',
  occupation: 'Scientist',
};

const [formState, formHandler, isModified] = useFormHandler(initial);
```

You _must_ provide exactly one parameter to `useFormHandler` which must be a flat object consisting of a mapping between field name and value. The value can be of type `string`, `number`, `string[]`, or `undefined`. This flat map will be used for the initial state of the inputs.

`useFormHandler` then returns three elements in an array in the order indicated below. Use [ES6 destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to easily get them.

- `formState`: An object containing the present state of the form field values using the same structure as in `initial`.
- `formHandler`: An object containing a mapping between the form fields and their respective props (`name`, `onChange`, and `value`) which can be directly used on `input`, `select`, or `textarea` elements.
- `isModified`: A boolean flag indicating that one or more of the provided field values has been modified if `true`.

You can bind `useFormHandler` to your `input`, `select`, or `textarea` elements using the [ES6 spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax), for example:

```html
<form>
  <div>
    <label htmlFor="name">Name:</label>
    <input type="text" id="name" required {...formHandler.name} />
  </div>
  <div>
    <label htmlFor="occupation">Occupation</label>
    <input type="text" id="occupation" {...formHandler.occupation} />
  </div>
  <div>
    <input type="submit" value="Submit" />
  </div>
</form>
```

## License

- MIT (see [LICENSE](/LICENSE))
