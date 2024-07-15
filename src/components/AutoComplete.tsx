import {
  AutocompleteProps,
  AutocompleteRenderInputParams,
  Box,
  CircularProgress,
  Stack,
  styled,
  Typography,
  useAutocomplete,
} from '@mui/material';
import { ReactNode } from 'react';

export interface IAutoCompleteProps extends Omit<AutocompleteProps<any, boolean, boolean, boolean>, 'renderInput'> {
  renderInput?: (params: AutocompleteRenderInputParams) => ReactNode;
}

const Input = styled('input')(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1.25, 2),
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.text.secondary}`,
  color: theme.palette.text.primary,
}));

function AutoComplete(props: IAutoCompleteProps) {
  const { options, title, placeholder, loading, getOptionLabel, ...rest } = props;
  const { getRootProps, getInputLabelProps, getInputProps, getListboxProps, getOptionProps, groupedOptions } =
    useAutocomplete({
      id: 'use-autocomplete',
      options,
      getOptionLabel: getOptionLabel || ((option) => option.title),
      ...rest,
    });
    
  return (
    <Box>
      <Box {...getRootProps()}>
        {title && <Typography {...getInputLabelProps()}>{title}</Typography>}
        <Input {...getInputProps()} placeholder={placeholder} />
      </Box>
      <Stack component="ul" {...getListboxProps()} sx={{ listStyle: 'none' }}>
        {loading ? (
          <CircularProgress size={20} sx={{ mt: 1 }} />
        ) : (
          !!groupedOptions.length &&
          (groupedOptions as typeof options).map((option, index) => (
            <Typography
              key={option.id}
              variant="body2"
              component="li"
              color="info.main"
              sx={{ '&:hover': { bgcolor: '#eee' }, py: 1 }}
              {...getOptionProps({ option, index })}
            >
              {option.title}
              {/* {(getOptionProps({option, index}) as any).key} */}
            </Typography>
          ))
        )}
      </Stack>
    </Box>
  );
}
export default AutoComplete;
