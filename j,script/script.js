let opennav = document.getElementById('open')
let nav = document.getElementById('nav')
let flag = true
opennav.addEventListener('click',function name() {
    if(flag === true){
        nav.style.height = '220px'
        flag = false
    }
    else{
        nav.style.height = '80px'
        flag = true
    }
})