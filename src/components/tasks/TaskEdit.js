import { useState } from 'react';
import {
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
} from '@material-ui/core';
import { LibraryAddCheck as LibraryAddCheckIcon, Edit as EditIcon } from '@material-ui/icons';
import DescriptionIcon from '@material-ui/icons/Description';
import { useMutation } from '@apollo/client';
import { DELETE_TASK_MUTATION, UPDATE_TASK_MUTATION } from '../../shared/graphql';

export default function EditTaskDialog({ items, refetch }) {
  const [taskInput, setTaskInput] = useState({
    id: items.id,
    title: items.title,
    text: items.text,
  });
  const [open, setOpen] = useState(false);
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION);
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async (id) => {
    handleClose();
    await deleteTask({ variables: { id } });
    refetch();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleClose();
    await updateTask({ variables: taskInput });
    refetch();
  };

  return (
    <div>
      <IconButton className="button-edit" edge="end" aria-label="update" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <DialogTitle>Edit Task</DialogTitle>
            <Button
              onClick={() => handleDelete(taskInput.id)}
              color="secondary"
              className="delete"
              variant="outlined"
              style={{ marginRight: '24px' }}
              tabIndex={-1}
            >
              Delete
            </Button>
          </div>

          <DialogContent>
            <TextField
              margin="dense"
              name="title"
              label="title"
              placeholder="Enter a task description"
              fullWidth
              variant="outlined"
              color="primary"
              value={taskInput.title}
              onChange={(e) => setTaskInput({ ...taskInput, title: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" disablePointerEvents>
                    <LibraryAddCheckIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="dense"
              name="descripton"
              label="Assignee"
              placeholder="description"
              fullWidth
              variant="outlined"
              color="primary"
              value={taskInput.text}
              onChange={(e) => setTaskInput({ ...taskInput, text: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" disablePointerEvents>
                    <DescriptionIcon />
                  </InputAdornment>
                ),
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" aria-label="update task" color="primary">
              Save changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
