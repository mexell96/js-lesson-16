const employeers = [
    {
        id: 0,
        name: "YarikHead",
        dept_unit_id: 0,
        tel: "123-123-3", 
        salary: 3000
    },
    {
        id: 1,
        name: "MashaLead",
        dept_unit_id: 1,
        tel: "123-123-3", 
        salary: 2000
    },
    {
        id: 2,
        name: "SashaLead",
        dept_unit_id: 1,
        tel: "123-123-3", 
        salary: 2200
    },
    {
        id: 3,
        name: "MirraDev",
        dept_unit_id: 2,
        tel: "123-123-3",
        salary: 1200
    },
    {
        id: 4,
        name: "IraDev",
        dept_unit_id: 2,
        tel: "123-123-3",
        salary: 1000
    },
    {
        id: 5,
        name: "DanikHead3",
        dept_unit_id: 3,
        tel: "123-123-33",
        salary: 3000
    },
    {
        id: 6,
        name: "OliaLead3",
        dept_unit_id: 4,
        tel: "123-123-3",
        salary: 2200
    },
    {
        id: 7,
        name: "KoliaLead",
        dept_unit_id: 4,
        tel: "123-123-3",
        salary: 2000
    }, 
    {
        id: 8,
        name: "LenaTest",
        dept_unit_id: 5,
        tel: "123-123-3",
        salary: 1200
    },
    {
        id: 9,
        name: "SienaTest",
        dept_unit_id: 5,
        tel: "123-123-3",
        salary: 1000
    }
];
const dept = [
    devDeptHead = {
        name: 'Development Management',
        id: '0',
        dept_units: null,
        all_stuff: []
    },
    devLead = {
        name: 'Lead Developers',
        id: '1',
        dept_units: '0',
        all_stuff: []
    },
    developer = {
        name: 'Developers',
        id: '2',
        dept_units: '1',
        all_stuff: []
    },
    qaDeptHead = {
        name: 'Quality Assurance Management',
        id: '3',
        dept_units: null,
        all_stuff: []
    },
    qaLead = {
        name: 'Lead QA',
        id: '4',
        dept_units: '3',
        all_stuff: []
    },
    qaTester = {
        name: 'Testers',
        id: '5',
        dept_units: '4',
        all_stuff: []
    },
];
//--------------------------------------------------------------------------------------------
const left_0 = document.createElement('div');
left_0.id = 'left_0';
const left_1 = document.createElement('div');
left_1.id = 'left';
const select = document.createElement('select');
select.id = 'switchDepartment';
const option1 = document.createElement('option');
option1.innerText = 'Выберите отдел';
const option2 = document.createElement('option');
option2.innerText = 'Development Management';
const option3 = document.createElement('option');
option3.innerText = 'Quality Assurance Management';
const left_right = document.createElement('div');
left_right.id = 'left-right';
const div1 = document.createElement('div');
const select_curr = document.createElement('select');
select_curr.id = 'curr_sel';
const option_curr = document.createElement('option');
option_curr.innerText = 'BYN';
option_curr.setAttribute('value', 0);
const div2 = document.createElement('div');
const button = document.createElement('button');
button.id = 'clear';
button.innerText = 'Clear page';
const right = document.createElement('div');
right.id = 'right';
const table = document.createElement('table');
table.id = 'tableMain';
const thead = document.createElement('thead');
const tr = document.createElement('tr');
const td1 = document.createElement('td');
td1.innerText = 'ID';
const td2 = document.createElement('td');
td2.innerText = 'Name';
const td3 = document.createElement('td');
td3.innerText = 'Dept-unit-id';
const td4 = document.createElement('td');
td4.innerText = 'Telephone';
const td5 = document.createElement('td');
td5.innerText = 'Salary';
//-----------------------------------------------
tr.append(td1);
tr.append(td2);
tr.append(td3);
tr.append(td4);
tr.append(td5);
thead.append(tr);
table.append(thead);
right.append(table);
div2.append(button);
select_curr.append(option_curr);
div1.append(select_curr);
left_right.append(div1);
left_right.append(div2);
select.append(option1);
select.append(option2);
select.append(option3);
left_1.append(select);
left_0.append(left_1);
left_0.append(left_right);
document.body.appendChild(left_0);
document.body.appendChild(right);
//-------------------------------------------------------------------------------------------------
const currIds = [145, 292, 298];
const currenciesCache = {};

