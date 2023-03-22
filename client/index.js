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
      const td = document.createElement("td");
      td.setAttribute("class", "td__id");
      // td.className = "thead__text";
      td.innerText = client.id;
      tr.appendChild(td);
    }
    if (client?.name) {
      const td = document.createElement("td");
      td.className = "td__name";
      td.innerText = `${client.name} ${client.surname} ${client.lastName}`;
      tr.appendChild(td);
    }
    if (client?.createdAt) {
      const td = document.createElement("td");
      td.className = "td__createdAt";

      const flexboxDiv = document.createElement("div");
      flexboxDiv.className = "flex-column";

      const spanDate = document.createElement("span");
      spanDate.innerText = getUTCfullYear(new Date(client.createdAt)).date;
      const spanHour = document.createElement("span");
      spanHour.innerText = getUTCfullYear(new Date(client.createdAt)).hour;
      spanHour.style = "color: rgba(176, 176, 176, 1)";

      flexboxDiv.appendChild(spanDate);
      flexboxDiv.appendChild(spanHour);

      td.appendChild(flexboxDiv);

      tr.appendChild(td);
    }
    if (client?.updatedAt) {
      /*   const th = document.createElement("th");
      th.className = "thead__text";
      th.innerText = `${new Date(client.updatedAt).toDateString()}`;
      tr.appendChild(th); */
      const td = document.createElement("td");
      td.className = "td__updatedAt";

      const flexboxDiv = document.createElement("div");
      flexboxDiv.className = "flex-column";

      const spanDate2 = document.createElement("span");
      spanDate2.innerText = getUTCfullYear(new Date(client.updatedAt)).date;
      const spanHour2 = document.createElement("span");
      spanHour2.innerText = getUTCfullYear(new Date(client.updatedAt)).hour;
      spanHour2.style = "color: rgba(176, 176, 176, 1)";

      flexboxDiv.appendChild(spanDate2);
      flexboxDiv.appendChild(spanHour2);

      td.appendChild(flexboxDiv);

      tr.appendChild(td);
    }
    if (client?.contacts) {
      const td = document.createElement("td");
      td.className = "td_contacts";

      // th.innerText = `${client.contacts}`;
      const td_div = document.createElement("div");
     // td_div.style.display = "flex";

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
        td_div.appendChild(icon);
      });

      td.appendChild(td_div);
      tr.appendChild(td);
    }

    const td_actions = document.createElement("td");
    td_actions.className = "td_actions";

    const actionButtonsDiv = document.createElement("div");
    actionButtonsDiv.style.display = "flex";
    actionButtonsDiv.style.flexDirection = "column";
    actionButtonsDiv.style.alignItems = "flex-start";
    
    

    // update client button
    const buttonUpdateClient = document.createElement("button");
    buttonUpdateClient.className = "btn-actions";

    const buttonUpdateClientIcon = document.createElement("img");
    buttonUpdateClientIcon.setAttribute("src", "./assets/vector_update.svg");

    const buttonUpdateClientSpan = document.createElement("span");
    buttonUpdateClientSpan.innerText = "Изменить";
    buttonUpdateClientSpan.style.paddingLeft = '6px';
    buttonUpdateClientSpan.style.cursor = 'pointer'


    buttonUpdateClient.appendChild(buttonUpdateClientIcon);
    buttonUpdateClient.appendChild(buttonUpdateClientSpan);

    buttonUpdateClient.addEventListener("click", () =>
      renderUpdateModal(client)
    );
    buttonUpdateClient.setAttribute("id", "btn-update-client");

    actionButtonsDiv.appendChild(buttonUpdateClient);

    td_actions.appendChild(buttonUpdateClient);
    tr.appendChild(td_actions);

    // delete client button
    const buttonDeleteClient = document.createElement("button");
    buttonDeleteClient.className = "btn-actions";

    const buttonDeleteClientIcon = document.createElement("img");
    buttonDeleteClientIcon.setAttribute("src", "./assets/vector_delete.svg");

    const buttonDeleteClientSpan = document.createElement("span");
    buttonDeleteClientSpan.innerText = "Удалить";
    buttonDeleteClientSpan.style.paddingLeft = '6px'
    buttonDeleteClientSpan.style.cursor = 'pointer'

    buttonDeleteClient.appendChild(buttonDeleteClientIcon);
    buttonDeleteClient.appendChild(buttonDeleteClientSpan);

    buttonDeleteClient.addEventListener("click", () =>
      deleteClient(client)
    );
    buttonDeleteClient.setAttribute("id", "btn-update-client");
    actionButtonsDiv.appendChild(buttonDeleteClient);

    td_actions.appendChild(actionButtonsDiv);

    tr.appendChild(td_actions);

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
