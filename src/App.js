import {
  Button,
  ChakraProvider,
  Flex,
  theme
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { base64img } from './constant.js';

function App() {

  const handleBtnClick = () => { 
    const iframeWindow = document.getElementById('iframe').contentWindow
    iframeWindow.postMessage({ type: 'initialImage', payload: base64img}, '*')
  }

  useEffect(() => {
    window.addEventListener('message', function (event) {
      if(event.origin !== 'https://dev.myclub.asdf.superlook.ai/') {
        return
      }

      this.localStorage.setItem('result', event.data)
      let image = this.document.createElement('img')
      image.width = '100vw'
      image.height = '100vh'
      image.src = event.data
      this.document.body.appendChild(image)
    })
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Flex w={'100%'} h={'100dvh'} textAlign="center" fontSize="xl">
         <Button pos={'absolute'} top={'5%'} left={'50%'} transform={'translate(-50%, 0)'}  onClick={handleBtnClick}>Send Message</Button>  
         <iframe style={{ width: '100%', height: '100%' }}  id='iframe' src='https://dev.myclub.asdf.superlook.ai/' />
         
      </Flex>
    </ChakraProvider>
  );
}

export default App;
