import React, { useState } from "react";
import Header from "../components/Header";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AddDrawer from "../components/AddDrawer";
import MovieList from "../components/MovieList";
import UpdateDrawer from "../components/UpdateDrawer";

import "../styles/containers/homepage.css";
import { useGetAll } from "../hooks/useGetAll";

export default function Homepage() {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [current, setCurrent] = useState(null);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setCurrent(null);
  const { error, data, loading } = useGetAll();

  const recieveBack = (data) => {
    setCurrent(data);
    setOpenEdit(true);
  };
  

  return (
    <>
      <Header />
      {loading ? (
        <p>loading</p>
      ) : (
        <MovieList data={data.getMovies} sendBack={recieveBack} />
      )}

      <div className="add-button" onClick={() => setOpen(true)}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
      <AddDrawer open={open} close={handleClose} />
      {current ? (
        <UpdateDrawer open={openEdit} close={handleEditClose} id={current} />
      ) : null}
    </>
  );
}
