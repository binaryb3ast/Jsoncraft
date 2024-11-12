type JsonObject = { [key: string]: any };

/**
 * A utility class for handling JSON objects with various operations.
 */
export class JsonKit {
    /**
     * Retrieves a value from a JSON object at a specified path.
     * @param {Object} obj - The JSON object to retrieve from.
     * @param {string|string[]} path - The path to the value (dot-separated or array).
     * @param {*} defaultValue - The value to return if the path doesn't exist.
     * @returns {*} - The value at the specified path or the default value.
     */
    static getValue(obj: JsonObject, path: string | string[], defaultValue: any = undefined): any {
        if (!obj) return defaultValue;

        const keys = Array.isArray(path) ? path : path.split(".");
        let current = obj;

        for (const key of keys) {
            if (current[key] === undefined) return defaultValue;
            current = current[key];
        }
        return current;
    }

    /**
     * Sets a value in a JSON object at a specified path.
     * @param {Object} obj - The JSON object to modify.
     * @param {string|string[]} path - The path to set the value at.
     * @param {*} value - The value to set.
     * @returns {boolean} - True if the value was set successfully.
     */
    static setValue(obj: JsonObject, path: string | string[], value: any): boolean {
        if (!obj) return false;

        const keys = Array.isArray(path) ? path : path.split(".");
        let current = obj;

        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (typeof current[key] !== "object" || current[key] === null) {
                current[key] = {};
            }
            current = current[key];
        }
        current[keys[keys.length - 1]] = value;
        return true;
    }

    /**
     * Checks if a specified path exists in a JSON object.
     * @param {Object} obj - The JSON object to check.
     * @param {string|string[]} path - The path to check.
     * @returns {boolean} - True if the path exists.
     */
    static hasPath(obj: JsonObject, path: string | string[]): boolean {
        return JsonKit.getValue(obj, path) !== undefined;
    }

    /**
     * Deletes a property in a JSON object at a specified path.
     * @param {Object} obj - The JSON object to modify.
     * @param {string|string[]} path - The path to the property to delete.
     * @returns {boolean} - True if the property was deleted.
     */
    static deletePath(obj: JsonObject, path: string | string[]): boolean {
        if (!obj) return false;

        const keys = Array.isArray(path) ? path : path.split(".");
        let current = obj;

        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (typeof current[key] !== "object" || current[key] === null) return false;
            current = current[key];
        }

        const lastKey = keys[keys.length - 1];
        if (current.hasOwnProperty(lastKey)) {
            delete current[lastKey];
            return true;
        }
        return false;
    }

    /**
     * Creates a deep copy of a JSON object.
     * @param {Object} obj - The JSON object to clone.
     * @returns {Object} - The deep clone of the object.
     */
    static deepClone(obj: JsonObject): JsonObject {
        return structuredClone ? structuredClone(obj) : JSON.parse(JSON.stringify(obj));
    }

    /**
     * Recursively merges two JSON objects.
     * @param {Object} target - The target JSON object.
     * @param {Object} source - The source JSON object to merge into target.
     * @returns {Object} - The merged JSON object.
     */
    static mergeObjects(target: JsonObject, source: JsonObject): JsonObject {
        if (typeof target !== "object" || target === null) return source;
        if (typeof source !== "object" || source === null) return target;

        for (const key in source) {
            if (source[key] instanceof Object && target[key]) {
                target[key] = JsonKit.mergeObjects(target[key], source[key]);
            } else {
                target[key] = source[key];
            }
        }
        return target;
    }

    /**
     * Maps each key in a JSON object to its data type.
     * @param {Object} obj - The JSON object to analyze.
     * @returns {Object} - An object mapping each key to its data type.
     */
    static mapKeyTypes(obj: JsonObject): JsonObject {
        const typeMap = {};

        function determineType(value: any): string {
            if (Array.isArray(value)) return "array";
            return typeof value;
        }

        function traverse(current: JsonObject, map: JsonObject): void {
            for (const key in current) {
                const value = current[key];
                const type = determineType(value);
                if (type === "object" && value !== null) {
                    map[key] = {};
                    traverse(value, map[key]);
                } else {
                    map[key] = type;
                }
            }
        }

        traverse(obj, typeMap);
        return typeMap;
    }

    /**
     * Updates the value at a specified path in a JSON object.
     * @param {Object} obj - The JSON object to modify.
     * @param {string} path - The path to the value.
     * @param {*} newValue - The new value to set.
     * @returns {boolean} - True if the value was updated.
     */
    static updateValue(obj: JsonObject, path: string, newValue: any): boolean {
        if (!obj || typeof path !== "string") return false;

        const keys = path.split(".");
        let current = obj;

        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!current[key] || typeof current[key] !== "object") return false;
            current = current[key];
        }

        const lastKey = keys[keys.length - 1];
        if (current.hasOwnProperty(lastKey)) {
            current[lastKey] = newValue;
            return true;
        }
        return false;
    }

    /**
     * Renames a specified key within a JSON object.
     * @param {Object} obj - The JSON object to modify.
     * @param {string} oldKey - The key to rename.
     * @param {string} newKey - The new key name.
     * @returns {boolean} - True if the key was renamed.
     */
    static renameKey(obj: JsonObject, oldKey: string, newKey: string): boolean {
        if (!obj || typeof oldKey !== "string" || typeof newKey !== "string") return false;

        function traverse(current: JsonObject): void {
            if (current instanceof Object && !Array.isArray(current)) {
                for (const key in current) {
                    if (key === oldKey) {
                        current[newKey] = current[key];
                        delete current[key];
                    }
                    if (typeof current[key] === "object") traverse(current[key]);
                }
            }
        }

        traverse(obj);
        return true;
    }

    /**
     * Flattens a nested JSON object into a single-level object.
     * @param {JsonObject} obj - The JSON object to flatten.
     * @param {string} parentKey - The current key to prepend (for recursion).
     * @param {JsonObject} result - The resulting flattened object.
     * @returns {JsonObject} - The flattened object.
     */
    static flatten(obj: JsonObject, parentKey: string = "", result: JsonObject = {}): JsonObject {
        for (const key in obj) {
            const newKey = parentKey ? `${parentKey}.${key}` : key;
            if (typeof obj[key] === "object" && obj[key] !== null) {
                JsonKit.flatten(obj[key], newKey, result);
            } else {
                result[newKey] = obj[key];
            }
        }
        return result;
    }

    /**
     * Unflattens a previously flattened JSON object.
     * @param {JsonObject} obj - The flattened JSON object.
     * @returns {JsonObject} - The unflattened object.
     */
    static unflatten(obj: JsonObject): JsonObject {
        const result: JsonObject = {};
        for (const key in obj) {
            const keys = key.split(".");
            keys.reduce((acc, part, idx) => {
                if (idx === keys.length - 1) {
                    acc[part] = obj[key];
                } else {
                    acc[part] = acc[part] || {};
                }
                return acc[part];
            }, result);
        }
        return result;
    }

    /**
     * Checks if an object (or array) is empty.
     * @param {any} obj - The object to check.
     * @returns {boolean} - Returns true if the object is empty, otherwise false.
     */
    static isEmpty(obj: any): boolean {
        if (Array.isArray(obj)) {
            return obj.length === 0;
        }
        if (typeof obj === "object" && obj !== null) {
            return Object.keys(obj).length === 0;
        }
        return !obj;
    }

    /**
     * Merges new values into an array at a specified path, ensuring no duplicates.
     * @param {JsonObject} obj - The JSON object.
     * @param {string|string[]} path - The path to the array.
     * @param {any[]} newArray - The new array of values to merge.
     * @returns {any[]} - The merged array.
     */
    static mergeArrays(obj: JsonObject, path: string | string[], newArray: any[]): any[] {
        const existingArray = JsonKit.getValue(obj, path, []);
        const merged = [...new Set([...existingArray, ...newArray])]; // Merges and removes duplicates
        JsonKit.setValue(obj, path, merged);
        return merged;
    }

    /**
     * Picks specific keys from a JSON object.
     * @param {JsonObject} obj - The JSON object.
     * @param {string[]} keys - The keys to pick.
     * @returns {JsonObject} - The new object containing only the picked keys.
     */
    static pick(obj: JsonObject, keys: string[]): JsonObject {
        if (typeof obj !== "object" || obj === null) return {};
        const result: JsonObject = {};
        keys.forEach((key) => {
            if (key in obj) result[key] = obj[key];
        });
        return result;
    }

    /**
     * Omits specific keys from a JSON object.
     * @param {JsonObject} obj - The JSON object.
     * @param {string[]} keys - The keys to omit.
     * @returns {JsonObject} - The new object with the omitted keys.
     */
    static omit(obj: JsonObject, keys: string[]): JsonObject {
        if (typeof obj !== "object" || obj === null) return obj;
        const result = { ...obj };
        keys.forEach((key) => {
            delete result[key];
        });
        return result;
    }

    /**
     * Removes all null and undefined values from an object.
     * @param {JsonObject} obj - The JSON object.
     * @returns {JsonObject} - The cleaned object.
     */
    static compact(obj: JsonObject): JsonObject {
        if (typeof obj !== "object" || obj === null) return {};
        const result: JsonObject = {};
        for (const key in obj) {
            if (obj[key] !== null && obj[key] !== undefined) {
                result[key] = obj[key];
            }
        }
        return result;
    }


    /**
     * Checks if two objects are deeply equal.
     * @param {any} obj1 - The first object to compare.
     * @param {any} obj2 - The second object to compare.
     * @returns {boolean} - True if the objects are deeply equal.
     */
    static deepEqual(obj1: any, obj2: any): boolean {
        if (obj1 === obj2) return true;
        if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null) return false;

        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length) return false;

        for (const key of keys1) {
            if (!keys2.includes(key)) return false;
            if (!JsonKit.deepEqual(obj1[key], obj2[key])) return false;
        }
        return true;
    }
}