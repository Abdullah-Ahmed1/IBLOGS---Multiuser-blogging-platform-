import * as React from 'react';
import "./addpost.css"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import Divider from '@mui/material/Divider';
import CreateIcon from '@mui/icons-material/Create';
import PublishIcon from '@mui/icons-material/Publish';
import Paper from "@mui/material/Paper";
import TextField from '@mui/material/TextField';

import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import StepLabel from '@mui/material/StepLabel';
import MyEditor from '../Editorjs/Editor';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';


const steps = ['Post Details', 'Create post', 'Upload Options'];


  const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
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
      width: 8,
      height: 8,
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
          'linear-gradient( 95deg,rgb(0,0,0) 0%,rgb(0,0,0) 50%,rgb(0,0,0) 100%)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(0,0,0) 0%,rgb(0,0,0) 50%,rgb(0,0,0) 100%)',
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
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(0,0,0) 0%, rgb(0,0,0) 50%, rgb(0,0,0) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(0,0,0) 0%, rgb(0,0,0) 50%, rgb(0,0,0) 100%)',
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
  
   function ChipsArray() {
    const [chipData, setChipData] = React.useState([
      { key: 0, label: 'Angular' },
      { key: 1, label: 'jQuery' },
      { key: 2, label: 'Polymer' },
      { key: 3, label: 'React' },
      { key: 4, label: 'Vue.js' },
    ]);
  
    const handleDelete = (chipToDelete) => () => {
      setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };
  
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
        {chipData.map((data) => {
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




  const PostDetails = ()=>{
    return(
      <Box sx = {{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around"}}  >
        <h2>Post Details</h2>
           <CssTextField
           className='title-field'
          
          id="outlined-multiline-flexible"
          label="Title"
          sx = {{ width:"50%  ",marginBottom:"20px"}}
          multiline
          maxRows={4}
         // value={value}
          //onChange={handleChange}
          variant="outlined"
        />
         <CssTextField
           className='title-field'
          
          id="outlined-multiline-flexible"
          label="Description"
          sx = {{ width:"50%  ",marginBottom:"20px"}}
          multiline
          rows={4}
        maxRows={4}
         // value={value}
          //onChange={handleChange}
          variant="outlined"
        />
        <CssTextField
           className='title-field'
          
          id="outlined-multiline-flexible"
          label="Category Tags"
          sx = {{ width:"50%  ",marginBottom:"20px"}}
          multiline
          maxRows={4}
         // value={value}
          //onChange={handleChange}
          variant="outlined"
        />
        <ChipsArray/>
      </Box>
    )
  }

  ///-----------------------------------------
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
            <PostDetails/>
        );
  
      case 1:
        return <MyEditor />
      case 2:
        return (
            <h1>Upload Option</h1>
        );
        
      default:
        return "unknown step";
    }
  }

export default function AddPostStepper() {
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

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper alternativeLabel activeStep={activeStep}  connector={<ColorlibConnector />}  >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
         
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps} sx = {{color:"white"}} >
              <StepLabel  StepIconComponent={ColorlibStepIcon}   {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
   
      <Divider variant="middle" />

      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
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
              sx={{ mr: 1,backgroundColor:"black",color:"white" }}
            >
              Back
            </Button>
            <Box sx={{  backgroundColor:"black" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 , color:"white", backgroundColor:"black" }}>
                Skip
              </Button>
            )}

            <Button  sx = {{backgroundColor:"black"}} onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
            </div>
            {getStepContent(activeStep)}
            </Paper>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
