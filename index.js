const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()",
};

const length_range = document.querySelector("#length_range");
const length_number = document.querySelector("#length_number");
const uppercase = document.querySelector("#uppercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");
const options = [length_range, length_number, uppercase, numbers, symbols];

let characters_list = [characters.lowercase];
options.forEach((option) => {
  option.addEventListener("input", (event) => {
    if (event.target.checked) {
      characters_list.push(characters[event.target.id]);
      const characters_string = characters_list.join("");
      update_password(50, characters_string.length, characters_string);
    } else {
      for (index in characters_list) {
        if (characters_list[index] === characters[event.target.id]) {
          characters_list.splice(index, 1);
          const characters_string = characters_list.join("");
          update_password(50, characters_string.length, characters_string);
        }
      }
    }
    if (event.target.id === "length_range") {
      length_number.value = event.target.value;
    }
    if (event.target.id === "length_number") {
      length_range.value = event.target.value;
    }
  });
});

function update_password(length, max, characters) {
  const generated_password = generate_password(length, max, characters);
  display_password(generated_password);
  update_password_length(generated_password.length);
}

function display_password(password) {
  const display_password = document.querySelector(".display_password");
  display_password.textContent = `${password}`;
}

function update_password_length(length) {
  length_number.value = length;
  length_range.value = length;
}

function generate_password(length, max, characters) {
  const password = [];

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * max);
    password.push(characters[randomIndex]);
  }
  return password.join("");
}

const defaul_password = update_password(
  10,
  characters.lowercase.length,
  characters.lowercase
);

window.addEventListener("load", () => {
  defaul_password;
});
