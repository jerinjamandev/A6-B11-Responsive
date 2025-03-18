document.getElementById('get-started').addEventListener('click',function(){
    const firstinput =document.getElementById('1st-input')
    const secondInput=document.getElementById('2nd-input')

    if(firstinput.value===""){
        alert('enter name')
    }
    else if(secondInput.value==="123456"){
            Swal.fire({
            title: "অভিনন্দন!",
            text: "এগিয়ে যান!",
            icon: "success"
        });
        document.getElementById('learn').classList.remove('hidden')
        document.getElementById('faq').classList.remove('hidden')
        document.getElementById('banner').classList.add('hidden')
        document.getElementById('nav').classList.remove('hidden')

        firstinput.value=""
        secondInput.value=""



    }

    else{
        alert('wrong password')
    }
})


const logout=()=>{
         document.getElementById('learn').classList.add('hidden')
        document.getElementById('faq').classList.add('hidden')
        document.getElementById('banner').classList.remove('hidden')
        document.getElementById('nav').classList.add('hidden')
}