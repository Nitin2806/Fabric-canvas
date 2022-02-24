import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import styled from "styled-components";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // setBackground(
    //   "https://cdn.pixabay.com/photo/2017/03/17/19/37/sky-2152463_960_720.jpg",
    //   canvas
    // );

    canvas.on("mouse:wheel", function (opt) {
      var delta = opt.e.deltaY;
      var zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
      var vpt = this.viewportTransform;
      if (zoom < 400 / 1000) {
        vpt[4] = 200 - (1000 * zoom) / 2;
        vpt[5] = 200 - (1000 * zoom) / 2;
      } else {
        if (vpt[4] >= 0) {
          vpt[4] = 0;
        } else if (vpt[4] < canvas.getWidth() - 1000 * zoom) {
          vpt[4] = canvas.getWidth() - 1000 * zoom;
        }
        if (vpt[5] >= 0) {
          vpt[5] = 0;
        } else if (vpt[5] < canvas.getHeight() - 1000 * zoom) {
          vpt[5] = canvas.getHeight() - 1000 * zoom;
        }
      }
    });
  }, []);

  const initCanvas = (id) => {
    return new fabric.Canvas(id, {
      height: 400,
      width: 400,
    });
  };

  const setBackground = (url, canvas) => {
    console.log(URL.createObjectURL(url));

    fabric.Image.fromURL(url, (img) => {
      canvas.backgroundImage = img;
      canvas.renderAll();
    });
  };

  const canvas = initCanvas("canvas");

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  console.log(selectedImage);

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  return (
    <Container>
      <Canvas>
        <canvas id="canvas" />
        <Image>
          <Button
            type="file"
            accept="image/*"
            onChange={imageChange}
            // onChange={(event) => {
            //   setSelectedImage(event.target.files[0]);
            // }}
          />
          <button
            style={{
              background: "green",
              border: "none",
              padding: "10px",
              margin: "10px 0",
              width: "100px",
              borderRadius: "5px",
              color: "white",
            }}
            onClick={() => {
              setBackground(selectedImage, canvas);
            }}
          >
            Upload!
          </button>
          <button
            onClick={removeSelectedImage}
            style={{
              background: "red",
              border: "none",
              padding: "10px",
              width: "100px",
              borderRadius: "5px",
              color: "white",
            }}
          >
            Remove{" "}
          </button>
        </Image>
      </Canvas>
    </Container>
  );
}

export default App;

const Container = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8));
  height: 100vh;
  width: 100vw;
`;
const Canvas = styled.div`
  padding: 10px;
  cursor: all-scroll;

  canvas {
    border: 1px solid wheat;
    width: 400px;
    height: 400px;
    cursor: all-scroll;
  }
`;
const Image = styled.div`
  padding: 10px;
  width: 30px;
  height: 30px;
`;
const Button = styled.input`
  background-color: burlywood;
  border-radius: 10px;
`;
