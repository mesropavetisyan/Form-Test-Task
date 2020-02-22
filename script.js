let formSwitches = document.querySelectorAll("[data-form]");

for (let i = 0; i <formSwitches.length ; i++) {
    formSwitches[i].addEventListener("click", switchForm)
}

function switchForm(ev,f) {
    let forms= document.querySelectorAll(".forms-inputs>div");
    for (let i = 0; i < forms.length; i++) {
        forms[i].classList.add("hidden");
    }
    let form = null;
    if(f){
        form = f;
    }else{
        let formClass=ev.target.getAttribute("data-form");
        form = document.querySelector("." + formClass);
    }
    if(form){
        form.classList.remove("hidden");
    }
}

let btn = document.querySelector(".form-btn");
btn.addEventListener("click", function () {
    let form = this.closest(".form-desc");
    let fillInp = form.querySelectorAll(".inp-fill");
    for (let i = 0; i < fillInp.length; i++) {
        if(fillInp[i].value.length == "") {
            fillInp[i].classList.add(".no-fill")
        }else {
            fillInp[i].classList.remove(".no-fill");
            let messageInvalid = fillInp[i].closest(".invalid-field").querySelector("invalid-message");
            if(messageInvalid) {
                messageInvalid.classList.remove("show");
            }
        }
    }
    let invalid = document.querySelector('.no-fill');
    if (invalid) {
        invalid.focus();
        let messageInvalid = invalid.closest('.invalid-field').querySelector('.invalid-message');
        if (messageInvalid) {
            messageInvalid.classList.add('show');
        }
    } else {
        switchForm(null, form.nextElementSibling);
    }
});





