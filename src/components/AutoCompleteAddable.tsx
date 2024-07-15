import { Box, createFilterOptions } from '@mui/material';
import { useState } from 'react';
import AutoComplete, { IAutoCompleteProps } from './AutoComplete';

const filter = createFilterOptions<{ title: string; id?: string; inputValue?: string }>();

function AutoCompleteAddable(props: IAutoCompleteProps) {
  const { onChange, ...rest } = props;
  const [value, setValue] = useState<{ title: string; id?: string; inputValue?: string } | null>(null);
  return (
      <AutoComplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setValue({
              title: newValue,
            });
            onChange && onChange(
              event, {title: newValue},
              
              'blur'
            );
          } else if (newValue && newValue.inputValue) {
            setValue({
              title: newValue.inputValue,
            });
            onChange && onChange(
              event,
              newValue,
              'blur'
            );
          } else {
            setValue(newValue);
            onChange && onChange(
              event,
              newValue,
              'blur'
            );
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option.title);
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              id: inputValue,
              title: `Add "${inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="auto-complete-addable"
        {...rest}
        freeSolo
      />
  );
}
export default AutoCompleteAddable;
