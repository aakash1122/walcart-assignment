import { useMutation } from "@apollo/client";
import React, { FormEventHandler, useState } from "react";
import { ICreateCategory } from "../@types";
import { CREATE_CATEGORY } from "../utils/queries";

type Props = {};

const AddCategory = (props: Props) => {
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [saveCategory, { error, data, loading }] = useMutation<
    any,
    ICreateCategory
  >(CREATE_CATEGORY, {
    variables: {
      category: { parentCategoryUid: parentId, name: name },
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    saveCategory();
  };

  return (
    <div className="w-max py-4">
      Add Category
      <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>
        <input
          type="text"
          required
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category Name"
          className="bg-gray-200 p-2 rounded-md text-lg"
        />
        <input
          type="text"
          onChange={(e) => setParentId(e.target.value)}
          placeholder="Enter Parent Id"
          className="bg-gray-200 p-2 rounded-md text-lg"
        />
        {loading ? (
          "Loading"
        ) : (
          <button className="px-4 py-1 bg-blue-700 text-white rounded-md">
            Create
          </button>
        )}
        {error && <p>Error: ${error.message}</p>}
        {data && <p className="text-lg text-green-700">Saved</p>}
      </form>
    </div>
  );
};

export default AddCategory;