let currRate = '1';
let currScale = '1';
let perem = [];
let disabledButton = document.getElementById('curr_sel');
disabledButton.setAttribute('disabled', 'disabled');
const left = document.getElementById('left');
//-----------------------------------------------------------------------------------------------------
function buildTree(items, dept_units) {
    dept_units = dept_units || null;
    let result = [];

    items.forEach((item) => {
        if (item.dept_units === dept_units) {
            result.push(item);
            item.children = buildTree(items, item.id);

            if (!item.children.length) {
                delete item.children;
            }
        }
    });
    return result;
}
const itemsTree = buildTree(dept);
//-------------------------------------------------------------------------------------------------------

buildDOMTree (itemsTree, left);

function buildDOMTree (items, supportEl) {
    const ulEl = document.createElement('ul');
    createHtmlTree(items, ulEl);
    supportEl.appendChild(ulEl);
}

function createHtmlTree(items, rootEl) {
    items.forEach(item => {
        const liEL = document.createElement('li');
        liEL.setAttribute('data-sign', item.name);
        liEL.setAttribute('id', 'li' + item.id);
        liEL.setAttribute('class', 'displayNone');
        liEL.innerHTML = `<span class="chevron chevron-right" data-sign="span${item.name}" id="span${item.id}"></span>&#8194;${item.name}`;
                
        rootEl.appendChild(liEL);

        if(item.children) {
            const childrenUl = document.createElement('ul');
            liEL.appendChild(childrenUl);
            createHtmlTree(item.children, childrenUl);
        }
    });
}

//-----------------------------------------------------------------------------------------------------------------

init();

async function init () {
    const currPromises = currIds.map(currId => fetchCurr(currId));
    const currencies = await Promise.all(currPromises);

    currencies.forEach(currency => {
        currenciesCache[currency.Curr_ID] = currency;
    });

    createCurrOptions(currencies);

    document.getElementById('curr_sel').addEventListener('change', async () => {
        let selectEl = document.getElementById('curr_sel');
        const selectedCurrId = selectEl.value;
        
        if (selectedCurrId != '0') {
            fetchedCurrRate = await getCurrRate(selectedCurrId);
            currRate = fetchedCurrRate.Cur_OfficialRate;
            currScale = fetchedCurrRate.Cur_Scale;
        } else {
            currRate = '1';
            currScale = '1';
        }
        //вызов функции buildTable---------------------------------------------------------
        buildTable();
    });
};
//------------------------------------------------------------------------------------------------------------
async function fetchCurr(id) {
    const url = id
    ? 'https://www.nbrb.by/api/exrates/currencies/' + id
    : 'https://www.nbrb.by/api/exrates/currencies';

    const result = await fetch(url);
    const fetchedData = await result.json();

    return fetchedData;
};

function createCurrOptions(currencies) {
    currencies.forEach(currency => {
        const optionEl = document.createElement('option');
        optionEl.value = currency.Cur_ID;
        optionEl.innerText = currency.Cur_Abbreviation;

        document.getElementById('curr_sel').appendChild(optionEl);
    });
};


const currCache = {};
async function getCurrRate(currId) {
    if (!currCache[currId]) {
        currCache[currId] = fetch(`https://www.nbrb.by/api/exrates/rates/${currId}`).then(data => data.json())
    }
    return currCache[currId];
};


//----------------------------------------------------------------------------------------------------

