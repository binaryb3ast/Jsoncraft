# JsonCraft 🚀

Welcome to **JsonCraft**, the Swiss Army knife for all things JSON! 🎉 Whether you're wrangling with complex, nested data
or just need a quick way to merge and update JSON objects, **JsonCraft** has got you covered.

Built with simplicity and power in mind, this TypeScript library makes it easy to manipulate JSON structures like a pro.
Say goodbye to messy code and hello to clean, intuitive methods that make JSON manipulation feel like magic. ✨

🔧 **Features**:

- Effortless merging of JSON objects
- Safe and easy updates to deeply nested properties
- Small, fast, and reliable

| Method Name    | Description                                                                        | Link                  |
  |----------------|------------------------------------------------------------------------------------|-----------------------|
| `getValue`     | Retrieves a value from a JSON object at a specified path (dot-separated or array). | [Link](#getValue)     |
| `setValue`     | Sets a value in a JSON object at a specified path.                                 | [Link](#setValue)     |
| `hasPath`      | Checks if a specified path exists in a JSON object.                                | [Link](#hasPath)      |
| `deletePath`   | Deletes a property in a JSON object at a specified path.                           | [Link](#deletePath)   |
| `deepClone`    | Creates a deep copy of a JSON object.                                              | [Link](#deepClone)    |
| `mergeObjects` | Recursively merges two JSON objects.                                               | [Link](#mergeObjects) |
| `mapKeyTypes`  | Maps each key in a JSON object to its data type.                                   | [Link](#mapKeyTypes)  |
| `updateValue`  | Updates the value at a specified path in a JSON object.                            | [Link](#updateValue)  |
| `renameKey`    | Renames a specified key within a JSON object.                                      | [Link](#renameKey)    |
| `flatten`      | Flattens a nested JSON object into a single-level object.                          | [Link](#flatten)      |
| `unflatten`    | Unflattens a previously flattened JSON object.                                     | [Link](#unflatten)    |
| `isEmpty`      | Checks if an object (or array) is empty.                                           | [Link](#isEmpty)      |
| `mergeArrays`  | Merges new values into an array at a specified path, ensuring no duplicates.       | [Link](#mergeArrays)  |
| `pick`         | Picks specific keys from a JSON object.                                            | [Link](#pick)         |
| `omit`         | Omits specific keys from a JSON object.                                            | [Link](#omit)         |
| `compact`      | Removes all null and undefined values from an object.                              | [Link](#compact)      |
| `deepEqual`    | Checks if two objects are deeply equal.                                            | [Link](#deepEqual)    |

### `getValue`

The `getValue` method is used to retrieve a value from a JSON object at a specified path. The path can be a combination
of dot-separated keys for nested objects or array indices for arrays. This method allows you to access deeply nested
values in a JSON structure.

#### Syntax:

```javascript
getValue(jsonObject, path)
```

- `jsonObject`: The JSON object from which the value needs to be retrieved.
- `path`: A string representing the path to the desired value. You can use dot notation (`.`) for objects and bracket
  notation (`[]`) for arrays.

#### Example:

```javascript
const JsonCraft = require('JsonCraft'); // Assuming JsonCraft is a library for handling JSON paths

const data = {
    user: {
        name: "John Doe",
        age: 30,
        address: {
            city: "New York",
            postalCode: 10001
        },
        friends: [
            {name: "Jane", age: 28},
            {name: "Mark", age: 32}
        ]
    }
};

// Example usage with JsonCraft:
const name = JsonCraft.get(data, 'user.name'); // "John Doe"
const city = JsonCraft.get(data, 'user.address.city'); // "New York"
const firstFriendName = JsonCraft.get(data, 'user.friends[0].name'); // "Jane"

console.log(name); // "John Doe"
console.log(city); // "New York"
console.log(firstFriendName); // "Jane"
```

---

### `setValue`

The `setValue` method is used to set a value in a JSON object at a specified path. It allows you to update values within
nested objects or arrays using dot-separated keys and bracket notation. This method is useful for modifying deeply
nested properties in a JSON structure.

#### Syntax:

```javascript
setValue(jsonObject, path, value)
```

- `jsonObject`: The JSON object from which the value needs to be retrieved.
- `path`: A string representing the path to the desired location where the value should be set. You can use dot
  notation (.) for objects and bracket notation ([]) for arrays.
- `value`: The value you want to assign to the specified path.

#### Example:

```javascript
const JsonCraft = require('JsonCraft'); // Assuming JsonCraft is a library for handling JSON paths

const data = {
    user: {
        name: "John Doe",
        age: 30,
        address: {
            city: "New York",
            postalCode: 10001
        },
        friends: [
            {name: "Jane", age: 28},
            {name: "Mark", age: 32}
        ]
    }
};

// Example usage with JsonCraft:
JsonCraft.set(data, 'user.name', 'John Smith'); // Update user name
JsonCraft.set(data, 'user.address.city', 'Los Angeles'); // Update city
JsonCraft.set(data, 'user.friends[0].age', 29); // Update Jane's age

console.log(data.user.name); // "John Smith"
console.log(data.user.address.city); // "Los Angeles"
console.log(data.user.friends[0].age); // 29
```

---

### `hasPath`

The `hasPath` The hasPath method is used to check if a specified path exists in a JSON object. This method is helpful
for verifying if a value or property is present at a particular path before attempting to access or modify it. It
supports dot-separated keys for nested objects and bracket notation for array indices.

#### Syntax:

```javascript
hasPath(jsonObject, path)
```

- `jsonObject`: The JSON object from which the value needs to be retrieved.
- `path`: A string representing the path to the desired location where the value should be set. You can use dot
  notation (.) for objects and bracket notation ([]) for arrays.

#### Example:

```javascript
const JsonCraft = require('JsonCraft'); // Assuming JsonCraft is a library for handling JSON paths

const data = {
    user: {
        name: "John Doe",
        age: 30,
        address: {
            city: "New York",
            postalCode: 10001
        },
        friends: [
            {name: "Jane", age: 28},
            {name: "Mark", age: 32}
        ]
    }
};

// Example usage with JsonCraft:
const hasCity = JsonCraft.hasPath(data, 'user.address.city'); // true
const hasCountry = JsonCraft.hasPath(data, 'user.address.country'); // false
const hasFriendAge = JsonCraft.hasPath(data, 'user.friends[0].age'); // true

console.log(hasCity); // true
console.log(hasCountry); // false
console.log(hasFriendAge); // true
```

---

### `deletePath`

The `deletePath` method is used to remove a property from a JSON object at a specified path. This method provides a safe
and efficient way to delete deeply nested properties, supporting both dot-separated keys for nested objects and bracket
notation for array indices.

#### Syntax:

```javascript
deletePath(jsonObject, path)
```

- `jsonObject`: The JSON object from which the value needs to be retrieved.
- `path`: A string representing the path to the desired location where the value should be set. You can use dot
  notation (.) for objects and bracket notation ([]) for arrays.

#### Example:

```javascript
const JsonCraft = require('JsonCraft'); // Assuming JsonCraft is a library for handling JSON paths

const data = {
    user: {
        name: "John Doe",
        age: 30,
        address: {
            city: "New York",
            postalCode: 10001
        },
        friends: [
            {name: "Jane", age: 28},
            {name: "Mark", age: 32}
        ]
    }
};

// Example usage with JsonCraft:
JsonCraft.deletePath(data, 'user.address.city');
JsonCraft.deletePath(data, 'user.friends[0].name');

console.log(data);
/*
{
    user: {
        name: "John Doe",
        age: 30,
        address: {
            postalCode: 10001
        },
        friends: [
            { age: 28 },
            { name: "Mark", age: 32 }
        ]
    }
}
*/
```

---

### `deepClone`

The `deepClone` method is used to create a deep copy of a JSON object. This means that all levels of the object,
including nested objects and arrays, are copied. The cloned object is completely independent of the original, so changes
made to one will not affect the other.

#### Syntax:

```javascript
deepClone(jsonObject)
```

- `jsonObject`: The JSON object to be cloned.

#### Example:

```javascript
const JsonCraft = require('JsonCraft'); // Assuming JsonCraft is a library for handling JSON operations

const data = {
    user: {
        name: "John Doe",
        age: 30,
        address: {
            city: "New York",
            postalCode: 10001
        },
        friends: [
            {name: "Jane", age: 28},
            {name: "Mark", age: 32}
        ]
    }
};

// Create a deep clone of the data object
const clonedData = JsonCraft.deepClone(data);

// Modify the cloned object
clonedData.user.name = "Jane Doe";
clonedData.user.address.city = "Los Angeles";
clonedData.user.friends[0].name = "Alice";

console.log(data);
/*
Original object remains unchanged:
{
    user: {
        name: "John Doe",
        age: 30,
        address: {
            city: "New York",
            postalCode: 10001
        },
        friends: [
            { name: "Jane", age: 28 },
            { name: "Mark", age: 32 }
        ]
    }
}
*/

console.log(clonedData);
/*
Cloned object with modifications:
{
    user: {
        name: "Jane Doe",
        age: 30,
        address: {
            city: "Los Angeles",
            postalCode: 10001
        },
        friends: [
            { name: "Alice", age: 28 },
            { name: "Mark", age: 32 }
        ]
    }
}
*/
```

---

### `mergeObjects`

The `mergeObjects` The mergeObjects method is used to recursively merge two JSON objects. This method takes two JSON
objects as input and combines their properties. If the same key exists in both objects, the value from the second object
will overwrite or extend the value from the first, allowing for a comprehensive merging of nested objects.

#### Syntax:

```javascript
mergeObjects(targetObject, sourceObject)
```

- `targetObject`: The base JSON object that will receive new or updated properties from the source.
- `sourceObject`: The JSON object whose properties will be merged into the target object.

#### Example:

```javascript
const JsonCraft = require('JsonCraft'); // Assuming JsonCraft is a library for handling JSON operations

const data1 = {
    user: {
        name: "John Doe",
        age: 30,
        address: {
            city: "New York",
            postalCode: 10001
        },
        preferences: {
            newsletter: true,
            notifications: true
        }
    }
};

const data2 = {
    user: {
        age: 31, // Overwrites age in data1
        address: {
            state: "NY" // Adds new key within address in data1
        },
        preferences: {
            notifications: false // Overwrites notifications preference
        },
        friends: ["Jane", "Mark"] // Adds new key entirely
    }
};

// Merge data2 into data1
const mergedData = JsonCraft.mergeObjects(data1, data2);

console.log(mergedData);
/*
Merged object:
{
    user: {
        name: "John Doe",
        age: 31,
        address: {
            city: "New York",
            postalCode: 10001,
            state: "NY"
        },
        preferences: {
            newsletter: true,
            notifications: false
        },
        friends: ["Jane", "Mark"]
    }
}
*/
```

---

### `mapKeyTypes`

The `mapKeyTypes` method generates a mapping of each key in a JSON object to its corresponding data type. This function
is useful for analyzing the structure of JSON data, especially in cases where you need to know the types of values
stored at each key, such as for validation, debugging, or dynamic form generation.

#### Syntax:

```javascript
mapKeyTypes(jsonObject)
```

- `jsonObject`: The JSON object from which you want to derive the key-type mappings.

#### Example:

```javascript
const JsonCraft = require('JsonCraft'); // Assuming JsonCraft is a library for handling JSON operations

const data = {
    user: {
        name: "John Doe",
        age: 30,
        address: {
            city: "New York",
            postalCode: 10001
        },
        friends: [
            {name: "Jane", age: 28},
            {name: "Mark", age: 32}
        ]
    },
    isActive: true,
    tags: ["developer", "designer"]
};

// Map each key to its data type
const typeMapping = JsonCraft.mapKeyTypes(data);

console.log(typeMapping);
/*
Output:
{
    user: "object",
    "user.name": "string",
    "user.age": "number",
    "user.address": "object",
    "user.address.city": "string",
    "user.address.postalCode": "number",
    "user.friends": "array",
    "user.friends[0]": "object",
    "user.friends[0].name": "string",
    "user.friends[0].age": "number",
    "user.friends[1]": "object",
    "user.friends[1].name": "string",
    "user.friends[1].age": "number",
    isActive: "boolean",
    tags: "array",
    "tags[0]": "string",
    "tags[1]": "string"
}
*/
```

---

### `updateValue`

The `updateValue` method updates the value at a specified path within a JSON object, allowing for easy modification of
deeply nested properties.

#### Syntax:

```javascript
updateValue(jsonObject, path, newValue)
```

- `jsonObject`: The JSON object where the value will be updated.
- `path`: A string specifying the path to the value you want to update (using dot notation for objects and brackets for
  arrays).
- `newValue`: The new value to be assigned to the specified path.

#### Example:

```javascript
const JsonCraft = require('JsonCraft'); // Assuming JsonCraft is a library for handling JSON paths

const data = {
    user: {
        name: "John Doe",
        age: 30,
        address: {
            city: "New York",
            postalCode: 10001
        }
    }
};

// Example usage with JsonCraft:
JsonCraft.updateValue(data, 'user.address.city', 'Los Angeles');
console.log(data);
// Output: 
// {
//   user: {
//     name: "John Doe",
//     age: 30,
//     address: {
//       city: "Los Angeles",
//       postalCode: 10001
//     }
//   }
// }
```

---

### `renameKey`

The `renameKey` method renames a specified key within a JSON object. This is useful for changing the structure of JSON
data without altering its content.

#### Syntax:

```javascript
renameKey(jsonObject, path, newKeyName)
```

- `jsonObject`: The JSON object containing the key to rename.
- `path`: A string specifying the path to the key you want to rename (using dot notation for objects and brackets for
  arrays).
- `newKeyName`: The new name to assign to the specified key.

#### Example:

```javascript
const JsonCraft = require('JsonCraft'); // Assuming JsonCraft is a library for handling JSON paths

const data = {
    user: {
        name: "John Doe",
        age: 30,
        contact: {
            email: "john.doe@example.com",
            phone: "123-456-7890"
        }
    }
};

// Example usage with JsonCraft:
JsonCraft.renameKey(data, 'user.contact.phone', 'mobile');
console.log(data);
// Output: 
// {
//   user: {
//     name: "John Doe",
//     age: 30,
//     contact: {
//       email: "john.doe@example.com",
//       mobile: "123-456-7890"
//     }
//   }
// }
```

---

### `flatten`

The `flatten` method converts a nested JSON object into a single-level object, where each key represents the path to the
original nested value. This can simplify working with deeply nested data structures.

#### Syntax:

```javascript
flatten(jsonObject)
```

- `jsonObject`: The JSON object you want to flatten.

#### Example:

```javascript
const JsonCraft = require('JsonCraft'); // Assuming JsonCraft is a library for handling JSON paths

const data = {
    user: {
        name: "John Doe",
        address: {
            city: "New York",
            postalCode: 10001
        },
        friends: [
            {name: "Jane", age: 28},
            {name: "Mark", age: 32}
        ]
    }
};

// Example usage with JsonCraft:
const flattenedData = JsonCraft.flatten(data);
console.log(flattenedData);
// Output:
// {
//   "user.name": "John Doe",
//   "user.address.city": "New York",
//   "user.address.postalCode": 10001,
//   "user.friends[0].name": "Jane",
//   "user.friends[0].age": 28,
//   "user.friends[1].name": "Mark",
//   "user.friends[1].age": 32
// }
```

---

### `unflatten`

The `unflatten` method takes a flattened JSON object with dot- or bracket-notated keys and reconstructs it into its
original nested structure. This is useful when working with flattened data that needs to be organized back into a
hierarchical format.

#### Syntax:

```javascript
unflatten(flattenedObject)
```

- `jsonObject`: The flattened JSON object you want to convert back to its nested structure.

#### Example:

```javascript
const JsonCraft = require('JsonCraft'); // Assuming JsonCraft is a library for handling JSON paths

const flattenedData = {
    "user.name": "John Doe",
    "user.address.city": "New York",
    "user.address.postalCode": 10001,
    "user.friends[0].name": "Jane",
    "user.friends[0].age": 28,
    "user.friends[1].name": "Mark",
    "user.friends[1].age": 32
};

// Example usage with JsonCraft:
const nestedData = JsonCraft.unflatten(flattenedData);
console.log(nestedData);
// Output:
// {
//   user: {
//     name: "John Doe",
//     address: {
//       city: "New York",
//       postalCode: 10001
//     },
//     friends: [
//       { name: "Jane", age: 28 },
//       { name: "Mark", age: 32 }
//     ]
//   }
// }
```

---

### `isEmpty`

The `isEmpty` method checks whether an object (or array) is empty. An empty object has no keys, and an empty array has
no elements. This method is useful when you want to validate whether a JSON object or array contains any meaningful
data.

#### Syntax:

```javascript
isEmpty(value)
```

- `value`: The object or array to check.

#### Example:

```javascript
const JsonCraft = require('JsonCraft'); // Assuming JsonCraft is a library for handling JSON paths

const emptyObject = {};
const nonEmptyObject = {name: "John", age: 30};
const emptyArray = [];
const nonEmptyArray = [1, 2, 3];

// Example usage with JsonCraft:
console.log(JsonCraft.isEmpty(emptyObject)); // true
console.log(JsonCraft.isEmpty(nonEmptyObject)); // false
console.log(JsonCraft.isEmpty(emptyArray)); // true
console.log(JsonCraft.isEmpty(nonEmptyArray)); // false
```

---

### `mergeArrays`

The `mergeArrays` method is used to merge new values into an existing array at a specified path in a JSON object. It
ensures that there are no duplicate values in the array, making it useful for maintaining unique items when adding new
elements.

#### Syntax:

```javascript
mergeArrays(jsonObject, path, newValues)
```

- `jsonObject`: The JSON object in which the array exists.
- `path`: The path to the array in the JSON object, specified using dot notation.
- `newValues`:The new array of values to merge into the existing array.

#### Example:

```javascript
const JsonCraft = require('JsonCraft'); // Assuming JsonCraft is a library for handling JSON paths

const data = {
    user: {
        name: "John Doe",
        interests: ["coding", "gaming", "reading"]
    }
};

// New values to merge into the interests array
const newInterests = ["traveling", "gaming", "cooking"];

// Example usage with JsonCraft:
JsonCraft.mergeArrays(data, 'user.interests', newInterests);

console.log(data.user.interests);
// Output: ["coding", "gaming", "reading", "traveling", "cooking"]
```

---

### `pick`

The `pick` method is used to select specific keys from a JSON object, returning a new object that contains only the
picked keys and their corresponding values. This is useful when you want to extract a subset of the original object.

#### Syntax:

```javascript
pick(jsonObject, keys)
```

- `jsonObject`: The JSON object from which to pick the keys.
- `keys`:  An array of strings representing the keys to pick from the JSON object.

#### Example:

```javascript
const JsonCraft = require('JsonCraft'); // Assuming JsonCraft is a library for handling JSON paths

const data = {
    user: {
        name: "John Doe",
        age: 30,
        address: {
            city: "New York",
            postalCode: 10001
        },
        friends: [
            {name: "Jane", age: 28},
            {name: "Mark", age: 32}
        ]
    }
};

// Example usage with JsonCraft:
const pickedData = JsonCraft.pick(data, ['user.name', 'user.age']);

console.log(pickedData);
// Output: { user: { name: "John Doe", age: 30 } }
```

---

### `omit`

The `omit` method removes specific keys from a JSON object, returning a new object that excludes those keys. This is
useful when you want to exclude certain properties while working with an object, for example, to hide sensitive data or
create a simplified version of the object.

#### Syntax:

```javascript
omit(jsonObject, keys)
```

- `jsonObject`: The JSON object from which to omit the specified keys.
- `keys`: An array of strings representing the keys to be removed from the JSON object.

#### Example:

```javascript
const JsonCraft = require('JsonCraft'); // Assuming JsonCraft is a library for handling JSON paths

const data = {
    user: {
        name: "John Doe",
        age: 30,
        address: {
            city: "New York",
            postalCode: 10001
        },
        friends: [
            {name: "Jane", age: 28},
            {name: "Mark", age: 32}
        ]
    }
};

// Omitting the 'age' key from the user object
const userWithoutAge = JsonCraft.omit(data, ['user.age']);

console.log(userWithoutAge);
// Output: { user: { name: 'John Doe', address: { city: 'New York', postalCode: 10001 }, friends: [ ... ] } }
```

---

### `compact`

The `compact` method removes all null and undefined values from a JSON object, returning a new object with these values
excluded. This is useful when you want to clean up an object, removing unwanted values before further processing or
storing it.

#### Syntax:

```javascript
compact(jsonObject)
```

- `jsonObject`: The JSON object from which null and undefined values will be removed.

#### Example:

```javascript
const JsonCraft = require('JsonCraft'); // Assuming JsonCraft is a library for handling JSON paths

const data = {
    user: {
        name: "John Doe",
        age: null,
        address: {
            city: "New York",
            postalCode: undefined
        },
        friends: [
            {name: "Jane", age: 28},
            {name: "Mark", age: 32}
        ],
        email: undefined
    }
};

// Removing all null and undefined values
const cleanedData = JsonCraft.compact(data);

console.log(cleanedData);
// Output: { user: { name: 'John Doe', address: { city: 'New York' }, friends: [ ... ] } }
```

---

### `deepEqual`

The `deepEqual` method checks whether two objects are deeply equal. This means it compares the values of all properties,
including nested objects and arrays, to ensure they match exactly. This is useful for validating that two complex data
structures are identical in both content and structure.

#### Syntax:

```javascript
deepEqual(object1, object2)
```

- `object1`: The first object to compare.
- `object2`: The second object to compare.

#### Example:

```javascript
const JsonCraft = require('JsonCraft'); // Assuming JsonCraft is a library for handling JSON paths

const object1 = {
    user: {
        name: "John Doe",
        age: 30,
        address: {
            city: "New York",
            postalCode: 10001
        }
    }
};

const object2 = {
    user: {
        name: "John Doe",
        age: 30,
        address: {
            city: "New York",
            postalCode: 10001
        }
    }
};

const object3 = {
    user: {
        name: "Jane Doe",
        age: 25,
        address: {
            city: "Los Angeles",
            postalCode: 90001
        }
    }
};

// Deep comparison
console.log(JsonCraft.deepEqual(object1, object2)); // true (both objects are deeply equal)
console.log(JsonCraft.deepEqual(object1, object3)); // false (the objects differ in values)
```


### Contact Me

If you have any questions or need further assistance, feel free to reach out! I'm always happy to help and collaborate on cool projects. You can contact me through:

- **Email:** [behnammnasehi@gmail.com](mailto:behnammnasehi@gmail.com)
- **Twitter:** [@binarybeastt](https://x.com/binarybeastt)
- **GitHub:** [yourusername](https://github.com/binaryb3ast)

Let's build something awesome together! 🚀