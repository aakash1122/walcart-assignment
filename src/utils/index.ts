import { ICategory } from "../@types";

export type NullOrString = null | string;

export type Parent = {
  uid: string;
  name: string;
};

export interface INode extends ICategory {
  childrens: INode[];
}
export type INodes = INode[];

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
