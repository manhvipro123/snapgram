import { Routes, Route } from "react-router-dom";
import {
  AllUsers,
  CreatePost,
  EditPost,
  Home,
  PostDetails,
  Profile,
  Saved,
  UpdateProfile,
} from "./_root/pages";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import SigninForm from "./_auth/forms/SignInForm";
import SignupForm from "./_auth/forms/SignUpForm";
import { Toaster } from "@/components/ui/sonner";
import Explore from "./_root/pages/Explore";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public Routes*/}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />}></Route>
          <Route path="/sign-up" element={<SignupForm />}></Route>
        </Route>

        {/* Private Routes*/}
        <Route element={<RootLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
          <Route path="/saved" element={<Saved />}></Route>
          <Route path="/all-users" element={<AllUsers />}></Route>
          <Route path="/create-post" element={<CreatePost />}></Route>
          <Route path="/update-post/:id" element={<EditPost />}></Route>
          <Route path="/post/:id" element={<PostDetails />}></Route>
          <Route path="/profile/:id/*" element={<Profile />}></Route>
          <Route path="/update-profile/:id" element={<UpdateProfile />}></Route>
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
