import './App.css';
import { useState } from 'react';
import { ImageLinkForm } from './components/ImageLinkForm/ImageLinkForm';
import { Logo } from './components/Logo/Logo';
import { Navigation } from './components/Navigation/Navigation';
import { Rank } from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import { SignIn } from './components/SignIn/SignIn';
import { Register } from './components/Register/Register';

const app = new Clarifai.App({
  apiKey: 'e0b3e8d24d1e4274b8c6fb3275bd3300'
});

const particlesOptions = {
  particles: {
    width: '100vw',
    height: '100vh',
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,
      }
    }
  }

}

function App() {

  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [boxes, setBoxes] = useState([]);
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const calculateFaceLocation = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions.map(region => {
      return region.region_info.bounding_box;
    })
    const image = document.getElementById("input-image");
    const width = Number(image.width);
    const height = Number(image.height);

    return clarifaiFaces.map(face => {
      return {
        topRow: face.top_row * height,
        leftCol: face.left_col * width,
        bottomRow: height - (face.bottom_row * height),
        rightCol: width - (face.right_col * width),
      }
    })
  }

  const displayFaceBox = (box) => {
    setBoxes(box);
  }

  const onInputChange = (e) => {
    setInput(e.target.value);
  }

  const onButtonSubmit = () => {
    setImageUrl(input)

    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        input
      )
      .then(response => displayFaceBox(calculateFaceLocation(response)))
      .catch(err => console.log(err))
  }

  const onRouteChange = (route) => {
    if (route === 'signout' || route === 'signin') {
      setIsSignedIn(false);
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
  }

  return (
    <div className="App">
      <Particles
        className="particles"
        params={{ particlesOptions }} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      { route === 'home'
        ? <>
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit} />
          <FaceRecognition
            boxes={boxes}
            imageUrl={imageUrl} />
        </>
        : (
          route === 'signin'
            ? <SignIn onRouteChange={onRouteChange} />
            : <Register onRouteChange={onRouteChange} />
        )

      }
    </div>
  );
}

export default App;


/*

Image URLs for testing:
https://image.shutterstock.com/image-photo/happy-cheerful-young-woman-wearing-260nw-613759379.jpg
https://image.shutterstock.com/image-photo/image-cute-young-loving-couple-260nw-1130187179.jpg
https://i2.wp.com/digital-photography-school.com/wp-content/uploads/2008/09/group-photo.png

*/