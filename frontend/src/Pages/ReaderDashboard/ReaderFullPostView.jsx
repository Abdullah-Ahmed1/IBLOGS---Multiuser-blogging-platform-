 import Grid from "@mui/material/Grid";
 import parse from 'html-react-parser';
 import Grid2 from '@mui/material/Unstable_Grid2';
 import CssBaseline from '@mui/material/CssBaseline';
 const ReaderFullPostView = ({posts})=>{
    return(
        <>
        <CssBaseline />
        <Grid2 container spacing={0} justifyContent= "space-between"   >
        <Grid2 xs={12} md={5} lg={8} spacing={0} sx = {{backgroundColor:"white",marginTop:"20px",marginLeft:"30px"}}  >
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