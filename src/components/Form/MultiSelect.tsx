
import Select from "react-select";
import React, { useRef, useState } from "react";
import { Control, Controller} from "react-hook-form";
import makeAnimated from "react-select/animated";
import { IFormInput } from "./CreateProduct/FormInput.types";


const animatedComponents = makeAnimated();
const customStyles = {
    option: (provided: any, state: any) => ({
        ...provided,
        borderBottom: "1px solid transparent",
        color: state.isSelected ? "#fff" : "black",
    }),
};

interface IOptionData {
    value: string;
    label: string;
}

type MultiSelectType = {
    multiLabel: string;
    dataArray: any[];
    valueData: any;
    placeholder: string;
    multiName:"sizes" | "colors" | "subCategory";
    required:string;
    errorFields:any;
    control:Control<IFormInput, any>;
    errors?:any;
    setValueRef:any;
};

const MultiSelect = ({
    dataArray,
    valueData,
    placeholder,
    multiLabel,
    multiName,
    required,
    errorFields,
    control,
    setValueRef,
}: MultiSelectType) => {
   
    return (
        <>
            <label
                htmlFor="subCategory"
                className="block mb-2 text-sm font-medium text-primary"
            >
                {multiLabel}
            </label>
            <Controller
                name={multiName}
                control={control}
                rules={{ required: `${required}`}}
                render={({ field: { onChange, value, ref, ...rest } }) => (
                    <Select
                    {...rest} 
                      className="react-select-container bg-white border border-green-300 text-sm rounded-md block  text-black font-semibold"
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      defaultValue=""
                      options={dataArray.map((sc, index) => {
                          const modifyObject = {
                            key: index,
                              label: sc.name,
                              value: sc._id,
                          };
                          return modifyObject;
                      })}
                      ref={(ref) => {
                        setValueRef(ref)
                      }}
                      value={valueData?.find((c:IOptionData) => c.value === value)}
                      onChange={onChange}
                      classNamePrefix="react-select"
                      placeholder={placeholder}
                      theme={(theme:any) => ({
                          ...theme,
                          borderRadius: 0,
                          colors: {
                              ...theme.colors,
                              primary25: "#d4d4d8",
                              primary: "#d4d4d8",
                          },
                      })}
                      styles={customStyles}
                      isClearable
                    
                    />
                  )}

              />
         
         {errorFields && (
                <p className="text-red-600">{errorFields?.message}</p>
            )}
           
        </>
    );
};

export default MultiSelect;
