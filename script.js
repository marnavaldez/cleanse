// Given this object...
const data = {
    a: 'foo',
    b: 'bar',
    c: null,
    d: undefined,
    e: 0,
    f: {
        a: 'fuz',
        b: null,
        c: {
            a: 'biz',
            b: 'buz',
            c: '123',
            d: [
                {
                    a: 'foo',
                    b: 'bar',
                    c: null,
                    d: undefined,
                    e: 0,
                    f: false,
                    g: 12,
                    h: '13',
                    i: {},
                    j: [],
                    k: [[]]
                },
                {
                    a: 'foo',
                    b: 'bar',
                    c: null,
                    d: undefined,
                    e: 0
                },
                {
                    a: 'foo',
                    b: 'bar',
                    c: null,
                    d: undefined,
                    e: 0,
                    f: '-7',
                    g: '3.14159265358979323'
                }
            ]
        }
    },
    g: 123,
    h: '456',
    i: false,
    j: {},
    k: [],
    l: [[]],
    m: '3.14159265358979323'
};

// Challenge, refactor this cleanse function so it accomplishes the following criteria
// - data is not mutated
// - all `null` and `undefined` values are omitted from the returned data tree
// - all stringified numbers are converted to numbers. Example, '123' becomes 123.

const cleanse = o => {
    const newObj = {};

    if (Array.isArray(o)) {
        const newList = []

        o.forEach(item => {
            newList.push(cleanse(item))
        })

        return newList;
    }

    Object.entries(o).forEach(([k, v]) => {
        if (v === null || v === undefined) {
            return;
        }

        if (Array.isArray(v)) {
            const newList = []
            v.forEach(item => {
                newList.push(cleanse(item));
            })
            newObj[k] = newList;
        } else if (typeof v == 'object') {
            newObj[k] = cleanse(v);
        } else if(isNaN(v) || typeof v === 'boolean') {
            newObj[k] = v
        } else {
            newObj[k] = +v
        }
    })

    return newObj;
};

document.getElementById('original').textContent = JSON.stringify(data, undefined, 2);

const cleanData = () => {
    const cleanData = cleanse(data);

    document.getElementById('code').textContent = JSON.stringify(cleanData, undefined, 2);
}


