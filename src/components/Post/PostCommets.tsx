import { Circle, MoreVert, ThumbUpOutlined } from "@mui/icons-material";
import { Grid, Avatar, Typography } from "@mui/material";
import { abbreviateNumber } from "../../utils/abbreviateNumber";
import {styled} from '@mui/material/styles'

const PostCommetsBlob = styled('div')(({theme})=>({
  width: "100%",
  backgroundColor: "#F4F7FB",
  padding: "1rem",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",

}))

const PostCommetsText = styled('div')(({theme})=>({
  width: "100%",
  color: "#354752",
  padding: "0.5rem 0",

}))
const PostCommetsTextFooter = styled('div')(({theme})=>({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0.5rem 0",

}))
const PostCommentsTextFooterDot = styled('span')(({theme})=>({
  color: "#607079",
  fontSize: "7px",
  margin: "0 0.5rem",

}))
const PostCommentsLikeCounterContainer = styled('div')(({theme})=>({
  display: "flex",
  alignItems: "center",

}))
const PostCommentsLikeCounter = styled('div')(({theme})=>({
  backgroundColor: "#13968E",
  borderRadius: "50%",
  color: "#fff",
  width: "18px",
  height: "18px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "0.3rem",

}))

const PostCommets = ({ comments }: any) => (
    <div>
      {comments.map((item: any) => (
          <Grid
            key={item.id}
            container
            xs={12}
            sx={{padding:'1rem'}}
          >
            <Grid item xs={2}>
              <Avatar alt="masood" src={item.Avatar} />
            </Grid>
            <Grid item xs={10}>
              <PostCommetsBlob>
                <div>
                  <div>
                    <Typography variant="subtitle2"> {item.name}</Typography>
                  </div>
                  <div>
                    <Typography variant="caption" sx={{ color: "#8798A1" }}>
                      {" "}
                      {item.time}
                    </Typography>
                  </div>
                </div>
                <div>
                  <MoreVert sx={{ color: "#8798A1" }} />
                </div>
                <PostCommetsText>
                  <Typography variant="body2">{item.content}</Typography>
                </PostCommetsText>
              </PostCommetsBlob>
              <PostCommetsTextFooter>
                <Typography
                  variant="caption"
                  sx={{ color: "#607079", cursor: "pointer" }}
                >
                  Replay
                  <PostCommentsTextFooterDot>
                    <Circle fontSize="inherit" />
                  </PostCommentsTextFooterDot>
                  Like
                </Typography>
                <Typography variant="caption" sx={{ color: "#607079" }}>
                  <PostCommentsLikeCounterContainer>
                    <PostCommentsLikeCounter>
                      <ThumbUpOutlined sx={{ width: "0.8rem" }} />
                    </PostCommentsLikeCounter>{" "}
                    {abbreviateNumber(item.like)}
                  </PostCommentsLikeCounterContainer>
                </Typography>
              </PostCommetsTextFooter>
              {item.replay.length
                ? item.replay.map((replay: any) => (
                      <Grid
                        key={replay.id}
                        container
                        xs={12}
                        sx={{padding:'1rem'}}
                      >
                        <Grid item xs={2}>
                          <Avatar alt="masood" src={replay.Avatar} />
                        </Grid>
                        <Grid item xs={10}>
                          <PostCommetsBlob>
                            <div>
                              <div>
                                <Typography variant="subtitle2">
                                  {" "}
                                  {replay.name}
                                </Typography>
                              </div>
                              <div>
                                <Typography
                                  variant="caption"
                                  sx={{ color: "#8798A1" }}
                                >
                                  {" "}
                                  {replay.time}
                                </Typography>
                              </div>
                            </div>
                            <div>
                              <MoreVert sx={{ color: "#8798A1" }} />
                            </div>
                            <PostCommetsText>
                              <Typography variant="body2">
                                {replay.content}
                              </Typography>
                            </PostCommetsText>
                          </PostCommetsBlob>
                          <PostCommetsTextFooter>
                            <Typography
                              variant="caption"
                              sx={{ color: "#607079", cursor: "pointer" }}
                            >
                              Replay
                              <PostCommentsTextFooterDot>
                                <Circle fontSize="inherit" />
                              </PostCommentsTextFooterDot>
                              Like
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: "#607079" }}
                            >
                              <PostCommentsLikeCounterContainer>
                                <PostCommentsLikeCounter>
                                  <ThumbUpOutlined sx={{ width: "0.8rem" }} />
                                </PostCommentsLikeCounter>{" "}
                                {abbreviateNumber(replay.like)}
                              </PostCommentsLikeCounterContainer>
                            </Typography>
                          </PostCommetsTextFooter>
                        </Grid>
                      </Grid>
                    ))
                : null}
            </Grid>
          </Grid>
        ))}
    </div>
  );

export default PostCommets;




