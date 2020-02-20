let FormSwitches = document.querySelectorAll("[data-form]");
let validate = {
    fullname: function (ev) {
        let v = this.value;
        if (v.length == 0) {
            return;
        }
        v = v[v.length - 1].codePointAt(0);
        if (!((v >= 65 && v <= 90) ||
            (v >= 97 && v <= 122) ||
            (v == 32 || v == 39 || v == 45))) {
            this.value = this.value.slice(0, -1);
        }
    }
};
for (let i = 0; i < FormSwitches.length; i++) {
    FormSwitches[i].addEventListener("click", switchForm)
}

function switchForm(ev) {
    let forms = document.querySelectorAll(".forms-inputs>div");
    for (let i = 0; i < forms.length; i++) {
        forms[i].classList.add("hidden");
    }
    let formClass = ev.target.getAttribute("data-form");
    let form = document.querySelector("." + formClass);
    if (form) {
        form.classList.remove("hidden");
    }
}

let fn = document.querySelectorAll('[name="full-name"]');
fn[0].addEventListener("input",validate.fullname);
fn[1].addEventListener("input",validate.fullname);
