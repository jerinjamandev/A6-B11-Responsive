// show loading
function showLoading() {
  document.getElementById('lession-show-section').classList='hidden';
  document.getElementById("loading").classList='flex lex flex-col items-center mt-4';
}


// hidden loading
function hiddenLoading() {
   document.getElementById("lession-show-section").classList.add('block');
  document.getElementById("loading").classList='hidden';
 
}






const vBtnFetch=()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res=>res.json())
    .then(data=>vShowBtn(data.data))
}

const btnRemoveBg=()=>{
  const activeBtn=document.getElementsByClassName('active')
  for (const btn of activeBtn) {
    btn.classList.remove('active')
  }
}

const vShowBtn=(levels)=>{
    const btnMainDiv=document.getElementById('btn-show')

    levels.forEach(btn => {
        const btnCreat=document.createElement('div')
        btnCreat.innerHTML=`<button id="btn-${btn.level_no}" onClick="WordFetch(${btn.level_no})" class="btn btn-outline btn-primary"> <i class="fa-solid fa-book-open"></i> lession-${btn.level_no}</button>`

        btnMainDiv.appendChild(btnCreat)
    });

}

const WordFetch=(levelId)=>{
  showLoading()
    fetch(`https://openapi.programming-hero.com/api/level/${levelId}`)
    .then(res=>res.json())
    .then(data=>{dataShow(data.data)
      btnRemoveBg()
      document.getElementById(`btn-${levelId}`).classList.add('active')
    })
}

const dataShow=(words)=>{
    const lessionshowsection=document.getElementById('lession-show-section')
    lessionshowsection.classList='grid grid-cols-3 gap-4'
    lessionshowsection.innerHTML=""
    if(words.length===0){
      lessionshowsection.classList.remove('grid')
      lessionshowsection.innerHTML=`<div class="flex flex-col items-center">
      <img src="./assets/alert-error.png" alt="">
      <p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <p class="text-2xl font-semibold py-2">নেক্সট Lesson এ যান</p>
      
  </div>`
    }
    words.forEach(word => {
        const lessionSection=document.createElement('div')
        lessionSection.innerHTML=`
        <div class="card bg-base-100 card-lg shadow-sm h-[220px]">
        <div class="card-body py-4">
         <div class=" text-center">
            <h2 class="text-2xl font-bold py-3">${word.word}</h2>
            <p>Meaning /Pronounciation</p>
            <p class=" text-2xl font-bold py-3 ">${word.meaning===null?"অর্থ পাওয়া যায়নি":`${word.meaning}`}</p>
         </div>
          <div class="justify-between card-actions">
            <button onClick="fetchSingleData(${word.id})" class="btn"><i class="fa-solid fa-circle-info text-2xl"></i></button>
            <button onClick="pronounceWord('${word.word}')" class="btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clip-path="url(#clip0_1_433)">
                  <path d="M20.7998 4.29283C20.609 4.12279 20.3604 4.03223 20.105 4.03974C19.8495 4.04725 19.6067 4.15225 19.4262 4.3332C19.2458 4.51415 19.1415 4.75731 19.1347 5.01276C19.1279 5.2682 19.2192 5.51656 19.3898 5.70683C21.056 7.37731 21.9917 9.64042 21.9917 11.9998C21.9917 14.3592 21.056 16.6223 19.3898 18.2928C19.2882 18.3833 19.2062 18.4936 19.1488 18.6169C19.0913 18.7402 19.0596 18.874 19.0556 19.0099C19.0516 19.1459 19.0754 19.2813 19.1255 19.4077C19.1756 19.5342 19.251 19.6491 19.3471 19.7454C19.4431 19.8417 19.5578 19.9175 19.6841 19.9679C19.8105 20.0184 19.9457 20.0426 20.0817 20.039C20.2177 20.0353 20.3515 20.004 20.475 19.9469C20.5984 19.8898 20.709 19.8081 20.7998 19.7068C22.8409 17.6613 23.9873 14.8896 23.9873 11.9998C23.9873 9.11009 22.8409 6.33836 20.7998 4.29283Z" fill="#374957"/>
                  <path d="M18.0931 7.29381C18.0008 7.1983 17.8905 7.12212 17.7685 7.06971C17.6465 7.0173 17.5153 6.98972 17.3825 6.98856C17.2497 6.98741 17.118 7.01271 16.9951 7.06299C16.8722 7.11327 16.7606 7.18753 16.6667 7.28142C16.5728 7.37531 16.4985 7.48696 16.4482 7.60986C16.398 7.73275 16.3727 7.86443 16.3738 7.99721C16.375 8.12999 16.4026 8.26121 16.455 8.38322C16.5074 8.50522 16.5836 8.61556 16.6791 8.70781C17.5507 9.58207 18.0402 10.7663 18.0402 12.0008C18.0402 13.2354 17.5507 14.4195 16.6791 15.2938C16.5836 15.386 16.5074 15.4964 16.455 15.6184C16.4026 15.7404 16.375 15.8716 16.3738 16.0044C16.3727 16.1372 16.398 16.2689 16.4482 16.3918C16.4985 16.5146 16.5728 16.6263 16.6667 16.7202C16.7606 16.8141 16.8722 16.8883 16.9951 16.9386C17.118 16.9889 17.2497 17.0142 17.3825 17.0131C17.5153 17.0119 17.6465 16.9843 17.7685 16.9319C17.8905 16.8795 18.0008 16.8033 18.0931 16.7078C19.3394 15.4584 20.0394 13.7656 20.0394 12.0008C20.0394 10.236 19.3394 8.54326 18.0931 7.29381Z" fill="#374957"/>
                  <path d="M13.819 0.206214C10.7805 0.776539 8.0773 2.49242 6.268 4.99921H5C3.67441 5.0008 2.40356 5.5281 1.46622 6.46543C0.528882 7.40277 0.00158786 8.67362 0 9.99921L0 13.9992C0.00158786 15.3248 0.528882 16.5957 1.46622 17.533C2.40356 18.4703 3.67441 18.9976 5 18.9992H6.269C8.07777 21.5061 10.7807 23.222 13.819 23.7922C13.9632 23.8188 14.1115 23.8133 14.2533 23.7761C14.3951 23.739 14.5271 23.6711 14.6397 23.5773C14.7524 23.4835 14.8431 23.3661 14.9054 23.2334C14.9676 23.1006 14.9999 22.9558 15 22.8092V1.18921C14.9999 1.0426 14.9676 0.897797 14.9054 0.765059C14.8431 0.632321 14.7524 0.514896 14.6397 0.421103C14.5271 0.327309 14.3951 0.259441 14.2533 0.222306C14.1115 0.185171 13.9632 0.179677 13.819 0.206214Z" fill="#374957"/>
                </g>
                <defs>
                  <clipPath id="clip0_1_433">
                    <rect width="24" height="24" fill="white"/>
                  </clipPath>
                </defs>
              </svg></button>

          </div>
        </div>
      </div>

        `

        lessionshowsection.appendChild(lessionSection)
    });




 hiddenLoading()
}

