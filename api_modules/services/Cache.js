/**
 * 
 */
class Cache {

    element = {
        name: '',
        value: '',
        expireTo: 0,
    };

    timeLimit = 5;

    start() {
        global.apiModule_cache = [];
    }

    get(name) {
        let cache = global.apiModule_cache;
        let response = this.element;

        for (let i = 0; i < cache.length; i++) {

            if (cache[i].name === name) {
                response = cache[i];
                break;
            }
        }
        return response;
    }

    getElement(name, value) {
        let element = this.element;

        element = {
            name: name,
            value: value,
            expireTo: this.timeLimit,
        };

        return element;
    }

    set(name, value) {

        let element = this.getElement(name, value);
        global.apiModule_cache.push(element);
    }

    setTimeLimit(value) {
        this.timeLimit = value;
    }

    remove() {
        let cache = global.apiModule_cache;
        let response = false;

        for (let i = 0; i < cache.length; i++) {

            if (cache[i].name === name) {

                cache = cache.splice([i], 1);
                global.apiModule_cache = cache;
                break;
            }
        }
        return response;
    }

    stop() {
        delete global.apiModule_cache;
    }
}

module.exports = new Cache;