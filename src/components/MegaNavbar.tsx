import React, { useState } from "react";
import { INode, INodes } from "../@types";
import ArrowDown from "./ArrowDown";

interface MegaCategoryProps {
  category: INode;
}

interface IWrapper {
  children: React.ReactNode;
}
const Wrapper = ({ children }: IWrapper) => {
  return <div className="shadow-md min-w-[250px] z-50">{children}</div>;
};

const Link = ({ children }: IWrapper) => {
  return (
    <div className="px-3 py-1 cursor-pointer text-gray-600 hover:bg-gray-200 hover:text-cyan-700">
      {children}
    </div>
  );
};

const MegaCategory = ({ category }: MegaCategoryProps) => {
  const [menuShown, setMenuShown] = useState(false);
  const toggleMenuShown = () => {
    setMenuShown(!menuShown);
  };

  return (
    <div className="bg-white">
      <div className="hover:bg-gray-200 hover:text-cyan-700">
        {category.childrens.length === 0 ? (
          <Link>
            <p>{category.name}</p>
          </Link>
        ) : (
          <Link>
            <div
              className="relative flex items-center gap-4 justify-between"
              onMouseEnter={toggleMenuShown}
              onMouseLeave={toggleMenuShown}
            >
              <p>{category.name}</p>
              <div className="transform rotate-90">
                <ArrowDown />
              </div>
              {menuShown && (
                <div className="absolute -right-0 top-0 transform translate-x-full">
                  <Wrapper>
                    {category.childrens.map((data) => (
                      <div className="" key={data.uid}>
                        <MegaCategory category={data} key={data.uid} />
                      </div>
                    ))}
                  </Wrapper>
                </div>
              )}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

type Props = {
  data: INodes;
  isLoading: boolean;
  error: any;
};

const MegaNavbar = ({ data, error, isLoading }: Props) => {
  if (isLoading) return <div className="text-2xl">Loading</div>;
  if (error) return <div>Error: ${error.message}</div>;

  return (
    <div className="w-max mx-auto">
      <h4>Unlimited levels of child categories</h4>
      <Wrapper>
        {data.map((category) => (
          <MegaCategory category={category} key={category.uid} />
        ))}
      </Wrapper>
    </div>
  );
};

export default MegaNavbar;
