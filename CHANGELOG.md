# Changelog

## 0.2.0 (17/Jan/2019)
### Added
Support Javascript native types including:
- String
- Number
- Date
- Boolean
- Array
- Array<type> validation
- Nested object validation

### Changed
If there's only type checking in schema, schema can omit "type" key.
Before:
```javascript
  const schema = kya({
    nested: {
      type: {
        position: {type: [Number]},
        team: {
          apple: {type: String},
          banana: {type: String},
        },
      }
    },
  });
```

After:
```javascript
  const schema = kya({
    nested: {
      position: [Number],
      team: {
        apple: String,
        banana: String,
      },
    }
  })
```
