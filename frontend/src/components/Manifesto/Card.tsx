import { Box, Typography } from "@mui/material";
import "./style.css";

interface propsType {
  description: string;
  imgSrc: string;
  title: string;
  isRight?: boolean;
}

export default function Card(props: propsType) {
  const { description, imgSrc, title, isRight } = props;

  return (
    <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
      {" "}
      {isRight ? (
        <>
          <Box sx={{ display: "flex", marginBottom: "250px", width: "80%" }}  data-aos="fade-right" data-aos-delay="70"     data-aos-duration="1000">
            {" "}
            <Box className="verticalBox" >
              <Typography variant="h4" color="initial" className="title">
                {title}
              </Typography>
              <img src={imgSrc} alt="image" className="manifestoImg" />
            </Box>
            <Box className="descriptionBox">
              <Typography variant="h5" color="initial" className="description" sx={{ marginLeftRight: "70%", textAlign: "left" }}>
                {description}
              </Typography>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ display: "flex", marginBottom: "250px", width: "80%"}} data-aos="fade-left" data-aos-delay="70"     data-aos-duration="1000">
            <Box className="descriptionBox" sx={{textAlign: "right", marginLeft: "20%"}}>
              <Typography variant="h5" color="initial" className="description">
                {description}
              </Typography>
            </Box>
            <Box className="verticalBox" >
              <Typography variant="h4" color="initial" className="title">
                {title}
              </Typography>
              <img src={imgSrc} alt="image" className="manifestoImg" />
            </Box>{" "}
          </Box>
        </>
      )}
    </div>
  );
}
