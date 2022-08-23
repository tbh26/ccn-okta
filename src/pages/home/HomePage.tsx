// src/pages/home/HomePage.tsx
import React from "react";

import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import useFetchData from '../../lib/useFetchData';
import { FetchStateStatus } from '../../util/fetchstate';
import { PostsResponse } from '../../lib/model';
// import axios from 'axios';


export default function HomePage() {
  const apiUrl = 'https://codaisseur-coders-network.herokuapp.com/posts';
  const state = useFetchData<PostsResponse>(apiUrl);
  // const [state, setState] = useState<FetchState<PostsResponse>>({status: FetchStateStatus.Loading});

  // useEffect(() => {
  //   (async () => {
  //     // async/await syntax!
  //     //
  //     // console.debug('before breakpoint');
  //     setState({status: FetchStateStatus.Loading}); // set debugger breakpoint?
  //     // console.debug('after breakpoint');
  //     try {
  //       const res = await axios.get( apiUrl );
  //       // debugger; // so you can see/check the response
  //       setState({status: FetchStateStatus.Success, data: res.data});
  //     } catch (error) {
  //       setState({status: FetchStateStatus.Error, error});
  //     }
  //   })();
  // }, []);

  return (
    <Container fixed>
      <Typography variant="h3" component="h1">
        Codaisseur Coders Network
      </Typography>
      {/*<p>Welcome! :)</p>*/}
      {state.status === FetchStateStatus.Loading && <p>Loading...</p>}
      {state.status === FetchStateStatus.Error && <p>ERROR!</p>}
      {state.status === FetchStateStatus.Success && (
        <Grid container spacing={3}>
          {state.data.rows.map((post) => {
            return (
              <Grid key={post.id} item xs={4}>
                <Card>
                  <CardContent
                    style={{maxHeight: "15rem", overflow: "hidden"}}
                  >
                    <Typography gutterBottom variant="h5" component="h2">
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {post.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
}
