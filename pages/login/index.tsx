import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth } from '../../api/firebaseConfig/firebaseConfig';
import { SignInWithEmailAndPassword } from "@/api/functions/userFunc";
import { useMutation } from "@tanstack/react-query";
import CookieManager from "@/utils/cookieManager";
import AuthTokenData from "@/utils/AuthTokenData";
import { useRouter } from "next/router";
import { toast } from "sonner";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const defaultTheme = createTheme();

interface loginSchema{
    email: string,
    password:string
}

const schema=yup.object().shape({
    email: yup.string().required().email("Invalid email format").label("email is required"),
    password: yup.string().required("password is required")
})

export default function SignInSide() {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
        resolver: yupResolver(schema),
      });
      const [showPassword, setShowPassword] = React.useState(false);
      const [isLoading,setIsLoading]=React.useState(false)
      const handleClickShowPassword = () => setShowPassword((show) => !show);
     const router=useRouter()
    const OnSubmit=async(data: loginSchema)=>{
        // console.log(data)
        setIsLoading(true)
        try {
            const res:any= await SignInWithEmailAndPassword(auth,data.email,data.password)
            console.log(res?._tokenResponse?.registered)
            if(res?._tokenResponse?.registered==true){
                console.log("login Success",res?._tokenResponse?.idToken)
                const token =res?._tokenResponse?.idToken
                CookieManager.set(AuthTokenData.key, token)
                toast.success('Login successful');
                router.push("/calendar")
                setIsLoading(false)
               }else{
                console.log("login failed")
                setIsLoading(false)
               }
            reset()
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
       
    }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url("/photos/login.svg")',
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "fit",
            backgroundPosition: "left",
            backgroundRepeat: "no-repeat",
            height: "100%",
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square  >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
           
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(OnSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                {...register('email')}
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                helperText={errors.email ? errors.email.message as string : ''}
                sx={{marginLeft:'0.5rem'}}
              />
              {/* <TextField
                margin="normal"
                required
                fullWidth
                {...register('password')}
                label="Password"
                type="password"
                id="password"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message as string : ''}
                autoComplete="current-password"
              /> */}
               <FormControl sx={{ m: 1, width: "100%" }} variant="outlined"  >
          <InputLabel htmlFor="outlined-adornment-password">
            Password1
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            {...register('password')}
            
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            error={!!errors.password}
           
          />
          <span style={{color:'red',fontSize:'12px'}}>{errors.password ? errors.password.message as string : ''}</span>
        </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ marginTop:'4rem'}}
              >
              {  isLoading ? "Loading...": "Sign In"}
              </Button>
              
            </Box>
            
          </Box>
        </Grid>
      
      </Grid>
    </ThemeProvider>
  );
}


