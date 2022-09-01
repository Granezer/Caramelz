const plusBtn = document.getElementById('plus')
const minusBtn = document.getElementById('minus')
const display = document.getElementById('display')
let currentAmount = 1
plusBtn.addEventListener('click', ()=>{
  currentAmount++
  display.value = currentAmount
})
minusBtn.addEventListener('click', ()=>{
    if(currentAmount ===  1 )return
  currentAmount--
  display.value = currentAmount
})
// product of the week keyframe
$(document).ready(function() {
  $("#cf_onclick").click(function() {
  $("#cf2 img.top").toggleClass("transparent");
});
});