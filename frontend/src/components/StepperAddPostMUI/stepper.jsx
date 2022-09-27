import * as React from 'react';
import "./addpost.css"
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import CloseIcon from '@mui/icons-material/Close';
//import CreateIcon from '@mui/icons-material/Create';
import Step from '@mui/material/Step';
import PropTypes from 'prop-types';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
//import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from "axios";
import { useParams } from 'react-router-dom';
import ImageUploader from 'react-image-upload'
import 'react-image-upload/dist/index.css'
//--------------------------------------
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

//------------------------------------
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import Divider from '@mui/material/Divider';
import CreateIcon from '@mui/icons-material/Create';
import PublishIcon from '@mui/icons-material/Publish';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import Stack from '@mui/material/Stack';
import Paper from "@mui/material/Paper";
import TextField from '@mui/material/TextField';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
//import Typography from '@mui/material/Typography';
import StepLabel from '@mui/material/StepLabel';
import MyEditor from '../Editorjs/Editor';
import Check from '@mui/icons-material/Check';
//import SettingsIcon from '@mui/icons-material/Settings';
//import GroupAddIcon from '@mui/icons-material/GroupAdd';
//import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import lottie from 'lottie-web'
import { useRef, useEffect } from 'react';
import { useState } from 'react';
import ConfirmBox from './ConfirmBox';


