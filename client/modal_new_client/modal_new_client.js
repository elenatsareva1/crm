function initCreateClientModal() {
  const renderCreateClientModal = document.querySelector(
    "#show-create-client-modal"
  );

  var template = function (props) {
    return /* html */ `
    <div id="myModal" class="modal-create">
    <!-- Modal content -->
    <div class="modal-content">
      <div class="modal-container">
        <form action="signup.html" method="post" id="signup">
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0 1rem;
            "
          >
            <div
              style="font-size: 18px; font-weight: 700; padding: 1.5rem"
            >
              Новый клиент
            </div>
            <span class="close">&times;</span>
          </div>
          <div class="modal__field">
            <input
              type="text"
              id="family_name"
              name="family_name"
              placeholder="Фамилия *"
            />
            <small style="padding-left: 1rem; color: red"></small>
          </div>
          <div class="modal__field">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Имя * "
            />
            <small style="padding-left: 1rem; color: red"></small>
          </div>
          <div class="modal__field">
            <input
              type="text"
              id="surname"
              name="surname"
              placeholder="Отчество"
            />
          </div>

          <!-- CONTACTS CONTAINER -->
          <div class="add-contacts-container">

          </div>
            <div
              class="add-contacts-container-header"
            >
              <img
                src="./modal_new_client/assets/vector_plus.svg"
                alt="gfg-logo"
                height="14px"
                width="14px"
                style=""
              />
              <span
                style="
                  font-size: 14px;
                  font-weight: 600;
                  margin-left: 4px;
                "
                >Добавить контакт</span
              >
            </div>
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding: 1rem 0;
            "
          >
            <button class="btn-add-client" type="submit">
              Сохранить
            </button>
            <button class="btn-cancel">
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
		`;
  };

  // put the html above inside the element
  renderCreateClientModal.innerHTML = template();

  // Get elements on the page that needs listeners:
  const openAcordion = document.querySelector(".add-contacts-container-header");
  openAcordion.addEventListener("click", () => expandAcordion());

  const btnCancel = document.querySelector(".btn-cancel");
  btnCancel.addEventListener("click", () => cancelAddNewClient());

  // Get the modal
  var modal = document.getElementById("myModal");

  modal.style.display = "block";

  // Get the button that opens the modal
  var btn = document.getElementById("btn-create-client");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  btn.onclick = function () {
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    closeModal();
  };

  function closeModal() {
    modal.style.display = "none";
  }

  // show a message with a type of the input
  function showMessage(input, message, type) {
    // get the small element and set the message
    const msg = input.parentNode.querySelector("small");
    msg.innerText = message;
    // update the class for the input
    input.className = type ? "success" : "error";
    return type;
  }

  function showError(input, message) {
    return showMessage(input, message, false);
  }

  function showSuccess(input) {
    return showMessage(input, "", true);
  }

  function hasValue(input, message) {
    if (input.value.trim() === "") {
      return showError(input, message);
    }
    return showSuccess(input);
  }

  const form = document.querySelector("#signup");

  const NAME_REQUIRED = "Пожалуйста, введите Ваше имя";
  const EMAIL_REQUIRED = "Please enter your email";
  const EMAIL_INVALID = "Please enter a correct email address format";

  // contact state
  let contacts = [];

  /**
   * Read the form and save its data to DB
   */
  form.addEventListener("submit", async function (event) {
    // stop form submission
    event.preventDefault();

    const name = form.elements["name"];
    const family_name = form.elements["family_name"];
    const surname = form.elements["surname"];

    // validate the form
    let nameValid = hasValue(name, NAME_REQUIRED);
    let familyNameValid = hasValue(family_name, NAME_REQUIRED);

    // if valid, submit the form.
    if (nameValid && familyNameValid) {
      // contacts read from the form
      let contactsFromForm = [];
      const amountOfContacts = form.elements["contact-value"]?.length;

      if (amountOfContacts > 1) {
        for (let i = 0; i < amountOfContacts; i++) {
          contactsFromForm.push({
            type: form.elements["contact-type"][i].value,
            value: form.elements["contact-value"][i].value,
          });
        }
      } else {
        contactsFromForm.push({
          type: form.elements["contact-type"]?.value,
          value: form.elements["contact-value"]?.value,
        });
      }

      // remove empty or undefined contacts 
      const filteredContacts = contactsFromForm.filter((item) => {
        return item.value !== "" && item.value !== undefined && item.type !== "" && item.value !== undefined;
      });

      const clientData = {
        name: name.value,
        surname: family_name.value,
        lastName: surname.value,
        createdAt: new Date(),
        contacts: filteredContacts,
      };
      const client = await createClientOnDB(clientData);
      console.log("client create :", client);

      closeModal();

      // refresh page
      window.location.reload();
    }
  });

  async function getClients() {
    const clients = await fetchClientsFromDB();
    return clients;
  }

  function cancelAddNewClient() {
    closeModal();
    contacts = [];
  }

  /**
   * Init function for creating new contact
   */
  function expandAcordion() {
    createNewContact();
    printContacts(contacts);
  }

  /**
   * Create an empty contact
   */
  function createNewContact() {
    const newContact = {
      type: "",
      value: "",
      index: contacts?.length > 0 ? contacts?.length : 0,
    };
    contacts.push(newContact);
  }

  function printContacts(contacts) {
    //clear the view of contacts
    const newClientContainer = document.querySelector(
      ".add-contacts-container"
    );
    newClientContainer.innerHTML = "";

    // cycle through all the contacts and print each one of them
    for (let i = 0; i < contacts.length; i++) {
      const newContactRow = createNewContactRow(contacts[i], i);
      newClientContainer.appendChild(newContactRow);
    }
  }

  function createNewContactRow(contact, contactIndex) {
    const container = document.querySelector(".add-contacts-container");

    const addContactsContainer = document.createElement("div");
    addContactsContainer.class = "contact-row";

    const div = document.createElement("div");
    div.className = "content";

    const div2 = document.createElement("div");
    div2.style.display = "flex";

    // create select
    const sel = document.createElement("select");
    sel.id = "contact-type";
    sel.name = "contact-type";

    var contact_options_array = [
      "Телефон",
      "Доп. телефон",
      "Email",
      "Vk",
      "Facebook",
    ];
    // add the options on the selector
    for (index in contact_options_array) {
      sel.options[sel.options.length] = new Option(
        contact_options_array[index],
        contact_options_array[index],
        false,
        contact?.type === contact_options_array[index] ? true : false
      );
    }

    //save the type of contact in contact array
    sel.addEventListener("change", function (event) {
      const selectedType = event.target.value;
      contacts[contactIndex].type = selectedType;
    });

    // append the selector on the container
    div2.appendChild(sel);

    //input
    let inputValue = document.createElement("input");
    inputValue.type = "text";
    inputValue.id = "contact-value";
    inputValue.name = "contact-value";
    inputValue.placeholder = "Введите данные контакта";
    inputValue.value = contact?.value ? contact.value : "";

    //save the value of contact in contact array
    inputValue.addEventListener("change", function (event) {
      const userValue = event.target.value;
      contacts[contactIndex].value = userValue;
    });

    div2.appendChild(inputValue);

    let removeBtn = document.createElement("button");
    removeBtn.innerText = "Delete";

    removeBtn.index = contact.index;

    removeBtn.addEventListener("click", function (event) {
      deleteAcordionOption(removeBtn.index);
    });

    div2.appendChild(removeBtn);

    div.appendChild(div2);
    addContactsContainer.appendChild(div);

    return addContactsContainer;
  }

  function deleteAcordionOption(contactIndex) {
    // delete specific contact from contacts by its index
    contacts = contacts.filter((item) => {
      return item.index !== parseInt(contactIndex);
    });

    // re-order contacts indexes before print
    contacts = contacts.map((item, i) => {
      return {
        type: item.type,
        value: item.value,
        index: i,
      };
    });

    printContacts(contacts);
  }
}
