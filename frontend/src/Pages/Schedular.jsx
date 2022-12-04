import { Scheduler } from "@aldabil/react-scheduler";
import {useState,useEffect} from "react";
import  axios  from 'axios';
import { parseISO,addDays, parse } from "date-fns";
  
const EVENTS = [
  {
    event_id: "63834923d6d01b679116dcbb",
    title: "Event 1234",
    start: new Date(new Date(new Date().setHours(9)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
    
  },
  {
    event_id: 2,
    title: "Event 2",
    start: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
    
  },
  {
    event_id: 3,
    title: "Event 3",
    start: new Date('Mon Nov 28 2022 12:02:36 GMT+0500 (Pakistan Standard Time)'),
    end: new Date('Mon Nov 28 2022 13:02:36 GMT+0500 (Pakistan Standard Time)'),
  
  },
    
   
  ];
  

export default function Schedular() {

  const [events,setEvents] = useState([
  // {
  //   event_id: "er53k4jnf4k34",
  //   title: "Event 2",
  //   start: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
  //   end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
    
  // }
 ])

  const handleRemote = async (viewEvent)=>{
    console.log("eventssss",viewEvent)
    let value = JSON.parse(localStorage.getItem('token'));
    let token = value.token
     const response = await axios.get("http://127.0.0.1:5000/BloggerDashboard/get-events",{
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Authorization": token 
      }
    })

    const res1 = response.data.map(item=>{
      return(
        {
          event_id : item.event_id,
          title: item.title,
          start: new Date (item.start),
          end: new Date(item.end)
        }
      )
    }) 
    setEvents([...events,...res1])
console.log("/*/*/*/",events)

    return new Promise((res,rej)=>{
      res(events)
   })
  }
    const handleConfirm =(event,action)=> {
    return new Promise((resolve,reject)=>{
       console.log("//-----//",event,"------",action)
       if (action === "edit") {
          console.log("edit clicked")
          console.log("1122",event.event_id)
          let value = JSON.parse(localStorage.getItem('token'));
          let token = value.token 
          const  data1 = {
            event_id: event.event_id,
            title:event.title,
            start: event.start,
            end : event.end
          }
          axios.post(`http://127.0.0.1:5000/BloggerDashboard/edit-event`,data1,{
            headers:{
              "Content-Type":"application/json",
              "Accept":"application/json",
              "Authorization": token 
            }
          }).then(res=>{
            //-----------------------------------------
            axios.get("http://127.0.0.1:5000/BloggerDashboard/get-events",{
              headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization": token 
              }
            }).then(response=>{
              console.log("-----***",response.data)
              console.log("***////",EVENTS)
              console.log("thissss",[...events,...(response.data.map((item,index)=>{
                return({
                  event_id: item.event_id,
                  title:item.title,
                  start: new Date(item.start),
                  end: new Date(item.end)
              })
              }))])
              setEvents([...events,...(response.data.map((item,index)=>{
                return({
                  event_id: item.event_id,
                  title:item.title,
                  start: new Date(item.start),
                  end: new Date(item.end)
              })
              }))])
        
            })
            //-----------------------------------------
            resolve({
              ...event,
              event_id: event.event_id 
            });
          })
      } else if (action === "create") {
        const  data = {
          title:event.title,
          start: event.start,
          end : event.end
        }
        let value = JSON.parse(localStorage.getItem('token'));
        let token = value.token
        axios.post("http://127.0.0.1:5000/BloggerDashboard/add-event",data,{
          headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
            "Authorization": token 
          }
        })
        .then(res=>{
          //------------------------
          axios.get("http://127.0.0.1:5000/BloggerDashboard/get-events",{
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Authorization": token 
      }
    }).then(response=>{
      console.log("-----***",response.data)
      console.log("***////",EVENTS)
      console.log("thissss",[...events,...(response.data.map((item,index)=>{
        return({
          event_id: item.event_id,
          title:item.title,
          start: new Date(item.start),
          end: new Date(item.end)
      })
      }))])
      setEvents([...events,...(response.data.map((item,index)=>{
        return({
          event_id: item.event_id,
          title:item.title,
          start: new Date(item.start),
          end: new Date(item.end)
      })
      }))])

    })
          //-----------------------
          resolve({
                ...event,
                event_id: event.event_id 
              });
        })
      }
      
      
    })

    

  }

  const handleDelete = async(deletedId)=>{  return new Promise((resolve,reject)=>{
    console.log("****/-",deletedId)
    let value = JSON.parse(localStorage.getItem('token'));
    let token = value.token
    axios.delete(`http://127.0.0.1:5000/BloggerDashboard/delete-event/${deletedId}`,{
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Authorization": token 
      }
    }).then(response=>{
      resolve(deletedId);   
    })

   
  })}
  
  useEffect(()=>{
    let value = JSON.parse(localStorage.getItem('token'));
    let token = value.token 
    axios.get("http://127.0.0.1:5000/BloggerDashboard/get-events",{
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Authorization": token 
      }
    }).then(response=>{
      console.log("-----***",response.data)
      console.log("***////",EVENTS)
      console.log("thissss",[...events,...(response.data.map((item,index)=>{
        return({
          event_id: item.event_id,
          title:item.title,
          start: new Date(item.start),
          end: new Date(item.end)
      })
      }))])
      setEvents([...events,...(response.data.map((item,index)=>{
        return({
          event_id: item.event_id,
          title:item.title,
          start: new Date(item.start),
          end: new Date(item.end)
      })
      }))])

    })
  },[])
  return (
    <>
    {
      events?(
        <Scheduler
         events={events}
       // view="week"
       // day={null}
       // onConfirm={()=>console.log("-----")}
        onConfirm = {handleConfirm}
        onDelete = {handleDelete}
        // getRemoteEvents={handleRemote}
       // month={null}
       // eventRenderer={(event) => {
       //   console.log("---><-----")
       //   if (+event.event_id % 2 === 0) {
       //     return (
       //       <div
       //         style={{
       //           display: "flex",
       //           flexDirection: "column",
       //           justifyContent: "space-between",
       //           height: "100%"
       //         }}
       //       >
       //         <div
       //           style={{ height: 20, background: "#ffffffb5", color: "black" }}
       //         >
       //           {event.start.toLocaleTimeString("en-US", {
       //             timeStyle: "short"
       //           })}
       //         </div>
       //         <div>{event.title}</div>
       //         <div
       //           style={{ height: 20, background: "#ffffffb5", color: "black" }}
       //         >
       //           {event.end.toLocaleTimeString("en-UD", { timeStyle: "short" })}
       //         </div>
       //       </div>
       //     );
       //   }
       //   return null;
       // }}
     />
      ):(
        <div>Nothing to show</div>
      )
    }
    </>
   
   
  );
}
