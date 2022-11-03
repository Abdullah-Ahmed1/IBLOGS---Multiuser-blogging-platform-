import * as React from 'react';
import { DataGrid, GridRowModes,  GridToolbarContainer,GridActionsCellItem } from '@mui/x-data-grid';
import "./EditorialCalender.css"
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import {useEffect,useState} from 'react';
import axios from "axios";

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


// function EditToolbar(props) {
//   const { setRows, setRowModesModel } = props;

//   const handleClick = () => {
//     const id = randomId();
//     setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
//     setRowModesModel((oldModel) => ({
//       ...oldModel,
//       [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
//     }));
//   };

//   return (
//     <GridToolbarContainer>
//       <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
//         Add record
//       </Button>
//     </GridToolbarContainer>
//   );
// }

function computeMutation(newRow, oldRow) {
  if (newRow.name !== oldRow.name) {
    return `Name from '${oldRow.name}' to '${newRow.name}'`;
  }
  if (newRow.age !== oldRow.age) {
    return `Age from '${oldRow.age || ''}' to '${newRow.age || ''}'`;
  }
  return null;
}

export default function AskConfirmationBeforeSave({blogId}) {

  const [posts,setPosts] = useState(null)

  useEffect(()=>{

      var a = [1,2,3,4,5]

      function arr(a){
        var b = []
        for(var i = a.length-1;i>=0;i--){
          b.push(a[i])
        }
        return b
      }
      console.log("arrayys",arr(a))
    axios.get(`http://127.0.0.1:5000/bloggerDashboard/get-all-posts/${blogId}`)
    .then(res=>{
      console.log("posts--------------------",res.data);
      setPosts(res.data.posts)
      // setData(res.data)
      // setData1(res.data)
      // setPosts(res.data.posts)        
    })
  },[])


  useEffect(()=>{
    console.log("rows",posts)
    console.log("--------called")
  },[posts])

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
      {
        posts? (
          posts.length>0? (
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
                        rows={posts? posts:[]}
                        columns={columns}
                        getRowId={(row)=> row._id }N
                        // rowHeight={100}
                        // processRowUpdate={processRowUpdate}
                        // experimentalFeatures={{ newEditingApi: true }}
                      />

          ):(
            <div style={{display: "flex" , justifyContent:"center"}}>
            <h2 style={{margin:"auto"}}>No Posts to show</h2>
            </div>
          )
        ):(
          <h2>Loading</h2>
        )
      }
      
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
    type: 'singleSelect',
    width: 220,
    valueOptions:['true','false'],
    editable :true
  },
  {
    field: 'Categories',
    headerName: 'Categories',
    type: 'String',
    width: 220,
  },

  // {
  //   field: 'actions',
  //   type: 'actions',
  //   headerName: 'Actions',
  //   width: 100,
  //   cellClassName: 'actions',
  //   getActions: ({ id }) => {
  //     const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

  //     if (isInEditMode) {
  //       return [
  //         <GridActionsCellItem
  //           icon={<SaveIcon />}
  //           label="Save"
  //           onClick={handleSaveClick(id)}
  //         />,
  //         <GridActionsCellItem
  //           icon={<CancelIcon />}
  //           label="Cancel"
  //           className="textPrimary"
  //           onClick={handleCancelClick(id)}
  //           color="inherit"
  //         />,
  //       ];
  //     }

  //     return [
  //       <GridActionsCellItem
  //         icon={<EditIcon />}
  //         label="Edit"
  //         className="textPrimary"
  //         onClick={handleEditClick(id)}
  //         color="inherit"
  //       />,
  //       <GridActionsCellItem
  //         icon={<DeleteIcon />}
  //         label="Delete"
  //         onClick={handleDeleteClick(id)}
  //         color="inherit"
  //       />,
  //     ];
  //   },
  // },
];

