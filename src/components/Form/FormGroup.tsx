import React from "react";

type FormGroupType = {
    labelName: string;
    inputName: string;
    register: any;
    errorField?: any;
    inputType: string;
    placeholder?: string;
    required?: string;
    isReadOnly?: boolean;
    isDefaultValue?: boolean;
    defaultValue?: string;
    isRequirePattern?: boolean;
    requirePattern?: any;
};

const FormGroup = ({
    labelName,
    inputName,
    register,
    errorField,
    inputType,
    placeholder,
    required,
    isReadOnly = false,
    isDefaultValue = false,
    defaultValue,
    isRequirePattern = false,
    requirePattern,
}: FormGroupType) => {
    return (
        <div className="mb-3">
            <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-primary"
            >
                {labelName}
            </label>
            {isReadOnly ? (
                isDefaultValue ? (
                    <input
                        {...register(
                            inputName,
                            !isRequirePattern
                                ? {
                                      required: `${required}`,
                                  }
                                : requirePattern
                        )}
                        type={inputType}
                        readOnly
                        defaultValue={defaultValue}
                        placeholder={placeholder}
                        className="input input-bordered input-success w-full text-primary"
                    />
                ) : (
                    <input
                        {...register(
                            inputName,
                            !isRequirePattern
                                ? {
                                      required: `${required}`,
                                  }
                                : requirePattern
                        )}
                        type={inputType}
                        readOnly
                        placeholder={placeholder}
                        className="input input-bordered input-success w-full text-primary"
                    />
                )
            ) : (
                <input
                    {...register(
                        inputName,
                        !isRequirePattern
                            ? {
                                  required: `${required}`,
                              }
                            : requirePattern
                    )}
                    type={inputType}
                    placeholder={placeholder}
                    className="input input-bordered input-success w-full text-primary"
                />
            )}
            {errorField && (
                <p className="text-red-600">{errorField?.message}</p>
            )}
        </div>
    );
};

export default FormGroup;
