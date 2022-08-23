// src/pages/home/HomePage.tsx
import React from "react";

import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { FetchData, useFetchData, withFetchData } from '../../lib/useFetchData';
import { FetchState, FetchStateStatus } from '../../util/fetchstate';
import { PostsResponse } from '../../lib/model';

const apiUrl = 'https://codaisseur-coders-network.herokuapp.com/posts';

export function HomePage() {
  const state = useFetchData<PostsResponse>(apiUrl);

  return (
    <Container fixed>
      <Typography variant="h3" component="h1">
        Codaisseur Coders Network
      </Typography>
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

export const HomePage2 =  withFetchData<PostsResponse>(apiUrl)(function ({fetchState}) {

  return (
    <Container fixed>
      <Typography variant="h3" component="h1">
        Codaisseur Coders Network
      </Typography>
      {fetchState.status === FetchStateStatus.Loading && <p>Loading...</p>}
      {fetchState.status === FetchStateStatus.Error && <p>ERROR!</p>}
      {fetchState.status === FetchStateStatus.Success && (
        <Grid container spacing={3}>
          {fetchState.data.rows.map((post) => {
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
});

export function HomePage3() {
  return (
    <Container fixed>
      <Typography variant="h3" component="h1">
        Codaisseur Coders Network
      </Typography>
      <FetchData url={apiUrl}>
        {(state: FetchState<PostsResponse>) => {
          if (state.status === FetchStateStatus.Loading) {
            return <p>Loading...</p>;
          } else if (state.status === FetchStateStatus.Error) {
            return <p>ERROR!</p>;
          } else {
            return (
              <Grid container spacing={3}>
                {state.data.rows.map((post) => {
                  return (
                    <Grid key={post.id} item xs={4}>
                      <Card>
                        <CardContent
                          style={{ maxHeight: "15rem", overflow: "hidden" }}
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
            );
          }
        }}
      </FetchData>
    </Container>
  );
}