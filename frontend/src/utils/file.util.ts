import { MutableRefObject } from 'react'

export function validateFilesSize(files, fileSize = 10) {
  let valid = true
  if (files) {
    files.map(file => {
      const size = file.size / 1024 / 1024
      if (size > fileSize) {
        valid = false
      }
    })
  }
  return valid
}

export function validateFileSize(file, fileSize = 10) {
  let valid = true
  if (file) {
    const size = file.size / 1024 / 1024
    if (size > fileSize) {
      valid = false
    }
  }
  return valid
}

export function extractUploadedFiles(files) {
  delete files['length'];
  return [...files];
}

export const generateVideoThumbnail = (file: File): Promise<string> => {
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

      if(context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        video.pause();
        return resolve(canvas.toDataURL('image/png'));
      }
      resolve('');
    };
  });
};

// export const generateVideoThumbnail = (file: File, canvasElement, videoElement): Promise<string> => {
//   return new Promise((resolve) => {
//     // const canvas = document.createElement('canvas');
//     // const video = document.createElement('video');

//     // this is important
//     videoElement.autoplay = true;
//     videoElement.muted = true;
//     videoElement.src = URL.createObjectURL(file);

//     videoElement.onloadeddata = () => {
//       let ctx = canvasElement.getContext('2d');

//       canvasElement.width = videoElement.videoWidth;
//       canvasElement.height = videoElement.videoHeight;

//       if(ctx) {
//         ctx.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight);
//         videoElement.pause();
//         return resolve(canvasElement.toDataURL('image/png'));
//       }

//       resolve('');
//     };

//   });
// };