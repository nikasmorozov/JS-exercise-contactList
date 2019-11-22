const CONTACTSTLIST = 'contactslist';
let personList = JSON.parse(window.localStorage.getItem(CONTACTSTLIST)) || [];
let personName = document.getElementById('personName');
let personEmail = document.getElementById('personEmail');
let personPhone = document.getElementById('personPhone');
// let personPhone = document.getElementById('personPhone');



makeList();

document.getElementById('personAdd').addEventListener('click', push);
document.getElementById('personLastDelete').addEventListener('click', personLastDelete);
// document.getElementById('pop').addEventListener('click', pop);
// document.getElementById('shift').addEventListener('click', shift);
// document.getElementById('reverse').addEventListener('click', reverse);
// document.getElementById('splice').addEventListener('click', splice);
// document.getElementById('sortAZ').addEventListener('click', sortAZ);
// document.getElementById('sortZA').addEventListener('click', sortZA);



function push() {
    personList.push({name: personName.value, email: personEmail.value, phone: personPhone.value, isFavorite: true});
    window.localStorage.setItem(CONTACTSTLIST, JSON.stringify(personList));
    makeList();
    clearInput();
}

// function unShift() {
//     guestList.unshift(guestName.value);
//     makeList();
//     refresh();
// }

function personLastDelete() {
    personList.pop();
    window.localStorage.setItem(CONTACTSTLIST, JSON.stringify(personList));
    makeList();
}

// function shift() {
//     guestList.shift();
//     makeList();
//     refresh();
// }

// function reverse() {
//     guestList.reverse();
//     makeList();
//     refresh();
// }

// function splice() {
//     guestList.splice(Number(userIndex.value) - 1, 1, guestName.value);
//     makeList();
//     refresh();
// }

// function spliceCopy() {
//     guestList.splice(0, 1, '');
//     guestList.copyWithin((guestList.length - 1), 0, 2);
//     makeList();
//     refresh();
// }

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

        // Add the item text
        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.checked = listData[i].isFavorite;
        // checkbox.name = "name";
        // checkbox.value = "value";
        checkbox.id = "favoriteID";

        let label = document.createElement('label')


        // listItem.textContent =listData[i].email + ' ' + listData[i].phone + ' ' + listData[i].isFavorite;
        const nameP = document.createElement('p');
        const emailLinkContainer = document.createElement('p');
        const emailLink = document.createElement('a');
        const phoneLinkContainer = document.createElement('p');
        const phoneLink = document.createElement('a');
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

        // Add listItem to the listElement
        listElement.appendChild(listItem);
    }

}