import express from 'express';
import { Request, Response } from 'express';
import querystring from 'querystring';
const isUrlValid = require('url-validation');
import { readdir } from 'fs';
import { promisify } from 'util';
import { join } from 'path';

import { filterImageFromURL, deleteLocalFiles } from './util/util';
const readdirProm = promisify(readdir);
const dir = join(__dirname, 'util', 'tmp');

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(express.json());

  app.get('/filteredimage', async (req: Request, res: Response) => {
    const image_url = parseURLString(req.url);
    if (!isUrlValid(image_url)) {
      res.status(422).send('URL is not valid');
      return;
    }
    const imgPath = await filterImagePath(image_url);
    res.status(200)
      .sendFile(imgPath, (err) => {
        if (err) throw new Error(err.message);
        else {
          removeImagesFromServer();
        }
      })
  });

  /**
   * parse the URL for the query parameter
   */
  function parseURLString(url: string): string {
    return querystring.parse(url, '?').image_url.toString();
  }

  /**
   * return path on the server
   */
  async function filterImagePath(image_url: string): Promise<string> {
    return await filterImageFromURL(image_url);
  }

  /**
   * read the content of the tmp directory
   */
  async function removeImagesFromServer() {
    try {
      const files = await readdirProm(dir, { encoding: 'utf8' });
      deleteFiles(files);
    } catch (err) {
      throw new Error('Faild to read directory content' + err.message);
    }
  }

  /**
   *  delete the images off the server
   */
  async function deleteFiles(files: string[]): Promise<void>{
    const deleteFiles = files.map(file => {return join(dir, file)});
    deleteLocalFiles(deleteFiles);
  }

  
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
