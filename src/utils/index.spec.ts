import { constructTreeFromArray, ICategory, INodes } from "./index";

const argument: ICategory[] = [
  {
    uid: "1",
    name: "men",
    parent: {
      uid: "null",
      name: null,
    },
    parents: [],
  },
  {
    uid: "2",
    name: "women",
    parent: {
      uid: "null",
      name: null,
    },
    parents: [],
  },
];

describe("constructTreeFromArray()", () => {
  test("should return empty array if nothing is passed", () => {
    expect(constructTreeFromArray([])).toStrictEqual([]);
  });

  test("should return two nodes with no childs", () => {
    const expectation = [
      {
        uid: "1",
        name: "men",
        parent: {
          uid: "null",
          name: null,
        },
        parents: [],
        childrens: [],
      },
      {
        uid: "2",
        name: "women",
        parent: {
          uid: "null",
          name: null,
        },
        parents: [],
        childrens: [],
      },
    ];
    expect(constructTreeFromArray(argument)).toStrictEqual(expectation);
  });

  test("should return two category with same child", () => {
    const child = [
      {
        uid: "100",
        name: "Jeans",
        parent: {
          uid: "1",
          name: "men",
        },
        parents: [
          {
            uid: "1",
            name: "men",
          },
          {
            uid: "2",
            name: "women",
          },
        ],
        childrens: [],
      },
    ];
    const arg = [
      ...argument,
      {
        uid: "100",
        name: "Jeans",
        parent: {
          uid: "1",
          name: "men",
        },
        parents: [
          {
            uid: "1",
            name: "men",
          },
          {
            uid: "2",
            name: "women",
          },
        ],
      },
    ];
    const expectations: INodes = arg.slice(0, 2).map((obj) => ({
      ...obj,
      childrens: child,
    }));

    console.log(JSON.stringify(expectations, null, 4));
    console.log(JSON.stringify(constructTreeFromArray(arg), null, 4));

    expect(constructTreeFromArray(arg)).toHaveLength(2);
    expect(constructTreeFromArray(arg)[0].childrens).toHaveLength(1);
    expect(constructTreeFromArray(arg)[1].childrens).toHaveLength(1);
    expect(constructTreeFromArray(arg)[0]).toStrictEqual(expectations[0]);
    expect(constructTreeFromArray(arg)[1]).toStrictEqual(expectations[1]);
    expect(constructTreeFromArray(arg)).toStrictEqual(expectations);
  });
});
