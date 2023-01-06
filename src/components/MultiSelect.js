import Select from "react-select";

const options = [
  {
    label: "Manufacturing",
    value: "chocolate",
    options: [
      {
        label: "Construction materials",
        value: "19",
      },
      {
        label: "Electronics and Optics",
        value: "18",
      },
      
    ],
  },
  {
    label: "Food and Beverage",
    value: "chips",
    options: [
      {
        label: "Backery & Confectionery Products",
        value: "6",
      },
      {
        label: "Beverages",
        value: "6",
      },
      {
        label: "Fish & Fish Products",
        value: "6",
      },
      {
        label: "Meat & Meat Products",
        value: "6",
      },
      {
        label: "Milks & Dairy Products",
        value: "6",
      },
      {
        label: "Sweets & Snack Food",
        value: "6",
      },
      {
        label: "Other",
        value: "6",
      },
    ],
  },
];

const MultiSelect = () => {
  return <Select name="Multi Select" options={options} isMulti />;
};

export default MultiSelect;