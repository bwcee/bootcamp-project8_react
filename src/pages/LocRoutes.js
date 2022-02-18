import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Container, Grid} from "@material-ui/core";
import RouteCard from "../components/RouteCard";

function LocRoutes() {
  const { loc, id } = useParams();
  const [allRoutes, setAllRoutes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3004/routes")
      .then((result) => {
        setAllRoutes(result.data);
      });
  }, []);

  const locRoutesArr = allRoutes.filter((route)=>route.tripId === Number(id) )
  
  const deleteRoute=(id)=>{
    axios.delete("http://localhost:3004/routes", {
      data: {id}
    })
    .then(()=>{
      const newRoutes = allRoutes.filter(route => route.id !== id)
      setAllRoutes(newRoutes)
    })

  }

  return (
    <div>
      <h3>This is {loc}'s LocRoute</h3>
      <Container>
        <Grid container spacing ={3}>
          {
            locRoutesArr.map((route)=>{
              return (
                <Grid item xs={12} md={6} lg={4} key={route.id}>
                  <RouteCard route={route} deleteRoute={deleteRoute} />
                </Grid>
              )
            })
          } 

        </Grid>
      </Container>
    </div>
  );
}

export default LocRoutes;
