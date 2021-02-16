import React, { useState, useEffect } from 'react';
import Amplify, { Auth, Storage } from 'aws-amplify';
import { useFormFields } from "../../../libs/hooksLib";
import { onError } from "../../../libs/errorLib";

import config from '../../../aws-config';

<<<<<<< HEAD
Amplify.configure({
  "aws_appsync_graphqlEndpoint": "https://qssh4niq5bgujocnsbpv2zg7am.appsync-api.us-east-1.amazonaws.com/graphql",
  "aws_appsync_region": "us-east-1",
  "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
  Auth: {
    region: config.aws_cognito_region,
    userPoolId: config.aws_user_pools_id,
    identityPoolId: config.aws_cognito_identity_poll_id,
    userPoolWebClientId: config.aws_user_pools_client_id
  },    
  Storage: {
    bucket: config.aws_s3_bucket, //REQUIRED -  Amazon S3 bucket
    region: config.aws_s3_bucket_region, //OPTIONAL -  Amazon service region
  }
});

Storage.configure({ track: true, level: "private" });

export default function ProfileImage() {
  const [image, setImage] = useState([]);
=======
Storage.configure({ track: true, level: "public" });

export default function ProfileImage() {
  const [image, setImage] = useState([]);
  const [username, setUsername] = useState(null);
>>>>>>> 8518b6db930583cbab7b2be04b672d2a92dc03fe

  let fileInput = React.createRef();

  useEffect(() => {
<<<<<<< HEAD
=======
    async function getUsername() {
        const user = await Auth.currentUserInfo();
        const username = user.username
        setUsername(username);
    }
    getUsername();
 }, [])
  useEffect(() => {
>>>>>>> 8518b6db930583cbab7b2be04b672d2a92dc03fe
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

  return (
    <div className="App">
        <img src={image} height="150px"/>
    </div>
  )
}