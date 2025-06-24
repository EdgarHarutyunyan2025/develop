import express from 'express'
import os from 'os'
import fetch from 'node-fetch'

const app = express()
const PORT = 3000

app.get("/", (req, res) => {
  const helloMessage = `<h1>VERSION 4: Hello from the ArgoCD ---> ${os.hostname()}</h1>`
  console.log(helloMessage)
  res.send(helloMessage)
})


app.get("/nginx", async (req, res) => {
  const url = 'http://nginx'
  const response = await fetch(url);
  const body = await response.text();
  res.send(body)
})



app.get("/jsonplaceholder", async (req, res) => {
  const url = 'https://jsonplaceholder.typicode.com/photos'
  const response = await fetch(url);
  const photos = await response.json();

  // Берём первые 10 фото
  const limitedPhotos = photos.slice(0, 10);

  // Формируем HTML галерею
  let html = `
    <html>
      <head>
        <title>Photo Gallery</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .photo { margin-bottom: 30px; }
          img { border: 1px solid #ccc; border-radius: 4px; }
          h3 { margin-bottom: 5px; }
        </style>
      </head>
      <body>
        <h1>Photo Gallery</h1>
  `;

  limitedPhotos.forEach(photo => {
    html += `
      <div class="photo">
        <h3>${photo.title}</h3>
        <img src="${photo.url}" alt="${photo.title}" width="300" />
        <br/>
        <small>Thumbnail:</small>
        <img src="${photo.thumbnailUrl}" alt="Thumbnail" width="100" />
      </div>
    `;
  });

  html += `
      </body>
    </html>
  `;

  res.send(html);
})




app.listen(PORT, () => {
  console.log(`Web server is listening at port ${PORT}`)
})