const steps = ['Post Details', 'Create post', 'Upload Options'];

  const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 10,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#784af4',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 2,
      height: 2,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  }));  
  function QontoStepIcon(props) {
    const { active, completed, className } = props;
  
    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }
  QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
  };
  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,#05386b 0%,#05386b 50%,#379682 100%)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,#05386b 0%,#379682 50%,#05386b 100%)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));
  const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 35,
    height: 35,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage:
        'linear-gradient( 136deg, #379682  0%, #05386b 50%, #379682 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundImage:
        'linear-gradient( 136deg, #379682  0%, #05386b 50%, #379682 100%)',
    }),
  }));
  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;
  
    const icons = {
      1: <InfoIcon fontSize='small' />,
      2: <CreateIcon fontSize='small'/>,
      3: <PublishIcon fontSize='small'/>,
    };
  
    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }
  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };
ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };

  //------------ Post Details  ------------------------------

  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'black',
    },

    '& .MuiInput-underline:after': {
      borderBottom:" black"
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderBottomColor: 'black',
      },
     
      '&.Mui-focused fieldset': {
        borderBottomColor: 'black',
      },
    },
  });
  
  const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));
  
   function ChipsArray({chip}) {
      console.log("----//----",chip)
  //  const [chipData, setChipData] = React.useState(chip);
   // setChipData([{key:chipData.length,label : chip},...chipData])
  // console.log("!!!",chipData)
    const handleDelete = (chipToDelete) => () => {
  //    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };
    //  useEffect(()=>{
    
    //  },chipData) 
    return (
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          listStyle: 'none',
          p: 0.5,
          m: 0,
        }}
        component="ul"
      >
        {chip.map((data) => {
          let icon;
  
          // if (data.label === 'React') {
          //   icon = <TagFacesIcon />;
          // }
  
          return (
            <ListItem key={data.key}>
              <Chip
                icon={icon}
                label={data.label}
                onDelete={ handleDelete(data)}
              />
            </ListItem>
          );
        })}
      </Paper>
    );
  }




  const PostDetails = ( { handlePostTitle,handlePostDescription,handlePostKeywords,handlePostCardImage})=>{
    const [temp,setTemp] = useState("");
    const [chip,setChip] = useState([]);
    const [postImage,setPostImage] = useState(null);
    const handleEnterPress = (e)=>{
      //e.preventDefault();
      if(e.key ==='Enter' || e.keyCode === 32){
        handlePostKeywords(temp)
        const item = {key:chip.length, label:temp}
        setChip([item,...chip])
        setTemp("")
      }
    }
    // console.log("postImage:  ",postImage ?postImage.file: null)

    function getImageFileObject(imageFile) {
      console.log({ onAdd: imageFile });
      handlePostCardImage(imageFile.file)
  //     const body = new FormData();
  //     body.append('file', imageFile.file);
  //     body.append('upload_preset',"my-uploads")

  //  axios(
  //   {
  //     method: "POST",
  //     url: "https://api.cloudinary.com/v1_1/dlgwvuu5d/image/upload",
  //     data: body,
  //   }
  // )
  // .then(res=> console.log(res))
  //    // setPostImage(imageFile)
    }




    function runAfterImageDelete(file) {
      console.log({ onDele: file });
      setPostImage(null)
    }

    return(
      <Box sx = {{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around",paddingBottom:"50px"}}  >
        <h2 style={{color:"#05386b"}}>Post Details</h2>
           <CssTextField
            className='title-field'
            onChange={(e)=>handlePostTitle(e.target.value)}
          id="outlined-multiline-flexible"
          label="Title"
          sx = {{ width:"50%  ",marginBottom:"20px"}}
          InputProps ={{maxLength:5}}
         // value={value}
          //onChange={handleChange}
          variant="outlined"
              />
         <CssTextField
           className='description-field'
           onChange={(e)=>handlePostDescription(e.target.value)}
          id="outlined-multiline-flexible"
          label="Description"
          sx = {{ width:"50%  ",marginBottom:"20px"}}
          multiline
          rows={4}
      //  maxRows={4}
         // value={value}
          //onChange={handleChange}
          variant="outlined"
        />
        <CssTextField
           className='keyword-field'
           value={temp}
           onKeyPress={handleEnterPress}
           onChange={(e)=>setTemp(e.target.value)}
          id="outlined-multiline-flexible"
          label="Category Tags"
          sx = {{ width:"50%  ",marginBottom:"20px"}}
         // value={value}
          //onChange={handleChange}
          variant="outlined"
        />
        <ChipsArray chip = {chip} />

        <div >
        <ImageUploader
          onFileAdded={(img) => getImageFileObject(img)} // function that runs to confirm that your image actually exists
          onFileRemoved={(img) => runAfterImageDelete(img)} // function runs on once you delete your image
        />
      </div>
              </Box>
    )
  }

  const UploadOptions = ({openBox,handleOpenBox,handleSave,publishDate,handlePublishDate,allowComments,handleAllowComments,handlePublish,handlePublishStatus,handleSchedule})=>{
    const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));
    const [schedule,setSchedule] = React.useState(true);
    const handleChange = (newValue) => {
  
      setValue(newValue);
    };
    // const [radio, setRadio] = React.useState(true);
    const handleSetSchedule = schedule => setSchedule(schedule)
    return(
      <div style={{display:"flex",flexDirection:"column" ,alignItems:"center"}} >
        <h1 style = {{color:"#05386b"}}>Upload Options</h1>
        <ConfirmBox openBox = {openBox} handleOpenBox={handleOpenBox}  handleSchedule={handleSchedule} handleSetSchedule= {handleSetSchedule} />
         <Stack direction="column" spacing={2}>
        {/* -------------------------------- */}
        <FormControl>
          <FormLabel  sx = {{color:"#05386b",fontWeight:"bolder"  ,'&.Mui-focused':{color:"#05386b"}}} id="demo-controlled-radio-buttons-group">Allow Comments?</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={allowComments}
            onChange={(newValue)=>handleAllowComments(newValue.target.value)}
          >
          <FormControlLabel sx = {{color:"#05386b",'&.Mui-focused':{color:"#379683"}}}  value={false} control={<Radio sx = {{color:"#05386b", '&.Mui-checked' :{ color:"#379683"}}}  />} label="No" />
          <FormControlLabel sx = {{color:"#05386b",'&.Mui-focused':{color:"#379683"}}}  value={true} control={<Radio  sx = {{color:"#05386b", '&.Mui-checked' :{ color:"#379683"}}}  />} label="Yes" />
          </RadioGroup>
        </FormControl>
        {/* -------------------------------- */}

      <Button  onClick={handlePublish}  sx = {{backgroundColor:"#379683", color:"#05386b",fontWeight:"bolder" ,width:"300px", height:"50px" }} variant="contained" startIcon={<PublishIcon  sx ={{color:"#05386b",fontSize:"30px"}}  />}>
        Publish
      </Button>

      <Button onClick={handleSave}  sx = {{backgroundColor:"#379683", color:"#05386b",fontWeight:"bolder" ,height:"50px" }} variant="contained" startIcon={<SaveAsIcon   sx ={{color:"#05386b",fontSize:"30px"}} />}>
        Save to draft
      </Button>
      <Button    onClick = {()=>{setSchedule(false)}}   sx = {{display: `${schedule ? "flex" : "none"}` ,backgroundColor:"#379683", color:"#05386b",fontWeight:"bolder" ,height:"50px" }} variant="contained" startIcon={<WatchLaterIcon sx ={{color:"#05386b",fontSize:"30px"}} />}>
        schedule post
      </Button>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
            sx = {{display: `${schedule ? "none" : "flex"}` }}
          //  label="Date&Time picker"
            value={publishDate}
            


            onClose={()=>handleOpenBox(true)}
            onChange={handlePublishDate}
            renderInput={(params) => <TextField {...params}  disabled sx = {{display: `${schedule ? "none" : "flex"}` ,color:"green",backgroundColor:"#379683"}}/>}
          />
           
      </LocalizationProvider>

    </Stack>
      </div>
    )
  }

  ////////////////////////////////////////////////////////////////////////////////
  ///-----------------------------------------
  const GetStepContent = ({activeStep,handleSave,handlePostCardImage,handlePostTitle,handlePostDescription,handlePostKeywords,handlePostContent,postContent,handleAllowComments,allowComments,handlePublishStatus,handlePublishDate,publishDate,handleSchedule,handlePublish,openBox,handleOpenBox}) => {
    console.log()
    switch (activeStep) {
      case 0:
        return (
            <PostDetails handlePostTitle = {handlePostTitle} 
                         handlePostDescription = {handlePostDescription} 
                         handlePostKeywords = {handlePostKeywords}
                         handlePostCardImage = {handlePostCardImage}
            />
        );
  
      case 1:
        return <MyEditor handlePostContent =  {handlePostContent} postContent = {postContent}/>
      case 2:
        return (
            <UploadOptions  allowComments = {allowComments} 
            handleAllowComments ={handleAllowComments}  
            handlePublishDate = {handlePublishDate} 
            publishDate = {publishDate}
            handlePublish ={handlePublish} 
            handleSchedule = {handleSchedule}
            handlePublishStatus = {handlePublishStatus}
           handleSave = {handleSave}
           openBox={openBox}
           handleOpenBox = {handleOpenBox}
            />
        );
        
      default:
        return "unknown step";
    }
  }

