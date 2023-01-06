import MultiSelect from "./components/MultiSelect";
import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function App() {
  const MySwal = withReactContent(Swal);
  const data = JSON.parse(localStorage.getItem("savedata")) || {};

  const [name, setName] = useState(data.name || "");
  const [selected, setSelected] = useState(data.selected || []);
  const [terms, setTerms] = useState(data.terms || false);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const options = e.target.options;

    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        // check if the option is already selected
        if (selected.some((item) => item.index === options[i].index)) {
          return;
        }
        options[i].style.backgroundColor = "#D0C1FC";
        if (selected.length > 0) {
          setSelected([
            ...selected,
            { value: options[i].value, index: i, name: options[i].label },
          ]);
        } else {
          // if there is no selected item
          setSelected([
            { value: options[i].value, index: i, name: options[i].label },
          ]);
        }
      }
    }
  };

  // save data to local storage
  const onSubmit = () => {
    if (name === "") {
      setError({ name: "Please fill the name*" });
      return;
    }
    if (selected.length === 0) {
      setError({ selected: "Please select at least one sector*" });
      return;
    }
    if (!terms) {
      setError({ terms: "Please accept the terms*" });
      return;
    }
    setError({});
    const data = {
      name,
      selected,
      terms,
    };
    localStorage.setItem("savedata", JSON.stringify(data));

    MySwal.fire("Good job!", "You filled the form!", "success");
  };

  return (
    <div className="App p-24 bg-slate-500 min-h-screen">
      <h1 className="text-2xl text-gray-50 mb-3">
        Please enter your name and pick the Sectors you are currently involved
        in.
      </h1>
      <hr className="w-3/4" />
      <div className="mt-4">
        <div className="space-y-1 text-sm">
          <label htmlFor="name" className="block dark:text-gray-50 text-lg">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="w-1/5 px-4 py-3 rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:dark:border-violet-400"
          />
          <br />
          {error?.name && (
            <span className="text-red-700 text-lg font-semibold">
              {error.name}
            </span>
          )}
        </div>
        <div className="space-y-1 text-sm mt-4">
          <label htmlFor="select" className="block dark:text-gray-50 text-lg">
            Sectors
          </label>
          <MultiSelect
            handleChange={handleChange}
            selected={selected}
            setSelected={setSelected}
            error={error}
          />
        </div>
        <div className="flex items-center mt-3">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            aria-label="Remember me"
            checked={terms}
            onChange={(e) => {
              setTerms(e.target.checked);
            }}
            className="mr-1 rounded-sm focus:ring-violet-400 focus:dark:border-violet-400 focus:ring-2 accent-violet-400"
          />
          <label htmlFor="remember" className="text-md dark:text-gray-50">
            Agree to terms
          </label>
        </div>
        {error?.terms && (
          <span className="text-red-700 text-lg font-semibold">
            {error.terms}
          </span>
        )}
        <br />
        <button
          type="button"
          onClick={onSubmit}
          className="px-8 mt-4 py-2 font-semibold rounded bg-violet-400 text-gray-50"
        >
          save
        </button>
      </div>
    </div>
  );
}

export default App;
