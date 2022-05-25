import React, { useState } from "react";
import ArrowUp from "./ArrowUp";
import ArrowDown from "./ArrowDown";
import { INode } from "../@types";

type Props = {
  category: INode;
};

const CategoryWithoutChilren = ({ category }: Props) => {
  return (
    <div className="px-2 py-1 text-base min-w-[180px] cursor-pointer hover:text-green-700">
      <p className="">{category.name}</p>
    </div>
  );
};

const Category = ({ category }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);

  if (category.childrens.length === 0) {
    return <CategoryWithoutChilren category={category} />;
  }

  return (
    <div className="relative w-full overflow-auto">
      <div
        className="px-2 py-1 text-base flex items-center justify-between gap-2 min-w-[180px] cursor-pointer hover:bg-white"
        onClick={toggleExpand}
      >
        <p>{category.name}</p>
        {expanded ? <ArrowDown /> : <ArrowUp />}
      </div>
      {expanded && (
        <div className="pl-6 w-full ">
          {category.childrens.map((data) => (
            <Category category={data} key={data.uid} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
