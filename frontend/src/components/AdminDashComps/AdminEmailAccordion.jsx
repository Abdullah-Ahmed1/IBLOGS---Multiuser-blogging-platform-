import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import dayjs from 'dayjs';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomEmail from './CustomEmail';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState,useEffect } from 'react';
import AddAccordionDialog from './AddAccordionDialog';
import axios from 'axios'
export default function EmailAccordion() {

    const [emailTitle,setEmailTitle] = useState();
    const [emailSubject,setEmailSubject] = useState();
    const [emailDate,setEmailDate] = useState(dayjs(new Date()));
    const [emailContent,setEmailContent] = useState()

    const handleEmailTitleChange = (item)=>{
        setEmailTitle(item.target.value)
    }
    const handleEmailSubjectChange = (item)=>{
        setEmailSubject(item.target.value)
    }
    const handleEmailDateChange = (item)=>{
        setEmailDate(item)
    }
    const handleEmailContentChange = (item)=>{
        setEmailContent(item.target.value)
    }

   
    const [accordion,setAccordion] = useState([])


    const handleSubmit = ()=>{
        
        let value = JSON.parse(localStorage.getItem("adminToken"));
        let token = value.adminToken;
        const data ={
            title: emailTitle,
            content:emailContent,
            emailDate: dayjs(emailDate).format()
        }
        axios.post(`http://127.0.0.1:5000/admin/add-auto-email`,data,{
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: token,
              },
        }).then(res=>{
            AddAccordionDialogHandleClose()
            axios.get(`http://127.0.0.1:5000/admin/get-auto-emails`,{
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: token,
              },
            }).then(res=>{
              setAccordion(res.data)
            })
        })
        // AddAccordionDialogHandleClose()
    }
    
 //-------------------------------------------------------------   
    const [AddAccordionDialogOpen, setAddAccordionDialogOpenOpen] = useState(false);
    const AddAccordionDialogHandleClose = () => {
        setAddAccordionDialogOpenOpen(false);
      };
//------------------------------------------------------------      
    const handleDelete = (id)=>{
        console.log(id)
        let value = JSON.parse(localStorage.getItem("adminToken"));
        let token = value.adminToken;
        axios.delete(`http://127.0.0.1:5000/admin/delete-auto-email/${id}`,{
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }).then(res=>{
          console.log("")
          axios.get(`http://127.0.0.1:5000/admin/get-auto-emails`,{
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: token,
            },
          }).then(res=>{
            setAccordion(res.data)
          })
        })
    }
    useEffect(()=>{
      let value = JSON.parse(localStorage.getItem("adminToken"));
      let token = value.adminToken;
      axios.get(`http://127.0.0.1:5000/admin/get-auto-emails`,{
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      }).then(res=>{
        setAccordion(res.data)
      })
    },[])
  return (
    <div>
        <AddAccordionDialog 
         open = {AddAccordionDialogOpen} 
         emailTitle = {emailTitle} 
         emailContent={emailContent} 
         emailSubject = {emailSubject}
         emailDate = {emailDate}
         handleSubmit={handleSubmit} 
         handleEmailTitleChange = {handleEmailTitleChange} 
         handleEmailContentChange={handleEmailContentChange}   
         handleClose={AddAccordionDialogHandleClose} 
         handleEmailSubjectChange={handleEmailSubjectChange}
         handleEmailDateChange = {handleEmailDateChange}
         />
    <div>
        <h2>Write Custom Email</h2>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Custom Email</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography> */}
          <CustomEmail/>
        </AccordionDetails>
      </Accordion>
    </div>
          <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
          <h2>Annually Automated Emails Content</h2>
          <AddCircleIcon sx = {{cursor:"pointer"}}  onClick={()=>setAddAccordionDialogOpenOpen(true)}  />
          </div>
         

       
      {
        accordion? (
          accordion.length>0 ? (
            accordion.map((item)=>{
              return(
                  <Accordion key={item._id} >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
  
                    <Typography>{item.title}</Typography>
                    <DeleteIcon  sx = {{marginLeft:"20px"}} onClick={()=>handleDelete(item._id)}  />
                  </AccordionSummary>
                  <AccordionDetails>
                      <h4>Date : {item.emailDate}</h4>
                      <h4>Subject :{item.subject}</h4>
                      <h4>Content:</h4>
                      <p>{item.details}</p>
                      
                    {/* <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                      malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography> */}
                    
                  </AccordionDetails>
                </Accordion>
              )
          })
          ):(
            <h3>Nothing to show</h3>
          )
        ): (
          <h3>Loading</h3>
        )
        
      }
    </div>
  );
}