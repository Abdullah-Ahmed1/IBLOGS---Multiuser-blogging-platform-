import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./EditorialCalender.css"
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const useFakeMutation = () => {
  return React.useCallback(
    (user) =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          if (user.name?.trim() === '') {
            reject();
          } else {
            resolve(user);
          }
        }, 200),
      ),
    [],
  );
};

function computeMutation(newRow, oldRow) {
  if (newRow.name !== oldRow.name) {
    return `Name from '${oldRow.name}' to '${newRow.name}'`;
  }
  if (newRow.age !== oldRow.age) {
    return `Age from '${oldRow.age || ''}' to '${newRow.age || ''}'`;
  }
  return null;
}

export default function AskConfirmationBeforeSave() {
  const mutateRow = useFakeMutation();
  const noButtonRef = React.useRef(null);
  const [promiseArguments, setPromiseArguments] = React.useState(null);

  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = React.useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    [],
  );

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;

    try {
      // Make the HTTP request to save in the backend
      const response = await mutateRow(newRow);
      setSnackbar({ children: 'User successfully saved', severity: 'success' });
      resolve(response);
      setPromiseArguments(null);
    } catch (error) {
      setSnackbar({ children: "Name can't be empty", severity: 'error' });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const handleEntered = () => {
    // The `autoFocus` is not used because, if used, the same Enter that saves
    // the cell triggers "No". Instead, we manually focus the "No" button once
    // the dialog is fully open.
    // noButtonRef.current?.focus();
  };

  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent dividers>
          {`Pressing 'Yes' will change ${mutation}.`}
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            No
          </Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div className = "scrolling1" style={{backgroundColor:"white", height: 600, width: '100%' }}>
      {renderConfirmDialog()}
      <DataGrid
      className = "scrolling1"
      sx={{
        "&::-webkit-scrollbar": {
        width: 20,
          

        },
        "&::-webkit-scrollbar-track": {
        backgroundColor: "orange"
        },
        "&::-webkit-scrollbar-thumb": {
        backgroundColor: "red",
        borderRadius: 2
        }
      }}
        rows={rows}
        columns={columns}
        rowHeight={100}
        processRowUpdate={processRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
      />
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
}

const columns = [
  { field: 'postTitle', headerName: 'Post Title', width: 180, editable: true },
  // { field: 'Post Status', headerName: 'Post Status',  editable: true },
  {
    field: 'postDescription',
    headerName: 'Post Description',
    width: 180,
  },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    type: 'date',
    width: 180,
  },
  {
    field: 'status',
    headerName: 'Status',
    type: 'String',
    width: 220,
  },
  {
    field: 'postKeywords',
    headerName: 'Post Keywords',
    type: 'String',
    width: 220,
  },
  {
    field: 'likes',
    headerName: 'Likes',
    type: 'String',
    width: 220,
  },
  {
    field: 'allowComments',
    headerName: 'Allow Comments',
    type: 'String',
    width: 220,
  },
  {
    field: 'Categories',
    headerName: 'Categories',
    type: 'String',
    width: 220,
  },
];

const rows = [
  {
    id: 1,
    postTitle: "Coding with me",
    postDescription: "This is a test description",
    dateCreated: "12/34/2002",
    status: "published",
    postKeywords: "[science, technology,education]",
    likes:"50",
    allowComments:"false",
    Categories:"" 
  },
  {
    id: 1,
    postTitle: "Coding with me",
    postDescription: "This is a test description",
    dateCreated: "12/34/2002",
    status: "published",
    postKeywords: "[science, technology,education]",
    likes:"50",
    allowComments:"false",
    Categories:"" 
  },
  {
    id: 1,
    postTitle: "Coding with me",
    postDescription: "This is a test description",
    dateCreated: "12/34/2002",
    status: "published",
    postKeywords: "[science, technology,education]",
    likes:"50",
    allowComments:"false",
    Categories:"" 
  },
  {
    id: 1,
    postTitle: "Coding with me",
    postDescription: "This is a test description",
    dateCreated: "12/34/2002",
    status: "published",
    postKeywords: "[science, technology,education]",
    likes:"50",
    allowComments:"false",
    Categories:"" 
  },
  {
    id: 1,
    postTitle: "Coding with me",
    postDescription: "This is a test description",
    dateCreated: "12/34/2002",
    status: "published",
    postKeywords: "[science, technology,education]",
    likes:"50",
    allowComments:"false",
    Categories:"" 
  },
  
];
