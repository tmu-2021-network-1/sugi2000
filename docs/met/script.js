const apiUri = 'https://collectionapi.metmuseum.org/public/collection/v1';
const objectsUri = `${apiUri}/objects`;
const searchUri = `${apiUri}/search`;

const search = async (button) => {
  const keywordInput = document.getElementById('keyword');
  const keyword = keywordInput.value;
  
  // get location
  let location = "";
  if (button) {
    location = button.value;
  } else {
    const locationInput = document.getElementById('location');
    location = locationInput.value;
  }

  const minWidth = +document.getElementById('min-width').value;
  const maxWidth = +document.getElementById('max-width').value;
  const uri = `${searchUri}?geoLocation=${location}&hasImages=true&dateBegin=1000&q=${encodeURIComponent(keyword)}`;
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
    const object = document.querySelectorAll(`.object`)[i];
    const objectUri = `${objectsUri}/${id}`;
    const objectJson = await getData(objectUri);
    console.log(objectJson);

    object.querySelector(`.id`).textContent = '';
    object.querySelector(`.title`).textContent = objectJson['title'].substr(0, 20);
    // document.querySelectorAll(`.object .id`)[i].textContent = '';
    // document.querySelectorAll(`.object .title`)[i].textContent = objectJson['title'].substr(0, 20);
    const artist = object.querySelector(`.artist`)
    //document.querySelectorAll(`.object .artist`)[i];
    artist.textContent = objectJson['artistDisplayName'].substr(0, 20);
    artist.onclick = () => {
      document.getElementById('keyword').value = objectJson['artistDisplayName'];
      search();
      // search({artistOrCulture: true});
    };
    object.querySelector(`.date`).textContent = objectJson['objectDate'];
    const a = object.querySelector(`.image-link`);
    a.href = `detail.html?id=${id}`;
    const img = object.querySelector(`img`);
    img.src = objectJson['primaryImageSmall'];

    const width = objectJson.measurements[0].elementMeasurements.Width;
    if (width < minWidth || width > maxWidth) {
      object.classList.add('off');
    }
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