const fetchSingleData=(id)=>{
  fetch(`https://openapi.programming-hero.com/api/word/${id}`)
  .then(res=>res.json())
  .then(data=>loppingfetchSingleData(data.data))
}

const loppingfetchSingleData=(word)=>{
  const singledatashow=document.getElementById('single-data-show')
  const modal=document.getElementById('my_modal_1')
  singledatashow.innerHTML=`
  
  <div>
           <div class='border-2 border-[#EDF7FF] bg-white rounded-xl p-4'>
           
            <h2 class="text-xl font-bold flex gap-2 items-center">
              ${word.word} <span class="text-black flex items-center gap-3">(<i class="fa-solid fa-microphone-lines"></i>  :${word.pronunciation} )</span>
            </h2>
            <div class="mt-2">
              <p class="font-semibold">Meaning</p>
              <p class="text-gray-700">${word.meaning===null?`<span>অর্থ পাওয়া যায়নি</span>`:`<span>${word.meaning}</span>`}</p>
            </div>
            <div class="mt-3">
              <p class="font-semibold">Example</p>
              <p class="text-gray-700">
              ${word.sentence}
              </p>
            </div>
            <div class="mt-3">
              <p class="font-semibold">সমার্থক শব্দ গুলো</p>
              <div class="flex gap-2 mt-1">

              ${word.synonyms?.map(sy => `<span class="btn">${sy}</span>`).join('')}
              
                
              </div>
            </div>
           </div>
            <div class="mt-4 ">
             <form method="dialog">
              <button class="btn btn-primary">Complete Learning</button>
              </form>
            </div>
          </div>
  
  `
  modal.showModal()

}
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-EN'; // English
  window.speechSynthesis.speak(utterance);
}
vBtnFetch()


