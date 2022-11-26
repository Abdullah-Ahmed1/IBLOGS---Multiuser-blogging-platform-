import * as React from 'react';
import { DataGrid,useGridApiContext } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import JoditEditor from "jodit-react";
import Typography from "@mui/material/Typography";
//import Dialog from '@mui/material/Dialog';
//import DialogContent from '@mui/material/DialogContent';
import parse from 'html-react-parser';
import Box from "@mui/material/Box";
import Alert from '@mui/material/Alert';
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";

import Popper from "@mui/material/Popper";
import { useEffect,useState,useRef } from 'react';
import axios from "axios";
import TextField from '@mui/material/TextField';
import PublishStatusMenu from '../components/EditorialCalenderComps/PublishStatusMenu';
import PublishDateDialog from '../components/EditorialCalenderComps/PublishDateDialog';
var h2p = require("html2plaintext");

//--------------------------------------------------------------------------------------


function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
  const { width,field,value } = props;
  const wrapper = React.useRef(null);
  const cellDiv = React.useRef(null);
  const cellValue = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showFullCell, setShowFullCell] = React.useState(false);
  const [showPopper, setShowPopper] = React.useState(false);

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  React.useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
        setShowFullCell(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
    
    <Box
      ref={wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        alignItems: "center",
        lineHeight: "24px",
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex"
      }}
    >
      <Box
        ref={cellDiv}
        sx={{
          height: "100%",
          width,
          display: "block",
          position: "absolute",
          top: 0
        }}
      />
      <Box
        ref={cellValue}
        sx={{
          whiteSpace: "nowrap",
          // backgroundColor: "green",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}
      >
        {
          field ==="postContent"? (
            h2p(value)
          ):(
            value
          )
        }
      
      </Box>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          sx={ field ==="postContent"? { minWidth: "800px",maxHeight:"320px" } :{ minWidth: "500px",maxHeight:"320px" }}
          style={{ width, marginLeft: -17 }}
        >
          <Paper
            elevation={1}
            sx={ field ==="postContent"? { minWidth: "800px",maxHeight:"320px" } :{ minWidth: "500px",maxHeight:"320px"  }}
            style={ field ==="postContent"? null : { minHeight: wrapper.current.offsetHeight - 3 }}
          >
            {
          field ==="postContent"? (
            <div style={{padding:"10px" , display:"flex",flexDirection:"column",maxHeight:"320px" ,overflow:"auto"}}>
            {  parse(value)}
            </div>
            
          ):(
            <Typography variant="body2" style={{ padding: 8 }}>
            {value}
          </Typography>
          )
        }
           
            
          </Paper>
        </Popper>
      )}
    </Box>
  );
});

GridCellExpand.propTypes = {
  value: PropTypes.string.isRequired,
  field : PropTypes.string.isRequired,
  width: PropTypes.number.isRequired
};

function renderCellExpand(params) {
  // console.log("params",params)
  return (
    <GridCellExpand
      value={params.value || ""}
      field = {params.field}
      width={params.colDef.computedWidth}
    />
  );
}

renderCellExpand.propTypes = {
  /**
   * The column of the row that the current cell belongs to.
   */
  colDef: PropTypes.object.isRequired,
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: PropTypes.string
};


//--------------------------------------------------------------------------------------


//------------------------------- Custom Description Edit Cell --------------------------------------------------

const renderRatingEditInputCell = (params) => {
  return <DescriptionEdit {...params} />;
};

  const DescriptionEdit = (props)=>{
    const { id, value, field } = props;
  const apiRef = useGridApiContext();


  
  const handleValueChange = (event) => {
    const newValue = event.target.value; // The new value entered by the user
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };

  return(  
      <TextField  multiline fullWidth rows={4} value={value} onChange={handleValueChange}  id="fullWidth" />
     )
  }
  


