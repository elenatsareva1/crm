/* Page Elements and listeners */

// table
const tableHeader = document.querySelector("#table-header");
const tableBody = document.querySelector("#table-body");
const addClientcontainer = document.querySelector(".add-clients-container");

// button to create client
const btnCreateClient = document.querySelector("#btn-create-client");
btnCreateClient.addEventListener("click", () => renderCreateClientModal());

// icons on the table header
// table id
const tableId = document.querySelector('#table-header-id')
const tableIdImg = document.createElement('img')
tableIdImg.setAttribute('src', './assets/vector_up_arrow.svg');
tableIdImg.setAttribute('class', 'arrow-up-and-down');
tableIdImg.style="padding-left: 4px; cursor: pointer"
tableId.appendChild(tableIdImg)

tableId.addEventListener('click', () => {
  const sortedClientsById = sortArrayByProperty(clients, 'id');
  console.log('sortedClientsById: ', sortedClientsById)
  
  // update state
  clients = sortedClientsById;
  
  tableIdImg.classList.toggle("turn-around");
  printClientsList(clients)

})

// table name
const tableName = document.querySelector('#table-header-name')
const tableNameImg = document.createElement('img')
tableNameImg.setAttribute('src', './assets/vector_up_arrow.svg');
tableNameImg.setAttribute('class', 'arrow-up-and-down');
tableNameImg.style="padding-left: 4px; cursor: pointer"
tableName.appendChild(tableNameImg)

tableName.addEventListener('click', () => {
  const sortedClientsByName = sortArrayByProperty(clients, 'name');
  console.log('sortedClientsByName: ', sortedClientsByName)
  
  // update state
  clients = sortedClientsByName;
  
  tableNameImg.classList.toggle("turn-around");
  printClientsList(clients)

})


// table client creation date
const tableClientCreation = document.querySelector('#table-header-date-creation')
const tableClientCreationImg = document.createElement('img')
tableClientCreationImg.setAttribute('src', './assets/vector_up_arrow.svg');
tableClientCreationImg.setAttribute('class', 'arrow-up-and-down');
tableClientCreationImg.style="padding-left: 4px; cursor: pointer"
tableClientCreation.appendChild(tableClientCreationImg)

tableClientCreation.addEventListener('click', () => {
  const sortedClientsByName = sortArrayByProperty(clients, 'name');
  console.log('sortedClientsByName: ', sortedClientsByName)
  
  // update state
  clients = sortedClientsByName;
  
  tableClientCreationImg.classList.toggle("turn-around");
  printClientsList(clients)

})

// table client creation update
const tableClientUpdate = document.querySelector('#table-header-date-update')
const tableClientUpdateImg = document.createElement('img')
tableClientUpdateImg.setAttribute('src', './assets/vector_up_arrow.svg');
tableClientUpdateImg.setAttribute('class', 'arrow-up-and-down');
tableClientUpdateImg.style="padding-left: 4px; cursor: pointer"
tableClientUpdate.appendChild(tableClientUpdateImg)

tableClientUpdate.addEventListener('click', () => {
  const sortedClientsByName = sortArrayByProperty(clients, 'name');
  console.log('sortedClientsByName: ', sortedClientsByName)
  
  // update state
  clients = sortedClientsByName;
  
  tableClientUpdateImg.classList.toggle("turn-around");
  printClientsList(clients)

})