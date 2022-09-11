 import Grid from "@mui/material/Grid";
 import parse from 'html-react-parser';
 import Grid2 from '@mui/material/Unstable_Grid2';
 import CssBaseline from '@mui/material/CssBaseline';
 import Avatar from '@mui/material/Avatar';
 const ReaderFullPostView = ({posts})=>{
    return(
        <>
        <CssBaseline />
        <Grid2 container spacing={0} justifyContent= "space-between"   >
        <Grid2 xs={12} md={5} lg={8} spacing={0} sx = {{backgroundColor:"white",marginTop:"20px",marginLeft:"30px"}}  >
            <Grid2 container flexDirection="row" columnSpacing={3}>
                <Grid2>
                <Avatar sx = {{height:"45px",width:"45px"}}  alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>   
            
                </Grid2>
                <Grid2 container  flexDirection="column" rowSpacing={0}  >
                    <Grid2 sx ={{fontSize:"14px"}}>
                        Abdullah Ahmed
                    </Grid2>
                    <Grid2 sx ={{fontSize:"14px"}}>
                        Coding with Abdullah
                    </Grid2>
                </Grid2>
            </Grid2>
            {
                posts.map((post)=>{
                    return(
                        <div >
                           {parse(post.postContent)} 
                        </div>
                    )
                })
            }
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati facilis, quibusdam sed adipisci ullam dolorum nemo quae nostrum id, sunt non ipsam tenetur, aut eaque. Neque repudiandae maiores voluptatibus incidunt.
         </Grid2>
         <Grid2  xs={12} md={5} lg={3 }  sx = {{position:"fixed",top:"0px",right:"0px",height:"100vh",overflow:"auto", background:"rgba(92, 219, 149,1)",marginRight:"0px",paddingLeft:"12px" } }     >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit ipsum exercitationem inventore corrupti, ad iste impedit architecto! Odio expedita, alias assumenda sequi cum nihil! Culpa architecto minima perferendis nisi est?
        </Grid2>   
        </Grid2>
          <h1>Full post will be shown here</h1>  
        </>
    )
}
export default ReaderFullPostView