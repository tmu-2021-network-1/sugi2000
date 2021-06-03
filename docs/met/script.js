const apiUri = 'https://collectionapi.metmuseum.org/public/collection/v1';
const objectsUri = `${apiUri}/objects`;
const searchUri = `${apiUri}/search`;

const search = async ({artistOrCulture = false} = {}) => {
  const keywordInput = document.getElementById('keyword');
  const keyword = keywordInput.value;
  const uri = `${searchUri}?hasImages=true&q=${encodeURIComponent(keyword)}&artistOrCulture=${artistOrCulture}`;
  console.log(uri);
  const json = await getData(uri);
  console.log(json);
  document.getElementById('count').textContent = `${json['total']}件見つかりました`;

  const ids = json['objectIDs'];

  const list = document.getElementById('objects');
  list.innerHTML = ''; // remove all children
  for (let id of ids) {
    const item = document.createElement('li');
    item.className = 'object';
    item.innerHTML = `<div class="id">${id}</div>
    <div><strong class="title"></strong></div>
    <div><a href="#" class="artist"></a></div>
    <div class="date"></div>
    <a href="#" class="image-link"><img alt="" src="images/loading.gif" class="thumbnail">`;
    // const img = document.createElement('img');
    // img.src = `images/loading.gif`;
    // img.className = 'thumbnail';
    // item.appendChild(img);
    list.appendChild(item);
  }

  let i = 0;
  for (let id of ids) {
    const objectUri = `${objectsUri}/${id}`;
    const objectJson = await getData(objectUri);
    console.log(objectJson);

    document.querySelectorAll(`.object .id`)[i].textContent = '';
    document.querySelectorAll(`.object .title`)[i].textContent = objectJson['title'].substr(0, 20);
    const artist = document.querySelectorAll(`.object .artist`)[i];
    artist.textContent = objectJson['artistDisplayName'].substr(0, 20);
    artist.onclick = () => {
      document.getElementById('keyword').value = objectJson['artistDisplayName'];
      search();
      // search({artistOrCulture: true});
    };
    document.querySelectorAll(`.object .date`)[i].textContent = objectJson['objectDate'];
    const a = document.querySelectorAll(`.object .image-link`)[i];
    // a.href = objectJson['primaryImage'];
    a.href = `detail.html?id=${id}`;
    const img = document.querySelectorAll(`.object img`)[i];
    // const img = document.createElement('img');
    img.src = objectJson['primaryImageSmall'];
    // img.className = 'thumbnail';
    // item.appendChild(img);
    i++;
  }

  // renderJson(objectJson);
  return false;
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
