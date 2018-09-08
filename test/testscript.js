const test = require("ava");
const chai = require("chai");
const rq = require("request-promise");

chai.should();

const optionsBasic = {
    method: "GET",
    json: true
};
const baseUri = "http://localhost:3000/ff14/v1/forecast/";

test("get : eureka-pagos", t => {
    const options = Object.assign({}, optionsBasic);
    options.uri = baseUri + "eureka-pagos";

    return rq(options)
        .then(response => {
            response.length.should.equal(8);
            t.pass();
        });
});

test("get : eureka-pagos/past", t => {
    const options = Object.assign({}, optionsBasic);
    options.uri = baseUri + "eureka-pagos/past";

    return rq(options)
        .then(response => {
            response.length.should.equal(4);
            t.pass();
        });
});

test("get : eureka-pagos/past?day=2", t => {
    const options = Object.assign({}, optionsBasic);
    options.uri = baseUri + "eureka-pagos/past?day=2";

    return rq(options)
        .then(response => {
            response.length.should.equal(7);
            t.pass();
        });
});

test("get : eureka-pagos/past?hour=2", t => {
    const options = Object.assign({}, optionsBasic);
    options.uri = baseUri + "eureka-pagos/past?hour=2";

    return rq(options)
        .then(response => {
            response.length.should.equal(3);
            t.pass();
        });
});

test("get : eureka-pagos/present", t => {
    const options = Object.assign({}, optionsBasic);
    options.uri = baseUri + "eureka-pagos/present";

    return rq(options)
        .then(response => {
            response.length.should.equal(1);
            t.pass();
        });
});

test("get : eureka-pagos/future", t => {
    const options = Object.assign({}, optionsBasic);
    options.uri = baseUri + "eureka-pagos/future";

    return rq(options)
        .then(response => {
            response.length.should.equal(4);
            t.pass();
        });
});

// test("get : eureka-pagos/future?day=2", t => {
//     const options = Object.assign({}, optionsBasic);
//     options.uri = baseUri + "eureka-pagos/future?day=2";
//
//     return rq(options)
//         .then(response => {
//             response.length.should.equal(7);
//             t.pass();
//         });
// });
//
// test("get : eureka-pagos/future?hour=2", t => {
//     const options = Object.assign({}, optionsBasic);
//     options.uri = baseUri + "eureka-pagos/future?hour=2";
//
//     return rq(options)
//         .then(response => {
//             response.length.should.equal(3);
//             t.pass();
//         });
// });

test("get : eureka-pagossss/future", t => {
    const options = Object.assign({}, optionsBasic);
    options.uri = baseUri + "eureka-pagossss/future";

    return rq(options)
        .catch(response => {
            response.statusCode.should.equal(400);
            t.pass();
        });
});

test("get : eureka-pagos/wfwfw", t => {
    const options = Object.assign({}, optionsBasic);
    options.uri = baseUri + "eureka-pagossss/wfwfw";

    return rq(options)
        .catch(response => {
            response.statusCode.should.equal(404);
            t.pass();
        });
});

test("put : eureka-pagossss/future", t => {
    const options = Object.assign({}, optionsBasic);
    options.uri = baseUri + "eureka-pagossss/future";
    options.method = "PUT";

    return rq(options)
        .catch(response => {
            response.statusCode.should.equal(405);
            t.pass();
        });
});

test("post : eureka-pagossss/future", t => {
    const options = Object.assign({}, optionsBasic);
    options.uri = baseUri + "eureka-pagossss/future";
    options.method = "POST";

    return rq(options)
        .catch(response => {
            response.statusCode.should.equal(405);
            t.pass();
        });
});

test("delete : eureka-pagossss/future", t => {
    const options = Object.assign({}, optionsBasic);
    options.uri = baseUri + "eureka-pagossss/future";
    options.method = "DELETE";

    return rq(options)
        .catch(response => {
            response.statusCode.should.equal(405);
            t.pass();
        });
});
