import { ICategory } from "../@types";
import { constructTreeFromArray } from "./index";

const args: ICategory[] = [
  {
    uid: "1",
    name: "men",
    parent: {
      uid: null,
      name: null,
    },
    parents: [],
  },
  {
    uid: "2",
    name: "women",
    parent: {
      uid: null,
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
    expect(constructTreeFromArray(args)).toHaveLength(2);
  });

  test("should return two category with first one having child", () => {
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
      ...args,
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
    const expectations: any = arg.slice(0, 2);
    expectations[0].childrens = child;

    expect(constructTreeFromArray(arg)).toHaveLength(2);
    expect(constructTreeFromArray(arg)[0].childrens).toHaveLength(1);
    expect(constructTreeFromArray(arg)[0].childrens[0].name).toBe("Jeans");
    expect(constructTreeFromArray(arg)[0].childrens[0].uid).toBe("100");
    expect(constructTreeFromArray(arg)[0]).toStrictEqual(expectations[0]);
  });
});
