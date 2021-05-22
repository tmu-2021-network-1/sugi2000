const apiUri = 'https://collectionapi.metmuseum.org/public/collection/v1';
const objectsUri = `${apiUri}/objects`;
const searchUri = `${apiUri}/search`;

const search = async () => {
  const keywordInput = document.getElementById('keyword');
  const keyword = keywordInput.value;
  //console.log(keyword);
  const uri = `${searchUri}?q=${keyword}`;
  const json = await getData(uri);
  console.log(json);
  document.getElementById('count').textContent = `${json.objectIDs.length()}件見つかりました`;

  const ids = json.objectIDs;
  const objectUri = `${searchUri}?q=${ids[0]}`;
  const objectJson = await getData(objectUri);
  console.log(objectJson);
  renderJson(objectJson);
}

const getData = async (uri) => {
  try {
    console.log(uri);
    const response = await fetch(uri);
    console.log(response);
    if (response.ok) {
      const jsonResponse = await response.json();
			// renderJson(jsonResponse);
      return jsonResponse;
    }
  }
  catch (error) {
    console.log(error);
    return error;
  }
  return {};
}

const renderJson = (json) => {
  const div = document.createElement('div');
  div.textContent = JSON.stringify(json, "", 2);
  document.getElementById('result').appendChild(div);
}


// const uri = 'https://script.google.com/macros/s/AKfycbxyacpN8y4nxSAnU0Eji6E_rBRDFTY7YoWWFa0clY5ELRhskgpt/exec';
// const id = '1BpGnuwC4lZf9G2yFyiSrxbJuGO8gviV8mr-I2D3x4vA';
// const sheet = 'Studio';
// const endpoint = `${uri}?id=${id}&sheet=${sheet}`;

// const renderJson = (json) => {
//   const studios = json.records;
  
//   studios.forEach(studio => {
//    const studioDiv = document.createElement('div');
//    const studioTitle = document.createElement("span");
//    studioTitle.className = 'studio-title';
//    studioTitle.textContent = studio['name-ja'];
//    const studioTitleEn = document.createElement("span");
//    studioTitleEn.className = 'studio-title-en';
//    studioTitleEn.textContent = studio['name-en'];
//    studioDiv.appendChild(studioTitle);
//    studioDiv.appendChild(studioTitleEn);
//    document.getElementById('studios').appendChild(studioDiv);
//  });
//   document.getElementById('result').textContent = JSON.stringify(json, null, 2);
// }

// const getData = async () => {
//   try {
//     const response = await fetch(endpoint);
//     if (response.ok) {
//       const jsonResponse = await response.json();
// 			renderJson(jsonResponse);
//     }
//   }
//   catch (error) {
//     console.log(error);
//   }
// }

// getData();