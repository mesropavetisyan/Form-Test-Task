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
    },
    zip: function (ev) {
        let v = this.value;
        if (v.length == 0) {
            return;
        }
        v = v[v.length - 1].codePointAt(0);
        if (!(v >= 48 && v <= 57) || (this.value.length > 4)) {
            this.value = this.value.slice(0, -1);
        }
    },
};
let fn = document.querySelectorAll('[name="full-name"]');
fn[0].addEventListener("input", validate.fullname);
fn[1].addEventListener("input", validate.fullname);

let zipInp = document.querySelector('[name="zip"]');
zipInp.addEventListener("input", validate.zip);

let formSwitches = document.querySelectorAll("[data-form]");

for (let i = 0; i < formSwitches.length; i++) {
    formSwitches[i].addEventListener("click", switchForm)
}

function switchForm(ev, f) {
    let forms = document.querySelectorAll(".forms-inputs>div");
    for (let i = 0; i < forms.length; i++) {
        forms[i].classList.add("hidden");
    }
    let form = null;
    if (f) {
        form = f;
    } else {
        let formClass = ev.target.getAttribute("data-form");
        form = document.querySelector("." + formClass);
    }
    if (form) {
        form.classList.remove("hidden");
    }
}

let btn = document.querySelector(".form-btn");
btn.addEventListener("click", function () {
    let form = this.closest(".form-desc");
    let fillInp = form.querySelectorAll(".inp-fill");
    for (let i = 0; i < fillInp.length; i++) {
        if (fillInp[i].value.length == "") {
            fillInp[i].classList.add(".no-fill")
        } else {
            fillInp[i].classList.remove(".no-fill");
            let messageInvalid = fillInp[i].closest(".invalid-field").querySelector("invalid-message");
            if (messageInvalid) {
                messageInvalid.classList.remove("opc");
            }
        }
    }
    let invalid = document.querySelector('.no-fill');
    if (invalid) {
        invalid.focus();
        let messageInvalid = invalid.closest('.invalid-field').querySelector('.invalid-message');
        if (messageInvalid) {
            messageInvalid.classList.add('opc');
        }
    } else {
        switchForm(null, form.nextElementSibling);
    }
});


let req = new XMLHttpRequest();
req.open("GET", "https://restcountries.eu/rest/v2/all", true);
req.send();
req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let data = this.responseText;
        data = JSON.parse(data);
        setCountry(data);
    }
};





let location = document.querySelector(".city-input-icon");
function getCountry() {
    let req = new XMLHttpRequest();
    req.open("GET", 'https://restcountries.eu/rest/v2/all', true);
    req.send();
    req.onreadystatechange = function (x) {
        if (this.readyState == 4 && this.status == 200) {
            let data = this.responseText;
            data = JSON.parse(data);
            setCountry(data)
        }
    };
}

function setCountry(country) {
    let select = document.querySelector("[name='country']");
    for (let i = 0; i < country.length; i++) {
        let option = document.createElement("option");
        option.innerText = country[i].name;
        option.value = country[i].name;
        select.append(option);
    }
    let billingSelect = document.querySelector("#country-box-billing");
    billingSelect.parentElement.replaceChild(select.cloneNode(true), billingSelect);
}
function setCity(data) {
    let city = document.querySelector('[name="city"]');
    city.value = data.results[0].components.city;
}
location.addEventListener('click', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (res) {
            let req = new XMLHttpRequest();
            req.open("GET", "https://api.opencagedata.com/geocode/v1/json?q=" + res.coords.latitude + "+" + res.coords.longitude + "&key=64297b985f9e40e9a107d283ad03d5bc", true);
            req.send();
            req.onreadystatechange = function (x) {
                if (this.readyState == 4 && this.status == 200) {
                    let data = this.responseText;
                    data = JSON.parse(data);
                    setCity(data);
                }
            };
        })
    }
});
