export type NullOrString = null | string;

export type Parent = {
  uid: string;
  name: string;
};
export interface ICategory {
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

export interface ICreateCategory {
  category: {
    name: string;
    parentCategoryUid?: string;
  };
}

export interface ICategoryResponse {
  getCategories: {
    result: {
      categories: ICategory[];
      count: number;
    };
  };
}

export interface ICategoryVers {
  pagination: {
    limit: number;
    skip: number;
  };
}
