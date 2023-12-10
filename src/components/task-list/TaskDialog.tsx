/* eslint-disable no-nested-ternary */
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  LinearProgress,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import * as Yup from 'yup';
import { MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'src/redux/store';
import useErrorHandle from 'src/auth/useErrorHandle';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { useMutation } from 'react-query';
import { createTask, updateTask } from 'src/services/tasklist';
import { LoadingButton } from '@mui/lab';
import { RHFSelect, RHFTextField } from '../hook-form';
import FormProvider from '../hook-form/FormProvider';

const TaskListSchema = Yup.object().shape({
  name: Yup.string().required('Task List name is required'),
  description: Yup.string().required('Description is required'),
  due_date: Yup.string().required('Due date is required'),
  status: Yup.string().required('Status is required'),
});

export type TaskListForm = {
  name: string;
  description: string;
  due_date: Date | null;
  status: string;
  id?: number;
  task_list_id?: number;
};

export default function TaskDialog({
  data,
  isSubtask,
  onClose,
  onSubmitSuccess,
  open,
}: {
  data: TaskListForm;
  isSubtask: boolean;
  onClose: MouseEventHandler;
  onSubmitSuccess: () => void;
  open: boolean;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();

  const defaultValues = useMemo<TaskListForm>(
    () => ({
      id: data?.id || 0,
      name: data?.name || '',
      description: data?.description || '',
      due_date: data?.due_date ? moment(data?.due_date).toDate() : null,
      status: data?.status || '',
      task_list_id: data?.task_list_id || 0,
    }),
    [data]
  );

  const methods = useForm<TaskListForm>({
    resolver: yupResolver(TaskListSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  // useEffect(() => {
  //   reset(defaultValues);
  // }, [defaultValues, reset]);

  const mutationCreate = useMutation(
    async (dataCreate: TaskListForm) => createTask(isSubtask, dataCreate),
    {
      onSuccess: (resCreate) => {
        enqueueSnackbar(`Create ${isSubtask ? 'Subtask' : 'Task'} List success`, {
          variant: 'success',
        });
        reset(defaultValues);
        onSubmitSuccess?.();
      },
      onError: (error) => {
        console.log('error', error);
        enqueueSnackbar(`Create ${isSubtask ? 'Subtask' : 'Task'} List failed`, {
          variant: 'error',
        });
        reset(defaultValues);
        onSubmitSuccess?.();
      },
    }
  );

  const mutationUpdate = useMutation(
    async (dataUpdate: TaskListForm) => updateTask(isSubtask, dataUpdate),
    {
      onSuccess: (resUpdate) => {
        enqueueSnackbar(`Update ${isSubtask ? 'Subtask' : 'Task'} List success`, {
          variant: 'success',
        });
        reset(defaultValues);
        onSubmitSuccess?.();
      },
      onError: (error) => {
        console.log('error', error);
        enqueueSnackbar(`Update ${isSubtask ? 'Subtask' : 'Task'} List failed`, {
          variant: 'error',
        });
        reset(defaultValues);
        onSubmitSuccess?.();
      },
    }
  );

  const onSubmit = async (datas: TaskListForm) => {
    if (!datas) return;
    if (data?.id === 0) {
      mutationCreate.mutate(datas);
    } else {
      mutationUpdate.mutate(datas);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {data?.id !== 0 ? 'Edit' : 'Create'} {isSubtask ? 'Subtask' : 'Task'} List
      </DialogTitle>

      <DialogContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                  }}
                >
                  <RHFTextField
                    name="name"
                    label="Name"
                    onChange={(e) => {
                      setValue('name', e.target.value);
                    }}
                    value={values.name}
                    required
                  />
                  <RHFTextField
                    name="description"
                    label="Description"
                    onChange={(e) => {
                      setValue('description', e.target.value);
                    }}
                    value={values.description}
                    required
                  />
                  <Controller
                    name="due_date"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <DatePicker
                        {...field}
                        label="Due Date"
                        inputFormat="dd/MM/yyyy"
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            {...params}
                            error={!!error}
                            helperText={error?.message}
                          />
                        )}
                      />
                    )}
                  />
                  {/* eslint-disable react/jsx-curly-brace-presence */}
                  <RHFSelect required name="status" label={'Status'} value={watch('status')}>
                    <MenuItem value={'ongoing'}>On Going</MenuItem>
                    <MenuItem value={'done'}>Done</MenuItem>
                  </RHFSelect>
                  {/* eslint-enable react/jsx-curly-brace-presence */}
                </Box>
                <DialogActions>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    sx={{ mr: 2 }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </LoadingButton>
                  <Button
                    variant="outlined"
                    onClick={(e) => {
                      reset(defaultValues);
                      onClose?.(e);
                    }}
                    // disabled={orderLensState.formStatus === FetchState.LOADING}
                  >
                    Close
                  </Button>
                </DialogActions>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
