import axios from 'axios';
// Use 'formdata-node' for cross-platform, Node.js-compatible FormData (undici does not handle Buffers/streams as Blob)
import { FormData } from 'formdata-node';
import { fileFromPathSync } from 'formdata-node/file-from-path';
import path from 'path';

const form = new FormData();

const filePaths = [
  'C:/Users/gaurav.gaikwad/Downloads/50mb.jpg',
  'C:/Users/gaurav.gaikwad/Downloads/50mb.jpg',
  'C:/Users/gaurav.gaikwad/Downloads/50mb.jpg',
  'C:/Users/gaurav.gaikwad/Downloads/50mb.jpg',
  'C:/Users/gaurav.gaikwad/Downloads/50mb.jpg',
  'C:/Users/gaurav.gaikwad/Downloads/50mb.jpg',
  'C:/Users/gaurav.gaikwad/Downloads/50mb.jpg',
  'C:/Users/gaurav.gaikwad/Downloads/50mb.jpg',
  'C:/Users/gaurav.gaikwad/Downloads/50mb.jpg',
  'C:/Users/gaurav.gaikwad/Downloads/50mb.jpg',
  'C:/Users/gaurav.gaikwad/Downloads/50mb.jpg',
  'C:/Users/gaurav.gaikwad/Downloads/50mb.jpg',
  'C:/Users/gaurav.gaikwad/Downloads/50mb.jpg',
  'C:/Users/gaurav.gaikwad/Downloads/50mb.jpg',
  'C:/Users/gaurav.gaikwad/Downloads/50mb.jpg',
  'C:/Users/gaurav.gaikwad/Downloads/50mb.jpg',
  'C:/Users/gaurav.gaikwad/Downloads/50mb.jpg',
  'C:/Users/gaurav.gaikwad/Downloads/50mb.jpg',
  'C:/Users/gaurav.gaikwad/Downloads/50mb.jpg',
  'C:/Users/gaurav.gaikwad/Downloads/50mb.jpg'];

// Use fileFromPathSync to provide compatible file upload objects (polyfills Blob for node)
filePaths.forEach(filePath => {
  const fileName = path.basename(filePath);
  const fileObj = fileFromPathSync(filePath, fileName);
  form.append('files', fileObj, fileName);
});

form.append('model_id', '97d2e776-30c4-47ed-9c43-fdc5e80b0496');
form.append('column_id', '3f33a315-b8b9-47f7-b97d-acdb7c9960c2');
form.append('row_id', '2');

// Prepare headers for formdata-node (getHeaders() gives content-type with boundary)
const headers = {
  ...form.headers,
  schema: 'nana-1760419798_ec5ea224-5b2b-480d-8a82-be055f3c1f1d',
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjYxYTZjNjgtZjExYi00MzBhLTkyMTQtY2I5OGZmNDcwNjUxIiwicm9sZSI6IiIsImV4cCI6MTc2MDUwNjI0MSwiaWF0IjoxNzYwNDE5ODQxfQ.wI0k4LPIPtb0XoOF6NVeldsNqDvVJeZJwGnh9zDQlhI'
};

(async () => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/v1/row/attachment/add',
      form, // formdata-node FormData is supported by axios@1.6+ with undici/Node.js >=18
      {
        headers,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(`Upload progress: ${percent}%`);
          }
      }
    );

    console.log('✅ Upload success:', response.data);
  } catch (error) {
    console.error('❌ Upload failed:', error);
  }
})();
