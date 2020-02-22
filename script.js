let FormSwitches = document.querySelectorAll("[data-form]");

for (let i = 0; i <FormSwitches.length ; i++) {
    FormSwitches[i].addEventListener("click", switchForm)
}

function switchForm(ev) {
    let forms= document.querySelectorAll(".forms-input>div");
    for (let i = 0; i < forms.length; i++) {
        forms[i].classList.add("hidden");
    }
    let formClass=ev.target.getAttribute("data-form");
    let form = document.querySelector("." + formClass);
    if(form){
        form.classList.remove("hidden");
    }
}