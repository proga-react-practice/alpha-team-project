import { Box, Divider, List, ListItem, Typography } from "@mui/material";
import { useUserData } from "./DataContext";
import { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ModalUser from "./ModalUser";
import { StyledAccordion } from "../styled/styles";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Genre, Mood } from "./user";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface Song {
  id: string;
  songName: string;
  artist: string;
  genre: string;
  date: string;
  isFavorite: boolean;
}

export interface User {
  userName: string;
  date: string;
  isModalOpen: boolean;
  songs: Song[];
  mood: Mood;
  genres: Genre[];
  age: string;
  id: string;
}

export default function UsersBox() {
  const { userData } = useUserData();
  const today = new Date().toISOString().split("T")[0];
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      return JSON.parse(savedUsers);
    } else {
      return userData.map((data: any) => ({
        userName: data.name,
        date: today,
        isModalOpen: false,
        songs: [],
        mood: data.mood,
        genres: data.genres || [],
        age: data.age,
        id: data.id,
      }));
    }
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    const newUsers = userData.map((data: any) => ({
      userName: data.name,
      date: today,
      isModalOpen: false,
      songs: [],
      mood: data.mood,
      genres: data.genres || [],
      age: data.age,
      id: data.id,
    }));

    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      newUsers.forEach((newUser) => {
        if (!prevUsers.some((user) => user.id === newUser.id)) {
          updatedUsers.push(newUser);
        }
      });
      return updatedUsers;
    });
  }, [userData, today]);

  const handleDeleteSong = (userId: string, songId: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              songs: user.songs.filter((song) => song.id !== songId),
            }
          : user
      )
    );
  };

  const handleModalOpen = (index: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user, i) =>
        i === index ? { ...user, isModalOpen: true } : user
      )
    );
  };

  const handleModalClose = (index: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user, i) =>
        i === index ? { ...user, isModalOpen: false } : user
      )
    );
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault();
    const song: Song = JSON.parse(event.dataTransfer.getData("song"));
    setUsers((prevUsers) =>
      prevUsers.map((user, i) => {
        if (i === index) {
          const songExists = user.songs.some((s) => s.id === song.id);
          if (!songExists) {
            return { ...user, songs: [...user.songs, song] };
          }
        }
        return user;
      })
    );
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const [deletedUserId, setDeletedUserIds] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("deletedUserIds") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("deletedUserIds", JSON.stringify(deletedUserId));
  }, [deletedUserId]);

  const handleDeleteUser = (id: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    setDeletedUserIds((prevDeletedUserIds) => [...prevDeletedUserIds, id]);
  };

  return (
    <Box>
      {users.map((user, index) => (
        <StyledAccordion
          key={index}
          sx={{ height: "auto", boxShadow: "none", textAlign: "center" }}
          onDrop={(event) => handleDrop(event, index)}
          onDragOver={handleDragOver}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ backgroundColor: "transparent", backgroundImage: "none" }}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <AccountCircleIcon
              onClick={() => handleModalOpen(index)}
              sx={{ width: 60, height: 60, cursor: "pointer" }}
            />
            <DeleteOutlineIcon
              onClick={() => handleDeleteUser(user.id)}
              sx={{ width: 60, height: 60, cursor: "pointer" }}
            />
            <Typography sx={{ fontSize: 35, marginLeft: 3, marginTop: 1 }}>
              {user.userName}
            </Typography>
          </AccordionSummary>
          <Divider orientation="horizontal" variant="middle" flexItem />
          <AccordionDetails>
            <List>
              {user.songs.map((song, songIndex) => (
                <Typography key={songIndex} sx={{ fontSize: 35 }}>
                  <ListItem>
                    {song.songName} - {song.artist}
                    <DeleteOutlineIcon
                      onClick={() => handleDeleteSong(user.id, song.id)}
                      sx={{ width: 50, height: 40, cursor: "pointer" }}
                    />
                  </ListItem>
                </Typography>
              ))}
            </List>
          </AccordionDetails>

          <ModalUser
            isOpen={user.isModalOpen}
            onClose={() => handleModalClose(index)}
            userId={user.id}
          />
        </StyledAccordion>
      ))}
    </Box>
  );
}