// const rows = [
//   {
//     id: 1,
//     postTitle: "Coding with me",
//     postDescription: "This is a test description",
//     dateCreated: "12/34/2002",
//     status: "published",
//     postKeywords: "[science, technology,education]",
//     likes:"50",
//     allowComments:"false",
//     Categories:"" 
//   },
//   {
//     id: 1,
//     postTitle: "Coding with me",
//     postDescription: "This is a test description",
//     dateCreated: "12/34/2002",
//     status: "published",
//     postKeywords: "[science, technology,education]",
//     likes:"50",
//     allowComments:"false",
//     Categories:"" 
//   },
//   {
//     id: 1,
//     postTitle: "Coding with me",
//     postDescription: "This is a test description",
//     dateCreated: "12/34/2002",
//     status: "published",
//     postKeywords: "[science, technology,education]",
//     likes:"50",
//     allowComments:"false",
//     Categories:"" 
//   },
//   {
//     id: 1,
//     postTitle: "Coding with me",
//     postDescription: "This is a test description",
//     dateCreated: "12/34/2002",
//     status: "published",
//     postKeywords: "[science, technology,education]",
//     likes:"50",
//     allowComments:"false",
//     Categories:"" 
//   },
//   {
//     id: 1,
//     postTitle: "Coding with me",
//     postDescription: "This is a test description",
//     dateCreated: "12/34/2002",
//     status: "published",
//     postKeywords: "[science, technology,education]",
//     likes:"50",
//     allowComments:"false",
//     Categories:"" 
//   },
  
// ];




//-----------------------------------------------------------

// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/DeleteOutlined';
// import SaveIcon from '@mui/icons-material/Save';
// import CancelIcon from '@mui/icons-material/Close';
// import {
//   GridRowModes,
//   DataGrid,
//   GridToolbarContainer,
//   GridActionsCellItem,
// } from '@mui/x-data-grid';
// // import {
// //   randomCreatedDate,
// //   randomTraderName,
// //   randomUpdatedDate,
// //   randomId,
// // } from '@mui/x-data-grid-generator';

// // const initialRows = [
// //   {
// //     id: randomId(),
// //     name: randomTraderName(),
// //     age: 25,
// //     dateCreated: randomCreatedDate(),
// //     lastLogin: randomUpdatedDate(),
// //   },
// //   {
// //     id: randomId(),
// //     name: randomTraderName(),
// //     age: 36,
// //     dateCreated: randomCreatedDate(),
// //     lastLogin: randomUpdatedDate(),
// //   },
// //   {
// //     id: randomId(),
// //     name: randomTraderName(),
// //     age: 19,
// //     dateCreated: randomCreatedDate(),
// //     lastLogin: randomUpdatedDate(),
// //   },
// //   {
// //     id: randomId(),
// //     name: randomTraderName(),
// //     age: 28,
// //     dateCreated: randomCreatedDate(),
// //     lastLogin: randomUpdatedDate(),
// //   },
// //   {
// //     id: randomId(),
// //     name: randomTraderName(),
// //     age: 23,
// //     dateCreated: randomCreatedDate(),
// //     lastLogin: randomUpdatedDate(),
// //   },
// // ];

// function EditToolbar(props) {
//   const { setRows, setRowModesModel } = props;

//   // const handleClick = () => {
//   //   const id = randomId();
//   //   setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
//   //   setRowModesModel((oldModel) => ({
//   //     ...oldModel,
//   //     [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
//   //   }));
//   // };

//   return (
//     <GridToolbarContainer>
//       <Button color="primary" startIcon={<AddIcon />} >
//         Add record
//       </Button>
//     </GridToolbarContainer>
//   );
// }

// EditToolbar.propTypes = {
//   setRowModesModel: PropTypes.func.isRequired,
//   setRows: PropTypes.func.isRequired,
// };

// export default function FullFeaturedCrudGrid({blogId}) {

//   const [rows, setRows] = useState(null)

//   useEffect(()=>{

    
      
//     axios.get(`http://127.0.0.1:5000/bloggerDashboard/get-all-posts/${blogId}`)
//     .then(res=>{
//       console.log("posts--------------------",res.data);
//       setRows(res.data.posts)
//       // setData(res.data)
//       // setData1(res.data)
//       // setPosts(res.data.posts)        
//     })
//   },[])

//   //const [rows, setRows] = React.useState(initialRows);
//   const [rowModesModel, setRowModesModel] = React.useState({});

//   const handleRowEditStart = (params, event) => {
//     event.defaultMuiPrevented = true;
//   };

//   const handleRowEditStop = (params, event) => {
//     event.defaultMuiPrevented = true;
//   };

//   const handleEditClick = (id) => () => {
//     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
//   };

//   const handleSaveClick = (id) => () => {
//     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
//   };

//   const handleDeleteClick = (id) => () => {
//     setRows(rows.filter((row) => row.id !== id));
//   };