li0.classList.add('displayNone');
li3.classList.add('displayNone');
//----------------------------------------------------------------------------------------------
document.getElementById('switchDepartment').addEventListener('change', function (ev) {
    if (ev.target.selectedIndex === 0) {
        document.getElementById('li0').classList.remove('displayInline');
        document.getElementById('li0').classList.add('displayNone');
        document.getElementById('li3').classList.remove('displayInline');
        document.getElementById('li3').classList.add('displayNone');
    }
    if (ev.target.selectedIndex === 1) {
        document.getElementById('li0').classList.remove('displayNone');
        document.getElementById('li1').classList.remove('displayNone');
        document.getElementById('li2').classList.remove('displayNone');
        document.getElementById('li0').classList.add('displayInline');
        document.getElementById('li1').classList.add('displayInline');
        document.getElementById('li2').classList.add('displayInline');
        document.getElementById('li3').classList.remove('displayInline');
        document.getElementById('li4').classList.remove('displayInline');
        document.getElementById('li5').classList.remove('displayInline');
        document.getElementById('li3').classList.add('displayNone');
        document.getElementById('li4').classList.add('displayNone');
        document.getElementById('li5').classList.add('displayNone');
    }
    if (ev.target.selectedIndex === 2) {
        document.getElementById('li3').classList.remove('displayNone');
        document.getElementById('li4').classList.remove('displayNone');
        document.getElementById('li5').classList.remove('displayNone');
        document.getElementById('li3').classList.add('displayInline');
        document.getElementById('li4').classList.add('displayInline');
        document.getElementById('li5').classList.add('displayInline');
        document.getElementById('li0').classList.remove('displayInline');
        document.getElementById('li1').classList.remove('displayInline');
        document.getElementById('li2').classList.remove('displayInline');
        document.getElementById('li0').classList.add('displayNone');
        document.getElementById('li1').classList.add('displayNone');
        document.getElementById('li2').classList.add('displayNone');
    }
})
//добавление в массив сотрудников отдела---------------------------------------------------------
developer.all_stuff = employeers.filter(developer => developer.dept_unit_id === 2);
devLead.all_stuff = employeers.filter(devLead => devLead.dept_unit_id === 1);
devDeptHead.all_stuff = employeers.filter(devDeptHead => devDeptHead.dept_unit_id === 0);
qaTester.all_stuff = employeers.filter(qaTester => qaTester.dept_unit_id === 5);
qaLead.all_stuff = employeers.filter(qaLead => qaLead.dept_unit_id === 4);
qaDeptHead.all_stuff = employeers.filter(qaDeptHead => qaDeptHead.dept_unit_id === 3);


// переключение жирного--------------------------------------------------------------------------
left.addEventListener('click', function (ev) {
   if (ev.target.dataset.sign === 'Developers') {
    li0.classList.remove('bold');
    li1.classList.remove('bold');
    li3.classList.remove('bold');
    li4.classList.remove('bold');
    li5.classList.remove('bold');
   }
   if (ev.target.dataset.sign === 'Lead Developers') {
    li0.classList.remove('bold');
    li2.classList.remove('bold');
    li3.classList.remove('bold');
    li4.classList.remove('bold');
    li5.classList.remove('bold');
   }
   if (ev.target.dataset.sign === 'Development Management') {
    li1.classList.remove('bold');
    li2.classList.remove('bold');
    li3.classList.remove('bold');
    li4.classList.remove('bold');
    li5.classList.remove('bold');
   }
   if (ev.target.dataset.sign === 'Testers') {
    li0.classList.remove('bold');
    li1.classList.remove('bold');
    li2.classList.remove('bold');
    li3.classList.remove('bold');
    li4.classList.remove('bold');
   }
   if (ev.target.dataset.sign === 'Lead QA') {
    li0.classList.remove('bold');
    li1.classList.remove('bold');
    li2.classList.remove('bold');
    li3.classList.remove('bold');
    li5.classList.remove('bold');
   }
   if (ev.target.dataset.sign === 'Quality Assurance Management') {
    li0.classList.remove('bold');
    li1.classList.remove('bold');
    li2.classList.remove('bold');
    li4.classList.remove('bold');
    li5.classList.remove('bold');
   }
});
//---------------------------------------------------------------------------------------------

