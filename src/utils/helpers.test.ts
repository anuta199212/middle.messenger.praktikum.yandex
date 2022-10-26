import { expect } from "chai";
import { merge, set } from "./helpers";

describe("set function", () => {
  const keypath = "test";
  const value = "some value";
  let obj: Record<string, unknown>;

  beforeEach(() => {
    obj = {};
  });

  it("should set a value by keypath to the object", () => {
    set(obj, keypath, value);

    expect(obj).to.haveOwnProperty(keypath, value);
  });

  it("should return original object", () => {
    const result = set(obj, keypath, value);

    obj["test2"] = "another value";

    expect(result).to.equal(obj);
  });

  it("should return original object if it's is not an object", () => {
    const notAnObject = "string";

    const result = set(notAnObject, keypath, value);

    expect(result).to.eq(notAnObject);
  });

  it("should throw an error if path is not a string", () => {
    const keypathNotAString = 10;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore because we want to check behaviour in runtime
    const f = () => set(obj, keypathNotAString, value);

    expect(f).to.throw(Error);
  });
});

describe("merge function", () => {
  it("should merge objects", () => {
    const obj1 = { a: { b: { a: 2 } }, d: 5 };
    const obj2 = { a: { b: { c: 1 } } };
    const result = merge(obj1, obj2);

    expect(result).to.eql({ a: { b: { a: 2, c: 1 } }, d: 5 });
  });

  it("should return an empty object", () => {
    const obj1 = {};
    const obj2 = {};
    const result = merge(obj1, obj2);

    expect(result).to.eql({});
  });
});
