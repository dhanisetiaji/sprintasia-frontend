import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Stack, IconButton, StackProps, TextField } from '@mui/material';
// components
import Iconify from '../iconify';

// ----------------------------------------------------------------------

interface IncrementerButtonProps extends StackProps {
  name?: string;
  quantity: number;
  disabledIncrease?: boolean;
  disabledDecrease?: boolean;
  onIncrease: VoidFunction;
  onDecrease: VoidFunction;
  onInputValue?: (value: string) => void;
}

function IncrementerButton(
  {
    quantity,
    onIncrease,
    onDecrease,
    disabledIncrease,
    disabledDecrease,
    onInputValue,
    sx,
    ...other
  }: IncrementerButtonProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const [width, setWidth] = useState(onInputValue ? 80 : 96);

  useEffect(() => {
    const val = quantity.toString();
    const newWidth = val.length > 1 && parseInt(val, 10) > 9 ? val.length * 8 : 0;
    if (width >= 150 && val.length > 1) return;
    setWidth(80 + newWidth);
  }, [quantity, width]);

  return (
    <Stack
      ref={ref}
      flexShrink={0}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        mb: 0.5,
        py: 0.5,
        px: 0.75,
        width,
        borderRadius: 1,
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
        ...sx,
      }}
      {...other}
    >
      <IconButton
        size="small"
        color="inherit"
        onClick={onDecrease}
        disabled={disabledDecrease}
        sx={{ color: 'text.secondary' }}
      >
        <Iconify icon="eva:minus-fill" width={16} />
      </IconButton>

      {onInputValue && (
        <TextField
          sx={{ border: 'none', outline: 'none' }}
          onChange={(e) => {
            const val = e.currentTarget.value;
            onInputValue(val);
          }}
          variant="standard"
          value={quantity}
        />
      )}

      {!onInputValue && quantity}

      <IconButton
        size="small"
        color="inherit"
        onClick={onIncrease}
        disabled={disabledIncrease}
        sx={{ color: 'text.secondary' }}
      >
        <Iconify icon="eva:plus-fill" width={16} />
      </IconButton>
    </Stack>
  );
}

export default forwardRef<HTMLDivElement, IncrementerButtonProps>(IncrementerButton);