// шеврон------------------------------------------------------------------------------------------
left.addEventListener('click', function (ev) {
    if (ev.target.nodeName === 'SPAN' && ev.target.dataset.sign === 'spanDevelopment Management') {
        ev.target.classList.toggle('chevron-right');
        ev.target.classList.toggle('chevron-bottom');
        document.getElementById('li1').classList.toggle('displayInline');
        document.getElementById('li1').classList.toggle('displayNone');
    }
    if (ev.target.nodeName === 'SPAN' && ev.target.dataset.sign === 'spanLead Developers') {
        ev.target.classList.toggle('chevron-right');
        ev.target.classList.toggle('chevron-bottom');
        document.getElementById('li2').classList.toggle('displayInline');
        document.getElementById('li2').classList.toggle('displayNone');
    }
    if (ev.target.nodeName === 'SPAN' && ev.target.dataset.sign === 'spanQuality Assurance Management') {
        ev.target.classList.toggle('chevron-right');
        ev.target.classList.toggle('chevron-bottom');
        document.getElementById('li4').classList.toggle('displayInline');
        document.getElementById('li4').classList.toggle('displayNone');
    }
    if (ev.target.nodeName === 'SPAN' && ev.target.dataset.sign === 'spanLead QA') {
        ev.target.classList.toggle('chevron-right');
        ev.target.classList.toggle('chevron-bottom');
        document.getElementById('li5').classList.toggle('displayInline');
        document.getElementById('li5').classList.toggle('displayNone');
    }
});
// кнопка очистить------------------------------------------------------------------------------------------
document.getElementById('clear').addEventListener('click', function (ev) {
    function clearButton() {
        li0.classList.remove('bold');
        li1.classList.remove('bold');
        li2.classList.remove('bold');
        li3.classList.remove('bold');
        li4.classList.remove('bold');
        li5.classList.remove('bold');
        //----------------------------------------
        document.getElementById('li2').classList.remove('displayNone');
        document.getElementById('li1').classList.remove('displayNone');
        document.getElementById('li5').classList.remove('displayNone');
        document.getElementById('li4').classList.remove('displayNone');
        document.getElementById('span0').classList.remove('chevron-bottom');
        document.getElementById('span1').classList.remove('chevron-bottom');
        document.getElementById('span3').classList.remove('chevron-bottom');
        document.getElementById('span4').classList.remove('chevron-bottom');
        //----------------------------------------
        document.getElementById('li2').classList.add('displayInline');
        document.getElementById('li1').classList.add('displayInline');
        document.getElementById('li5').classList.add('displayInline');
        document.getElementById('li4').classList.add('displayInline');
        document.getElementById('span0').classList.add('chevron-right');
        document.getElementById('span1').classList.add('chevron-right');
        document.getElementById('span3').classList.add('chevron-right');
        document.getElementById('span4').classList.add('chevron-right');
        //-----------------------------------------
        curr_sel.value = '0';
        document.getElementById('switchDepartment').selectedIndex = 0;
        currRate = '1';
        currScale = '1';
        perem = [];
        //-------------------------------------------------------------------------------------
        document.getElementById('li0').classList.remove('displayInline');
        document.getElementById('li0').classList.add('displayNone');
        document.getElementById('li3').classList.remove('displayInline');
        document.getElementById('li3').classList.add('displayNone');
        // удаление tBody----------------------------------------------------------------------
        deleteTBody();
        // заблокировать переключатель валют
        disabledButton.setAttribute('disabled', 'disabled');
    };
    clearButton();
})
//проверяем какой отдел выбираем-------------------------------------------------------------------------------
left.addEventListener('click', function (ev) {
    if (ev.target.nodeName === "LI" && ev.target.dataset.sign === 'Developers') {
        perem = developer.all_stuff;
        ev.target.classList.add('bold');
    }
    if (ev.target.nodeName === "LI" && ev.target.dataset.sign === 'Lead Developers') {
        perem = devLead.all_stuff;
        ev.target.classList.add('bold');
    }
    if (ev.target.nodeName === "LI" && ev.target.dataset.sign === 'Development Management') {
        perem = devDeptHead.all_stuff;
        ev.target.classList.add('bold');
    }
    if (ev.target.nodeName === "LI" && ev.target.dataset.sign === 'Testers') {
        perem = qaTester.all_stuff;
        ev.target.classList.add('bold');
    }
    if (ev.target.nodeName === "LI" && ev.target.dataset.sign === 'Lead QA') {
        perem = qaLead.all_stuff;
        ev.target.classList.add('bold');
    }
    if (ev.target.nodeName === "LI" && ev.target.dataset.sign === 'Quality Assurance Management') {
        perem = qaDeptHead.all_stuff;
        ev.target.classList.add('bold');
    }  
    //вызов функции buildTable-----------------------------------------------------------------  
    if (ev.target.nodeName === "LI") {
        buildTable();
    }
});
// создание таблицы-----------------------------------------------------------------------------
function buildTable () {
    // удаление tBody---------------------------------------------------------------------------
    deleteTBody();
    // создание tBody---------------------------------------------------------------------------
    var tBody = document.createElement('tbody');
    for (let i = 0; i < perem.length; i++) {
        var trBlock = document.createElement('tr');
            for (let obj in perem[i]) {
                if (obj === 'salary') {
                    newDev = (perem[i][obj] / currRate * currScale);  //----------------курс валют
                    newDevCurr = newDev.toFixed(2);
                } else {
                    newDevCurr = perem[i][obj];
                }
                var tdList = document.createElement('td');
                tdList.append(newDevCurr); // вставляем данные в td
                trBlock.append(tdList); // td вставляем в tr
                tBody.append(trBlock); // tr вставляем в элемент tbody
                tableMain.append(tBody); // tbody вставляем в таблицу
            };
    };
    disabledButton.removeAttribute('disabled');
};
// удаление tBody-------------------------------------------------------------------------------
function deleteTBody() {
    var tBody = document.getElementsByTagName('tbody');
    for (let i = 0; tBody.length > i; i++) {
        tBody[i].remove();
    };
};
