import { useState } from "react";

import { v4 as uuidv4 } from "uuid"; //Unique Id
import { motion } from "framer-motion"; // Importing framer-motion for animations

import Popup from "reactjs-popup"; // Popup
import ReactPlayer from "react-player"; // React player (Videp player)
import "./styles.css";

const blogList = [
  {
    id: uuidv4(),
    date: "JULY 15, 2025",
    title: "Behind the Scenes at a Fine Dining Kitchen",
    description:
      "An immersive look into the prep and choreography before dinner service.",
    blogThumbnailUrl:
      "https://res.cloudinary.com/dehz5pshe/image/upload/v1755871680/modern-stainless-steel-kitchen_hwvgjg.jpg",
    videoUrl: "https://youtu.be/ICNC5QLxVmo?si=hiTGNqW-xIRQBl-A",
  },
  {
    id: uuidv4(),
    date: "AUG 01, 2025",
    title: "Exploring Seasonal Ingredients",
    description: "Discover the freshest local ingredients of the season.",
    blogThumbnailUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJzM9UhIuPTDL22ogPVE-kSUFYmyEqb7BDaYY2IW4o_Y8O6Lht40L6OwqdlNDyBdU3sIU&usqp=CAU",
    videoUrl: "https://www.youtube.com/watch?v=ICNC5QLxVmo",
  },
];

export default function Blog() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleOpen = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedVideo(null); // reset so ReactPlayer unmounts cleanly
  };

  return (
    <section className="blog-section">
      <h2 className="section-header-title">Our Blogs</h2>
      <div className="blog-list">
        {blogList.map((blog, index) => (
          <motion.li
            key={blog.id}
            className="blog-card"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src={blog.blogThumbnailUrl}
              alt={blog.title}
              className="thumbnail-img"
            />
            <p className="blog-date">{blog.date}</p>
            <h3 className="blog-title">{blog.title}</h3>
            <p className="blog-desc">{blog.description}</p>
            <button
              className="watch-btn"
              onClick={() => handleOpen(blog.videoUrl)}
            >
              Watch Now
            </button>
          </motion.li>
        ))}
      </div>

      {/* Popup */}
      <Popup
        open={isOpen}
        onClose={handleClose}
        modal
        nested
        className="video-popup"
        overlayClassName="video-popup-overlay"
        contentClassName="video-popup-content"
      >
        {(close) => (
          <div className="video-wrapper">
            <button className="close-btn" onClick={close}>
              ✖
            </button>
            {selectedVideo && (
              <ReactPlayer
                url={selectedVideo}
                controls
                muted // prevent autoplay block
                width="100%"
                height="100%"
                className="video-player"
              />
            )}
          </div>
        )}
      </Popup>
    </section>
  );
}
