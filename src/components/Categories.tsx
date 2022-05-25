import React from "react";
import { INodes } from "../utils";
import Category from "./Category";

type Props = {
  data: INodes;
  isLoading: boolean;
  error: any;
};

const Categories = ({ data, error, isLoading }: Props) => {
  if (isLoading) return <div className="text-2xl">Loading</div>;
  if (error) return <div>Error: ${error.message}</div>;

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Dropdown</h1>
      <div className="bg-gray-100 p-2 max-w-fit mt-2">
        {data.map((category) => (
          <Category category={category} key={category.uid} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
