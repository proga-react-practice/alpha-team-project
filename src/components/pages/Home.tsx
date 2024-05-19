import { Box, Typography, useTheme, Grow, useMediaQuery } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import violet from "../../img/violet.svg";
import green from "../../img/green.svg";
import { useLanguage } from "../LanguageContext";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
export default function Home() {
  const theme = useTheme();
  const imagePath = theme.palette.mode === "dark" ? violet : green;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { translations } = useLanguage();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box sx={{ textAlign: "center", width: "80%", marginTop: 12 }}>
        <Typography variant="h4" sx={{ textTransform: "uppercase" }}>
          {translations.home.title}
        </Typography>
        <Typography variant="body1">{translations.home.description}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
          maxWidth: 1200,
        }}
      >
        {!isMobile && (
          <Box
            sx={{
              marginTop: "90px",
              width: "40%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <OutlinedTimeline />
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: isMobile ? "80%" : "60%",
          }}
        >
          <img
            src={imagePath}
            alt="theme image"
            style={{
              marginTop: isMobile ? "120px" : "100px",
              marginLeft: isMobile ? "7%" : "40%",
              width: isMobile ? "100%" : "100%",
              height: "auto",
              maxHeight: "50%",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

function OutlinedTimeline() {
  const { translations } = useLanguage();
  return (
    <Box>
      <Timeline position="alternate" sx={{ width: "100%" }}>
        <Grow in={true} timeout={1000}>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                {translations.home.timeline1}
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "left" }}>
                {translations.home.description1}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Grow>
        <Grow in={true} timeout={1500}>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot variant="outlined" color="primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                {translations.home.timeline2}
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "left" }}>
                {translations.home.description2}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Grow>
        <Grow in={true} timeout={2000}>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot variant="outlined" color="secondary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                {translations.home.timeline3}
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "left" }}>
                {translations.home.description3}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Grow>
        <Grow in={true} timeout={2500}>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot variant="outlined" />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                {translations.home.timeline4}
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "left" }}>
                {translations.home.description4}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Grow>
      </Timeline>

      <Box
        sx={{
          textAlign: "center",
          marginTop: 5,
          border: "3px solid #ccc",
          borderRadius: 3,
        }}
      >
        <ErrorOutlineIcon sx={{ width: 40, height: 40, marginTop: 1 }} />
        <Box sx={{ margin: 1 }}>
          <Typography variant="h6" gutterBottom>
            {translations.home.alert1}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {" "}
            {translations.home.alert2}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