//--------------------------------------------------------------------------------------------------
//------------------------------------Custom Post Content Cell Edit ---------------------------------------------------------

  const renderContentEditInputCell = (params)=>{
    return <ContentEdit {...params}/>
  }

  const MyEditor = ({handleValueChange,value})=>{
    const editor = useRef(null);
    // const [value, setValue] = useState("");
    // console.log(value);
    const config = {
      readonly: false, // all options from https://xdsoft.net/jodit/doc/,
      height: "650",
      removeButtons: ["source"],
      uploader: {
        insertImageAsBase64URI: true,
      },
      showCharsCounter: false,
      showWordsCounter: false,
      spellCheck: true,
      enter: "BR",
      
    };
  
    return (
      <div style={{ height: "80vh" }}>
        <JoditEditor
          ref={editor}
          value={value}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => handleValueChange(newContent)} // preferred to use only this option to update the content for performance reasons
          // onChange={(newContent) => {
          //   // console.log(newContent.replace("/<[^>]+>/g", ""));
          //   console.log(h2p(newContent));
          // }}
        />
      </div>
    );
  }

  const ContentEdit = (props)=>{
    const { id, value, field } = props;
    const apiRef = useGridApiContext();
    const [open,setOpen] = useState(true)

    const  handleClose = ()=>{
      setOpen(false)
    }
    const handleValueChange = (value) => {
      console.log("value",value)
      const newValue = value; // The new value entered by the user
      apiRef.current.setEditCellValue({ id, field, value: newValue });
    };
    return(
      <Dialog   open = {open} onClose={handleClose}  sx = {{width:"100%",height:"100%",border:"2px solid black"}}>
        <DialogContent>
          <MyEditor  value={value} handleValueChange= {handleValueChange} />
        </DialogContent>
      </Dialog>
    )
  }
