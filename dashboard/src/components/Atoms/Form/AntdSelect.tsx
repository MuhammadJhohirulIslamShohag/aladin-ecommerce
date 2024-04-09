import { ConfigProvider, Select, SelectProps } from "antd";
import { Controller, Control, FieldValues } from "react-hook-form";

interface OptionType<T> {
    label: string;
    value: T;
}

interface AntdSelectProps<T> {
    control: Control<FieldValues>;
    name: string;
    options: OptionType<T>[];
    placeholder: string;
}

function AntdSelect<T>({
    control,
    name,
    options,
    placeholder,
    ...rest
}: AntdSelectProps<T> & SelectProps<T>) {
    return (
        <ConfigProvider>
            <Controller
                name={name}
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                    <Select<T>
                        {...field}
                        allowClear
                        style={{ width: "100%" }}
                        placeholder={placeholder}
                        options={options}
                        {...rest}
                    />
                )}
            />
        </ConfigProvider>
    );
}

export default AntdSelect;

// import { ConfigProvider, Select } from "antd";
// import { Controller, Control } from "react-hook-form";
// import { SelectProps } from "antd";
// import React from "react";

// interface AntdSelectProps {
//     control: Control<any>;
//     name: string;
//     options: { label: string; value: string }[];
//     placeholder: string;
// }

// const AntdSelect: React.FC<AntdSelectProps & SelectProps<string>> = ({
//     control,
//     name,
//     options,
//     placeholder,
//     ...rest
// }) => {
//     return (
//         <ConfigProvider>
//             <Controller
//                 name={name}
//                 control={control}
//                 defaultValue={[]}
//                 render={({ field }) => (
//                     <Select<string>
//                         {...field}
//                         allowClear
//                         style={{ width: "100%" }}
//                         placeholder={placeholder}
//                         options={options}
//                         {...rest}
//                     />
//                 )}
//             />
//         </ConfigProvider>
//     );
// };

// export default AntdSelect;
