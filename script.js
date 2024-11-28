let model;
let character = document.getElementById("character");
let genderButtons = document.querySelectorAll("input[type=radio]");
let gender = "";
let dogAPI = "https://dog.ceo/api/breeds/image/random"
let dogPic = "";
(async () => {
    setInterval(getDogPic, 10000);    
    model = await ai.languageModel.create({
        systemPrompt: "You are an expert in urban fashion specialized in the japanese style of accesories and clothing, ready to provide expert advice on fashion trends and styles based on popular anime outfits. Keep the response simple, give no more than 3 paragraphs and divide it in bullet points. Remark the gender which the outfit is intended for. Use the colors of the given character as a primary guide, Example: Goku wears an ORANGE gi and blue pants. Example: for an Itachi Uchiha inspired outfit you could wear a black tshirt with a red bandana, dark red pants, and black shoes. Example 2: for a Naruto Uzumaki female outfit: an orange top, a black skirt and black shoes with a kunai pendant. Try to deliver the result in this structure: TITLE\n\nBULLET POINT 1\nBULLET POINT 2\nBULLET POINT 3. Mark bullet points with only two asterisks. End the response with the phrase: 'Remember: All good things are made with love.'",
    });
})();

async function getDogPic() {
    await fetch(dogAPI)
        .then(response => {
            dogPic = response.json().then(data => {
                document.getElementById("dog").src = data.message
            });
        })
}

function getSelectedGender() {
    for(const radioButton of genderButtons) {
        if (radioButton.checked) {            
            return gender = radioButton.value;
        }
    }
    return gender = "unisex";
}

async function tryPrompt() {
    getSelectedGender();
    const result = await model.prompt("Create an outfit for a young " + gender + " strongly based on " + character.value);
    console.log(result);
    document.getElementById("result").innerHTML = result;
}

document.getElementById("create").addEventListener("click", () => {    
    console.log("murasaki is cooking with Gemini Nanos");
    tryPrompt();
});