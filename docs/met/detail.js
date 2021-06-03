const apiUri = 'https://collectionapi.metmuseum.org/public/collection/v1';
const objectsUri = `${apiUri}/objects`;
const searchUri = `${apiUri}/search`;

const params = new URLSearchParams(window.location.search);

const render = async () => {
  const id = params.get("id");
  const objectUri = `${objectsUri}/${id}`;
  const objectJson = await getData(objectUri);
  
  const objectDiv = document.getElementById('object');

  const table = document.createElement('table');
  for (const property in objectJson) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<th>${property}<th><td>${objectJson[property]}</td>`;
    table.appendChild(tr);
  }
  objectDiv.appendChild(table);
  
  const pre = document.createElement('pre');
  pre.innerText = JSON.stringify(objectJson, null, 2);
  
  objectDiv.appendChild(pre);  
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

render();
