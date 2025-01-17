import React, { useEffect, useState } from "react";
import "../styles/LoginPostResult.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatBubbleOutlineSharpIcon from "@mui/icons-material/ChatBubbleOutlineSharp";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import {
  faDownLong,
  faUpLong,
  faComment,
  faShareNodes,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeading,
  faLink,
  faXmark,
  faBold,
  faItalic,
  faStrikethrough,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { useStateValue } from "./StatePeovider";
import { HorizontalRule, Tune } from "@mui/icons-material";
const style = {
  position: "absolute",
  top: "27%",
  left: "7%",
  transform: "translate(-50%, -50%)",
  width: 200,
  height: 280,
  bgcolor: "background.paper",
  boxShadow: 4,
  p: 4,
};
function LoginResultPost({
  name,
  id,
  channelName,
  profileImage,
  likeCount,
  channelImage,
  commentCount,
  authid,
  LoginJwt,
}) {
  const loginuserid = localStorage.getItem("loginuserid");
  const UserNameLogin = localStorage.getItem("loginuserName");

  const [open, setOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [voteCount, setVoteCount] = useState(likeCount);
  const [commentPop, SetcommentPop] = useState(false);
  const [commentdata, Setcommentdata] = useState([]);
  const [cCount, SetcCount] = useState(commentCount);
  const [commentuserdetails, Setcommentuserdetails] = useState("");
  const [Commentdatebyuser, SetCommentdatebyuser] = useState("");
  const [delteboxincmnt, Setdelteboxincmnt] = useState(false);

  // const [PostId, SetPostId] = useState("");
  const [follobtn, Setfollobtn] = useState(true);
  const Upvote = () => {
    SetPostId(id);
    // alert(PostId);
  };
  const Handelfallow = async () => {
    const apiUrl = `https://academics.newtonschool.co/api/v1/quora/follow/${authid}`;
    const projectId = "pvxi7c9s239h";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LoginJwt}`,
          projectID: projectId,
        },
      });
      console.log("jwt toke in login result post :", LoginJwt);
      console.log("authb id :", authid);

      const data = await response.json();
      console.log("Follow user successful:", data);
      if (data.status === "success") {
        Setfollobtn(false);
      }
      // Handle success as needed
      return data;
    } catch (error) {
      console.error("Error during follow user:", error.message);
      // Handle the error as needed
      throw error;
    }
  };
  const HandelDownVOte = async () => {
    const apiUrl = `https://academics.newtonschool.co/api/v1/reddit/like/${id}`;
    const projectId = "pvxi7c9s239h";

    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LoginJwt}`,
          projectID: projectId,
        },
      });
      console.log("jwt toke in login result post :", LoginJwt);
      console.log("authb id :", authid);

      const data = await response.json();
      console.log("Follow user successful:", data);

      // Handle success as needed
      if (data.status === "success") {
        // Update the vote count based on the previous state
        setVoteCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
      }
      return data;
    } catch (error) {
      console.error("Error during follow user:", error.message);
      // Handle the error as needed
      throw error;
    }
  };
  const HandelComment = async () => {
    const apiUrl = `https://academics.newtonschool.co/api/v1/reddit/post/${id}/comments`;
    const projectId = "pvxi7c9s239h";
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${LoginJwt}`,
          projectID: projectId,
        },
      });
      console.log("authb id :", authid);

      const data = await response.json();
      console.log(
        "here is handel comment function is showing all the data for comment:",
        data
      );
      // if (data.status === "success") {
      //   Setfollobtn(false);
      // }
      // Handle success as needed
      if (data.status === "success") {
        // Update the vote count
        Setcommentdata(data.data);
      }
      console.log("comment data:", commentdata);
      // await HandelCommentUserName(CommentData[0].author);
      return data;
    } catch (error) {
      console.error("Error during follow user:", error.message);
      // Handle the error as needed
      throw error;
    }
  };
  const PostcommentHandel = async () => {
    console.log("Commentdatebyuser:", Commentdatebyuser);

    const apiUrl = `https://academics.newtonschool.co/api/v1/reddit/comment/${id}`;
    const projectId = "pvxi7c9s239h";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LoginJwt}`,
          projectID: projectId,
        },
        body: JSON.stringify({
          content: `${Commentdatebyuser}`,
        }),
      });
      const data = await response.json();
      console.log("daata after posting the comment:", data);
      await HandelComment();
      SetCommentdatebyuser("");
      SetcCount((pre) => pre + 1);

      console.log("comment user  data:", cCount);
      return data;
    } catch (error) {
      console.error("Error during follow user:", error.message);
      // Handle the error as needed
      throw error;
    }
  };
  const HandelUpVOte = async () => {
    const apiUrl = `https://academics.newtonschool.co/api/v1/reddit/like/${id}`;
    const projectId = "pvxi7c9s239h";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LoginJwt}`,
          projectID: projectId,
        },
      });
      console.log("jwt toke in login result post :", LoginJwt);
      console.log("authb id :", authid);

      const data = await response.json();
      console.log("Follow user successful:", data);

      // Handle success as needed
      if (data.status === "success") {
        // Update the vote count based on the previous state
        setVoteCount((prevCount) => prevCount + 1);
      }
      return data;
    } catch (error) {
      console.error("Error during follow user:", error.message);
      // Handle the error as needed
      throw error;
    }
  };
  const HandelUnfallow = async () => {
    const apiUrl = `https://academics.newtonschool.co/api/v1/quora/follow/${authid}`;
    const projectId = "pvxi7c9s239h";

    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LoginJwt}`,
          projectID: projectId,
        },
      });
      console.log("jwt toke in login result post :", LoginJwt);
      console.log("authb id :", authid);

      const data = await response.json();
      console.log("Follow user successful:", data);
      // if (data.status === "success") {

      // }
      Setfollobtn(true);
      // Handle success as needed
      return data;
    } catch (error) {
      console.error("Error during follow user:", error.message);
      // Handle the error as needed
      throw error;
    }
  };
  const handleCloseDelteBtn = () => {
    setOpen(false);
  };
  const handleOpen = (e) => {
    setOpen(true);
    setModalPosition({ x: e.clientX, y: e.clientY });
    // SetuserName(name);
    // SetpId(id);
  };
  const handleCommentOpen = () => {
    SetcommentPop(true);
    //  alert("iam working comment");
    HandelComment();
    // fetchData();
  };
  const handleClose = () => {
    return setOpen(false);
  };
  const handleCloseCommentpopupbox = () => {
    SetcommentPop(false);
  };
  const HandelDeleteComment = () => {
    Setdelteboxincmnt(true);
  };
  const handelcommentboxclose = () => {
    Setdelteboxincmnt(false);
  };
  function CommentData({ commentcontent, commentuserId, commentid }) {
    const [userData, setUserData] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const apiUrl = `https://academics.newtonschool.co/api/v1/reddit/user/${commentuserId}`;
        const projectId = "pvxi7c9s239h";
        try {
          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${LoginJwt}`,
              projectID: projectId,
            },
          });

          const data = await response.json();
          console.log("Successful comment user:", data);
          setUserData(data.data);
          console.log("user main comment :", LoginJwt);
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      };

      fetchData();
    }, [commentuserId, LoginJwt]);
    return (
      <>
        <div className="CommentDataDiv">
          <div className="commentedUsertracknamelogo">
            <img src={userData.profileImage} />
            <p>{userData.name}</p>
            <p>Posting time of it</p>
          </div>
          <p>{commentcontent}</p>
          <div className="divforbuttonincomment">
            <div className="voteUpDownincomment">
              <span className="insideCommentUpVote">⇧</span>
              <p className="likecount">4</p>
              <span className="insideCommentDownVote">⇩</span>
            </div>
            <div className="CommentinsideComment">
              <ChatBubbleOutlineSharpIcon className="iconinreply" />
              <p>Reply</p>
            </div>
            <div className="btnshare">share</div>
            {commentuserId === loginuserid ? (
              <YourComponent
                commentid={commentid}
                DeleteComment={DeleteComment}
              />
            ) : (
              <YourComponentNoneComment />
            )}
            {/* <MoreHorizIcon /> */}
          </div>
          <Modal
            open={delteboxincmnt}
            onClose={handelcommentboxclose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{
              top: `${modalPosition.y}px`,
              left: `${modalPosition.x}px`,
            }}
          >
            <Box
              sx={{
                width: 200,
                height: 280,
                bgcolor: "white", // Background color for the Box
                boxShadow: 4,
                p: 4,
              }}
            >
              <p>Delete</p>
            </Box>
          </Modal>
        </div>
      </>
    );
  }
  function YourComponent({ commentid, DeleteComment }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleDeleteClick = () => {
      DeleteComment(commentid); // Call the DeleteComment function
      handleMenuClose(); // Close the menu after handling delete
    };

    return (
      <div>
        <MoreHorizIcon onClick={handleMenuClick} />

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          getContentAnchorEl={null}
        >
          <MenuItem>Save</MenuItem>
          <MenuItem>Edit</MenuItem>
          <MenuItem>Follow</MenuItem>

          <MenuItem onClick={handleDeleteClick}>Delete </MenuItem>

          {/* Add more menu items as needed */}
        </Menu>
      </div>
    );
  }

  function YourComponentNoneComment({ commentid, DeleteComment }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <MoreHorizIcon onClick={handleMenuClick} />

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          getContentAnchorEl={null}
        >
          <MenuItem>Save</MenuItem>
          <MenuItem>Edit</MenuItem>
          <MenuItem>Follow</MenuItem>

          {/* Add more menu items as needed */}
        </Menu>
      </div>
    );
  }
  async function DeleteComment(commentId) {
    const projectId = "pvxi7c9s239h";

    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${LoginJwt}`,
            projectID: projectId,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete comment. Status: ${response.status}`);
      }

      // Check if response body is not empty
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("Comment deleted successfully:", data);
        await HandelComment();
        return data;
      } else {
        console.log("Comment deleted successfully.");
        SetcCount((pre) => pre - 1);
        await HandelComment();

        return; // Return undefined or another appropriate value
      }
    } catch (error) {
      console.error("Error deleting comment:", error.message);
      throw error;
    }
  }
  const handleImageError = (event) => {
    // Set a default image path when the image fails to load
    event.target.src =
      "https://fastly.picsum.photos/id/96/640/480.jpg?hmac=IAdq6eZIR1xi6-jdksJOpI6V1YhMxcWn9A8uDw4BS0E";
  };
  return (
    <div className="LoginResultPost">
      <div className="Vote">
        {/* <FontAwesomeIcon icon={faUpLong} className="UpVote" /> */}
        <span className="Upvoteinpost" onClick={() => HandelUpVOte()}>
          ⇧
        </span>
        <p className="VoteCountinside"> {voteCount}</p>
        <p className="UpvoteinpostDown" onClick={() => HandelDownVOte()}>
          ⇩
        </p>
      </div>

      <div className="restoftheloginresult">
        <div className="headerLoginResult">
          <img className="logo" src={profileImage} />
          <p className="COMMUNITYNAme">{channelName}</p>
          <p className="posauth">Posted by</p>
          <p className="posauth" onMouseOver={handleOpen}>
            {name}
          </p>
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              style={{
                top: `${modalPosition.y}px`,
                left: `${modalPosition.x}px`,
              }}
            >
              <Box sx={style} className="ModelBox">
                <img className="imglogodrop" src={profileImage} />
                <p className="authorname"> {name}</p>
                <p className="ChannelName">{channelName}</p>
                <div className="likeandFallow">
                  <div className="numberoffallower">
                    <span className="numberofpodt">1.6K</span>
                    <span className="karmatype">Post karma</span>
                  </div>
                  <div className="numberoffallower">
                    <span className="numberofpodt">1.6K</span>
                    <span className="karmatype">Comment karma</span>
                  </div>
                </div>
                <button
                  className="chatButton"
                  onClick={() => alert("still under work")}
                >
                  Start Chat
                </button>
                {follobtn ? (
                  <button className="fallowbtn" onClick={Handelfallow}>
                    Follow
                  </button>
                ) : (
                  <button className="unfallow" onClick={HandelUnfallow}>
                    Unfallow
                  </button>
                )}
              </Box>
            </Modal>
          </div>
        </div>
        <p className="posttittle">post titel</p>
        <div className="imgdiv">
          <img
            className="LoginPostImge"
            src={channelImage}
            onError={handleImageError}
          />
        </div>
        <div className="resultFooter">
          <div className="resultbutton" onClick={() => handleCommentOpen()}>
            <FontAwesomeIcon icon={faComment} />
            <p className="commentcountnumber">{cCount}</p>
            <p>Comments</p>
          </div>
          <div className="resultbutton">
            <FontAwesomeIcon icon={faShareNodes} />
            <p className="ButtonNameforsher">Share</p>
          </div>
          <div className="resultbutton">
            <FontAwesomeIcon icon={faBookmark} />
            <p className="ButtonNameforsher">Save</p>
          </div>
          <div className="resultbutton">
            <MoreHorizIcon />
          </div>
        </div>
      </div>
      <Modal
        open={commentPop}
        onClose={handleCloseCommentpopupbox}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="CommentPopUpBox">
          <div className="MainCommentDiv">
            <div className="RestOfCommentPart">
              <div className="CommentHeader">
                <div className="LeftHeader">
                  <div className="voteUpDown">
                    <span
                      className="CommentUpVote"
                      onClick={() => HandelUpVOte()}
                    >
                      ⇧
                    </span>
                    <p className="likecount"> {voteCount}</p>
                    <p
                      className="CommentDownVote"
                      onClick={() => HandelDownVOte()}
                    >
                      ⇩
                    </p>
                  </div>
                </div>
                <FontAwesomeIcon icon={faImage} className="imagelogoinhead" />

                <div className="CommentHeaderTitle">
                  <p className="ptext">
                    here will be the post titel shown in the comment header
                    partt and after some lenght it will be doted and after click
                    the logo dot dot it will be shown and it ccan be undefibe
                    lenfhtg{" "}
                  </p>
                </div>
                <button className="coloseButton">
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="faXmark"
                    onClick={handleCloseCommentpopupbox}
                  />
                </button>
              </div>
              <div className="postdivforcomment">
                <div className="commentPostdiv">
                  <div className="likesection">
                    <span
                      className="LikeInComment1"
                      onClick={() => HandelUpVOte()}
                    >
                      ⇧
                    </span>
                    {voteCount}
                    <p
                      className="LikeInComment2"
                      onClick={() => HandelDownVOte()}
                    >
                      ⇩
                    </p>
                  </div>
                  <div className="PostDivInComment">
                    <div className="headerLoginResult">
                      <img className="logo" src={profileImage} />
                      <p className="COMMUNITYNAme">{channelName}</p>
                      <p className="posauth">Posted by</p>
                      <p className="posauth" onMouseOver={handleOpen}>
                        {name}
                      </p>
                      <div>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          style={{
                            top: `${modalPosition.y}px`,
                            left: `${modalPosition.x}px`,
                          }}
                        >
                          <Box sx={style} className="ModelBox">
                            <img className="imglogodrop" src={profileImage} />
                            <p className="authorname"> {name}</p>
                            <p className="ChannelName">{channelName}</p>
                            <div className="likeandFallow">
                              <div className="numberoffallower">
                                <span className="numberofpodt">1.6K</span>
                                <span className="karmatype">Post karma</span>
                              </div>
                              <div className="numberoffallower">
                                <span className="numberofpodt">1.6K</span>
                                <span className="karmatype">Comment karma</span>
                              </div>
                            </div>
                            <button className="chatButton">Start Chat</button>
                            {follobtn ? (
                              <button
                                className="fallowbtn"
                                onClick={Handelfallow}
                              >
                                Follow
                              </button>
                            ) : (
                              <button
                                className="unfallow"
                                onClick={HandelUnfallow}
                              >
                                Unfallow
                              </button>
                            )}
                          </Box>
                        </Modal>
                      </div>

                      <p className="posauth">posting time</p>
                    </div>
                    <p className="posttittle">post titel</p>
                    <div className="imgdiv">
                      <img className="LoginPostImge" src={channelImage} />
                    </div>
                    <div className="resultFooter">
                      <div className="resultbutton">
                        <FontAwesomeIcon /> <p>{cCount}</p>
                        <p>comments</p>
                      </div>
                      <div className="resultbutton">
                        <FontAwesomeIcon icon={faShareNodes} />
                        <p>share</p>
                      </div>
                      <div className="resultbutton">
                        <FontAwesomeIcon icon={faBookmark} />
                        <p>Save</p>
                      </div>
                      <div className="resultbutton">
                        <p>...</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="commentByUserName">comment as {UserNameLogin}</p>
                <div className="CommentBox">
                  <textarea
                    placeholder="What are your thought"
                    className="commentboxtext"
                    value={Commentdatebyuser}
                    onChange={(e) => SetCommentdatebyuser(e.target.value)}
                  />
                  <div className="styeltypeofcontent">
                    <div className="stylebtn">
                      <button className="stlbtn">
                        <FontAwesomeIcon icon={faBold} />
                      </button>
                      <button className="stlbtn">
                        <FontAwesomeIcon icon={faItalic} />
                      </button>
                      <button className="stlbtn">
                        <FontAwesomeIcon icon={faLink} />
                      </button>
                      <button className="stlbtn">
                        <FontAwesomeIcon icon={faStrikethrough} />
                      </button>
                      <button className="stlbtn">b</button>
                      <button className="stlbtn">s</button>
                      <button className="stlbtn">
                        <FontAwesomeIcon icon={faHeading} />
                      </button>
                      <button className="stlbtn">
                        <MoreHorizIcon />
                      </button>

                      <button className="commentMarket">MarkDown Mode</button>
                      <button
                        className="CommentBtn"
                        onClick={() => PostcommentHandel()}
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
                <div className="commentDataDiv">
                  {commentdata.map((item) => {
                    return (
                      <>
                        <CommentData
                          profileImage={profileImage}
                          commentcontent={item.content}
                          commentuserId={item.author}
                          commentid={item._id}
                        />
                        {Array.isArray(item.children) &&
                          item.children.length > 0 && (
                            <>
                              {item.children.map((childItem) => (
                                <CommentDataforChild
                                  profileImage={profileImage}
                                  commentcontent={childItem.content}
                                  childauth={childItem.author}
                                  createdAt={childItem.createdAt}
                                />
                              ))}
                            </>
                          )}
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="PostDetails"></div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

function CommentDataforChild({ commentcontent, childauth }) {
  const { LoginJwt } = useStateValue();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `https://academics.newtonschool.co/api/v1/reddit/user/${childauth}`;
      const projectId = "pvxi7c9s239h";
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${LoginJwt}`,
            projectID: projectId,
          },
        });

        const data = await response.json();
        setUserData(data.data);
        Setcreattime(moment(data.createdAt));
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchData();
  }, [childauth, LoginJwt]);
  return (
    <>
      <div className="CommentDataDivforchildcomment">
        <div className="commentedUsertracknamelogo">
          <img src={userData.profileImage} />
          {userData && <p>{userData.name}</p>}
          <p>creat time</p>
        </div>
        <p>{commentcontent}</p>
        <div className="divforbuttonincomment">
          <div className="voteUpDownincomment">
            <span className="insideCommentUpVote">⇧</span>
            <p className="likecount">4</p>
            <span className="insideCommentDownVote">⇩</span>
          </div>
          <div className="CommentinsideComment">
            <ChatBubbleOutlineSharpIcon className="iconinreply" />
            <p>Reply</p>
          </div>
          <div className="btnshare">share</div>
          <MoreHorizIcon />
        </div>
      </div>
    </>
  );
}
export default LoginResultPost;
