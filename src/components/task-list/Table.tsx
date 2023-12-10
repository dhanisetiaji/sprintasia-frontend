import {
  Box,
  CircularProgress,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Autocomplete,
  Badge,
  Button,
  Collapse,
  LinearProgress,
} from '@mui/material';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'src/redux/store';
import { useSnackbar } from 'notistack';
import { FetchState } from 'src/enums/FetchState';
import useErrorHandle from 'src/auth/useErrorHandle';
import { useQuery } from 'react-query';
import { fDate } from 'src/utils/formatTime';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { deleteTask, getTaskList, updateTask } from 'src/services/tasklist';
import TaskDialog, { TaskListForm } from './TaskDialog';
import { TablePaginationCustom, useTable } from '../table';
import ConfirmDialog from '../confirm-dialog';
import Iconify from '../iconify/Iconify';

export default function TaskTable({ status }: { status: 'ongoing' | 'done' | '' }) {
  const dispatch = useDispatch();
  const {
    dense,
    page,
    rowsPerPage: rowPerPage,
    setPage,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const { handleError } = useErrorHandle();
  const { enqueueSnackbar } = useSnackbar();
  const req = useRef<any>();
  const [search, setSearch] = useState<string>('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('');
  const [open, setOpen] = useState({
    isOpen: false,
    id: 0,
  });
  const [id, setTaskListId] = useState<number>(0);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openPopover, setOpenPopover] = useState(null);
  const [handleDelete, setHandleDelete] = useState<any>({
    id: 0,
    isSubTask: false,
  });
  const [openStatus, setOpenStatus] = useState({
    isOpen: false,
    id: 0,
    data: {
      id: 0,
      name: '',
      description: '',
      due_date: '',
      task_list_id: 0,
      status: '',
      created_at: '',
      updated_at: '',
    },
    isSubTask: false,
  });
  const [dialog, setDialog] = useState<{
    open: boolean;
    data: TaskListForm;
    isSubTask: boolean;
  }>({
    open: false,
    data: {
      id: 0,
      name: '',
      description: '',
      status: '',
      due_date: null,
    },
    isSubTask: false,
  });

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleCloseStatus = () => {
    setOpenStatus({
      isOpen: false,
      id: 0,
      data: {
        id: 0,
        name: '',
        description: '',
        due_date: '',
        task_list_id: 0,
        status: '',
        created_at: '',
        updated_at: '',
      },
      isSubTask: false,
    });
  };

  useEffect(() => {
    setPage(0);
  }, [search, setPage]);

  const {
    data: TaskList,
    isLoading,
    error,
    refetch,
  } = useQuery(
    [
      'getTaskList',
      {
        rowPerPage,
        page,
        order: sortOrder,
        key: sortColumn,
        search,
        status,
      },
    ],
    () =>
      getTaskList({
        limit: rowPerPage,
        page,
        search,
        status,
      })
  );

  const handleDeleteTask = async () => {
    await deleteTask(handleDelete.id, handleDelete.isSubTask)
      .then((res) => {
        enqueueSnackbar('Delete success', {
          variant: 'success',
        });
        refetch();
        setOpenConfirm(false);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Delete failed', {
          variant: 'error',
        });
        setOpenConfirm(false);
      });
  };

  const handleUpdateStatus = async () => {
    if (openStatus.id !== openStatus.data?.id) return;
    const payload = {
      id: openStatus.id,
      status: openStatus.data?.status === 'ongoing' ? 'done' : 'ongoing',
      name: openStatus.data?.name,
      description: openStatus.data?.description,
      due_date: `${openStatus.data?.due_date?.split('T')[0]}T23:59:59Z`,
      task_list_id: openStatus.data?.task_list_id,
    };
    await updateTask(openStatus.isSubTask, payload)
      .then((res) => {
        enqueueSnackbar('Update Status success', {
          variant: 'success',
        });
        refetch();
        handleCloseStatus();
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Update Status failed', {
          variant: 'error',
        });
        handleCloseStatus();
      });
  };

  return (
    <Box>
      {/* add button add */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {status !== 'done' && (
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              sx={{ mb: 3 }}
              onClick={() => {
                setDialog({
                  open: true,
                  data: {
                    id: 0,
                    name: '',
                    description: '',
                    due_date: null,
                    status: '',
                  },
                  isSubTask: false,
                });
              }}
            >
              Add Task
            </Button>
          )}
        </Stack>
      </Stack>
      <Stack>
        <TextField
          sx={{ marginTop: '1em', minWidth: '50%' }}
          fullWidth
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <IconButton
                  size="small"
                  color={open ? 'inherit' : 'default'}
                  onClick={() => {
                    setOpen({
                      isOpen: !open.isOpen,
                      id: 0,
                    });
                  }}
                >
                  <Iconify
                    icon={
                      open.isOpen === true && open.id === 0
                        ? 'eva:arrow-ios-upward-fill'
                        : 'eva:arrow-ios-downward-fill'
                    }
                  />
                </IconButton>
              </TableCell>
              <TableCell align="left" rowSpan={3}>
                Name
              </TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Due Date</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Progress</TableCell>
              <TableCell align="center">Updated At</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              TaskList?.data?.records?.map((task: any, i: number) => (
                <>
                  <TableRow key={i}>
                    <TableCell align="left">
                      <IconButton
                        size="small"
                        color={open ? 'inherit' : 'default'}
                        onClick={() => {
                          setOpen({
                            isOpen: !open.isOpen,
                            id: task.id,
                          });
                        }}
                      >
                        <Iconify
                          icon={
                            open.isOpen === true && open.id === task.id
                              ? 'eva:arrow-ios-upward-fill'
                              : 'eva:arrow-ios-downward-fill'
                          }
                        />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      {task.name}{' '}
                      {task.isDue && task.status !== 'done' && (
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          sx={{ ml: 1, cursor: 'default' }}
                        >
                          Overdue
                        </Button>
                      )}
                    </TableCell>
                    <TableCell align="center">{task.description}</TableCell>
                    <TableCell align="center">
                      {task?.due_date ? moment(task.due_date).format('DD MMM YYYY') : '-'}
                    </TableCell>
                    <TableCell align="center">
                      {task.status === 'ongoing' ? (
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          sx={{ ml: 1 }}
                          onClick={() => {
                            setOpenStatus({
                              isOpen: true,
                              id: task.id,
                              data: task,
                              isSubTask: false,
                            });
                          }}
                        >
                          On Going
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          sx={{ ml: 1 }}
                          onClick={() => {
                            setOpenStatus({
                              isOpen: true,
                              id: task.id,
                              data: task,
                              isSubTask: false,
                            });
                          }}
                        >
                          Done
                        </Button>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <LinearProgress variant="determinate" value={task.progress * 100} />
                    </TableCell>
                    <TableCell align="center">
                      {task?.updated_at ? fDate(new Date(task.updated_at)) : '-'}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="large"
                        color="primary"
                        onClick={() => {
                          setDialog({
                            open: true,
                            data: {
                              id: task.id,
                              name: task.name,
                              description: task.description,
                              due_date: task.due_date,
                              status: task.status,
                            },
                            isSubTask: false,
                          });
                        }}
                      >
                        <Iconify icon="eva:edit-2-fill" />
                      </IconButton>
                      <IconButton
                        size="large"
                        color="primary"
                        placeholder="Add Task"
                        onClick={() => {
                          setDialog({
                            open: true,
                            data: {
                              id: 0,
                              name: '',
                              description: '',
                              due_date: null,
                              status: '',
                              task_list_id: task.id,
                            },
                            isSubTask: true,
                          });
                          setTaskListId(task.id);
                        }}
                      >
                        <Iconify icon="eva:plus-fill" />
                      </IconButton>
                      <IconButton
                        size="large"
                        color="error"
                        onClick={() => {
                          handleOpenConfirm();
                          setHandleDelete({
                            id: task.id,
                            isSubTask: false,
                          });
                        }}
                      >
                        <Iconify icon="basil:trash-solid" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableCell sx={{ py: 0 }} colSpan={6}>
                    <Collapse in={open.isOpen && open.id === task.id} timeout="auto" unmountOnExit>
                      <Paper
                        variant="outlined"
                        sx={{
                          py: 2,
                          ml: 5,
                          borderRadius: 1.5,
                          ...(open && {
                            boxShadow: (theme) => theme.customShadows.z20,
                          }),
                        }}
                      >
                        <Table size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <TableCell align="left" rowSpan={3}>
                                Name
                              </TableCell>
                              <TableCell align="center">Description</TableCell>
                              <TableCell align="center">Due Date</TableCell>
                              <TableCell align="center">Status</TableCell>
                              <TableCell align="center">Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {task?.sub_task?.map((subTask: any, iSub: number) => (
                              <TableRow key={iSub}>
                                <TableCell>
                                  {subTask.name}
                                  {subTask.isDue && subTask.status !== 'done' && (
                                    <Button
                                      variant="contained"
                                      color="error"
                                      size="small"
                                      sx={{ ml: 1 }}
                                    >
                                      Overdue
                                    </Button>
                                  )}
                                </TableCell>
                                <TableCell align="center">{subTask.description}</TableCell>
                                <TableCell align="center">
                                  {subTask?.due_date
                                    ? moment(subTask.due_date).format('DD MMM YYYY')
                                    : '-'}
                                </TableCell>
                                <TableCell align="center">
                                  {subTask.status === 'ongoing' ? (
                                    <Button
                                      variant="contained"
                                      color="secondary"
                                      size="small"
                                      sx={{ ml: 1 }}
                                      onClick={() => {
                                        setOpenStatus({
                                          isOpen: true,
                                          id: subTask.id,
                                          data: subTask,
                                          isSubTask: true,
                                        });
                                      }}
                                    >
                                      On Going
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      size="small"
                                      sx={{ ml: 1 }}
                                      onClick={() => {
                                        setOpenStatus({
                                          isOpen: true,
                                          id: subTask.id,
                                          data: subTask,
                                          isSubTask: true,
                                        });
                                      }}
                                    >
                                      Done
                                    </Button>
                                  )}
                                </TableCell>
                                <TableCell align="center">
                                  <IconButton
                                    size="large"
                                    color="primary"
                                    onClick={() => {
                                      setDialog({
                                        open: true,
                                        data: {
                                          id: subTask.id,
                                          name: subTask.name,
                                          description: subTask.description,
                                          due_date: subTask.due_date,
                                          status: subTask.status,
                                          task_list_id: subTask.task_list_id,
                                        },
                                        isSubTask: true,
                                      });
                                    }}
                                  >
                                    <Iconify icon="eva:edit-2-fill" />
                                  </IconButton>
                                  <IconButton
                                    size="large"
                                    color="error"
                                    onClick={() => {
                                      handleOpenConfirm();
                                      setHandleDelete({
                                        id: subTask.id,
                                        isSubTask: true,
                                      });
                                    }}
                                  >
                                    <Iconify icon="basil:trash-solid" />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Paper>
                    </Collapse>
                  </TableCell>
                </>
              ))}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={100}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePaginationCustom
        count={TaskList?.data?.total_record || 0}
        page={page - 1 >= 0 ? page - 1 : 0}
        rowsPerPage={rowPerPage}
        onPageChange={(e, currPage) => {
          onChangePage(e, currPage + 1);
        }}
        onRowsPerPageChange={(e) => {
          onChangeRowsPerPage(e);
        }}
        onChangeDense={(e) => {
          onChangeDense(e);
        }}
        dense={dense}
      />
      {dialog.open && (
        <TaskDialog
          open={dialog.open}
          onClose={() => {
            setDialog({
              open: false,
              data: {
                id: 0,
                name: '',
                description: '',
                due_date: null,
                status: '',
              },
              isSubTask: false,
            });
          }}
          isSubtask={dialog.isSubTask}
          data={dialog.data}
          onSubmitSuccess={() => {
            setDialog({
              open: false,
              data: {
                id: 0,
                name: '',
                description: '',
                due_date: null,
                status: '',
              },
              isSubTask: false,
            });
            refetch();
          }}
        />
      )}
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={handleDeleteTask}>
            Delete
          </Button>
        }
      />
      <ConfirmDialog
        open={openStatus.isOpen}
        onClose={handleCloseStatus}
        title="Change Status"
        content="Are you sure want to change status?"
        action={
          <Button variant="contained" color="primary" onClick={handleUpdateStatus}>
            Update
          </Button>
        }
      />
    </Box>
  );
}
