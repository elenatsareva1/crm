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
  //todo
}

async function deleteClientFromDB(client) {
  //todo
}
