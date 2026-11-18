
async function loadPage() {

    const loading = document.getElementById("loading");
    const content = document.getElementById("content");
    const error = document.getElementById("error");

    try {

        // JSON faylini yuklash
        const response = await fetch("content.json");

        if (!response.ok) {
            throw new Error("JSON yuklanmadi");
        }

        const data = await response.json();

        // Sarlavhani joylashtirish
        document.getElementById("page-title").textContent =
            data.title;

        // Matnlarni joylashtirish
        const textBox = document.getElementById("page-text");

        data.paragraphs.forEach(function(text) {

            const paragraph = document.createElement("p");

            paragraph.textContent = text;

            textBox.appendChild(paragraph);

        });

        // Animatsiyani to'xtatish
        loading.hidden = true;

        // Haqiqiy kontentni ko'rsatish
        content.hidden = false;

    } catch (err) {

        loading.hidden = true;
        error.hidden = false;

        console.error(err);

    }
}

loadPage();
