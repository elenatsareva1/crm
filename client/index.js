const tableHeader = document.querySelector("#table-header");
const tableBody = document.querySelector("#table-body");

init();

async function init() {
  await printClientsList();
  await loadTooltips();
}

async function printClientsList() {
  return new Promise((resolve, reject) => {
    tableBody.innerHTML = "";

    getClients().then((result) => {
      console.log("result :_ ", result);
      result.map((client) => {
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
          resolve();
        }
      });
    });
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

