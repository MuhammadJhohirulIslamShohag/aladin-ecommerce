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
