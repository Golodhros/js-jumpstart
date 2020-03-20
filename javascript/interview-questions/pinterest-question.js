/*
To be considered, images:

- must have a source attribute starting with http:// or https://
- must not be wider than 3x their height
- must be at least 80px by 120px or 120px by 80px

Images under consideration must be ranked by size, largest to smallest, with the following modifications:

- very tall images make "giraffe" pins. If an image is taller than 3x its width, pretend it is only 3x taller than it is wide.
- images that are wider than they are tall make "elephant" pins, which don't show well on Pinterest's vertical grid. If an image is wider than it is tall, pretend it is a square image of width by width.
- any image whose total is smaller than 10% of the largest on the page (after the largest has been adjusted for size) should not show.

Feel free to add keys, manipulate, or otherwise destroy the initial array of images; you won't hurt anything on the page.

*/

var images = [ {
"src":"http://media.npr.org/assets/img/2015/08/28/10284708783_08fd19543b_b_sq-4aad59e7c72a2d8d34c8c29fe02c9faa2e8608c9-s800-c85.jpg",
    "h": 584,
    "w": 584
  }, {
    "src": "http://stuffpoint.com/dogs/image/339432-dogs-music-dog.jpg",
    "h": 1595,
    "w": 1595
  }, {
    "src": "https://c2.staticflickr.com/6/5469/9529617075_814740777b_n.jpg",
    "h": 772,
    "w": 434
  }, {
     "src": "http://abcnews.go.com/images/Lifestyle/GTY_yawning_dog_dm_130807.jpg",
     "h": 300,
     "w": 475
  }, {
    "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAoCAYAAABpYH0BAAAF3ElEQVR4Ae1bA5Ak2xLd8MPXM9a2bdu2bdu2bdvW2LZt28rFq",
    "h": 40,
    "w": 80
  }, {
    "src": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
    "h": 90,
    "w": 272
  }, {
     "src": "http://thedogwallpaper.com/wp-content/uploads/2013/10/dog-boxer-wallpaper-35.jpg",
     "h": 400,
     "w": 119
  }, {
    "src": "http://farm8.staticflickr.com/7027/6851755809_df5b2051c9_n.jpg",
    "h": 239,
    "w": 320
  }, {
    "src": "https://images.google.com/images/icons/hpcg/ribbon-black_68.png",
    "h": 90,
    "w": 90
  }, {
    "src": "http://static1.1.sqspcdn.com/static/f/482333/26518075/1441682847173/20130208-RGB-vs-CMYK.jpg",
    "h": 1011,
    "w": 250,
    "alt": "20130208-RGB-vs-CMYK.jpg"
  }, {
    "src": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT7fyIUMbCgCYMs3BOPW2Nzz_GdmYlKxisjoyqE9qSx_gUHm3INtA",
    "h": 750,
    "w": 250
  }, {
    "src": "http://static444.sqspcdn.com/static/f/482333/26518075/1441682847173/20130208-RGB-vs-CMYK.jpg",
    "h": 1000,
    "w": 250,
    "alt": "20130208-RGB-vs-CMYK.jpg"
  },

];


// prioritizeImageList = images
// filter(isHTTPorHTTPS)
// filter(isNotExtraWide)
// filter(meetsSizeThresholds)
// map(addScore)
// render(prioritizeImageList)

// Assumptions
// - all of them will have src
// - src is non empty/ non-null/ non-undefined
// - src is string
// - h & w are there, non 0, non null, non-undefined
// - h & w are numbers and positive


// Add constants


const isHTTPorHTTPS = ({src}) => {
   return src.indexOf('http://') === 0 || src.indexOf('https://') === 0;
}

const isNotExtraWide = ({w, h}) => {
   return w < (h * 3);
}

const meetsSizeThresholds = ({w, h}) => {
  return (w >= 80 && h >= 120) || (w >= 120 && h >= 80)
}

const addScore = (img) => {
  let {w, h} = img;
  let adjustedHeight = h;
  let adjustedWidth = w;

  if (h > (3*w)) {
    adjustedHeight = 3*w;
  }

  if (w > h) {
    adjustedWidth = adjustedHeight;
  }

  let score = adjustedHeight * adjustedWidth;

  return {
    ...img,
    score,
  };
};

const findHighestScore = (list) => {
// order
  // pick first
}


let prioritizeImageList = images
  .filter(isHTTPorHTTPS)
  .filter(isNotExtraWide)
  .filter(meetsSizeThresholds)
  .map(addScore);

// let highestScore = findHighestScore(prioritizeImageList);
// let listWithNoTinyImages = prioritizeImageList
//   .filter(isNotTiny.bind(null, highestScore));


console.log('prioritizeImageList', prioritizeImageList)
console.log('prioritizeImageList count', prioritizeImageList.length)



