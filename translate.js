let model;
let phrase = document.getElementById("phrase");
let dogAPI = "https://dog.ceo/api/breeds/image/random"
let dogPic = "";
let languagePair = {}
let translator;
(async () => {
    setInterval(getDogPic, 10000);
    languagePair = {
        sourceLanguage: 'es', // Or detect the source language with the Language Detection API
        targetLanguage: 'ja',
    };

    const canTranslate = await translation.canTranslate(languagePair);
    if (canTranslate !== 'no') {
        if (canTranslate === 'readily') {
            // The translator can immediately be used.
            translator = await translation.createTranslator(languagePair);            
        } else {
            // The translator can be used after the model download.
            /* translator = await translation.createTranslator(languagePair);
            translator.addEventListener('downloadprogress', (e) => {
                console.log(e.loaded, e.total);
            });
            await translator.ready; */
        }
    } else {
        // The translator can't be used at all.
    }
})();

async function getDogPic() {
    await fetch(dogAPI)
        .then(response => {
            dogPic = response.json().then(data => {
                document.getElementById("dog").src = data.message
            });
        })
}

async function EnJapTranslation() {
    languagePair = {
        sourceLanguage: 'en',
        targetLanguage: 'ja'
    }
    const result = await translator.translate(phrase.value)
    document.getElementById("result").innerHTML = result;
}

async function EsJapTranslation() {
    languagePair = {
        sourceLanguage: 'es',
        targetLanguage: 'ja'
    }
    const result = await translator.translate(phrase.value)
    document.getElementById("result").innerHTML = result;
}

document.getElementById("EsJa").addEventListener("click", () => {
    EnJapTranslation()
    console.log("murasaki is cooking with Gemini Nanos");
});

document.getElementById("EnJa").addEventListener("click", () => {
    EsJapTranslation()
    console.log("murasaki is cooking with Gemini Nanos");
});