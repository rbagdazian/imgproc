import React, {useEffect, useState, Component} from 'react';
import {Auth} from 'aws-amplify';

function UserInfo({userName}){

  return(
      <p className='small-font'> {userName} </p>
      )
    
}

export default UserInfo;