//-----------------------------------------------------------------------------------------
const useFakeMutation = () => {
  return React.useCallback(
    (user) =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          if (user.postTitle?.trim() === '') {
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
  if (newRow.postTitle !== oldRow.postTitle) {
    return {filed:"postTitle",msg:`Name from '${oldRow.postTitle}' to '${newRow.postTitle}'`};
  }
  if(newRow.postDescription !== oldRow.postDescription){
    return {field:"postDescription",msg:`Post Description`};
  }
  if(newRow.postContent !== oldRow.postContent){
    return {field:"postContent",msg:`Post Content`};
  }
  if (newRow.age !== oldRow.age) {
    return {field:"age",msg: `Age from '${oldRow.age || ''}' to '${newRow.age || ''}'`};
  }
  if (newRow.allowComments !== oldRow.allowComments) {
    return {field: "allowComments",msg: `Allow Comments from '${oldRow.allowComments || ''}' to '${newRow.allowComments || ''}'`};
  }
  if(newRow.publishStatus !== oldRow.publishStatus){
    return { field:"publishStatus" , msg: `Publish status from '${oldRow.publishStatus || ''}' to '${newRow.publishStatus || ''}'`};
  }

  return null;
}

export default function AskConfirmationBeforeSave({blogId}) {
  const mutateRow = useFakeMutation();
  const [posts, setPosts] = useState(null);
  const noButtonRef = React.useRef(null);
  const [promiseArguments, setPromiseArguments] = React.useState(null);
  const [tempArguments,setTempArguments] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(dayjs(new Date()));

  const[progress,setProgress] = useState(false);
  const[progress1,setProgress1] = useState(false)
  const handleChange = (newValue) => {
    setValue(newValue);
  };


  const handleClose = () => {
    setOpen(false);
  };
  const handleOk = ()=>{
    console.log("reached-----------")
    console.log("date value",dayjs(value).format())
    console.log("..",tempArguments)
    setPromiseArguments(
      {
       oldRow: tempArguments.oldRow,
       mutation:tempArguments.mutation,
       newRow:{...tempArguments.newRow,publishDate: dayjs(value).format() } ,
       reject: tempArguments.reject,
       resolve: tempArguments.resolve
      }
    )
    setProgress(true)
    setOpen(false)
  }
  useEffect(()=>{
    console.log("progress is changed")
    setProgress1(true)
  },[progress])

  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = React.useCallback(
    (newRow, oldRow) =>
    
      new Promise((resolve, reject) => {
        console.log("---/",newRow); 
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          if(mutation.field==="publishStatus"){
            console.log("reached------------------------------------>",newRow)
            if(newRow.publishStatus ==="scheduled"){
              // console.log("row dialog will be open here")
              setOpen(true)
              setTempArguments({ resolve, reject, newRow, oldRow,mutation})
              // console.log("progresss",progress1)

              // if(progress1){
              //   setPromiseArguments({ resolve, reject, newRow, oldRow,mutation });    
              // }
            }else{
              
            }
          }else{
            setPromiseArguments({ resolve, reject, newRow, oldRow,mutation });  
          }
          
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    [],
  );

  useEffect(()=>{

          
        axios.get(`http://127.0.0.1:5000/bloggerDashboard/get-all-posts/${blogId}`)
        .then(res=>{
          console.log("posts--------------------",res.data);
          setPosts(res.data.posts)
          // setData(res.data)
          // setData1(res.data)
          // setPosts(res.data.posts)        
        })
      },[])
  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    const { mutation,newRow, oldRow, reject, resolve } = promiseArguments;

    try {
      // Make the HTTP request to save in the backend
      if(mutation.field ==="publishStatus"){
        console.log(
          "here it is ------",newRow.publishStatus, newRow.publishDate, oldRow.publishDate
        )
      }else{

      
      axios.post(`http://127.0.0.1:5000/bloggerDashboard/update-post/${newRow._id}`,{newRow})
      .then(res=>{
        console.log("data")
                
      })
    }
      console.log("New row!!!!!",newRow)
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
          {`Pressing 'Yes' will change ${mutation.msg}.`}
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
    <div style={{ height: 400, width: '100%' }}>
      <PublishDateDialog open ={open} handleClose={handleClose} value = {value} handleChange={handleChange} handleOk={handleOk} />
      {renderConfirmDialog()}
      {
        posts? (
          posts.length>0? (
            <DataGrid
            rows={posts}
            columns={columns}
            getRowId={(row)=> row._id}
            processRowUpdate={processRowUpdate}
            // rowHeight={100}
            experimentalFeatures={{ newEditingApi: true }}
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

// const rows1 = [

// ]

const columns  = [
    { field: 'postTitle', headerName: 'Post Title', width: 180,renderCell: renderCellExpand,editable: true },
    // { field: 'Post Status', headerName: 'Post Status',  editable: true },
    {
      field: 'postDescription',
      headerName: 'Post Description',
      width: 280,
      renderCell: renderCellExpand,
      editable: true,
      renderEditCell: renderRatingEditInputCell
    },
    {
      field: 'postContent',
      headerName: 'Post Content',
      
      renderEditCell: renderContentEditInputCell,
      renderCell: renderCellExpand,
      editable: true,
      width: 280,
    },
    {
      field: 'dateCreated',
      headerName: 'Date Created',
      type: 'date',
      width: 180,
    },
    {
      field: 'publishStatus',
      headerName: 'Publish Status',
      editable: true,
      type: 'singleSelect',
      valueOptions:['published','Draft', 'scheduled'],
      width: 220,
    },
   
    {
      field: 'likes',
      headerName: 'Likes',
      type: 'String',
      width: 220,
      renderCell: (params)=>{
        return params.value.length
      }
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
  ]
  // const rows1 = [
  //   {
  //     id:  1,
  //     postTitle :"test1",
  //     postDescription: "tsdinsdfsdhfbsjh",
  //     dateCreated:"12/32/300",
  //     status: "published",
  //     postKeywords:"weerwfwcs",
  //     likes:"123",
  //     allowComments:"true",
  //     Categories:""
  
  //   }
  // ]