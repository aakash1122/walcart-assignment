import { useMutation } from "@apollo/client";
import React, { FormEventHandler, useState } from "react";
import { EDIT_CATEGORY } from "../utils/queries";

interface IUpdateCategory {
  categoryUid: string;
  category: {
    name: string;
  };
}

type Props = {};

const UpdateCategory = (props: Props) => {
  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  const [saveCategory, { error, data, loading }] = useMutation<
    any,
    IUpdateCategory
  >(EDIT_CATEGORY, {
    variables: {
      categoryUid: uid,
      category: {
        name: name,
      },
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    saveCategory();
  };

  return (
    <div className="w-max py-4">
      Update Category
      <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>
        <input
          type="text"
          required
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Updated Name"
          className="bg-gray-200 p-2 rounded-md text-lg"
        />
        <input
          type="text"
          required
          onChange={(e) => setUid(e.target.value)}
          placeholder="Enter Parent Id"
          className="bg-gray-200 p-2 rounded-md text-lg"
        />
        {loading ? (
          "Loading"
        ) : (
          <button className="px-4 py-1 bg-blue-700 text-white rounded-md">
            Update
          </button>
        )}
        {error && <p>Error: ${error.message}</p>}
        {data && <p className="text-lg text-green-700">Updated Category</p>}
      </form>
    </div>
  );
};

export default UpdateCategory;
