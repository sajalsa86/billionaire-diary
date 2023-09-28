const defaultBillionCount = 9; // Number of default Billion to display initially
let allBillionsData = []; // Store all Billion data

// data lode
const lodeBillion = async () => {
    try {
        const url = `https://forbes400.onrender.com/api/forbes400?limit=10`;
        const res = await fetch(url)
        const data = await res.json()
        //console.log(data[0])
        allBillionsData = data;
        //load defult
        displayBillion(allBillionsData, defaultBillionCount);
    }
    catch (error) {
        console.log(error);
    }
};

//data display
const displayBillion = (billionDiary, count) => {
    console.log(billionDiary)
    const billionDiaryContainer = document.getElementById('billion-diary-container');
    //data reset
    billionDiaryContainer.innerHTML = '';

    //see-more and back-defult control
    const seeMoreControl = document.getElementById('see-more-control');
    const backDefultControl = document.getElementById('back-defult-control');
    if (allBillionsData.length > defaultBillionCount) {
        seeMoreControl.classList.remove('hidden');
    }
    else {
        seeMoreControl.classList.add('hidden');
    };
    //display all
    const seeMoreBillion = () => displayBillion(allBillionsData, allBillionsData.length);
    document.getElementById('see-more-btn').addEventListener('click', function () {
        seeMoreBillion();
        backDefultControl.classList.remove('hidden');
        seeMoreControl.classList.add('hidden');
    });

    //back defult
    const backDefult = () => displayBillion(allBillionsData, defaultBillionCount);
    document.getElementById('back-defult-btn').addEventListener('click', function () {
        backDefult();
        backDefultControl.classList.add('hidden');
    });


    for (let i = 0; i < count; i++) {
        if (billionDiary[i]) {
            const singleBillion = billionDiary[i];
            // console.log(singleBillion);
            const card = document.createElement('div');
            card.classList.add('bg-slate-900', 'rounded', 'pl-4', 'pb-10', 'pt-6', 'pe-0', 'shadow-2xl', 'shadow-zinc-800');
            card.innerHTML = `          
          <h3 class="text-zinc-100 mb-7 text-center capitalize font-bold text-shadow-custom">${singleBillion.personName}</h3>
            <div class="grid grid-cols-2 gap-3 text-zinc-50">
             <div class="thumnail">
              <img class="rounded" src="${singleBillion.squareImage}" alt="">
               <h6 class="capitalize text-slate-50">source: <span class="text-slate-500">${singleBillion.source}</span></h6>
                </div>
            <div class="details border-l-2 pl-2 h-48 grid grid-cols-1 content-center">
                <h6 class="capitalize text-slate-50">Citizenship: <span class="text-slate-500">${singleBillion.countryOfCitizenship}</span></h6>
                <h6 class="capitalize text-slate-50">state: <span class="text-slate-500">${singleBillion.state}</span></h6>
                <h6 class="capitalize text-slate-50">City: <span class="text-slate-500">${singleBillion.city}</span></h6>
                <h6 class="capitalize text-slate-50">Total Sahre: <span class="text-slate-500">${singleBillion.financialAssets[0].numberOfShares}</span></h6>
                <h6 class="capitalize text-slate-50">Sahre price: <span class="text-slate-500">${singleBillion.financialAssets[0].sharePrice}</span></h6>
                
                
                </div>
            </div>         
            `;
            billionDiaryContainer.appendChild(card);
        }
    }
};

lodeBillion();


