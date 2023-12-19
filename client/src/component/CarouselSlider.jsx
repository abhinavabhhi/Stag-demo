
import {
    InsertDriveFile as FileIcon,
  } from "@material-ui/icons";
  import Slider from "react-slick";

const CarouselSlider = ({attachments}) => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <Slider {...settings}>
        {attachments.map((attachment, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            {attachment.type.startsWith("image/") ? (
              <img
                src={attachment.src}
                alt={`Attachment ${index + 1}`}
                style={{ width: "100%", marginBottom: "16px" }}
              />
            ) : (
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center", // Center contents vertically
                }}
              >
                <FileIcon fontSize="large" />
                <p>{attachment.name}</p>
                <a
                  href={attachment.src}
                  download={attachment.name}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "block",
                    marginTop: "8px",
                  }}
                >
                  Download
                </a>
              </div>
            )}
          </div>
        ))}
      </Slider>
    );
  };

  export default CarouselSlider;