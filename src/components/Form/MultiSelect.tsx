import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();
const customStyles = {
    option: (provided: any, state: any) => ({
        ...provided,
        borderBottom: "1px solid transparent",
        color: state.isSelected ? "#fff" : "black",
    }),
};

type MultiSelectType = {
    multiLabel: string;
    dataArray: any[];
    onChangeHandler:any;
    valueData: any;
    placeholder: string;
};

const MultiSelect = ({
    dataArray,
    valueData,
    placeholder,
    multiLabel,
    onChangeHandler
}: MultiSelectType) => {
    console.log(valueData, "valueData")
    return (
        <>
            <label
                htmlFor="subCategory"
                className="block mb-2 text-sm font-medium text-primary"
            >
                {multiLabel}
            </label>
            <Select
                className="react-select-container bg-white border border-green-300 text-sm rounded-md block  text-black font-semibold"
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={dataArray.map((sc) => {
                    const modifyObject = {
                        label: sc.name,
                        value: sc._id,
                    };
                    return modifyObject;
                })}
                value={valueData}
                onChange={onChangeHandler}
                classNamePrefix="react-select"
                placeholder={placeholder}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        ...theme.colors,
                        primary25: "#d4d4d8",
                        primary: "#d4d4d8",
                    },
                })}
                styles={customStyles}
            />
        </>
    );
};

export default MultiSelect;
