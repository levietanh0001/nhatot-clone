import { MutableRefObject } from 'react';

export function validateFilesSize(files, fileSize = 10) {
  let valid = true;
  if (files) {
    files.map((file) => {
      const size = file.size / 1024 / 1024;
      if (size > fileSize) {
        valid = false;
      }
    });
  }
  return valid;
}

export function validateFileSize(file, fileSize = 10) {
  let valid = true;
  if (file) {
    const size = file.size / 1024 / 1024;
    if (size > fileSize) {
      valid = false;
    }
  }
  return valid;
}

export function extractUploadedFiles(files) {
  delete files['length'];
  return [...files];
}

export const generateVideoThumbnailUrl = (file: File, callback): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const video = document.createElement('video');

    // this is important
    video.autoplay = true;
    video.muted = true;
    video.src = URL.createObjectURL(file);

    video.onloadeddata = () => {
      let context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        video.pause();
        
        canvas.toBlob((blob) => {
          let file = new File([blob as BlobPart], 'video-thumbnail.png', { type: 'image/png' })
          console.log({ videoThumb: file });
          callback(file);
        }, 'image/jpeg');
        

        return resolve(canvas.toDataURL('image/png'));
      }

      return resolve('');
    };
  });
};


// export function createThumb(video, w, h, callback) {
//   const canvas = document.createElement('canvas'),    // create a canvas
//       context = canvas.getContext('2d'),                // get context
//       img = new Image();                       // final image
//   canvas.width = w;                                 // set size = thumb
//   canvas.height = h;
//   if(context) {
//     context.drawImage(video, 0, 0, w, h);            // draw in frame
//     img.onload = function() {                    // handle async loading
//       callback(this);                            // provide image to callback
//     };
//     img.src = canvas.toDataURL();                     // convert canvas to URL
//   }
// }