//   const handleCancelClick = (id) => () => {
//     setRowModesModel({
//       ...rowModesModel,
//       [id]: { mode: GridRowModes.View, ignoreModifications: true },
//     });

//     const editedRow = rows.find((row) => row.id === id);
//     if (editedRow.isNew) {
//       setRows(rows.filter((row) => row.id !== id));
//     }
//   };

//   const processRowUpdate = (newRow) => {
//     const updatedRow = { ...newRow, isNew: false };
//     setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
//     return updatedRow;
//   };

//   const columns = [
//     // { field: 'name', headerName: 'Name', width: 180, editable: true },
//     // { field: 'age', headerName: 'Age', type: 'number', editable: true },
//     // {
//     //   field: 'dateCreated',
//     //   headerName: 'Date Created',
//     //   type: 'date',
//     //   width: 180,
//     //   editable: true,
//     // },
//     // {
//     //   field: 'lastLogin',
//     //   headerName: 'Last Login',
//     //   type: 'dateTime',
//     //   width: 220,
//     //   editable: true,
//     // },
//     { field: 'postTitle', headerName: 'Post Title', width: 180, editable: true },
//       // { field: 'Post Status', headerName: 'Post Status',  editable: true },
//       {
//         field: 'postDescription',
//         headerName: 'Post Description',
//         width: 180,
//         editable: true 
//       },
//       {
//         field: 'dateCreated',
//         headerName: 'Date Created',
//         type: 'date',
//         width: 180,
//       },
//       {
//         field: 'status',
//         headerName: 'Status',
//         type: 'String',
//         width: 220,
//       },
//       {
//         field: 'postKeywords',
//         headerName: 'Post Keywords',
//         type: 'String',
//         width: 220,
//         editable: true 
//       },
//       {
//         field: 'likes',
//         headerName: 'Likes',
//         type: 'String',
//         width: 220,
//         editable: true 
//       },
//       {
//         field: 'allowComments',
//         headerName: 'Allow Comments',
//         type: 'String',
//         width: 220,
//         editable: true 
//       },
//       {
//         field: 'Categories',
//         headerName: 'Categories',
//         type: 'String',
//         width: 220,
        
//       }
//     ,
//     {
//       field: 'actions',
//       type: 'actions',
//       headerName: 'Actions',
//       width: 100,
//       cellClassName: 'actions',
//       getActions: ({ id }) => {
//         const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

//         if (isInEditMode) {
//           return [
//             <GridActionsCellItem
//               icon={<SaveIcon />}
//               label="Save"
//               onClick={handleSaveClick(id)}
//             />,
//             <GridActionsCellItem
//               icon={<CancelIcon />}
//               label="Cancel"
//               className="textPrimary"
//               onClick={handleCancelClick(id)}
//               color="inherit"
//             />,
//           ];
//         }

//         return [
//           <GridActionsCellItem
//             icon={<EditIcon />}
//             label="Edit"
//             className="textPrimary"
//             onClick={handleEditClick(id)}
//             color="inherit"
//           />,
//           <GridActionsCellItem
//             icon={<DeleteIcon />}
//             label="Delete"
//             onClick={handleDeleteClick(id)}
//             color="inherit"
//           />,
//         ];
//       },
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         height: 500,
//         width: '100%',
//         '& .actions': {
//           color: 'text.secondary',
//         },
//         '& .textPrimary': {
//           color: 'text.primary',
//         },
//       }}
//     >
//       {
//         rows? (
//           rows.length > 0 ?(
//             <DataGrid
//             rows={rows}
//             columns={columns}
//             getRowId={(row)=> row._id }
//             editMode="row"
//             rowModesModel={rowModesModel}
//             onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
//             onRowEditStart={handleRowEditStart}
//             onRowEditStop={handleRowEditStop}
//             processRowUpdate={processRowUpdate}
//             components={{
//               Toolbar: EditToolbar,
//             }}
//             componentsProps={{
//               toolbar: { setRows, setRowModesModel },
//             }}
//             experimentalFeatures={{ newEditingApi: true }}
//           />
//           ):(
//             <div style={{display: "flex" , justifyContent:"center"}}>
//                         <h2 style={{margin:"auto"}}>No Posts to show</h2>
//              </div>
//           )
//         ):(
//           <h2>Loading</h2>
//         )
//       }
     
//     </Box>
//   );
// }
