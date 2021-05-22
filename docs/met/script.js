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
  document.getElementById('count').textContent = `${json['objectIDs'].length}件見つかりました`;

  const ids = json['objectIDs'];

  const list = document.getElementById('objects');
  list.innerHTML = ''; // remove all children
  for (let id of ids) {
    const item = document.createElement('li');
    item.className = 'object';
    item.innerHTML = `${id}<br>`;
    const img = document.createElement('img');
    img.src = `images/loading.gif`;
    img.className = 'thumbnail';
    item.appendChild(img);
    list.appendChild(item);
  }

  let i = 0;
  for (let id of ids) {
    const objectUri = `${objectsUri}/${id}`;
    const objectJson = await getData(objectUri);

    const img = document.querySelectorAll(`.object img`)[i];
    // const img = document.createElement('img');
    img.src = objectJson['primaryImageSmall'];
    // img.className = 'thumbnail';
    // item.appendChild(img);
    i++;
  }

  // console.log(objectJson);
  // renderJson(objectJson);
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
