

// clients state
clients = [];

init();

async function init() {
  // spinner
  var loadingSpinner = document.getElementById("loading");
  loadingSpinner.style.visibility = "visible"; // start spinner

  // settimeout to emulate db fetching time
  setTimeout(async () => {
    clients = await getClients();
    await printClientsList(clients);
    await loadTooltips();
    loadingSpinner.style.visibility = "hidden"; // stop spinner
  }, 300);
}

async function printClientsList(clients) {
  tableBody.innerHTML = "";

  console.log("clients :_ ", clients);
  clients.map((client) => {
    const tr = document.createElement("tr");
    tr.className = "table__tr";
    tableBody.appendChild(tr);

    if (client?.id) {
      const th = document.createElement("th");
      th.className = "thead__text";
      th.innerText = client.id;
      tr.appendChild(th);
    }
    if (client?.name) {
      const th = document.createElement("th");
      th.className = "thead__text";
      th.innerText = `${client.name} ${client.surname} ${client.lastName}`;
      tr.appendChild(th);
    }
    if (client?.createdAt) {
      const th = document.createElement("th");
      th.className = "thead__text";
      th.innerText = `${new Date(client.createdAt).toDateString()}`;
      tr.appendChild(th);
    }
    if (client?.updatedAt) {
      const th = document.createElement("th");
      th.className = "thead__text";
      th.innerText = `${new Date(client.updatedAt).toDateString()}`;
      tr.appendChild(th);
    }
    if (client?.contacts) {
      const th = document.createElement("th");
      th.className = "thead__text";

      // th.innerText = `${client.contacts}`;
      const th_div = document.createElement("div");
      th_div.style.display = "flex";

      client.contacts.forEach((element) => {
        const icon = document.createElement("img");
        icon.style.height = "16px";
        icon.style.width = "16px";
        icon.style.padding = "2px";

        if (element.type === "Vk") {
          icon.src = "./assets/vector_vk.svg";
          icon.setAttribute("data-tooltip-text", element.value);
        }
        if (element.type === "Facebook") {
          icon.src = "./assets/vector_fb.svg";
          icon.setAttribute("data-tooltip-text", element.value);
        }
        if (element.type === "Телефон" || element.type === "Доп. телефон") {
          icon.src = "./assets/vector_tlf.svg";
          icon.setAttribute("data-tooltip-text", element.value);
        }
        if (element.type === "Email") {
          icon.src = "./assets/vector_mail.svg";
          icon.setAttribute("data-tooltip-text", element.value);
        }
        th_div.appendChild(icon);
      });

      th.appendChild(th_div);
      tr.appendChild(th);
    }

    const actionDiv = document.createElement("div");
    actionDiv.className = "thead__text";
    actionDiv.style.display = "flex";

    // update client button
    const buttonUpdateClient = document.createElement("button");
    buttonUpdateClient.innerText = "Update";
    buttonUpdateClient.addEventListener("click", () =>
      renderUpdateModal(client)
    );
    buttonUpdateClient.setAttribute("id", "btn-update-client");

    actionDiv.appendChild(buttonUpdateClient);
    tr.appendChild(actionDiv);

    // delete client button
    const buttonDeleteClient = document.createElement("button");
    buttonDeleteClient.innerText = "Delete";
    buttonDeleteClient.addEventListener("click", () => deleteClient(client));

    actionDiv.appendChild(buttonDeleteClient);
    tr.appendChild(actionDiv);
  });
}

function sortAttributes(a, b) {
  const order = [
    "ID",
    "Фамилия Имя Отчество",
    "Дата и время создания",
    "Последние изменения",
    "Контакты",
    "Действия",
  ];
  return order.indexOf(
    a[0].toLocaleLowerCase() - order.indexOf(b[0].toLocaleLowerCase())
  );
}

// searchBar and search clients
const searchBar = document.querySelector(".search");
searchBar.addEventListener("change", (e) => {
  const searchText = e.target.value;
  searchClients(searchText).then((res) => {
    console.log("res : ", res);
  });
});

async function fetchClientsFromDB() {
  const url = "http://localhost:3000/api/clients";
  const response = await fetch(url);
  const clients = await response.json();
  return clients;
}

async function getClients() {
  const clients = await fetchClientsFromDB();
  return clients;
}

async function deleteClient(client) {
  await deleteClientFromDB(client);

  // reload page with fresh data with init()
  init();
}

function renderUpdateModal(client) {
  initUpdateClientModal(client);
}

function renderCreateClientModal() {
  initCreateClientModal();
}

async function searchClients(searchText) {
  const searchResult = await searchClientFromDB(searchText);
  printClientsList(searchResult);
}
