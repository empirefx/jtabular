# jTabular

An attempt for convert JSON data into HTML tables. It supports both horizontal and vertical views with options to compact or skip specific headers.

## To-do
  - [ ] Needs refactor

## Usage

Here is an example of how to use jTabular:

```JavaScript
import jTabular from 'jtabular';

const jsonData = [
  { name: "John", age: 30, city: "New York" },
  { name: "Anna", age: 22, city: "London" },
  { name: "Mike", age: 32, city: "Chicago" }
];

const table = jTabular(jsonData, 'horizontal', ['age'], ['city']);
document.body.appendChild(table);
```

## API

### jTabular(jsonData, view, compact, skip)

- **jsonData**: The JSON data to convert into an HTML table. Can be an array of objects or a single object.
- **view**: The table view type. Can be `'horizontal'` or `'vertical'`. Default is `'horizontal'`.
- **compact**: An array of header names to compact (skip) in the table. Default is an empty array.
- **skip**: An array of header names to skip entirely from the table. Default is an empty array.

## License

This project is licensed under the MIT License.