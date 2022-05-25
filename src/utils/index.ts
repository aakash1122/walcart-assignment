export type NullOrString = null | string;

export type Parent = {
  uid: string;
  name: string;
};
interface ICategory {
  createdAt: string;
  // __typename: string;
  inActiveNote: any;
  isActive: boolean;
  name: string;
  parent: {
    uid: string | null;
    name: string | null;
    // __typename: string;
  };
  parents: Array<{
    uid: string;
    name: string;
  }>;
  uid: string;
  updatedAt: string;
}
export interface INode extends ICategory {
  childrens: INode[];
}
export type INodes = INode[];

// const categories: ICategory[] = [
//   {
//     uid: "1",
//     name: "men",
//     parent: {
//       uid: "null",
//       name: null,
//     },
//     parents: [],
//   },
//   {
//     uid: "3",
//     name: "shirt",
//     parent: {
//       uid: "1",
//       name: "men",
//     },
//     parents: [
//       {
//         uid: "1",
//         name: "men",
//       },
//     ],
//   },
//   {
//     uid: "4",
//     name: "pant",
//     parent: {
//       uid: "1",
//       name: "men",
//     },
//     parents: [
//       {
//         uid: "1",
//         name: "men",
//       },
//     ],
//   },
//   {
//     uid: "5",
//     name: "HALF SHIRT",
//     parent: {
//       uid: "3",
//       name: "shirt",
//     },
//     parents: [
//       {
//         uid: "3",
//         name: "shirt",
//       },
//     ],
//   },
//   {
//     uid: "9",
//     name: "Food",
//     parent: {
//       uid: "null",
//       name: null,
//     },
//     parents: [],
//   },
//   {
//     uid: "19",
//     name: "Chips",
//     parent: {
//       uid: "9",
//       name: "Food",
//     },
//     parents: [
//       {
//         uid: "9",
//         name: "Food",
//       },
//     ],
//   },
//   {
//     uid: "190",
//     name: "Potato",
//     parent: {
//       uid: "19",
//       name: "Chips",
//     },
//     parents: [
//       {
//         uid: "19",
//         name: "Chips",
//       },
//     ],
//   },
//   {
//     uid: "199",
//     name: "lays",
//     parent: {
//       uid: "190",
//       name: "Potato",
//     },
//     parents: [
//       {
//         uid: "190",
//         name: "Potato",
//       },
//       {
//         uid: "19",
//         name: "Chips",
//       },
//     ],
//   },
// ];

export const constructTreeFromArray = (categories: ICategory[]) => {
  const nodes: {
    [index: string]: INode;
  } = {};

  /* 
    referrannce for array of childrens
  */
  const childrens: {
    [index: string]: INode[];
  } = {};

  /* 
    Tree data
  */
  const roots: INodes = [];

  if (!categories.length) return roots;

  categories.forEach((category) => {
    // * current category
    const curentCategory: INode = {
      ...category,
      childrens: [],
    };
    // * store myself by my id in nodes
    nodes[curentCategory.uid] = curentCategory;
    //* create array by my id for my children
    childrens[curentCategory.uid] = childrens[curentCategory.uid] || [];
    // * save my children array id under my childrens key
    curentCategory.childrens = childrens[curentCategory.uid];
    // // if i dont have parent then i will retun
    // if(curentCategory.parent === null)
    //* if i have parent
    if (curentCategory.parent.uid) {
      //* then i will go under parent id in childrens
      childrens[curentCategory.parent.uid] =
        childrens[curentCategory.parent.uid] || [];
      childrens[curentCategory.parent.uid].push(curentCategory);
    } else {
      roots.push(curentCategory);
    }
  });

  return roots;
};

// console.log(constructTreeFromArray(categories));