export default function AddPostStepper({handleClose}) {
  let { blogId } = useParams();
  //--------------------------------------------- add post states and functions
    const [postTitle, setPostTitle] = useState("");
    const [postDescription, setPostDescription] = useState("");
    const [postKeywords, setPostKeywords] = useState([]);
    const [postContent , setPostContent] = useState('');
    const [postCardImage,setPostCardImage] = useState(null);
    const [allowComments , setAllowComments] = useState(true);
    const [publishStatus,setPublishStatus] = useState("");
    const [publishDate,setPublishDate] = useState(dayjs('2014-08-18T21:11:54'));
    //----------------confirmation box open-----------------------------------
    const [openBox,SetOpenBox] = useState(false);
    const handleOpenBox = openBox => SetOpenBox(openBox)
    //---------------------------------------------------
    

    const handlePostTitle = postTitle=> setPostTitle(postTitle)
    const handlePostDescription = postDescription => setPostDescription(postDescription)
    const handlePostKeywords = postKeyword =>  {
      const item = {key :postKeywords.length , label :postKeyword}
      setPostKeywords([item,...postKeywords])
    }
    const handlePostContent = postContent =>  setPostContent(postContent)
    const handlePostCardImage = imageFile =>setPostCardImage(imageFile)
    const handleAllowComments = allowComments => setAllowComments(allowComments)
    const handlePublishStatus = publishStatus => setPublishStatus(publishStatus)
    const handlePublishDate = publishDate => setPublishDate(publishDate) 

     // console.log("post title : ",postTitle)
      //console.log("post description : ",postDescription)
     // console.log("post Content : ",postContent)
      //console.log("comments",allowComments)
     console.log("confirmation",openBox)

//------------------------Publish Post---------------------------------------------------

    const handlePublish=()=>{
      console.log("image : ", postCardImage )
      console.log("puvlish")
      const data = {
        postTitle,
        postDescription,
        postKeywords,
        postContent,
        allowComments,
        postCardImage: postCardImage ? postCardImage : ""  ,
        publishStatus : "published",
        publishDate: new Date()
      
      }
      if(postCardImage){
            const body = new FormData();
      body.append('file', postCardImage);
      body.append('upload_preset',"my-uploads")

   axios(
    {
      method: "POST",
      url: "https://api.cloudinary.com/v1_1/dlgwvuu5d/image/upload",
      data: body,
    }
  )
  .then(res=>{
    const data = {
      postTitle,
      postDescription,
      postKeywords,
      postContent,
      allowComments,
      postCardImage: res.data.secure_url ,
      publishStatus : "published",
      publishDate: new Date()
    
    }
    console.log("url: ",res.data.secure_url)
    axios.post(`http://127.0.0.1:5000/bloggerDashboard/addpost/${blogId}`,data)
         .then(res => console.log(res))
         .catch(err=>console.log(err))

  } )
    
      }else{
            console.log("invoked")
          const data = {
        postTitle,
        postDescription,
        postKeywords,
        postContent,
        allowComments,
        postCardImage: ""  ,
        publishStatus : "published",
        publishDate: new Date()
      }
        axios.post(`http://127.0.0.1:5000/bloggerDashboard/addpost/${blogId}`,data)
         .then(res => console.log(res))
         .catch(err=>console.log(err))
      }


        //  axios.post(`http://127.0.0.1:5000/bloggerDashboard/addpost/${blogId}`,data)
        //  .then(res => console.log(res))
        //  .catch(err=>console.log(err))

    }

//--------------------------Schedule Post------------------------------------------------
    const handleSchedule=()=>{
      console.log("schedule clicked")
      console.log("schedule date: ",dayjs(publishDate).format())
      //SetOpenBox(true)
      
      const data = {
        postTitle,
        postDescription,
        postKeywords,
        postContent,
        allowComments,
        publishStatus : "scheduled",
        publishDate: dayjs(publishDate).format()
      
      }
      if(postCardImage){
        const body = new FormData();
        body.append('file', postCardImage);
        body.append('upload_preset',"my-uploads")
  
     axios(
      {
        method: "POST",
        url: "https://api.cloudinary.com/v1_1/dlgwvuu5d/image/upload",
        data: body,
      }
    ).then(res =>{
      const data = {
        postTitle,
        postDescription,
        postKeywords,
        postContent,
        postCardImage: res.data.secure_url ,
        allowComments,
        publishStatus : "scheduled",
        publishDate: dayjs(publishDate).format()
      
      }
      axios.post(`http://127.0.0.1:5000/bloggerDashboard/addpost/${blogId}`,data)
      .then(res => console.log(res))
      .catch(err=>console.log(err))



    })
       

      }else{
        const data = {
          postTitle,
          postDescription,
          postKeywords,
          postContent,
          postCardImage: "",
          allowComments,
          publishStatus : "scheduled",
          publishDate: dayjs(publishDate).format()
        
        }
        axios.post(`http://127.0.0.1:5000/bloggerDashboard/addpost/${blogId}`,data)
        .then(res => console.log(res))
        .catch(err=>console.log(err))
  
      }



         axios.post(`http://127.0.0.1:5000/bloggerDashboard/addpost/${blogId}`,data)
         .then(res => console.log(res))
         .catch(err=>console.log(err))

    }

//-----------------------------------------------------------------------------------
    // const handlePublish1 = ()=>{
    //   console.log("-------publish reached")
      
    // }
    const handleSave = ()=>{
      console.log("-------")
    }

      //---------------------------------------------

  const container = useRef(null)
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  useEffect(()=>{
    lottie.loadAnimation({
      container : container.current,
      renderer: 'svg',
      loop:false,
      autoplay:true,
      animationData:require('../../lottie/completed.json')

    })
  })

  return (
    <Box sx={{ width: '100%' }}>
      <div  style={{display:"flex",flexDirection:"row",backgroundColor:"#379683"}}>
      <div style={{paddingTop:"25px"}}>
        <h3 style={{marginTop:"0px",paddingTop:"0px",marginLeft:"20px",color:"#05386b"}}><span><CreateIcon sx = {{paddingTop:"5px"}}/></span>Create Post</h3>
      </div>
      <Stepper  sx = {{width:"50%",margin:"auto",padding:"10px"}}  alternativeLabel activeStep={activeStep}  connector={<ColorlibConnector />}  >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
         
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps} sx = {{color:"white"}} >
              <StepLabel  StepIconComponent={ColorlibStepIcon}   {...labelProps} sx = {{color:"green"}}  >{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div style={{paddingTop:"25px"}}>
      <CloseIcon  onClick={()=>handleClose()} sx = {{ fontWeight:"50px",color:"#05386b",cursor:"pointer",marginRight:"20px"}}  />
      
        
      </div>
      </div>
     
      <Divider variant="middle" />

      {activeStep === steps.length ? (
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}> */}
            {/* completed */}
            <div className='container' ref={container} style={{margin:"auto",width:"500px"}}  ></div>
          {/* </Typography> */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
               
          <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 }}>
          <Paper elevation={3} sx = {{minHeight:"500px"}}  >
            <div  style={{display: 'flex', flexDirection: 'row',justifyContent:"flex-end" ,pt: 2}} >           
            <Button
              color="inherit"
            
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1,backgroundColor:"#379683" ,color:"#05386b",fontWeight:"bold", '&:hover' : {backgroundColor:"#05386b",color:"#379683"} }}
            >
              Back
            </Button>
            <Box sx={{mr: 1,backgroundColor:"#379683" ,color:"#05386b", '&:hover' : {backgroundColor:"#05386b",color:"#379683"}  }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 , color:"white", backgroundColor:"black" }}>
                Skip
              </Button>
            )}

            <Button  sx = {{mr: 1,backgroundColor:"#379683" ,fontWeight:"bold",color:"#05386b", '&:hover' : {backgroundColor:"#05386b",color:"#379683"} }} onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
            </div>
            <GetStepContent activeStep={activeStep}
             handlePostTitle = {handlePostTitle} 
             handlePostDescription={handlePostDescription} 
             handlePostKeywords={handlePostKeywords }
              handlePostContent = {handlePostContent} 
              handlePostCardImage = {handlePostCardImage}
              postContent = {postContent}
               handleAllowComments = {handleAllowComments}
                allowComments = {allowComments} 
                handlePublishDate = {handlePublishDate} 
                publishDate ={publishDate} 
                handleSave ={handleSave}
                handlePublishStatus = {handlePublishStatus}
                handleSchedule={handleSchedule}
                 handlePublish = {handlePublish}
                 openBox={openBox}
                 handleOpenBox = {handleOpenBox}
                 />
            </Paper>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
