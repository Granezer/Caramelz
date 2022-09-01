//about us script starts here
const preloader = document.getElementById('preloader')
const about_wrap = document.getElementById('about-wrap')
const title = document.getElementById('title')
const link = document.getElementById('link')
const btns = document.querySelectorAll('.btn')

const companyBtn = document.getElementById('company')
const executiveBtn = document.getElementById('executive')
const cultureBtn = document.getElementById('culture')
const companyTxt = 'Company Overview'
const teamTxt = 'Our Executive Team'
const cultureTxt = 'Culture & Values'

function changeAbout(about){
    setTimeout(()=>{
        preloader.style.display = 'inline-block'
    
        setTimeout(()=>{
            preloader.style.display = 'none'
            about_wrap.append(about)
            
        }, 800)
    }, 0000)
    
    about_wrap.innerHTML = ''
}

window.addEventListener('load', ()=>{
    const company_overviewTemplate = document.getElementById('company-overview')
    const company_overview = company_overviewTemplate.content.cloneNode(true)

    btns.forEach((btn)=> {
        if(btn === companyBtn){
        btn.classList.add('active')
        btn.classList.remove('inactive')
            
        }else{
        btn.classList.add('inactive')
        btn.classList.remove('active')
        }
    })
changeAbout(company_overview)
title.innerHTML = companyTxt
link.innerHTML = companyTxt
})

companyBtn.addEventListener('click', (e)=>{
    const company_overviewTemplate = document.getElementById('company-overview')
    const company_overview = company_overviewTemplate.content.cloneNode(true)

    btns.forEach((btn)=> {
        if(btn === e.target){
        btn.classList.add('active')
        btn.classList.remove('inactive')
            
        }else{
        btn.classList.add('inactive')
        btn.classList.remove('active')
        }
    })
changeAbout(company_overview)
title.innerHTML = companyTxt
link.innerHTML = companyTxt

})

executiveBtn.addEventListener('click', (e)=>{
    
const exect_teamTemplate = document.getElementById('exect-team')
const exect_team = exect_teamTemplate.content.cloneNode(true)

btns.forEach((btn)=> {
    if(btn === e.target){
       btn.classList.add('active')
       btn.classList.remove('inactive')
    }else{ 
        btn.classList.add('inactive')
        btn.classList.remove('active')
    }
})
changeAbout(exect_team)

title.innerHTML = teamTxt
link.innerHTML = teamTxt
    })


cultureBtn.addEventListener('click', (e)=>{
    
        const culture_teamTemplate = document.getElementById('culture-temp')
        const culture = culture_teamTemplate.content.cloneNode(true)
        
        btns.forEach((btn)=> {
            if(btn === e.target){
               btn.classList.add('active')
               btn.classList.remove('inactive')
            }else{ 
                btn.classList.add('inactive')
                btn.classList.remove('active')
            }
        })
        changeAbout(culture)
        
        title.innerHTML = cultureTxt
        link.innerHTML = cultureTxt
            })
//about us script ends here