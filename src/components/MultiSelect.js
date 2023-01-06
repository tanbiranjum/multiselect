import React, { useState, useRef, useEffect } from "react";
import Data from "../data/select.json";

const MultiSelect = ({ handleChange, selected, setSelected, error }) => {
  // delete the selected item from the selected state
  const deleteItem = (index) => {
    const options = ref.current.options;
    options[index].style.backgroundColor = "transparent";
    options[index].selected = false;
    options[index].style.color = "white";
    const newSelected = selected.filter((item) => item.index !== index);
    setSelected([...newSelected]);
  };

  const ref = useRef();

  // set the selected options to the selected state
  useEffect(() => {
    const options = ref.current.options;
    selected.forEach((item) => {
      options[item.index].style.backgroundColor = "#D0C1FC";
      options[item.index].selected = true;
    });
  }, []);
  return (
    <div className="mt-2">
      <select
        multiple
        size="5"
        onChange={handleChange}
        ref={ref}
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-72 p-2.5 bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {/* map through the data and display the options */}
        {Data.map((item, index) => (
          <>
            <option key={index} value={item.value} className="text-lg">
              {item.label}
            </option>
            {item.options.map((option, index) => (
              <>
                <option key={index} value={option.value} className="text-lg">
                  &nbsp;&nbsp;&nbsp;&nbsp;{option.label}
                </option>
                {option.options &&
                  option.options.map((option, index) => (
                    <option
                      key={index}
                      value={option.value}
                      className="text-lg"
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {option.label}
                    </option>
                  ))}
              </>
            ))}
          </>
        ))}
      </select>
      {error?.selected && (
        <span className="text-red-700 text-lg font-semibold">
          {error.selected}
        </span>
      )}
      <div className="flex mt-3 gap-x-2">
        {selected?.map((item, index) => (
          <div
            className="bg-violet-400 text-white p-2 flex gap-x-2 rounded-sm"
            key={index}
          >
            {item.name}
            <button
              className="text-gray-700 font-bold"
              onClick={() => {
                deleteItem(item.index);
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
