import type { NextPage } from "next";
import Categories from "../src/components/Categories";
import AddCategory from "../src/components/AddCategory";
import UpdateCategory from "../src/components/UpdateCategory";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../src/utils/queries";
import { ICategoryResponse, ICategoryVers, INodes } from "../src/@types";
import { constructTreeFromArray } from "../src/utils";
import MegaNavbar from "../src/components/MegaNavbar";

const Home: NextPage = () => {
  const { loading, error, data } = useQuery<ICategoryResponse, ICategoryVers>(
    GET_CATEGORIES,
    {
      variables: {
        pagination: {
          limit: 100,
          skip: 0,
        },
      },
    }
  );
  const treeCategory: INodes = constructTreeFromArray(
    data?.getCategories.result.categories || []
  );

  return (
    <div className="py-6">
      <div className="flex item-center gap-6 justify-center">
        <AddCategory />
        <UpdateCategory />
      </div>
      <div className="grid grid-cols-2 gap-6 mt-6">
        <MegaNavbar data={treeCategory} isLoading={loading} error={error} />
        <Categories data={treeCategory} isLoading={loading} error={error} />
      </div>
    </div>
  );
};

export default Home;
