## ProgImage

This is an image upload and transformation API case study.

### Endpoints
- POST /api
  
  Submit images as multipart/form-data. Returns ID and image name.

- GET /api/{id}

  Get image by ID.

- GET /api/{id}.{format}?resize={resizeValue}&rotate={rotateValue}&filter={filterValue}

  Get image by ID and transform with Format, Resize, Rotate, Filter parameters. 
  Format values : png, jpeg, svg.
  Returns image.

- GET /api/{id}/resize/{resizeValue}

   Get image by ID and resize. Returns image.

- GET /api/{id}/rotate/{rotateValue}

  Get image by ID and rotate. Returns image.

- GET /api/{id}/filter/{filterValue}

  Get image by ID and filter. Filter values: srgb, rgb, cmyk, lab, b-w.  Returns image. 
  
  ### Heroku API
  
  https://progimageapi.herokuapp.com/
