import React, { useState, useEffect } from 'react';
import Amplify, { Auth, Storage } from 'aws-amplify';
import { useFormFields } from "../../../libs/hooksLib";
import { onError } from "../../../libs/errorLib";

import config from '../../../aws-config';

Storage.configure({ track: true, level: "private" });

Storage.configure({ track: true, level: "private" });

export default function PhotoUpload() {
  const [uploaded, setUploaded] = useState(false);
  const [image, setImage] = useState([]);
  const [username, setUsername] = useState(null);
  const [removeImage, setRemoveImage] = useState([]);

  let fileInput = React.createRef();
<<<<<<< HEAD


  useEffect(() => {
    async function getUsername() {
        const user = await Auth.currentUserInfo();
        const username = user.username
        setUsername(username);
    }
    getUsername();
 }, [])

  const onOpenFileDialog = () => {
    fileInput.current.click();
  };
=======

>>>>>>> 8518b6db930583cbab7b2be04b672d2a92dc03fe

  const onProcessFile = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    try {
      reader.readAsDataURL(file);
    } catch (err) {
      console.log(err);
    }
    reader.onloadend = () => {
      setImage(reader.result);
    };
    Storage.put(`profile.png`, file, {
      level: "private",
      contentType: "image/png"
    })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  };
  useEffect(() => {
    async function getUsername() {
        const user = await Auth.currentUserInfo();
        const username = user.username
        setUsername(username);
    }
    getUsername();
 }, [])

  const onOpenFileDialog = () => {
    fileInput.current.click();
  };

  const onProcessFile = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    try {
      reader.readAsDataURL(file);
    } catch (err) {
      console.log(err);
    }
    reader.onloadend = () => {
      setImage(reader.result);
    };
    Storage.put(`profile.png`, file, {
      level: "private",
      contentType: "image/png"
    })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  };
  useEffect(() => {
    onPageRendered();
  }, []);

  const onPageRendered = async () => {
    getProfilePicture();
  };
  
  const getProfilePicture = () => {
    Storage.get(`profile.png`)
      .then(url => {
        var myRequest = new Request(url);
        fetch(myRequest).then(function(response) {
          if (response.status === 200) {
            setImage(url);
          }
        });
      })
      .catch(err => console.log(err));
      
  };

  const onRemoveFile = e => {
    Storage.remove('profile.png', {level: 'private'})
    .then(
      result => console.log(result),
      removeImage()
    )
    .catch(err => console.log(err));
      
  };

  return (
    <div className="App">
      <a href="#">
        <input
            type="file"
            onChange={onProcessFile}
            ref={fileInput}
        />
      </a>
<<<<<<< HEAD
      <button onClick={onRemoveFile}>Remove Photo</button>
=======
      {/* <button onClick={onRemoveFile}>Remove Photo</button> */}
>>>>>>> 8518b6db930583cbab7b2be04b672d2a92dc03fe
      <img src={image} height="200px" style={{display: removeImage ? 'block' : 'none' }}/>
    </div>
  )
}