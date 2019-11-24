const CONTACTSTLIST = '';
let personList = JSON.parse(window.localStorage.getItem(CONTACTSTLIST)) || [];
let personName = document.getElementById('personName');
let personEmail = document.getElementById('personEmail');
let personPhone = document.getElementById('personPhone');

makeList();

document.getElementById('personAdd').addEventListener('click', push);
document.getElementById('personLastDelete').addEventListener('click', personLastDelete);
document.getElementById('deleteSelected').addEventListener('click', deleteSelected);
document.getElementById('editSelected').addEventListener('click', editSelected);

// document.getElementById('sortAZ').addEventListener('click', sortAZ);
// document.getElementById('sortZA').addEventListener('click', sortZA);



function push() {
    personList.push({ name: personName.value, email: personEmail.value, phone: personPhone.value, isChecked: false, isFavorite: true });
    window.localStorage.setItem(CONTACTSTLIST, JSON.stringify(personList));
    makeList();
    clearInput();
}


function deleteSelected() {
    personList = personList.filter(function (value) {
        return value.isChecked == false;
    });
    window.localStorage.setItem(CONTACTSTLIST, JSON.stringify(personList));
    makeList();
}

function editSelected() {
    personList.forEach(function(value){
        if(value.isChecked == true) {
            value.name = personName.value;
            value.email = personEmail.value;
            value.phone = personPhone.value;
            value.isChecked = false;
        }
    });
    window.localStorage.setItem(CONTACTSTLIST, JSON.stringify(personList));
    makeList();
}


function personLastDelete() {
    personList.pop();
    window.localStorage.setItem(CONTACTSTLIST, JSON.stringify(personList));
    makeList();
}

function inverseChecked(iForList) {
    return function () {
        personList[iForList].isChecked = !personList[iForList].isChecked;
        window.localStorage.setItem(CONTACTSTLIST, JSON.stringify(personList));
        makeList();
    }
};

// function sortAZ() {
//     guestList.sort();
//     makeList();
//     refresh();
// }

// function sortZA() {
//     guestList.sort(function(a, b){return b - a});
//     makeList();
//     refresh();
// }

function clearInput() {
    personName.value = '';
    personEmail.value = '';
    personPhone.value = '';
}

function makeList() {
    document.getElementById('output').textContent = '';
    // Establish the array which acts as a data source for the list
    let listData = JSON.parse(window.localStorage.getItem(CONTACTSTLIST)) || [],
        // Make a container element for the list
        listContainer = document.createElement('div'),
        // Make the list
        listElement = document.createElement('ul'),
        // Set up a loop that goes through the items in listItems one at a time
        numberOfListItems = listData.length,
        listItem,
        i;

    // Add it to the page
    document.getElementById('output').appendChild(listContainer);
    listContainer.appendChild(listElement);



    for (i = 0; i < numberOfListItems; ++i) {
        // create an item for each one
        listItem = document.createElement('li');
        if (listData[i].isFavorite) {
            listItem.classList.add('isFavorite')
        }

        // Add the item text
        let checkbox = document.createElement('input');
        let label = document.createElement('label')
        label.htmlFor = "id";
        const nameP = document.createElement('p');
        const emailLinkContainer = document.createElement('p');
        const emailLink = document.createElement('a');
        const phoneLinkContainer = document.createElement('p');
        const phoneLink = document.createElement('a');
        const emojiPlace = document.createElement('p');
        let iForList = i;

        checkbox.type = "checkbox";
        checkbox.checked = listData[i].isChecked;
        checkbox.id = 'checkbox-' + [iForList];

        label.addEventListener('click', inverseChecked(iForList));

        nameP.textContent = listData[i].name;
        emailLink.textContent = 'email: ' + listData[i].email;
        emailLink.href = 'mailto:' + listData[i].email;
        phoneLink.textContent = 'phone: ' + listData[i].phone;
        phoneLink.href = 'tel:' + listData[i].phone;

        listItem.appendChild(nameP);
        listItem.appendChild(emailLinkContainer);
        emailLinkContainer.appendChild(emailLink);
        listItem.appendChild(phoneLinkContainer);
        phoneLinkContainer.appendChild(phoneLink);
        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        listItem.appendChild(emojiPlace);
        if (listData[i].isChecked) {
            label.innerText = String.fromCodePoint(0x1F354);
        }
        else {
            label.innerText = String.fromCodePoint(0x1F35F);
        }
       
        // Add listItem to the listElement
        listElement.appendChild(listItem);
    }

}