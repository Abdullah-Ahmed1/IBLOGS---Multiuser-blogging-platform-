import Grid2 from '@mui/material/Unstable_Grid2';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import ProfileInfoTabs from '../../components/ProfileComps/ProfileInfoTabs';
const AuthorProfile = ()=>{
    return(
        <>
            <CssBaseline />
            <Grid2 container spacing={0} justifyContent= "space-between"   >
            <Grid2 xs={12} md={5} lg={8} spacing={0} sx = {{minHeight:"100vh",marginTop:"20px",marginLeft:"30px"}}  >
                <Grid2   sx = {{fontFamily: '"Source Sans Pro",Arial,sans-serif',marginTop:"50px",boxShadow:"0 4px 8px 0 rgba(92,219,149, 0.2), 0 6px 20px 0 rgba(92,219,149, 0.19)"}}>
                    <Grid2 container direction="row" sx = {{backgroundColor:"white"}}  justifyContent="space-between">
                        <Grid2 sx = {{paddingLeft:"20px"}} >
                            <div>
                            <h1>Abdullah Ahmed</h1>
                            <h4 style={{margin:"0px",color:"grey"}} >abdullah.ahmed10001@gmail.com</h4>
                            <h4 style={{margin:"0px",color:"grey"}}>software engineer @ Google</h4>
                            </div>
                        </Grid2>
                        <Grid2  sx = {{alignItems:"center",justifyContent:"center",paddingRight:"20px"}}    >
                            <img  style={{width:"150px",height:"150px",borderRadius:"100%",marginTop:"10%"}}  src="https://res.cloudinary.com/dlgwvuu5d/image/upload/v1660686670/my-uploads/t3gssujtpbrgl1gzp97f.jpg" alt="" />
                            {/* <Avatar   alt="Travis Howard" src="https://res.cloudinary.com/dlgwvuu5d/image/upload/v1660686670/my-uploads/t3gssujtpbrgl1gzp97f.jpg"  sx = {{height:"100px",width:"100px",fontSize:"50px"}}  /> */}
                        </Grid2>
                    </Grid2>
                    <Grid2 sx = {{backgroundColor:"transparent"}}>
                    <ProfileInfoTabs/>
                    </Grid2>
                </Grid2>
            </Grid2>
            <Grid2  xs={12} md={5} lg={3 }  sx = {{position:"fixed",top:"0px",right:"0px",height:"100vh",overflow:"auto", background:"rgba(92, 219, 149,1)",marginRight:"0px",paddingLeft:"12px" } }     >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit ipsum exercitationem inventore corrupti, ad iste impedit architecto! Odio expedita, alias assumenda sequi cum nihil! Culpa architecto minima perferendis nisi est?
        </Grid2> 
            </Grid2>
        </>
    )
}
export default AuthorProfile;