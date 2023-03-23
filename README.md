# Random password generator

1. addEventListener("input") vs addEventListener("change")
   - addEventListener("input", (event) => {} ) === oninput = (event) => {};
     :event is fired when the element's value is changed
   - addEventListener("change", (event) => {} ) === onchange = (event) => {};
     : change event is fired when element's value is finished changing (= when losing focus)
