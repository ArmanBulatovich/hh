import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { Box } from "@chakra-ui/react";
import { useSnapshot } from "valtio";

import { store } from "./store/store";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/AuthPages/Login";
import Register from "./pages/AuthPages/Register";
import HomePage from "./pages/HomePage/HomePage";
import { Profile } from "./pages/Profile/Profile";
import { ProfileVUZ } from "./pages/Profile/ProfileVUZ";
import { AddingAds } from "./pages/AddingAds/AddingAds";
import { GetBoughtDocuments } from "./pages/Documents/GetBoughtDocuments";
import { GetTeachers } from "./pages/GetTeacher/GetTeachers";
import { GetOneTeacher } from "./pages/GetTeacher/GetOneTeacher";
import Balance from "./pages/Balance/Balance";
import { AllDocuments } from "./pages/Documents/AllDocuments";
import { Document } from "./pages/Documents/Document";
import { MyUploadedDocuments } from "./pages/Documents/MyUploadedDocument";
import { queryClient } from "./queryClient";
import CreateVacancy from "./pages/Vacancy/VUZ/CreateVacancy";
import Vacancies from "./pages/Vacancy/VUZ/Vacancies";
import TeacherVacancies from "./pages/Vacancy/Teacher/Vacancies";
import Vacancy from "./pages/Vacancy/Teacher/Vacancy";
import Responses from "./pages/Vacancy/Teacher/Responses";
import ResponsesToVacancies from "./pages/Vacancy/VUZ/ResponsesToVacancies";

function App() {
  const { isAuthenticated } = useSnapshot(store.auth);
  const tokenFromLocalStorage = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (tokenFromLocalStorage) {
      store.auth.isAuthenticated = true;
    } else {
      store.auth.isAuthenticated = false;
    }
  }, [isAuthenticated]);

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Box pt="70px">
        <Routes>
          <Route>
            <Route path="/" element={<HomePage />} />,
            <Route path="/login" element={<Login />} />,
            <Route path="/register" element={<Register />} />,
            {isAuthenticated && (
              <Route>
                {role === '\"teacher\"' &&
                  <Route>
                    <Route path="/profile-user" element={<Profile />} />
                    <Route path='/adding-ads' element={<AddingAds />} />
                    <Route path='/documents/bought' element={<GetBoughtDocuments />} />
                    <Route path='/documents/bought/:id' element={<Document />} />
                    <Route path='/documents/uploaded' element={<MyUploadedDocuments />} />
                    <Route path='/documents' element={<AllDocuments />} />
                    <Route path='/documents/:id' element={<Document />} />
                    <Route path='/balance' element={<Balance />} />
                    <Route path='/vacancies' element={<TeacherVacancies />} />
                    <Route path='/vacancies/:id' element={<Vacancy />} />
                    <Route path="/vacancies/responses" element={<Responses />} />
                  </Route>}

                {role === '\"educational_institution\"' &&
                  <Route>
                    <Route path="/profile-vuz" element={<ProfileVUZ />} />
                    <Route path='/get-teachers' element={<GetTeachers />} />
                    <Route path='/get-teachers/:id' element={<GetOneTeacher />} />
                    <Route path='/documents/bought' element={<GetBoughtDocuments />} />
                    <Route path='/documents/bought/:id' element={<Document />} />
                    <Route path='/documents' element={<AllDocuments />} />
                    <Route path='/documents/:id' element={<Document />} />
                    <Route path='/balance' element={<Balance />} />
                    <Route path='/vacancy/create' element={<CreateVacancy />} />
                    <Route path='/vacancies' element={<Vacancies />} />
                    <Route path='/vacancies/responses' element={<ResponsesToVacancies />} />
                  </Route>}
              </Route>
            )}
          </Route>
        </Routes>
      </Box>
      {/* <Box position="relative" width="100%">
        <Footer />
      </Box> */}
    </QueryClientProvider>
  );
}

export default App;