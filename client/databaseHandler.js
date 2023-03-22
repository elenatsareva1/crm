async function fetchClientsFromDB() {
  const url = "http://localhost:3000/api/clients";
  const response = await fetch(url);
  const clients = await response.json();
  return clients;
}

async function createClientOnDB(data) {
  const url = "http://localhost:3000/api/clients";
  const rawResponse = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const content = await rawResponse.json();

  console.log(content);
}

async function updateClientOnDB(client) {
  const url = `http://localhost:3000/api/clients/${client.id}`;
  const data = {
    //id : client.id,
    name: client.name,
    surname: client.surname,
    lastName: client.lastName,
    //updatedAt : client.updateAt,
    //createdAt : client.createdAt,
    contacts : client.contacts,
  }
  const rawResponse = await fetch(url, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const content = rawResponse;

  console.log(content);
}

async function deleteClientFromDB(client) {
  const url = `http://localhost:3000/api/clients/${client.id}`;
  const data = {
    id : client.id,
    name: client.name,
    surname: client.surname,
    lastName: client.lastName,
    contacts : client.contacts,
  }
  const rawResponse = await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const content = rawResponse;

  console.log(content);
}

async function searchClientFromDB(searchText) {

  console.log('client to search :', searchText);
  
  const url = `http://localhost:3000/api/clients?search=${searchText}`;

  const rawResponse = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  });
  const content = await rawResponse.json();
  console.log(content);
  return content;
}


